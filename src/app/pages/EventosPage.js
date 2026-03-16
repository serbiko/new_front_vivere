"use client";

import { useState, useMemo } from 'react';
import { 
  Calendar, MapPin, Clock, User, Phone, Building2, Package, 
  ChevronRight, X, CalendarDays, Truck, CheckCircle, 
  AlertTriangle, Search, Eye, ClipboardList, Edit3, Save,
  FileText, PartyPopper, CalendarClock, MessageSquare, Plus, Minus, Trash2,
  ChevronDown, ChevronUp, Lock, ArrowRight
} from 'lucide-react';
import { estruturas, estoqueInicial } from '../data/estruturas';
import { registrarAcao, TIPO_ACAO } from '../data/acoesStore';

// --- STATUS DISPONÍVEIS ---
const STATUS_LIST = [
  { id: 1, key: 'analise', label: 'Análise', color: 'text-purple-500 bg-purple-500/10 border-purple-500/20', icon: ClipboardList },
  { id: 2, key: 'reservado', label: 'Reservado', color: 'text-blue-500 bg-blue-500/10 border-blue-500/20', icon: Clock },
  { id: 3, key: 'alocado', label: 'Alocado', color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20', icon: Package },
  { id: 4, key: 'andamento', label: 'Andamento', color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20', icon: Truck },
  { id: 5, key: 'finalizado', label: 'Finalizado', color: 'text-green-500 bg-green-500/10 border-green-500/20', icon: CheckCircle },
];

const getStatusConfig = (statusId) => STATUS_LIST.find(s => s.id === statusId) || STATUS_LIST[0];

// --- DADOS SIMULADOS DE EVENTOS ---
const eventosMockInicial = [
  {
    id: 'EV-001',
    osId: 'OS-001',
    nome: 'Festival de Inverno 2025',
    tipoEvento: 'grande-evento',
    statusId: 4,
    dataEvento: '2025-07-15',
    horaEvento: '18:00',
    local: 'Parque da Cidade',
    endereco: 'Av. das Nações, 1500 - Centro',
    solicitante: 'Prefeitura Municipal',
    contatoSolicitante: '(11) 98765-4321',
    responsavelEvento: 'Maria Silva',
    responsavelOS: 'Carlos Monteiro',
    contatoOS: '(11) 91234-5678',
    fornecedor: 'Vivere Estruturas',
    dataInicioMontagem: '2025-07-12T08:00',
    dataEntregaMontagem: '2025-07-14T18:00',
    dataDesmontagem: '2025-07-16T08:00',
    observacoes: 'Evento ao ar livre. Prever cobertura extra em caso de chuva.',
    estruturas: [
      { id: 'palco-10x8', nome: 'Palco Grande 10x8m', qtd: 1, icon: '🎭', descricao: 'Palco grande com cobertura', materiais: [
        { nome: 'Praticável 2x1m', qtd: 40 }, { nome: 'Pé de Praticável', qtd: 80 }, { nome: 'Escada 3 degraus', qtd: 2 }, { nome: 'Rodapé', qtd: 36 }, { nome: 'Lona Palco 10x8', qtd: 1 }
      ]},
      { id: 'tenda-10x10', nome: 'Tenda Piramidal 10x10m', qtd: 4, icon: '⛺', descricao: 'Tenda piramidal grande', materiais: [
        { nome: 'Lona Tenda 10x10', qtd: 1 }, { nome: 'Estrutura Tubular', qtd: 1 }, { nome: 'Calha de União', qtd: 3 }, { nome: 'Sapata Metálica', qtd: 4 }
      ]},
    ]
  },
  {
    id: 'EV-002',
    osId: 'OS-002',
    nome: 'Casamento Família Rodrigues',
    tipoEvento: 'evento-privado',
    statusId: 2,
    dataEvento: '2025-08-22',
    horaEvento: '16:00',
    local: 'Chácara Bela Vista',
    endereco: 'Estrada do Campo, km 15 - Zona Rural',
    solicitante: 'Ana Rodrigues',
    contatoSolicitante: '(11) 99876-5432',
    responsavelEvento: 'Ana Rodrigues',
    responsavelOS: 'Pedro Santos',
    contatoOS: '(11) 92345-6789',
    fornecedor: 'Vivere Estruturas',
    dataInicioMontagem: '2025-08-21T06:00',
    dataEntregaMontagem: '2025-08-21T14:00',
    dataDesmontagem: '2025-08-23T08:00',
    observacoes: 'Cerimônia às 16h, festa às 19h. Cliente solicita decoração clean.',
    estruturas: [
      { id: 'tenda-10x10', nome: 'Tenda Piramidal 10x10m', qtd: 2, icon: '⛺', descricao: 'Tenda piramidal grande', materiais: [
        { nome: 'Lona Tenda 10x10', qtd: 1 }, { nome: 'Estrutura Tubular', qtd: 1 }, { nome: 'Calha de União', qtd: 3 }, { nome: 'Sapata Metálica', qtd: 4 }
      ]},
      { id: 'palco-6x4', nome: 'Palco Compacto 6x4m', qtd: 1, icon: '🎭', descricao: 'Palco compacto', materiais: [
        { nome: 'Praticável 2x1m', qtd: 12 }, { nome: 'Pé de Praticável', qtd: 24 }, { nome: 'Escada 2 degraus', qtd: 1 }, { nome: 'Rodapé', qtd: 20 }
      ]},
    ]
  },
  {
    id: 'EV-003',
    osId: 'OS-003',
    nome: 'Feira de Tecnologia TECH+',
    tipoEvento: 'grande-evento',
    statusId: 5,
    dataEvento: '2025-06-05',
    horaEvento: '09:00',
    local: 'Centro de Convenções',
    endereco: 'Rua dos Congressos, 500 - Centro',
    solicitante: 'Instituto de Tecnologia',
    contatoSolicitante: '(11) 3456-7890',
    responsavelEvento: 'Dr. Roberto Tech',
    responsavelOS: 'Ana Ferreira',
    contatoOS: '(11) 93456-7890',
    fornecedor: 'Vivere Estruturas',
    dataInicioMontagem: '2025-06-03T07:00',
    dataEntregaMontagem: '2025-06-04T20:00',
    dataDesmontagem: '2025-06-06T08:00',
    observacoes: 'Evento com 50 expositores. Necessário pontos de energia extras.',
    estruturas: [
      { id: 'galpao-20x40', nome: 'Galpão 20x40m', qtd: 1, icon: '🏭', descricao: 'Galpão grande', materiais: [
        { nome: 'Lona Galpão 20x40', qtd: 1 }, { nome: 'Estrutura Metálica Principal', qtd: 1 }, { nome: 'Fechamento Lateral', qtd: 120 }, { nome: 'Sapata Metálica', qtd: 24 }
      ]},
    ]
  },
  {
    id: 'EV-004',
    osId: 'OS-004',
    nome: 'Show Dia das Mães',
    tipoEvento: 'grande-evento',
    statusId: 1,
    dataEvento: '2025-05-11',
    horaEvento: '20:00',
    local: 'Ginásio Municipal',
    endereco: 'Av. dos Esportes, 200 - Vila Nova',
    solicitante: 'Secretaria de Cultura',
    contatoSolicitante: '(11) 3333-4444',
    responsavelEvento: 'Lucia Menezes',
    responsavelOS: 'João Oliveira',
    contatoOS: '(11) 94567-8901',
    fornecedor: 'Vivere Estruturas',
    dataInicioMontagem: '2025-05-10T06:00',
    dataEntregaMontagem: '2025-05-11T16:00',
    dataDesmontagem: '2025-05-12T08:00',
    observacoes: 'Show com artista nacional. Previsão de 5.000 pessoas.',
    estruturas: [
      { id: 'palco-10x8', nome: 'Palco Grande 10x8m', qtd: 1, icon: '🎭', descricao: 'Palco grande com cobertura', materiais: [
        { nome: 'Praticável 2x1m', qtd: 40 }, { nome: 'Pé de Praticável', qtd: 80 }, { nome: 'Escada 3 degraus', qtd: 2 }, { nome: 'Rodapé', qtd: 36 }, { nome: 'Lona Palco 10x8', qtd: 1 }
      ]},
    ]
  },
  {
    id: 'EV-005',
    osId: 'OS-005',
    nome: 'Formatura Colégio São Paulo',
    tipoEvento: 'evento-privado',
    statusId: 3,
    dataEvento: '2025-12-15',
    horaEvento: '19:00',
    local: 'Salão de Festas Elegance',
    endereco: 'Rua das Festas, 300 - Jardins',
    solicitante: 'Colégio São Paulo',
    contatoSolicitante: '(11) 2222-3333',
    responsavelEvento: 'Profa. Carla Mendes',
    responsavelOS: 'Ricardo Lima',
    contatoOS: '(11) 95678-9012',
    fornecedor: 'Vivere Estruturas',
    dataInicioMontagem: '2025-12-14T14:00',
    dataEntregaMontagem: '2025-12-15T16:00',
    dataDesmontagem: '2025-12-16T10:00',
    observacoes: 'Cerimônia de colação de grau + festa. 200 formandos.',
    estruturas: [
      { id: 'palco-6x4', nome: 'Palco Compacto 6x4m', qtd: 1, icon: '🎭', descricao: 'Palco compacto', materiais: [
        { nome: 'Praticável 2x1m', qtd: 12 }, { nome: 'Pé de Praticável', qtd: 24 }, { nome: 'Escada 2 degraus', qtd: 1 }, { nome: 'Rodapé', qtd: 20 }
      ]},
      { id: 'tenda-8x8', nome: 'Tenda Piramidal 8x8m', qtd: 2, icon: '⛺', descricao: 'Tenda piramidal média', materiais: [
        { nome: 'Lona Tenda 8x8', qtd: 1 }, { nome: 'Estrutura Tubular', qtd: 1 }, { nome: 'Calha de União', qtd: 2 }, { nome: 'Sapata Metálica', qtd: 4 }
      ]},
    ]
  },
  {
    id: 'EV-006',
    osId: 'OS-006',
    nome: 'Copa Regional de Futebol',
    tipoEvento: 'grande-evento',
    statusId: 4,
    dataEvento: '2025-09-20',
    horaEvento: '14:00',
    local: 'Estádio Municipal',
    endereco: 'Av. dos Atletas, 1000 - Esportiva',
    solicitante: 'Federação de Futebol',
    contatoSolicitante: '(11) 4444-5555',
    responsavelEvento: 'Marcos Gol',
    responsavelOS: 'Felipe Costa',
    contatoOS: '(11) 96789-0123',
    fornecedor: 'Vivere Estruturas',
    dataInicioMontagem: '2025-09-18T06:00',
    dataEntregaMontagem: '2025-09-19T18:00',
    dataDesmontagem: '2025-09-21T08:00',
    observacoes: 'Final da copa regional. Expectativa de lotação máxima.',
    estruturas: [
      { id: 'tenda-10x10', nome: 'Tenda Piramidal 10x10m', qtd: 8, icon: '⛺', descricao: 'Tenda piramidal grande', materiais: [
        { nome: 'Lona Tenda 10x10', qtd: 1 }, { nome: 'Estrutura Tubular', qtd: 1 }, { nome: 'Calha de União', qtd: 3 }, { nome: 'Sapata Metálica', qtd: 4 }
      ]},
    ]
  },
];

const tiposEvento = [
  { value: 'grande-evento', label: 'Grande Evento' },
  { value: 'pequeno-evento', label: 'Pequeno Evento' },
  { value: 'evento-privado', label: 'Evento Privado' },
  { value: 'ppd', label: 'PPD' },
  { value: 'projeto', label: 'Projeto' },
];

const tipoConfig = {
  'grande-evento': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  'evento-privado': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  'pequeno-evento': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'ppd': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  'projeto': 'bg-pink-500/10 text-pink-500 border-pink-500/20',
};

// CSS para esconder scrollbar
const scrollbarHideStyle = `
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
`;

export default function EventosPage({ darkMode }) {
  const [eventos, setEventos] = useState(eventosMockInicial);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [eventoEditando, setEventoEditando] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroBusca, setFiltroBusca] = useState('');
  
  // Estados para adicionar estruturas
  const [tipoEstrutura, setTipoEstrutura] = useState('tenda');
  const [subtipoEstrutura, setSubtipoEstrutura] = useState('tenda-10x10');
  const [qtdEstrutura, setQtdEstrutura] = useState(1);
  const [estruturasSecaoAberta, setEstruturasSecaoAberta] = useState(true);

  const eventosFiltrados = eventos
    .filter(ev => {
      const matchStatus = filtroStatus === 'todos' || ev.statusId === parseInt(filtroStatus);
      const matchBusca = ev.nome.toLowerCase().includes(filtroBusca.toLowerCase()) ||
                         ev.local.toLowerCase().includes(filtroBusca.toLowerCase()) ||
                         ev.osId.toLowerCase().includes(filtroBusca.toLowerCase());
      return matchStatus && matchBusca;
    })
    .sort((a, b) => a.statusId - b.statusId); // Ordenar por status (1, 2, 3, 4, 5)

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return '-';
    const date = new Date(dateTimeStr);
    return date.toLocaleString('pt-BR', { 
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const getTotalMateriais = (estrs) => {
    return estrs.reduce((acc, est) => {
      return acc + est.materiais.reduce((a, m) => a + (m.qtd * est.qtd), 0);
    }, 0);
  };

  const getTotalEstruturas = (estrs) => {
    return estrs.reduce((acc, est) => acc + est.qtd, 0);
  };

  const podeEditar = (statusId) => statusId <= 4; // Pode editar até Andamento (4), bloqueado apenas em Finalizado (5)

  const abrirEdicao = (evento) => {
    setEventoEditando({ ...evento, estruturas: evento.estruturas.map(e => ({...e})) });
    setModoEdicao(true);
    setEventoSelecionado(null);
  };

  const salvarEdicao = () => {
    if (!eventoEditando) return;
    
    // Encontrar o evento original para comparar campos alterados
    const eventoOriginal = eventos.find(e => e.id === eventoEditando.id);
    const camposAlterados = [];
    
    if (eventoOriginal) {
      if (eventoOriginal.nome !== eventoEditando.nome) camposAlterados.push('Nome');
      if (eventoOriginal.local !== eventoEditando.local) camposAlterados.push('Local');
      if (eventoOriginal.dataEvento !== eventoEditando.dataEvento) camposAlterados.push('Data');
      if (eventoOriginal.solicitante !== eventoEditando.solicitante) camposAlterados.push('Solicitante');
      if (eventoOriginal.responsavelOS !== eventoEditando.responsavelOS) camposAlterados.push('Responsável OS');
      if (JSON.stringify(eventoOriginal.estruturas) !== JSON.stringify(eventoEditando.estruturas)) camposAlterados.push('Estruturas');
      if (eventoOriginal.observacoes !== eventoEditando.observacoes) camposAlterados.push('Observações');
    }
    
    setEventos(prev => prev.map(ev => ev.id === eventoEditando.id ? eventoEditando : ev));
    
    // Registrar ação no histórico
    registrarAcao(TIPO_ACAO.EDITAR_OS, {
      osId: eventoEditando.osId,
      nomeEvento: eventoEditando.nome,
      camposAlterados,
      estruturas: eventoEditando.estruturas.map(e => ({ icon: e.icon, nome: e.nome, qtd: e.qtd }))
    });
    
    setModoEdicao(false);
    setEventoEditando(null);
  };

  const cancelarEdicao = () => {
    setModoEdicao(false);
    setEventoEditando(null);
  };

  const atualizarCampo = (campo, valor) => {
    setEventoEditando(prev => ({ ...prev, [campo]: valor }));
  };

  const avancarStatus = (eventoId) => {
    const evento = eventos.find(e => e.id === eventoId);
    if (!evento || evento.statusId >= 5) return;
    
    const statusAnterior = getStatusConfig(evento.statusId).label;
    const novoStatusId = evento.statusId + 1;
    const novoStatus = getStatusConfig(novoStatusId).label;
    
    setEventos(prev => prev.map(ev => {
      if (ev.id === eventoId) {
        return { ...ev, statusId: novoStatusId };
      }
      return ev;
    }));
    
    // Atualiza o evento selecionado se estiver aberto
    if (eventoSelecionado?.id === eventoId) {
      setEventoSelecionado(prev => prev ? { ...prev, statusId: novoStatusId } : prev);
    }
    
    // Registrar ação no histórico
    registrarAcao(TIPO_ACAO.AVANCAR_STATUS, {
      osId: evento.osId,
      nomeEvento: evento.nome,
      statusAnterior,
      novoStatus
    });
  };

  // Lógica de estruturas para edição
  const limitesPorEstrutura = useMemo(() => {
    const getDisponivel = (id) => {
      const item = estoqueInicial.find(e => e.id === id);
      return item ? Math.max(0, item.total - item.emUso) : 0;
    };
    return {
      'tenda-10x10': getDisponivel(15),
      'tenda-8x8': getDisponivel(16),
      'tenda-6x6': getDisponivel(17),
      'tenda-4x4': getDisponivel(18),
      'galpao-20x40': getDisponivel(19),
      'galpao-10x20': getDisponivel(20),
      'palco-10x8': getDisponivel(23),
      'palco-6x4': Math.floor(getDisponivel(1) / 12)
    };
  }, []);

  const maxDisponivel = useMemo(() => {
    if (!subtipoEstrutura || !eventoEditando) return 1;
    const limiteBase = limitesPorEstrutura[subtipoEstrutura] || 10;
    const jaAdicionadas = eventoEditando.estruturas
      .filter(e => e.id === subtipoEstrutura)
      .reduce((acc, curr) => acc + curr.qtd, 0);
    return Math.max(0, limiteBase - jaAdicionadas);
  }, [subtipoEstrutura, eventoEditando, limitesPorEstrutura]);

  const handleTipoChange = (e) => {
    const novoTipo = e.target.value;
    setTipoEstrutura(novoTipo);
    if (estruturas[novoTipo]?.tipos?.length > 0) {
      setSubtipoEstrutura(estruturas[novoTipo].tipos[0].id);
    }
    setQtdEstrutura(1);
  };

  const adicionarEstrutura = () => {
    if (!subtipoEstrutura || maxDisponivel === 0 || qtdEstrutura === 0 || !eventoEditando) return;
    const tipo = estruturas[tipoEstrutura];
    const subtipo = tipo?.tipos.find(t => t.id === subtipoEstrutura);
    
    if (subtipo) {
      const novasEstruturas = [...eventoEditando.estruturas];
      const index = novasEstruturas.findIndex(e => e.id === subtipo.id);
      if (index >= 0) {
        novasEstruturas[index] = { ...novasEstruturas[index], qtd: novasEstruturas[index].qtd + qtdEstrutura };
      } else {
        novasEstruturas.push({ ...subtipo, icon: tipo.icon, qtd: qtdEstrutura });
      }
      setEventoEditando(prev => ({ ...prev, estruturas: novasEstruturas }));
      setQtdEstrutura(1);
    }
  };

  const removerEstrutura = (id) => {
    if (!eventoEditando) return;
    setEventoEditando(prev => ({
      ...prev,
      estruturas: prev.estruturas.filter(e => e.id !== id)
    }));
  };

  const inputClass = `w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-orange-500/50 transition-colors
    ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600' : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'}`;

  const InputField = ({ label, name, type = 'text', placeholder, icon: Icon, required = false, colSpan = 1, value, onChange }) => (
    <div className={colSpan === 2 ? 'md:col-span-2' : ''}>
      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      <div className="relative">
        {Icon && <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />}
        <input 
          type={type} 
          name={name} 
          value={value} 
          onChange={(e) => onChange(name, e.target.value)} 
          placeholder={placeholder} 
          required={required}
          className={`${inputClass} ${Icon ? 'pl-12' : ''}`} 
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Injetar CSS para esconder scrollbar */}
      <style>{scrollbarHideStyle}</style>
      
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30 flex-shrink-0">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </div>
            <div>
              <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Eventos</h2>
              <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Gerencie todos os eventos cadastrados</p>
            </div>
          </div>
          
          <div className={`px-3 sm:px-4 py-2 rounded-xl border self-start sm:self-auto ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
            <span className={`text-xs sm:text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Total: </span>
            <span className={`font-bold text-sm sm:text-base ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{eventos.length} eventos</span>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
            <input 
              type="text" 
              value={filtroBusca} 
              onChange={(e) => setFiltroBusca(e.target.value)} 
              placeholder="Buscar por nome, local ou OS..."
              className={`${inputClass} pl-10 sm:pl-12 text-sm sm:text-base`} 
            />
          </div>
          <select 
            value={filtroStatus} 
            onChange={(e) => setFiltroStatus(e.target.value)} 
            className={`${inputClass} sm:w-48 text-sm sm:text-base`}
          >
            <option value="todos">Todos os Status</option>
            {STATUS_LIST.map(s => (
              <option key={s.id} value={s.id}>{s.id}. {s.label}</option>
            ))}
          </select>
        </div>

        {/* Cards de Eventos */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {eventosFiltrados.map((evento) => {
            const statusConfig = getStatusConfig(evento.statusId);
            const StatusIcon = statusConfig.icon;
            const tipoLabel = tiposEvento.find(t => t.value === evento.tipoEvento)?.label || evento.tipoEvento;
            
            return (
              <div 
                key={evento.id}
                onClick={() => setEventoSelecionado(evento)}
                className={`rounded-2xl border p-5 cursor-pointer transition-all duration-300 group hover:scale-[1.02] hover:shadow-xl
                  ${darkMode 
                    ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 hover:border-orange-500/50 hover:shadow-orange-500/10' 
                    : 'bg-white border-zinc-200 hover:border-orange-400 hover:shadow-orange-100'}`}
              >
                {/* Header do Card */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${darkMode ? 'bg-zinc-800 text-orange-500' : 'bg-orange-50 text-orange-600'}`}>
                        {evento.osId}
                      </span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded border ${tipoConfig[evento.tipoEvento] || tipoConfig['grande-evento']}`}>
                        {tipoLabel}
                      </span>
                    </div>
                    <h3 className={`font-bold text-lg leading-tight mb-1 group-hover:text-orange-500 transition-colors ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                      {evento.nome}
                    </h3>
                  </div>
                  <div className={`p-2 rounded-xl transition-all group-hover:bg-orange-500 group-hover:text-black ${darkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-500'}`}>
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                {/* Info do Evento */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays className={`w-4 h-4 flex-shrink-0 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                    <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {formatDate(evento.dataEvento)} às {evento.horaEvento}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-4 h-4 flex-shrink-0 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                    <span className={`text-sm truncate ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{evento.local}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className={`w-4 h-4 flex-shrink-0 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                    <span className={`text-sm truncate ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{evento.solicitante}</span>
                  </div>
                </div>

                {/* Resumo de Estruturas */}
                <div className={`flex items-center gap-4 p-3 rounded-xl mb-4 ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-orange-500" />
                    <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                      {getTotalEstruturas(evento.estruturas)} estruturas
                    </span>
                  </div>
                  <div className={`w-px h-4 ${darkMode ? 'bg-zinc-700' : 'bg-zinc-300'}`} />
                  <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    {getTotalMateriais(evento.estruturas)} itens
                  </span>
                </div>

                {/* Footer - Status */}
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${statusConfig.color}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold">{statusConfig.id}. {statusConfig.label}</span>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${darkMode ? 'text-zinc-600' : 'text-zinc-400'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {eventosFiltrados.length === 0 && (
          <div className={`rounded-2xl border-2 border-dashed p-12 text-center ${darkMode ? 'border-zinc-800' : 'border-zinc-300'}`}>
            <Calendar className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-zinc-700' : 'text-zinc-400'}`} />
            <p className={`text-lg font-medium mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Nenhum evento encontrado</p>
            <p className={darkMode ? 'text-zinc-600' : 'text-zinc-400'}>Tente ajustar os filtros de busca</p>
          </div>
        )}

        {/* Modal de Detalhes */}
        {eventoSelecionado && !modoEdicao && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
            <div 
              className={`rounded-t-2xl sm:rounded-2xl border-t sm:border w-full sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col
                ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}
            >
              {/* Header do Modal */}
              <div className={`p-4 sm:p-6 border-b flex-shrink-0 ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-xs sm:text-sm font-mono font-bold px-2 py-1 rounded ${darkMode ? 'bg-zinc-800 text-orange-500' : 'bg-orange-50 text-orange-600'}`}>
                        {eventoSelecionado.osId}
                      </span>
                      <span className={`text-xs sm:text-sm font-medium px-2 py-1 rounded border ${tipoConfig[eventoSelecionado.tipoEvento]}`}>
                        {tiposEvento.find(t => t.value === eventoSelecionado.tipoEvento)?.label}
                      </span>
                    </div>
                    <h2 className={`text-lg sm:text-2xl font-bold truncate ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                      {eventoSelecionado.nome}
                    </h2>
                  </div>
                  <button 
                    onClick={() => setEventoSelecionado(null)}
                    className={`p-2 rounded-xl transition-colors flex-shrink-0 active:scale-95 touch-manipulation ${darkMode ? 'text-zinc-500 hover:text-white hover:bg-zinc-800' : 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100'}`}
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                {/* Controle de Status - APENAS AVANÇAR */}
                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs sm:text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Status:</span>
                    <div className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border text-sm font-medium ${getStatusConfig(eventoSelecionado.statusId).color}`}>
                      {(() => { const Icon = getStatusConfig(eventoSelecionado.statusId).icon; return <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />; })()}
                      <span className="text-xs sm:text-sm">{eventoSelecionado.statusId}. {getStatusConfig(eventoSelecionado.statusId).label}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 sm:ml-auto">
                    {eventoSelecionado.statusId < 5 && (
                      <button
                        onClick={() => avancarStatus(eventoSelecionado.id)}
                        className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-green-500/30 touch-manipulation text-xs sm:text-sm"
                      >
                        <span>Avançar para {getStatusConfig(eventoSelecionado.statusId + 1).label}</span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    )}

                    {/* Botão Editar */}
                    {podeEditar(eventoSelecionado.statusId) ? (
                      <button
                        onClick={() => abrirEdicao(eventoSelecionado)}
                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-xl hover:scale-105 active:scale-95 transition-all touch-manipulation text-xs sm:text-sm"
                      >
                        <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Editar
                      </button>
                    ) : (
                      <div className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm ${darkMode ? 'bg-zinc-800 text-zinc-500' : 'bg-zinc-100 text-zinc-400'}`}>
                        <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Bloqueado
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Conteúdo Scrollável - SEM SCROLLBAR VISÍVEL */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 scrollbar-hide">
                {/* Grid de Informações */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Dados do Evento */}
                  <div className={`rounded-xl border p-5 ${darkMode ? 'bg-zinc-800/30 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                    <h3 className={`font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                      <Calendar className="w-5 h-5 text-orange-500" />
                      Dados do Evento
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CalendarDays className={`w-4 h-4 mt-0.5 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                        <div>
                          <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Data e Hora</p>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{formatDate(eventoSelecionado.dataEvento)} às {eventoSelecionado.horaEvento}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className={`w-4 h-4 mt-0.5 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                        <div>
                          <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Local</p>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{eventoSelecionado.local}</p>
                          <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{eventoSelecionado.endereco}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Building2 className={`w-4 h-4 mt-0.5 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                        <div>
                          <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Solicitante</p>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{eventoSelecionado.solicitante}</p>
                          <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{eventoSelecionado.contatoSolicitante}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <User className={`w-4 h-4 mt-0.5 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                        <div>
                          <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Responsável do Evento</p>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{eventoSelecionado.responsavelEvento}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dados da OS */}
                  <div className={`rounded-xl border p-5 ${darkMode ? 'bg-zinc-800/30 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                    <h3 className={`font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                      <Truck className="w-5 h-5 text-orange-500" />
                      Montagem / Desmontagem
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CalendarClock className={`w-4 h-4 mt-0.5 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                        <div>
                          <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Início Montagem</p>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{formatDateTime(eventoSelecionado.dataInicioMontagem)}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className={`w-4 h-4 mt-0.5 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                        <div>
                          <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Entrega Montagem</p>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{formatDateTime(eventoSelecionado.dataEntregaMontagem)}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Truck className={`w-4 h-4 mt-0.5 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                        <div>
                          <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Desmontagem</p>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{formatDateTime(eventoSelecionado.dataDesmontagem)}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <User className={`w-4 h-4 mt-0.5 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                        <div>
                          <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Responsável OS</p>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{eventoSelecionado.responsavelOS}</p>
                          <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{eventoSelecionado.contatoOS}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Observações */}
                {eventoSelecionado.observacoes && (
                  <div className={`rounded-xl border p-4 ${darkMode ? 'bg-orange-500/5 border-orange-500/20' : 'bg-orange-50 border-orange-200'}`}>
                    <p className={`text-sm flex items-start gap-2 ${darkMode ? 'text-orange-400' : 'text-orange-700'}`}>
                      <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span><strong>Observações:</strong> {eventoSelecionado.observacoes}</span>
                    </p>
                  </div>
                )}

                {/* Estruturas e Materiais */}
                <div>
                  <h3 className={`font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                    <Package className="w-5 h-5 text-orange-500" />
                    Estruturas e Materiais
                    <span className={`ml-2 text-sm font-normal px-2 py-0.5 rounded-full ${darkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-500'}`}>
                      {getTotalEstruturas(eventoSelecionado.estruturas)} estruturas • {getTotalMateriais(eventoSelecionado.estruturas)} itens
                    </span>
                  </h3>

                  <div className="space-y-4">
                    {eventoSelecionado.estruturas.map((estrutura, idx) => (
                      <div 
                        key={idx} 
                        className={`rounded-xl border overflow-hidden ${darkMode ? 'bg-zinc-800/30 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}
                      >
                        <div className={`p-4 border-b flex items-center justify-between ${darkMode ? 'border-zinc-700' : 'border-zinc-200'}`}>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{estrutura.icon}</span>
                            <div>
                              <h4 className={`font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                                <span className="px-2 py-0.5 rounded-md bg-orange-500 text-black font-black text-sm">{estrutura.qtd}x</span>
                                {estrutura.nome}
                              </h4>
                            </div>
                          </div>
                          <span className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                            {estrutura.materiais.reduce((a, m) => a + (m.qtd * estrutura.qtd), 0)} itens
                          </span>
                        </div>
                        <div className={`p-4 ${darkMode ? 'bg-zinc-900/50' : 'bg-white'}`}>
                          <p className="text-orange-500 text-xs font-medium mb-3 uppercase tracking-wide">
                            Materiais ({estrutura.qtd} unidade{estrutura.qtd > 1 ? 's' : ''})
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {estrutura.materiais.map((mat, midx) => (
                              <div 
                                key={midx} 
                                className={`flex items-center justify-between p-2 rounded-lg ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}
                              >
                                <span className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>{mat.nome}</span>
                                <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                                  {mat.qtd * estrutura.qtd}x
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer do Modal */}
              <div className={`p-4 border-t flex-shrink-0 ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-4 text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    <span>ID: {eventoSelecionado.id}</span>
                    <span>•</span>
                    <span>OS: {eventoSelecionado.osId}</span>
                  </div>
                  <button 
                    onClick={() => setEventoSelecionado(null)}
                    className={`px-6 py-2.5 font-medium rounded-xl transition-all
                      ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-900'}`}
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Edição */}
        {modoEdicao && eventoEditando && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div 
              className={`rounded-2xl border w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col
                ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}
            >
              {/* Header */}
              <div className={`p-6 border-b flex-shrink-0 ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                      <Edit3 className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                        Editar OS - {eventoEditando.osId}
                      </h2>
                      <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{eventoEditando.nome}</p>
                    </div>
                  </div>
                  <button 
                    onClick={cancelarEdicao}
                    className={`p-2 rounded-xl transition-colors ${darkMode ? 'text-zinc-500 hover:text-white hover:bg-zinc-800' : 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100'}`}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Conteúdo - SEM SCROLLBAR VISÍVEL */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                {/* Identificação */}
                <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
                  <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                    <FileText className="w-5 h-5 text-orange-500" />Identificação
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Nº OS" name="osId" value={eventoEditando.osId} onChange={atualizarCampo} icon={ClipboardList} required />
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        Tipo de Evento <span className="text-orange-500">*</span>
                      </label>
                      <select value={eventoEditando.tipoEvento} onChange={(e) => atualizarCampo('tipoEvento', e.target.value)} className={inputClass}>
                        {tiposEvento.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                    </div>
                    <InputField label="Nome do Evento" name="nome" value={eventoEditando.nome} onChange={atualizarCampo} icon={PartyPopper} required colSpan={2} />
                    <InputField label="Fornecedor" name="fornecedor" value={eventoEditando.fornecedor} onChange={atualizarCampo} icon={Building2} />
                  </div>
                </div>

                {/* Dados do Evento */}
                <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
                  <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                    <CalendarDays className="w-5 h-5 text-orange-500" />Dados do Evento
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Solicitante" name="solicitante" value={eventoEditando.solicitante} onChange={atualizarCampo} icon={Building2} required />
                    <InputField label="Contato Solicitante" name="contatoSolicitante" value={eventoEditando.contatoSolicitante} onChange={atualizarCampo} icon={Phone} />
                    <InputField label="Data do Evento" name="dataEvento" type="date" value={eventoEditando.dataEvento} onChange={atualizarCampo} icon={Calendar} required />
                    <InputField label="Horário" name="horaEvento" type="time" value={eventoEditando.horaEvento} onChange={atualizarCampo} icon={Clock} />
                    <InputField label="Local" name="local" value={eventoEditando.local} onChange={atualizarCampo} icon={MapPin} required />
                    <InputField label="Responsável do Evento" name="responsavelEvento" value={eventoEditando.responsavelEvento} onChange={atualizarCampo} icon={User} />
                    <InputField label="Endereço Completo" name="endereco" value={eventoEditando.endereco} onChange={atualizarCampo} icon={MapPin} colSpan={2} />
                  </div>
                </div>

                {/* Montagem */}
                <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
                  <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                    <Truck className="w-5 h-5 text-orange-500" />Montagem / Desmontagem
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Início Montagem" name="dataInicioMontagem" type="datetime-local" value={eventoEditando.dataInicioMontagem} onChange={atualizarCampo} icon={CalendarClock} required />
                    <InputField label="Responsável OS" name="responsavelOS" value={eventoEditando.responsavelOS} onChange={atualizarCampo} icon={User} required />
                    <InputField label="Entrega Montagem" name="dataEntregaMontagem" type="datetime-local" value={eventoEditando.dataEntregaMontagem} onChange={atualizarCampo} icon={CalendarClock} required />
                    <InputField label="Contato OS" name="contatoOS" value={eventoEditando.contatoOS} onChange={atualizarCampo} icon={Phone} />
                    <InputField label="Desmontagem" name="dataDesmontagem" type="datetime-local" value={eventoEditando.dataDesmontagem} onChange={atualizarCampo} icon={CalendarClock} required colSpan={2} />
                  </div>
                </div>

                {/* Estruturas */}
                <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
                  <button 
                    type="button"
                    onClick={() => setEstruturasSecaoAberta(!estruturasSecaoAberta)}
                    className={`w-full text-lg font-semibold mb-4 flex items-center justify-between ${darkMode ? 'text-white' : 'text-zinc-900'}`}
                  >
                    <span className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-orange-500" />
                      Estruturas do Evento
                      <span className={`text-sm font-normal px-2 py-0.5 rounded-full ${darkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-500'}`}>
                        {getTotalEstruturas(eventoEditando.estruturas)} estruturas
                      </span>
                    </span>
                    {estruturasSecaoAberta ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>

                  {estruturasSecaoAberta && (
                    <>
                      {/* Adicionar Estrutura */}
                      <div className="flex flex-col xl:flex-row gap-3 mb-6 items-start">
                        <div className="flex-1 w-full">
                          <select value={tipoEstrutura} onChange={handleTipoChange} className={`${inputClass} h-[52px]`}>
                            {Object.entries(estruturas).map(([key, val]) => <option key={key} value={key}>{val.icon} {val.nome}</option>)}
                          </select>
                        </div>
                        <div className="flex-1 w-full">
                          <select value={subtipoEstrutura} onChange={(e) => { setSubtipoEstrutura(e.target.value); setQtdEstrutura(1); }} className={`${inputClass} h-[52px]`}>
                            {estruturas[tipoEstrutura]?.tipos.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
                          </select>
                        </div>
                        <div className="flex items-center gap-2 w-full xl:w-auto">
                          <div className={`flex items-center justify-between border rounded-xl px-1 h-[52px] w-full xl:w-36 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-300'}`}>
                            <button type="button" onClick={() => setQtdEstrutura(Math.max(1, qtdEstrutura - 1))} disabled={qtdEstrutura <= 1} 
                              className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-zinc-400 hover:bg-zinc-800' : 'text-zinc-600 hover:bg-zinc-100'} disabled:opacity-30`}>
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className={`font-semibold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{qtdEstrutura}</span>
                            <button type="button" onClick={() => setQtdEstrutura(Math.min(maxDisponivel, qtdEstrutura + 1))} disabled={qtdEstrutura >= maxDisponivel || maxDisponivel === 0}
                              className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-zinc-400 hover:bg-zinc-800' : 'text-zinc-600 hover:bg-zinc-100'} disabled:opacity-30`}>
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button type="button" onClick={adicionarEstrutura} disabled={maxDisponivel === 0}
                            className={`px-6 h-[52px] bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-xl flex items-center gap-2 transition-all ${maxDisponivel === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <Plus className="w-5 h-5" /> Adicionar
                          </button>
                        </div>
                      </div>

                      {/* Lista de Estruturas */}
                      {eventoEditando.estruturas.length === 0 ? (
                        <div className={`p-8 border-2 border-dashed rounded-xl text-center ${darkMode ? 'border-zinc-800' : 'border-zinc-300'}`}>
                          <Package className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-zinc-700' : 'text-zinc-400'}`} />
                          <p className={darkMode ? 'text-zinc-500' : 'text-zinc-500'}>Nenhuma estrutura adicionada</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {eventoEditando.estruturas.map((est) => (
                            <div key={est.id} className={`rounded-xl border overflow-hidden ${darkMode ? 'bg-zinc-800/50 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>
                              <div className={`p-4 flex items-center justify-between ${darkMode ? 'border-zinc-700' : 'border-zinc-200'}`}>
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">{est.icon}</span>
                                  <div>
                                    <h4 className={`font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                                      <span className="px-2 py-0.5 rounded-md bg-orange-500 text-black font-black text-sm">{est.qtd}x</span>
                                      {est.nome}
                                    </h4>
                                    <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{est.descricao}</p>
                                  </div>
                                </div>
                                <button type="button" onClick={() => removerEstrutura(est.id)} 
                                  className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-zinc-500 hover:text-red-400 hover:bg-red-400/10' : 'text-zinc-400 hover:text-red-500 hover:bg-red-50'}`}>
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Observações */}
                <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
                  <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                    <MessageSquare className="w-5 h-5 text-orange-500" />Observações
                  </h3>
                  <textarea 
                    name="observacoes" 
                    value={eventoEditando.observacoes} 
                    onChange={(e) => atualizarCampo('observacoes', e.target.value)} 
                    placeholder="Informações adicionais..."
                    rows={4}
                    className={`${inputClass} resize-none`} 
                  />
                </div>
              </div>

              {/* Footer */}
              <div className={`p-4 border-t flex-shrink-0 ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <div className="flex items-center justify-end gap-4">
                  <button onClick={cancelarEdicao} className={`px-6 py-3 font-medium rounded-xl transition-all
                    ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-900'}`}>
                    Cancelar
                  </button>
                  <button onClick={salvarEdicao} className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-bold rounded-xl shadow-lg shadow-orange-500/30 flex items-center gap-2 transition-all">
                    <Save className="w-5 h-5" /> Salvar Alterações
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}