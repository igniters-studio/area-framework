import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { loadRegistry } from '../src/load.ts';
import { validateRegistry } from '../src/validate.ts';
import { CASES } from './cases.ts';

const REGISTRY = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'registry');

function brokenCopy(file: string, from: string | RegExp, to: string): string {
  const dir = mkdtempSync(join(tmpdir(), 'area-registry-'));
  cpSync(REGISTRY, dir, { recursive: true });
  const path = join(dir, `${file}.yaml`);
  const source = readFileSync(path, 'utf8');
  const changed = source.replace(from, to);
  assert.notEqual(changed, source, `the case does not apply to ${file}.yaml: ${String(from)}`);
  writeFileSync(path, changed);
  return dir;
}

test('the registry of this repo is valid', () => {
  const loaded = loadRegistry(REGISTRY);
  assert.deepEqual(loaded.errors, []);
  assert.deepEqual(validateRegistry(loaded.files).errors, []);
});

for (const c of CASES) {
  test(`rejects ${c.name}`, () => {
    const dir = brokenCopy(c.file, c.from, c.to);
    try {
      const { errors } = validateRegistry(loadRegistry(dir).files);
      assert.ok(
        errors.some((e) => e.includes(c.expect)),
        `expected "${c.expect}" in:\n${errors.join('\n')}`,
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
}

test('reports a missing file with its path', () => {
  const dir = mkdtempSync(join(tmpdir(), 'area-registry-'));
  cpSync(REGISTRY, dir, { recursive: true });
  rmSync(join(dir, 'kpis.yaml'));
  try {
    assert.deepEqual(loadRegistry(dir).errors, [`missing file: ${join(dir, 'kpis.yaml')}`]);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
