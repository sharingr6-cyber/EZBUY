import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function LibroDeReclamacionesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight uppercase sm:text-5xl font-headline">
            Libro de <span className="text-primary">Reclamaciones</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Este espacio está en construcción. Próximamente podrás registrar tu reclamo o queja aquí.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}