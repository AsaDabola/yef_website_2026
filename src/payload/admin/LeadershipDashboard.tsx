import { getPayload } from "payload";
import config from "@payload-config";
import { getCountry } from "@/lib/i18n/countries";

/**
 * Leadership overview — the second row of the dashboard, right below the
 * content stat cards. Answers "how is the leadership pipeline doing right
 * now" without opening a single collection: total leaders, the three
 * regions leadership most wants visibility into, training/advancement
 * counts, a per-country breakdown, and which countries still have an open
 * leadership position.
 *
 * Counts are read live from `members` (role = leader) and
 * `leadership-positions` (filled = false) rather than cached, same as
 * DashboardStats — a failed read degrades to an empty/zero state instead of
 * taking the dashboard down.
 */
const HIGHLIGHT_REGIONS = ["Asia-Pacific", "Africa", "Europe"] as const;

export default async function LeadershipDashboard() {
  const payload = await getPayload({ config });

  const [leaders, openPositions] = await Promise.all([
    payload
      .find({
        collection: "members",
        where: { role: { equals: "leader" } },
        pagination: false,
        depth: 0,
      })
      .then((result) => result.docs)
      .catch(() => []),
    payload
      .find({
        collection: "leadership-positions",
        where: { filled: { equals: false } },
        pagination: false,
        depth: 0,
      })
      .then((result) => result.docs)
      .catch(() => []),
  ]);

  const byRegion = new Map<string, number>();
  const byCountry = new Map<string, number>();
  let inTraining = 0;
  let advancing = 0;
  let newThisMonth = 0;

  const now = new Date();

  for (const leader of leaders) {
    const code = leader.country;
    if (code) {
      byCountry.set(code, (byCountry.get(code) ?? 0) + 1);
      const region = getCountry(code)?.region;
      if (region) byRegion.set(region, (byRegion.get(region) ?? 0) + 1);
    }
    if (leader.trainingStage === "train") inTraining += 1;
    if (leader.advancingToNextStage) advancing += 1;
    if (leader.raisedUpAt) {
      const raisedUp = new Date(leader.raisedUpAt);
      if (
        raisedUp.getFullYear() === now.getFullYear() &&
        raisedUp.getMonth() === now.getMonth()
      ) {
        newThisMonth += 1;
      }
    }
  }

  const unfilledCountries = [
    ...new Set(openPositions.map((position) => position.country)),
  ]
    .map((code) => getCountry(code)?.name ?? code)
    .sort((a, b) => a.localeCompare(b));

  const countryRows = [...byCountry.entries()]
    .map(([code, count]) => ({ name: getCountry(code)?.name ?? code, count }))
    .sort((a, b) => b.count - a.count);

  const summaryCards = [
    { label: "Total Leaders Worldwide", value: leaders.length },
    ...HIGHLIGHT_REGIONS.map((region) => ({
      label: `Leaders in ${region}`,
      value: byRegion.get(region) ?? 0,
    })),
    { label: "Currently in Training", value: inTraining },
    { label: "New Leaders This Month", value: newThisMonth },
    { label: "Preparing to Advance", value: advancing },
  ];

  return (
    <div className="leadership-dashboard">
      <h3 className="leadership-dashboard__title">Leadership Overview</h3>

      <div className="dashboard-stats">
        {summaryCards.map((card) => (
          <div key={card.label} className="dashboard-stats__card">
            <div className="dashboard-stats__value">{card.value}</div>
            <div className="dashboard-stats__label">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="leadership-dashboard__columns">
        <div className="leadership-dashboard__panel">
          <h4>Leaders by Country</h4>
          {countryRows.length === 0 ? (
            <p className="leadership-dashboard__empty">
              No leaders recorded yet — set a member&apos;s role to Leader and
              fill in their country.
            </p>
          ) : (
            <ul className="leadership-dashboard__list">
              {countryRows.map((row) => (
                <li key={row.name}>
                  <span>{row.name}</span>
                  <span>{row.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="leadership-dashboard__panel">
          <h4>Countries With Unfilled Leadership Positions</h4>
          {unfilledCountries.length === 0 ? (
            <p className="leadership-dashboard__empty">
              Every tracked leadership position is filled.
            </p>
          ) : (
            <ul className="leadership-dashboard__list leadership-dashboard__list--plain">
              {unfilledCountries.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
