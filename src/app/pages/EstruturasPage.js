"use client";

import { useState } from 'react';
import { 
  Wrench, Search, X, ChevronRight, Package, AlertTriangle,
  CheckCircle, Users, Clock, Ruler, Weight, FileText, ListChecks,
  ArrowRight, Info, Shield, HardHat, Hammer, Layers
} from 'lucide-react';

// Dados dos gabaritos de estruturas
const estruturasGabaritos = [
  {
    id: 'tenda-10x10',
    nome: 'Tenda Piramidal 10x10m',
    categoria: 'Tendas',
    icon: '⛺',
    dimensoes: '10m x 10m x 4.5m (altura)',
    pesoAprox: '450kg',
    capacidade: '~100 pessoas',
    tempoMontagem: '2-3 horas',
    equipeMinimaI: '4 pessoas',
    imagem: null,
    materiais: [
      { nome: 'Lona Tenda 10x10', qtd: 1, essencial: true },
      { nome: 'Estrutura Tubular Central', qtd: 1, essencial: true },
      { nome: 'Mastro Central', qtd: 1, essencial: true },
      { nome: 'Pernas Laterais', qtd: 4, essencial: true },
      { nome: 'Calha de União', qtd: 4, essencial: false },
      { nome: 'Sapata Metálica', qtd: 4, essencial: true },
      { nome: 'Estacas de Fixação', qtd: 8, essencial: true },
      { nome: 'Cordas de Amarração', qtd: 8, essencial: false },
    ],
    ferramentas: ['Marreta', 'Chave de Boca 17mm', 'Escada 3m', 'Talha Manual'],
    passos: [
      { titulo: 'Preparação do Terreno', descricao: 'Verificar se o terreno está nivelado e livre de obstáculos. Marcar os 4 pontos de apoio formando um quadrado de 10x10m.' },
      { titulo: 'Posicionar Sapatas', descricao: 'Instalar as 4 sapatas metálicas nos pontos marcados, garantindo que estejam niveladas e firmes.' },
      { titulo: 'Montar Estrutura Base', descricao: 'Conectar as pernas laterais às sapatas. Verificar o travamento de todas as conexões.' },
      { titulo: 'Erguer Mastro Central', descricao: 'Com a equipe posicionada, erguer o mastro central e conectar às estruturas laterais.' },
      { titulo: 'Instalar Lona', descricao: 'Desenrolar a lona sobre a estrutura, puxando pelos 4 cantos. Fixar nas pontas das pernas.' },
      { titulo: 'Tensionamento', descricao: 'Ajustar a tensão da lona utilizando as cordas de amarração e estacas de fixação.' },
      { titulo: 'Verificação Final', descricao: 'Inspecionar todas as conexões, verificar estabilidade e fazer ajustes finais de tensão.' },
    ],
    avisos: [
      'Não montar em condições de vento forte (acima de 40km/h)',
      'Verificar previsão do tempo antes de iniciar',
      'Usar EPIs obrigatórios: capacete, luvas e botina',
      'Manter área livre de pessoas durante a montagem',
    ],
  },
  {
    id: 'tenda-8x8',
    nome: 'Tenda Piramidal 8x8m',
    categoria: 'Tendas',
    icon: '⛺',
    dimensoes: '8m x 8m x 4m (altura)',
    pesoAprox: '320kg',
    capacidade: '~60 pessoas',
    tempoMontagem: '1.5-2 horas',
    equipeMinimaI: '3 pessoas',
    materiais: [
      { nome: 'Lona Tenda 8x8', qtd: 1, essencial: true },
      { nome: 'Estrutura Tubular Central', qtd: 1, essencial: true },
      { nome: 'Mastro Central', qtd: 1, essencial: true },
      { nome: 'Pernas Laterais', qtd: 4, essencial: true },
      { nome: 'Calha de União', qtd: 3, essencial: false },
      { nome: 'Sapata Metálica', qtd: 4, essencial: true },
      { nome: 'Estacas de Fixação', qtd: 8, essencial: true },
    ],
    ferramentas: ['Marreta', 'Chave de Boca 17mm', 'Escada 2.5m'],
    passos: [
      { titulo: 'Preparação', descricao: 'Nivelar terreno e marcar quadrado de 8x8m nos pontos de apoio.' },
      { titulo: 'Base', descricao: 'Posicionar sapatas e conectar pernas laterais.' },
      { titulo: 'Estrutura', descricao: 'Erguer mastro central com auxílio da equipe.' },
      { titulo: 'Cobertura', descricao: 'Instalar lona e fixar nos 4 cantos.' },
      { titulo: 'Acabamento', descricao: 'Tensionar lona e verificar estabilidade.' },
    ],
    avisos: [
      'Não montar em condições de vento forte',
      'EPIs obrigatórios durante toda montagem',
    ],
  },
  {
    id: 'tenda-6x6',
    nome: 'Tenda Piramidal 6x6m',
    categoria: 'Tendas',
    icon: '⛺',
    dimensoes: '6m x 6m x 3.5m (altura)',
    pesoAprox: '200kg',
    capacidade: '~35 pessoas',
    tempoMontagem: '1-1.5 horas',
    equipeMinimaI: '2 pessoas',
    materiais: [
      { nome: 'Lona Tenda 6x6', qtd: 1, essencial: true },
      { nome: 'Estrutura Tubular', qtd: 1, essencial: true },
      { nome: 'Pernas Laterais', qtd: 4, essencial: true },
      { nome: 'Sapata Metálica', qtd: 4, essencial: true },
      { nome: 'Estacas de Fixação', qtd: 6, essencial: true },
    ],
    ferramentas: ['Marreta', 'Chave de Boca 17mm'],
    passos: [
      { titulo: 'Preparação', descricao: 'Marcar área de 6x6m e nivelar terreno.' },
      { titulo: 'Montagem Base', descricao: 'Instalar sapatas e conectar estrutura.' },
      { titulo: 'Instalação Lona', descricao: 'Cobrir estrutura e fixar nos pontos.' },
      { titulo: 'Finalização', descricao: 'Tensionar e verificar.' },
    ],
    avisos: ['Verificar condições climáticas antes de iniciar'],
  },
  {
    id: 'tenda-4x4',
    nome: 'Tenda Piramidal 4x4m',
    categoria: 'Tendas',
    icon: '⛺',
    dimensoes: '4m x 4m x 3m (altura)',
    pesoAprox: '120kg',
    capacidade: '~15 pessoas',
    tempoMontagem: '45 min - 1 hora',
    equipeMinimaI: '2 pessoas',
    materiais: [
      { nome: 'Lona Tenda 4x4', qtd: 1, essencial: true },
      { nome: 'Estrutura Tubular', qtd: 1, essencial: true },
      { nome: 'Pernas Laterais', qtd: 4, essencial: true },
      { nome: 'Sapata Metálica', qtd: 4, essencial: true },
    ],
    ferramentas: ['Marreta', 'Chave de Boca 17mm'],
    passos: [
      { titulo: 'Montagem Rápida', descricao: 'Estrutura compacta permite montagem simplificada. Posicionar sapatas, erguer estrutura e cobrir.' },
    ],
    avisos: ['Ideal para locais com espaço limitado'],
  },
  {
    id: 'palco-10x8',
    nome: 'Palco Grande 10x8m',
    categoria: 'Palcos',
    icon: '🎭',
    dimensoes: '10m x 8m x 1.2m (altura piso)',
    pesoAprox: '2.500kg',
    capacidade: 'Suporta até 500kg/m²',
    tempoMontagem: '4-6 horas',
    equipeMinimaI: '6 pessoas',
    materiais: [
      { nome: 'Praticável 2x1m', qtd: 40, essencial: true },
      { nome: 'Pé de Praticável Regulável', qtd: 80, essencial: true },
      { nome: 'Escada 3 degraus', qtd: 2, essencial: true },
      { nome: 'Rodapé Frontal', qtd: 20, essencial: true },
      { nome: 'Rodapé Lateral', qtd: 16, essencial: true },
      { nome: 'Lona Palco 10x8', qtd: 1, essencial: false },
      { nome: 'Conectores de União', qtd: 36, essencial: true },
      { nome: 'Travessas de Reforço', qtd: 12, essencial: true },
    ],
    ferramentas: ['Chave Allen 6mm', 'Chave de Boca 13mm', 'Nível de Bolha', 'Trena 10m'],
    passos: [
      { titulo: 'Demarcação', descricao: 'Marcar retângulo de 10x8m no local. Verificar nivelamento do terreno com nível de bolha.' },
      { titulo: 'Primeira Fileira', descricao: 'Montar a primeira fileira de praticáveis (5 módulos de 2x1m). Instalar pés reguláveis e nivelar.' },
      { titulo: 'Fileiras Seguintes', descricao: 'Continuar montando as fileiras subsequentes, conectando os módulos com os conectores de união.' },
      { titulo: 'Travamento', descricao: 'Instalar travessas de reforço embaixo da estrutura para garantir rigidez.' },
      { titulo: 'Nivelamento Final', descricao: 'Ajustar altura de todos os pés para garantir superfície perfeitamente nivelada.' },
      { titulo: 'Escadas', descricao: 'Posicionar escadas de acesso nos pontos designados, fixando com parafusos.' },
      { titulo: 'Rodapés', descricao: 'Instalar rodapés em todo o perímetro do palco para acabamento e segurança.' },
      { titulo: 'Cobertura (opcional)', descricao: 'Se houver cobertura, instalar estrutura de sustentação e lona.' },
    ],
    avisos: [
      'Verificar capacidade de carga antes de uso',
      'Não exceder 500kg/m² de carga distribuída',
      'Garantir travamento de todas as conexões',
      'Testar estabilidade antes de liberar para uso',
      'Manter extintores próximos durante eventos',
    ],
  },
  {
    id: 'palco-6x4',
    nome: 'Palco Compacto 6x4m',
    categoria: 'Palcos',
    icon: '🎭',
    dimensoes: '6m x 4m x 0.8m (altura piso)',
    pesoAprox: '800kg',
    capacidade: 'Suporta até 400kg/m²',
    tempoMontagem: '2-3 horas',
    equipeMinimaI: '4 pessoas',
    materiais: [
      { nome: 'Praticável 2x1m', qtd: 12, essencial: true },
      { nome: 'Pé de Praticável Regulável', qtd: 24, essencial: true },
      { nome: 'Escada 2 degraus', qtd: 1, essencial: true },
      { nome: 'Rodapé', qtd: 20, essencial: true },
      { nome: 'Conectores de União', qtd: 10, essencial: true },
    ],
    ferramentas: ['Chave Allen 6mm', 'Chave de Boca 13mm', 'Nível', 'Trena'],
    passos: [
      { titulo: 'Preparação', descricao: 'Demarcar área 6x4m e verificar nivelamento.' },
      { titulo: 'Montagem', descricao: 'Montar 6 módulos na primeira fileira, depois a segunda.' },
      { titulo: 'Conexão', descricao: 'Conectar todos os módulos e instalar pés.' },
      { titulo: 'Acabamento', descricao: 'Nivelar, instalar escada e rodapés.' },
    ],
    avisos: ['Verificar travamento antes do uso', 'Limite de 400kg/m²'],
  },
  {
    id: 'galpao-20x40',
    nome: 'Galpão 20x40m',
    categoria: 'Galpões',
    icon: '🏭',
    dimensoes: '20m x 40m x 6m (altura cumeeira)',
    pesoAprox: '8.000kg',
    capacidade: '~800 pessoas / eventos de grande porte',
    tempoMontagem: '2-3 dias',
    equipeMinimaI: '10 pessoas',
    materiais: [
      { nome: 'Lona Galpão 20x40', qtd: 1, essencial: true },
      { nome: 'Estrutura Metálica Principal', qtd: 1, essencial: true },
      { nome: 'Tesouras Metálicas', qtd: 10, essencial: true },
      { nome: 'Colunas Laterais', qtd: 22, essencial: true },
      { nome: 'Fechamento Lateral', qtd: 120, essencial: false },
      { nome: 'Sapata Metálica Grande', qtd: 24, essencial: true },
      { nome: 'Ancoragem Subterrânea', qtd: 24, essencial: true },
      { nome: 'Calhas de Água', qtd: 8, essencial: false },
    ],
    ferramentas: ['Guincho/Munck', 'Escada 6m', 'Chaves diversas', 'Furadeira de Impacto', 'Talhas', 'Andaimes'],
    passos: [
      { titulo: 'Fundação', descricao: 'Realizar ancoragens subterrâneas nos 24 pontos de apoio. Curar concreto por 24h.' },
      { titulo: 'Colunas', descricao: 'Erguer colunas laterais com auxílio de guincho. Fixar nas ancoragens.' },
      { titulo: 'Tesouras', descricao: 'Instalar tesouras metálicas conectando os lados. Usar guincho para elevação.' },
      { titulo: 'Estrutura Superior', descricao: 'Montar estrutura de sustentação da lona sobre as tesouras.' },
      { titulo: 'Lona', descricao: 'Desenrolar e fixar lona principal. Trabalho em altura requer EPIs específicos.' },
      { titulo: 'Fechamentos', descricao: 'Instalar fechamentos laterais conforme necessidade do evento.' },
      { titulo: 'Acabamentos', descricao: 'Instalar calhas, verificar escoamento de água, ajustes finais.' },
    ],
    avisos: [
      'OBRIGATÓRIO: Projeto estrutural assinado por engenheiro',
      'Operação de guincho apenas por profissional habilitado',
      'Trabalho em altura requer cinto de segurança e linha de vida',
      'Não montar em dias de chuva ou vento forte',
      'Estrutura requer ART para eventos públicos',
    ],
  },
  {
    id: 'galpao-10x20',
    nome: 'Galpão 10x20m',
    categoria: 'Galpões',
    icon: '🏭',
    dimensoes: '10m x 20m x 4.5m (altura cumeeira)',
    pesoAprox: '3.500kg',
    capacidade: '~200 pessoas',
    tempoMontagem: '1-2 dias',
    equipeMinimaI: '6 pessoas',
    materiais: [
      { nome: 'Lona Galpão 10x20', qtd: 1, essencial: true },
      { nome: 'Estrutura Metálica', qtd: 1, essencial: true },
      { nome: 'Tesouras Metálicas', qtd: 6, essencial: true },
      { nome: 'Colunas Laterais', qtd: 14, essencial: true },
      { nome: 'Fechamento Lateral', qtd: 60, essencial: false },
      { nome: 'Sapata Metálica', qtd: 14, essencial: true },
    ],
    ferramentas: ['Guincho', 'Escada 5m', 'Chaves', 'Talha'],
    passos: [
      { titulo: 'Fundação', descricao: 'Posicionar sapatas nos 14 pontos.' },
      { titulo: 'Colunas', descricao: 'Erguer colunas laterais.' },
      { titulo: 'Tesouras', descricao: 'Instalar tesouras com guincho.' },
      { titulo: 'Cobertura', descricao: 'Fixar lona na estrutura.' },
      { titulo: 'Fechamento', descricao: 'Instalar laterais se necessário.' },
    ],
    avisos: [
      'Requer equipamento de elevação',
      'Trabalho em altura com EPIs',
    ],
  },
];

// Categorias
const categorias = [
  { id: 'todas', label: 'Todas', icon: Package },
  { id: 'Tendas', label: 'Tendas', icon: '⛺' },
  { id: 'Palcos', label: 'Palcos', icon: '🎭' },
  { id: 'Galpões', label: 'Galpões', icon: '🏭' },
];

export default function EstruturasPage({ darkMode }) {
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('todas');
  const [estruturaSelecionada, setEstruturaSelecionada] = useState(null);
  const [abaModal, setAbaModal] = useState('info');

  const estruturasFiltradas = estruturasGabaritos.filter(est => {
    const matchCategoria = categoriaAtiva === 'todas' || est.categoria === categoriaAtiva;
    const matchBusca = est.nome.toLowerCase().includes(busca.toLowerCase()) ||
                       est.categoria.toLowerCase().includes(busca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  const inputClass = `w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-orange-500/50 transition-colors
    ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600' : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'}`;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30 flex-shrink-0">
            <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
          </div>
          <div>
            <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Estruturas</h2>
            <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Gabaritos e instruções de montagem</p>
          </div>
        </div>
        
        <div className={`px-4 py-2 rounded-xl border ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Total: </span>
          <span className={`font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{estruturasGabaritos.length} estruturas</span>
        </div>
      </div>

      {/* Busca e Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
          <input 
            type="text" 
            value={busca} 
            onChange={(e) => setBusca(e.target.value)} 
            placeholder="Buscar estrutura..."
            className={`${inputClass} pl-12`} 
          />
        </div>
        
        {/* Filtro por Categoria */}
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categorias.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoriaAtiva(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all
                ${categoriaAtiva === cat.id
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-black shadow-lg shadow-orange-500/30'
                  : darkMode 
                    ? 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300'
                }`}
            >
              {typeof cat.icon === 'string' ? (
                <span className="text-lg">{cat.icon}</span>
              ) : (
                <cat.icon className="w-4 h-4" />
              )}
              <span className="text-sm">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {estruturasFiltradas.map((estrutura) => (
          <div 
            key={estrutura.id}
            onClick={() => { setEstruturaSelecionada(estrutura); setAbaModal('info'); }}
            className={`rounded-2xl border p-5 cursor-pointer transition-all duration-300 group hover:scale-[1.02] hover:shadow-xl
              ${darkMode 
                ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 hover:border-orange-500/50 hover:shadow-orange-500/10' 
                : 'bg-white border-zinc-200 hover:border-orange-400 hover:shadow-orange-100'}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{estrutura.icon}</span>
                <div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${darkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-500'}`}>
                    {estrutura.categoria}
                  </span>
                  <h3 className={`font-bold text-lg mt-1 group-hover:text-orange-500 transition-colors ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                    {estrutura.nome}
                  </h3>
                </div>
              </div>
              <div className={`p-2 rounded-xl transition-all group-hover:bg-orange-500 group-hover:text-black ${darkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-500'}`}>
                <FileText className="w-4 h-4" />
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Ruler className={`w-3.5 h-3.5 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                  <span className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Dimensões</span>
                </div>
                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{estrutura.dimensoes.split(' x ')[0]} x {estrutura.dimensoes.split(' x ')[1]}</p>
              </div>
              <div className={`p-3 rounded-xl ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-50'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Clock className={`w-3.5 h-3.5 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                  <span className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Montagem</span>
                </div>
                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{estrutura.tempoMontagem}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className={`w-4 h-4 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{estrutura.equipeMinimaI}</span>
              </div>
              <div className="flex items-center gap-2 text-orange-500">
                <span className="text-sm font-medium">Ver gabarito</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {estruturasFiltradas.length === 0 && (
        <div className={`rounded-2xl border-2 border-dashed p-12 text-center ${darkMode ? 'border-zinc-800' : 'border-zinc-300'}`}>
          <Wrench className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-zinc-700' : 'text-zinc-400'}`} />
          <p className={`text-lg font-medium mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Nenhuma estrutura encontrada</p>
          <p className={darkMode ? 'text-zinc-600' : 'text-zinc-400'}>Tente ajustar os filtros de busca</p>
        </div>
      )}

      {/* Modal de Gabarito */}
      {estruturaSelecionada && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
          <div 
            className={`rounded-t-2xl sm:rounded-2xl border-t sm:border w-full sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col
              ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}
          >
            {/* Header */}
            <div className={`p-4 sm:p-6 border-b flex-shrink-0 ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <span className="text-3xl sm:text-5xl flex-shrink-0">{estruturaSelecionada.icon}</span>
                  <div className="min-w-0">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${darkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-500'}`}>
                      {estruturaSelecionada.categoria}
                    </span>
                    <h2 className={`text-lg sm:text-2xl font-bold mt-1 truncate ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                      {estruturaSelecionada.nome}
                    </h2>
                  </div>
                </div>
                <button 
                  onClick={() => setEstruturaSelecionada(null)}
                  className={`p-2 rounded-xl transition-colors flex-shrink-0 active:scale-95 touch-manipulation ${darkMode ? 'text-zinc-500 hover:text-white hover:bg-zinc-800' : 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100'}`}
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mt-3 sm:mt-4 overflow-x-auto scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0">
                {[
                  { id: 'info', label: 'Informações', icon: Info },
                  { id: 'materiais', label: 'Materiais', icon: Package },
                  { id: 'montagem', label: 'Montagem', icon: Hammer },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setAbaModal(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all
                      ${abaModal === tab.id
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-black'
                        : darkMode ? 'bg-zinc-800 text-zinc-400 hover:text-white' : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900'
                      }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-hide">
              {/* Aba Informações */}
              {abaModal === 'info' && (
                <div className="space-y-4 sm:space-y-6">
                  {/* Grid de Specs */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    {[
                      { icon: Ruler, label: 'Dimensões', value: estruturaSelecionada.dimensoes },
                      { icon: Weight, label: 'Peso Aprox.', value: estruturaSelecionada.pesoAprox },
                      { icon: Users, label: 'Capacidade', value: estruturaSelecionada.capacidade },
                      { icon: Clock, label: 'Tempo Montagem', value: estruturaSelecionada.tempoMontagem },
                    ].map((spec, idx) => (
                      <div 
                        key={idx}
                        className={`rounded-xl border p-3 sm:p-4 ${darkMode ? 'bg-zinc-800/30 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}
                      >
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                          <spec.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
                          <span className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>{spec.label}</span>
                        </div>
                        <p className={`font-semibold text-sm sm:text-base ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{spec.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Equipe e Ferramentas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div className={`rounded-xl border p-4 sm:p-5 ${darkMode ? 'bg-zinc-800/30 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                      <h3 className={`font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                        <HardHat className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                        Equipe Mínima
                      </h3>
                      <p className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{estruturaSelecionada.equipeMinimaI}</p>
                    </div>
                    <div className={`rounded-xl border p-4 sm:p-5 ${darkMode ? 'bg-zinc-800/30 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                      <h3 className={`font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                        <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                        Ferramentas Necessárias
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {estruturaSelecionada.ferramentas.map((ferr, idx) => (
                          <span 
                            key={idx}
                            className={`text-sm px-3 py-1 rounded-lg ${darkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-200 text-zinc-700'}`}
                          >
                            {ferr}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Avisos */}
                  <div className={`rounded-xl border p-5 ${darkMode ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-yellow-50 border-yellow-200'}`}>
                    <h3 className={`font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                      <AlertTriangle className="w-5 h-5" />
                      Avisos Importantes
                    </h3>
                    <ul className="space-y-2">
                      {estruturaSelecionada.avisos.map((aviso, idx) => (
                        <li 
                          key={idx}
                          className={`flex items-start gap-2 text-sm ${darkMode ? 'text-yellow-400/80' : 'text-yellow-700'}`}
                        >
                          <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          {aviso}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Aba Materiais */}
              {abaModal === 'materiais' && (
                <div className="space-y-4">
                  <div className={`rounded-xl border overflow-hidden ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                    <div className={`p-4 border-b ${darkMode ? 'bg-zinc-800/50 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                      <h3 className={`font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                        <Layers className="w-5 h-5 text-orange-500" />
                        Lista de Materiais
                        <span className={`text-sm font-normal ml-2 px-2 py-0.5 rounded-full ${darkMode ? 'bg-zinc-700 text-zinc-400' : 'bg-zinc-200 text-zinc-500'}`}>
                          {estruturaSelecionada.materiais.length} itens
                        </span>
                      </h3>
                    </div>
                    <div className="divide-y divide-zinc-800">
                      {estruturaSelecionada.materiais.map((mat, idx) => (
                        <div 
                          key={idx}
                          className={`p-4 flex items-center justify-between ${darkMode ? 'hover:bg-zinc-800/30' : 'hover:bg-zinc-50'}`}
                        >
                          <div className="flex items-center gap-3">
                            {mat.essencial ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <div className={`w-5 h-5 rounded-full border-2 ${darkMode ? 'border-zinc-700' : 'border-zinc-300'}`} />
                            )}
                            <div>
                              <p className={`font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{mat.nome}</p>
                              {mat.essencial && (
                                <span className="text-xs text-green-500">Essencial</span>
                              )}
                            </div>
                          </div>
                          <span className={`font-bold text-lg px-3 py-1 rounded-lg ${darkMode ? 'bg-orange-500/10 text-orange-500' : 'bg-orange-50 text-orange-600'}`}>
                            {mat.qtd}x
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Aba Montagem */}
              {abaModal === 'montagem' && (
                <div className="space-y-4">
                  <h3 className={`font-semibold flex items-center gap-2 mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                    <ListChecks className="w-5 h-5 text-orange-500" />
                    Passo a Passo da Montagem
                  </h3>
                  
                  <div className="space-y-4">
                    {estruturaSelecionada.passos.map((passo, idx) => (
                      <div 
                        key={idx}
                        className={`rounded-xl border p-5 relative ${darkMode ? 'bg-zinc-800/30 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 text-black font-bold">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                              {passo.titulo}
                            </h4>
                            <p className={`leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                              {passo.descricao}
                            </p>
                          </div>
                        </div>
                        
                        {idx < estruturaSelecionada.passos.length - 1 && (
                          <div className={`absolute left-[39px] top-[72px] bottom-[-20px] w-0.5 ${darkMode ? 'bg-zinc-700' : 'bg-zinc-300'}`} />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Conclusão */}
                  <div className={`rounded-xl border p-5 ${darkMode ? 'bg-green-500/5 border-green-500/20' : 'bg-green-50 border-green-200'}`}>
                    <div className="flex items-center gap-3">
                      <CheckCircle className={`w-6 h-6 ${darkMode ? 'text-green-500' : 'text-green-600'}`} />
                      <div>
                        <h4 className={`font-semibold ${darkMode ? 'text-green-400' : 'text-green-700'}`}>Montagem Concluída!</h4>
                        <p className={`text-sm ${darkMode ? 'text-green-400/70' : 'text-green-600'}`}>
                          Realize a vistoria final antes de liberar para uso.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={`p-4 border-t flex-shrink-0 ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-4 text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  <span>ID: {estruturaSelecionada.id}</span>
                </div>
                <button 
                  onClick={() => setEstruturaSelecionada(null)}
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
    </div>
  );
}