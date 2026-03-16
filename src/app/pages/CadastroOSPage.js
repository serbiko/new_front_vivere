"use client";

import { useState, useEffect, useMemo } from 'react';
import { 
  FileText, ClipboardList, PartyPopper, Wrench, MessageSquare, Save, 
  CheckCircle, Truck, CalendarDays, Star, Building, User, Phone, MapPin, 
  Clock, Calendar, CalendarClock, Plus, Minus, Trash2, Package, AlertTriangle 
} from 'lucide-react';
import { estruturas, estoqueInicial } from '../data/estruturas';

export default function CadastroOSPage({ darkMode }) {
  const [formData, setFormData] = useState({
    numeroOS: '', tipoEvento: 'grande-evento', fornecedor: '', dataOS: '',
    nomeEvento: '', solicitante: '', dataEvento: '', responsavelEvento: '',
    localEvento: '', contatoResponsavel: '', horarioEvento: '',
    dataHoraInicioMontagem: '', responsavelOS: '', dataHoraEntregaMontagem: '',
    contatoOS: '', dataHoraDesmontagem: '', observacoes: ''
  });

  const [estruturasSelecionadas, setEstruturasSelecionadas] = useState([]);
  const [tipoEstrutura, setTipoEstrutura] = useState('tenda');
  const [subtipoEstrutura, setSubtipoEstrutura] = useState('tenda-10x10');
  const [qtdEstrutura, setQtdEstrutura] = useState(1);
  
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormData(prev => ({ ...prev, dataOS: new Date().toISOString().split('T')[0] }));
  }, []);

  // LÓGICA DE ESTOQUE CORRIGIDA: Baseado nos itens centrais (ex: lonas) para cada estrutura
  const limitesPorEstrutura = useMemo(() => {
    const getDisponivel = (id) => {
      const item = estoqueInicial.find(e => e.id === id);
      return item ? Math.max(0, item.total - item.emUso) : 0;
    };

    return {
      'tenda-10x10': getDisponivel(15),  // ID 15: Lona Tenda 10x10
      'tenda-8x8': getDisponivel(16),    // ID 16: Lona Tenda 8x8
      'tenda-6x6': getDisponivel(17),    // ID 17: Lona Tenda 6x6
      'tenda-4x4': getDisponivel(18),    // ID 18: Lona Tenda 4x4
      'galpao-20x40': getDisponivel(19), // ID 19: Lona Galpão 20x40
      'galpao-10x20': getDisponivel(20), // ID 20: Lona Galpão 10x20
      'palco-10x8': getDisponivel(23),   // ID 23: Lona Palco 10x8
      'palco-6x4': Math.floor(getDisponivel(1) / 12) // Palco sem lona, baseado em praticáveis (12 un)
    };
  }, []);

  const maxDisponivel = useMemo(() => {
    if (!subtipoEstrutura) return 1;

    // Limite da estrutura que tem no estoque base
    const limiteBase = limitesPorEstrutura[subtipoEstrutura] || 10;

    // Quanto dessa estrutura já foi colocada na lista de itens da OS
    const jaAdicionadas = estruturasSelecionadas
      .filter(e => e.id === subtipoEstrutura)
      .reduce((acc, curr) => acc + curr.qtd, 0);

    return Math.max(0, limiteBase - jaAdicionadas);
  }, [subtipoEstrutura, estruturasSelecionadas, limitesPorEstrutura]);

  // Se o máximo mudar e for menor que a quantidade atual (ou zerar), ajusta o contador
  useEffect(() => {
    if (qtdEstrutura > maxDisponivel) {
      setQtdEstrutura(maxDisponivel > 0 ? maxDisponivel : 0);
    } else if (qtdEstrutura === 0 && maxDisponivel > 0) {
      setQtdEstrutura(1);
    }
  }, [maxDisponivel, qtdEstrutura]);

  // Funções de atualização corrigidas (previne bugs ao mudar de estrutura principal para outra)
  const handleTipoChange = (e) => {
    const novoTipo = e.target.value;
    setTipoEstrutura(novoTipo);
    if (estruturas[novoTipo]?.tipos?.length > 0) {
      setSubtipoEstrutura(estruturas[novoTipo].tipos[0].id);
    }
    setQtdEstrutura(1);
  };

  const handleSubtipoChange = (e) => {
    setSubtipoEstrutura(e.target.value);
    setQtdEstrutura(1);
  };

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const adicionarEstrutura = () => {
    if (!subtipoEstrutura || maxDisponivel === 0 || qtdEstrutura === 0) return;
    const tipo = estruturas[tipoEstrutura];
    const subtipo = tipo?.tipos.find(t => t.id === subtipoEstrutura);
    
    if (subtipo) {
      // Agrupa quantidades se a estrutura já foi adicionada
      const index = estruturasSelecionadas.findIndex(e => e.id === subtipo.id);
      if (index >= 0) {
        const novasEstruturas = [...estruturasSelecionadas];
        novasEstruturas[index].qtd += qtdEstrutura;
        setEstruturasSelecionadas(novasEstruturas);
      } else {
        setEstruturasSelecionadas([...estruturasSelecionadas, { ...subtipo, icon: tipo.icon, qtd: qtdEstrutura }]);
      }
      setQtdEstrutura(1);
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

  const inputClass = `w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-colors duration-300
    ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600' : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'}`;

  const InputField = ({ label, name, type = 'text', placeholder, icon: Icon, required = false, colSpan = 1 }) => (
    <div className={colSpan === 2 ? 'md:col-span-2' : ''}>
      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      <div className="relative">
        {Icon && <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />}
        <input type={type} name={name} value={formData[name]} onChange={handleChange} placeholder={placeholder} required={required}
          className={`${inputClass} ${Icon ? 'pl-12' : ''}`} />
      </div>
    </div>
  );

  const sectionClass = `rounded-2xl border p-6 transition-colors duration-300
    ${darkMode ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <FileText className="w-6 h-6 text-black" />
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Nova Ordem de Serviço</h2>
            <p className={darkMode ? 'text-zinc-500' : 'text-zinc-500'}>Preencha os dados do evento e montagem</p>
          </div>
        </div>
        {saved && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-xl">
            <CheckCircle className="w-5 h-5 text-green-500" /><span className="text-green-500 font-medium">OS salva com sucesso!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identificação */}
        <div className={sectionClass}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            <ClipboardList className="w-5 h-5 text-orange-500" />Identificação da OS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Nº da OS <span className="text-orange-500">*</span></label>
              <input type="text" name="numeroOS" value={formData.numeroOS} onChange={handleChange} placeholder="001" required className={inputClass} />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Tipo de Evento <span className="text-orange-500">*</span></label>
              <select name="tipoEvento" value={formData.tipoEvento} onChange={handleChange} className={inputClass}>
                {tiposEvento.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <InputField label="Data da OS" name="dataOS" type="date" icon={CalendarDays} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <InputField label="Fornecedor" name="fornecedor" placeholder="Nome do fornecedor" icon={Truck} />
          </div>
        </div>

        {/* Dados do Evento */}
        <div className={sectionClass}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            <PartyPopper className="w-5 h-5 text-orange-500" />Dados do Evento
          </h3>
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
        <div className={sectionClass}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            <Wrench className="w-5 h-5 text-orange-500" />Informações de Montagem e Desmontagem
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Data/Hora Início Montagem" name="dataHoraInicioMontagem" type="datetime-local" icon={CalendarClock} required />
            <InputField label="Responsável da OS" name="responsavelOS" placeholder="Nome do responsável técnico" icon={User} required />
            <InputField label="Data/Hora Entrega Montagem" name="dataHoraEntregaMontagem" type="datetime-local" icon={CalendarClock} required />
            <InputField label="Contato da OS" name="contatoOS" placeholder="(00) 00000-0000" icon={Phone} />
            <InputField label="Data/Hora Desmontagem" name="dataHoraDesmontagem" type="datetime-local" icon={CalendarClock} required colSpan={2} />
          </div>
        </div>

        {/* Estruturas */}
        <div className={sectionClass}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            <Package className="w-5 h-5 text-orange-500" />Estruturas do Evento
          </h3>
          
          <div className="flex flex-col xl:flex-row gap-3 mb-6 items-start">
            <div className="flex-1 w-full">
              <select value={tipoEstrutura} onChange={handleTipoChange} className={`${inputClass} h-[52px]`}>
                {Object.entries(estruturas).map(([key, val]) => <option key={key} value={key}>{val.icon} {val.nome}</option>)}
              </select>
            </div>
            <div className="flex-1 w-full">
              <select value={subtipoEstrutura} onChange={handleSubtipoChange} className={`${inputClass} h-[52px]`}>
                {estruturas[tipoEstrutura]?.tipos.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
              </select>
            </div>
            
            {/* Bloco de Quantidade e Botão Adicionar */}
            <div className="flex flex-col gap-1 w-full xl:w-auto">
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-between border rounded-xl px-1 h-[52px] w-full xl:w-36 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-300'}`}>
                  <button 
                    type="button" 
                    onClick={() => setQtdEstrutura(Math.max(1, qtdEstrutura - 1))} 
                    disabled={qtdEstrutura <= 1} 
                    className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-zinc-400 hover:bg-zinc-800 hover:text-white' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'} disabled:opacity-30`}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className={`font-semibold text-center w-6 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                    {qtdEstrutura}
                  </span>
                  <button 
                    type="button" 
                    onClick={() => setQtdEstrutura(Math.min(maxDisponivel, qtdEstrutura + 1))} 
                    disabled={qtdEstrutura >= maxDisponivel || maxDisponivel === 0} 
                    className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-zinc-400 hover:bg-zinc-800 hover:text-white' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'} disabled:opacity-30`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button 
                  type="button" 
                  onClick={adicionarEstrutura} 
                  disabled={maxDisponivel === 0} 
                  className={`px-6 h-[52px] bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-bold rounded-xl flex items-center gap-2 transition-all ${maxDisponivel === 0 ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                >
                  <Plus className="w-5 h-5" /> Adicionar
                </button>
              </div>
              
              {/* Feedback de Estoque Visual */}
              <div className="text-center xl:text-left h-4 px-2">
                {maxDisponivel === 0 ? (
                  <span className="text-xs text-red-500 font-bold flex items-center gap-1 xl:justify-start justify-center"><AlertTriangle className="w-3 h-3"/> Esgotado no estoque</span>
                ) : maxDisponivel < 3 ? (
                  <span className="text-xs text-yellow-500 font-medium flex items-center gap-1 xl:justify-start justify-center"><AlertTriangle className="w-3 h-3"/> Estoque baixo (Máx: {maxDisponivel})</span>
                ) : (
                  <span className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Máx disp: {maxDisponivel}</span>
                )}
              </div>
            </div>
          </div>

          {estruturasSelecionadas.length === 0 ? (
            <div className={`p-8 border-2 border-dashed rounded-xl text-center ${darkMode ? 'border-zinc-800' : 'border-zinc-300'}`}>
              <Package className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-zinc-700' : 'text-zinc-400'}`} />
              <p className={darkMode ? 'text-zinc-500' : 'text-zinc-500'}>Nenhuma estrutura adicionada</p>
              <p className={`text-sm ${darkMode ? 'text-zinc-600' : 'text-zinc-400'}`}>Selecione o tipo, defina a quantidade e clique em adicionar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {estruturasSelecionadas.map((est) => (
                <div key={est.id} className={`rounded-xl border overflow-hidden ${darkMode ? 'bg-zinc-800/50 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>
                  <div className={`p-4 border-b flex items-center justify-between ${darkMode ? 'border-zinc-700' : 'border-zinc-200'}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{est.icon}</span>
                      <div>
                        <h4 className={`font-semibold text-lg flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                          <span className="px-2 py-0.5 rounded-md bg-orange-500 text-black font-black text-sm">{est.qtd}x</span>
                          {est.nome}
                        </h4>
                        <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{est.descricao}</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => removerEstrutura(est.id)} className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-zinc-500 hover:text-red-400 hover:bg-red-400/10' : 'text-zinc-400 hover:text-red-500 hover:bg-red-50'}`}>
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className={`p-4 ${darkMode ? 'bg-zinc-900/50' : 'bg-white'}`}>
                    <p className="text-orange-500 text-xs font-medium mb-3 uppercase tracking-wide">Total de Materiais Requisitados ({est.qtd} un.)</p>
                    <ul className="space-y-2">
                      {est.materiais.map((mat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-orange-500 mt-0.5">•</span>
                          <span className={darkMode ? 'text-zinc-300' : 'text-zinc-600'}><span className={`font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{mat.qtd * est.qtd} x</span> {mat.nome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              
              <div className="mt-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-orange-500 font-medium mb-1">📦 Resumo Total da OS</p>
                  <p className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                    {estruturasSelecionadas.reduce((acc, e) => acc + e.qtd, 0)} estrutura(s) • {' '}
                    {estruturasSelecionadas.reduce((acc, e) => acc + (e.qtd * e.materiais.reduce((a, m) => a + m.qtd, 0)), 0)} itens a separar no inventário
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Observações */}
        <div className={sectionClass}>
          <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            <MessageSquare className="w-5 h-5 text-orange-500" />Observações
          </h3>
          <textarea name="observacoes" value={formData.observacoes} onChange={handleChange} placeholder="Informações adicionais..." rows={4}
            className={`${inputClass} resize-none`} />
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-4">
          <button type="button" className={`px-6 py-3 font-medium rounded-xl transition-all ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-900'}`}>Cancelar</button>
          <button type="submit" disabled={isSaving} className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-bold rounded-xl shadow-lg shadow-orange-500/30 flex items-center gap-2 disabled:opacity-70">
            {isSaving ? <><div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />Salvando...</> : <><Save className="w-5 h-5" />Salvar OS</>}
          </button>
        </div>
      </form>
    </div>
  );
}