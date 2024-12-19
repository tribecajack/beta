import React from 'react';
import { Brain, Coins, TrendingUp } from 'lucide-react';

export function Body() {
  return (
    <div className="relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-black z-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-20 lg:py-32">
          <div className="text-center">
            <div className="flex justify-center items-center mb-8">
              <Brain className="h-16 w-16 text-purple-500" />
              <span className="mx-4 text-4xl">×</span>
              <Coins className="h-16 w-16 text-yellow-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              AI meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Crypto</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover the best lending rates across Solana protocols, powered by Ultra AI analytics
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="https://app.ultra.markets"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:opacity-90 transition inline-block"
              >
                Get Started
              </a>
              <button className="px-8 py-3 border border-white/20 rounded-lg font-semibold hover:bg-white/10 transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 