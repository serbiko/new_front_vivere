"use client";

import { useState } from 'react';
import { 
  Users, User, FileText, Calendar, Phone, Mail, 
  MapPin, Briefcase, Building, Save, CheckCircle, 
  Contact, Building2
} from 'lucide-react';

export default function CadastroPessoasPage() {
  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    cpf: '',
    celular: '',
    email: '',
    endereco: '',
    cargo: '',
    empresa: '',
    genero: 'nao-informado'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Simula o tempo de salvamento
    setTimeout(() => { 
      setIsSaving(false); 
      setSaved(true); 
      
      // Limpa o formulário após salvar (opcional, depende do seu fluxo)
      setFormData({
        nome: '', dataNascimento: '', cpf: '', celular: '', email: '', 
        endereco: '', cargo: '', empresa: '', genero: 'nao-informado'
      });

      setTimeout(() => setSaved(false), 3000); 
    }, 1500);
  };

  const opcoesGenero = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'feminino', label: 'Feminino' },
    { value: 'outro', label: 'Outro' },
    { value: 'nao-informado', label: 'Prefiro não informar' },
  ];

  // Reaproveitando o seu InputField perfeito da página de OS
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
            <Users className="w-6 h-6 text-black" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Cadastro de Pessoa</h2>
            <p className="text-zinc-500 text-sm">Adicione um novo colaborador, cliente ou parceiro</p>
          </div>
        </div>
        {saved && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-xl animate-in fade-in slide-in-from-top-4">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-green-400 font-medium">Cadastro salvo com sucesso!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Dados Pessoais */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-orange-500" />
            Dados Pessoais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Nome Completo" name="nome" placeholder="Ex: João da Silva" icon={User} required colSpan={2} />
            
            <InputField label="CPF" name="cpf" placeholder="000.000.000-00" icon={FileText} required />
            
            <InputField label="Data de Nascimento" name="dataNascimento" type="date" icon={Calendar} required />
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-400 mb-2">Gênero</label>
              <select 
                name="genero" 
                value={formData.genero} 
                onChange={handleChange} 
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
              >
                {opcoesGenero.map(g => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Contato e Endereço */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Contact className="w-5 h-5 text-orange-500" />
            Contato e Endereço
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Celular" name="celular" placeholder="(00) 00000-0000" icon={Phone} required />
            
            <InputField label="E-mail" name="email" type="email" placeholder="email@exemplo.com" icon={Mail} />
            
            <InputField label="Endereço Completo" name="endereco" placeholder="Rua, Número, Bairro, Cidade - UF" icon={MapPin} colSpan={2} />
          </div>
        </div>

        {/* Informações Profissionais */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-orange-500" />
            Informações Profissionais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Empresa" name="empresa" placeholder="Nome da empresa que trabalha" icon={Building2} required />
            
            <InputField label="Cargo / Função" name="cargo" placeholder="Ex: Produtor, Técnico de Som" icon={Briefcase} required />
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-4">
          <button type="button" className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-all">
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
              <><Save className="w-5 h-5" /> Salvar Cadastro</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}