import React, { useState } from 'react';
import { useConfigStore, Site, Category } from '../store/useConfigStore';

export default function VideoSourceEditor() {
  const { profiles, currentProfile, updateProfile } = useConfigStore();
  const profile = profiles[currentProfile];

  const addSite = () => {
    const key = prompt('输入唯一key（小写字母/数字）');
    if (!key) return;
    if (profile.api_site[key]) return alert('Key 已存在');
    updateProfile({ api_site: { ...profile.api_site, [key]: { api: '', name: '' } } });
  };

  const updateSite = (key: string, field: string, value: string) => {
    updateProfile({
      api_site: {
        ...profile.api_site,
        [key]: { ...profile.api_site[key], [field]: value },
      },
    });
  };

  const deleteSite = (key: string) => {
    const { [key]: _, ...rest } = profile.api_site;
    updateProfile({ api_site: rest });
  };

  const [editingCategoryIndex, setEditingCategoryIndex] = useState<number | null>(null);
  const addCategory = () => {
    const cat: Category = { name: '新分类', type: 'movie', query: '' };
    updateProfile({ custom_category: [...profile.custom_category, cat] });
  };

  const updateCategory = (index: number, field: keyof Category, value: any) => {
    const next = profile.custom_category.slice();
    // @ts-ignore
    next[index] = { ...next[index], [field]: value };
    updateProfile({ custom_category: next });
  };

  const deleteCategory = (index: number) => {
    const next = profile.custom_category.slice();
    next.splice(index, 1);
    updateProfile({ custom_category: next });
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">视频源配置 (api_site)</h2>
      <div className="flex gap-3 mb-4">
        <button onClick={addSite} className="bg-green-600 text-white px-4 py-2 rounded">添加源</button>
        <button onClick={addCategory} className="bg-indigo-600 text-white px-4 py-2 rounded">添加自定义分类</button>
      </div>

      <div className="overflow-auto mb-6">
        <table className="w-full border">
          <thead>
            <tr>
              <th className="p-2 border">Key</th>
              <th className="p-2 border">名称</th>
              <th className="p-2 border">API</th>
              <th className="p-2 border">Detail</th>
              <th className="p-2 border">操作</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(profile.api_site).map(([key, site]) => (
              <tr key={key}>
                <td className="p-2 border">{key}</td>
                <td className="p-2 border"><input value={site.name} onChange={(e) => updateSite(key, 'name', e.target.value)} className="w-full"/></td>
                <td className="p-2 border"><input value={site.api} onChange={(e) => updateSite(key, 'api', e.target.value)} className="w-full"/></td>
                <td className="p-2 border"><input value={site.detail || ''} onChange={(e) => updateSite(key, 'detail', e.target.value)} className="w-full"/></td>
                <td className="p-2 border"><button onClick={() => deleteSite(key)} className="text-red-600">删除</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 p-4 rounded">
        <h3 className="font-semibold">自定义分类 (custom_category)</h3>
        <div className="space-y-3 mt-3">
          {profile.custom_category.map((c, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input value={c.name} onChange={(e) => updateCategory(i, 'name', e.target.value)} className="border px-2 py-1 rounded flex-1" />
              <select value={c.type} onChange={(e) => updateCategory(i, 'type', e.target.value as any)} className="border px-2 py-1 rounded">
                <option value="movie">movie</option>
                <option value="tv">tv</option>
              </select>
              <input value={c.query} onChange={(e) => updateCategory(i, 'query', e.target.value)} className="border px-2 py-1 rounded flex-1" />
              <button onClick={() => deleteCategory(i)} className="text-red-600">删除</button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label className="block">缓存时间（秒）:</label>
        <input type="number" value={profile.cache_time} onChange={(e) => updateProfile({ cache_time: Number(e.target.value) })} className="border px-2 py-1 rounded" />
      </div>
    </div>
  );
}
