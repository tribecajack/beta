"use client"

import { useEffect, useState } from 'react';
import { ArrowUpRight, Shield } from 'lucide-react';

interface Protocol {
  name: string;
  apy: string;
  tvl: string;
  risk: 'Low' | 'Medium' | 'High';
  recommended: boolean;
}

interface ProviderResp {
  id: string,
  name: string,
  last_updated: string,
  reserves: {
      symbol: string,
      decimals: number,
      mint: string,
      tvl: number,
      volume: number,
      vault_deposit_risk: number, // not implemented
      price: number, 
      apy: number, // deposit yield rate
      apr: number // borrow interest rate
  }[]
}

const API_URL = 'https://api.ultra.markets/providers/';

export function RateComparison() {
  const toFetch = [
    "0",
    "MFv2hWf31Z9kbCa1snEPYctwafyhdvnV7FZnsebVacA",
    "4UpD2fh7xH3VP9QQaXtsS1YY3bxzWhtfpks7FatyKvdY",
    "7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF"
  ]
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProtocolRates = async () => {
      try {
        const responses = await Promise.all(toFetch.map(async (id) => {
          const response = await fetch(API_URL + id, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          });
        
          console.log('Response details:', {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            url: response.url
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed request details:', {
              endpoint: API_URL,
              status: response.status,
              statusText: response.statusText,
              headers: Object.fromEntries(response.headers.entries()),
              error: errorText,
              url: response.url
            });
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
          }

          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error(`Unexpected content type: ${contentType}`);
          }

          const data = await response.json();
          return data;
        }));
        
        const data = responses
        
        if (!Array.isArray(data)) {
          console.error("API response is not an array:", data);
          throw new Error("Invalid API response format");
        }

        const validatedData: Protocol[] = data.map((item: ProviderResp, index: number) => {
          console.log("Processing item:", item);
          // Get USDC rate directly from token_rates
          const tokenRates = item.reserves;
          const usdcRate = tokenRates.find((r) => r.symbol == "USDC")!;
          
          return {
            name: formatProtocolName(item.name) || `Unknown Protocol ${index + 1}`,
            apy: typeof usdcRate === 'object' 
              ? `${usdcRate.apy.toFixed(2)}%`  // No need to multiply by 100 as it's already a percentage
              : '0%',
            tvl: typeof usdcRate.tvl === 'number' 
              ? `$${(usdcRate.tvl / 1000000).toFixed(1)}M` 
              : '$0M',
            risk: determineRiskLevel(usdcRate.apy),
            recommended: determineIfRecommended(usdcRate.apy)
          };
        });

        // Helper functions
        function formatProtocolName(name: string): string {
          return name
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        }

        function determineRiskLevel(apy: number): Protocol['risk'] {
          if (apy <= 5) return 'Low';
          if (apy <= 10) return 'Medium';
          return 'High';
        }

        function determineIfRecommended(apy: number): boolean {
          // Recommend protocols with APY > 8%
          return apy > 8;
        }

        console.log("Final Validated Data:", validatedData);
        setProtocols(validatedData);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch protocol rates');
        setProtocols([
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
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProtocolRates();
    const interval = setInterval(fetchProtocolRates, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">Loading protocol rates...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-400">Error: {error}</p>
        </div>
      </div>
    );
  }

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
              {protocols.map((protocol, index) => (
                <tr key={`${protocol.name}-${index}`} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
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
                      protocol.risk === 'Low' ? 'text-green-400' : 
                      protocol.risk === 'Medium' ? 'text-yellow-400' : 
                      protocol.risk === 'High' ? 'text-red-400' : 
                      'text-gray-400'
                    }`}>
                      <Shield className="h-4 w-4" />
                      {protocol.risk || 'Unknown'}
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