import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageSlider from './components/ImageSlider';
import CafeList from './components/CafeList';
import JobList from './components/JobList';
import HowToUse from './components/HowToUse';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import { SLIDER_IMAGES, CAFES, JOBS } from './constants';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <ImageSlider images={SLIDER_IMAGES} />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <CafeList cafes={CAFES} onContactClick={handleOpenModal} />
            <JobList jobs={JOBS} />
          </div>
          <HowToUse />
        </div>
      </main>
      <Footer />
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        jobOptions={JOBS.map(job => job.title)} 
      />
    </div>
  );
};

export default App;