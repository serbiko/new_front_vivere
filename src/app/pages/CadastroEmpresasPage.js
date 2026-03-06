"use client";

import { useState } from 'react';
import { 
  Building2, Building, FileText, Phone, Mail, 
  MapPin, Save, CheckCircle 
} from 'lucide-react';

export default function CadastroEmpresasPage() {
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
    
    // Simulação do tempo de requisição para salvar no banco
    setTimeout(() => { 
      setIsSaving(false); 
      setSaved(true); 
      
      // Limpa o formulário após salvar
      setFormData({
        nomeEmpresa: '', cnpj: '', telefone: '', email: '', endereco: ''
      });

      // Oculta a mensagem de sucesso após 3 segundos
      setTimeout(() => setSaved(false), 3000); 
    }, 1500);
  };

  // Componente InputField idêntico ao do CadastroOSPage
  const InputField = ({ label, name, type = 'text', placeholder, icon: Icon, required = false, colSpan = 1 }) => (
    <div className={colSpan === 2 ? 'md:col-span-2' : ''}>
      <label className="block text-sm font-medium text-zinc-400 mb-2">
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      <div className="relative">
        {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />}
        <input 
          type={type} 
          name={name} 
          value={formData[name]} 
          onChange={handleChange} 
          placeholder={placeholder} 
          required={required}
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20`} 
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
            <h2 className="text-2xl font-bold text-white">Cadastro de Empresa</h2>
            <p className="text-zinc-500 text-sm">Cadastre fornecedores, clientes ou empresas parceiras para seus eventos</p>
          </div>
        </div>
        
        {/* Notificação de Sucesso */}
        {saved && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-xl animate-in fade-in slide-in-from-top-4">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-green-400 font-medium">Empresa salva com sucesso!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Dados da Empresa */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
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
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-all"
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