"use client";

import { useState, useEffect } from 'react';
import { FileText, ClipboardList, PartyPopper, Wrench, MessageSquare, Save, CheckCircle, Truck, CalendarDays, Star, Building, User, Phone, MapPin, Clock, Calendar, CalendarClock, Plus, Trash2, Package } from 'lucide-react';
import { estruturas } from '../data/estruturas';

export default function CadastroOSPage() {
  const [formData, setFormData] = useState({
    numeroOS: '', tipoEvento: 'grande-evento', fornecedor: '', dataOS: '',
    nomeEvento: '', solicitante: '', dataEvento: '', responsavelEvento: '',
    localEvento: '', contatoResponsavel: '', horarioEvento: '',
    dataHoraInicioMontagem: '', responsavelOS: '', dataHoraEntregaMontagem: '',
    contatoOS: '', dataHoraDesmontagem: '', observacoes: ''
  });

  const [estruturasSelecionadas, setEstruturasSelecionadas] = useState([]);
  const [tipoEstrutura, setTipoEstrutura] = useState('tenda');
  const [subtipoEstrutura, setSubtipoEstrutura] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormData(prev => ({ ...prev, dataOS: new Date().toISOString().split('T')[0] }));
  }, []);

  useEffect(() => {
    if (estruturas[tipoEstrutura]?.tipos?.length > 0) {
      setSubtipoEstrutura(estruturas[tipoEstrutura].tipos[0].id);
    }
  }, [tipoEstrutura]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const adicionarEstrutura = () => {
    if (!subtipoEstrutura) return;
    const tipo = estruturas[tipoEstrutura];
    const subtipo = tipo.tipos.find(t => t.id === subtipoEstrutura);
    if (subtipo && !estruturasSelecionadas.find(e => e.id === subtipo.id)) {
      setEstruturasSelecionadas([...estruturasSelecionadas, { ...subtipo, icon: tipo.icon }]);
    }
  };

  const removerEstrutura = (id) => setEstruturasSelecionadas(estruturasSelecionadas.filter(e => e.id !== id));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => { setIsSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }, 1500);
  };

  const tiposEvento = [
    { value: 'grande-evento', label: 'Grande Evento' },
    { value: 'pequeno-evento', label: 'Pequeno Evento' },
    { value: 'evento-privado', label: 'Evento Privado' },
    { value: 'ppd', label: 'PPD' },
    { value: 'projeto', label: 'Projeto' },
  ];

  const InputField = ({ label, name, type = 'text', placeholder, icon: Icon, required = false, colSpan = 1 }) => (
    <div className={colSpan === 2 ? 'md:col-span-2' : ''}>
      <label className="block text-sm font-medium text-zinc-400 mb-2">{label} {required && <span className="text-orange-500">*</span>}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />}
        <input type={type} name={name} value={formData[name]} onChange={handleChange} placeholder={placeholder} required={required}
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20`} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <FileText className="w-6 h-6 text-black" />
          </div>
          <div><h2 className="text-2xl font-bold text-white">Nova Ordem de Serviço</h2><p className="text-zinc-500 text-sm">Preencha os dados do evento e montagem</p></div>
        </div>
        {saved && <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-xl"><CheckCircle className="w-5 h-5 text-green-500" /><span className="text-green-400 font-medium">OS salva com sucesso!</span></div>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identificação */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><ClipboardList className="w-5 h-5 text-orange-500" />Identificação da OS</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="block text-sm font-medium text-zinc-400 mb-2">Nº da OS <span className="text-orange-500">*</span></label><input type="text" name="numeroOS" value={formData.numeroOS} onChange={handleChange} placeholder="001" required className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50" /></div>
            <div><label className="block text-sm font-medium text-zinc-400 mb-2">Tipo de Evento <span className="text-orange-500">*</span></label><select name="tipoEvento" value={formData.tipoEvento} onChange={handleChange} className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-orange-500/50">{tiposEvento.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select></div>
            <InputField label="Data da OS" name="dataOS" type="date" icon={CalendarDays} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"><InputField label="Fornecedor" name="fornecedor" placeholder="Nome do fornecedor" icon={Truck} /></div>
        </div>

        {/* Dados do Evento */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><PartyPopper className="w-5 h-5 text-orange-500" />Dados do Evento</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Nome do Evento" name="nomeEvento" placeholder="Ex: Festival de Inverno 2024" icon={Star} required colSpan={2} />
            <InputField label="Solicitante (Secretaria/Prefeitura)" name="solicitante" placeholder="Ex: Secretaria de Cultura" icon={Building} required />
            <InputField label="Data do Evento" name="dataEvento" type="date" icon={Calendar} required />
            <InputField label="Responsável do Evento" name="responsavelEvento" placeholder="Nome do responsável" icon={User} required />
            <InputField label="Contato do Responsável" name="contatoResponsavel" placeholder="(00) 00000-0000" icon={Phone} />
            <InputField label="Local do Evento" name="localEvento" placeholder="Ex: Praça Central" icon={MapPin} required />
            <InputField label="Horário do Evento" name="horarioEvento" type="time" icon={Clock} />
          </div>
        </div>

        {/* Montagem/Desmontagem */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Wrench className="w-5 h-5 text-orange-500" />Informações de Montagem e Desmontagem</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Data/Hora Início Montagem" name="dataHoraInicioMontagem" type="datetime-local" icon={CalendarClock} required />
            <InputField label="Responsável da OS" name="responsavelOS" placeholder="Nome do responsável técnico" icon={User} required />
            <InputField label="Data/Hora Entrega Montagem" name="dataHoraEntregaMontagem" type="datetime-local" icon={CalendarClock} required />
            <InputField label="Contato da OS" name="contatoOS" placeholder="(00) 00000-0000" icon={Phone} />
            <InputField label="Data/Hora Desmontagem" name="dataHoraDesmontagem" type="datetime-local" icon={CalendarClock} required colSpan={2} />
          </div>
        </div>

        {/* Estruturas do Evento */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Package className="w-5 h-5 text-orange-500" />Estruturas do Evento</h3>
          
          {/* Seletor */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <select value={tipoEstrutura} onChange={(e) => setTipoEstrutura(e.target.value)} className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-orange-500/50">
              {Object.entries(estruturas).map(([key, val]) => <option key={key} value={key}>{val.icon} {val.nome}</option>)}
            </select>
            <select value={subtipoEstrutura} onChange={(e) => setSubtipoEstrutura(e.target.value)} className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-orange-500/50">
              {estruturas[tipoEstrutura]?.tipos.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
            </select>
            <button type="button" onClick={adicionarEstrutura} className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-bold rounded-xl flex items-center gap-2 transition-all">
              <Plus className="w-5 h-5" /> Adicionar
            </button>
          </div>

          {/* Lista de Estruturas */}
          {estruturasSelecionadas.length === 0 ? (
            <div className="p-8 border-2 border-dashed border-zinc-800 rounded-xl text-center">
              <Package className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-500">Nenhuma estrutura adicionada</p>
              <p className="text-zinc-600 text-sm">Selecione o tipo e clique em adicionar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {estruturasSelecionadas.map((est) => (
                <div key={est.id} className="bg-zinc-800/50 rounded-xl border border-zinc-700 overflow-hidden">
                  <div className="p-4 border-b border-zinc-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{est.icon}</span>
                      <div>
                        <h4 className="text-white font-semibold">{est.nome}</h4>
                        <p className="text-zinc-500 text-sm">{est.descricao}</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => removerEstrutura(est.id)} className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4 bg-zinc-900/50">
                    <p className="text-orange-500 text-xs font-medium mb-3 uppercase tracking-wide">Materiais Requisitados</p>
                    <ul className="space-y-2">
                      {est.materiais.map((mat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-orange-500 mt-0.5">•</span>
                          <span className="text-zinc-300"><span className="text-white font-medium">{mat.qtd} x</span> {mat.nome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              
              {/* Resumo Total */}
              <div className="mt-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                <p className="text-orange-400 font-medium mb-2">📦 Resumo Total de Materiais</p>
                <p className="text-zinc-400 text-sm">{estruturasSelecionadas.length} estrutura(s) selecionada(s) • {estruturasSelecionadas.reduce((acc, e) => acc + e.materiais.reduce((a, m) => a + m.qtd, 0), 0)} itens no total</p>
              </div>
            </div>
          )}
        </div>

        {/* Observações */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><MessageSquare className="w-5 h-5 text-orange-500" />Observações</h3>
          <textarea name="observacoes" value={formData.observacoes} onChange={handleChange} placeholder="Informações adicionais sobre a montagem, materiais necessários, requisitos especiais..." rows={4}
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 resize-none" />
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-4">
          <button type="button" className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-all">Cancelar</button>
          <button type="submit" disabled={isSaving} className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-bold rounded-xl shadow-lg shadow-orange-500/30 flex items-center gap-2 disabled:opacity-70">
            {isSaving ? <><div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />Salvando...</> : <><Save className="w-5 h-5" />Salvar OS</>}
          </button>
        </div>
      </form>
    </div>
  );
}
