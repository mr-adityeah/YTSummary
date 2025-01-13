import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NhostProvider } from '@nhost/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { nhost } from './lib/nhost';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Summary } from './pages/Summary';
import { MySummaries } from './pages/MySummaries';

const queryClient = new QueryClient();

function App() {
  return (
    <NhostProvider nhost={nhost}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/summaries" element={<MySummaries />} />
            </Routes>
          </div>
        </BrowserRouter>
        <Toaster position="top-right" />
      </QueryClientProvider>
    </NhostProvider>
  );
}

export default App;