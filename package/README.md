# area-framework

The registry of the [AREA Framework](https://igniters-studio.github.io/area-framework/), for mobile
app analytics: its events, properties and their closed lists, mechanics and KPIs, as JSON and as
TypeScript types, with the validator of the registry.

The package version is the version of AREA. Pin the version your tracking plan follows: when a
new version renames an event or a value of a closed list, your build says where.

```sh
npm install area-framework
```

## Types

Every event of the registry, with its required and optional properties:

```ts
import type { EntryPoint, EventName, PropertiesOf } from 'area-framework';

const opened: PropertiesOf<'app_opened'> = {
  entry_point: 'notification',
  is_first_launch: false,
};
```

The properties whose closed list belongs to each app (`feature_name`, `screen_name`,
`core_action_type`…) are `string` by default. Pass your own lists to narrow them:

```ts
import type { EventProperties } from 'area-framework';

type MyApp = { core_action_type: 'run_logged'; feature_name: 'export' | 'search' };

const used: EventProperties<MyApp>['feature_used'] = { feature_name: 'export' };
```

Also exported: `PillarId`, `MechanicId`, `Verb`, `CoreEventName`, `KpiId`, `ReferenceKpiId`,
`PropertyName` and its scopes, one union per closed list (`EntryPoint`, `PermissionType`,
`NotificationType`…), `CommonProperties`, `UserProperties`, `PropertyValues`, and the shape of the
registry files (`Registry`, `Event`, `Property`, `Kpi`…).

## Data

```ts
import { AREA_VERSION, registry } from 'area-framework';

registry.kpis.kpis.filter((kpi) => kpi.reference);
```

The same data as one JSON document: `area-framework/registry.json`. Nothing in the package reads
the file system or the network, so it can be imported from an app.

## Validator

Validates a registry directory against the rules of AREA: empty keys and values (a sign of
malformed YAML), naming, reserved names, the verb vocabulary, and consistency between the files.

```sh
npx area-framework validate path/to/registry
```

It prints each error and exits with status 1 when it finds one. From code: `validateRegistry()`.

## Licenses

- The registry data (`registry.json`, the `registry` object and the types generated from it) is
  under [CC0 1.0](LICENSE-registry).
- The code (validator, generator, command line) is under [Apache 2.0](LICENSE).

The spec itself is at https://github.com/igniters-studio/area-framework.
