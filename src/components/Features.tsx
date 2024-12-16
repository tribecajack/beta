import React from 'react';
import { Brain, Gauge, Lock, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced algorithms analyze market conditions to find the best lending opportunities',
  },
  {
    icon: Gauge,
    title: 'Real-Time Rates',
    description: 'Live updates of lending rates and APYs across all major Solana protocols',
  },
  {
    icon: Lock,
    title: 'Risk Assessment',
    description: 'Comprehensive protocol risk analysis and security ratings',
  },
  {
    icon: Sparkles,
    title: 'Smart Recommendations',
    description: 'Personalized lending strategies based on your risk tolerance',
  },
];

export function Features() {
  return (
    <div className="py-16 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="p-6 rounded-xl bg-gray-900/50 border border-gray-800">
              <feature.icon className="h-12 w-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}