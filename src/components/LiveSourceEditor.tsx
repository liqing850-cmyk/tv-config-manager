import React from 'react';
import { Live as LiveType, useConfigStore } from '../store/useConfigStore';

export default function LiveSourceEditor() {
  const { profiles, currentProfile, updateProfile } = useConfigStore();
  const profile = profiles[currentProfile];

  const addLive = () => {
    const name = prompt('直播源名称');
    if (name) {
      updateProfile({ lives: [...profile.lives, { name, url: '' }] });
    }
  };

  const addGroup = () => {
    const name = prompt('组名');
    if (name) {
      updateProfile({ lives: [...profile.lives, { name, group: name, channels: [] }] });
    }
  };

  const updateLive = (index: number, partial: Partial<LiveType>) => {
    const next = profile.lives.slice();
    next[index] = { ...next[index], ...partial } as any;
    updateProfile({ lives: next });
  };

  const deleteLive = (index: number) => {
    const next = profile.lives.slice();
    next.splice(index, 1);
    updateProfile({ lives: next });
  };

  const addChannel = (liveIndex: number) => {
    const cname = prompt('频道名称');
    const curl = prompt('频道 URL');
    if (!cname || !curl) return;
    const next = profile.lives.slice();
    const target = { ...(next[liveIndex] || {} as any) };
    target.channels = [...(target.channels || []), { name: cname, url: curl }];
    next[liveIndex] = target as any;
    updateProfile({ lives: next });
  };

  const deleteChannel = (liveIndex: number, chIndex: number) => {
    const next = profile.lives.slice();
    const target = { ...(next[liveIndex] as any) };
    if (!target.channels) return;
    target.channels = target.channels.slice();
    target.channels.splice(chIndex, 1);
    next[liveIndex] = target as any;
    updateProfile({ lives: next });
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">直播源 (lives)</h2>
      <div className="flex gap-3 mb-4">
        <button onClick={addLive} className="bg-green-600 text-white px-4 py-2 rounded">添加单条线路</button>
        <button onClick={addGroup} className="bg-indigo-600 text-white px-4 py-2 rounded">添加分组</button>
      </div>
      <div className="space-y-3">
        {profile.lives.map((live, i) => (
          <div key={i} className="border p-3 rounded">
            <div className="flex gap-2 items-center mb-2">
              <input value={live.name} onChange={(e) => updateLive(i, { name: e.target.value })} className="border px-2 py-1 rounded flex-1" />
              <button onClick={() => deleteLive(i)} className="text-red-600">删除</button>
            </div>
            {'group' in live && live.group ? (
              <div>
                <div className="mb-2">分组: {live.group}</div>
                <div className="space-y-2">
                  {(live.channels || []).map((ch, ci) => (
                    <div key={ci} className="flex gap-2 items-center">
                      <input value={ch.name} onChange={(e) => {
                        const next = (live.channels || []).slice();
                        next[ci] = { ...next[ci], name: e.target.value };
                        updateLive(i, { channels: next });
                      }} className="border px-2 py-1 rounded flex-1" />
                      <input value={ch.url} onChange={(e) => {
                        const next = (live.channels || []).slice();
                        next[ci] = { ...next[ci], url: e.target.value };
                        updateLive(i, { channels: next });
                      }} className="border px-2 py-1 rounded flex-1" />
                      <button onClick={() => deleteChannel(i, ci)} className="text-red-600">删除</button>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <button onClick={() => addChannel(i)} className="bg-green-500 text-white px-3 py-1 rounded">添加频道</button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <input value={live.url || ''} onChange={(e) => updateLive(i, { url: e.target.value })} className="border px-2 py-1 rounded flex-1" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
