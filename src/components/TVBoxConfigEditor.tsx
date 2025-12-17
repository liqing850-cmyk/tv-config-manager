import React, { useState } from 'react';
import { useConfigStore } from '../store/useConfigStore';

export default function TVBoxConfigEditor() {
  const { updateProfile, profiles, currentProfile } = useConfigStore();
  const tvbox = profiles[currentProfile].tvbox;
  const [samplePath, setSamplePath] = useState('');
  const [preview, setPreview] = useState('');

  const set = (partial: any) => updateProfile({ tvbox: { ...tvbox, ...partial } });

  const buildPreview = () => {
    if (!samplePath) return setPreview('请先输入示例路径或URL');
    const parseApi = tvbox.parse_api || '';
    const url = samplePath;
    let out = '';
    if (parseApi) {
      if (parseApi.includes('{url}')) out = parseApi.replace('{url}', encodeURIComponent(url));
      else out = parseApi + (parseApi.includes('?') ? '&' : '?') + 'url=' + encodeURIComponent(url);
    } else {
      out = url;
    }
    setPreview(out);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">TV Box 参数</h2>
      <div className="space-y-3">
        <label className="block">成人路径前缀:
          <input value={tvbox.prefix || ''} onChange={e => set({ prefix: e.target.value })} className="ml-2 border px-2 py-1 rounded" />
        </label>
        <label className="block">成人过滤:
          <input type="checkbox" checked={tvbox.adult_filter} onChange={e => set({ adult_filter: e.target.checked })} className="ml-2" />
        </label>
        <label className="block">跳过广告:
          <input type="checkbox" checked={tvbox.ad_skip} onChange={e => set({ ad_skip: e.target.checked })} className="ml-2" />
        </label>
        <label className="block">解析 API (支持 {url} 占位符):
          <input value={tvbox.parse_api || ''} onChange={e => set({ parse_api: e.target.value })} className="ml-2 border px-2 py-1 rounded w-full" />
        </label>
      </div>

      <div className="mt-4 bg-gray-50 p-3 rounded">
        <h3 className="font-medium">示例预览</h3>
        <div className="mt-2 flex gap-2 items-center">
          <input placeholder="示例路径或原始 URL" value={samplePath} onChange={e => setSamplePath(e.target.value)} className="border px-2 py-1 rounded flex-1" />
          <button onClick={buildPreview} className="bg-blue-600 text-white px-3 py-1 rounded">生成</button>
        </div>
        <pre className="mt-3 bg-white p-2 border rounded overflow-auto">{preview || '无预览'}</pre>
      </div>
    </div>
  );
}
