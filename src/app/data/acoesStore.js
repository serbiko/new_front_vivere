// Store de ações em memória (reseta ao dar F5)
// Este arquivo gerencia o histórico de ações do sistema

let acoes = [];
let listeners = [];

// Tipos de ação
export const TIPO_ACAO = {
  CRIAR_OS: 'criar_os',
  EDITAR_OS: 'editar_os',
  AVANCAR_STATUS: 'avancar_status',
  CRIAR_PESSOA: 'criar_pessoa',
  CRIAR_EMPRESA: 'criar_empresa',
  EDITAR_ESTOQUE: 'editar_estoque',
  CRIAR_MATERIAL: 'criar_material',
  EXCLUIR_MATERIAL: 'excluir_material',
};

// Descrições amigáveis
const descricaoTipoAcao = {
  [TIPO_ACAO.CRIAR_OS]: 'registrou a OS',
  [TIPO_ACAO.EDITAR_OS]: 'editou a OS',
  [TIPO_ACAO.AVANCAR_STATUS]: 'avançou o status da OS',
  [TIPO_ACAO.CRIAR_PESSOA]: 'cadastrou uma pessoa',
  [TIPO_ACAO.CRIAR_EMPRESA]: 'cadastrou uma empresa',
  [TIPO_ACAO.EDITAR_ESTOQUE]: 'atualizou estoque',
  [TIPO_ACAO.CRIAR_MATERIAL]: 'adicionou material',
  [TIPO_ACAO.EXCLUIR_MATERIAL]: 'removeu material',
};

// Usuário simulado (em produção viria do contexto de autenticação)
const getUsuarioAtual = () => 'Colaborador';

// Gerar ID único
const gerarId = () => `ACT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Registrar uma nova ação
export const registrarAcao = (tipo, dados = {}) => {
  const novaAcao = {
    id: gerarId(),
    tipo,
    descricao: descricaoTipoAcao[tipo] || tipo,
    usuario: dados.usuario || getUsuarioAtual(),
    timestamp: new Date().toISOString(),
    dados: { ...dados },
  };

  acoes = [novaAcao, ...acoes];
  
  // Notificar listeners
  listeners.forEach(listener => listener(acoes));
  
  return novaAcao;
};

// Obter todas as ações
export const getAcoes = () => [...acoes];

// Obter ação por ID
export const getAcaoPorId = (id) => acoes.find(a => a.id === id);

// Limpar histórico (para testes)
export const limparHistorico = () => {
  acoes = [];
  listeners.forEach(listener => listener(acoes));
};

// Subscribe para mudanças
export const subscribe = (listener) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
};

// Hook customizado para React
export const useAcoes = (setAcoes) => {
  // Este será chamado pelo componente para se inscrever nas mudanças
  return {
    registrar: registrarAcao,
    obter: getAcoes,
    subscribe,
  };
};