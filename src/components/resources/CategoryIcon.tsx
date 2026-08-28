import type { Resource } from "@/payload-types";

const paths: Record<Resource["category"], string> = {
  policy: "M12 3 4 6v6c0 4.5 3 7.6 8 9 5-1.4 8-4.5 8-9V6l-8-3Zm-2 9 2 2 4-4",
  training: "M3 8 12 4l9 4-9 4-9-4Zm4 2v5c0 1.5 2.5 3 5 3s5-1.5 5-3v-5",
  forms: "M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm7 0v5h5M9 13h6M9 17h6",
  worship: "M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  media: "M4 6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm13 3 4-2v10l-4-2",
};

export default function CategoryIcon({
  category,
  className,
}: {
  category: Resource["category"];
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={paths[category]} />
    </svg>
  );
}
