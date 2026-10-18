// centered placeholder shown when a list has no data
export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="border-base-300 flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-10 text-center">
      <span className="text-4xl opacity-30">♟</span>
      <p className="text-base-content/60">{message}</p>
    </div>
  );
}
