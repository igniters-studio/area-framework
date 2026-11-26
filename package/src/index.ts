/**
 * AREA Framework registry: the registry as typed data, the TypeScript types generated from it, and
 * its validator. Nothing here touches the file system, so an app can import it.
 */

export * from './generated/types.ts';
export { registry } from './generated/registry.ts';
export { validateRegistry, type ValidationResult } from './validate.ts';
export type * from './schema.ts';
export { REGISTRY_FILES } from './schema.ts';
