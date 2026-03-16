"use client";

import { useState } from 'react';
import { 
  HelpCircle, Search, ChevronDown, ChevronRight, 
  ClipboardList, Package, Calendar, Users, Building2, 
  Truck, BarChart3, Settings, MessageCircle, BookOpen,
  CheckCircle, AlertTriangle, Clock, FileText, Shield,
  Wrench, MapPin, Phone, Mail, Star, Zap, Target
} from 'lucide-react';

// Dados do FAQ organizados por categorias
const faqData = [
  {
    id: 'ordem-servico',
    titulo: 'Ordem de Serviço',
    icon: ClipboardList,
    cor: 'orange',
    subcategorias: [
      {
        id: 'os-criacao',
        titulo: 'Criação de OS',
        perguntas: [
          {
            pergunta: 'Como criar uma nova Ordem de Serviço?',
            resposta: 'Para criar uma nova OS, acesse o menu "Ordem de Serviço" na barra lateral. Preencha os dados do evento (nome, data, local, solicitante), adicione as estruturas necessárias selecionando o tipo e quantidade, e clique em "Cadastrar OS". A OS será criada automaticamente com status "Análise".'
          },
          {
            pergunta: 'Quais campos são obrigatórios no cadastro de OS?',
            resposta: 'Os campos obrigatórios são: Número da OS, Nome do Evento, Tipo de Evento, Solicitante, Data do Evento, Local, Data de Início da Montagem, Data de Entrega e Responsável da OS. As estruturas também devem ser adicionadas antes de finalizar o cadastro.'
          },
          {
            pergunta: 'Posso salvar uma OS sem adicionar estruturas?',
            resposta: 'Não é recomendado, mas tecnicamente é possível salvar uma OS sem estruturas. Porém, ela ficará incompleta e não poderá avançar para o status "Reservado" até que pelo menos uma estrutura seja adicionada.'
          }
        ]
      },
      {
        id: 'os-status',
        titulo: 'Status e Fluxo',
        perguntas: [
          {
            pergunta: 'Quais são os status possíveis de uma OS?',
            resposta: 'Uma OS passa por 5 status: 1) Análise - OS recém-criada aguardando aprovação; 2) Reservado - Materiais reservados no estoque; 3) Alocado - Recursos alocados para o evento; 4) Andamento - Montagem em execução; 5) Finalizado - Evento concluído e desmontagem realizada.'
          },
          {
            pergunta: 'Posso voltar o status de uma OS?',
            resposta: 'Não. O fluxo de status é unidirecional por segurança. Uma vez que a OS avança para o próximo status, não é possível retroceder. Isso garante a integridade do histórico e do controle de estoque.'
          },
          {
            pergunta: 'Até qual status posso editar uma OS?',
            resposta: 'Você pode editar todos os dados de uma OS até o status "Andamento" (status 4). Após a OS ser marcada como "Finalizado", ela fica bloqueada para edições, servindo apenas como registro histórico.'
          },
          {
            pergunta: 'Como avanço o status de uma OS?',
            resposta: 'Abra o evento na página "Eventos", clique no card do evento desejado e, no modal de detalhes, clique no botão verde "Avançar para [próximo status]". A mudança será registrada automaticamente no histórico.'
          }
        ]
      },
      {
        id: 'os-edicao',
        titulo: 'Edição e Alterações',
        perguntas: [
          {
            pergunta: 'Como edito uma OS existente?',
            resposta: 'Acesse "Eventos", clique no card do evento desejado, e no modal de detalhes clique em "Editar OS". Você poderá alterar qualquer informação, incluindo adicionar ou remover estruturas. Clique em "Salvar Alterações" para confirmar.'
          },
          {
            pergunta: 'Posso adicionar mais estruturas após criar a OS?',
            resposta: 'Sim! Desde que a OS não esteja com status "Finalizado", você pode adicionar novas estruturas através do modo de edição. O sistema verificará automaticamente a disponibilidade no estoque.'
          },
          {
            pergunta: 'O que acontece se eu remover uma estrutura da OS?',
            resposta: 'Ao remover uma estrutura, os materiais correspondentes serão liberados no estoque (se já estiverem reservados). A alteração será registrada no histórico com detalhes do que foi modificado.'
          }
        ]
      }
    ]
  },
  {
    id: 'estoque',
    titulo: 'Estoque',
    icon: Package,
    cor: 'emerald',
    subcategorias: [
      {
        id: 'estoque-consulta',
        titulo: 'Consulta e Visualização',
        perguntas: [
          {
            pergunta: 'Como verifico a disponibilidade de um material?',
            resposta: 'Acesse a página "Estoque" no menu lateral. Você verá uma lista de todos os materiais com quantidade total, em uso e disponível. Use os filtros de categoria ou a barra de busca para encontrar materiais específicos.'
          },
          {
            pergunta: 'O que significa "Em Uso" no estoque?',
            resposta: '"Em Uso" indica a quantidade de itens que estão alocados em eventos ativos (status Reservado, Alocado ou Andamento). Esses itens não estão fisicamente no depósito, mas em eventos.'
          },
          {
            pergunta: 'Como sei se um material está com estoque baixo?',
            resposta: 'Materiais com menos de 20% de disponibilidade aparecem com indicador amarelo "Estoque baixo". Materiais totalmente alocados aparecem com indicador vermelho "Esgotado".'
          }
        ]
      },
      {
        id: 'estoque-gestao',
        titulo: 'Gestão de Materiais',
        perguntas: [
          {
            pergunta: 'Como adiciono um novo material ao estoque?',
            resposta: 'Na página "Estoque", clique em "Novo Material". Preencha o nome, categoria, quantidade total e quantidade em uso (geralmente 0 para novos itens). O material será adicionado e ficará disponível para uso nas OS.'
          },
          {
            pergunta: 'Posso excluir um material do estoque?',
            resposta: 'Sim, mas apenas se o material não estiver em uso em nenhuma OS ativa. Para excluir, clique no ícone de lixeira ao lado do material. Materiais com unidades em uso não podem ser excluídos.'
          },
          {
            pergunta: 'Como atualizo a quantidade de um material?',
            resposta: 'Clique no ícone de edição ao lado do material desejado. Você pode alterar a quantidade total (ex: após compra de novos itens) ou ajustar a quantidade em uso (ex: após conferência física).'
          }
        ]
      },
      {
        id: 'estoque-categorias',
        titulo: 'Categorias',
        perguntas: [
          {
            pergunta: 'Quais são as categorias de materiais disponíveis?',
            resposta: 'O sistema possui categorias pré-definidas: Praticáveis (pisos modulares), Estruturas Metálicas (treliças, torres), Lonas (coberturas), Fechamentos (laterais), Acessórios (escadas, rodapés) e Fixação (sapatas, ancoragens).'
          },
          {
            pergunta: 'Posso criar novas categorias?',
            resposta: 'Atualmente as categorias são fixas no sistema. Para adicionar novas categorias, entre em contato com o administrador do sistema ou equipe de desenvolvimento.'
          }
        ]
      }
    ]
  },
  {
    id: 'eventos',
    titulo: 'Eventos',
    icon: Calendar,
    cor: 'blue',
    subcategorias: [
      {
        id: 'eventos-visualizacao',
        titulo: 'Visualização e Filtros',
        perguntas: [
          {
            pergunta: 'Como filtro eventos por status?',
            resposta: 'Na página "Eventos", use o dropdown "Todos os Status" para selecionar um status específico (Análise, Reservado, Alocado, Andamento ou Finalizado). A lista será filtrada automaticamente.'
          },
          {
            pergunta: 'Posso buscar um evento pelo número da OS?',
            resposta: 'Sim! Use a barra de busca na página de Eventos. Você pode buscar por nome do evento, local ou número da OS. A busca é feita em tempo real conforme você digita.'
          },
          {
            pergunta: 'Como vejo os detalhes completos de um evento?',
            resposta: 'Clique no card do evento desejado. Um modal será aberto com todas as informações: dados do evento, datas de montagem/desmontagem, observações, e lista completa de estruturas com seus materiais.'
          }
        ]
      },
      {
        id: 'eventos-tipos',
        titulo: 'Tipos de Evento',
        perguntas: [
          {
            pergunta: 'Quais tipos de evento posso cadastrar?',
            resposta: 'Os tipos disponíveis são: Grande Evento (festivais, shows públicos), Pequeno Evento (feiras menores), Evento Privado (casamentos, formaturas), PPD (Ponto de Promoção e Degustação) e Projeto (instalações especiais).'
          },
          {
            pergunta: 'Qual a diferença entre os tipos de evento?',
            resposta: 'A diferença é principalmente para categorização e relatórios. Grande Evento geralmente envolve mais estruturas e equipe. Evento Privado tem características específicas de atendimento ao cliente. PPD são estruturas menores para ações promocionais.'
          }
        ]
      },
      {
        id: 'eventos-estruturas',
        titulo: 'Estruturas do Evento',
        perguntas: [
          {
            pergunta: 'Como adiciono estruturas a um evento?',
            resposta: 'No cadastro ou edição da OS, selecione o tipo de estrutura (Tenda, Palco, Galpão), escolha o subtipo específico (ex: Tenda 10x10m), defina a quantidade e clique em "Adicionar". O sistema verificará automaticamente a disponibilidade.'
          },
          {
            pergunta: 'O que acontece se não houver estrutura disponível?',
            resposta: 'Se a estrutura solicitada não tiver disponibilidade no estoque, o botão de adicionar ficará desabilitado e aparecerá indicação "Esgotado" ou "Máx disp: X". Você precisará aguardar liberação ou reduzir a quantidade.'
          },
          {
            pergunta: 'Como vejo os materiais necessários para cada estrutura?',
            resposta: 'No modal de detalhes do evento, cada estrutura listada mostra seus materiais componentes com as quantidades. Os valores já são multiplicados pela quantidade de estruturas (ex: 4x Tenda = 4x cada material).'
          }
        ]
      }
    ]
  },
  {
    id: 'cadastros',
    titulo: 'Cadastros',
    icon: Users,
    cor: 'purple',
    subcategorias: [
      {
        id: 'cadastro-pessoas',
        titulo: 'Pessoas',
        perguntas: [
          {
            pergunta: 'Quais tipos de pessoas posso cadastrar?',
            resposta: 'Você pode cadastrar: Colaboradores (funcionários da empresa), Contatos (pessoas de empresas parceiras), Fornecedores (representantes de fornecedores) e Outros (contatos diversos).'
          },
          {
            pergunta: 'Quais dados são obrigatórios no cadastro de pessoa?',
            resposta: 'Os campos obrigatórios são: Nome completo, CPF, Tipo de pessoa e pelo menos um contato (telefone ou e-mail). Endereço e cargo são opcionais mas recomendados.'
          },
          {
            pergunta: 'Como busco uma pessoa cadastrada?',
            resposta: 'Na página "Cadastro de Pessoas", use a barra de busca para pesquisar por nome, CPF ou e-mail. Você também pode filtrar por tipo de pessoa usando o dropdown de filtros.'
          }
        ]
      },
      {
        id: 'cadastro-empresas',
        titulo: 'Empresas',
        perguntas: [
          {
            pergunta: 'Quais tipos de empresa posso cadastrar?',
            resposta: 'Você pode cadastrar: Órgão Público (prefeituras, secretarias), Cliente (empresas contratantes), Fornecedor (empresas parceiras) e Parceiro (empresas de apoio).'
          },
          {
            pergunta: 'Preciso do CNPJ para cadastrar uma empresa?',
            resposta: 'Sim, o CNPJ é obrigatório e deve ser válido. O sistema verifica automaticamente o formato do CNPJ. Além disso, são obrigatórios: Razão Social, Nome Fantasia e pelo menos um contato.'
          },
          {
            pergunta: 'Posso vincular pessoas a empresas?',
            resposta: 'Sim! Ao cadastrar uma pessoa, você pode selecionar a empresa à qual ela está vinculada. Isso facilita a organização dos contatos e a emissão de documentos.'
          }
        ]
      }
    ]
  },
  {
    id: 'painel',
    titulo: 'Painel de Controle',
    icon: BarChart3,
    cor: 'cyan',
    subcategorias: [
      {
        id: 'painel-widgets',
        titulo: 'Widgets',
        perguntas: [
          {
            pergunta: 'Como adiciono widgets ao painel?',
            resposta: 'Clique em "Editar Layout" no canto superior direito do Painel. Depois clique em "Adicionar Widget" e selecione o tipo desejado. O widget será adicionado e você pode arrastá-lo para a posição desejada.'
          },
          {
            pergunta: 'Quais tipos de widgets estão disponíveis?',
            resposta: 'Disponíveis: Estatísticas (eventos, OS, concluídas, equipes), Gráficos (mensal, por estrutura), Alertas (estoque baixo), Listas (atividades recentes) e Tabelas (próximos eventos).'
          },
          {
            pergunta: 'Posso redimensionar os widgets?',
            resposta: 'Sim! No modo de edição, cada widget possui 8 pontos de redimensionamento (cantos e bordas). Arraste qualquer um deles para ajustar o tamanho. O tamanho mínimo varia conforme o tipo de widget.'
          },
          {
            pergunta: 'Como removo um widget do painel?',
            resposta: 'Entre no modo de edição, clique no widget desejado para selecioná-lo (borda laranja) e clique no ícone de lixeira que aparece no canto do widget ou na barra de ações.'
          }
        ]
      },
      {
        id: 'painel-layout',
        titulo: 'Layout e Personalização',
        perguntas: [
          {
            pergunta: 'Meu layout é salvo automaticamente?',
            resposta: 'Atualmente o layout fica salvo apenas durante a sessão. Ao recarregar a página (F5), o painel volta à configuração padrão. Salvamento permanente será implementado em versão futura.'
          },
          {
            pergunta: 'Posso ter múltiplos painéis?',
            resposta: 'No momento, cada usuário tem um único painel personalizável. A funcionalidade de múltiplos painéis/abas está prevista para versões futuras do sistema.'
          }
        ]
      }
    ]
  },
  {
    id: 'historico',
    titulo: 'Histórico',
    icon: Clock,
    cor: 'yellow',
    subcategorias: [
      {
        id: 'historico-acoes',
        titulo: 'Ações Registradas',
        perguntas: [
          {
            pergunta: 'Quais ações são registradas no histórico?',
            resposta: 'São registradas: criação de OS, edição de OS, avanço de status, cadastro de pessoas, cadastro de empresas, alterações no estoque, adição e remoção de materiais.'
          },
          {
            pergunta: 'Por quanto tempo o histórico é mantido?',
            resposta: 'Atualmente o histórico é mantido em memória durante a sessão. Ao recarregar a página, o histórico é limpo. Em versões futuras com backend, o histórico será permanente.'
          },
          {
            pergunta: 'Posso filtrar o histórico por tipo de ação?',
            resposta: 'Sim! Use o dropdown de filtros para selecionar um tipo específico de ação. Você também pode usar a barra de busca para procurar por usuário, número de OS ou nome.'
          }
        ]
      },
      {
        id: 'historico-detalhes',
        titulo: 'Detalhes das Ações',
        perguntas: [
          {
            pergunta: 'Como vejo os detalhes de uma ação?',
            resposta: 'Clique em qualquer linha do histórico para abrir o modal de detalhes. Você verá: usuário responsável, data/hora exata, tipo de ação e todos os dados envolvidos (campos alterados, estruturas, etc.).'
          },
          {
            pergunta: 'O histórico mostra quais campos foram alterados?',
            resposta: 'Sim! Ao editar uma OS, o sistema compara os valores antes e depois, listando exatamente quais campos foram modificados (Nome, Local, Estruturas, etc.).'
          }
        ]
      }
    ]
  },
  {
    id: 'sistema',
    titulo: 'Sistema',
    icon: Settings,
    cor: 'zinc',
    subcategorias: [
      {
        id: 'sistema-acesso',
        titulo: 'Acesso e Login',
        perguntas: [
          {
            pergunta: 'Como faço login no sistema?',
            resposta: 'Na tela de login, informe seu e-mail corporativo e senha. Se for seu primeiro acesso, utilize a senha temporária enviada por e-mail e altere-a no primeiro login.'
          },
          {
            pergunta: 'Esqueci minha senha, o que faço?',
            resposta: 'Clique em "Esqueci minha senha" na tela de login. Informe seu e-mail cadastrado e você receberá um link para redefinir sua senha. O link expira em 24 horas.'
          },
          {
            pergunta: 'Posso usar o sistema no celular?',
            resposta: 'Sim! O sistema é totalmente responsivo e funciona em smartphones e tablets. O menu lateral se transforma em menu deslizante para melhor experiência mobile.'
          }
        ]
      },
      {
        id: 'sistema-tema',
        titulo: 'Aparência',
        perguntas: [
          {
            pergunta: 'Como altero entre tema claro e escuro?',
            resposta: 'Clique no ícone de sol/lua no canto superior direito da tela (ao lado da busca). O tema é alternado instantaneamente e sua preferência é mantida durante a sessão.'
          },
          {
            pergunta: 'Posso recolher o menu lateral?',
            resposta: 'Sim! Clique na seta no topo do menu lateral para recolhê-lo. O menu se transforma em uma barra flutuante no topo com acesso rápido a todas as seções. Clique no logo para expandir novamente.'
          }
        ]
      },
      {
        id: 'sistema-suporte',
        titulo: 'Suporte',
        perguntas: [
          {
            pergunta: 'Como reporto um problema no sistema?',
            resposta: 'Entre em contato com a equipe de TI pelo e-mail suporte@vivere.com.br ou pelo ramal 2001. Descreva o problema, inclua prints se possível, e informe em qual página/ação o erro ocorreu.'
          },
          {
            pergunta: 'Onde encontro atualizações do sistema?',
            resposta: 'Comunicados sobre novas funcionalidades e correções são enviados por e-mail e também ficam disponíveis na seção "Novidades" dentro desta Central de Ajuda.'
          }
        ]
      }
    ]
  }
];

// Cores por categoria
const coresConfig = {
  orange: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    text: 'text-orange-500',
    hover: 'hover:bg-orange-500/20',
    selected: 'bg-orange-500/20 border-orange-500/40'
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-500',
    hover: 'hover:bg-emerald-500/20',
    selected: 'bg-emerald-500/20 border-emerald-500/40'
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-500',
    hover: 'hover:bg-blue-500/20',
    selected: 'bg-blue-500/20 border-blue-500/40'
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    text: 'text-purple-500',
    hover: 'hover:bg-purple-500/20',
    selected: 'bg-purple-500/20 border-purple-500/40'
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    text: 'text-cyan-500',
    hover: 'hover:bg-cyan-500/20',
    selected: 'bg-cyan-500/20 border-cyan-500/40'
  },
  yellow: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    text: 'text-yellow-500',
    hover: 'hover:bg-yellow-500/20',
    selected: 'bg-yellow-500/20 border-yellow-500/40'
  },
  zinc: {
    bg: 'bg-zinc-500/10',
    border: 'border-zinc-500/20',
    text: 'text-zinc-400',
    hover: 'hover:bg-zinc-500/20',
    selected: 'bg-zinc-500/20 border-zinc-500/40'
  }
};

export default function AjudaPage({ darkMode }) {
  const [categoriaAberta, setCategoriaAberta] = useState(null);
  const [subcategoriaAberta, setSubcategoriaAberta] = useState(null);
  const [perguntaAberta, setPerguntaAberta] = useState(null);
  const [busca, setBusca] = useState('');

  // Filtrar perguntas baseado na busca
  const resultadosBusca = busca.length >= 2 ? faqData.flatMap(cat => 
    cat.subcategorias.flatMap(sub => 
      sub.perguntas.filter(p => 
        p.pergunta.toLowerCase().includes(busca.toLowerCase()) ||
        p.resposta.toLowerCase().includes(busca.toLowerCase())
      ).map(p => ({ ...p, categoria: cat, subcategoria: sub }))
    )
  ) : [];

  const toggleCategoria = (catId) => {
    setCategoriaAberta(categoriaAberta === catId ? null : catId);
    setSubcategoriaAberta(null);
    setPerguntaAberta(null);
  };

  const toggleSubcategoria = (subId) => {
    setSubcategoriaAberta(subcategoriaAberta === subId ? null : subId);
    setPerguntaAberta(null);
  };

  const togglePergunta = (pergId) => {
    setPerguntaAberta(perguntaAberta === pergId ? null : pergId);
  };

  const abrirPerguntaDaBusca = (resultado) => {
    setCategoriaAberta(resultado.categoria.id);
    setSubcategoriaAberta(resultado.subcategoria.id);
    setPerguntaAberta(resultado.pergunta);
    setBusca('');
  };

  const inputClass = `w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-orange-500/50 transition-colors
    ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600' : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'}`;

  // Estatísticas
  const totalPerguntas = faqData.reduce((acc, cat) => 
    acc + cat.subcategorias.reduce((a, sub) => a + sub.perguntas.length, 0), 0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <HelpCircle className="w-6 h-6 text-black" />
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Central de Ajuda</h2>
            <p className={darkMode ? 'text-zinc-500' : 'text-zinc-500'}>Encontre respostas para suas dúvidas</p>
          </div>
        </div>
        
        <div className={`px-4 py-2 rounded-xl border flex items-center gap-3 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <BookOpen className={`w-4 h-4 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
          <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{totalPerguntas} perguntas</span>
          <span className={darkMode ? 'text-zinc-700' : 'text-zinc-300'}>•</span>
          <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{faqData.length} categorias</span>
        </div>
      </div>

      {/* Busca */}
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
        <input 
          type="text" 
          value={busca} 
          onChange={(e) => setBusca(e.target.value)} 
          placeholder="Buscar perguntas..."
          className={`${inputClass} pl-12`} 
        />
        
        {/* Resultados da Busca */}
        {resultadosBusca.length > 0 && (
          <div className={`absolute top-full left-0 right-0 mt-2 rounded-xl border shadow-2xl z-50 max-h-80 overflow-y-auto scrollbar-hide
            ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
            <div className={`p-3 border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
              <p className={`text-xs font-medium ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                {resultadosBusca.length} resultado{resultadosBusca.length !== 1 ? 's' : ''} encontrado{resultadosBusca.length !== 1 ? 's' : ''}
              </p>
            </div>
            {resultadosBusca.map((resultado, idx) => {
              const cores = coresConfig[resultado.categoria.cor];
              return (
                <button
                  key={idx}
                  onClick={() => abrirPerguntaDaBusca(resultado)}
                  className={`w-full p-4 text-left transition-colors border-b last:border-b-0
                    ${darkMode ? 'border-zinc-800 hover:bg-zinc-800' : 'border-zinc-100 hover:bg-zinc-50'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${cores.bg} ${cores.border} border`}>
                      {(() => { const Icon = resultado.categoria.icon; return <Icon className={`w-4 h-4 ${cores.text}`} />; })()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                        {resultado.pergunta}
                      </p>
                      <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        {resultado.categoria.titulo} → {resultado.subcategoria.titulo}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Zap, label: 'Respostas Rápidas', value: 'Instantâneas', cor: 'orange' },
          { icon: Target, label: 'Precisão', value: '100%', cor: 'emerald' },
          { icon: Star, label: 'Avaliação', value: '4.9/5', cor: 'yellow' },
          { icon: MessageCircle, label: 'Suporte', value: '24/7', cor: 'blue' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          const cores = coresConfig[stat.cor];
          return (
            <div 
              key={idx}
              className={`rounded-xl border p-4 ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}
            >
              <div className={`w-10 h-10 rounded-lg ${cores.bg} ${cores.border} border flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${cores.text}`} />
              </div>
              <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{stat.value}</p>
              <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Categorias */}
      <div className="space-y-3">
        {faqData.map((categoria) => {
          const Icon = categoria.icon;
          const cores = coresConfig[categoria.cor];
          const isOpen = categoriaAberta === categoria.id;
          
          return (
            <div 
              key={categoria.id}
              className={`rounded-2xl border overflow-hidden transition-all
                ${darkMode ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}
                ${isOpen ? (darkMode ? 'ring-1 ring-orange-500/30' : 'ring-1 ring-orange-300') : ''}`}
            >
              {/* Header da Categoria */}
              <button
                onClick={() => toggleCategoria(categoria.id)}
                className={`w-full p-5 flex items-center gap-4 transition-colors
                  ${darkMode ? 'hover:bg-zinc-800/50' : 'hover:bg-zinc-50'}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${cores.bg} ${cores.border}`}>
                  <Icon className={`w-6 h-6 ${cores.text}`} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                    {categoria.titulo}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                    {categoria.subcategorias.length} tópicos • {categoria.subcategorias.reduce((a, s) => a + s.perguntas.length, 0)} perguntas
                  </p>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'} ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Subcategorias */}
              <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className={`px-5 pb-5 space-y-2 ${darkMode ? 'border-t border-zinc-800' : 'border-t border-zinc-100'}`}>
                  <div className="pt-4">
                    {categoria.subcategorias.map((subcategoria) => {
                      const isSubOpen = subcategoriaAberta === subcategoria.id;
                      
                      return (
                        <div key={subcategoria.id} className="mb-2 last:mb-0">
                          {/* Header da Subcategoria */}
                          <button
                            onClick={() => toggleSubcategoria(subcategoria.id)}
                            className={`w-full p-4 rounded-xl flex items-center gap-3 transition-all
                              ${isSubOpen 
                                ? (darkMode ? 'bg-zinc-800 border-orange-500/30' : 'bg-orange-50 border-orange-200') 
                                : (darkMode ? 'bg-zinc-800/50 hover:bg-zinc-800' : 'bg-zinc-50 hover:bg-zinc-100')} 
                              border ${darkMode ? 'border-zinc-700' : 'border-zinc-200'}`}
                          >
                            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isSubOpen ? 'rotate-90 text-orange-500' : (darkMode ? 'text-zinc-500' : 'text-zinc-400')}`} />
                            <span className={`font-medium flex-1 text-left ${isSubOpen ? 'text-orange-500' : (darkMode ? 'text-white' : 'text-zinc-900')}`}>
                              {subcategoria.titulo}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-zinc-700 text-zinc-400' : 'bg-zinc-200 text-zinc-500'}`}>
                              {subcategoria.perguntas.length}
                            </span>
                          </button>

                          {/* Perguntas */}
                          <div className={`overflow-hidden transition-all duration-300 ${isSubOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="mt-2 ml-7 space-y-2">
                              {subcategoria.perguntas.map((pergunta, pIdx) => {
                                const pergId = `${subcategoria.id}-${pIdx}`;
                                const isPergOpen = perguntaAberta === pergId;
                                
                                return (
                                  <div 
                                    key={pIdx}
                                    className={`rounded-xl border overflow-hidden transition-all
                                      ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}
                                      ${isPergOpen ? 'ring-1 ring-orange-500/50' : ''}`}
                                  >
                                    {/* Pergunta */}
                                    <button
                                      onClick={() => togglePergunta(pergId)}
                                      className={`w-full p-4 flex items-start gap-3 text-left transition-colors
                                        ${darkMode ? 'hover:bg-zinc-800/50' : 'hover:bg-zinc-50'}`}
                                    >
                                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors
                                        ${isPergOpen 
                                          ? 'bg-orange-500 text-black' 
                                          : (darkMode ? 'bg-zinc-800 text-zinc-500' : 'bg-zinc-100 text-zinc-400')}`}>
                                        <span className="text-xs font-bold">?</span>
                                      </div>
                                      <span className={`flex-1 font-medium ${isPergOpen ? 'text-orange-500' : (darkMode ? 'text-white' : 'text-zinc-900')}`}>
                                        {pergunta.pergunta}
                                      </span>
                                      <ChevronDown className={`w-4 h-4 flex-shrink-0 mt-1 transition-transform duration-300 ${isPergOpen ? 'rotate-180 text-orange-500' : (darkMode ? 'text-zinc-600' : 'text-zinc-400')}`} />
                                    </button>

                                    {/* Resposta */}
                                    <div className={`overflow-hidden transition-all duration-300 ${isPergOpen ? 'max-h-96' : 'max-h-0'}`}>
                                      <div className={`px-4 pb-4 pt-0`}>
                                        <div className={`p-4 rounded-xl ${darkMode ? 'bg-zinc-800/50 border border-zinc-700' : 'bg-zinc-50 border border-zinc-200'}`}>
                                          <div className="flex items-start gap-3">
                                            <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${darkMode ? 'text-green-500' : 'text-green-600'}`} />
                                            <p className={`text-sm leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                                              {pergunta.resposta}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer de Contato */}
      <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-gradient-to-br from-orange-500/10 to-zinc-900 border-orange-500/20' : 'bg-gradient-to-br from-orange-50 to-white border-orange-200'}`}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 text-center md:text-left">
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
              Não encontrou sua resposta?
            </h3>
            <p className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
              Nossa equipe de suporte está pronta para ajudar você.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a 
              href="mailto:suporte@vivere.com.br"
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
                ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200'}`}
            >
              <Mail className="w-5 h-5" />
              E-mail
            </a>
            <a 
              href="tel:+551121001001"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 text-black transition-all hover:scale-105 shadow-lg shadow-orange-500/30"
            >
              <Phone className="w-5 h-5" />
              Ramal 2001
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}