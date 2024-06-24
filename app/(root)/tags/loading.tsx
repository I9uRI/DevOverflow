import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      </div>

      <div className="mb-8 mt-11 flex flex-wrap items-center justify-between gap-5">
        <Skeleton className="h-14 flex-1" />
        <div>
          <Skeleton className="h-14 w-28" />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Skeleton className="h-20 w-48 rounded-xl px-8 py-10 sm:w-[240px]" />
        <Skeleton className="h-20 w-48 rounded-xl px-8 py-10 sm:w-[240px]" />
        <Skeleton className="h-20 w-48 rounded-xl px-8 py-10 sm:w-[240px]" />
        <Skeleton className="h-20 w-48 rounded-xl px-8 py-10 sm:w-[240px]" />
        <Skeleton className="h-20 w-48 rounded-xl px-8 py-10 sm:w-[240px]" />
      </div>
    </section>
  );
};

export default Loading;
