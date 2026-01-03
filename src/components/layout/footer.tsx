
"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "¡Suscripción exitosa!",
      description: "Gracias por unirte a nuestro boletín de ofertas.",
    });
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  const footerLinks = [
    {
      title: 'Shop',
      links: [
        { name: 'Periféricos', href: '/products' },
        { name: 'Componentes', href: '/products' },
        { name: 'Monitores', href: '/products' },
        { name: 'Sillas Gamer', href: '/products' },
        { name: 'Ofertas', href: '/ofertas' },
      ],
    },
    {
      title: 'EZBUY',
      links: [
        { name: 'Sobre nosotros', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Carreras', href: '#' },
        { name: 'Prensa', href: '#' },
      ],
    },
    {
      title: 'Soporte',
      links: [
        { name: 'Contacto', href: '#' },
        { name: 'FAQs', href: '#' },
        { name: 'Envíos', href: '#' },
        { name: 'Devoluciones', href: '#' },
        { name: 'Garantía', href: '#' },
      ],
    },
  ];

  const libroReclamacionesImg = placeholderImages.placeholderImages.find(p => p.id === 'libro-reclamaciones');

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 pr-8">
            <Link href="/">
                <span className="text-2xl font-black tracking-tighter text-white">EZBUY</span>
            </Link>
            <p className="text-muted-foreground mt-4 text-sm max-w-xs">
              Tu destino final para el mejor hardware y periféricos gaming del mercado.
            </p>
            <form onSubmit={handleSubscribe} className="mt-6 flex gap-2 max-w-sm">
              <Input
                type="email"
                placeholder="Tu email para ofertas..."
                className="bg-input border-border"
                aria-label="Email for newsletter"
                required
              />
              <Button type="submit" variant="default" className="bg-primary text-primary-foreground shrink-0">
                Suscribir
              </Button>
            </form>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-foreground uppercase tracking-wider">{section.title}</h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
           <div className="mt-8 md:mt-0">
            <h3 className="font-bold text-foreground uppercase tracking-wider">Libro de Reclamaciones</h3>
            <div className="mt-4">
              {libroReclamacionesImg && (
                <Link href="/libro-de-reclamaciones">
                  <div className="relative w-48 h-auto block cursor-pointer border-2 border-border rounded-lg overflow-hidden hover:border-primary transition-colors">
                    <Image
                      src={libroReclamacionesImg.imageUrl}
                      alt={libroReclamacionesImg.description}
                      width={192}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
        <Separator className="bg-border" />
        <div className="py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} EZBUY. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Youtube"><Youtube className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
