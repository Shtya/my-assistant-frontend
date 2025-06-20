import { useState } from 'react';
import { useAIApi } from '../../hooks/useAIApi';

export default function AITimeEstimation({ cardId, currentEstimate, onUpdate }) {
  const [isLoading, setIsLoading] = useState(false);
  const { estimateTask } = useAIApi();
  
  const handleAIEstimate = async () => {
    setIsLoading(true);
    try {
      const estimation = await estimateTask(cardId);
      onUpdate(estimation);
    } catch (error) {
      console.error("AI Estimation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Time Estimation</span>
        <button
          onClick={handleAIEstimate}
          disabled={isLoading}
          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200"
        >
          {isLoading ? 'Estimating...' : 'AI Estimate'}
        </button>
      </div>
      <div className="mt-1 flex items-center space-x-2">
        <input
          type="number"
          value={currentEstimate}
          onChange={(e) => onUpdate(e.target.value)}
          className="w-16 p-1 border rounded"
        />
        <span className="text-sm">hours</span>
      </div>
    </div>
  );
}