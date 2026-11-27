import type { Dictionary } from "@/dictionaries/fr";

/** Illustrative core retention by cohort, in percent, at D0, D1, D7, D14 and D30. */
const ACTIVATED = [100, 68, 49, 44, 40];
const NOT_ACTIVATED = [100, 31, 14, 10, 7];

const W = 560;
const H = 260;
const LEFT = 44;
const RIGHT = 16;
const TOP = 16;
const BOTTOM = 36;

const x = (index: number) => LEFT + ((W - LEFT - RIGHT) * index) / (ACTIVATED.length - 1);
const y = (value: number) => TOP + ((H - TOP - BOTTOM) * (100 - value)) / 100;
const path = (values: number[]) =>
  values.map((value, index) => `${index === 0 ? "M" : "L"}${x(index).toFixed(1)} ${y(value).toFixed(1)}`).join(" ");

/**
 * A generic analytics chart, not any vendor's interface: what a reference KPI looks like once the
 * right events come in. The figures are made up and labelled as such.
 */
export function RetentionChart({ t }: { t: Dictionary["pillars"]["chart"] }) {
  return (
    <figure className="chart-card" data-reveal>
      <div className="chart-head">
        <span className="chart-title">{t.title}</span>
        <span className="chart-note">{t.note}</span>
      </div>
      <div className="chart-body">
        <div className="chart-meta">
          <span className="chart-kpi">{t.kpi}</span>
          <span className="chart-legend">
            <span className="legend-item">
              <span className="legend-swatch" style={{ background: "var(--retention)" }} />
              {t.activated}
            </span>
            <span className="legend-item">
              <span className="legend-swatch legend-dashed" />
              {t.notActivated}
            </span>
          </span>
        </div>
        <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t.label}>
          {[0, 25, 50, 75, 100].map((tick) => (
            <g key={tick}>
              <line className="grid" x1={LEFT} x2={W - RIGHT} y1={y(tick)} y2={y(tick)} />
              <text className="axis" x={LEFT - 8} y={y(tick) + 4} textAnchor="end">
                {tick}%
              </text>
            </g>
          ))}
          {t.days.map((day, index) => (
            <text key={day} className="axis" x={x(index)} y={H - 10} textAnchor="middle">
              {day}
            </text>
          ))}
          <path className="line line-muted" d={path(NOT_ACTIVATED)} pathLength={1} />
          <path className="line line-main" d={path(ACTIVATED)} pathLength={1} />
          {ACTIVATED.map((value, index) => (
            <circle key={index} className="dot" cx={x(index)} cy={y(value)} r={4} />
          ))}
        </svg>
      </div>
      <figcaption className="chart-caption">{t.caption}</figcaption>
    </figure>
  );
}
