"use client";

export default function GenericPage({ title, description, icon: Icon }) {
  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 p-8 min-h-[400px] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/5 rounded-full blur-3xl" />
      <div className="relative flex flex-col items-center justify-center h-full min-h-[300px] text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center mb-6 border border-orange-500/20">
          <Icon className="w-10 h-10 text-orange-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-zinc-500 max-w-md mb-6">{description}</p>
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-full border border-zinc-700">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-zinc-400 text-sm">Página em desenvolvimento</span>
        </div>
      </div>
    </div>
  );
}
