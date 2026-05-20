export default function RootLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <div className="w-full max-w-4xl space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded-lg w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-xl" />
          ))}
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
        </div>
      </div>
    </div>
  );
}
