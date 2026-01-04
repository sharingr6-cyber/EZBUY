
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const categories = [
    { name: 'Todos' },
    { name: 'Teclados' },
    { name: 'Ratones' },
    { name: 'Audifonos' },
    { name: 'Mousepad' },
    { name: 'Case' },
    { name: 'Microfonos' },
    { name: 'Combos Girl Gamer' },
];

const brands = ['Sanrio', 'Razer Quartz', 'Logitech Aurora', 'GeekShare'];
const characters = ['Hello Kitty', 'Kuromi', 'My Melody', 'Cinnamoroll'];

type ProductFiltersProps = {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onApplyFilters: (filters: { price: number; brands: string[]; characters: string[] }) => void;
};

export default function ProductFilters({ activeCategory, onCategoryChange, onApplyFilters }: ProductFiltersProps) {
  const [price, setPrice] = useState([20000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);

  const handleBrandChange = (brand: string, checked: boolean) => {
    setSelectedBrands(prev => checked ? [...prev, brand] : prev.filter(b => b !== brand));
  };
  
  const handleCharacterChange = (character: string, checked: boolean) => {
    setSelectedCharacters(prev => checked ? [...prev, character] : prev.filter(c => c !== character));
  };

  const handleApply = () => {
    onApplyFilters({
      price: price[0],
      brands: selectedBrands,
      characters: selectedCharacters,
    });
  };

  return (
    <aside className="w-full lg:w-1/4 xl:w-1/5">
      <div className="sticky top-24 space-y-6">
        <Card className="bg-pink-500/5 border-pink-400/20 rounded-2xl shadow-lg shadow-pink-500/10 backdrop-blur-sm">
          <CardHeader className="p-4 border-b border-pink-400/20">
            <CardTitle className="text-lg font-bold uppercase text-white font-kawaii tracking-wider">Categorías</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="flex flex-col gap-1">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-sm rounded-lg font-semibold",
                    activeCategory === category.name
                      ? "bg-white/90 text-pink-500 hover:bg-white"
                      : "text-pink-100/80 hover:bg-white/10 hover:text-white"
                  )}
                  onClick={() => onCategoryChange(category.name)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-pink-500/5 border-pink-400/20 rounded-2xl shadow-lg shadow-pink-500/10 backdrop-blur-sm">
            <CardHeader className="p-4 border-b border-pink-400/20">
                <CardTitle className="text-lg font-bold uppercase text-white font-kawaii tracking-wider">Filtros</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-6">
                <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-pink-100">Rango de Precio</h4>
                      <span className="text-sm font-bold text-pink-200 bg-black/20 px-2 py-1 rounded-md">
                        S/{price[0]}
                      </span>
                    </div>
                    <Slider 
                      value={price}
                      onValueChange={setPrice}
                      max={20000} 
                      step={100} 
                      className="[&>span:first-child]:h-2 [&>span>span]:bg-pink-400 [&>a]:bg-white [&>a]:border-pink-400" 
                    />
                    <div className="flex justify-between text-xs text-pink-200/80 mt-2">
                      <span>S/0</span>
                      <span>S/20000</span>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold mb-3 text-pink-100">Marcas</h4>
                    <div className="space-y-2">
                        {brands.map(brand => (
                            <div key={brand} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={brand} 
                                  className="rounded-[4px] border-pink-400 data-[state=checked]:bg-pink-400 data-[state=checked]:text-white" 
                                  onCheckedChange={(checked) => handleBrandChange(brand, !!checked)}
                                />
                                <Label htmlFor={brand} className="text-sm text-pink-200/80">{brand}</Label>
                            </div>
                        ))}
                    </div>
                </div>
                 <div>
                    <h4 className="font-semibold mb-3 text-pink-100">Personajes</h4>
                    <div className="space-y-2">
                        {characters.map(char => (
                            <div key={char} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={char} 
                                  className="rounded-[4px] border-pink-400 data-[state=checked]:bg-pink-400 data-[state=checked]:text-white" 
                                  onCheckedChange={(checked) => handleCharacterChange(char, !!checked)}
                                />
                                <Label htmlFor={char} className="text-sm text-pink-200/80">{char}</Label>
                            </div>
                        ))}
                    </div>
                </div>
                <Button onClick={handleApply} className="w-full bg-white text-pink-500 font-bold hover:bg-pink-100 hover:shadow-lg hover:shadow-white/20">Aplicar Filtros</Button>
            </CardContent>
        </Card>

      </div>
    </aside>
  );
}
