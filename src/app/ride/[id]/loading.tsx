import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="p-3 flex flex-col space-y-3">
      <Skeleton className="h-32" />
      <Skeleton className="h-28" />
      <Skeleton className="h-32" />
      <Skeleton className="h-28" />
      <Skeleton className="h-48" />
    </div>
  );
}
