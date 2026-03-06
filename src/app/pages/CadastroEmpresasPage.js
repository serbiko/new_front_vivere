"use client";

import { useState } from 'react';
import { 
  Building2, Building, FileText, Phone, Mail, 
  MapPin, Save, CheckCircle 
} from 'lucide-react';

export default function CadastroEmpresasPage({ darkMode }) {
  const [formData, setFormData] = useState({
    nomeEmpresa: '',
    cnpj: '',
    telefone: '',
    email: '',
    endereco: ''
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => { 
      setIsSaving(false); 
      setSaved(true); 
      setFormData({
        nomeEmpresa: '', cnpj: '', telefone: '', email: '', endereco: ''
      });
      setTimeout(() => setSaved(false), 3000); 
    }, 1500);
  };

  const InputField = ({ label, name, type = 'text', placeholder, icon: Icon, required = false, colSpan = 1 }) => (
    <div className={colSpan === 2 ? 'md:col-span-2' : ''}>
      <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      <div className="relative">
        {Icon && <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />}
        <input 
          type={type} 
          name={name} 
          value={formData[name]} 
          onChange={handleChange} 
          placeholder={placeholder} 
          required={required}
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 border rounded-xl focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-colors duration-300
            ${darkMode 
              ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600' 
              : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'}`} 
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Building2 className="w-6 h-6 text-black" />
          </div>
          <div>
            <h2 className={`text-2xl font-bold transition-colors duration-300 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Cadastro de Empresa</h2>
            <p className={`text-sm transition-colors duration-300 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Cadastre fornecedores, clientes ou empresas parceiras para seus eventos</p>
          </div>
        </div>
        
        {saved && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-xl">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-green-400 font-medium">Empresa salva com sucesso!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Dados da Empresa */}
        <div className={`rounded-2xl border p-6 transition-colors duration-300
          ${darkMode 
            ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800' 
            : 'bg-white border-zinc-200 shadow-sm'}`}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            <Building className="w-5 h-5 text-orange-500" />
            Informações Cadastrais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField 
              label="Nome da Empresa" 
              name="nomeEmpresa" 
              placeholder="Ex: Vivere Eventos LTDA" 
              icon={Building} 
              required 
              colSpan={2} 
            />
            
            <InputField 
              label="CNPJ" 
              name="cnpj" 
              placeholder="00.000.000/0000-00" 
              icon={FileText} 
              required 
            />
            
            <InputField 
              label="Telefone Comercial" 
              name="telefone" 
              placeholder="(00) 0000-0000" 
              icon={Phone} 
              required 
            />
            
            <InputField 
              label="E-mail de Contato" 
              name="email" 
              type="email" 
              placeholder="contato@empresa.com.br" 
              icon={Mail} 
            />
            
            <InputField 
              label="Endereço Completo" 
              name="endereco" 
              placeholder="Rua, Número, Bairro, Cidade - UF" 
              icon={MapPin} 
              colSpan={2} 
            />
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-4">
          <button 
            type="button" 
            className={`px-6 py-3 font-medium rounded-xl transition-all duration-300
              ${darkMode 
                ? 'bg-zinc-800 hover:bg-zinc-700 text-white' 
                : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-900'}`}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            disabled={isSaving} 
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-bold rounded-xl shadow-lg shadow-orange-500/30 flex items-center gap-2 disabled:opacity-70 transition-all"
          >
            {isSaving ? (
              <><div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Salvando...</>
            ) : (
              <><Save className="w-5 h-5" /> Salvar Empresa</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}