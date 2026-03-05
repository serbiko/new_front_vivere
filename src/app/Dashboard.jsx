"use client";

import React, { useState } from 'react';
import { 
  Home, 
  UserPlus, 
  LayoutDashboard, 
  Package, 
  Calendar, 
  Clock, 
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Users,
  Building2,
  Menu,
  X,
  Zap
} from 'lucide-react';

const menuItems = [
  { id: 'home', label: 'Home', icon: Home },
  { 
    id: 'cadastro', 
    label: 'Cadastro', 
    icon: UserPlus,
    hasDropdown: true,
    subItems: [
      { id: 'cadastro-pessoas', label: 'Cadastro de Pessoas', icon: Users },
      { id: 'cadastro-empresas', label: 'Cadastro de Empresas', icon: Building2 },
    ]
  },
  { id: 'painel', label: 'Painel', icon: LayoutDashboard },
  { id: 'estoque', label: 'Estoque', icon: Package },
  { id: 'evento', label: 'Evento', icon: Calendar },
  { id: 'historico', label: 'Histórico', icon: Clock },
  { id: 'ajuda', label: 'Ajuda', icon: HelpCircle },
];

function Sidebar({ 
  isMobile = false, 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  sidebarCollapsed, 
  setSidebarCollapsed,
  activeTab,
  setActiveTab,
  cadastroOpen,
  setCadastroOpen
}) {
  const handleMenuClick = (item) => {
    if (item.hasDropdown) {
      setCadastroOpen(!cadastroOpen);
    } else {
      setActiveTab(item.id);
      setMobileMenuOpen(false);
    }
  };

  const handleSubItemClick = (subItem) => {
    setActiveTab(subItem.id);
    setMobileMenuOpen(false);
  };

  return (
    <aside 
      className={`
        ${isMobile ? 'fixed inset-0 z-50' : 'relative'}
        ${isMobile && !mobileMenuOpen ? 'pointer-events-none' : ''}
      `}
    >
      {isMobile && (
        <div 
          className={`
            absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300
            ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}
          `}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      <div 
        className={`
          ${isMobile ? 'absolute left-0 top-0 h-full' : 'h-screen sticky top-0'}
          ${sidebarCollapsed && !isMobile ? 'w-20' : 'w-72'}
          ${isMobile ? (mobileMenuOpen ? 'translate-x-0' : '-translate-x-full') : ''}
          bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950
          border-r border-orange-500/20
          flex flex-col
          transition-all duration-300 ease-out
          overflow-hidden
        `}
        style={{
          boxShadow: '4px 0 30px rgba(249, 115, 22, 0.1)'
        }}
      >
        <div className="p-6 border-b border-orange-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-transparent" />
          <div className="relative flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30"
              style={{
                transform: 'rotate(-3deg)'
              }}
            >
              <Zap className="w-7 h-7 text-black" strokeWidth={2.5} />
            </div>
            {(!sidebarCollapsed || isMobile) && (
              <div className="overflow-hidden">
                <h1 className="text-2xl font-black text-white tracking-tight">
                  SISTEMA
                </h1>
                <p className="text-orange-500 text-xs font-medium tracking-widest">
                  GESTÃO PRO
                </p>
              </div>
            )}
          </div>
          
          {!isMobile && (
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-zinc-800 hover:bg-orange-500 text-zinc-400 hover:text-black flex items-center justify-center transition-all duration-200"
            >
              <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${sidebarCollapsed ? '' : 'rotate-180'}`} />
            </button>
          )}
          
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-zinc-800 hover:bg-orange-500 text-zinc-400 hover:text-black flex items-center justify-center transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.subItems?.some(sub => sub.id === activeTab));
            
            return (
              <div key={item.id}>
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-200 group relative overflow-hidden
                    ${isActive 
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-black shadow-lg shadow-orange-500/30' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/80'
                    }
                  `}
                >
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                  
                  <Icon className={`w-5 h-5 flex-shrink-0 relative z-10 ${isActive ? 'text-black' : ''}`} />
                  
                  {(!sidebarCollapsed || isMobile) && (
                    <>
                      <span className="font-semibold text-sm relative z-10 flex-1 text-left">
                        {item.label}
                      </span>
                      {item.hasDropdown && (
                        <ChevronDown 
                          className={`w-4 h-4 relative z-10 transition-transform duration-300 ${cadastroOpen ? 'rotate-180' : ''}`} 
                        />
                      )}
                    </>
                  )}
                </button>

                {item.hasDropdown && (!sidebarCollapsed || isMobile) && (
                  <div 
                    className={`
                      overflow-hidden transition-all duration-300 ease-out
                      ${cadastroOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}
                    `}
                  >
                    <div className="ml-4 pl-4 border-l-2 border-orange-500/30 space-y-1">
                      {item.subItems.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSubActive = activeTab === subItem.id;
                        
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => handleSubItemClick(subItem)}
                            className={`
                              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                              transition-all duration-200 text-sm
                              ${isSubActive 
                                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' 
                                : 'text-zinc-500 hover:text-orange-400 hover:bg-zinc-800/50'
                              }
                            `}
                          >
                            <SubIcon className="w-4 h-4" />
                            <span className="font-medium">{subItem.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {(!sidebarCollapsed || isMobile) && (
          <div className="p-4 border-t border-orange-500/20">
            <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full blur-2xl" />
              <div className="relative">
                <p className="text-zinc-400 text-xs mb-1">Conectado como</p>
                <p className="text-white font-semibold text-sm">Administrador</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-400 text-xs">Online</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [cadastroOpen, setCadastroOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getPageTitle = () => {
    const titles = {
      'home': 'Bem-vindo ao Sistema',
      'cadastro-pessoas': 'Cadastro de Pessoas',
      'cadastro-empresas': 'Cadastro de Empresas',
      'painel': 'Painel de Controle',
      'estoque': 'Gestão de Estoque',
      'evento': 'Eventos',
      'historico': 'Histórico',
      'ajuda': 'Central de Ajuda',
    };
    return titles[activeTab] || 'Sistema';
  };

  const getPageDescription = () => {
    const descriptions = {
      'home': 'Gerencie todas as operações do seu negócio em um só lugar.',
      'cadastro-pessoas': 'Adicione e gerencie cadastros de pessoas físicas.',
      'cadastro-empresas': 'Adicione e gerencie cadastros de empresas.',
      'painel': 'Visualize métricas e indicadores importantes.',
      'estoque': 'Controle seu inventário de forma eficiente.',
      'evento': 'Organize e acompanhe seus eventos.',
      'historico': 'Consulte o histórico de atividades.',
      'ajuda': 'Encontre respostas para suas dúvidas.',
    };
    return descriptions[activeTab] || '';
  };

  const getActiveIcon = () => {
    const icons = {
      'home': Home,
      'cadastro-pessoas': Users,
      'cadastro-empresas': Building2,
      'painel': LayoutDashboard,
      'estoque': Package,
      'evento': Calendar,
      'historico': Clock,
      'ajuda': HelpCircle,
    };
    const Icon = icons[activeTab] || Home;
    return <Icon className="w-10 h-10 text-orange-500" />;
  };

  const sidebarProps = {
    mobileMenuOpen,
    setMobileMenuOpen,
    sidebarCollapsed,
    setSidebarCollapsed,
    activeTab,
    setActiveTab,
    cadastroOpen,
    setCadastroOpen
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar {...sidebarProps} />
      </div>
      
      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sidebar isMobile {...sidebarProps} />
      </div>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-orange-500/10">
          <div className="px-6 py-4 flex items-center justify-between">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl bg-zinc-800 hover:bg-orange-500 text-zinc-400 hover:text-black flex items-center justify-center transition-all duration-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Page Title */}
            <div className="hidden lg:block">
              <h2 className="text-2xl font-bold text-white">{getPageTitle()}</h2>
              <p className="text-zinc-500 text-sm">{getPageDescription()}</p>
            </div>

            {/* Right side - Search & Profile */}
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <input 
                  type="text"
                  placeholder="Buscar..."
                  className="w-64 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                />
              </div>
              
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-black font-bold shadow-lg shadow-orange-500/30 cursor-pointer hover:scale-105 transition-transform duration-200">
                A
              </div>
            </div>
          </div>
          
          {/* Mobile title */}
          <div className="lg:hidden px-6 pb-4">
            <h2 className="text-xl font-bold text-white">{getPageTitle()}</h2>
            <p className="text-zinc-500 text-sm">{getPageDescription()}</p>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 lg:p-8">
          {/* Stats Cards - Show on Home */}
          {activeTab === 'home' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Cadastros', value: '1,234', change: '+12%', color: 'orange' },
                { label: 'Empresas', value: '89', change: '+5%', color: 'emerald' },
                { label: 'Eventos Ativos', value: '12', change: '+2', color: 'blue' },
                { label: 'Itens em Estoque', value: '5,678', change: '-3%', color: 'purple' },
              ].map((stat, i) => (
                <div 
                  key={i}
                  className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-6 border border-zinc-800 overflow-hidden group hover:border-orange-500/30 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all duration-300" />
                  <div className="relative">
                    <p className="text-zinc-500 text-sm mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                    <span className={`text-sm ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                      {stat.change} este mês
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Content Area */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 p-8 min-h-[400px] relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/5 rounded-full blur-3xl" />
            
            <div className="relative flex flex-col items-center justify-center h-full min-h-[300px] text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center mb-6 border border-orange-500/20">
                {getActiveIcon()}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{getPageTitle()}</h3>
              <p className="text-zinc-500 max-w-md mb-6">{getPageDescription()}</p>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-full border border-zinc-700">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-zinc-400 text-sm">Página em desenvolvimento</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
