
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">BacFasil 9<sup>ème</sup></h1>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-secondary transition-colors">Accueil</Link>
          <Link to="/progress" className="hover:text-secondary transition-colors">Progrès</Link>
          <Link to="/about" className="hover:text-secondary transition-colors">À propos</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
