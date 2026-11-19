import { sitePath } from './paths';
import { useEffect, useRef, useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import type { Language } from './content';
import { englishNames, menu, type MenuCategory } from './menu';

interface Photo { src: string; pt: string; en: string }

function PhotoViewer({ photos, start, language, close }: { photos: Photo[]; start: number; language: Language; close: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(start);
  const photo = photos[index];
  const move = (step: number) => setIndex(current => (current + step + photos.length) % photos.length);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    const element = dialog.current;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { element?.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  return <dialog className="photo-viewer" ref={dialog} aria-label={language === 'pt' ? 'Visualizador de fotografias' : 'Photo viewer'} onCancel={close} onClick={event => { if (event.currentTarget === event.target) close(); }} onKeyDown={event => {
    if (event.key === 'ArrowRight') move(1);
    if (event.key === 'ArrowLeft') move(-1);
    if (event.key === 'Tab') {
      const controls = event.currentTarget.querySelectorAll<HTMLButtonElement>('button');
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  }}>
    <button className="viewer-close icon-button" onClick={close} aria-label={language === 'pt' ? 'Fechar imagem' : 'Close image'}><X aria-hidden="true" /></button>
    <figure><img src={photo.src} alt={photo[language]} /><figcaption>{photo[language]} <span>{index + 1} / {photos.length}</span></figcaption></figure>
    {photos.length > 1 && <div className="viewer-controls"><button className="viewer-text" onClick={() => move(-1)} aria-label={language === 'pt' ? 'Imagem anterior' : 'Previous image'}>{language === 'pt' ? 'Anterior' : 'Previous'}</button><button className="viewer-text" onClick={() => move(1)} aria-label={language === 'pt' ? 'Próxima imagem' : 'Next image'}>{language === 'pt' ? 'Seguinte' : 'Next'}</button></div>}
  </dialog>;
}

export function RealMenu({ language }: { language: Language }) {
  const [category, setCategory] = useState<MenuCategory>('coffee');
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const categories = Object.keys(menu) as MenuCategory[];
  const selected = menu[category];
  return <section className={`menu-section section-shell real-menu ${category === 'matcha' ? 'matcha-menu' : ''}`} id="menu" aria-labelledby="menu-title">
    <div className="section-heading"><div><h2 id="menu-title">{language === 'pt' ? 'Menu' : 'Menu'}</h2><p>{language === 'pt' ? 'Café, matcha, tostas e pastelaria. Preços em meticais (MT).' : 'Coffee, matcha, toast and pastries. Prices in Mozambican meticais (MT).'}</p></div></div>
    <div className="menu-tabs" role="tablist" aria-label={language === 'pt' ? 'Categorias do menu' : 'Menu categories'}>{categories.map((key, index) => <button ref={element => { tabs.current[index] = element; }} key={key} role="tab" id={`tab-${key}`} aria-selected={category === key} aria-controls="menu-panel" tabIndex={category === key ? 0 : -1} onClick={() => setCategory(key)} onKeyDown={event => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % categories.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + categories.length) % categories.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = categories.length - 1;
      else return;
      event.preventDefault(); setCategory(categories[next]); tabs.current[next]?.focus();
    }}>{menu[key][language]}{category === key && <span className="tab-dot" />}</button>)}</div>
    <div className="real-menu-layout" role="tabpanel" id="menu-panel" aria-labelledby={`tab-${category}`}>
      <div className="menu-tables">{selected.groups.map(group => <div className="menu-group" key={group.pt}><h3>{group[language]}</h3><table><thead><tr><th scope="col">{language === 'pt' ? 'Produto' : 'Item'}</th><th scope="col">{group.sizes ? 'R' : language === 'pt' ? 'Preço' : 'Price'}</th>{group.sizes && <th scope="col">G</th>}</tr></thead><tbody>{group.rows.map(row => <tr key={row.name}><th scope="row">{language === 'en' ? englishNames[row.name] ?? row.name : row.name}{row.description && <small>{row.description[language]}</small>}</th><td>{row.prices[0]} MT</td>{group.sizes && <td>{row.prices[1] !== undefined ? `${row.prices[1]} MT` : '—'}</td>}</tr>)}</tbody></table></div>)}</div>
      <aside className="menu-photo"><img src={selected.photo} alt={language === 'pt' ? 'Um momento no Âmago Café' : 'A moment at Âmago Café'} loading="lazy" /><div><span>Âmago Café</span><p>{language === 'pt' ? 'Feito com alma. Servido com intenção.' : 'Made with soul. Served with intention.'}</p></div></aside>
    </div>
    <div className="menu-bottom"><p className="menu-note">{language === 'pt' ? 'Preços em meticais (MT). Consulte a equipa sobre disponibilidade e alergénios.' : 'Prices in Mozambican meticais (MT). Ask our team about availability and allergens.'}</p></div>
  </section>;
}

const gallery: Photo[] = [
  { src: sitePath('/images/amago-team.png'), pt: 'Feito com alma. Servido com intenção.', en: 'Made with soul. Served with intention.' },
  { src: sitePath('/images/amago-reading.png'), pt: 'Café para levar e um livro.', en: 'Takeaway coffee and a book.' },
  { src: sitePath('/images/amago-iced.png'), pt: 'Café e matcha para levar.', en: 'Coffee and matcha to go.' },
  { src: sitePath('/images/amago-espresso.png'), pt: 'Espresso no Âmago.', en: 'Espresso at Âmago.' },
  { src: sitePath('/images/amago-entrance.png'), pt: 'À porta do Âmago.', en: 'At the door of Âmago.' },
];

export function Gallery({ language, page = false }: { language: Language; page?: boolean }) {
  const Heading = page ? 'h1' : 'h2';
  const [selected, setSelected] = useState<number | null>(null);
  return <section className="gallery-section section-shell" id="gallery" aria-labelledby="gallery-title"><div className="section-heading"><div><Heading id="gallery-title">{language === 'pt' ? 'Galeria' : 'Gallery'}</Heading><p>{language === 'pt' ? 'Fotografias do Âmago Café.' : 'Photos from Âmago Café.'}</p></div><span className="gallery-label">{language === 'pt' ? 'Galeria' : 'Gallery'}</span></div><div className="gallery-grid">{gallery.map((photo, index) => <button key={photo.src} className="gallery-photo" onClick={() => setSelected(index)} aria-label={`${language === 'pt' ? 'Ampliar' : 'Enlarge'}: ${photo[language]}`}><img src={photo.src} alt={photo[language]} loading="lazy" /><span className="gallery-caption">{photo[language]}<ZoomIn size={18} /></span></button>)}</div>{selected !== null && <PhotoViewer photos={gallery} start={selected} language={language} close={() => setSelected(null)} />}</section>;
}
