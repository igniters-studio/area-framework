# 0001. Publish the registry on npm

- Status: accepted
- Date: 2026-11-27

## Context

The registry (`registry/`) is the spec in machine-readable form: events, properties and their
closed lists, mechanics, KPIs. The tools that apply AREA inside an app's code need it, and today
they copy it by hand. Every new version of AREA means redoing the copy, and a gap (an event renamed,
a value added to a closed list) goes unnoticed until someone reads both side by side.

The registry validator is a Python script, while the tooling of AREA starts with React Native and
Expo, in TypeScript. Its rules live in a language its consumers do not run.

## Decision

1. **Name and registry.** The registry is published as `area-framework`, an unscoped package on the
   public npm registry (registry.npmjs.org), owned by the npm organization `igniters`.
   - Not GitHub Packages: it asks for an authentication token even to install a public package,
     and a scope mapped to it in a project's `.npmrc` sends every package of that scope there.
     A framework anyone can adopt must install with no configuration.
   - Unscoped rather than `@igniters/…`: the install line names the framework, like the repo and
     the website, and no studio.
2. **Content.**
   - `registry.json`: the six registry files in one JSON document, with their keys unchanged.
   - TypeScript types generated from the YAML at build time: version, pillar, mechanic, event,
     property and KPI names; one union per closed list; the properties of each event, required and
     optional; common and user properties. A property whose values are `app_defined` (such as
     `feature_name` or `screen_name`) is a type parameter that defaults to `string`: each app
     narrows it to its own list.
   - The registry as a typed object, `validateRegistry()`, and a command line,
     `npx area-framework validate [dir]`.
   - Generated files are never committed: the YAML stays the only source.
3. **One validator, in TypeScript.** The package holds the only validator, run on every pull
   request. The Python script is removed. Same checks, same messages.
4. **Licenses.** The data (the registry, `registry.json`, and the types and data generated from
   it) is under CC0 1.0, like `registry/`. The code (validator, generator, command line) is under
   Apache 2.0. The package declares `Apache-2.0 AND CC0-1.0` and ships both texts.
5. **Version.** The package version is `area_version`: one number for the spec, the registry and
   the package. The build fails when they differ. The package is published by the `release` job
   of the Pages workflow, only when the registry on `main` is identical to the tag
   `v<area_version>`, with npm provenance.

## Consequences

- A consumer pins one version of AREA, and a rename in the registry becomes a type error in its
  build, with the name of the event or the property.
- Validating the registry needs Node instead of Python.
- A release bumps one more file, `package/package.json`.
- A fix to the package's code alone ships with the next version of AREA (a patch when it has no
  effect on tracking).
- Publishing depends on an npm token kept as the `NPM_TOKEN` secret, to rotate when it expires.

## Alternatives not kept

- **Reading the YAML from the GitHub tag at build time**: no types, a network call in every
  build, and a parser in every consumer.
- **Committing the generated types**: a second copy that can drift from the YAML.
- **A version of its own for the package**: a table to keep between two numbers.
