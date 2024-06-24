import { Skeleton } from "@/components/ui/skeleton";

const lading = () => {
  return (
    <div>
      <div className="mt-11 flex items-center space-x-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-[250px]" />
          <Skeleton className="h-6 w-[200px]" />
        </div>
      </div>

      <Skeleton className="mt-12 h-52 w-full rounded-xl" />
    </div>
  );
};

export default lading;
