import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-800 text-indigo-100">
      <div className="container mx-auto py-8 px-4 text-center">
        <p className="font-semibold text-lg">&copy; {new Date().getFullYear()} Online Cyber Cafe. All rights reserved.</p>
        <div className="mt-4 space-y-2 md:space-y-0 md:space-x-6">
            <a href="mailto:support@onlinecybercafe.com" className="hover:text-white transition-colors">support@onlinecybercafe.com</a>
            <span className="hidden md:inline">|</span>
            <a href="tel:+919322755952" className="hover:text-white transition-colors">+91 93227 55952</a>
        </div>
        <div className="mt-4 space-x-6">
            <a href="#careers" className="hover:text-white transition-colors">Careers</a>
            <a href="https://twitter.com/onlinecybercafe" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;