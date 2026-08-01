import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { PosterCarousel } from '@/components/PosterCarousel';
import { ProgramSection } from '@/components/ProgramSection';
import { TicketGenerator } from '@/components/TicketGenerator';
import { PosterStudio } from '@/components/PosterStudio';
import { LocationSection } from '@/components/LocationSection';
import { DonationSection } from '@/components/DonationSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-dark overflow-x-hidden">
      <Navbar />
      <Hero />
      <PosterCarousel />
      <ProgramSection />
      <TicketGenerator />
      <DonationSection />
      <PosterStudio />
      <LocationSection />
      <Footer />
    </main>
  );
}
