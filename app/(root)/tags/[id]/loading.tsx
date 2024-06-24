import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section>
      <div className="mb-9 mt-11 flex flex-wrap items-center justify-between gap-5">
        <Skeleton className="h-14 flex-1" />
      </div>

      <div className="flex flex-col gap-6">
        <Skeleton className="h-36 w-full rounded-xl" />
        <Skeleton className="h-36 w-full rounded-xl" />
      </div>
    </section>
  );
};

export default Loading;
