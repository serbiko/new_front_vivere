// Estruturas disponíveis com seus materiais
export const estruturas = {
  tenda: {
    nome: 'Tenda',
    icon: '⛺',
    tipos: [
      {
        id: 'tenda-10x10',
        nome: 'Tenda 10x10',
        descricao: 'Ideal para grandes recepções e feiras ao ar livre',
        materiais: [
          { nome: 'Treliças de alumínio (pilares de 3 metros)', qtd: 4 },
          { nome: 'Treliças de alumínio (vigas de 10 metros)', qtd: 4 },
          { nome: 'Lona de cobertura 10x10 (PVC antichama)', qtd: 1 },
          { nome: 'Bases de fixação (sapatas metálicas)', qtd: 4 },
          { nome: 'Estacas de ancoragem em aço', qtd: 8 },
          { nome: 'Cabos de aço para estaiamento', qtd: 4 },
          { nome: 'Caixa de parafusos e conectores estruturais', qtd: 1 },
        ]
      },
      {
        id: 'tenda-8x8',
        nome: 'Tenda 8x8',
        descricao: 'Perfeita para eventos médios e áreas de alimentação',
        materiais: [
          { nome: 'Treliças de alumínio (pilares de 3 metros)', qtd: 4 },
          { nome: 'Treliças de alumínio (vigas de 8 metros)', qtd: 4 },
          { nome: 'Lona de cobertura 8x8 (PVC branca)', qtd: 1 },
          { nome: 'Bases de fixação metálicas', qtd: 4 },
          { nome: 'Estacas de ancoragem em aço', qtd: 8 },
          { nome: 'Cabos de aço', qtd: 4 },
          { nome: 'Caixa de conectores estruturais', qtd: 1 },
        ]
      },
      {
        id: 'tenda-6x6',
        nome: 'Tenda 6x6',
        descricao: 'Muito usada para stands, pequenas exposições ou tendas de apoio',
        materiais: [
          { nome: 'Tubos de aço galvanizado ou treliças (pilares de 2,5m)', qtd: 4 },
          { nome: 'Treliças de alumínio (vigas de 6 metros)', qtd: 4 },
          { nome: 'Lona de cobertura 6x6', qtd: 1 },
          { nome: 'Bases de fixação', qtd: 4 },
          { nome: 'Estacas de ancoragem', qtd: 4 },
        ]
      },
      {
        id: 'tenda-4x4',
        nome: 'Tenda 4x4 (Sanfonada)',
        descricao: 'Ideal para bilheterias, pontos de controle ou socorro',
        materiais: [
          { nome: 'Estrutura articulada metálica (frame completo 2,5m)', qtd: 1 },
          { nome: 'Lona de cobertura 4x4', qtd: 1 },
          { nome: 'Pesos de concreto/areia para fixação', qtd: 4 },
        ]
      },
    ]
  },
  galpao: {
    nome: 'Galpão',
    icon: '🏭',
    tipos: [
      {
        id: 'galpao-20x40',
        nome: 'Galpão Lonado 20x40',
        descricao: 'Estrutura de grande porte para centros de distribuição ou grandes festivais',
        materiais: [
          { nome: 'Pórticos pesados de aço galvanizado', qtd: 11 },
          { nome: 'Travessas de sustentação (terças do telhado)', qtd: 40 },
          { nome: 'Lona de cobertura principal (20x40)', qtd: 1 },
          { nome: 'Lonas de frontão (fechamento frontal e traseiro)', qtd: 2 },
          { nome: 'Lonas de fechamento lateral', qtd: 10 },
          { nome: 'Sapatas de fixação pesada', qtd: 22 },
          { nome: 'Estacas de fixação profunda', qtd: 40 },
          { nome: 'Kits de portas corrediças para empilhadeiras', qtd: 2 },
        ]
      },
      {
        id: 'galpao-10x20',
        nome: 'Galpão Lonado 10x20',
        descricao: 'Excelente para refeitórios industriais ou feiras corporativas',
        materiais: [
          { nome: 'Pórticos de aço galvanizado', qtd: 6 },
          { nome: 'Travessas de sustentação de teto e lateral', qtd: 20 },
          { nome: 'Lona de cobertura principal (10x20)', qtd: 1 },
          { nome: 'Lonas de frontão (frente e fundos)', qtd: 2 },
          { nome: 'Lonas de fechamento lateral', qtd: 6 },
          { nome: 'Sapatas de fixação pesada', qtd: 12 },
          { nome: 'Estacas de fixação', qtd: 24 },
          { nome: 'Kit de portas articuladas de acesso', qtd: 1 },
        ]
      },
    ]
  },
  palco: {
    nome: 'Palco',
    icon: '🎤',
    tipos: [
      {
        id: 'palco-10x8',
        nome: 'Palco com Cobertura 10x8',
        descricao: 'Estrutura completa para shows de médio e grande porte',
        materiais: [
          { nome: 'Praticáveis com piso naval antiderrapante (2x1m)', qtd: 40 },
          { nome: 'Pés telescópicos em alumínio (1m a 1,5m)', qtd: 160 },
          { nome: 'Treliças Q30 (para grid de iluminação)', qtd: 14 },
          { nome: 'Lona de cobertura para palco 10x8', qtd: 1 },
          { nome: 'Escadas de acesso com corrimão', qtd: 2 },
          { nome: 'Guarda-corpos (grades de proteção)', qtd: 18 },
          { nome: 'Saia preta de acabamento frontal (10m)', qtd: 1 },
        ]
      },
      {
        id: 'palco-6x4',
        nome: 'Palco Baixo 6x4 (Sem cobertura)',
        descricao: 'Ideal para palestras, workshops e pequenas apresentações',
        materiais: [
          { nome: 'Praticáveis com piso naval (2x1m)', qtd: 12 },
          { nome: 'Pés fixos de alumínio (0,5m)', qtd: 48 },
          { nome: 'Escada de acesso simples (2 degraus)', qtd: 1 },
          { nome: 'Guarda-corpos', qtd: 10 },
          { nome: 'Saia preta de acabamento frontal (6m)', qtd: 1 },
        ]
      },
    ]
  }
};

// Estoque geral da empresa
export const estoqueInicial = [
  // Pisos, Estrados e Acabamentos
  { id: 1, categoria: 'Pisos e Acabamentos', nome: 'Praticáveis (2x1m piso naval)', total: 70, emUso: 12, observacao: 'Sobra para montar passarelas extras' },
  { id: 2, categoria: 'Pisos e Acabamentos', nome: 'Pés telescópicos (1m a 1,5m)', total: 200, emUso: 32 },
  { id: 3, categoria: 'Pisos e Acabamentos', nome: 'Pés fixos (0,5m)', total: 70, emUso: 0 },
  { id: 4, categoria: 'Pisos e Acabamentos', nome: 'Guarda-corpos de proteção', total: 40, emUso: 8 },
  { id: 5, categoria: 'Pisos e Acabamentos', nome: 'Escadas de acesso (diversos tamanhos)', total: 6, emUso: 2 },
  { id: 6, categoria: 'Pisos e Acabamentos', nome: 'Saias pretas de acabamento (rolos de 10m)', total: 4, emUso: 1 },
  
  // Estruturas Metálicas
  { id: 7, categoria: 'Estruturas Metálicas', nome: 'Treliças de alumínio - Pilares 3m', total: 16, emUso: 4 },
  { id: 8, categoria: 'Estruturas Metálicas', nome: 'Treliças de alumínio - Vigas 10m', total: 10, emUso: 4 },
  { id: 9, categoria: 'Estruturas Metálicas', nome: 'Treliças de alumínio - Vigas 8m', total: 8, emUso: 0 },
  { id: 10, categoria: 'Estruturas Metálicas', nome: 'Treliças de alumínio - Vigas 6m', total: 8, emUso: 0 },
  { id: 11, categoria: 'Estruturas Metálicas', nome: 'Treliças Q30/Q40 (módulos diversos)', total: 25, emUso: 14 },
  { id: 12, categoria: 'Estruturas Metálicas', nome: 'Estruturas sanfonadas completas 4x4', total: 3, emUso: 1 },
  { id: 13, categoria: 'Estruturas Metálicas', nome: 'Pórticos pesados de aço (galpões)', total: 22, emUso: 0 },
  { id: 14, categoria: 'Estruturas Metálicas', nome: 'Travessas de sustentação (terças)', total: 80, emUso: 0 },
  
  // Lonas
  { id: 15, categoria: 'Lonas', nome: 'Lona para Tenda 10x10', total: 2, emUso: 1 },
  { id: 16, categoria: 'Lonas', nome: 'Lona para Tenda 8x8', total: 2, emUso: 0 },
  { id: 17, categoria: 'Lonas', nome: 'Lona para Tenda 6x6', total: 2, emUso: 0 },
  { id: 18, categoria: 'Lonas', nome: 'Lona para Tenda 4x4', total: 2, emUso: 1 },
  { id: 19, categoria: 'Lonas', nome: 'Lona de cobertura Galpão 20x40', total: 2, emUso: 0 },
  { id: 20, categoria: 'Lonas', nome: 'Lona de cobertura Galpão 10x20', total: 2, emUso: 0 },
  { id: 21, categoria: 'Lonas', nome: 'Lonas de Frontão para Galpões', total: 6, emUso: 0 },
  { id: 22, categoria: 'Lonas', nome: 'Lonas de fechamento lateral Galpões', total: 24, emUso: 0 },
  { id: 23, categoria: 'Lonas', nome: 'Lona de cobertura para Palco 10x8', total: 2, emUso: 1 },
  
  // Fixação e Ancoragem
  { id: 24, categoria: 'Fixação e Ancoragem', nome: 'Bases de fixação / Sapatas simples', total: 24, emUso: 8 },
  { id: 25, categoria: 'Fixação e Ancoragem', nome: 'Sapatas de fixação pesada (galpões)', total: 45, emUso: 0 },
  { id: 26, categoria: 'Fixação e Ancoragem', nome: 'Estacas de ancoragem (aço)', total: 120, emUso: 16 },
  { id: 27, categoria: 'Fixação e Ancoragem', nome: 'Cabos de aço tensionadores', total: 30, emUso: 8 },
  { id: 28, categoria: 'Fixação e Ancoragem', nome: 'Pesos de concreto/areia (25kg cada)', total: 20, emUso: 4 },
  { id: 29, categoria: 'Fixação e Ancoragem', nome: 'Caixas de parafusos/porcas estruturais', total: 10, emUso: 2 },
  { id: 30, categoria: 'Fixação e Ancoragem', nome: 'Kits de portas para galpão', total: 4, emUso: 0 },
];

export const categorias = [
  'Pisos e Acabamentos',
  'Estruturas Metálicas', 
  'Lonas',
  'Fixação e Ancoragem'
];
