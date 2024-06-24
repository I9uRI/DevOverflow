import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      </div>

      <div className="mb-9 mt-11 flex flex-wrap items-center justify-between gap-5">
        <Skeleton className="h-14 flex-1" />
        <div>
          <Skeleton className="h-14 w-28" />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <Skeleton className="h-36 w-full rounded-xl" />
        <Skeleton className="h-36 w-full rounded-xl" />
      </div>
    </section>
  );
};

export default Loading;
