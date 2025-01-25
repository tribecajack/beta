import React from 'react';
import { Body } from '@/components/Body';
import { Features } from '@/components/Features';
import { RateComparison } from '@/components/RateComparison';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Body />
      <Features />
      <RateComparison />
    </div>
  );
}

export default App;