
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <div className="text-primary text-9xl font-bold mb-4">404</div>
        <h1 className="text-4xl font-bold mb-4">Page introuvable</h1>
        <p className="text-xl text-gray-600 mb-8">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link to="/">Retourner à l'accueil</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
