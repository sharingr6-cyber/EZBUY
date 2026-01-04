
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
    { name: 'Todos' },
    { name: 'Tarjetas Gráficas' },
    { name: 'Procesadores' },
    { name: 'Monitor' },
    { name: 'Teclados y Ratones' },
    { name: 'Mousepad' },
    { name: 'Webcams' },
    { name: 'Micrófonos' },
    { name: 'Audio' },
    { name: 'Almacenamiento' },
    { name: 'Memoria' },
    { name: 'Fuente de Poder' },
    { name: 'Case' },
];

type ProductFiltersProps = {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

export default function ProductFilters({ activeCategory, onCategoryChange }: ProductFiltersProps) {
  
  return (
    <aside className="w-full lg:w-1/4 xl:w-1/5">
      <div className="sticky top-24">
        <Card className="bg-card border-border">
          <CardHeader className="p-4 border-b border-border">
            <CardTitle className="text-lg font-bold uppercase">Categorías</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="flex flex-col gap-1">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={activeCategory === category.name ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start text-sm",
                    activeCategory === category.name
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                  onClick={() => onCategoryChange(category.name)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
