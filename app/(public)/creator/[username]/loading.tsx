import { Skeleton } from "@/components/ui/skeleton";

export default function CreatorProfileLoading() {
  return (
    <main className="min-h-screen bg-[radial-gradient(95%_60%_at_50%_0%,rgba(71,85,105,0.4),rgba(2,6,23,1))] px-3 pb-24 pt-4 sm:px-5 lg:pl-76 lg:pr-5 xl:pr-83">
      <div className="mx-auto max-w-370 space-y-6">
        <section className="overflow-hidden rounded-[30px] border border-white/10 bg-black/35 p-5">
          <Skeleton className="h-40 w-full rounded-2xl bg-white/10 sm:h-56" />
          <div className="-mt-12 flex items-end gap-4 px-2">
            <Skeleton className="h-28 w-28 rounded-full bg-white/10 sm:h-36 sm:w-36" />
            <div className="flex-1 space-y-2 pb-2">
              <Skeleton className="h-8 w-52 bg-white/10" />
              <Skeleton className="h-4 w-40 bg-white/10" />
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-28 rounded-3xl bg-white/10" />
          ))}
        </section>

        <section className="space-y-4">
          <Skeleton className="h-14 w-full rounded-2xl bg-white/10" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-80 rounded-2xl bg-white/10" />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
