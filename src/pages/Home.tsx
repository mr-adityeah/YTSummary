import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Youtube } from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

export function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      toast.error('Please enter a valid YouTube URL');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_N8N_WORKFLOW_URL || '', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error('Failed to summarize video');

      const data = await response.json();
      navigate('/summary', { state: { summary: data.summary, videoUrl: url } });
    } catch (error) {
      toast.error('Unable to summarize. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto pt-20 px-4">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <Youtube size={48} className="text-red-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
            YouTube Video Summarizer
          </h1>
          
          <p className="text-center text-gray-600 mb-8">
            Paste a YouTube URL below to get an AI-powered summary of the video.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-blue-400"
            >
              {loading ? <LoadingSpinner /> : 'Get Summary'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}