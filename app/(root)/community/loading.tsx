import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mb-9 mt-11 flex flex-wrap items-center justify-between gap-5">
        <Skeleton className="h-14 flex-1" />
        <div>
          <Skeleton className="h-14 w-28" />
        </div>
      </div>
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <Skeleton className="h-52 w-[15rem]" />
        <Skeleton className="h-52 w-[15rem]" />
        <Skeleton className="h-52 w-[15rem]" />
        <Skeleton className="h-52 w-[15rem]" />
      </div>
    </section>
  );
};

export default Loading;
