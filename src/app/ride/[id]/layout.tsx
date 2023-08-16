import { Content } from "@/components/Content";
import { Header } from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header title="Carona" goBackHref="/" />
      <Content>{children}</Content>
    </main>
  );
}
