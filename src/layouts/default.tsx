import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-6 border-t border-default-200">
        <p className="text-default-600 text-sm">
          © {new Date().getFullYear()} Dinsor. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
