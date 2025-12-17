import React from 'react';
import { useConfigStore } from '../store/useConfigStore';

export default function ExportImport() {
  const { profiles } = useConfigStore();

  const exportJSON = () => {
    const data = JSON.stringify(profiles, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deco-tv-config.json';
    a.click();
  };

  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const imported = JSON.parse(ev.target?.result as string);
          localStorage.setItem('deco-tv-config', JSON.stringify({ ...useConfigStore.getState(), profiles: imported }));
          location.reload();
        } catch (err) {
          alert('导入失败');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <button onClick={exportJSON} className="bg-blue-600 text-white px-4 py-2 rounded">导出配置</button>
      <input type="file" accept=".json" onChange={importJSON} className="ml-4" />
      <pre className="mt-4 bg-gray-100 p-4 overflow-auto">{JSON.stringify(profiles, null, 2)}</pre>
    </div>
  );
}
