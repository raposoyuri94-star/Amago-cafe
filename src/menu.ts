export type MenuCategory = 'coffee' | 'matcha' | 'toast' | 'pastry';
export interface MenuRow { name: string; prices: [number, number?]; description?: { pt: string; en: string } }
export interface MenuGroup { pt: string; en: string; sizes?: boolean; rows: MenuRow[] }
export interface MenuSection { pt: string; en: string; original: string; photo: string; groups: MenuGroup[] }

const milk: MenuRow = { name: 'Opções de leite', prices: [80, 100], description: { pt: 'Sem lactose, magro, aveia, amêndoa', en: 'Lactose-free, low-fat, oat, almond' } };
const syrup: MenuRow = { name: 'Opções de xaropes', prices: [40, 60], description: { pt: 'Baunilha, avelã, caramelo, morango', en: 'Vanilla, hazelnut, caramel, strawberry' } };

export const menu: Record<MenuCategory, MenuSection> = {
  coffee: {
    pt: 'Café', en: 'Coffee', original: '/images/menu-coffee.png', photo: '/images/amago-espresso.png',
    groups: [
      { pt: 'Quente', en: 'Hot', sizes: true, rows: [
        { name: 'Espresso', prices: [120, 200] }, { name: 'Americano', prices: [190, 300] },
        { name: 'Macchiato', prices: [160] }, { name: 'Cappuccino', prices: [250, 370] },
        { name: 'Flat white', prices: [260, 380] }, { name: 'Latte', prices: [220, 340] },
        { name: 'Moccacino', prices: [300, 440] }, { name: 'Chocolate quente', prices: [250, 420] },
        { name: 'Chocolate branco quente', prices: [280, 450] }, { name: 'White mocha', prices: [320, 460] },
        { name: 'Chá 100% natural', prices: [200], description: { pt: 'Gengibre ou balacate', en: 'Ginger or lemongrass' } },
      ] },
      { pt: 'Gelado', en: 'Iced', rows: [
        { name: 'Americano', prices: [220] }, { name: 'Latte', prices: [240] },
        { name: 'Moccacino', prices: [320] }, { name: 'Chocolate gelado', prices: [270] },
        { name: 'Chocolate branco gelado', prices: [330] }, { name: 'White mocha gelado', prices: [380] },
        { name: 'Chá gelado', prices: [250], description: { pt: 'Ananás e gengibre, balacate ou frutos vermelhos', en: 'Pineapple and ginger, lemongrass or red fruits' } },
      ] },
      { pt: 'Extras', en: 'Extras', sizes: true, rows: [milk, syrup] },
    ],
  },
  matcha: {
    pt: 'Matcha bar', en: 'Matcha bar', original: '/images/menu-matcha.png', photo: '/images/amago-iced.png',
    groups: [
      { pt: 'Quente', en: 'Hot', sizes: true, rows: [
        { name: 'Matcha latte', prices: [350, 490] }, { name: 'Matcha latte de baunilha', prices: [350, 490] },
        { name: 'Matcha latte de morango', prices: [350, 490] }, { name: 'Matcha latte de chocolate', prices: [350, 490] },
        { name: 'Shot duplo de matcha', prices: [80, 100] },
      ] },
      { pt: 'Gelado', en: 'Iced', rows: [
        { name: 'Matcha latte', prices: [380] }, { name: 'Matcha latte de baunilha', prices: [380] },
        { name: 'Matcha latte de morango', prices: [380] }, { name: 'Matcha latte de chocolate', prices: [380] },
        { name: 'Matcha com água de coco', prices: [380] }, { name: 'Shot duplo de matcha', prices: [80] },
      ] },
      { pt: 'Extras', en: 'Extras', sizes: true, rows: [milk, syrup] },
    ],
  },
  toast: {
    pt: 'Tostas', en: 'Toast', original: '/images/menu-food.png', photo: '/images/amago-reading.png',
    groups: [{ pt: 'Tostas', en: 'Toast', rows: [
      { name: 'Queijo', prices: [200], description: { pt: 'Pão, manteiga e queijo', en: 'Bread, butter and cheese' } },
      { name: 'Mista', prices: [250], description: { pt: 'Pão, manteiga, queijo e fiambre de frango', en: 'Bread, butter, cheese and chicken ham' } },
      { name: 'Frango', prices: [350], description: { pt: 'Pão, frango, maionese light e azeitonas pretas', en: 'Bread, chicken, light mayonnaise and black olives' } },
      { name: 'Atum', prices: [350], description: { pt: 'Pão, atum, maionese light e cebola roxa', en: 'Bread, tuna, light mayonnaise and red onion' } },
    ] }],
  },
  pastry: {
    pt: 'Pastelaria', en: 'Pastries', original: '/images/menu-food.png', photo: '/images/amago-entrance.png',
    groups: [{ pt: 'Pastelaria', en: 'Pastries', rows: [
      { name: 'Biscoito', prices: [150], description: { pt: 'Biscoito artesanal com pepitas de chocolate', en: 'Artisanal chocolate chip cookie' } },
      { name: 'Matcha cookie', prices: [180], description: { pt: 'Biscoito artesanal de matcha com pepitas de chocolate branco', en: 'Artisanal matcha and white chocolate chip cookie' } },
      { name: 'Brownie', prices: [160], description: { pt: 'Brownie rico de chocolate', en: 'Rich chocolate brownie' } },
      { name: 'Âmago cinnamon bun', prices: [180], description: { pt: 'Caracol de canela', en: 'Our gooey cinnamon bun' } },
      { name: 'Banana bread muffin', prices: [200], description: { pt: 'Muffin de pão de banana com farinha de aveia e mel. Apenas às quintas-feiras.', en: 'Banana bread muffin with oat flour and honey. Thursdays only.' } },
    ] }],
  },
};

export const englishNames: Record<string, string> = {
  'Opções de leite': 'Milk alternatives', 'Opções de xaropes': 'Syrup options',
  'Chocolate quente': 'Hot chocolate', 'Chocolate branco quente': 'Hot white chocolate',
  'Chá 100% natural': '100% natural tea', 'Chocolate gelado': 'Iced chocolate',
  'Chocolate branco gelado': 'Iced white chocolate', 'White mocha gelado': 'Iced white mocha', 'Chá gelado': 'Iced tea',
  'Matcha latte de baunilha': 'Vanilla matcha latte', 'Matcha latte de morango': 'Strawberry matcha latte',
  'Matcha latte de chocolate': 'Chocolate matcha latte', 'Matcha com água de coco': 'Coconut water matcha',
  'Shot duplo de matcha': 'Double shot of matcha', 'Queijo': 'Cheese', 'Mista': 'Cheese and chicken ham',
  'Frango': 'Chicken', 'Atum': 'Tuna', 'Biscoito': 'Cookie',
};
