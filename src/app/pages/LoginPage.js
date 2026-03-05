"use client";

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertTriangle, ArrowRight, ClipboardList, Users, Package, Truck, Construction } from 'lucide-react';
import VivereIcon from '../components/VivereIcon';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      if (email && password) {
        onLogin({ email, name: 'Colaborador' });
      } else {
        setError('Por favor, preencha todos os campos.');
      }
      setIsLoading(false);
    }, 1500);
  };

  const features = [
    { icon: ClipboardList, text: 'Ordens de Serviço' },
    { icon: Construction, text: 'Controle de Montagens' },
    { icon: Users, text: 'Gestão de Equipes' },
    { icon: Package, text: 'Estoque de Estruturas' },
    { icon: Truck, text: 'Logística de Eventos' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex font-sans">
      {/* Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 border-2 border-black rounded-full" />
          <div className="absolute top-40 left-40 w-96 h-96 border-2 border-black rounded-full" />
          <div className="absolute bottom-20 right-20 w-80 h-80 border-2 border-black rounded-full" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-black/20 backdrop-blur-sm flex items-center justify-center">
              <VivereIcon className="w-10 h-10 text-black" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-black tracking-tight">VIVERE</h1>
              <p className="text-black/70 text-sm font-medium tracking-widest">INFRA MANAGER</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-black mb-4">Sistema Interno de Gestão</h2>
          <p className="text-black/70 text-lg max-w-md mb-8">Plataforma exclusiva para colaboradores. Gerencie ordens de serviço, montagens, equipes e estruturas de eventos.</p>
          <div className="space-y-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center">
                  <f.icon className="w-4 h-4 text-black" />
                </div>
                <span className="text-black font-medium">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <VivereIcon className="w-7 h-7 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">VIVERE</h1>
              <p className="text-orange-500 text-xs font-medium tracking-widest">INFRA MANAGER</p>
            </div>
          </div>

          <div className="text-center lg:text-left mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Acesso ao Sistema</h2>
            <p className="text-zinc-500">Entre com suas credenciais de colaborador</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">E-mail Corporativo</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu.nome@vivere.com.br"
                  className="w-full pl-12 pr-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-orange-500 focus:ring-orange-500/20" />
                <span className="text-sm text-zinc-400">Manter conectado</span>
              </label>
              <button type="button" className="text-sm text-orange-500 hover:text-orange-400 transition-colors">Esqueci a senha</button>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}

            <button type="submit" disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
              {isLoading ? (<><div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />Entrando...</>) : (<>Entrar no Sistema<ArrowRight className="w-5 h-5" /></>)}
            </button>
          </form>

          <div className="mt-8 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <p className="text-zinc-500 text-xs text-center">🔒 Acesso restrito a colaboradores autorizados.</p>
          </div>
          <p className="text-center text-zinc-600 text-sm mt-6">© 2024 Vivere Infra Manager. Uso interno.</p>
        </div>
      </div>
    </div>
  );
}
