/**
 * Build step: reads ../registry, refuses an invalid registry or a package version other than
 * `area_version`, then writes the generated sources and the files the package ships:
 *
 * - src/generated/types.ts     the name unions, closed lists and property maps
 * - src/generated/registry.ts  the registry as a typed constant
 * - dist/registry.json         the registry as one JSON document
 * - LICENSE-registry           the registry's license (CC0 1.0)
 *
 * Nothing it writes is committed: the YAML stays the only source.
 */

import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { loadRegistry } from './load.ts';
import type { Event, Property, Registry } from './schema.ts';
import { validateRegistry } from './validate.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const registryDir = join(root, '..', 'registry');

function fail(messages: readonly string[]): never {
  for (const m of messages) console.error(`error: ${m}`);
  process.exit(1);
}

const loaded = loadRegistry(registryDir);
if (loaded.errors.length) fail(loaded.errors);
const result = validateRegistry(loaded.files);
if (result.errors.length) fail([...result.errors, 'the registry is invalid: nothing generated']);

const files = loaded.files as unknown as Omit<Registry, 'area_version'>;
const version = files.naming.area_version;
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as { version: string };
if (pkg.version !== version) {
  fail([`package.json version ${pkg.version} differs from area_version ${version}: bump package/package.json`]);
}

const registry: Registry = {
  area_version: version,
  naming: files.naming,
  pillars: files.pillars,
  mechanics: files.mechanics,
  properties: files.properties,
  events: files.events,
  kpis: files.kpis,
};

// ─── Helpers ────────────────────────────────────────────────────────────────────

const lit = (value: string) => `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const union = (values: readonly string[]) => (values.length ? values.map(lit).join(' | ') : 'never');
const pascal = (name: string) => name.replace(/(^|_)([a-z0-9])/g, (_, __, c: string) => c.toUpperCase());

function doc(lines: readonly (string | undefined)[], indent = ''): string {
  const text = lines.filter((l): l is string => Boolean(l)).map((l) => l.replace(/\*\//g, '*\\/'));
  if (!text.length) return '';
  if (text.length === 1) return `${indent}/** ${text[0]} */\n`;
  return `${indent}/**\n${text.map((l) => `${indent} * ${l}`).join('\n')}\n${indent} */\n`;
}

const deprecated = (stability: string) => (stability === 'deprecated' ? '@deprecated' : undefined);

const props = new Map(registry.properties.properties.map((p) => [p.name, p]));
const isAppDefined = (p: Property) => p.values === 'app_defined';
const closedList = (p: Property): readonly string[] | undefined => (Array.isArray(p.values) ? p.values : undefined);

function valueType(p: Property): string {
  if (closedList(p)) return pascal(p.name);
  if (isAppDefined(p)) return `AppValue<A, ${lit(p.name)}>`;
  if (p.type === 'boolean') return 'boolean';
  if (p.type === 'integer') return 'number';
  return 'string';
}

function propertyDoc(p: Property): (string | undefined)[] {
  const range = p.range ? `Integer from ${p.range[0]} to ${p.range[1]}.` : p.type === 'integer' ? 'Integer.' : undefined;
  const appDefined = isAppDefined(p) ? "Closed list defined by each app, in its tracking plan." : undefined;
  return [p.description, range, appDefined, deprecated(p.stability)];
}

function propertyMap(names: readonly { name: string; optional: boolean }[], indent: string): string {
  if (!names.length) return 'Record<string, never>';
  const fields = names.map(({ name, optional }) => {
    const p = props.get(name)!;
    return `${doc(propertyDoc(p), indent + '  ')}${indent}  ${name}${optional ? '?' : ''}: ${valueType(p)};`;
  });
  return `{\n${fields.join('\n')}\n${indent}}`;
}

function eventFields(e: Event) {
  return [
    ...(e.properties?.required ?? []).map((name) => ({ name, optional: false })),
    ...(e.properties?.optional ?? []).map((name) => ({ name, optional: true })),
  ];
}

// ─── types.ts ───────────────────────────────────────────────────────────────────

const { pillars, mechanics, events, kpis, naming } = registry;
const allProps = registry.properties.properties;
const byScope = (scope: Property['scope']) => allProps.filter((p) => p.scope === scope);

let out = `// Generated from registry/ by src/generate.ts. Do not edit: change the YAML instead.
// License: CC0 1.0, like the registry it is generated from.

/** The version of AREA these types describe. */
export type AreaVersion = ${lit(version)};

export const AREA_VERSION: AreaVersion = ${lit(version)};

/** The four pillars. */
export type PillarId = ${union(pillars.pillars.map((p) => p.id))};

/** The mechanics an app may have; each one makes its events mandatory. */
export type MechanicId = ${union(mechanics.mechanics.map((m) => m.id))};

/** The closed vocabulary of verbs that end every event name. */
export type Verb = ${union(Object.keys(naming.events.verbs))};

/** Every event of the registry. */
export type EventName = ${union(events.events.map((e) => e.name))};

/** The three core events, the roles every app fills. */
export type CoreEventName = ${union(events.events.filter((e) => e.layer === 'core').map((e) => e.name))};

/** Every KPI of the registry. */
export type KpiId = ${union(kpis.kpis.map((k) => k.id))};

/** The reference KPI of each pillar. */
export type ReferenceKpiId = ${union(kpis.kpis.filter((k) => k.reference).map((k) => k.id))};

/** Every property of the registry. */
export type PropertyName = ${union(allProps.map((p) => p.name))};

/** Properties sent with every event. */
export type CommonPropertyName = ${union(byScope('common').map((p) => p.name))};

/** Durable user state. */
export type UserPropertyName = ${union(byScope('user').map((p) => p.name))};

/** Context of one event. */
export type EventPropertyName = ${union(byScope('event').map((p) => p.name))};

/** Properties whose closed list each app defines in its tracking plan. */
export type AppDefinedPropertyName = ${union(allProps.filter(isAppDefined).map((p) => p.name))};

// ─── Closed lists ───────────────────────────────────────────────────────────────

`;

for (const p of allProps) {
  const values = closedList(p);
  if (!values) continue;
  out += doc([`\`${p.name}\`${p.description ? `: ${p.description}` : ''}`, deprecated(p.stability)]);
  out += `export type ${pascal(p.name)} = ${union(values)};\n\n`;
}

out += `// ─── App-defined lists ──────────────────────────────────────────────────────────

/**
 * The closed lists an app defines for itself, e.g. \`{ feature_name: 'export' | 'search' }\`.
 * Every list left out stays \`string\`.
 */
export type AppValues = { readonly [K in AppDefinedPropertyName]?: string };

/** The value type of an app-defined property: the app's own list, or \`string\`. */
export type AppValue<A extends AppValues, K extends AppDefinedPropertyName> = K extends keyof A
  ? [NonNullable<A[K]>] extends [never]
    ? string
    : NonNullable<A[K]>
  : string;

type NoAppValues = Record<never, never>;

// ─── Properties ─────────────────────────────────────────────────────────────────

/** The value type of every property. */
export interface PropertyValues<A extends AppValues = NoAppValues> ${propertyMap(
  allProps.map((p) => ({ name: p.name, optional: false })),
  '',
)}

/** Properties sent with every event. */
export interface CommonProperties<A extends AppValues = NoAppValues> ${propertyMap(
  byScope('common').map((p) => ({ name: p.name, optional: false })),
  '',
)}

/** The value type of each user property. Apps set the ones that apply to them. */
export interface UserProperties<A extends AppValues = NoAppValues> ${propertyMap(
  byScope('user').map((p) => ({ name: p.name, optional: false })),
  '',
)}

// ─── Events ─────────────────────────────────────────────────────────────────────

/**
 * The properties of each event: required ones always, optional ones when their condition holds.
 * Common properties are not repeated here.
 */
export interface EventProperties<A extends AppValues = NoAppValues> {
${events.events
  .map(
    (e) =>
      `${doc([e.when, e.condition ? `Condition: ${e.condition}` : undefined, deprecated(e.stability)], '  ')}  ${e.name}: ${propertyMap(eventFields(e), '  ')};`,
  )
  .join('\n')}
}

/** The properties of one event. */
export type PropertiesOf<E extends EventName, A extends AppValues = NoAppValues> = EventProperties<A>[E];
`;

// ─── Write ──────────────────────────────────────────────────────────────────────

const generated = join(root, 'src', 'generated');
mkdirSync(generated, { recursive: true });
mkdirSync(join(root, 'dist'), { recursive: true });

writeFileSync(join(generated, 'types.ts'), out);
writeFileSync(
  join(generated, 'registry.ts'),
  `// Generated from registry/ by src/generate.ts. Do not edit: change the YAML instead.
// License: CC0 1.0, like the registry it is generated from.

import type { Registry } from '../schema.ts';

/** The AREA registry, version ${version}: the six files of registry/, keys unchanged. */
export const registry = ${JSON.stringify(registry, null, 2)} as const satisfies Registry;
`,
);
writeFileSync(join(root, 'dist', 'registry.json'), `${JSON.stringify(registry, null, 2)}\n`);
copyFileSync(join(registryDir, 'LICENSE'), join(root, 'LICENSE-registry'));

console.log(`generated AREA ${version}: ${events.events.length} events, ${allProps.length} properties, ${kpis.kpis.length} KPIs`);
