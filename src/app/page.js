"use client";

import { useState } from 'react';
import { Home as HomeIcon, Users, Building2, ClipboardList, LayoutDashboard, Package, Calendar, Clock, HelpCircle, Menu } from 'lucide-react';

import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CadastroOSPage from './pages/CadastroOSPage';
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
  const [cadastroOpen, setCadastroOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = (userData) => { setUser(userData); setIsLoggedIn(true); };
  const handleLogout = () => { setUser(null); setIsLoggedIn(false); setActiveTab('home'); };

  if (!isLoggedIn) return <LoginPage onLogin={handleLogin} />;

  const config = pageConfig[activeTab] || pageConfig['home'];
  const sidebarProps = { mobileMenuOpen, setMobileMenuOpen, sidebarCollapsed, setSidebarCollapsed, activeTab, setActiveTab, cadastroOpen, setCadastroOpen, user, onLogout: handleLogout };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomePage setActiveTab={setActiveTab} setCadastroOpen={setCadastroOpen} />;
      case 'cadastro-os': return <CadastroOSPage />;
      case 'painel': return <PainelPage />;
      case 'estoque': return <EstoquePage />;
      default: return <GenericPage title={config.title} description={config.description} icon={config.icon} />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex font-sans">
      <div className="hidden lg:block"><Sidebar {...sidebarProps} /></div>
      <div className="lg:hidden"><Sidebar isMobile {...sidebarProps} /></div>

      <main className={`flex-1 min-h-screen transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
        <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-orange-500/10">
          <div className="px-6 py-4 flex items-center justify-between">
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden w-10 h-10 rounded-xl bg-zinc-800 hover:bg-orange-500 text-zinc-400 hover:text-black flex items-center justify-center transition-all">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden lg:block">
              <h2 className="text-2xl font-bold text-white">{config.title}</h2>
              <p className="text-zinc-500 text-sm">{config.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <input type="text" placeholder="Buscar OS, evento..." className="hidden md:block w-64 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/50" />
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-black font-bold shadow-lg shadow-orange-500/30 cursor-pointer hover:scale-105 transition-transform">
                {user?.name?.charAt(0) || 'C'}
              </div>
            </div>
          </div>
          <div className="lg:hidden px-6 pb-4">
            <h2 className="text-xl font-bold text-white">{config.title}</h2>
            <p className="text-zinc-500 text-sm">{config.description}</p>
          </div>
        </header>
        <div className="p-6 lg:p-8">{renderContent()}</div>
      </main>
    </div>
  );
}
