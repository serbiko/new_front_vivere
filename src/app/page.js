"use client";

import { useState } from 'react';
import { Home as HomeIcon, Users, Building2, ClipboardList, LayoutDashboard, Package, Calendar, Clock, HelpCircle, Menu, ArrowLeft, Boxes, Wrench } from 'lucide-react';

import Sidebar, { FloatingNav } from './components/Sidebar';
import ThemeToggle from './components/ThemeToggle';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CadastroOSPage from './pages/CadastroOSPage';
import CadastroPessoasPage from './pages/CadastroPessoasPage';
import CadastroEmpresasPage from './pages/CadastroEmpresasPage';
import PainelPage from './pages/PainelPage';
import EstoquePage from './pages/EstoquePage';
import EstruturasPage from './pages/EstruturasPage';
import EventosPage from './pages/EventosPage';
import HistoricoPage from './pages/HistoricoPage';
import AjudaPage from './pages/AjudaPage';
import GenericPage from './pages/GenericPage';

const pageConfig = {
  'home': { title: 'Home', description: 'Visão geral do sistema', icon: HomeIcon },
  'cadastro-pessoas': { title: 'Cadastro de Pessoas', description: 'Cadastre colaboradores e contatos.', icon: Users },
  'cadastro-empresas': { title: 'Cadastro de Empresas', description: 'Cadastre órgãos públicos e clientes.', icon: Building2 },
  'ordem-servico': { title: 'Ordem de Serviço', description: 'Crie e gerencie ordens de serviço.', icon: ClipboardList },
  'painel': { title: 'Painel de Controle', description: 'Métricas e indicadores de operações.', icon: LayoutDashboard },
  'estoque-materiais': { title: 'Materiais', description: 'Controle de materiais em estoque.', icon: Boxes },
  'estoque-estruturas': { title: 'Estruturas', description: 'Gabaritos e instruções de montagem.', icon: Wrench },
  'eventos': { title: 'Eventos', description: 'Gerencie todos os eventos cadastrados.', icon: Calendar },
  'historico': { title: 'Histórico', description: 'Registro de ações no sistema.', icon: Clock },
  'ajuda': { title: 'Central de Ajuda', description: 'Suporte e documentação interna.', icon: HelpCircle },
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [tabHistory, setTabHistory] = useState(['home']);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const [openDropdowns, setOpenDropdowns] = useState({});

  const handleLogin = (userData) => { setUser(userData); setIsLoggedIn(true); };
  const handleLogout = () => { setUser(null); setIsLoggedIn(false); setActiveTab('home'); setTabHistory(['home']); setOpenDropdowns({}); };

  const navigateTo = (tab) => {
    if (tab !== activeTab) {
      setTabHistory(prev => [...prev, tab]);
      setActiveTab(tab);
    }
  };

  const goBack = () => {
    if (tabHistory.length > 1) {
      const newHistory = [...tabHistory];
      newHistory.pop();
      const previousTab = newHistory[newHistory.length - 1];
      setTabHistory(newHistory);
      setActiveTab(previousTab);
    }
  };

  const canGoBack = tabHistory.length > 1;

  if (!isLoggedIn) return <LoginPage onLogin={handleLogin} darkMode={darkMode} />;

  const config = pageConfig[activeTab] || pageConfig['home'];
  
  const sidebarProps = { 
    mobileMenuOpen, setMobileMenuOpen, 
    sidebarCollapsed, setSidebarCollapsed, 
    activeTab, setActiveTab: navigateTo, 
    openDropdowns, setOpenDropdowns, 
    user, onLogout: handleLogout,
    darkMode
  };

  const renderContent = () => {
    const props = { darkMode, setActiveTab: navigateTo, setOpenDropdowns };
    switch (activeTab) {
      case 'home': return <HomePage {...props} />;
      case 'ordem-servico': return <CadastroOSPage darkMode={darkMode} />;
      case 'cadastro-pessoas': return <CadastroPessoasPage darkMode={darkMode} />;
      case 'cadastro-empresas': return <CadastroEmpresasPage darkMode={darkMode} />;
      case 'painel': return <PainelPage darkMode={darkMode} />;
      case 'estoque-materiais': return <EstoquePage darkMode={darkMode} />;
      case 'estoque-estruturas': return <EstruturasPage darkMode={darkMode} />;
      case 'eventos': return <EventosPage darkMode={darkMode} />;
      case 'historico': return <HistoricoPage darkMode={darkMode} />;
      case 'ajuda': return <AjudaPage darkMode={darkMode} />;
      default: return <GenericPage title={config.title} description={config.description} icon={config.icon} darkMode={darkMode} />;
    }
  };

  return (
    <div className={`min-h-screen min-h-dvh flex font-sans transition-colors duration-500 ${darkMode ? 'bg-zinc-950' : 'bg-zinc-100'}`}>
      {/* Sidebar Desktop */}
      <div className="hidden lg:block"><Sidebar {...sidebarProps} /></div>
      
      {/* Sidebar Mobile */}
      <div className="lg:hidden"><Sidebar isMobile {...sidebarProps} /></div>

      {/* Navegação flutuante (quando sidebar colapsada) - apenas desktop */}
      <FloatingNav 
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeTab={activeTab}
        setActiveTab={navigateTo}
        darkMode={darkMode}
      />

      {/* Main - com transição suave de margem */}
      <main className={`flex-1 min-h-screen min-h-dvh w-full transition-all duration-500 ease-out ${sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-72'}`}>
        {/* Header */}
        <header className={`sticky top-0 z-30 backdrop-blur-xl border-b transition-all duration-500 safe-area-top
          ${darkMode ? 'bg-zinc-950/80 border-orange-500/10' : 'bg-white/80 border-orange-300/20'}`}>
          
          {/* Espaçador para quando FloatingNav está visível (sidebar colapsada em desktop) */}
          {sidebarCollapsed && <div className="hidden lg:block h-16" />}
          
          {/* Conteúdo do Header */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
            {/* Lado esquerdo: Menu mobile + Voltar + Título */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              {/* Botão menu mobile */}
              <button 
                onClick={() => setMobileMenuOpen(true)} 
                className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 active:scale-95 touch-manipulation flex-shrink-0
                  ${darkMode ? 'bg-zinc-800 text-zinc-400 hover:bg-orange-500 active:bg-orange-600' : 'bg-zinc-200 text-zinc-600 hover:bg-orange-500 active:bg-orange-600'} hover:text-black`}
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {/* Botão Voltar */}
              {canGoBack && (
                <button 
                  onClick={goBack}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 active:scale-95 touch-manipulation flex-shrink-0
                    ${darkMode ? 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700' : 'bg-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-300'}`}
                  title="Voltar"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              
              {/* Título da página */}
              <div className="min-w-0 flex-1">
                <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold truncate transition-colors duration-300 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                  {config.title}
                </h2>
                <p className={`text-xs sm:text-sm truncate transition-colors duration-300 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                  {config.description}
                </p>
              </div>
            </div>
            
            {/* Lado direito: Toggle de Tema */}
            <div className="flex-shrink-0">
              <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
          </div>
        </header>
        
        {/* Conteúdo */}
        <div className="p-4 sm:p-6 lg:p-8 pb-20 sm:pb-8">{renderContent()}</div>
      </main>
    </div>
  );
}