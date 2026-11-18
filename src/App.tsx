import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Coffee, Heart, Instagram, MapPin, Menu, Plus, X } from 'lucide-react';
import { copy, instagramUrl, mapsUrl, menuItems, type Category, type Language, type MenuItem } from './content';

function Sun({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 80 80" fill="none" aria-hidden="true"><circle cx="40" cy="40" r="15" stroke="currentColor" strokeWidth="1.5" />{Array.from({ length: 12 }, (_, i) => <path key={i} d="M40 7v10" transform={`rotate(${i * 30} 40 40)`} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />)}</svg>;
}

function Wordmark({ className = '' }: { className?: string }) {
  return <span className={`wordmark ${className}`} aria-label="Âmago Café">âmago<span className="wordmark-caption">café</span></span>;
}

function ItemDialog({ item, language, onClose }: { item: MenuItem; language: Language; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const t = copy[language];
  const content = item[language];

  useEffect(() => {
    const el = dialog.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    el?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      el?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  return <dialog ref={dialog} className="item-dialog" aria-labelledby="item-title" onCancel={onClose} onKeyDown={event => {
    if (event.key !== 'Tab') return;
    const controls = event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]');
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first?.focus();
    }
  }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="dialog-layout">
      <img src={item.image} alt="" style={{ objectPosition: item.imagePosition }} />
      <div className="dialog-content">
        <button className="icon-button dialog-close" onClick={onClose} aria-label={t.close}><X /></button>
        <span className="small-note">{t.categories[item.category]}</span>
        <h2 id="item-title">{content.name}</h2>
        <p>{content.detail}</p>
        <div className="pairing"><Coffee size={20} /><div><h3>{t.pair}</h3><p>{content.pairing}</p></div></div>
        <p className="menu-note">{t.sampleNote}</p>
        <a className="button button-dark" href={instagramUrl} target="_blank" rel="noreferrer">{t.menuInquiry}<ArrowUpRight size={18} /></a>
      </div>
    </div>
  </dialog>;
}

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try { return localStorage.getItem('amago-language') === 'pt' ? 'pt' : 'en'; } catch { return 'en'; }
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [category, setCategory] = useState<Category>('coffee');
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const t = copy[language];
  const categories: Category[] = ['coffee', 'sweet', 'brunch'];
  const featured = menuItems.filter(item => item.category === category);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === 'en' ? 'Âmago Café — A little pause. A lot of soul.' : 'Âmago Café — Uma pequena pausa. Cheia de alma.';
    try { localStorage.setItem('amago-language', language); } catch { /* Storage may be unavailable in private browsers. */ }
  }, [language]);

  useEffect(() => {
    if (!mobileOpen) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        mobileToggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [mobileOpen]);

  return <>
    <a className="skip-link" href="#main">{t.skip}</a>
    <header className="site-header" id="top">
      <a className="brand" href="#top"><Wordmark /></a>
      <nav className={mobileOpen ? 'main-nav is-open' : 'main-nav'} aria-label={language === 'en' ? 'Main navigation' : 'Navegação principal'} id="main-navigation">
        {['essence', 'menu', 'visit'].map((id, index) => <a key={id} href={`#${id}`} onClick={() => setMobileOpen(false)}>{t.nav[index]}</a>)}
      </nav>
      <div className="header-actions">
        <div className="language-switch" aria-label={language === 'en' ? 'Language' : 'Idioma'}>{(['en', 'pt'] as const).map(lang => <button key={lang} onClick={() => { setLanguage(lang); setMobileOpen(false); }} aria-pressed={language === lang} aria-label={lang === 'en' ? 'English' : 'Português'}>{lang.toUpperCase()}</button>)}</div>
        <a className="header-hello" href={instagramUrl} target="_blank" rel="noreferrer">{t.hello}<ArrowUpRight size={16} /></a>
        <button ref={mobileToggleRef} className="icon-button mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-controls="main-navigation" aria-label={mobileOpen ? t.closeMenu : t.openMenu}>{mobileOpen ? <X /> : <Menu />}</button>
      </div>
    </header>

    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero-image" src="/images/coffee-moment.jpg" alt={language === 'en' ? 'A barista slowly brewing pour-over coffee in gentle morning light' : 'Preparação de café de filtro na luz suave da manhã'} fetchPriority="high" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="hero-location"><span />{t.location}</p>
          <h1 id="hero-title">{t.headline[0]}<br />{t.headline[1]}</h1>
          <p className="hero-description">{t.heroText}</p>
          <a className="button button-gold" href="#menu">{t.explore}<ArrowUpRight size={19} /></a>
        </div>
        <div className="hero-bottom"><span>{t.heroCaption}</span><a href="#essence">{t.scroll}<ArrowDown size={17} /></a></div>
        <div className="hero-seal"><Sun /><span>feito com alma<br /><span>made with soul</span></span></div>
      </section>

      <div className="values-strip">{t.ribbon.map((text, index) => <span key={text}>{index === 0 ? <Coffee /> : index === 1 ? <Sun /> : <Heart />}{text}</span>)}</div>

      <section className="essence section-shell" id="essence" aria-labelledby="essence-title">
        <div className="essence-heading"><span className="section-kicker">{t.essence}</span><h2 id="essence-title">âmago<span className="phonetic">/ˈɐ.mɐ.ɡu/</span></h2><p className="definition">{t.definition}</p></div>
        <div className="essence-story"><p>{t.story}</p><p>{t.storyEnd}</p><a className="text-link" href="#space">{t.ourSpace}<ArrowDown size={17} /></a></div>
      </section>

      <section className="menu-section section-shell" id="menu" aria-labelledby="menu-title">
        <div className="section-heading"><div><h2 id="menu-title">{t.menuHeading}</h2><p>{t.menuText}</p></div><Sun className="menu-sun" /></div>
        <div className="menu-tabs" role="tablist" aria-label={language === 'en' ? 'Menu inspiration' : 'Inspiração de menu'}>
          {categories.map((cat, index) => <button key={cat} id={`tab-${cat}`} role="tab" ref={el => { tabRefs.current[index] = el; }} aria-selected={category === cat} aria-controls="menu-panel" tabIndex={category === cat ? 0 : -1} onClick={() => setCategory(cat)} onKeyDown={event => {
            let next = index;
            if (event.key === 'ArrowRight') next = (index + 1) % categories.length;
            else if (event.key === 'ArrowLeft') next = (index + categories.length - 1) % categories.length;
            else if (event.key === 'Home') next = 0;
            else if (event.key === 'End') next = categories.length - 1;
            else return;
            event.preventDefault(); setCategory(categories[next]); tabRefs.current[next]?.focus();
          }}>{t.categories[cat]}{category === cat && <span className="tab-dot" />}</button>)}
        </div>
        <div className="menu-grid" role="tabpanel" id="menu-panel" aria-labelledby={`tab-${category}`}>
          {featured.map(item => <button className="menu-card" key={item.id} onClick={() => setSelected(item)} aria-label={`${t.viewDetails}: ${item[language].name}`}><div className="menu-card-image"><img src={item.image} alt={item[language].description.split(' · ')[0]} style={{ objectPosition: item.imagePosition }} loading="lazy" /><span className="card-arrow"><ArrowUpRight size={23} /></span></div><div className="menu-card-copy"><h3>{item[language].name}</h3><p>{item[language].description}</p></div></button>)}
        </div>
        <div className="menu-bottom"><p className="menu-note">{t.sampleNote}</p><a className="text-link" href={instagramUrl} target="_blank" rel="noreferrer">{t.currentMenu}<ArrowUpRight size={17} /></a></div>
      </section>

      <section className="space-section" id="space" aria-labelledby="space-title"><div className="space-photo"><img src="/images/cafe-space.jpg" alt={language === 'en' ? 'Mood photograph of a café with warm pendant lamps and a glowing café sign' : 'Fotografia de inspiração de um café com candeeiros acolhedores e um letreiro luminoso'} loading="lazy" /><span>{t.spaceNote}</span></div><div className="space-copy"><Sun /><h2 id="space-title">{t.spaceHeading[0]}<br />{t.spaceHeading[1]}</h2><p>{t.spaceText}</p><a className="text-link" href={instagramUrl} target="_blank" rel="noreferrer">{t.spaceLink}<ArrowUpRight size={18} /></a><p className="photo-note">{t.photoNote}</p></div></section>

      <section className="instagram-section section-shell" aria-labelledby="instagram-title"><div className="instagram-intro"><Instagram size={25} strokeWidth={1.4} /><h2 id="instagram-title">{t.instagramHeading}</h2><p>{t.instagramText}</p><a className="text-link" href={instagramUrl} target="_blank" rel="noreferrer">{t.follow}<ArrowUpRight size={18} /></a></div><a href={instagramUrl} className="instagram-photo instagram-photo-one" target="_blank" rel="noreferrer" aria-label={t.follow}><img src="/images/pastry.jpg" alt={language === 'en' ? 'Golden pastries, a little inspiration for a sweet pause' : 'Pastelaria dourada, inspiração para uma pausa doce'} loading="lazy" /><Instagram size={22} /></a><a href={instagramUrl} className="instagram-photo instagram-photo-two" target="_blank" rel="noreferrer" aria-label={t.follow}><img src="/images/coffee.jpg" alt={language === 'en' ? 'A beautifully poured cup of coffee' : 'Uma chávena de café preparada com cuidado'} loading="lazy" /><Instagram size={22} /></a></section>

      <section className="visit-section" id="visit" aria-labelledby="visit-title"><div className="section-shell visit-layout"><div className="visit-intro"><span className="visit-pin"><MapPin size={22} /></span><h2 id="visit-title">{t.visitHeading[0]}<br />{t.visitHeading[1]}</h2><p>{t.visitText}</p><a className="button button-gold" href={mapsUrl} target="_blank" rel="noreferrer">{t.directions}<ArrowUpRight size={18} /></a></div><div className="visit-details"><div><h3>{t.addressLabel}</h3><address>{t.address}<br />{t.city}</address></div><div><h3>{t.hoursLabel}</h3><p>{t.hoursText}</p><a className="light-link" href={instagramUrl} target="_blank" rel="noreferrer">{t.contact}<ArrowUpRight size={16} /></a></div></div><div className="visit-art" aria-hidden="true"><Sun /><span>até já.</span><div className="art-line" /></div></div></section>

      <section className="faq-section section-shell" aria-labelledby="faq-title"><h2 id="faq-title">{t.faqTitle}</h2><div className="faq-list">{t.faqs.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={18} /></summary><p>{answer}</p></details>)}</div></section>
    </main>

    <footer className="site-footer section-shell"><div className="footer-main"><a href="#top" className="brand"><Wordmark /></a><p>{t.footer}</p><div className="footer-links"><a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram @amago.cafe"><Instagram size={22} /></a><a href={mapsUrl} target="_blank" rel="noreferrer" aria-label={t.directions}><MapPin size={22} /></a><a href="#top" className="back-top" aria-label={t.backTop}><ArrowUpRight size={22} /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Âmago Café</span><span>{t.rights}</span><span>Maputo, Moçambique</span></div></footer>
    {selected && <ItemDialog item={selected} language={language} onClose={() => setSelected(null)} />}
  </>;
}
