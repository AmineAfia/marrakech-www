import React from "react";

export function SkeletonEvalsCli() {
  return (
    <div className="w-full h-full bg-black rounded-lg overflow-hidden font-mono">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
        <div className="text-sm text-gray-400">Terminal</div>
      </div>

      {/* Terminal Content */}
      <div className="p-4 space-y-3 text-sm">
        {/* Command */}
        <div className="flex items-center space-x-2">
          <span className="text-green-400">$</span>
          <span className="text-white">npx @marrakesh/cli test prompts/weather-agent.ts</span>
        </div>

        {/* Output */}
        <div className="space-y-2 text-gray-300">
          <div>Running tests... Found 1 test file</div>
          
          {/* Test Results */}
          <div className="space-y-1 ml-4">
            <div className="flex items-center space-x-2">
              <span className="text-blue-400">[1/2]</span>
              <span>What's the weather in Paris?</span>
            </div>
            <div className="ml-6 text-gray-400">
              Get current weather for a city({`{"city": "Paris"}`})
            </div>
            <div className="flex items-center space-x-2 ml-6">
              <span className="text-green-400">✔</span>
              <span className="text-green-400">Passed (5.35s)</span>
            </div>
          </div>

          <div className="space-y-1 ml-4">
            <div className="flex items-center space-x-2">
              <span className="text-blue-400">[2/2]</span>
              <span>What's the forecast for Tokyo?</span>
            </div>
            <div className="ml-6 text-gray-400">
              Get current weather for a city({`{"city":"Tokyo"}`})
            </div>
            <div className="flex items-center space-x-2 ml-6">
              <span className="text-green-400">✔</span>
              <span className="text-green-400">Passed (1.28s)</span>
            </div>
          </div>

          {/* Summary */}
          <div className="pt-2 border-t border-gray-700">
            <div className="flex items-center space-x-2">
              <span className="text-green-400">+</span>
              <span className="text-green-400">All tests passed! 2/2 (100.0%)</span>
            </div>
            <div className="text-gray-400">Time: 6.63s</div>
          </div>
        </div>
      </div>
    </div>
  );
}
