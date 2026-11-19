import { instagramUrl, type Language } from './content';
import { sitePath } from './paths';

const terms = {
  pt: {
    title: 'Termos e Condições', updated: 'Actualizado em 18 de Novembro de 2026', home: 'Página inicial',
    intro: 'Estes termos descrevem a utilização do website do Âmago Café, na Avenida Mártires da Machava, 826, Maputo, Moçambique.',
    sections: [
      ['Sobre o website', 'Este website apresenta o café, o menu, os preços e as fotografias do Âmago. Não permite fazer encomendas, pagamentos ou reservas online. Para esclarecer dúvidas ou combinar uma visita, contacte directamente a equipa.'],
      ['Menu e preços', 'Os preços estão indicados em meticais moçambicanos (MT). A disponibilidade dos produtos e os preços podem ser actualizados. Confirme com a equipa as opções e o preço antes de fazer o pedido no café. As fotografias não representam necessariamente todos os produtos disponíveis.'],
      ['Ingredientes e alergénios', 'As descrições do menu não constituem uma lista completa de ingredientes. Informe a equipa sobre alergias ou restrições alimentares antes de fazer o pedido e peça a informação de que necessita.'],
      ['Utilização do conteúdo', 'As fotografias, marcas e logótipos apresentados pertencem aos respectivos titulares. Para reutilizar conteúdo, solicite autorização ao respectivo titular, salvo quando a utilização seja permitida pela legislação aplicável. Não utilize o website para actividades ilícitas ou para interferir com o seu funcionamento.'],
      ['Ligações externas e preferência de idioma', 'Algumas ligações abrem serviços externos, como o Instagram, o Google Maps e o website da Nexzo_agency. Esses serviços têm os seus próprios termos e políticas de privacidade. Este website guarda a preferência de idioma no armazenamento local do seu navegador; pode eliminá-la nas definições do navegador.'],
      ['Actualizações e direitos', 'Podemos actualizar as informações e estes termos quando o website mudar. A data acima identifica a versão publicada. Estes termos não excluem os direitos que lhe sejam reconhecidos pela legislação aplicável.'],
    ],
    contactTitle: 'Contacto', contactText: 'Para questões sobre o website, o menu ou estes termos, contacte o Âmago Café.', contactLink: 'Contactar @amago.cafe',
  },
  en: {
    title: 'Terms & Conditions', updated: 'Updated 18 November 2026', home: 'Home',
    intro: 'These terms describe use of the Âmago Café website. The café is at Avenida Mártires da Machava, 826, Maputo, Mozambique.',
    sections: [
      ['About this website', 'This website presents the café, menu, prices and photographs. It does not accept online orders, payments or reservations. Contact the team directly with questions or to discuss a visit.'],
      ['Menu and prices', 'Prices are in Mozambican meticais (MT). Product availability and prices may be updated. Confirm your selection and its price with the team before ordering at the café. Photographs do not necessarily show every available product.'],
      ['Ingredients and allergens', 'Menu descriptions are not complete ingredient lists. Tell the team about allergies or dietary restrictions before ordering and ask for the information you need.'],
      ['Use of content', 'The photographs, brands and logos shown belong to their respective rights holders. Request permission from the relevant rights holder before reusing content, except where use is permitted by applicable law. Do not use the website for unlawful activities or interfere with its operation.'],
      ['External links and language preference', 'Some links open external services, including Instagram, Google Maps and the Nexzo_agency website. Those services have their own terms and privacy policies. This website saves your language preference in your browser’s local storage; you can remove it in your browser settings.'],
      ['Updates and your rights', 'We may update the information and these terms when the website changes. The date above identifies the published version. These terms do not exclude rights available to you under applicable law.'],
    ],
    contactTitle: 'Contact', contactText: 'Contact Âmago Café with questions about the website, menu or these terms.', contactLink: 'Contact @amago.cafe',
  },
};

export function Terms({ language }: { language: Language }) {
  const text = terms[language];
  return <article className="terms-page section-shell">
    <a className="text-link" href={sitePath('/')}>{text.home}</a>
    <header><h1>{text.title}</h1><p className="terms-date">{text.updated}</p><p>{text.intro}</p></header>
    {text.sections.map(([heading, body]) => <section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}
    <section><h2>{text.contactTitle}</h2><p>{text.contactText}</p><a className="text-link" href={instagramUrl} target="_blank" rel="noopener noreferrer">{text.contactLink}</a></section>
  </article>;
}
