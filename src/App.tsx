import React from 'react';
import { useConfigStore } from './store/useConfigStore';
import Login from './components/Login';
import Header from './components/Header';
import VideoSourceEditor from './components/VideoSourceEditor';
import LiveSourceEditor from './components/LiveSourceEditor';
import TVBoxConfigEditor from './components/TVBoxConfigEditor';
import ExportImport from './components/ExportImport';

export default function App() {
  const isAuthenticated = useConfigStore((s) => s.isAuthenticated);

  if (!isAuthenticated) return <Login />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-6xl mx-auto p-6 space-y-8">
        <VideoSourceEditor />
        <LiveSourceEditor />
        <TVBoxConfigEditor />
        <ExportImport />
      </main>
    </div>
  );
}
