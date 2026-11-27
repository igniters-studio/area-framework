#!/usr/bin/env node
/**
 * area-framework validate [dir]
 *
 * Validates a registry directory (default: ./registry) against the rules of AREA. Prints every
 * error, then "registry OK" or the count, and exits with status 1 when an error is found.
 */

import { loadRegistry } from './load.ts';
import { validateRegistry } from './validate.ts';

const USAGE = 'Usage: area-framework validate [path/to/registry]';

function report(errors: readonly string[], warnings: readonly string[]): never {
  for (const w of warnings) console.log(`warning: ${w}`);
  for (const e of errors) console.log(`error: ${e}`);
  if (errors.length) {
    console.log(`${errors.length} error(s)`);
    process.exit(1);
  }
  console.log('registry OK');
  process.exit(0);
}

const [command, dir = 'registry', ...rest] = process.argv.slice(2);
if (command === '--help' || command === '-h') {
  console.log(USAGE);
  process.exit(0);
}
if (command !== 'validate' || rest.length > 0) {
  console.error(USAGE);
  process.exit(2);
}

const loaded = loadRegistry(dir);
if (loaded.errors.length) report(loaded.errors, []);
const result = validateRegistry(loaded.files);
report(result.errors, result.warnings);
