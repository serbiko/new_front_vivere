"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  PartyPopper, ClipboardList, CheckCircle, UsersRound, TrendingUp, 
  TrendingDown, BarChart3, PieChart, CalendarDays, MapPin, 
  Settings, Plus, X, AlertTriangle, Activity, PackageX, Clock, LayoutGrid
} from 'lucide-react';

// --- MOCK DATA ---
const mainStats = {
  'stat-eventos': { label: 'Eventos no Mês', value: '19', change: '+15%', trend: 'up', icon: PartyPopper },
  'stat-os': { label: 'OS em Andamento', value: '8', change: '+3', trend: 'up', icon: ClipboardList },
  'stat-concluidas': { label: 'Montagens Concluídas', value: '34', change: '+22%', trend: 'up', icon: CheckCircle },
  'stat-equipes': { label: 'Equipes em Campo', value: '5', change: '0', trend: 'up', icon: UsersRound },
};

const tipoEstrutura = [
  { label: 'Palcos', value: 12, color: 'bg-orange-500' },
  { label: 'Tendas', value: 18, color: 'bg-blue-500' },
  { label: 'Arquibancadas', value: 8, color: 'bg-emerald-500' },
  { label: 'Iluminação', value: 15, color: 'bg-purple-500' },
];

const monthlyData = [
  { month: 'Jan', value: 14 }, { month: 'Fev', value: 18 }, { month: 'Mar', value: 22 },
  { month: 'Abr', value: 16 }, { month: 'Mai', value: 25 }, { month: 'Jun', value: 19 },
];

const proximasOS = [
  { id: 'OS-005', evento: 'Festa Junina Municipal', data: '15 Mar', local: 'Praça Central', status: 'Aguardando' },
  { id: 'OS-006', evento: 'Show Dia da Mulher', data: '18 Mar', local: 'Ginásio Municipal', status: 'Em Montagem' },
  { id: 'OS-007', evento: 'Formatura ETEC', data: '22 Mar', local: 'Centro de Convenções', status: 'Aguardando' },
];

const alertasEstoque = [
  { item: 'Treliça Q30 (2m)', status: 'Baixo', qtd: '4 unid' },
  { item: 'Lona Branca 10x10', status: 'Esgotado', qtd: '0 unid' },
  { item: 'Sapatas Metálicas', status: 'Baixo', qtd: '12 unid' },
];

const atividadesRecentes = [
  { user: 'Carlos S.', action: 'Atualizou OS-005', time: 'Há 15 min' },
  { user: 'Ana Souza', action: 'Cadastrou fornecedor', time: 'Há 2 horas' },
  { user: 'Sistema', action: 'Alerta: Estoque baixo', time: 'Há 3 horas' },
];

const statusColors = {
  'Aguardando': 'text-blue-500 bg-blue-500/10',
  'Em Montagem': 'text-yellow-500 bg-yellow-500/10',
  'Planejamento': 'text-purple-500 bg-purple-500/10',
};

// --- CONFIGURAÇÃO DOS WIDGETS DISPONÍVEIS ---
const WIDGET_CONFIG = {
  'stat-eventos': { name: 'Eventos no Mês', defaultW: 200, defaultH: 140, minW: 150, minH: 120 },
  'stat-os': { name: 'OS em Andamento', defaultW: 200, defaultH: 140, minW: 150, minH: 120 },
  'stat-concluidas': { name: 'Montagens Concluídas', defaultW: 200, defaultH: 140, minW: 150, minH: 120 },
  'stat-equipes': { name: 'Equipes em Campo', defaultW: 200, defaultH: 140, minW: 150, minH: 120 },
  'chart-mensal': { name: 'Gráfico: Montagens/Mês', defaultW: 420, defaultH: 250, minW: 300, minH: 200 },
  'chart-estruturas': { name: 'Gráfico: Estruturas', defaultW: 350, defaultH: 250, minW: 250, minH: 200 },
  'alert-estoque': { name: 'Alertas de Estoque', defaultW: 350, defaultH: 220, minW: 250, minH: 180 },
  'list-atividades': { name: 'Atividade Recente', defaultW: 300, defaultH: 220, minW: 200, minH: 180 },
  'table-proximas': { name: 'Próximas OS', defaultW: 600, defaultH: 220, minW: 400, minH: 180 },
};

export default function PainelPage({ darkMode }) {
  // Estado dos widgets - INICIA VAZIO
  const [widgets, setWidgets] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeWidget, setActiveWidget] = useState(null);
  
  // Refs para evitar loops infinitos no useEffect
  const containerRef = useRef(null);
  const dragRef = useRef(null);
  const resizeRef = useRef(null);
  const scrollRAF = useRef(null);
  const widgetsRef = useRef(widgets);

  // Atualiza ref quando widgets muda
  useEffect(() => {
    widgetsRef.current = widgets;
  }, [widgets]);

  // Configurações
  const SCROLL_EDGE = 60;
  const SCROLL_SPEED_BASE = 10;
  const SCROLL_SPEED_MAX = 30;
  const CONTAINER_MIN_HEIGHT = 400;

  // Calcula altura dinâmica do container
  const containerHeight = Math.max(
    CONTAINER_MIN_HEIGHT,
    ...Object.values(widgets).map(w => w.y + w.h + 20)
  );

  // Auto-scroll contínuo
  const performAutoScroll = useCallback((clientY) => {
    const viewportHeight = window.innerHeight;
    let scrollAmount = 0;
    
    if (clientY < SCROLL_EDGE) {
      const intensity = 1 - (clientY / SCROLL_EDGE);
      scrollAmount = -(SCROLL_SPEED_BASE + (SCROLL_SPEED_MAX - SCROLL_SPEED_BASE) * intensity);
    } else if (clientY > viewportHeight - SCROLL_EDGE) {
      const intensity = 1 - ((viewportHeight - clientY) / SCROLL_EDGE);
      scrollAmount = SCROLL_SPEED_BASE + (SCROLL_SPEED_MAX - SCROLL_SPEED_BASE) * intensity;
    }
    
    if (scrollAmount !== 0) {
      window.scrollBy(0, scrollAmount);
    }
  }, []);

  // Obtém limites do container
  const getContainerBounds = useCallback(() => {
    if (!containerRef.current) return { width: 800, height: CONTAINER_MIN_HEIGHT };
    const rect = containerRef.current.getBoundingClientRect();
    return { width: rect.width, height: Math.max(containerHeight, CONTAINER_MIN_HEIGHT) };
  }, [containerHeight]);

  // Handler de movimento para drag
  const handleDragMove = useCallback((e) => {
    if (!dragRef.current) return;
    
    const drag = dragRef.current;
    performAutoScroll(e.clientY);

    const scrollDelta = window.scrollY - drag.initialScrollY;
    const deltaX = e.clientX - drag.startMouseX;
    const deltaY = e.clientY - drag.startMouseY + scrollDelta;
    
    let newX = drag.startX + deltaX;
    let newY = drag.startY + deltaY;
    
    // Restringe ao container
    const bounds = getContainerBounds();
    const widget = widgetsRef.current[drag.id];
    if (widget) {
      newX = Math.max(0, Math.min(newX, bounds.width - widget.w));
      newY = Math.max(0, Math.min(newY, bounds.height - widget.h));
    }
    
    setWidgets(prev => ({
      ...prev,
      [drag.id]: { ...prev[drag.id], x: newX, y: newY }
    }));
  }, [getContainerBounds, performAutoScroll]);

  // Handler de fim do drag
  const handleDragEnd = useCallback(() => {
    dragRef.current = null;
    setActiveWidget(null);
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
    
    if (scrollRAF.current) {
      cancelAnimationFrame(scrollRAF.current);
      scrollRAF.current = null;
    }
  }, []);

  // Handler de movimento para resize
  const handleResizeMove = useCallback((e) => {
    if (!resizeRef.current) return;
    
    const resize = resizeRef.current;
    performAutoScroll(e.clientY);

    const deltaX = e.clientX - resize.startMouseX;
    const deltaY = e.clientY - resize.startMouseY;
    const dir = resize.direction;
    
    let newX = resize.startX;
    let newY = resize.startY;
    let newW = resize.startW;
    let newH = resize.startH;

    if (dir.includes('e')) newW = resize.startW + deltaX;
    if (dir.includes('w')) {
      newW = resize.startW - deltaX;
      newX = resize.startX + deltaX;
    }
    if (dir.includes('s')) newH = resize.startH + deltaY;
    if (dir.includes('n')) {
      newH = resize.startH - deltaY;
      newY = resize.startY + deltaY;
    }

    // Aplicar mínimos
    if (newW < resize.minW) {
      if (dir.includes('w')) newX = resize.startX + resize.startW - resize.minW;
      newW = resize.minW;
    }
    if (newH < resize.minH) {
      if (dir.includes('n')) newY = resize.startY + resize.startH - resize.minH;
      newH = resize.minH;
    }

    // Restringir ao container
    const bounds = getContainerBounds();
    if (newX < 0) { newW += newX; newX = 0; }
    if (newY < 0) { newH += newY; newY = 0; }
    if (newX + newW > bounds.width) newW = bounds.width - newX;
    if (newY + newH > bounds.height) newH = bounds.height - newY;

    // Reaplicar mínimos
    newW = Math.max(newW, resize.minW);
    newH = Math.max(newH, resize.minH);

    setWidgets(prev => ({
      ...prev,
      [resize.id]: { ...prev[resize.id], x: newX, y: newY, w: newW, h: newH }
    }));
  }, [getContainerBounds, performAutoScroll]);

  // Handler de fim do resize
  const handleResizeEnd = useCallback(() => {
    resizeRef.current = null;
    setActiveWidget(null);
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
  }, []);

  // Effect para gerenciar eventos globais
  useEffect(() => {
    const handlePointerMove = (e) => {
      if (dragRef.current) handleDragMove(e);
      if (resizeRef.current) handleResizeMove(e);
    };

    const handlePointerUp = () => {
      if (dragRef.current) handleDragEnd();
      if (resizeRef.current) handleResizeEnd();
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handleDragMove, handleDragEnd, handleResizeMove, handleResizeEnd]);

  // Inicia drag do widget
  const startDrag = (e, widgetId) => {
    if (!isEditing) return;
    e.preventDefault();
    e.stopPropagation();
    
    const widget = widgets[widgetId];
    if (!widget) return;

    dragRef.current = {
      id: widgetId,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startX: widget.x,
      startY: widget.y,
      initialScrollY: window.scrollY
    };

    setActiveWidget(widgetId);
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';
  };

  // Inicia resize do widget
  const startResize = (e, widgetId, direction) => {
    if (!isEditing) return;
    e.preventDefault();
    e.stopPropagation();

    const widget = widgets[widgetId];
    const config = WIDGET_CONFIG[widgetId];
    if (!widget || !config) return;

    resizeRef.current = {
      id: widgetId,
      direction,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startX: widget.x,
      startY: widget.y,
      startW: widget.w,
      startH: widget.h,
      minW: config.minW,
      minH: config.minH
    };

    setActiveWidget(widgetId);
    document.body.style.userSelect = 'none';
    
    const cursorMap = {
      'n': 'ns-resize', 's': 'ns-resize',
      'e': 'ew-resize', 'w': 'ew-resize',
      'ne': 'nesw-resize', 'sw': 'nesw-resize',
      'nw': 'nwse-resize', 'se': 'nwse-resize'
    };
    document.body.style.cursor = cursorMap[direction] || 'se-resize';
  };

  // Remove widget
  const removeWidget = (id) => {
    setWidgets(prev => {
      const newWidgets = { ...prev };
      delete newWidgets[id];
      return newWidgets;
    });
  };

  // Adiciona widget
  const addWidget = (id) => {
    const config = WIDGET_CONFIG[id];
    if (!config) return;
    
    // Encontra posição livre
    let y = 10;
    Object.values(widgets).forEach(w => {
      if (w.y + w.h + 10 > y) y = w.y + w.h + 10;
    });

    setWidgets(prev => ({
      ...prev,
      [id]: { 
        x: 10, 
        y, 
        w: config.defaultW, 
        h: config.defaultH,
        minW: config.minW,
        minH: config.minH
      }
    }));
    setIsAddModalOpen(false);
  };

  // Renderiza conteúdo do widget
  const renderWidgetContent = (id) => {
    if (id.startsWith('stat-')) {
      const stat = mainStats[id];
      if (!stat) return null;
      const Icon = stat.icon;
      return (
        <div className="p-4 h-full flex flex-col justify-center">
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <Icon className="w-4 h-4 text-orange-500" />
            </div>
            <div className={`flex items-center gap-1 text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {stat.change}
            </div>
          </div>
          <p className={`text-xs mb-0.5 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{stat.label}</p>
          <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{stat.value}</p>
        </div>
      );
    }

    if (id === 'chart-mensal') {
      const maxValue = Math.max(...monthlyData.map(d => d.value));
      return (
        <div className="p-4 flex flex-col h-full">
          <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            <BarChart3 className="w-4 h-4 text-orange-500" />Montagens por Mês
          </h3>
          <div className="flex items-end justify-between gap-1 flex-1">
            {monthlyData.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <span className={`text-[10px] font-medium ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{data.value}</span>
                <div 
                  className={`w-full rounded-t overflow-hidden ${darkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`} 
                  style={{ height: `${(data.value / maxValue) * 100}%`, minHeight: '8px' }}
                >
                  <div className="w-full h-full bg-gradient-to-t from-orange-600 to-orange-400" />
                </div>
                <span className={`text-[10px] ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{data.month}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (id === 'chart-estruturas') {
      const total = tipoEstrutura.reduce((acc, s) => acc + s.value, 0);
      return (
        <div className="p-4 flex flex-col h-full">
          <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            <PieChart className="w-4 h-4 text-orange-500" />Tipos de Estrutura
          </h3>
          <div className="space-y-2 flex-1 overflow-auto">
            {tipoEstrutura.map((stat, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{stat.label}</span>
                  <span className={`text-xs font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{stat.value}</span>
                </div>
                <div className={`h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
                  <div className={`h-full ${stat.color} rounded-full`} style={{ width: `${(stat.value / total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (id === 'alert-estoque') {
      return (
        <div className="p-4 flex flex-col h-full">
          <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            <PackageX className="w-4 h-4 text-orange-500" />Alertas de Estoque
          </h3>
          <div className="space-y-2 flex-1 overflow-auto">
            {alertasEstoque.map((alerta, i) => (
              <div key={i} className={`flex items-center justify-between p-2 rounded-lg border ${darkMode ? 'bg-zinc-800/30 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-3 h-3 ${alerta.status === 'Esgotado' ? 'text-red-500' : 'text-yellow-500'}`} />
                  <span className={`text-xs font-medium ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{alerta.item}</span>
                </div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${alerta.status === 'Esgotado' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-600'}`}>
                  {alerta.qtd}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (id === 'list-atividades') {
      return (
        <div className="p-4 flex flex-col h-full">
          <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            <Activity className="w-4 h-4 text-orange-500" />Atividade Recente
          </h3>
          <div className="space-y-2 flex-1 overflow-auto">
            {atividadesRecentes.map((atividade, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                <div>
                  <p className={`text-xs font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{atividade.user}</p>
                  <p className={`text-[10px] ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{atividade.action}</p>
                  <p className="text-[10px] text-orange-500">{atividade.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (id === 'table-proximas') {
      return (
        <div className="flex flex-col h-full">
          <div className={`p-3 border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
            <h3 className={`text-sm font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
              <CalendarDays className="w-4 h-4 text-orange-500" />Próximas OS
            </h3>
          </div>
          <div className="overflow-auto flex-1">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                  {['OS', 'Evento', 'Local', 'Status'].map(h => (
                    <th key={h} className={`text-left text-[10px] font-medium px-3 py-2 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {proximasOS.map((os, i) => (
                  <tr key={i} className={`border-b last:border-0 ${darkMode ? 'border-zinc-800/50' : 'border-zinc-100'}`}>
                    <td className="px-3 py-2"><span className="text-orange-500 font-mono text-[10px] font-medium">{os.id}</span></td>
                    <td className={`px-3 py-2 text-[10px] font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{os.evento}</td>
                    <td className={`px-3 py-2 text-[10px] ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      <div className="flex items-center gap-1"><MapPin className="w-2.5 h-2.5" />{os.local}</div>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${statusColors[os.status]}`}>{os.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    return null;
  };

  // Componente de handles de resize
  const ResizeHandles = ({ widgetId }) => {
    const handleClass = "absolute opacity-0 hover:opacity-100 transition-opacity z-20";
    
    return (
      <>
        {/* Bordas */}
        <div className={`${handleClass} top-0 left-3 right-3 h-2 cursor-ns-resize flex items-center justify-center`}
          onPointerDown={(e) => startResize(e, widgetId, 'n')}>
          <div className="w-10 h-1 bg-orange-500 rounded-full" />
        </div>
        <div className={`${handleClass} bottom-0 left-3 right-3 h-2 cursor-ns-resize flex items-center justify-center`}
          onPointerDown={(e) => startResize(e, widgetId, 's')}>
          <div className="w-10 h-1 bg-orange-500 rounded-full" />
        </div>
        <div className={`${handleClass} left-0 top-3 bottom-3 w-2 cursor-ew-resize flex items-center justify-center`}
          onPointerDown={(e) => startResize(e, widgetId, 'w')}>
          <div className="h-10 w-1 bg-orange-500 rounded-full" />
        </div>
        <div className={`${handleClass} right-0 top-3 bottom-3 w-2 cursor-ew-resize flex items-center justify-center`}
          onPointerDown={(e) => startResize(e, widgetId, 'e')}>
          <div className="h-10 w-1 bg-orange-500 rounded-full" />
        </div>
        
        {/* Cantos */}
        <div className={`${handleClass} top-0 left-0 w-4 h-4 cursor-nwse-resize`}
          onPointerDown={(e) => startResize(e, widgetId, 'nw')}>
          <div className="absolute top-0.5 left-0.5 w-2.5 h-2.5 border-l-2 border-t-2 border-orange-500 rounded-tl" />
        </div>
        <div className={`${handleClass} top-0 right-0 w-4 h-4 cursor-nesw-resize`}
          onPointerDown={(e) => startResize(e, widgetId, 'ne')}>
          <div className="absolute top-0.5 right-0.5 w-2.5 h-2.5 border-r-2 border-t-2 border-orange-500 rounded-tr" />
        </div>
        <div className={`${handleClass} bottom-0 left-0 w-4 h-4 cursor-nesw-resize`}
          onPointerDown={(e) => startResize(e, widgetId, 'sw')}>
          <div className="absolute bottom-0.5 left-0.5 w-2.5 h-2.5 border-l-2 border-b-2 border-orange-500 rounded-bl" />
        </div>
        <div className={`${handleClass} bottom-0 right-0 w-4 h-4 cursor-nwse-resize`}
          onPointerDown={(e) => startResize(e, widgetId, 'se')}>
          <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 border-r-2 border-b-2 border-orange-500 rounded-br" />
        </div>
      </>
    );
  };

  const hasWidgets = Object.keys(widgets).length > 0;
  const availableToAdd = Object.keys(WIDGET_CONFIG).filter(id => !widgets[id]);

  // ESTADO VAZIO - Nenhum widget ainda
  if (!hasWidgets && !isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Meu Painel</h2>
            <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Monte seu painel personalizado</p>
          </div>
        </div>

        <div className={`rounded-2xl border-2 border-dashed p-12 flex flex-col items-center justify-center min-h-[400px]
          ${darkMode ? 'border-zinc-800 bg-zinc-900/30' : 'border-zinc-300 bg-zinc-50/50'}`}>
          
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6
            ${darkMode ? 'bg-orange-500/10' : 'bg-orange-100'}`}>
            <LayoutGrid className="w-10 h-10 text-orange-500" />
          </div>
          
          <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            Seu painel está vazio
          </h3>
          <p className={`text-center max-w-md mb-8 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
            Adicione widgets para visualizar métricas, gráficos e informações importantes do seu dia a dia.
          </p>
          
          <button 
            onClick={() => { setIsEditing(true); setIsAddModalOpen(true); }}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-2xl shadow-lg shadow-orange-500/30 hover:scale-105 transition-all"
          >
            <Plus className="w-6 h-6" />
            <span className="text-lg">Adicionar primeiro widget</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Meu Painel</h2>
          <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
            {isEditing ? '🎯 Arraste para mover • Arraste bordas/cantos para redimensionar' : 'Seu painel personalizado'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <button 
                onClick={() => setIsAddModalOpen(true)} 
                className="flex items-center gap-2 px-4 py-2 border border-dashed border-orange-500 text-orange-500 hover:bg-orange-500/10 font-medium rounded-xl transition-all"
              >
                <Plus className="w-4 h-4" /> Adicionar
              </button>
              <button 
                onClick={() => setIsEditing(false)} 
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:scale-105 transition-all"
              >
                <CheckCircle className="w-4 h-4" /> Salvar
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)} 
              className={`flex items-center gap-2 px-4 py-2 font-medium rounded-xl transition-all
                ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-white border border-zinc-200 shadow-sm hover:bg-zinc-50 text-zinc-900'}`}
            >
              <Settings className="w-4 h-4" /> Personalizar
            </button>
          )}
        </div>
      </div>

      {/* Container dos Widgets */}
      <div 
        ref={containerRef}
        className={`relative rounded-2xl transition-all duration-300 overflow-hidden
          ${isEditing ? 'ring-2 ring-dashed' : ''}
          ${isEditing ? (darkMode ? 'ring-orange-500/40 bg-zinc-900/50' : 'ring-orange-400 bg-orange-50/30') : ''}`}
        style={{ height: containerHeight }}
      >
        {Object.entries(widgets).map(([id, widget]) => {
          const isActive = activeWidget === id;
          
          return (
            <div
              key={id}
              className={`absolute rounded-xl border overflow-hidden transition-shadow duration-150
                ${darkMode ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}
                ${isEditing ? 'cursor-move' : ''}
                ${isActive ? 'z-50 shadow-2xl ring-2 ring-orange-500' : 'z-10'}
                ${isEditing && !isActive ? 'hover:ring-2 hover:ring-orange-500/50' : ''}`}
              style={{
                left: widget.x,
                top: widget.y,
                width: widget.w,
                height: widget.h,
              }}
              onPointerDown={(e) => startDrag(e, id)}
            >
              {/* Botão remover */}
              {isEditing && (
                <button 
                  onClick={(e) => { e.stopPropagation(); removeWidget(id); }}
                  className="absolute top-1 right-1 z-30 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg hover:scale-110 transition-all"
                >
                  <X className="w-3 h-3" />
                </button>
              )}

              {/* Handles de resize */}
              {isEditing && <ResizeHandles widgetId={id} />}

              {/* Conteúdo */}
              <div className={`h-full ${isEditing ? 'pointer-events-none' : ''}`}>
                {renderWidgetContent(id)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Adicionar Widget */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`rounded-2xl border p-6 w-full max-w-md shadow-2xl ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
            <div className="flex items-center justify-between mb-5">
              <h3 className={`text-lg font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                <Plus className="w-5 h-5 text-orange-500" /> Adicionar Widget
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-zinc-500 hover:bg-zinc-800 hover:text-white' : 'text-zinc-400 hover:bg-zinc-100'}`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {availableToAdd.length === 0 ? (
                <div className="text-center p-8">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className={darkMode ? 'text-zinc-400' : 'text-zinc-500'}>Todos os widgets já estão no painel!</p>
                </div>
              ) : (
                availableToAdd.map(id => (
                  <button 
                    key={id}
                    onClick={() => addWidget(id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left group
                      ${darkMode ? 'bg-zinc-800/30 border-zinc-700 hover:border-orange-500 hover:bg-zinc-800' : 'bg-zinc-50 border-zinc-200 hover:border-orange-400 hover:bg-white'}`}
                  >
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{WIDGET_CONFIG[id].name}</p>
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                      <Plus className="w-4 h-4" />
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 