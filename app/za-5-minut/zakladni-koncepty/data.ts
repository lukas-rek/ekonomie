export type CardType = 
  | 'intro'
  | 'concept'
  | 'flip'
  | 'flip_grid'
  | 'quiz_single'
  | 'scenario'
  | 'interactive_tap'
  | 'summary_end';

export interface MiniCard {
  front: string;
  back: string;
}

export interface Card {
  id: number;
  type: CardType;
  title: string;
  text?: string;
  icon?: string;
  front?: string;
  back?: string;
  miniCards?: MiniCard[];
  question?: string;
  options?: string[];
  correctIndex?: number;
  explanation?: string;
  interactiveType?: 'pizza' | 'workers' | 'ppf' | 'trade' | 'price';
}

export const cards: Card[] = [
  // Karta 1 - intro
  {
    id: 1,
    type: 'intro',
    title: 'Základní ekonomické koncepty za 5 minut',
    text: 'Než se pustíš do celé kapitoly, tohle rychlé shrnutí ti dá ucelený přehled. Zabere ti to jen pár minut.',
  },
  // Karta 2 - concept
  {
    id: 2,
    type: 'concept',
    title: 'Co je ekonomie?',
    text: 'Ekonomie zkoumá, jak lidé a společnost rozhodují o využití vzácných zdrojů.',
    icon: 'brain',
  },
  // Karta 3 - flip
  {
    id: 3,
    type: 'flip',
    title: 'Dělení ekonomie',
    front: 'Mikroekonomie',
    back: 'Zkoumá chování jednotlivců, domácností a firem.',
  },
  // Karta 4 - flip
  {
    id: 4,
    type: 'flip',
    title: 'Dělení ekonomie',
    front: 'Makroekonomie',
    back: 'Zkoumá ekonomiku jako celek – inflaci, nezaměstnanost, HDP.',
  },
  // Karta 5 - quiz_single
  {
    id: 5,
    type: 'quiz_single',
    title: 'Rychlá kontrola',
    question: 'Zkoumání dopadu inflace na celou zemi patří do:',
    options: ['Mikroekonomie', 'Makroekonomie', 'Ani jedno'],
    correctIndex: 1,
    explanation: 'Inflace je agregátní ukazatel celé ekonomiky, proto patří do makroekonomie.',
  },
  // Karta 6 - concept
  {
    id: 6,
    type: 'concept',
    title: 'Vzácnost a trade-offy',
    text: 'Každý den děláme rozhodnutí o omezených zdrojích – penězích, čase. Tomu se říká trade-off (kompromis).',
    icon: 'scale',
  },
  // Karta 7 - scenario
  {
    id: 7,
    type: 'scenario',
    title: 'Rozhodovací scénář',
    text: 'Máš 200 Kč. Jít do kina, nebo koupit tričko?',
    options: ['Kino', 'Tričko'],
    explanation: 'Ať vybereš cokoliv, cena obětované příležitosti je hodnota té druhé možnosti, které ses vzdal/a.',
  },
  // Karta 8 - concept
  {
    id: 8,
    type: 'concept',
    title: 'Statek, užitek a mezní užitek',
    text: 'Věci mají pro nás užitek – uspokojení, které nám přinášejí. Čím víc jednotek statku máme, tím menší užitek nám přináší další kus.',
    icon: 'pizza',
  },
  // Karta 9 - interactive_tap (pizza)
  {
    id: 9,
    type: 'interactive_tap',
    interactiveType: 'pizza',
    title: 'Kolikátý kousek pizzy ti chutná nejvíc?',
    text: 'Klikni na číslo kousku pizzy a sleduj, jak se mění tvůj dodatečný (mezní) užitek.',
  },
  // Karta 10 - quiz_single
  {
    id: 10,
    type: 'quiz_single',
    title: 'Paradox hodnoty',
    question: 'Proč je voda levnější než diamanty, i když je pro přežití důležitější?',
    options: [
      'Protože je jí hodně, mezní užitek dalšího litru je nízký',
      'Protože diamanty jsou hezčí',
      'Protože voda není statek',
    ],
    correctIndex: 0,
    explanation: 'Voda je nezbytná, ale je jí dostatek – proto má další litr nízký mezní užitek a nízkou cenu. Diamantů je málo, takže jejich mezní užitek je vysoký.',
  },
  // Karta 11 - concept
  {
    id: 11,
    type: 'concept',
    title: 'Výrobní faktory',
    text: 'Půda, práce, kapitál a podnikavost – čtyři věci, které potřebujeme k výrobě čehokoli.',
    icon: 'factory',
  },
  // Karta 12 - flip_grid (sada 4)
  {
    id: 12,
    type: 'flip_grid',
    title: '4 výrobní faktory',
    text: 'Klikni na jednotlivé faktory pro zobrazení jejich definice:',
    miniCards: [
      { front: 'Půda', back: 'Přírodní zdroje a suroviny (půda, nerosty, voda).' },
      { front: 'Práce', back: 'Lidský čas a duševní i fyzické úsilí při výrobě.' },
      { front: 'Kapitál', back: 'Dříve vyrobené statky – stroje, nástroje, budovy.' },
      { front: 'Podnikavost', back: 'Schopnost organizovat faktory, inovovat a nést riziko.' },
    ],
  },
  // Karta 13 - concept
  {
    id: 13,
    type: 'concept',
    title: 'Klesající mezní výnosy',
    text: 'Přidávat pořád víc pracovníků do stejné dílny nezvyšuje výrobu donekonečna – každý další dělník přidá méně než ten předchozí.',
    icon: 'users',
  },
  // Karta 14 - interactive_tap (workers)
  {
    id: 14,
    type: 'interactive_tap',
    interactiveType: 'workers',
    title: 'Kolik pracovníků najmeš?',
    text: 'Přidávej pracovníky do jedné dílny a sleduj, jak se výstup sice zvyšuje, ale přírůstky klesají.',
  },
  // Karta 15 - concept
  {
    id: 15,
    type: 'concept',
    title: 'Hranice produkčních možností (PPF)',
    text: 'Ukazuje maximální kombinace dvou statků, které ekonomika dokáže vyrobit při daných zdrojích.',
    icon: 'chart',
  },
  // Karta 16 - interactive_tap (ppf)
  {
    id: 16,
    type: 'interactive_tap',
    interactiveType: 'ppf',
    title: 'Vyber bod na hranici produkčních možností',
    text: 'Klikni na body na křivce pro prozkoumání trade-offu, nebo vyzkoušej vliv investic do technologií.',
  },
  // Karta 17 - quiz_single
  {
    id: 17,
    type: 'quiz_single',
    title: 'Efektivita PPF',
    question: 'Bod uvnitř hranice produkčních možností znamená:',
    options: [
      'Efektivní využití zdrojů',
      'Nevyužité zdroje, neefektivitu',
      'Není to možné',
    ],
    correctIndex: 1,
    explanation: 'Bod uvnitř křivky znamená, že ekonomika nevyužívá všechny své výrobní zdroje (např. v důsledku nezaměstnanosti či nevyužitých kapacit).',
  },
  // Karta 18 - concept
  {
    id: 18,
    type: 'concept',
    title: 'Komparativní výhoda',
    text: 'I když je někdo ve všem lepší, oběma se vyplatí obchodovat a specializovat se na to, v čem mají nižší náklady obětované příležitosti.',
    icon: 'handshake',
  },
  // Karta 19 - interactive_tap (trade)
  {
    id: 19,
    type: 'interactive_tap',
    interactiveType: 'trade',
    title: 'Vyplatí se specializace?',
    text: 'Přepni mezi situací bez obchodu a se zapojením specializace:',
  },
  // Karta 20 - concept
  {
    id: 20,
    type: 'concept',
    title: 'Nabídka a poptávka',
    text: 'Cena vzniká na trhu, kde se potkává ochota kupujících platit (poptávka) s ochotou prodávajících nabízet (nabídka).',
    icon: 'market',
  },
  // Karta 21 - interactive_tap (price)
  {
    id: 21,
    type: 'interactive_tap',
    interactiveType: 'price',
    title: 'Co se stane při jiné ceně?',
    text: 'Vyzkoušej, co způsobí odchylka tržní ceny od rovnovážného stavu:',
  },
  // Karta 22 - quiz_single
  {
    id: 22,
    type: 'quiz_single',
    title: 'Tržní rovnováha',
    question: 'Když je cena nad rovnovážnou úrovní, na trhu vzniká:',
    options: ['Nedostatek', 'Přebytek', 'Rovnováha'],
    correctIndex: 1,
    explanation: 'Při ceně nad rovnováhou chtějí výrobci prodávat více, než kolik jsou spotřebitelé ochotni koupit – na trhu vzniká přebytek.',
  },
  // Karta 23 - summary_end
  {
    id: 23,
    type: 'summary_end',
    title: 'Hotovo!',
    text: 'Prošel/prošla jsi základní ekonomické koncepty za pár minut. Získal/a jsi pevný přehled, na kterém můžeš dál stavět.',
  },
];
