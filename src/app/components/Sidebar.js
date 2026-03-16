"use client";

import { useState } from 'react';
import { 
  Home as HomeIcon, UserPlus, LayoutDashboard, Package, Calendar, 
  Clock, HelpCircle, ChevronDown, ChevronRight, Users, Building2, 
  X, ClipboardList, Boxes, Wrench
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
      { id: 'cadastro-pessoas', label: 'Pessoas', icon: Users },
      { id: 'cadastro-empresas', label: 'Empresas', icon: Building2 },
    ]
  },
  { id: 'ordem-servico', label: 'Ordem de Serviço', icon: ClipboardList },
  { id: 'painel', label: 'Painel', icon: LayoutDashboard },
  { 
    id: 'estoque', 
    label: 'Estoque', 
    icon: Package,
    hasDropdown: true,
    subItems: [
      { id: 'estoque-materiais', label: 'Materiais', icon: Boxes },
      { id: 'estoque-estruturas', label: 'Estruturas', icon: Wrench },
    ]
  },
  { id: 'eventos', label: 'Eventos', icon: Calendar },
  { id: 'historico', label: 'Histórico', icon: Clock },
  { id: 'ajuda', label: 'Ajuda', icon: HelpCircle },
];

// Logo flutuante com menu horizontal (quando sidebar colapsada) - APENAS DESKTOP
export function FloatingNav({ sidebarCollapsed, setSidebarCollapsed, activeTab, setActiveTab, darkMode }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [logoHovered, setLogoHovered] = useState(false);

  const handleMenuClick = (item) => {
    if (item.hasDropdown) {
      setOpenDropdown(openDropdown === item.id ? null : item.id);
    } else {
      setActiveTab(item.id);
      setOpenDropdown(null);
    }
  };

  const handleSubItemClick = (subId) => {
    setActiveTab(subId);
    setOpenDropdown(null);
  };

  // Só renderiza em desktop (lg+)
  if (!sidebarCollapsed) return null;

  return (
    <div className="hidden lg:block">
      {/* Logo flutuante */}
      <div 
        className="fixed top-4 left-4 z-50"
        onMouseEnter={() => setLogoHovered(true)}
        onMouseLeave={() => setLogoHovered(false)}
      >
        <div className="relative">
          <div 
            className={`w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30 cursor-pointer transition-all duration-300
              ${logoHovered ? 'scale-110 rotate-0' : 'scale-100'}`}
            style={{ transform: logoHovered ? 'rotate(0deg) scale(1.1)' : 'rotate(-3deg)' }}
          >
            <VivereIcon className="w-7 h-7 text-black" />
          </div>
          
          {/* Botão expandir */}
          <button
            onClick={() => setSidebarCollapsed(false)}
            className={`absolute -right-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
              ${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-300'} border shadow-lg
              ${logoHovered ? 'opacity-100 translate-x-3 scale-100' : 'opacity-0 translate-x-0 scale-75 pointer-events-none'}`}
          >
            <ChevronRight className="w-3 h-3 text-orange-500" />
          </button>
        </div>
      </div>

      {/* Menu horizontal centralizado */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40">
        <div className={`backdrop-blur-xl border rounded-2xl shadow-2xl px-2 py-1.5 transition-all duration-300
          ${darkMode ? 'bg-zinc-900/95 border-zinc-800 shadow-black/50' : 'bg-white/95 border-zinc-200 shadow-black/10'}`}>
          <div className="flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (item.subItems?.some(sub => sub.id === activeTab));
              const isDropdownOpen = openDropdown === item.id;
              
              return (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => handleMenuClick(item)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl whitespace-nowrap transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-black shadow-lg shadow-orange-500/30' 
                        : darkMode ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                      }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-black' : ''}`} />
                    <span className="font-medium text-sm">{item.label}</span>
                    {item.hasDropdown && <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />}
                  </button>
                  
                  {item.hasDropdown && isDropdownOpen && (
                    <div className={`absolute top-full left-0 mt-2 border rounded-xl shadow-xl p-2 min-w-48 z-50 transition-all duration-200
                      ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                      {item.subItems.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = activeTab === sub.id;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => handleSubItemClick(sub.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm
                              ${isSubActive ? 'bg-orange-500/20 text-orange-500' : darkMode ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'}`}
                          >
                            <SubIcon className="w-4 h-4" />
                            <span>{sub.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ 
  isMobile = false, 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  sidebarCollapsed, 
  setSidebarCollapsed,
  activeTab,
  setActiveTab,
  openDropdowns = {},
  setOpenDropdowns,
  user,
  onLogout,
  darkMode
}) {
  // State local para dropdowns se não for passado via props
  const [localOpenDropdowns, setLocalOpenDropdowns] = useState({});
  const dropdowns = setOpenDropdowns ? openDropdowns : localOpenDropdowns;
  const setDropdowns = setOpenDropdowns || setLocalOpenDropdowns;

  const toggleDropdown = (dropdownId) => {
    setDropdowns(prev => ({
      ...prev,
      [dropdownId]: !prev[dropdownId]
    }));
  };

  const handleMenuClick = (item) => {
    if (item.hasDropdown) {
      toggleDropdown(item.id);
    } else {
      setActiveTab(item.id);
      if (isMobile) setMobileMenuOpen(false);
    }
  };

  const handleSubItemClick = (subItem) => {
    setActiveTab(subItem.id);
    if (isMobile) setMobileMenuOpen(false);
  };

  // Desktop: sidebar com transição suave de largura e opacidade
  if (!isMobile) {
    return (
      <aside 
        className={`fixed left-0 top-0 h-screen z-50 transition-all duration-500 ease-out
          ${sidebarCollapsed ? 'w-0 opacity-0 pointer-events-none' : 'w-72 opacity-100'}
          ${darkMode 
            ? 'bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border-orange-500/20' 
            : 'bg-gradient-to-b from-white via-zinc-50 to-white border-orange-300/30'}
          border-r overflow-hidden`}
        style={{ boxShadow: sidebarCollapsed ? 'none' : (darkMode ? '4px 0 30px rgba(249, 115, 22, 0.1)' : '4px 0 30px rgba(0, 0, 0, 0.05)') }}
      >
        <div className={`w-72 h-full flex flex-col transition-all duration-500 ease-out ${sidebarCollapsed ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'}`}>
          {/* Logo */}
          <div className={`p-6 border-b relative overflow-hidden flex-shrink-0 ${darkMode ? 'border-orange-500/20' : 'border-orange-300/30'}`}>
            <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-r from-orange-600/10 to-transparent' : 'bg-gradient-to-r from-orange-100 to-transparent'}`} />
            <div className="relative flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30" style={{ transform: 'rotate(-3deg)' }}>
                <VivereIcon className="w-7 h-7 text-black" />
              </div>
              <div className="overflow-hidden">
                <h1 className={`text-xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-zinc-900'}`}>VIVERE</h1>
                <p className="text-orange-500 text-xs font-medium tracking-widest">INFRA MANAGER</p>
              </div>
            </div>
            
            <button
              onClick={() => setSidebarCollapsed(true)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
                ${darkMode ? 'bg-zinc-800 hover:bg-orange-500 text-zinc-400' : 'bg-zinc-200 hover:bg-orange-500 text-zinc-600'} hover:text-black`}
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (item.subItems?.some(sub => sub.id === activeTab));
              const isDropdownOpen = dropdowns[item.id];
              
              return (
                <div key={item.id}>
                  <button
                    onClick={() => handleMenuClick(item)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden
                      ${isActive 
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-black shadow-lg shadow-orange-500/30' 
                        : darkMode ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/80' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'}`}
                  >
                    {!isActive && <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
                    <Icon className={`w-5 h-5 flex-shrink-0 relative z-10 ${isActive ? 'text-black' : ''}`} />
                    <span className="font-semibold text-sm relative z-10 flex-1 text-left">{item.label}</span>
                    {item.hasDropdown && <ChevronDown className={`w-4 h-4 relative z-10 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />}
                  </button>

                  {item.hasDropdown && (
                    <div className={`overflow-hidden transition-all duration-300 ease-out ${isDropdownOpen ? 'max-h-48 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                      <div className="ml-4 pl-4 border-l-2 border-orange-500/30 space-y-1">
                        {item.subItems.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubActive = activeTab === subItem.id;
                          return (
                            <button
                              key={subItem.id}
                              onClick={() => handleSubItemClick(subItem)}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm
                                ${isSubActive 
                                  ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30' 
                                  : darkMode ? 'text-zinc-500 hover:text-orange-400 hover:bg-zinc-800/50' : 'text-zinc-500 hover:text-orange-500 hover:bg-zinc-100'}`}
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
          <div className={`p-4 border-t flex-shrink-0 ${darkMode ? 'border-orange-500/20' : 'border-orange-300/30'}`}>
            <div className={`rounded-xl p-4 relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-zinc-800 to-zinc-900' : 'bg-gradient-to-br from-zinc-100 to-zinc-200'}`}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full blur-2xl" />
              <div className="relative">
                <p className={`text-xs mb-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Conectado como</p>
                <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{user?.name || 'Usuário'}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-500 text-xs">Online</span>
                  </div>
                  <button onClick={onLogout} className={`text-xs transition-colors ${darkMode ? 'text-zinc-500 hover:text-orange-500' : 'text-zinc-500 hover:text-orange-500'}`}>Sair</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // Mobile
  return (
    <aside className={`fixed inset-0 z-50 ${!mobileMenuOpen ? 'pointer-events-none' : ''}`}>
      {/* Overlay */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      
      {/* Sidebar */}
      <div 
        className={`absolute left-0 top-0 h-screen w-72 flex flex-col transition-transform duration-300 ease-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          ${darkMode 
            ? 'bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border-orange-500/20' 
            : 'bg-gradient-to-b from-white via-zinc-50 to-white border-orange-300/30'}
          border-r`}
        style={{ boxShadow: darkMode ? '4px 0 30px rgba(249, 115, 22, 0.1)' : '4px 0 30px rgba(0, 0, 0, 0.05)' }}
      >
        {/* Logo */}
        <div className={`p-6 border-b relative overflow-hidden flex-shrink-0 ${darkMode ? 'border-orange-500/20' : 'border-orange-300/30'}`}>
          <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-r from-orange-600/10 to-transparent' : 'bg-gradient-to-r from-orange-100 to-transparent'}`} />
          <div className="relative flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30" style={{ transform: 'rotate(-3deg)' }}>
              <VivereIcon className="w-7 h-7 text-black" />
            </div>
            <div className="overflow-hidden">
              <h1 className={`text-xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-zinc-900'}`}>VIVERE</h1>
              <p className="text-orange-500 text-xs font-medium tracking-widest">INFRA MANAGER</p>
            </div>
          </div>
          
          <button
            onClick={() => setMobileMenuOpen(false)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
              ${darkMode ? 'bg-zinc-800 hover:bg-orange-500 text-zinc-400' : 'bg-zinc-200 hover:bg-orange-500 text-zinc-600'} hover:text-black`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.subItems?.some(sub => sub.id === activeTab));
            const isDropdownOpen = dropdowns[item.id];
            
            return (
              <div key={item.id}>
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden
                    ${isActive 
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-black shadow-lg shadow-orange-500/30' 
                      : darkMode ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/80' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'}`}
                >
                  {!isActive && <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
                  <Icon className={`w-5 h-5 flex-shrink-0 relative z-10 ${isActive ? 'text-black' : ''}`} />
                  <span className="font-semibold text-sm relative z-10 flex-1 text-left">{item.label}</span>
                  {item.hasDropdown && <ChevronDown className={`w-4 h-4 relative z-10 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />}
                </button>

                {item.hasDropdown && (
                  <div className={`overflow-hidden transition-all duration-300 ease-out ${isDropdownOpen ? 'max-h-48 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <div className="ml-4 pl-4 border-l-2 border-orange-500/30 space-y-1">
                      {item.subItems.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSubActive = activeTab === subItem.id;
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => handleSubItemClick(subItem)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm
                              ${isSubActive 
                                ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30' 
                                : darkMode ? 'text-zinc-500 hover:text-orange-400 hover:bg-zinc-800/50' : 'text-zinc-500 hover:text-orange-500 hover:bg-zinc-100'}`}
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
        <div className={`p-4 border-t flex-shrink-0 ${darkMode ? 'border-orange-500/20' : 'border-orange-300/30'}`}>
          <div className={`rounded-xl p-4 relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-zinc-800 to-zinc-900' : 'bg-gradient-to-br from-zinc-100 to-zinc-200'}`}>
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full blur-2xl" />
            <div className="relative">
              <p className={`text-xs mb-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Conectado como</p>
              <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{user?.name || 'Usuário'}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-500 text-xs">Online</span>
                </div>
                <button onClick={onLogout} className={`text-xs transition-colors ${darkMode ? 'text-zinc-500 hover:text-orange-500' : 'text-zinc-500 hover:text-orange-500'}`}>Sair</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}