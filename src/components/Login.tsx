import React, { useState } from 'react';
import { useConfigStore } from '../store/useConfigStore';

export default function Login() {
  const [password, setPassword] = useState('');
  const login = useConfigStore((s) => s.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl mb-6">管理员登录</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="请输入密码（默认: admin）"
          className="w-full px-4 py-2 border rounded mb-4"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          登录
        </button>
      </form>
    </div>
  );
}
