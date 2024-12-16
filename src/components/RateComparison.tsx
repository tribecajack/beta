import React from 'react';
import { ArrowUpRight, Shield, Zap } from 'lucide-react';

const protocols = [
  {
    name: 'Solend',
    apy: '12.5%',
    tvl: '$456M',
    risk: 'Low',
    recommended: true,
  },
  {
    name: 'Mango Markets',
    apy: '15.2%',
    tvl: '$289M',
    risk: 'Medium',
    recommended: false,
  },
  {
    name: 'Port Finance',
    apy: '10.8%',
    tvl: '$178M',
    risk: 'Low',
    recommended: false,
  },
  {
    name: 'Jet Protocol',
    apy: '14.3%',
    tvl: '$234M',
    risk: 'Medium',
    recommended: true,
  },
];

export function RateComparison() {
  return (
    <div className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Live Protocol Rates</h2>
          <p className="text-gray-400">Real-time APY comparisons across top Solana lending protocols</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-800">
                <th className="px-6 py-4">Protocol</th>
                <th className="px-6 py-4">APY</th>
                <th className="px-6 py-4">TVL</th>
                <th className="px-6 py-4">Risk Level</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {protocols.map((protocol) => (
                <tr key={protocol.name} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-white font-medium">{protocol.name}</span>
                      {protocol.recommended && (
                        <span className="ml-2 px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                          AI Pick
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-green-400 font-medium">{protocol.apy}</td>
                  <td className="px-6 py-4 text-gray-300">{protocol.tvl}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1 ${
                      protocol.risk === 'Low' ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      <Shield className="h-4 w-4" />
                      {protocol.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition">
                      Lend Now <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}