"use client";

import { useState } from 'react';
import { Package, Plus, Search, Filter, AlertTriangle, CheckCircle, Clock, X, Save, Edit2, Trash2, Eye } from 'lucide-react';
import { estoqueInicial, categorias } from '../data/estruturas';

export default function EstoquePage() {
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
    if (confirm('Tem certeza que deseja excluir este item?')) {
      setEstoque(estoque.filter(i => i.id !== id));
    }
  };

  const getStatusColor = (item) => {
    const disponivel = item.total - item.emUso;
    if (disponivel === 0) return 'text-red-400 bg-red-400/10';
    if (disponivel <= item.total * 0.3) return 'text-yellow-400 bg-yellow-400/10';
    return 'text-green-400 bg-green-400/10';
  };

  const getStatusText = (item) => {
    const disponivel = item.total - item.emUso;
    if (disponivel === 0) return 'Esgotado';
    if (disponivel <= item.total * 0.3) return 'Estoque Baixo';
    return 'Disponível';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Package className="w-6 h-6 text-black" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Gestão de Estoque</h2>
            <p className="text-zinc-500 text-sm">Controle de estruturas e materiais</p>
          </div>
        </div>
        <button onClick={() => setModalAberto(true)} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all">
          <Plus className="w-5 h-5" /> Novo Material
        </button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total de Itens', value: totais.itens, icon: Package, color: 'orange' },
          { label: 'Em Uso', value: totais.emUso, icon: Clock, color: 'blue' },
          { label: 'Disponíveis', value: totais.disponiveis, icon: CheckCircle, color: 'green' },
          { label: 'Estoque Baixo', value: totais.baixoEstoque, icon: AlertTriangle, color: 'yellow' },
        ].map((card, i) => (
          <div key={i} className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-4 border border-zinc-800">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg bg-${card.color}-500/10 flex items-center justify-center`}>
                <card.icon className={`w-5 h-5 text-${card.color}-500`} />
              </div>
              <div>
                <p className="text-zinc-500 text-xs">{card.label}</p>
                <p className="text-xl font-bold text-white">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input type="text" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar material..."
            className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50" />
        </div>
        <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}
          className="px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-orange-500/50">
          <option value="Todas">Todas Categorias</option>
          {categorias.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}
          className="px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-orange-500/50">
          <option value="todos">Todos Status</option>
          <option value="disponivel">Disponível</option>
          <option value="baixo">Estoque Baixo</option>
          <option value="esgotado">Esgotado</option>
        </select>
      </div>

      {/* Tabela */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left text-zinc-500 text-sm font-medium px-6 py-4">Material</th>
                <th className="text-left text-zinc-500 text-sm font-medium px-6 py-4">Categoria</th>
                <th className="text-center text-zinc-500 text-sm font-medium px-6 py-4">Total</th>
                <th className="text-center text-zinc-500 text-sm font-medium px-6 py-4">Em Uso</th>
                <th className="text-center text-zinc-500 text-sm font-medium px-6 py-4">Disponível</th>
                <th className="text-center text-zinc-500 text-sm font-medium px-6 py-4">Status</th>
                <th className="text-center text-zinc-500 text-sm font-medium px-6 py-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {estoqueFiltrado.map((item) => (
                <tr key={item.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{item.nome}</p>
                    {item.observacao && <p className="text-zinc-500 text-xs mt-1">{item.observacao}</p>}
                  </td>
                  <td className="px-6 py-4 text-zinc-400 text-sm">{item.categoria}</td>
                  <td className="px-6 py-4 text-center text-white font-medium">{item.total}</td>
                  <td className="px-6 py-4 text-center text-orange-400 font-medium">{item.emUso}</td>
                  <td className="px-6 py-4 text-center text-green-400 font-medium">{item.total - item.emUso}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item)}`}>{getStatusText(item)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => setModalDetalhes(item)} className="p-2 text-zinc-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => setEditando(item)} className="p-2 text-zinc-500 hover:text-orange-400 hover:bg-orange-400/10 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleExcluir(item.id)} className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {estoqueFiltrado.length === 0 && (
          <div className="p-12 text-center">
            <Package className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-500">Nenhum material encontrado</p>
          </div>
        )}
      </div>

      {/* Modal Novo/Editar */}
      {(modalAberto || editando) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">{editando ? 'Editar Material' : 'Novo Material'}</h3>
              <button onClick={() => { setModalAberto(false); setEditando(null); }} className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Nome do Material</label>
                <input type="text" value={editando ? editando.nome : novoItem.nome} onChange={(e) => editando ? setEditando({...editando, nome: e.target.value}) : setNovoItem({...novoItem, nome: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-orange-500/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Categoria</label>
                <select value={editando ? editando.categoria : novoItem.categoria} onChange={(e) => editando ? setEditando({...editando, categoria: e.target.value}) : setNovoItem({...novoItem, categoria: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-orange-500/50">
                  {categorias.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Quantidade Total</label>
                  <input type="number" min="0" value={editando ? editando.total : novoItem.total} onChange={(e) => editando ? setEditando({...editando, total: parseInt(e.target.value) || 0}) : setNovoItem({...novoItem, total: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-orange-500/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Em Uso</label>
                  <input type="number" min="0" value={editando ? editando.emUso : novoItem.emUso} onChange={(e) => editando ? setEditando({...editando, emUso: parseInt(e.target.value) || 0}) : setNovoItem({...novoItem, emUso: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-orange-500/50" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Observação</label>
                <input type="text" value={editando ? editando.observacao || '' : novoItem.observacao} onChange={(e) => editando ? setEditando({...editando, observacao: e.target.value}) : setNovoItem({...novoItem, observacao: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-orange-500/50" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => { setModalAberto(false); setEditando(null); }} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors">Cancelar</button>
              <button onClick={handleSalvar} className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-xl flex items-center gap-2"><Save className="w-4 h-4" />Salvar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detalhes */}
      {modalDetalhes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Detalhes do Material</h3>
              <button onClick={() => setModalDetalhes(null)} className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-zinc-800/50 rounded-xl">
                <p className="text-zinc-400 text-sm">Nome</p>
                <p className="text-white font-medium">{modalDetalhes.nome}</p>
              </div>
              <div className="p-4 bg-zinc-800/50 rounded-xl">
                <p className="text-zinc-400 text-sm">Categoria</p>
                <p className="text-white">{modalDetalhes.categoria}</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-zinc-800/50 rounded-xl text-center">
                  <p className="text-zinc-400 text-xs">Total</p>
                  <p className="text-2xl font-bold text-white">{modalDetalhes.total}</p>
                </div>
                <div className="p-4 bg-orange-500/10 rounded-xl text-center border border-orange-500/20">
                  <p className="text-orange-400 text-xs">Em Uso</p>
                  <p className="text-2xl font-bold text-orange-400">{modalDetalhes.emUso}</p>
                </div>
                <div className="p-4 bg-green-500/10 rounded-xl text-center border border-green-500/20">
                  <p className="text-green-400 text-xs">Disponível</p>
                  <p className="text-2xl font-bold text-green-400">{modalDetalhes.total - modalDetalhes.emUso}</p>
                </div>
              </div>
              {modalDetalhes.observacao && (
                <div className="p-4 bg-zinc-800/50 rounded-xl">
                  <p className="text-zinc-400 text-sm">Observação</p>
                  <p className="text-white">{modalDetalhes.observacao}</p>
                </div>
              )}
              <div className="p-4 rounded-xl border" style={{ borderColor: getStatusColor(modalDetalhes).includes('green') ? 'rgb(74 222 128 / 0.3)' : getStatusColor(modalDetalhes).includes('yellow') ? 'rgb(250 204 21 / 0.3)' : 'rgb(248 113 113 / 0.3)' }}>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(modalDetalhes)}`}>{getStatusText(modalDetalhes)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
