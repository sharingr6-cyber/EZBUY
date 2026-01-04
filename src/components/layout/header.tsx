
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Search, ShoppingCart, Menu, User, LogOut, UserCircle, ShoppingBag, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/cart-context';
import AuthModal from '@/components/auth/auth-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';


function HeaderContent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { openCart, cartItems } = useCart();
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phoneNumber = "1234567890";
  const contactMessage = "Hola, estoy interesado en sus productos y quisiera más información.";
  const whatsappContactUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(contactMessage)}`;


  const navLinks = [
    { name: 'Categorías', href: '/products' },
    { name: 'Kawaii Gaming', href: '/kawaii-gaming' },
    { name: 'Contáctanos', href: whatsappContactUrl, isExternal: true },
  ];
  
  const handleLoginSuccess = () => {
    setAuthModalOpen(false);
  };
  
  const handleLogout = () => {
    auth.signOut();
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  const NavLink = ({ href, children, isExternal }: { href: string; children: React.ReactNode, isExternal?: boolean }) => {
    const isActive = pathname === href && !isExternal;
    const commonProps = {
        className: cn(
            "text-sm font-semibold transition-colors",
            isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
        ),
        onClick: () => setIsSheetOpen(false)
    };

    if (isExternal) {
        return <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>{children}</a>
    }

    return (
      <Link href={href} {...commonProps}>
        {children}
      </Link>
    );
  };
  
  const MobileNavLink = ({ href, children, isExternal }: { href: string; children: React.ReactNode, isExternal?: boolean }) => {
    const isActive = pathname === href && !isExternal;
    const commonProps = {
        className: cn(
            "text-lg font-semibold transition-colors",
            isActive ? "text-primary" : "text-foreground hover:text-primary"
        ),
        onClick: () => setIsSheetOpen(false)
    };

    if (isExternal) {
        return <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>{children}</a>;
    }

    return (
      <Link href={href} {...commonProps}>
        {children}
      </Link>
    );
  };

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-sm border-b border-border" : "bg-transparent border-b border-transparent"
      )}>
        <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsSheetOpen(false)}>
              <span className="text-2xl font-black tracking-tighter text-white">EZBUY</span>
            </Link>
            <nav className="hidden items-center gap-6 lg:flex">
              {navLinks.map((link) => (
                <NavLink key={link.name} href={link.href} isExternal={link.isExternal}>
                  {link.name}
                </NavLink>
              ))}
               <Link href="/ofertas" className="text-sm font-semibold text-destructive transition-colors hover:text-destructive/80">
                  Ofertas
                </Link>
            </nav>
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <div className="relative">
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="h-10 w-64 pr-10 bg-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>

            {!isUserLoading && (user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <UserCircle className="h-6 w-6 text-primary" />
                    <span className="sr-only">Mi cuenta</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-card border-border">
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Mi Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    <span>Mis Pedidos</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setAuthModalOpen(true)}>
                <User className="h-5 w-5 text-primary" />
                <span className="sr-only">Iniciar sesión</span>
              </Button>
            ))}

            <Button variant="ghost" size="icon" className="relative" onClick={openCart}>
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Carrito de compras</span>
            </Button>
          </div>
          <div className="flex items-center lg:hidden">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => setAuthModalOpen(true)}>
              <User className="h-5 w-5 text-primary" />
              <span className="sr-only">Iniciar sesión</span>
            </Button>
            <Button variant="ghost" size="icon" className="mr-2 relative" onClick={openCart}>
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Carrito de compras</span>
            </Button>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-card p-0">
                 <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b border-border p-6">
                        <Link href="/" onClick={() => setIsSheetOpen(false)}>
                            <span className="text-2xl font-black tracking-tighter text-white">EZBUY</span>
                        </Link>
                        <Button variant="ghost" size="icon" onClick={() => setIsSheetOpen(false)}>
                            <X className="h-6 w-6" />
                        </Button>
                    </div>
                    <nav className="flex flex-col gap-6 p-6">
                        {navLinks.map((link) => (
                          <MobileNavLink key={link.name} href={link.href} isExternal={link.isExternal}>
                            {link.name}
                          </MobileNavLink>
                        ))}
                        <Link 
                            href="/ofertas" 
                            className="text-lg font-semibold text-destructive transition-colors hover:text-destructive/80"
                            onClick={() => setIsSheetOpen(false)}
                        >
                          Ofertas
                        </Link>
                    </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <AuthModal isOpen={isAuthModalOpen} setIsOpen={setAuthModalOpen} onLoginSuccess={handleLoginSuccess} />
    </>
  );
}

export default function Header() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Render a placeholder on the server and the full component on the client
    if (!isClient) {
        return (
            <header className="sticky top-0 z-50 w-full bg-transparent border-b border-transparent">
              <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                 <Link href="/">
                    <span className="text-2xl font-black tracking-tighter text-white">EZBUY</span>
                  </Link>
              </div>
            </header>
          );
    }

    return <HeaderContent />;
}
