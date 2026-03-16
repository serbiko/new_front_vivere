"use client";

import { useState } from 'react';
import { Package, Plus, Search, AlertTriangle, CheckCircle, Clock, X, Save, Edit2, Trash2, Eye } from 'lucide-react';
import { estoqueInicial, categorias } from '../data/estruturas';

export default function EstoquePage({ darkMode }) {
  const [estoque, setEstoque] = useState(estoqueInicial);
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [modalDetalhes, setModalDetalhes] = useState(null);
  const [editando, setEditando] = useState(null);
  const [novoItem, setNovoItem] = useState({ nome: '', categoria: 'Pisos e Acabamentos', total: 0, emUso: 0, observacao: '' });

  const estoqueFiltrado = estoque.filter(item => {
    const matchCategoria = filtroCategoria === 'Todas' || item.categoria === filtroCategoria;
    const matchBusca = item.nome.toLowerCase().includes(busca.toLowerCase());
    const disponivel = item.total - item.emUso;
    const matchStatus = filtroStatus === 'todos' || 
      (filtroStatus === 'disponivel' && disponivel > 0) ||
      (filtroStatus === 'baixo' && disponivel > 0 && disponivel <= item.total * 0.3) ||
      (filtroStatus === 'esgotado' && disponivel === 0);
    return matchCategoria && matchBusca && matchStatus;
  });

  const totais = {
    itens: estoque.length,
    emUso: estoque.reduce((acc, i) => acc + i.emUso, 0),
    disponiveis: estoque.reduce((acc, i) => acc + (i.total - i.emUso), 0),
    baixoEstoque: estoque.filter(i => (i.total - i.emUso) <= i.total * 0.3 && (i.total - i.emUso) > 0).length,
  };

  const handleSalvar = () => {
    if (editando) {
      setEstoque(estoque.map(i => i.id === editando.id ? { ...editando } : i));
      setEditando(null);
    } else {
      setEstoque([...estoque, { ...novoItem, id: Date.now() }]);
      setNovoItem({ nome: '', categoria: 'Pisos e Acabamentos', total: 0, emUso: 0, observacao: '' });
      setModalAberto(false);
    }
  };

  const handleExcluir = (id) => {
    if (confirm('Tem certeza que deseja excluir?')) {
      setEstoque(estoque.filter(i => i.id !== id));
    }
  };

  const getStatusColor = (item) => {
    const disponivel = item.total - item.emUso;
    if (disponivel === 0) return 'text-red-500 bg-red-500/10';
    if (disponivel <= item.total * 0.3) return 'text-yellow-500 bg-yellow-500/10';
    return 'text-green-500 bg-green-500/10';
  };

  const getStatusText = (item) => {
    const disponivel = item.total - item.emUso;
    if (disponivel === 0) return 'Esgotado';
    if (disponivel <= item.total * 0.3) return 'Estoque Baixo';
    return 'Disponível';
  };

  const inputClass = `w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-orange-500/50 transition-colors
    ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-zinc-300 text-zinc-900'}`;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30 flex-shrink-0">
            <Package className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
          </div>
          <div>
            <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Materiais</h2>
            <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Controle de estoque</p>
          </div>
        </div>
        <button onClick={() => setModalAberto(true)} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-xl shadow-lg shadow-orange-500/30 active:scale-95 touch-manipulation text-sm sm:text-base">
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" /> Novo Material
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Total de Itens', value: totais.itens, icon: Package, color: 'orange' },
          { label: 'Em Uso', value: totais.emUso, icon: Clock, color: 'blue' },
          { label: 'Disponíveis', value: totais.disponiveis, icon: CheckCircle, color: 'green' },
          { label: 'Estoque Baixo', value: totais.baixoEstoque, icon: AlertTriangle, color: 'yellow' },
        ].map((card, i) => (
          <div key={i} className={`rounded-xl p-3 sm:p-4 border transition-colors ${darkMode ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-${card.color}-500/10 flex items-center justify-center flex-shrink-0`}>
                <card.icon className={`w-4 h-4 sm:w-5 sm:h-5 text-${card.color}-500`} />
              </div>
              <div className="min-w-0">
                <p className={`text-xs truncate ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{card.label}</p>
                <p className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
          <input type="text" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar material..."
            className={`${inputClass} pl-10 sm:pl-12 text-sm sm:text-base`} />
        </div>
        <div className="flex gap-3 sm:gap-4">
          <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)} className={`${inputClass} flex-1 sm:flex-initial sm:w-auto text-sm sm:text-base`}>
            <option value="Todas">Todas Categorias</option>
            {categorias.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)} className={`${inputClass} flex-1 sm:flex-initial sm:w-auto text-sm sm:text-base`}>
            <option value="todos">Todos Status</option>
            <option value="disponivel">Disponível</option>
            <option value="baixo">Baixo</option>
            <option value="esgotado">Esgotado</option>
          </select>
        </div>
      </div>

      {/* Tabela / Lista */}
      <div className={`rounded-xl sm:rounded-2xl border overflow-hidden transition-colors ${darkMode ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                {['Material', 'Categoria', 'Total', 'Em Uso', 'Disponível', 'Status', 'Ações'].map(h => (
                  <th key={h} className={`text-left text-sm font-medium px-4 lg:px-6 py-4 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {estoqueFiltrado.map((item) => (
                <tr key={item.id} className={`border-b transition-colors ${darkMode ? 'border-zinc-800/50 hover:bg-zinc-800/30' : 'border-zinc-100 hover:bg-zinc-50'}`}>
                  <td className="px-4 lg:px-6 py-4">
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{item.nome}</p>
                    {item.observacao && <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{item.observacao}</p>}
                  </td>
                  <td className={`px-4 lg:px-6 py-4 text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{item.categoria}</td>
                  <td className={`px-4 lg:px-6 py-4 text-center font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{item.total}</td>
                  <td className="px-4 lg:px-6 py-4 text-center font-medium text-orange-500">{item.emUso}</td>
                  <td className="px-4 lg:px-6 py-4 text-center font-medium text-green-500">{item.total - item.emUso}</td>
                  <td className="px-4 lg:px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item)}`}>{getStatusText(item)}</span>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => setModalDetalhes(item)} className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white' : 'hover:bg-zinc-100 text-zinc-600'}`}><Eye className="w-4 h-4" /></button>
                      <button onClick={() => setEditando(item)} className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-zinc-800 text-zinc-400 hover:text-orange-500' : 'hover:bg-zinc-100 text-zinc-600 hover:text-orange-500'}`}><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleExcluir(item.id)} className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-red-500/10 text-zinc-400 hover:text-red-500' : 'hover:bg-red-50 text-zinc-600 hover:text-red-500'}`}><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Mobile List */}
        <div className="md:hidden divide-y divide-zinc-800">
          {estoqueFiltrado.map((item) => (
            <div key={item.id} className={`p-4 ${darkMode ? 'active:bg-zinc-800' : 'active:bg-zinc-50'}`}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0 flex-1">
                  <p className={`font-medium truncate ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{item.nome}</p>
                  <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{item.categoria}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getStatusColor(item)}`}>{getStatusText(item)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-4 text-sm">
                  <div><span className={darkMode ? 'text-zinc-500' : 'text-zinc-400'}>Total:</span> <span className={`font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{item.total}</span></div>
                  <div><span className={darkMode ? 'text-zinc-500' : 'text-zinc-400'}>Uso:</span> <span className="font-medium text-orange-500">{item.emUso}</span></div>
                  <div><span className={darkMode ? 'text-zinc-500' : 'text-zinc-400'}>Disp:</span> <span className="font-medium text-green-500">{item.total - item.emUso}</span></div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setModalDetalhes(item)} className={`p-2 rounded-lg ${darkMode ? 'text-zinc-400 active:bg-zinc-700' : 'text-zinc-500 active:bg-zinc-200'}`}><Eye className="w-4 h-4" /></button>
                  <button onClick={() => setEditando(item)} className={`p-2 rounded-lg ${darkMode ? 'text-zinc-400 active:bg-zinc-700' : 'text-zinc-500 active:bg-zinc-200'}`}><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleExcluir(item.id)} className={`p-2 rounded-lg ${darkMode ? 'text-zinc-400 active:bg-red-500/20' : 'text-zinc-500 active:bg-red-100'}`}><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {estoqueFiltrado.length === 0 && (
          <div className="p-12 text-center">
            <Package className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-zinc-700' : 'text-zinc-300'}`} />
            <p className={darkMode ? 'text-zinc-500' : 'text-zinc-500'}>Nenhum material encontrado</p>
          </div>
        )}
      </div>

      {/* Modal Novo/Editar */}
      {(modalAberto || editando) && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
          <div className={`rounded-t-2xl sm:rounded-2xl border-t sm:border p-4 sm:p-6 w-full sm:max-w-lg max-h-[90vh] overflow-y-auto scrollbar-hide ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{editando ? 'Editar Material' : 'Novo Material'}</h3>
              <button onClick={() => { setModalAberto(false); setEditando(null); }} className={`p-2 rounded-lg active:scale-95 touch-manipulation ${darkMode ? 'text-zinc-500 hover:text-white hover:bg-zinc-800' : 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100'}`}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Nome do Material</label>
                <input type="text" value={editando ? editando.nome : novoItem.nome} onChange={(e) => editando ? setEditando({...editando, nome: e.target.value}) : setNovoItem({...novoItem, nome: e.target.value})} className={inputClass} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Categoria</label>
                <select value={editando ? editando.categoria : novoItem.categoria} onChange={(e) => editando ? setEditando({...editando, categoria: e.target.value}) : setNovoItem({...novoItem, categoria: e.target.value})} className={inputClass}>
                  {categorias.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Quantidade Total</label>
                  <input type="number" min="0" value={editando ? editando.total : novoItem.total} onChange={(e) => editando ? setEditando({...editando, total: parseInt(e.target.value) || 0}) : setNovoItem({...novoItem, total: parseInt(e.target.value) || 0})} className={inputClass} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Em Uso</label>
                  <input type="number" min="0" value={editando ? editando.emUso : novoItem.emUso} onChange={(e) => editando ? setEditando({...editando, emUso: parseInt(e.target.value) || 0}) : setNovoItem({...novoItem, emUso: parseInt(e.target.value) || 0})} className={inputClass} />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Observação</label>
                <input type="text" value={editando ? editando.observacao || '' : novoItem.observacao} onChange={(e) => editando ? setEditando({...editando, observacao: e.target.value}) : setNovoItem({...novoItem, observacao: e.target.value})} className={inputClass} />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => { setModalAberto(false); setEditando(null); }} className={`px-4 py-2 rounded-xl ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-900'}`}>Cancelar</button>
              <button onClick={handleSalvar} className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-xl flex items-center gap-2"><Save className="w-4 h-4" />Salvar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detalhes */}
      {modalDetalhes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`rounded-2xl border p-6 w-full max-w-md ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Detalhes do Material</h3>
              <button onClick={() => setModalDetalhes(null)} className={`p-2 rounded-lg ${darkMode ? 'text-zinc-500 hover:text-white hover:bg-zinc-800' : 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100'}`}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Nome</p>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{modalDetalhes.nome}</p>
              </div>
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Categoria</p>
                <p className={darkMode ? 'text-white' : 'text-zinc-900'}>{modalDetalhes.categoria}</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
                  <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Total</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{modalDetalhes.total}</p>
                </div>
                <div className="p-4 rounded-xl text-center bg-orange-500/10 border border-orange-500/20">
                  <p className="text-xs text-orange-500">Em Uso</p>
                  <p className="text-2xl font-bold text-orange-500">{modalDetalhes.emUso}</p>
                </div>
                <div className="p-4 rounded-xl text-center bg-green-500/10 border border-green-500/20">
                  <p className="text-xs text-green-500">Disponível</p>
                  <p className="text-2xl font-bold text-green-500">{modalDetalhes.total - modalDetalhes.emUso}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}