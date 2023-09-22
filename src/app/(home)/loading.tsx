import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="h-10" />
      <Skeleton className="h-10" />
      <Skeleton className="h-10" />
      <Skeleton className="h-28" />
      <Skeleton className="h-32" />
      <Skeleton className="h-28" />
      <Skeleton className="h-10" />
    </>
  );
}
