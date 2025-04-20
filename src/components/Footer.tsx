
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm flex items-center">
              Créé avec <Heart className="h-4 w-4 text-primary mx-1 inline" /> par Pierre-Roberto Leblanc
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">
              Pour toute information ou difficulté, contactez-nous: 
              <a href="mailto:pierrerobertoleblanc1@gmail.com" className="text-secondary ml-1 hover:underline">
                pierrerobertoleblanc1@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
