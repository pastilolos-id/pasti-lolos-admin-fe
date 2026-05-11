export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-8xl flex-col gap-8 px-6 py-10 md:px-10">
      <header className="space-y-2">
        <p className="text-s2 text-muted-foreground">Pasti Lolos</p>
        <h1 className="text-h3 text-foreground">Admin Console</h1>
        <p className="text-b2 text-muted-foreground">
          Foundation admin sudah siap. Lanjutkan implementasi modul dashboard,
          user management, dan reporting dari shell ini.
        </p>
      </header>
      <section className="rounded-card-medium border border-card-border bg-card p-6 shadow-sm">
        <h2 className="text-s1">Getting Started</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-b3 text-muted-foreground">
          <li>Tambahkan route group untuk halaman admin private.</li>
          <li>Integrasikan auth guard sesuai kebutuhan environment.</li>
          <li>Mulai endpoint binding dengan TanStack Query.</li>
        </ul>
      </section>
    </main>
  );
}
