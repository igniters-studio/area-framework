import GithubSlugger from "github-slugger";
import Link from "next/link";

import { CopyPrompt } from "@/components/copy-prompt";
import { Fan } from "@/components/fan";
import { Wordmark } from "@/components/chrome";
import type { Dictionary } from "@/dictionaries/fr";
import { type Lang, REPO_URL, sitePath } from "@/lib/content";
import { areaVersion, coreKpis, type PillarId, pillarMechanics } from "@/lib/registry";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const PILLARS: readonly PillarId[] = ["activation", "retention", "engagement", "advocacy"];

/** The mechanics the home page names; the rest are counted from the registry. */
const SHOWN_MECHANICS = [
  "onboarding",
  "permissions",
  "notifications",
  "content_sharing",
  "referral",
  "review_prompt",
] as const;

/** The design's "illustrative" measurement plan: fictional names, shown as such. */
const TYPICAL_PLAN = [
  "tap_start_button",
  "home_banner_click",
  "view_settings_page",
  "tab_profile_clicked",
  "btnShareTapped",
  "popup_close",
  "scroll_home_50",
  "click_cta_v2",
  "page_view_paywall",
  "toggle_dark_mode",
  "Onboarding Step 2",
  "menu_open",
  "swipe_card_left",
  "filter_applied_home",
  "nb_clicks_to_feature",
  "search_bar_focus",
  "tap_back_arrow",
  "modal_rate_shown",
  "click_footer_link",
  "video_play_tap",
  "carousel_slide_3",
  "settings_notif_toggle",
  "hamburger_click",
  "pull_to_refresh",
];

const CORE_EVENTS = ["app_opened", "aha_moment_reached", "core_action_completed"];

export function Home({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const version = areaVersion();
  const kpis = coreKpis(lang);
  const pillarCount = new Set(kpis.map((kpi) => kpi.pillar)).size;
  const mechanics = pillarMechanics();
  const hiddenMechanics = mechanics.length - SHOWN_MECHANICS.length;
  const storyAnchor = new GithubSlugger().slug(dict.origin.title);
  const t = dict.hero.stream;

  // Fictional first week of a running app; values from the registry's closed lists.
  const stream: [string, string, string, string][] = [
    ["0:00", "app_opened", t.firstLaunch, "var(--activation)"],
    ["0:38", "onboarding_completed", t.steps, "var(--activation)"],
    ["1:12", "aha_moment_reached", "", "var(--activation)"],
    ["1:12", "core_action_completed", '"run"', "var(--engagement)"],
    [t.day1, "notification_opened", '"streak_reminder"', "var(--retention)"],
    [t.day1, "core_action_completed", '"run"', "var(--retention)"],
    [t.day3, "satisfaction_prompt_answered", '"positive"', "var(--advocacy)"],
    [t.day3, "invite_shared", '"link_copied"', "var(--advocacy)"],
  ];
  const kpiCards: [PillarId, string, number][] = [
    ["activation", "A", 46],
    ["retention", "R", 28],
    ["engagement", "E", 61],
    ["advocacy", "A", 9],
  ];

  return (
    <main id="top">
      <section className="wrap hero">
        <div className="hero-copy">
          <a href={`${REPO_URL}/blob/main/CHANGELOG.md`} className="release">
            <span className="release-version">{version}</span>
            {dict.hero.badge}
          </a>
          <h1>{dict.hero.title}</h1>
          <p className="hero-lead">{dict.hero.lead}</p>
          <div className="actions">
            <a href="#pillars" className="button button-dark">
              {dict.hero.primary}
            </a>
            <a href={REPO_URL} className="button button-light">
              {dict.hero.secondary}
            </a>
          </div>
        </div>

        <div className="panel" role="img" aria-label={dict.hero.panelLabel}>
          <div className="panel-head">
            <span className="panel-title">
              <span className="live-dot" />
              {dict.hero.panelTitle}
            </span>
            <span className="panel-note">{dict.hero.panelNote}</span>
          </div>
          <div className="stream-box">
            <ul className="stream">
              {[...stream, ...stream].map(([time, name, detail, color], index) => (
                <li key={index}>
                  <span className="bar" style={{ background: color }} />
                  <span className="time">{time}</span>
                  <span className="name">{name}</span>
                  <span className="detail">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="kpi-grid">
            {kpiCards.map(([pillar, letter, value]) => (
              <div className="kpi" key={pillar}>
                <span className="kpi-letter" style={{ color: `var(--${pillar})` }}>
                  {letter}
                </span>
                <span className="kpi-name">{dict.hero.kpis[pillar]}</span>
                <span className="kpi-value">{value}%</span>
                <span className="kpi-track">
                  <span className="kpi-fill" style={{ width: `${value}%`, background: `var(--${pillar})` }} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="problem-title" className="band-paper">
        <div className="wrap problem">
          <div className="stack" style={{ gap: 36 }}>
            <div className="stack" style={{ gap: 16 }}>
              <h2 id="problem-title" className="h2">
                {dict.problem.title}
              </h2>
              <p className="lead" style={{ maxWidth: "30em" }}>
                {dict.problem.lead}
              </p>
            </div>
            <dl>
              {dict.problem.items.map((item) => (
                <div key={item.term}>
                  <dt>{item.term}</dt>
                  <dd>{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <figure className="plan">
            <figcaption>
              <span className="plan-title">{dict.problem.planTitle}</span>
              <span className="plan-note">{dict.problem.planNote}</span>
            </figcaption>
            <div className="plan-cloud" aria-hidden="true">
              {TYPICAL_PLAN.map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
            <div className="stack" style={{ gap: 12, paddingTop: 4 }}>
              <span className="plan-title">{dict.problem.areaTitle}</span>
              <div className="core-chips">
                {CORE_EVENTS.map((event) => (
                  <span key={event}>{event}</span>
                ))}
              </div>
              <span className="plan-note" style={{ fontSize: 16 }}>
                {dict.problem.areaNote}
              </span>
            </div>
          </figure>
        </div>
      </section>

      <section id="pillars" aria-labelledby="pillars-title" className="wrap section">
        <div className="stack" style={{ gap: 16, maxWidth: 760 }}>
          <h2 id="pillars-title" className="h2">
            {dict.pillars.title}
          </h2>
          <p className="lead">{dict.pillars.lead}</p>
        </div>
        <div className="pillar-grid">
          {PILLARS.map((pillar) => {
            const item = dict.pillars.items[pillar];
            return (
              <Link key={pillar} href={sitePath(lang, `spec/pillars/${pillar}`)} className="pillar">
                <h3 aria-label={item.name}>
                  <span aria-hidden="true" className="pillar-initial" style={{ color: `var(--${pillar})` }}>
                    {item.name.charAt(0)}
                  </span>
                  <span aria-hidden="true" className="pillar-rest">
                    {item.name.slice(1)}
                  </span>
                </h3>
                <span className="pillar-question">{item.question}</span>
                <span className="pillar-kpi" style={{ color: `var(--${pillar}-ink)` }}>
                  <span className="swatch" style={{ background: `var(--${pillar})` }} />
                  {item.kpi}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="chain-block">
          <div className="stack" style={{ gap: 10, maxWidth: 760 }}>
            <h3>{dict.pillars.chainTitle}</h3>
            <p className="lead" style={{ fontSize: 18 }}>
              {dict.pillars.chainLead}
            </p>
          </div>
          <div className="stack" style={{ gap: 14 }}>
            <div className="flow-line flow-down" aria-hidden="true">
              <span className="label">{dict.pillars.down}</span>
              <span className="rule" />
              <span className="tip" />
            </div>
            <ol className="chain-cards">
              <li className="up up4">
                <span className="small">{dict.pillars.chain.goalLabel}</span>
                <span className="big grow">{dict.pillars.chain.goal}</span>
                <span className="back">{dict.pillars.chain.goalBack}</span>
              </li>
              <li className="up up3 card-pillar">
                <span className="small">{dict.pillars.chain.pillarLabel}</span>
                <span className="big">{dict.pillars.chain.pillar}</span>
                <span className="question grow">{dict.pillars.items.retention.question}</span>
                <span className="back">{dict.pillars.chain.pillarBack}</span>
              </li>
              <li className="up up2">
                <span className="small">{dict.pillars.chain.kpiLabel}</span>
                <span className="big grow">{dict.pillars.chain.kpi}</span>
                <span className="back">{dict.pillars.chain.kpiBack}</span>
              </li>
              <li className="up up1 card-event">
                <span className="small">{dict.pillars.chain.eventLabel}</span>
                <span className="event">core_action_completed</span>
                <span className="prop grow">core_action_type: &quot;run&quot;</span>
                <span className="back">{dict.pillars.chain.eventBack}</span>
              </li>
            </ol>
            <div className="flow-line flow-up" aria-hidden="true">
              <span className="tip" />
              <span className="rule">
                <span className="back-dot" />
                <span className="back-dot b2" />
                <span className="back-dot b3" />
              </span>
              <span className="label">{dict.pillars.up}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="mvt" aria-labelledby="mvt-title" className="band-ink">
        <div className="wrap section" style={{ gap: 56 }}>
          <div className="stack" style={{ gap: 16, maxWidth: 780 }}>
            <h2 id="mvt-title" className="h2">
              {dict.mvt.title(kpis.length, pillarCount)}
            </h2>
            <p className="lead">{dict.mvt.lead}</p>
          </div>
          <Fan kpis={kpis} label={dict.mvt.fanLabel} />
          <div className="layers">
            <div className="stack" style={{ gap: 14 }}>
              <h3>{dict.mvt.layersTitle}</h3>
              <p className="lead" style={{ fontSize: 18, maxWidth: "28em" }}>
                {dict.mvt.layersLead}
              </p>
              <Link href={sitePath(lang, "spec/mvt")} className="on-dark-link">
                {dict.mvt.readMore}
              </Link>
            </div>
            <div className="stack">
              <div className="layer layer-1">
                <div className="layer-head">
                  <span className="layer-name">{dict.mvt.foundations}</span>
                  <span className="layer-note">{dict.mvt.foundationsNote}</span>
                </div>
                <span className="layer-text">{dict.mvt.foundationsText}</span>
              </div>
              <div className="layer layer-2">
                <div className="layer-head">
                  <span className="layer-name">{dict.mvt.core}</span>
                  <span className="layer-note">{dict.mvt.coreNote}</span>
                </div>
                <div className="layer-chips mono">
                  {CORE_EVENTS.map((event) => (
                    <span key={event}>{event}</span>
                  ))}
                </div>
              </div>
              <div className="layer layer-3">
                <div className="layer-head">
                  <span className="layer-name">{dict.mvt.mechanics}</span>
                  <span className="layer-note">{dict.mvt.mechanicsNote}</span>
                </div>
                <div className="layer-chips">
                  {SHOWN_MECHANICS.map((id) => (
                    <span key={id}>{dict.mvt.mechanicNames[id]}</span>
                  ))}
                  {hiddenMechanics > 0 && <span className="more">{dict.mvt.more(hiddenMechanics)}</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="apply" aria-labelledby="apply-title" className="wrap section" style={{ gap: 44 }}>
        <h2 id="apply-title" className="h2" style={{ maxWidth: 760 }}>
          {dict.apply.title}
        </h2>
        <ol className="steps">
          {dict.apply.steps.map((step, index) => (
            <li key={step.title}>
              {/* The first step writes a goal for each pillar: its bar carries the four colors. */}
              <span className="step-bar" aria-hidden="true">
                {index === 0 ? (
                  PILLARS.map((pillar) => <span key={pillar} style={{ background: `var(--${pillar})` }} />)
                ) : (
                  <span />
                )}
              </span>
              <span className="step-number">{index + 1}</span>
              <strong>{step.title}</strong>
              <span className="text">{step.text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section id="compare" aria-labelledby="compare-title" className="wrap compare">
        <h2 id="compare-title" className="h2">
          {dict.compare.title}
        </h2>
        <div className="compare-table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">{dict.compare.criterion}</span>
                </th>
                <th scope="col">AARRR</th>
                <th scope="col">HEART</th>
                <th scope="col" className="area">
                  <Wordmark />
                </th>
              </tr>
            </thead>
            <tbody>
              {dict.compare.rows.map((row, index) => {
                const last = index === dict.compare.rows.length - 1;
                return (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.aarrr}</td>
                    <td>{row.heart}</td>
                    <td className={last ? "area yes" : "area"}>{row.area}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="origin-title" className="band-paper">
        <figure className="wrap origin">
          <h2 id="origin-title">{dict.origin.title}</h2>
          <div className="origin-body">
            <blockquote>{dict.origin.quote}</blockquote>
            <figcaption>
              {dict.origin.author}{" "}
              <Link href={`${sitePath(lang, "about")}#${storyAnchor}`}>{dict.origin.more}</Link>
            </figcaption>
          </div>
        </figure>
      </section>

      <section aria-labelledby="cta-title" className="wrap cta-section">
        <div className="cta">
          <h2 id="cta-title" className="h2">
            {dict.cta.title}
          </h2>
          <div className="cta-cards">
            <div className="cta-card">
              <h3>{dict.cta.productTitle}</h3>
              <p>{dict.cta.productText}</p>
              <div className="actions">
                <Link href={sitePath(lang, "about")} className="button button-light">
                  {dict.cta.productLink}
                </Link>
              </div>
            </div>
            <div className="cta-card">
              <h3>{dict.cta.devTitle}</h3>
              <p>{dict.cta.devText}</p>
              <CopyPrompt prompt={dict.cta.devPrompt} copy={dict.cta.copy} copied={dict.cta.copied} />
              <div className="actions">
                <a href={REPO_URL} className="button button-light">
                  {dict.cta.devLink}
                </a>
                <a href={`${BASE_PATH}/llms.txt`} className="button button-ghost">
                  llms.txt
                </a>
              </div>
            </div>
          </div>
          <div className="cta-foot">
            <p>
              <strong>{dict.cta.nextLabel}</strong> {dict.cta.next}
            </p>
            <a href={REPO_URL} className="on-dark-link">
              {dict.cta.star}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
