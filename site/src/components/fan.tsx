import type { CoreKpi, PillarId } from "@/lib/registry";

const CORE_EVENTS = ["app_opened", "aha_moment_reached", "core_action_completed"] as const;

/** A pillar's color on a dark ground, from the identity tokens of globals.css. */
const onDark = (pillar: PillarId) => `var(--${pillar}-dark)`;

/**
 * Geometry of the design: events 64 px high every 138 px; KPI rows every 52 px, 44 px high so a
 * long KPI name from the spec fits on two lines.
 */
const KPI_STEP = 52;
const KPI_HEIGHT = 44;
const EVENT_STEP = 138;
const EVENT_HEIGHT = 64;
const EVENT_RIGHT = 280;
const KPI_LEFT = 640;

/**
 * The three core events and the KPIs they compute on their own, drawn from the KPI table of
 * `spec/mvt.md`: one line per event a KPI uses, in the color of the KPI's pillar.
 */
export function Fan({ kpis, label }: { kpis: CoreKpi[]; label: string }) {
  const height = 12 + KPI_STEP * (kpis.length - 1) + KPI_HEIGHT + 12;
  const eventCenter = (index: number) =>
    height / 2 + (index - (CORE_EVENTS.length - 1) / 2) * EVENT_STEP;
  const kpiCenter = (index: number) => 12 + KPI_STEP * index + KPI_HEIGHT / 2;

  return (
    <div className="fan-scroll">
      <div className="fan" style={{ height }}>
        <svg width="1040" height={height} viewBox={`0 0 1040 ${height}`} fill="none" aria-hidden="true">
          <g strokeWidth="1.5" strokeOpacity=".7">
            {kpis.flatMap((kpi, k) =>
              kpi.events
                .filter((event) => (CORE_EVENTS as readonly string[]).includes(event))
                .map((event) => {
                  const ey = eventCenter(CORE_EVENTS.indexOf(event as (typeof CORE_EVENTS)[number]));
                  const ky = kpiCenter(k);
                  const mid = (EVENT_RIGHT + KPI_LEFT) / 2;
                  return (
                    <path
                      key={`${kpi.name}-${event}`}
                      d={`M${EVENT_RIGHT} ${ey} C${mid} ${ey} ${mid} ${ky} ${KPI_LEFT} ${ky}`}
                      style={{ stroke: onDark(kpi.pillar) }}
                    />
                  );
                })
            )}
          </g>
        </svg>
        {CORE_EVENTS.map((event, index) => (
          <div
            key={event}
            className="fan-event"
            aria-hidden="true"
            style={{ top: eventCenter(index) - EVENT_HEIGHT / 2 }}
          >
            {event}
          </div>
        ))}
        <ul className="fan-kpis" aria-label={label}>
          {kpis.map((kpi, index) => (
            <li key={kpi.name} className="fan-kpi" style={{ top: 12 + KPI_STEP * index }}>
              <span>{kpi.name}</span>
              <span className="pillar-tag" style={{ color: onDark(kpi.pillar) }}>
                {kpi.pillarLabel}
              </span>
              <span className="sr-only">: {kpi.events.join(", ")}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
