import React, { useState } from 'react';
import { useConfigStore } from '../store/useConfigStore';
import { FiLogOut, FiPlus, FiTrash2 } from 'react-icons/fi';

export default function Header() {
  const { logout, profiles, currentProfile, setCurrentProfile, addProfile, deleteProfile } = useConfigStore();
  const [newName, setNewName] = useState('');

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">DecoTV 配置管理面板</h1>
        <div className="flex items-center gap-4">
          <select
            value={currentProfile}
            onChange={(e) => setCurrentProfile(e.target.value)}
            className="bg-white text-black px-3 py-1 rounded"
          >
            {Object.keys(profiles).map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <input
            placeholder="新Profile名"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="px-2 py-1 text-black rounded"
          />
          <button onClick={() => { if (newName) { addProfile(newName); setNewName(''); } }} className="p-2 bg-white rounded text-black"><FiPlus /></button>
          <button onClick={() => deleteProfile(currentProfile)} disabled={Object.keys(profiles).length === 1} className="p-2 bg-white rounded text-black"><FiTrash2 /></button>
          <button onClick={logout} className="bg-red-600 px-4 py-1 rounded">退出</button>
        </div>
      </div>
    </header>
  );
}
