"use client";

export default function GenericPage({ title, description, icon: Icon, darkMode }) {
  return (
    <div className={`rounded-2xl border p-8 min-h-[400px] relative overflow-hidden transition-colors duration-300
      ${darkMode 
        ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800' 
        : 'bg-white border-zinc-200 shadow-sm'}`}>
      <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl ${darkMode ? 'bg-orange-500/5' : 'bg-orange-200/30'}`} />
      <div className={`absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl ${darkMode ? 'bg-orange-600/5' : 'bg-orange-100/50'}`} />
      <div className="relative flex flex-col items-center justify-center h-full min-h-[300px] text-center">
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border transition-colors duration-300
          ${darkMode 
            ? 'bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/20' 
            : 'bg-gradient-to-br from-orange-100 to-orange-50 border-orange-200'}`}>
          <Icon className="w-10 h-10 text-orange-500" />
        </div>
        <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{title}</h3>
        <p className={`max-w-md mb-6 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{description}</p>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors duration-300
          ${darkMode ? 'bg-zinc-800/50 border-zinc-700' : 'bg-zinc-100 border-zinc-200'}`}>
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Página em desenvolvimento</span>
        </div>
      </div>
    </div>
  );
}
