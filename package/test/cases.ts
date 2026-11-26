/**
 * Broken copies of the real registry, one per rule: each case rewrites one file and names a message
 * the validator must print.
 */

export interface BrokenCase {
  readonly name: string;
  readonly file: string;
  readonly from: string | RegExp;
  readonly to: string;
  readonly expect: string;
}

export const CASES: readonly BrokenCase[] = [
  {
    name: 'an unquoted comma in a flow mapping',
    file: 'kpis',
    from: 'notes: Month for a low-frequency app.',
    to: 'notes: Month, for a low-frequency app.',
    expect: 'for a low-frequency app.: empty key or value',
  },
  {
    name: 'a verb outside the vocabulary',
    file: 'events',
    from: 'name: invite_shared',
    to: 'name: invite_sent',
    expect: "event invite_sent: verb 'sent' is not in the vocabulary",
  },
  {
    name: 'an unknown property on an event',
    file: 'events',
    from: 'required: [content_type, share_method]',
    to: 'required: [content_type, share_method, share_channel]',
    expect: 'event content_shared: unknown property share_channel',
  },
  {
    name: 'a user property carried without copied_on',
    file: 'properties',
    from: '    copied_on: [feature_used]\n',
    to: '',
    expect: 'event feature_used: carries user property user_plan without copied_on',
  },
  {
    name: 'an enum without values',
    file: 'properties',
    from: '    values: [local, push]\n',
    to: '',
    expect: 'property delivery_type: enum without values',
  },
  {
    name: 'a boolean without is_ or has_',
    file: 'properties',
    from: /is_internal/g,
    to: 'internal_user',
    expect: 'property internal_user: boolean without is_ or has_ prefix',
  },
  {
    name: 'a reserved property name',
    file: 'properties',
    from: 'name: step_total',
    to: 'name: session_id',
    expect: 'property session_id: reserved name',
  },
  {
    name: 'an event no KPI uses',
    file: 'kpis',
    from: 'inputs: [app_opened, core_action_completed, content_shared]',
    to: 'inputs: [app_opened, core_action_completed]',
    expect: 'event content_shared: no KPI uses it',
  },
  {
    name: 'a numerator event missing from inputs',
    file: 'kpis',
    from: 'numerator: { event: reward_received,',
    to: 'numerator: { event: referral_code_applied,',
    expect: 'kpi rewarded_referrers: numerator event referral_code_applied is not in inputs',
  },
  {
    name: 'a numerator property missing from requires_properties',
    file: 'kpis',
    from: 'requires_properties: [reward_reason]',
    to: 'requires_properties: [reward_type]',
    expect: 'kpi rewarded_referrers: numerator property reward_reason missing from requires_properties',
  },
  {
    name: 'two versions in the registry',
    file: 'pillars',
    from: 'area_version: 0.2.0',
    to: 'area_version: 0.3.0',
    expect: 'area_version differs between files',
  },
  {
    name: 'a pillar whose reference KPI is not the one marked',
    file: 'pillars',
    from: 'reference_kpi: core_retention',
    to: 'reference_kpi: open_retention',
    expect: "pillar retention: reference KPI should be open_retention, found ['core_retention']",
  },
  {
    name: 'an unknown mechanic on an event',
    file: 'events',
    from: 'mechanic: rewards',
    to: 'mechanic: loyalty',
    expect: 'event reward_received: unknown mechanic loyalty',
  },
];
