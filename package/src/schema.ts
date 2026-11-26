/**
 * The shape of the six registry files (`registry/*.yaml`), as they appear in `registry.json` and in
 * the `registry` object. Names are plain strings here: the unions of the names this version of
 * AREA defines (`EventName`, `PropertyName`…) are generated from the registry itself.
 */

export type Stability = 'development' | 'stable' | 'deprecated';

export type Text = string;

export interface NameRules {
  readonly pattern: string;
  readonly max_length: number;
  readonly grammar: string;
  /** Closed vocabulary of verbs, each with its one meaning. */
  readonly verbs: { readonly [verb: string]: Text };
}

export interface ReservedNames {
  readonly prefixes: readonly string[];
  readonly names: readonly string[];
}

export interface Naming {
  readonly area_version: string;
  readonly stability: Stability;
  readonly language: string;
  readonly events: NameRules;
  readonly properties: {
    readonly pattern: string;
    readonly max_length: { readonly event_property: number; readonly user_property: number };
    readonly max_value_length: { readonly event_property: number; readonly user_property: number };
    readonly max_per_event: number;
    readonly max_user_properties: number;
    readonly rules: {
      readonly boolean: { readonly prefix: readonly string[] };
      readonly [rule: string]: unknown;
    };
  };
  readonly limits_source: string;
  readonly limits_checked_on: string;
  readonly reserved: {
    readonly event_names: ReservedNames;
    readonly event_properties: ReservedNames;
    readonly user_properties: ReservedNames;
    readonly sources: readonly string[];
    readonly checked_on: string;
  };
  readonly stability_levels: { readonly [level in Stability]: Text };
  readonly promotion: { readonly [key: string]: Text | readonly Text[] };
  readonly versioning: { readonly major: Text; readonly minor: Text; readonly patch: Text };
}

export interface Pillar {
  readonly id: string;
  readonly name: string;
  readonly question: Text;
  readonly business_goal_example: Text;
  readonly reference_kpi: string;
  readonly stability: Stability;
}

export interface PillarsFile {
  readonly area_version: string;
  readonly pillars: readonly Pillar[];
}

export interface Mechanic {
  readonly id: string;
  readonly name: string;
  readonly description: Text;
  /** `foundations` for a mechanic that applies before the pillars; otherwise `pillar` is set. */
  readonly layer?: 'foundations';
  readonly pillar?: string;
  readonly stability: Stability;
}

export interface MechanicsFile {
  readonly area_version: string;
  readonly mechanics: readonly Mechanic[];
}

export type PropertyScope = 'common' | 'user' | 'event';
export type PropertyType = 'string' | 'enum' | 'boolean' | 'integer';

export interface Property {
  readonly name: string;
  readonly scope: PropertyScope;
  readonly type: PropertyType;
  /** A closed list, or `app_defined`: each app documents its own closed list in its tracking plan. */
  readonly values?: readonly string[] | 'app_defined';
  readonly range?: readonly [number, number];
  readonly description?: Text;
  readonly notes?: Text;
  /** Events that carry a copy of this user property, to keep its value at the time of the event. */
  readonly copied_on?: readonly string[];
  readonly stability: Stability;
}

export interface PropertiesFile {
  readonly area_version: string;
  readonly properties: readonly Property[];
}

export type EventLayer = 'core' | 'foundations' | 'mechanic';

export interface Event {
  readonly name: string;
  readonly pillar?: string;
  readonly layer: EventLayer;
  /** A core event is a role: an existing app may keep its own event name for it. */
  readonly role?: boolean;
  readonly mechanic?: string;
  readonly condition?: Text;
  readonly when: Text;
  readonly notes?: Text;
  readonly properties?: {
    readonly required?: readonly string[];
    readonly optional?: readonly string[];
  };
  readonly stability: Stability;
}

export interface EventsFile {
  readonly area_version: string;
  readonly events: readonly Event[];
}

export type PropertyFilter = string | number | boolean | { readonly [operator: string]: number };

export interface NumeratorTerm {
  readonly event: string;
  readonly occurrence?: string;
  readonly within_days?: string | number;
  readonly min_count?: number;
  readonly where?: { readonly [property: string]: PropertyFilter };
}

export type Numerator = NumeratorTerm | { readonly any_of: readonly NumeratorTerm[] };

export interface Kpi {
  readonly id: string;
  readonly pillar: string;
  /** The reference KPI of its pillar. */
  readonly reference?: boolean;
  readonly name: string;
  readonly definition: Text;
  readonly cohort?: string;
  readonly population?: string;
  readonly numerator?: Numerator;
  readonly window?: { readonly [key: string]: string | number };
  readonly calculation?: { readonly [key: string]: string };
  readonly read_at?: readonly string[];
  readonly volume?: Text;
  readonly inputs: readonly string[];
  readonly optional_inputs?: readonly string[];
  readonly requires_properties?: readonly string[];
  readonly requires_mechanics?: { readonly any_of: readonly string[] };
  readonly verdicts?: {
    readonly measurable: Text;
    readonly partial: Text;
    readonly not_measurable: Text;
  };
  readonly notes?: Text;
  readonly stability: Stability;
}

export interface KpisFile {
  readonly area_version: string;
  readonly definitions: { readonly [name: string]: Text };
  readonly kpis: readonly Kpi[];
}

/** The whole registry: its version and the six files, keys unchanged. */
export interface Registry {
  readonly area_version: string;
  readonly naming: Naming;
  readonly pillars: PillarsFile;
  readonly mechanics: MechanicsFile;
  readonly properties: PropertiesFile;
  readonly events: EventsFile;
  readonly kpis: KpisFile;
}

/** The registry files, in the order the validator reads them. */
export const REGISTRY_FILES = ['naming', 'pillars', 'mechanics', 'events', 'properties', 'kpis'] as const;

export type RegistryFileName = (typeof REGISTRY_FILES)[number];
