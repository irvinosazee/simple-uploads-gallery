export default function LoadingSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                    <div className="aspect-square bg-slate-200 animate-pulse" />
                    <div className="p-3">
                        <div className="h-4 bg-slate-200 rounded animate-pulse" />
                    </div>
                </div>
            ))}
        </div>
    )
}
