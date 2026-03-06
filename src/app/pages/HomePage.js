"use client";

import { ClipboardList, Users, Building2, BarChart3, ArrowRight, Activity, PieChart, CheckCircle, Wrench, Clock, Construction, Package, Calendar, HelpCircle } from 'lucide-react';

export default function HomePage({ setActiveTab, setCadastroOpen, darkMode }) {
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
    'Em Montagem': 'text-yellow-500 bg-yellow-500/10',
    'Concluída': 'text-green-500 bg-green-500/10',
    'Aguardando': 'text-blue-500 bg-blue-500/10',
    'Em Desmontagem': 'text-purple-500 bg-purple-500/10',
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className={`relative rounded-2xl p-8 border overflow-hidden transition-colors duration-300
        ${darkMode 
          ? 'bg-gradient-to-br from-orange-500/10 via-zinc-900 to-zinc-950 border-orange-500/20' 
          : 'bg-gradient-to-br from-orange-100 via-white to-orange-50 border-orange-200'}`}>
        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl ${darkMode ? 'bg-orange-500/10' : 'bg-orange-300/30'}`} />
        <div className={`absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl ${darkMode ? 'bg-orange-600/10' : 'bg-orange-200/50'}`} />
        <div className="relative">
          <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            Bem-vindo ao <span className="text-orange-500">Vivere</span>
          </h2>
          <p className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
            Gerencie ordens de serviço, montagens de estruturas e operações de eventos. Sistema exclusivo para colaboradores.
          </p>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div>
        <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
          <Activity className="w-5 h-5 text-orange-500" />Ações Rápidas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button key={action.id} onClick={action.onClick} 
                className={`group relative rounded-xl p-5 border transition-all duration-300 text-left overflow-hidden
                  ${darkMode 
                    ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 hover:border-orange-500/50' 
                    : 'bg-white border-zinc-200 hover:border-orange-400 shadow-sm hover:shadow-md'}`}>
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl transition-all duration-300 ${darkMode ? 'bg-orange-500/10 group-hover:bg-orange-500/20' : 'bg-orange-200/50 group-hover:bg-orange-300/50'}`} />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <h4 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{action.label}</h4>
                  <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{action.description}</p>
                  <ArrowRight className={`absolute bottom-0 right-0 w-5 h-5 group-hover:translate-x-1 transition-all duration-300 ${darkMode ? 'text-zinc-600 group-hover:text-orange-500' : 'text-zinc-400 group-hover:text-orange-500'}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* OS Recentes e Resumo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`rounded-2xl border overflow-hidden transition-colors duration-300
          ${darkMode ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <div className={`p-5 border-b flex items-center justify-between ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
            <h3 className={`text-lg font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
              <ClipboardList className="w-5 h-5 text-orange-500" />OS Recentes
            </h3>
            <button onClick={() => setActiveTab('historico')} className="text-orange-500 text-sm hover:text-orange-400 transition-colors flex items-center gap-1">
              Ver todas <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 space-y-3">
            {recentOS.map((os) => (
              <div key={os.id} className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer
                ${darkMode ? 'bg-zinc-800/50 hover:bg-zinc-800' : 'bg-zinc-50 hover:bg-zinc-100'}`}>
                <div>
                  <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{os.id}</p>
                  <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{os.cliente} • {os.tipo}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[os.status]}`}>{os.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-2xl border overflow-hidden transition-colors duration-300
          ${darkMode ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <div className={`p-5 border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
            <h3 className={`text-lg font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
              <PieChart className="w-5 h-5 text-orange-500" />Resumo do Mês
            </h3>
          </div>
          <div className="p-4 grid grid-cols-2 gap-4">
            {[
              { icon: CheckCircle, label: 'OS Concluídas', value: '34', color: 'green' },
              { icon: Wrench, label: 'Em Montagem', value: '8', color: 'yellow' },
              { icon: Clock, label: 'Aguardando', value: '12', color: 'blue' },
              { icon: Construction, label: 'Eventos no Mês', value: '19', color: 'purple' },
            ].map((item, i) => (
              <div key={i} className={`rounded-xl p-4 ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <item.icon className={`w-4 h-4 text-${item.color}-500`} />
                  <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{item.label}</span>
                </div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Links rápidos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { id: 'estoque', label: 'Estoque', desc: 'Estruturas e materiais', icon: Package },
          { id: 'evento', label: 'Eventos', desc: 'Agenda de montagens', icon: Calendar },
          { id: 'ajuda', label: 'Ajuda', desc: 'Suporte interno', icon: HelpCircle },
        ].map((item) => (
          <button key={item.id} onClick={() => setActiveTab(item.id)} 
            className={`group flex items-center gap-4 border rounded-xl p-4 transition-all duration-300
              ${darkMode 
                ? 'bg-zinc-900/50 hover:bg-zinc-800/80 border-zinc-800 hover:border-orange-500/30' 
                : 'bg-white hover:bg-zinc-50 border-zinc-200 hover:border-orange-300 shadow-sm'}`}>
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
              <item.icon className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-left">
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{item.label}</p>
              <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{item.desc}</p>
            </div>
            <ArrowRight className={`w-5 h-5 ml-auto group-hover:translate-x-1 transition-all ${darkMode ? 'text-zinc-600 group-hover:text-orange-500' : 'text-zinc-400 group-hover:text-orange-500'}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
