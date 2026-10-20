/** Dinamik sayfa içeriği akarken gösterilen, son düzene benzeyen iskelet. */
export function PageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Yükleniyor">
      <div className="flex min-h-[78svh] items-end bg-olive-900">
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-14 md:px-10 md:pb-20">
          <div className="h-16 w-2/3 max-w-xl animate-pulse bg-cream/10 md:h-24" />
          <div className="mt-6 h-4 w-1/3 max-w-xs animate-pulse bg-cream/10" />
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1440px] space-y-4 px-6 py-24 md:px-10">
        <div className="h-8 w-3/4 max-w-3xl animate-pulse bg-olive-900/10" />
        <div className="h-8 w-2/3 max-w-2xl animate-pulse bg-olive-900/10" />
        <div className="h-8 w-1/2 max-w-xl animate-pulse bg-olive-900/10" />
      </div>
    </div>
  );
}
