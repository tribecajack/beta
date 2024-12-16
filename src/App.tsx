import React from 'react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { RateComparison } from './components/RateComparison';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Features />
      <RateComparison />
    </div>
  );
}

export default App;