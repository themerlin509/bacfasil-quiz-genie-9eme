
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white text-primary shadow-md">
      <div className="container mx-auto py-3 px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/63e6aa13-5392-4b4e-b719-8f3140cb8106.png" 
            alt="BacFasil Logo" 
            className="h-12 w-auto"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-primary">BacFasil</h1>
            <span className="text-sm text-primary/80">9<sup>ème</sup> A.F</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-primary hover:text-secondary transition-colors">Accueil</Link>
          <Link to="/progress" className="text-primary hover:text-secondary transition-colors">Progression</Link>
          <Link to="/about" className="text-primary hover:text-secondary transition-colors">À propos</Link>
        </nav>
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary">
                <Menu />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link 
                  to="/" 
                  className="text-lg text-primary hover:text-secondary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Accueil
                </Link>
                <Link 
                  to="/progress" 
                  className="text-lg text-primary hover:text-secondary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Progrès
                </Link>
                <Link 
                  to="/about" 
                  className="text-lg text-primary hover:text-secondary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  À propos
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
