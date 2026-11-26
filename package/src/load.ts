/** Reads the registry files of a directory. The only module that touches the file system. */

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { parse } from 'yaml';

import { REGISTRY_FILES } from './schema.ts';

export interface LoadedRegistry {
  /** Parsed files, keyed by file name (`naming`, `pillars`…). */
  readonly files: { [name: string]: unknown };
  /** Missing or unreadable files, one message each. */
  readonly errors: string[];
}

export function loadRegistry(dir: string): LoadedRegistry {
  const files: { [name: string]: unknown } = {};
  const errors: string[] = [];
  for (const name of REGISTRY_FILES) {
    const path = join(dir, `${name}.yaml`);
    if (!existsSync(path)) {
      errors.push(`missing file: ${path}`);
      continue;
    }
    try {
      files[name] = parse(readFileSync(path, 'utf8'));
    } catch (cause) {
      errors.push(`${path}: invalid YAML, ${(cause as Error).message.split('\n')[0]}`);
    }
  }
  return { files, errors };
}
