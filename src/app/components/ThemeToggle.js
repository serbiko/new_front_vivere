"use client";

import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 overflow-hidden
        ${darkMode 
          ? 'bg-gradient-to-br from-indigo-900 to-slate-900' 
          : 'bg-gradient-to-br from-amber-400 to-orange-400'
        }`}
    >
      {/* Estrelas (modo escuro) */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${darkMode ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1.5 left-2 w-1 h-1 bg-white rounded-full animate-pulse" />
        <div className="absolute top-3 right-2 w-0.5 h-0.5 bg-white/80 rounded-full animate-pulse" style={{animationDelay: '0.1s'}} />
        <div className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '0.2s'}} />
        <div className="absolute top-2 left-5 w-0.5 h-0.5 bg-white/70 rounded-full animate-pulse" style={{animationDelay: '0.3s'}} />
      </div>

      {/* Ícone da Lua */}
      <Moon 
        className={`w-6 h-6 absolute transition-all duration-500 text-yellow-200
          ${darkMode 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 rotate-90 scale-50'
          }`}
        fill="currentColor"
      />

      {/* Ícone do Sol */}
      <Sun 
        className={`w-6 h-6 absolute transition-all duration-500 text-white
          ${darkMode 
            ? 'opacity-0 -rotate-90 scale-50' 
            : 'opacity-100 rotate-0 scale-100'
          }`}
      />

      {/* Raios do sol (modo claro) */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${darkMode ? 'opacity-0' : 'opacity-100'}`}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-1.5 bg-white/40 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-14px)`,
            }}
          />
        ))}
      </div>
    </button>
  );
}
