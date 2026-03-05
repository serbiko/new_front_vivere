"use client";

import { ClipboardList, Users, Building2, BarChart3, ArrowRight, Activity, PieChart, CheckCircle, Wrench, Clock, Construction, Package, Calendar, HelpCircle } from 'lucide-react';

export default function HomePage({ setActiveTab, setCadastroOpen }) {
  const quickActions = [
    { id: 'cadastro-os', label: 'Nova OS', description: 'Criar ordem de serviço', icon: ClipboardList, onClick: () => { setCadastroOpen(true); setActiveTab('cadastro-os'); } },
    { id: 'cadastro-pessoas', label: 'Nova Pessoa', description: 'Cadastrar colaborador', icon: Users, onClick: () => { setCadastroOpen(true); setActiveTab('cadastro-pessoas'); } },
    { id: 'cadastro-empresas', label: 'Novo Cliente', description: 'Cadastrar órgão/empresa', icon: Building2, onClick: () => { setCadastroOpen(true); setActiveTab('cadastro-empresas'); } },
    { id: 'painel', label: 'Ver Painel', description: 'Métricas de operações', icon: BarChart3, onClick: () => setActiveTab('painel') },
  ];

  const recentOS = [
    { id: 'OS-001-VIV', cliente: 'Prefeitura Municipal', status: 'Em Montagem', tipo: 'Palco + Tendas' },
    { id: 'OS-002-VIV', cliente: 'Sec. de Cultura', status: 'Concluída', tipo: 'Iluminação' },
    { id: 'OS-003-VIV', cliente: 'Sec. de Esportes', status: 'Aguardando', tipo: 'Arquibancada' },
    { id: 'OS-004-VIV', cliente: 'Prefeitura Municipal', status: 'Em Desmontagem', tipo: 'Estrutura Completa' },
  ];

  const statusColors = {
    'Em Montagem': 'text-yellow-400 bg-yellow-400/10',
    'Concluída': 'text-green-400 bg-green-400/10',
    'Aguardando': 'text-blue-400 bg-blue-400/10',
    'Em Desmontagem': 'text-purple-400 bg-purple-400/10',
  };

  return (
    <div className="space-y-8">
      <div className="relative bg-gradient-to-br from-orange-500/10 via-zinc-900 to-zinc-950 rounded-2xl p-8 border border-orange-500/20 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-600/10 rounded-full blur-3xl" />
        <div className="relative">
          <h2 className="text-3xl font-bold text-white mb-2">Bem-vindo ao <span className="text-orange-500">Vivere</span></h2>
          <p className="text-zinc-400 max-w-xl">Gerencie ordens de serviço, montagens de estruturas e operações de eventos. Sistema exclusivo para colaboradores.</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Activity className="w-5 h-5 text-orange-500" />Ações Rápidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button key={action.id} onClick={action.onClick} className="group relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-5 border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 text-left overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all duration-300" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"><Icon className="w-6 h-6 text-orange-500" /></div>
                  <h4 className="text-white font-semibold mb-1">{action.label}</h4>
                  <p className="text-zinc-500 text-sm">{action.description}</p>
                  <ArrowRight className="absolute bottom-0 right-0 w-5 h-5 text-zinc-600 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2"><ClipboardList className="w-5 h-5 text-orange-500" />OS Recentes</h3>
            <button onClick={() => setActiveTab('historico')} className="text-orange-500 text-sm hover:text-orange-400 transition-colors flex items-center gap-1">Ver todas <ArrowRight className="w-4 h-4" /></button>
          </div>
          <div className="p-4 space-y-3">
            {recentOS.map((os) => (
              <div key={os.id} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer">
                <div><p className="text-white font-medium text-sm">{os.id}</p><p className="text-zinc-500 text-xs">{os.cliente} • {os.tipo}</p></div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[os.status]}`}>{os.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden">
          <div className="p-5 border-b border-zinc-800"><h3 className="text-lg font-semibold text-white flex items-center gap-2"><PieChart className="w-5 h-5 text-orange-500" />Resumo do Mês</h3></div>
          <div className="p-4 grid grid-cols-2 gap-4">
            <div className="bg-zinc-800/50 rounded-xl p-4"><div className="flex items-center gap-2 mb-2"><CheckCircle className="w-4 h-4 text-green-500" /><span className="text-zinc-400 text-sm">OS Concluídas</span></div><p className="text-2xl font-bold text-white">34</p></div>
            <div className="bg-zinc-800/50 rounded-xl p-4"><div className="flex items-center gap-2 mb-2"><Wrench className="w-4 h-4 text-yellow-500" /><span className="text-zinc-400 text-sm">Em Montagem</span></div><p className="text-2xl font-bold text-white">8</p></div>
            <div className="bg-zinc-800/50 rounded-xl p-4"><div className="flex items-center gap-2 mb-2"><Clock className="w-4 h-4 text-blue-500" /><span className="text-zinc-400 text-sm">Aguardando</span></div><p className="text-2xl font-bold text-white">12</p></div>
            <div className="bg-zinc-800/50 rounded-xl p-4"><div className="flex items-center gap-2 mb-2"><Construction className="w-4 h-4 text-purple-500" /><span className="text-zinc-400 text-sm">Eventos no Mês</span></div><p className="text-2xl font-bold text-white">19</p></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { id: 'estoque', label: 'Estoque', desc: 'Estruturas e materiais', icon: Package },
          { id: 'evento', label: 'Eventos', desc: 'Agenda de montagens', icon: Calendar },
          { id: 'ajuda', label: 'Ajuda', desc: 'Suporte interno', icon: HelpCircle },
        ].map((item) => (
          <button key={item.id} onClick={() => setActiveTab(item.id)} className="group flex items-center gap-4 bg-zinc-900/50 hover:bg-zinc-800/80 border border-zinc-800 hover:border-orange-500/30 rounded-xl p-4 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors"><item.icon className="w-5 h-5 text-orange-500" /></div>
            <div className="text-left"><p className="text-white font-medium">{item.label}</p><p className="text-zinc-500 text-sm">{item.desc}</p></div>
            <ArrowRight className="w-5 h-5 text-zinc-600 ml-auto group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
}
