"use client";

import { useState, useEffect } from 'react';
import { 
  Clock, User, Calendar, ChevronRight, X, FileText, 
  ClipboardList, Package, Building2, Users, Edit3, 
  ArrowUpCircle, Trash2, Plus, Search, Filter, Eye
} from 'lucide-react';
import { getAcoes, subscribe, TIPO_ACAO } from '../data/acoesStore';

// Configuração de ícones e cores por tipo de ação
const acaoConfig = {
  [TIPO_ACAO.CRIAR_OS]: { 
    icon: ClipboardList, 
    color: 'text-green-500 bg-green-500/10 border-green-500/20',
    label: 'Nova OS'
  },
  [TIPO_ACAO.EDITAR_OS]: { 
    icon: Edit3, 
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    label: 'Edição de OS'
  },
  [TIPO_ACAO.AVANCAR_STATUS]: { 
    icon: ArrowUpCircle, 
    color: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
    label: 'Avanço de Status'
  },
  [TIPO_ACAO.CRIAR_PESSOA]: { 
    icon: Users, 
    color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    label: 'Novo Cadastro'
  },
  [TIPO_ACAO.CRIAR_EMPRESA]: { 
    icon: Building2, 
    color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
    label: 'Nova Empresa'
  },
  [TIPO_ACAO.EDITAR_ESTOQUE]: { 
    icon: Package, 
    color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    label: 'Atualização de Estoque'
  },
  [TIPO_ACAO.CRIAR_MATERIAL]: { 
    icon: Plus, 
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    label: 'Novo Material'
  },
  [TIPO_ACAO.EXCLUIR_MATERIAL]: { 
    icon: Trash2, 
    color: 'text-red-500 bg-red-500/10 border-red-500/20',
    label: 'Material Removido'
  },
};

const getConfig = (tipo) => acaoConfig[tipo] || { 
  icon: FileText, 
  color: 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20',
  label: 'Ação'
};

export default function HistoricoPage({ darkMode }) {
  const [acoes, setAcoes] = useState([]);
  const [acaoSelecionada, setAcaoSelecionada] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroBusca, setFiltroBusca] = useState('');

  // Inscrever para atualizações
  useEffect(() => {
    setAcoes(getAcoes());
    const unsubscribe = subscribe((novasAcoes) => {
      setAcoes(novasAcoes);
    });
    return unsubscribe;
  }, []);

  const acoesFiltradas = acoes.filter(acao => {
    const matchTipo = filtroTipo === 'todos' || acao.tipo === filtroTipo;
    const matchBusca = 
      acao.usuario.toLowerCase().includes(filtroBusca.toLowerCase()) ||
      acao.descricao.toLowerCase().includes(filtroBusca.toLowerCase()) ||
      (acao.dados.osId && acao.dados.osId.toLowerCase().includes(filtroBusca.toLowerCase())) ||
      (acao.dados.nome && acao.dados.nome.toLowerCase().includes(filtroBusca.toLowerCase()));
    return matchTipo && matchBusca;
  });

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatTimeAgo = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return 'Agora mesmo';
    if (diffMin < 60) return `Há ${diffMin} min`;
    if (diffHour < 24) return `Há ${diffHour}h`;
    if (diffDay < 7) return `Há ${diffDay} dia${diffDay > 1 ? 's' : ''}`;
    return formatDateTime(isoString);
  };

  const getDescricaoCompleta = (acao) => {
    const { tipo, dados, usuario } = acao;
    
    switch (tipo) {
      case TIPO_ACAO.CRIAR_OS:
        return `${usuario} registrou a OS ${dados.osId || ''} - ${dados.nomeEvento || 'Evento'}`;
      case TIPO_ACAO.EDITAR_OS:
        return `${usuario} editou a OS ${dados.osId || ''}`;
      case TIPO_ACAO.AVANCAR_STATUS:
        return `${usuario} avançou a OS ${dados.osId || ''} para "${dados.novoStatus || ''}"`;
      case TIPO_ACAO.CRIAR_PESSOA:
        return `${usuario} cadastrou ${dados.nome || 'uma pessoa'}`;
      case TIPO_ACAO.CRIAR_EMPRESA:
        return `${usuario} cadastrou a empresa ${dados.nomeEmpresa || ''}`;
      case TIPO_ACAO.EDITAR_ESTOQUE:
        return `${usuario} atualizou o material "${dados.nome || ''}"`;
      case TIPO_ACAO.CRIAR_MATERIAL:
        return `${usuario} adicionou "${dados.nome || ''}" ao estoque`;
      case TIPO_ACAO.EXCLUIR_MATERIAL:
        return `${usuario} removeu "${dados.nome || ''}" do estoque`;
      default:
        return `${usuario} ${acao.descricao}`;
    }
  };

  const renderDetalhesCampo = (label, valor) => {
    if (!valor && valor !== 0) return null;
    return (
      <div className={`flex justify-between py-2 border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
        <span className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{label}</span>
        <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{valor}</span>
      </div>
    );
  };

  const inputClass = `w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-orange-500/50 transition-colors
    ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600' : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Clock className="w-6 h-6 text-black" />
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Histórico</h2>
            <p className={darkMode ? 'text-zinc-500' : 'text-zinc-500'}>Registro de ações no sistema</p>
          </div>
        </div>
        
        <div className={`px-4 py-2 rounded-xl border ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Total: </span>
          <span className={`font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{acoes.length} ações</span>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
          <input 
            type="text" 
            value={filtroBusca} 
            onChange={(e) => setFiltroBusca(e.target.value)} 
            placeholder="Buscar por usuário, OS, nome..."
            className={`${inputClass} pl-12`} 
          />
        </div>
        <select 
          value={filtroTipo} 
          onChange={(e) => setFiltroTipo(e.target.value)} 
          className={`${inputClass} sm:w-56`}
        >
          <option value="todos">Todos os Tipos</option>
          <option value={TIPO_ACAO.CRIAR_OS}>Novas OS</option>
          <option value={TIPO_ACAO.EDITAR_OS}>Edições de OS</option>
          <option value={TIPO_ACAO.AVANCAR_STATUS}>Avanços de Status</option>
          <option value={TIPO_ACAO.CRIAR_PESSOA}>Cadastros de Pessoas</option>
          <option value={TIPO_ACAO.CRIAR_EMPRESA}>Cadastros de Empresas</option>
          <option value={TIPO_ACAO.EDITAR_ESTOQUE}>Atualizações de Estoque</option>
        </select>
      </div>

      {/* Lista de Ações */}
      {acoesFiltradas.length === 0 ? (
        <div className={`rounded-2xl border-2 border-dashed p-12 text-center ${darkMode ? 'border-zinc-800' : 'border-zinc-300'}`}>
          <Clock className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-zinc-700' : 'text-zinc-400'}`} />
          <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {acoes.length === 0 ? 'Nenhuma ação registrada' : 'Nenhuma ação encontrada'}
          </h3>
          <p className={darkMode ? 'text-zinc-600' : 'text-zinc-400'}>
            {acoes.length === 0 
              ? 'As ações realizadas no sistema aparecerão aqui.' 
              : 'Tente ajustar os filtros de busca.'}
          </p>
          {acoes.length === 0 && (
            <p className={`mt-4 text-sm ${darkMode ? 'text-zinc-700' : 'text-zinc-400'}`}>
              💡 Experimente criar uma OS, cadastrar uma pessoa ou editar o estoque.
            </p>
          )}
        </div>
      ) : (
        <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
          <div className="divide-y divide-zinc-800">
            {acoesFiltradas.map((acao) => {
              const config = getConfig(acao.tipo);
              const Icon = config.icon;
              
              return (
                <div 
                  key={acao.id}
                  onClick={() => setAcaoSelecionada(acao)}
                  className={`p-4 flex items-center gap-4 cursor-pointer transition-all group
                    ${darkMode ? 'hover:bg-zinc-800/50' : 'hover:bg-zinc-50'}`}
                >
                  {/* Ícone */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${config.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium truncate ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                      {getDescricaoCompleta(acao)}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${config.color}`}>
                        {config.label}
                      </span>
                      <span className={`text-xs flex items-center gap-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        <User className="w-3 h-3" />
                        {acao.usuario}
                      </span>
                      <span className={`text-xs flex items-center gap-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        <Calendar className="w-3 h-3" />
                        {formatTimeAgo(acao.timestamp)}
                      </span>
                    </div>
                  </div>

                  {/* Seta */}
                  <div className={`p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100
                    ${darkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                    <Eye className={`w-4 h-4 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal de Detalhes */}
      {acaoSelecionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`rounded-2xl border w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col
            ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
            
            {/* Header */}
            <div className={`p-6 border-b flex-shrink-0 ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {(() => {
                    const config = getConfig(acaoSelecionada.tipo);
                    const Icon = config.icon;
                    return (
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${config.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    );
                  })()}
                  <div>
                    <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                      Detalhes da Ação
                    </h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getConfig(acaoSelecionada.tipo).color}`}>
                      {getConfig(acaoSelecionada.tipo).label}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setAcaoSelecionada(null)}
                  className={`p-2 rounded-xl transition-colors ${darkMode ? 'text-zinc-500 hover:text-white hover:bg-zinc-800' : 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100'}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {/* Descrição */}
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                  {getDescricaoCompleta(acaoSelecionada)}
                </p>
              </div>

              {/* Informações Gerais */}
              <div>
                <h3 className={`text-sm font-semibold mb-3 uppercase tracking-wide ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  Informações
                </h3>
                <div className={`rounded-xl border p-4 ${darkMode ? 'bg-zinc-800/30 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                  {renderDetalhesCampo('Usuário', acaoSelecionada.usuario)}
                  {renderDetalhesCampo('Data/Hora', formatDateTime(acaoSelecionada.timestamp))}
                  {renderDetalhesCampo('ID da Ação', acaoSelecionada.id)}
                </div>
              </div>

              {/* Dados da Ação */}
              {Object.keys(acaoSelecionada.dados).length > 0 && (
                <div>
                  <h3 className={`text-sm font-semibold mb-3 uppercase tracking-wide ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    Dados Alterados
                  </h3>
                  <div className={`rounded-xl border p-4 ${darkMode ? 'bg-zinc-800/30 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    {acaoSelecionada.dados.osId && renderDetalhesCampo('Nº OS', acaoSelecionada.dados.osId)}
                    {acaoSelecionada.dados.nomeEvento && renderDetalhesCampo('Evento', acaoSelecionada.dados.nomeEvento)}
                    {acaoSelecionada.dados.nome && renderDetalhesCampo('Nome', acaoSelecionada.dados.nome)}
                    {acaoSelecionada.dados.nomeEmpresa && renderDetalhesCampo('Empresa', acaoSelecionada.dados.nomeEmpresa)}
                    {acaoSelecionada.dados.statusAnterior && renderDetalhesCampo('Status Anterior', acaoSelecionada.dados.statusAnterior)}
                    {acaoSelecionada.dados.novoStatus && renderDetalhesCampo('Novo Status', acaoSelecionada.dados.novoStatus)}
                    {acaoSelecionada.dados.categoria && renderDetalhesCampo('Categoria', acaoSelecionada.dados.categoria)}
                    {acaoSelecionada.dados.total !== undefined && renderDetalhesCampo('Quantidade Total', acaoSelecionada.dados.total)}
                    {acaoSelecionada.dados.emUso !== undefined && renderDetalhesCampo('Em Uso', acaoSelecionada.dados.emUso)}
                    {acaoSelecionada.dados.solicitante && renderDetalhesCampo('Solicitante', acaoSelecionada.dados.solicitante)}
                    {acaoSelecionada.dados.local && renderDetalhesCampo('Local', acaoSelecionada.dados.local)}
                    {acaoSelecionada.dados.cpf && renderDetalhesCampo('CPF', acaoSelecionada.dados.cpf)}
                    {acaoSelecionada.dados.cnpj && renderDetalhesCampo('CNPJ', acaoSelecionada.dados.cnpj)}
                    {acaoSelecionada.dados.email && renderDetalhesCampo('E-mail', acaoSelecionada.dados.email)}
                    {acaoSelecionada.dados.telefone && renderDetalhesCampo('Telefone', acaoSelecionada.dados.telefone)}
                    
                    {/* Campos alterados em edição */}
                    {acaoSelecionada.dados.camposAlterados && acaoSelecionada.dados.camposAlterados.length > 0 && (
                      <div className={`mt-3 pt-3 border-t ${darkMode ? 'border-zinc-700' : 'border-zinc-200'}`}>
                        <p className={`text-xs font-medium mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          Campos modificados:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {acaoSelecionada.dados.camposAlterados.map((campo, idx) => (
                            <span 
                              key={idx}
                              className={`text-xs px-2 py-1 rounded-lg ${darkMode ? 'bg-orange-500/10 text-orange-400' : 'bg-orange-50 text-orange-600'}`}
                            >
                              {campo}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Estruturas (para OS) */}
                    {acaoSelecionada.dados.estruturas && acaoSelecionada.dados.estruturas.length > 0 && (
                      <div className={`mt-3 pt-3 border-t ${darkMode ? 'border-zinc-700' : 'border-zinc-200'}`}>
                        <p className={`text-xs font-medium mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          Estruturas:
                        </p>
                        <div className="space-y-1">
                          {acaoSelecionada.dados.estruturas.map((est, idx) => (
                            <div 
                              key={idx}
                              className={`text-sm flex items-center gap-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}
                            >
                              <span>{est.icon}</span>
                              <span className="font-medium">{est.qtd}x</span>
                              <span>{est.nome}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={`p-4 border-t flex-shrink-0 ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
              <button 
                onClick={() => setAcaoSelecionada(null)}
                className={`w-full px-6 py-2.5 font-medium rounded-xl transition-all
                  ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-900'}`}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}