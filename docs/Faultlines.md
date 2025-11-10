# Faultlines Diagnostic

The Faultlines feature surfaces structural strengths and vulnerabilities across eight composite axes that mirror the backend response. Each axis bundles relevant metrics, a bespoke visualization, and actionable insight copy. The layout mirrors other premium analytics modules (Echoes of Battle, Patterns Beneath the Chaos) using stacked hero insights, responsive cards, and champion-themed gradients.

## Axes overview

| Axis | Focus | Visualization | Sample Insight | Metrics Referenced |
| --- | --- | --- | --- | --- |
| Combat Efficiency Index (CEI) | Skirmish efficiency and conversion | Horizontal bar with benchmark overlay | "You excel in sustained fights but overcommit in solo skirmishes." | KDA, kill participation, damage per fight |
| Objective Reliability Index (ORI) | Major objective impact | Progress track with team benchmark | "High in objective presence but low in steals." | Baron, dragon, turret participation |
| Survival Discipline (SDI) | Death avoidance vs. mitigation | Histogram of deaths per game | "Great at trading efficiently but tends to fall during overextensions." | Deaths, damage taken, time CCing others |
| Vision & Awareness Index (VAI) | Vision creation and denial | Line trend over recent matches | "Maintains strong vision control but lacks in clearing enemy wards." | Vision score, wards placed/killed |
| Economy Utilization (EUI) | Gold conversion into pressure | Scatter of gold earned vs. converted | "Strong conversion rate of gold into pressure; rarely floats unspent gold." | Gold earned/spent, damage per gold |
| Role Stability Index (RSI) | Role-to-role consistency | Mini radar (role scores) | "Mid and Jungle show stability; Top lane remains volatile." | Role win rate, role KDA |
| Momentum Index (MI) | Match streak dynamics | Area timeline of streak confidence | "Once you start winning, you sustain — needs better comeback resilience." | Win/loss run lengths, comeback attempts |
| Composure Index (CI) | Volatility between best and worst games | Box plot of performance variance | "High performance variance — explosive highs, but equally deep lows." | KDA, gold, deaths standard deviation |

## UI structure

1. **Hero Header** – Title, subtitle, and metadata describing the analysed window and generation timestamp.
2. **Axis Grid** – Responsive cards (minimum 320px) that include insight text, derived metric badges, the visualization, and supporting metrics with trend meters.

## Implementation notes

- Visualizations adapt to the backend payload: `bar`, `progress`, `histogram`, `line`, `scatter`, `radar`, `timeline`, and `boxplot` types map to Recharts primitives or lightweight CSS constructs.
- Metric meters accept `percent` values in `[0, 1]` and optional trend signals to tint bars green/red.
- Layout components live in `Faultlines.styles.ts` to stay consistent with the themed gradient backgrounds already used across premium features.
- The data layer mirrors other premium sections: the repository writes every server response to `FaultlinesLocalDataSource` (a Dexie-backed cache) and serves cached sections immediately while background-syncing fresh data.
- Set `VITE_FAULTLINES_USE_MOCK=true` during development to short-circuit the remote sync; mock payloads are still persisted locally so the offline-first flow remains consistent.
