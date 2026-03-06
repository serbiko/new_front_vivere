"use client";

import { useState } from 'react';
import { Home as HomeIcon, Users, Building2, ClipboardList, LayoutDashboard, Package, Calendar, Clock, HelpCircle, Menu, ArrowLeft } from 'lucide-react';

import Sidebar, { FloatingNav } from './components/Sidebar';
import ThemeToggle from './components/ThemeToggle';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CadastroOSPage from './pages/CadastroOSPage';
import CadastroPessoasPage from './pages/CadastroPessoasPage';
import CadastroEmpresasPage from './pages/CadastroEmpresasPage';
import PainelPage from './pages/PainelPage';
import EstoquePage from './pages/EstoquePage';
import GenericPage from './pages/GenericPage';

const pageConfig = {
  'home': { title: 'Home', description: 'Visão geral do sistema', icon: HomeIcon },
  'cadastro-pessoas': { title: 'Cadastro de Pessoas', description: 'Cadastre colaboradores e contatos.', icon: Users },
  'cadastro-empresas': { title: 'Cadastro de Empresas', description: 'Cadastre órgãos públicos e clientes.', icon: Building2 },
  'cadastro-os': { title: 'Cadastro de OS', description: 'Crie e gerencie ordens de serviço.', icon: ClipboardList },
  'painel': { title: 'Painel de Controle', description: 'Métricas e indicadores de operações.', icon: LayoutDashboard },
  'estoque': { title: 'Gestão de Estoque', description: 'Controle de estruturas e materiais.', icon: Package },
  'evento': { title: 'Eventos', description: 'Agenda de montagens e eventos.', icon: Calendar },
  'historico': { title: 'Histórico', description: 'Histórico de ordens de serviço.', icon: Clock },
  'ajuda': { title: 'Central de Ajuda', description: 'Suporte e documentação interna.', icon: HelpCircle },
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [tabHistory, setTabHistory] = useState(['home']);
  const [cadastroOpen, setCadastroOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleLogin = (userData) => { setUser(userData); setIsLoggedIn(true); };
  const handleLogout = () => { setUser(null); setIsLoggedIn(false); setActiveTab('home'); setTabHistory(['home']); };

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
    cadastroOpen, setCadastroOpen, 
    user, onLogout: handleLogout,
    darkMode
  };

  const renderContent = () => {
    const props = { darkMode, setActiveTab: navigateTo, setCadastroOpen };
    switch (activeTab) {
      case 'home': return <HomePage {...props} />;
      case 'cadastro-os': return <CadastroOSPage darkMode={darkMode} />;
      case 'cadastro-pessoas': return <CadastroPessoasPage darkMode={darkMode} />;
      case 'cadastro-empresas': return <CadastroEmpresasPage darkMode={darkMode} />;
      case 'painel': return <PainelPage darkMode={darkMode} />;
      case 'estoque': return <EstoquePage darkMode={darkMode} />;
      default: return <GenericPage title={config.title} description={config.description} icon={config.icon} darkMode={darkMode} />;
    }
  };

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-500 ${darkMode ? 'bg-zinc-950' : 'bg-zinc-100'}`}>
      {/* Sidebar Desktop */}
      <div className="hidden lg:block"><Sidebar {...sidebarProps} /></div>
      
      {/* Sidebar Mobile */}
      <div className="lg:hidden"><Sidebar isMobile {...sidebarProps} /></div>

      {/* Navegação flutuante (quando sidebar colapsada) */}
      <FloatingNav 
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeTab={activeTab}
        setActiveTab={navigateTo}
        darkMode={darkMode}
      />

      {/* Main - com transição suave de margem */}
      <main className={`flex-1 min-h-screen transition-all duration-500 ease-out ${sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-72'}`}>
        <header className={`sticky top-0 z-30 backdrop-blur-xl border-b transition-all duration-500 
          ${darkMode ? 'bg-zinc-950/80 border-orange-500/10' : 'bg-white/80 border-orange-300/20'}
          ${sidebarCollapsed ? 'lg:pt-16' : ''}`}>
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Botão menu mobile */}
              <button onClick={() => setMobileMenuOpen(true)} className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                ${darkMode ? 'bg-zinc-800 text-zinc-400 hover:bg-orange-500' : 'bg-zinc-200 text-zinc-600 hover:bg-orange-500'} hover:text-black`}>
                <Menu className="w-5 h-5" />
              </button>
              
              {/* Botão Voltar */}
              {canGoBack && (
                <button 
                  onClick={goBack}
                  className={`hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 group
                    ${darkMode ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200'}`}
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="text-sm font-medium">Voltar</span>
                </button>
              )}
              
              {/* Título da página */}
              <div className="hidden lg:block">
                <h2 className={`text-2xl font-bold transition-colors duration-300 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{config.title}</h2>
                <p className={`text-sm transition-colors duration-300 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{config.description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <input type="text" placeholder="Buscar OS, evento..." 
                className={`hidden md:block w-64 px-4 py-2.5 border rounded-xl focus:outline-none focus:border-orange-500/50 transition-all duration-300
                  ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500' : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'}`} 
              />
              
              {/* Toggle de Tema */}
              <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
          </div>
          
          {/* Header mobile */}
          <div className="lg:hidden px-6 pb-4">
            <div className="flex items-center gap-3">
              {canGoBack && (
                <button onClick={goBack} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300
                  ${darkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-200 text-zinc-600'}`}>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <div>
                <h2 className={`text-xl font-bold transition-colors duration-300 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{config.title}</h2>
                <p className={`text-sm transition-colors duration-300 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{config.description}</p>
              </div>
            </div>
          </div>
        </header>
        
        <div className="p-6 lg:p-8">{renderContent()}</div>
      </main>
    </div>
  );
}