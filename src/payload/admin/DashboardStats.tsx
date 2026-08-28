import { getPayload } from "payload";
import config from "@payload-config";

/**
 * A stat-card row above the default collection list — the kind of glance
 * view a fresh /admin visit lacks otherwise. Counts are read live rather
 * than cached, so they're never stale; a failed count reads as 0 rather
 * than taking the whole dashboard down.
 */
const cards = [
  { collection: "pages", label: "Pages", color: "#0066cf" },
  { collection: "posts", label: "News Posts", color: "#16a34a" },
  { collection: "photo-events", label: "Photo Events", color: "#f59e0b" },
  { collection: "media", label: "Media Files", color: "#7c3aed" },
  { collection: "resources", label: "Resources", color: "#0891b2" },
  { collection: "members", label: "Members", color: "#dc2626" },
] as const;

export default async function DashboardStats() {
  const payload = await getPayload({ config });
  const counts = await Promise.all(
    cards.map((card) =>
      payload
        .count({ collection: card.collection })
        .then((result) => result.totalDocs)
        .catch(() => 0),
    ),
  );

  return (
    <div className="dashboard-stats">
      {cards.map((card, i) => (
        <div key={card.collection} className="dashboard-stats__card">
          <div
            className="dashboard-stats__icon"
            style={{ background: `${card.color}1a`, color: card.color }}
          >
            {card.label.charAt(0)}
          </div>
          <div className="dashboard-stats__value">{counts[i]}</div>
          <div className="dashboard-stats__label">{card.label}</div>
        </div>
      ))}
    </div>
  );
}
