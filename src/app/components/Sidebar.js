"use client";

import { 
  Home as HomeIcon, UserPlus, LayoutDashboard, Package, Calendar, 
  Clock, HelpCircle, ChevronDown, ChevronRight, Users, Building2, 
  Menu, X, ClipboardList 
} from 'lucide-react';
import VivereIcon from './VivereIcon';

export const menuItems = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { 
    id: 'cadastro', 
    label: 'Cadastro', 
    icon: UserPlus,
    hasDropdown: true,
    subItems: [
      { id: 'cadastro-pessoas', label: 'Cadastro de Pessoas', icon: Users },
      { id: 'cadastro-empresas', label: 'Cadastro de Empresas', icon: Building2 },
      { id: 'cadastro-os', label: 'Cadastro de OS', icon: ClipboardList },
    ]
  },
  { id: 'painel', label: 'Painel', icon: LayoutDashboard },
  { id: 'estoque', label: 'Estoque', icon: Package },
  { id: 'evento', label: 'Evento', icon: Calendar },
  { id: 'historico', label: 'Histórico', icon: Clock },
  { id: 'ajuda', label: 'Ajuda', icon: HelpCircle },
];

export default function Sidebar({ 
  isMobile = false, 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  sidebarCollapsed, 
  setSidebarCollapsed,
  activeTab,
  setActiveTab,
  cadastroOpen,
  setCadastroOpen,
  user,
  onLogout
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
    <aside className={`${isMobile ? 'fixed inset-0 z-50' : 'relative'} ${isMobile && !mobileMenuOpen ? 'pointer-events-none' : ''}`}>
      {/* Overlay mobile */}
      {isMobile && (
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar container - FIXA */}
      <div 
        className={`
          ${isMobile ? 'absolute left-0 top-0' : 'fixed left-0 top-0'} 
          h-screen
          ${sidebarCollapsed && !isMobile ? 'w-20' : 'w-72'}
          ${isMobile ? (mobileMenuOpen ? 'translate-x-0' : '-translate-x-full') : ''}
          bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950
          border-r border-orange-500/20
          flex flex-col
          transition-all duration-300 ease-out
          z-50
        `}
        style={{ boxShadow: '4px 0 30px rgba(249, 115, 22, 0.1)' }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-orange-500/20 relative overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-transparent" />
          <div className="relative flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30" style={{ transform: 'rotate(-3deg)' }}>
              <VivereIcon className="w-7 h-7 text-black" />
            </div>
            {(!sidebarCollapsed || isMobile) && (
              <div className="overflow-hidden">
                <h1 className="text-xl font-black text-white tracking-tight">VIVERE</h1>
                <p className="text-orange-500 text-xs font-medium tracking-widest">INFRA MANAGER</p>
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

        {/* Navigation - scrollbar invisível */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.subItems?.some(sub => sub.id === activeTab));
            
            return (
              <div key={item.id}>
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden
                    ${isActive ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-black shadow-lg shadow-orange-500/30' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/80'}`}
                >
                  {!isActive && <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
                  <Icon className={`w-5 h-5 flex-shrink-0 relative z-10 ${isActive ? 'text-black' : ''}`} />
                  {(!sidebarCollapsed || isMobile) && (
                    <>
                      <span className="font-semibold text-sm relative z-10 flex-1 text-left">{item.label}</span>
                      {item.hasDropdown && <ChevronDown className={`w-4 h-4 relative z-10 transition-transform duration-300 ${cadastroOpen ? 'rotate-180' : ''}`} />}
                    </>
                  )}
                </button>

                {item.hasDropdown && (!sidebarCollapsed || isMobile) && (
                  <div className={`overflow-hidden transition-all duration-300 ease-out ${cadastroOpen ? 'max-h-48 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <div className="ml-4 pl-4 border-l-2 border-orange-500/30 space-y-1">
                      {item.subItems.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSubActive = activeTab === subItem.id;
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => handleSubItemClick(subItem)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm
                              ${isSubActive ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'text-zinc-500 hover:text-orange-400 hover:bg-zinc-800/50'}`}
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

        {/* User info */}
        {(!sidebarCollapsed || isMobile) && (
          <div className="p-4 border-t border-orange-500/20 flex-shrink-0">
            <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full blur-2xl" />
              <div className="relative">
                <p className="text-zinc-400 text-xs mb-1">Conectado como</p>
                <p className="text-white font-semibold text-sm">{user?.name || 'Usuário'}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-400 text-xs">Online</span>
                  </div>
                  <button onClick={onLogout} className="text-xs text-zinc-500 hover:text-orange-500 transition-colors">Sair</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
