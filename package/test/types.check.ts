/**
 * Compile-time checks of the generated types: `yarn typecheck` fails when one of them stops
 * holding. A line under @ts-expect-error must not compile.
 */

import type {
  EntryPoint,
  EventName,
  EventProperties,
  PropertiesOf,
  UserProperties,
} from '../src/index.ts';
import { AREA_VERSION, registry } from '../src/index.ts';

type App = { core_action_type: 'run_logged'; feature_name: 'export' | 'search' };

export const opened: PropertiesOf<'app_opened'> = { entry_point: 'notification', is_first_launch: false };

// @ts-expect-error a value outside the closed list
export const wrongEntry: EntryPoint = 'push';

// @ts-expect-error a required property left out
export const missing: PropertiesOf<'app_opened'> = { entry_point: 'icon' };

// @ts-expect-error an unknown event
export const unknownEvent: EventName = 'paywall_shown';

// An optional property may be left out.
export const aha: PropertiesOf<'aha_moment_reached'> = { aha_version: 'v1' };

// App-defined lists stay `string` by default…
export const anyFeature: PropertiesOf<'feature_used'> = { feature_name: 'anything' };

// …and take the app's own list when it gives one.
export const feature: EventProperties<App>['feature_used'] = { feature_name: 'export' };
// @ts-expect-error a feature outside the app's list
export const wrongFeature: EventProperties<App>['feature_used'] = { feature_name: 'share' };
// @ts-expect-error a core action outside the app's list
export const wrongAction: PropertiesOf<'core_action_completed', App> = { core_action_type: 'other' };

// An event without properties takes none.
// @ts-expect-error a property on an event that has none
export const referral: PropertiesOf<'referral_link_opened'> = { link_source: 'email' };

export const plan: UserProperties<{ user_plan: 'free' | 'pro' }>['user_plan'] = 'pro';

// The data carries literal types.
export const version: '0.2.0' = AREA_VERSION;
export const firstEvent: 'app_opened' = registry.events.events[0].name;
