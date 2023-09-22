import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <main>
      <Header title="Editar carona" goBackHref="/" />
      <Content>
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-28" />
        <Skeleton className="h-32" />
        <Skeleton className="h-28" />
        <Skeleton className="h-10" />
      </Content>
    </main>
  );
}
