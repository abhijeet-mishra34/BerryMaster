import Sidebar from "./Sidebar";
import Header from "./Header";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />
<main className="flex-1 overflow-y-auto">
  <div className="p-8">
    {children}
  </div>
</main>
      </div>
    </div>
  );
}