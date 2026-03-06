"use client";

import { PartyPopper, ClipboardList, CheckCircle, UsersRound, TrendingUp, TrendingDown, BarChart3, PieChart, CalendarDays, MapPin } from 'lucide-react';

export default function PainelPage({ darkMode }) {
  const mainStats = [
    { label: 'Eventos no Mês', value: '19', change: '+15%', trend: 'up', icon: PartyPopper },
    { label: 'OS em Andamento', value: '8', change: '+3', trend: 'up', icon: ClipboardList },
    { label: 'Montagens Concluídas', value: '34', change: '+22%', trend: 'up', icon: CheckCircle },
    { label: 'Equipes em Campo', value: '5', change: '0', trend: 'up', icon: UsersRound },
  ];

  const tipoEstrutura = [
    { label: 'Palcos', value: 12, color: 'bg-orange-500' },
    { label: 'Tendas', value: 18, color: 'bg-blue-500' },
    { label: 'Arquibancadas', value: 8, color: 'bg-emerald-500' },
    { label: 'Iluminação', value: 15, color: 'bg-purple-500' },
    { label: 'Sonorização', value: 10, color: 'bg-pink-500' },
  ];

  const monthlyData = [
    { month: 'Jan', value: 14 },
    { month: 'Fev', value: 18 },
    { month: 'Mar', value: 22 },
    { month: 'Abr', value: 16 },
    { month: 'Mai', value: 25 },
    { month: 'Jun', value: 19 },
  ];

  const maxValue = Math.max(...monthlyData.map(d => d.value));

  const proximasOS = [
    { id: 'OS-005-VIV', evento: 'Festa Junina Municipal', data: '15 Mar', local: 'Praça Central', status: 'Aguardando' },
    { id: 'OS-006-VIV', evento: 'Show Dia da Mulher', data: '18 Mar', local: 'Ginásio Municipal', status: 'Em Montagem' },
    { id: 'OS-007-VIV', evento: 'Formatura ETEC', data: '22 Mar', local: 'Centro de Convenções', status: 'Aguardando' },
    { id: 'OS-008-VIV', evento: 'Campeonato Regional', data: '25 Mar', local: 'Estádio Municipal', status: 'Em Planejamento' },
    { id: 'OS-009-VIV', evento: 'Festival Gastronômico', data: '28 Mar', local: 'Parque da Cidade', status: 'Aguardando' },
  ];

  const statusColors = {
    'Aguardando': 'text-blue-500 bg-blue-500/10',
    'Em Montagem': 'text-yellow-500 bg-yellow-500/10',
    'Em Planejamento': 'text-purple-500 bg-purple-500/10',
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mainStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`relative rounded-2xl p-6 border overflow-hidden group transition-all duration-300
              ${darkMode 
                ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 hover:border-orange-500/30' 
                : 'bg-white border-zinc-200 hover:border-orange-300 shadow-sm'}`}>
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl transition-all duration-300
                ${darkMode ? 'bg-orange-500/5 group-hover:bg-orange-500/10' : 'bg-orange-100/50 group-hover:bg-orange-200/50'}`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}{stat.change}
                  </div>
                </div>
                <p className={`text-sm mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{stat.label}</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-2 rounded-2xl border p-6 transition-colors duration-300
          ${darkMode ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <h3 className={`text-lg font-semibold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            <BarChart3 className="w-5 h-5 text-orange-500" />Montagens por Mês
          </h3>
          <div className="flex items-end justify-between gap-2 h-48">
            {monthlyData.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className={`w-full rounded-t-lg relative overflow-hidden ${darkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`} style={{ height: `${(data.value / maxValue) * 100}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-600 to-orange-500 rounded-t-lg" />
                  <div className={`absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-medium ${darkMode ? 'text-white' : 'text-zinc-700'}`}>{data.value}</div>
                </div>
                <span className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-2xl border p-6 transition-colors duration-300
          ${darkMode ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <h3 className={`text-lg font-semibold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            <PieChart className="w-5 h-5 text-orange-500" />Tipos de Estrutura
          </h3>
          <div className="space-y-4">
            {tipoEstrutura.map((stat, i) => {
              const total = tipoEstrutura.reduce((acc, s) => acc + s.value, 0);
              const percentage = ((stat.value / total) * 100).toFixed(1);
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{stat.label}</span>
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{stat.value}</span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
                    <div className={`h-full ${stat.color} rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={`rounded-2xl border overflow-hidden transition-colors duration-300
        ${darkMode ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
        <div className={`p-6 border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
          <h3 className={`text-lg font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            <CalendarDays className="w-5 h-5 text-orange-500" />Próximas OS
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                {['OS', 'Evento', 'Data', 'Local', 'Status'].map(h => (
                  <th key={h} className={`text-left text-sm font-medium px-6 py-4 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {proximasOS.map((os, i) => (
                <tr key={i} className={`border-b transition-colors ${darkMode ? 'border-zinc-800/50 hover:bg-zinc-800/30' : 'border-zinc-100 hover:bg-zinc-50'}`}>
                  <td className="px-6 py-4"><span className="text-orange-500 font-mono font-medium">{os.id}</span></td>
                  <td className={`px-6 py-4 font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{os.evento}</td>
                  <td className={`px-6 py-4 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{os.data}</td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      <MapPin className="w-4 h-4" />{os.local}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[os.status]}`}>{os.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
