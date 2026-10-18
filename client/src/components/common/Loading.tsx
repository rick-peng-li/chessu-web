// full-width loading placeholder for page-level data fetching
export default function Loading({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <span className="loading loading-spinner loading-lg" />
      <div className="text-base-content/60">{text}</div>
    </div>
  );
}
