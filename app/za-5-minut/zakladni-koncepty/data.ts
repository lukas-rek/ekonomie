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
  interactiveType?: 'pizza' | 'workers' | 'ppf' | 'trade' | 'market_curves' | 'price';
}

export const cards: Card[] = [
  // Karta 1
  {
    id: 1,
    type: 'intro',
    title: 'Základní ekonomické koncepty za 5 minut',
    text: 'Rychlý přehled nejdůležitějších myšlenek, než se pustíš do celé učebnice. Zabere ti to jen pár minut.',
  },
  // Karta 2
  {
    id: 2,
    type: 'concept',
    title: 'Co je ekonomie?',
    text: 'Ekonomie zkoumá, jak se lidé rozhodují v situacích, kdy mají omezené zdroje a nemohou mít všechno.',
    icon: 'brain',
  },
  // Karta 3
  {
    id: 3,
    type: 'flip',
    title: 'Dělení ekonomie',
    front: 'Mikroekonomie',
    back: 'Sleduje chování jednotlivců, rodin a konkrétních firem na jednotlivých trzích.',
  },
  // Karta 4
  {
    id: 4,
    type: 'flip',
    title: 'Dělení ekonomie',
    front: 'Makroekonomie',
    back: 'Dívá se na hospodářství jako na celek. Řeší inflaci, nezaměstnanost a celkový růst ekonomiky.',
  },
  // Karta 5
  {
    id: 5,
    type: 'quiz_single',
    title: 'Rychlá kontrola',
    question: 'Zkoumání dopadu inflace na celou zemi patří do:',
    options: ['Mikroekonomie', 'Makroekonomie', 'Ani jedno'],
    correctIndex: 1,
    explanation: 'Inflace se týká zdražování v celé zemi, proto spadá pod makroekonomii.',
  },
  // Karta 6
  {
    id: 6,
    type: 'concept',
    title: 'Vzácnost a volby',
    text: 'Čas i peníze máme spočítané. Když se pro něco rozhodneš, automaticky tím obětuješ jinou možnost. Každá volba něco stojí.',
    icon: 'scale',
  },
  // Karta 7 (Kebab a kino)
  {
    id: 7,
    type: 'scenario',
    title: 'Kebab, nebo kino?',
    text: 'Máš v kapse 200 Kč. Dáš si pořádný kebab, nebo půjdeš raději do kina?',
    options: ['Kebab', 'Kino'],
    explanation: 'Ať už si vybereš cokoliv, nákladem obětované příležitosti je to druhé, co jsi oželel. Skutečnou cenou tvé volby je právě ztracený zážitek z druhé možnosti.',
  },
  // Karta 8
  {
    id: 8,
    type: 'concept',
    title: 'Užitek a mezní užitek',
    text: 'Věci nám dělají radost a přinášejí užitek. Čím víc jich ale máme, tím méně si vážíme každého dalšího kusu.',
    icon: 'pizza',
  },
  // Karta 9 (Pizza)
  {
    id: 9,
    type: 'interactive_tap',
    interactiveType: 'pizza',
    title: 'Kolikátý kousek pizzy ti chutná nejvíc?',
    text: 'Zvol číslo kousku a sleduj, jak se mění tvůj užitek z každého dalšího sousta.',
  },
  // Karta 10
  {
    id: 10,
    type: 'quiz_single',
    title: 'Paradox hodnoty',
    question: 'Proč je voda levnější než diamanty, i když je pro život důležitější?',
    options: [
      'Vody je všude dost, takže další litr má malý mezní užitek',
      'Protože diamanty jsou hezčí',
      'Protože voda není statek',
    ],
    correctIndex: 0,
    explanation: 'Voda je pro přežití zásadní, ale máme jí tolik, že další sklenice nemá velkou hodnotu. Diamantů je málo, proto má každý další kus obrovskou cenu.',
  },
  // Karta 11
  {
    id: 11,
    type: 'concept',
    title: 'Výrobní faktory',
    text: 'Půda, práce, kapitál a podnikavost. To jsou čtyři základní stavební kameny, které potřebuješ k výrobě čehokoliv.',
    icon: 'factory',
  },
  // Karta 12
  {
    id: 12,
    type: 'flip_grid',
    title: '4 výrobní faktory',
    text: 'Klepni na jednotlivé faktory pro jejich vysvětlení:',
    miniCards: [
      { front: 'Půda', back: 'Přírodní zdroje, pozemky, voda, nerosty a energie.' },
      { front: 'Práce', back: 'Čas i fyzické a duševní úsilí lidí při výrobě.' },
      { front: 'Kapitál', back: 'Budovy, stroje, auta i nářadí potřebné k práci.' },
      { front: 'Podnikavost', back: 'Odvaha dát vše dohromady, přijít s nápadem a nést riziko.' },
    ],
  },
  // Karta 13
  {
    id: 13,
    type: 'concept',
    title: 'Klesající mezní výnosy',
    text: 'Když budeš do jedné malé dílny posílat další a další dělníky, výroba neporoste věčně. Každý nový člověk přispěje o něco méně než ten předchozí.',
    icon: 'users',
  },
  // Karta 14 (Workers)
  {
    id: 14,
    type: 'interactive_tap',
    interactiveType: 'workers',
    title: 'Kolik pracovníků najmeš?',
    text: 'Přidávej lidi do dílny a sleduj, jak klesá přínos každého dalšího pracovníka.',
  },
  // Karta 15
  {
    id: 15,
    type: 'concept',
    title: 'Hranice produkčních možností (PPF)',
    text: 'Tato křivka ukazuje, kolik toho dokáže země vyrobit, když naplno využije všechny své lidi, stroje i suroviny.',
    icon: 'chart',
  },
  // Karta 16
  {
    id: 16,
    type: 'interactive_tap',
    interactiveType: 'ppf',
    title: 'Vyber bod na hranici možností',
    text: 'Zvol bod a sleduj volbu mezi výrobou aut a obilí, nebo vyzkoušej vliv nových technologií.',
  },
  // Karta 17
  {
    id: 17,
    type: 'quiz_single',
    title: 'Efektivita PPF',
    question: 'Co znamená bod uvnitř hranice produkčních možností?',
    options: [
      'Využíváme všechny zdroje naplno',
      'Plýtváme zdroji, část jich leží ladem',
      'Takový stav nemůže nastat',
    ],
    correctIndex: 1,
    explanation: 'Znamená to neefektivitu. V ekonomice jsou například nezaměstnaní lidé nebo stojí nevyužité továrny.',
  },
  // Karta 18
  {
    id: 18,
    type: 'concept',
    title: 'Komparativní výhoda',
    text: 'I když je někdo šikovnější ve všem, vyplatí se rozdělit práci. Každý by se měl věnovat tomu, v čem je relativně nejlepší.',
    icon: 'handshake',
  },
  // Karta 19
  {
    id: 19,
    type: 'interactive_tap',
    interactiveType: 'trade',
    title: 'Proč se vyplatí specializace?',
    text: 'Podívej se, jak dopadne výroba dvou zemí, když pracují samy, a když se rozdělí o úkoly.',
  },
  // Karta 20 (Graf nabídky a poptávky s vysvětlením proč stoupá/klesá)
  {
    id: 20,
    type: 'interactive_tap',
    interactiveType: 'market_curves',
    title: 'Jak funguje nabídka a poptávka?',
    text: 'Podívej se, jak se chová křivka poptávky a nabídky a proč má každá jiný směr.',
  },
  // Karta 21 (Co se stane při jiné ceně)
  {
    id: 21,
    type: 'interactive_tap',
    interactiveType: 'price',
    title: 'Co se stane při jiné ceně?',
    text: 'Vyzkoušej, jak trh reaguje, když se cena odchýlí od rovnováhy.',
  },
  // Karta 22
  {
    id: 22,
    type: 'quiz_single',
    title: 'Tržní rovnováha',
    question: 'Když je cena zboží příliš vysoko nad rovnováhou, co se stane?',
    options: ['Nedostatek zboží', 'Přebytek zboží', 'Trh se sám vyčistí'],
    correctIndex: 1,
    explanation: 'Při vysoké ceně chtějí firmy hodně prodávat, ale lidé nechtějí nakupovat. Ve skladech se hromadí neprodané zboží.',
  },
  // Karta 23
  {
    id: 23,
    type: 'summary_end',
    title: 'Máš hotovo!',
    text: 'Během pěti minut jsi prošel hlavní základy ekonomie.',
  },
];
