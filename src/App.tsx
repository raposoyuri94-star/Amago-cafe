import { sitePath } from './paths';
import { useEffect, useRef, useState } from 'react';
import { Instagram, MapPin, Menu, Plus, X } from 'lucide-react';
import { copy, instagramUrl, mapsUrl, type Language } from './content';
import { RealMenu, Gallery } from './MenuGallery';
import { MobileNav } from './MobileNav';
import { Terms } from './Terms';

function Sun({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 80 80" fill="none" aria-hidden="true"><circle cx="40" cy="40" r="15" stroke="currentColor" strokeWidth="1.5" />{Array.from({ length: 12 }, (_, i) => <path key={i} d="M40 7v10" transform={`rotate(${i * 30} 40 40)`} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />)}</svg>;
}

function Wordmark() {
  return <img className="brand-logo" src={sitePath('/images/amago-logo.png')} alt="Âmago Café" width={207} height={60} />;
}

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try { return localStorage.getItem('amago-language-v2') === 'en' ? 'en' : 'pt'; } catch { return 'pt'; }
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const t = copy[language];
  const isGallery = /\/galeria(?:\.html)?\/?$/.test(window.location.pathname);
  const isTerms = /\/termos(?:\.html)?\/?$/.test(window.location.pathname);
  const isSubpage = isGallery || isTerms;

  useEffect(() => {
    // Cross-page section links must wait until React has rendered their target.
    const target = window.location.hash.slice(1);
    if (!target) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = isTerms ? `${language === 'pt' ? 'Termos e Condições' : 'Terms & Conditions'} — Âmago Café` : isGallery ? `${language === 'pt' ? 'Galeria' : 'Gallery'} — Âmago Café` : 'Âmago Café, Maputo';
    try { localStorage.setItem('amago-language-v2', language); } catch { /* Storage may be unavailable in private browsers. */ }
  }, [language, isGallery, isTerms]);

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
      <a className="brand" href={sitePath('/')}><Wordmark /></a>
      <nav className={mobileOpen ? 'main-nav is-open' : 'main-nav'} aria-label={language === 'en' ? 'Main navigation' : 'Navegação principal'} id="main-navigation">
        {['essence', 'menu', 'visit'].map((id, index) => <a key={id} href={`${isSubpage ? sitePath('/') : ''}#${id}`} onClick={() => setMobileOpen(false)}>{t.nav[index]}</a>)}
        <a href={sitePath('/galeria.html')} aria-current={isGallery ? 'page' : undefined} onClick={() => setMobileOpen(false)}>{language === 'pt' ? 'Galeria' : 'Gallery'}</a>
      </nav>
      <div className="header-actions">
        <div className="language-switch" aria-label={language === 'en' ? 'Language' : 'Idioma'}>{(['en', 'pt'] as const).map(lang => <button key={lang} onClick={() => { setLanguage(lang); setMobileOpen(false); }} aria-pressed={language === lang} aria-label={lang === 'en' ? 'English' : 'Português'}>{lang.toUpperCase()}</button>)}</div>
        <a className="header-hello" href={`${isSubpage ? sitePath('/') : ''}#visit`}>{t.hello}</a>
        <button ref={mobileToggleRef} className="icon-button mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-controls="main-navigation" aria-label={mobileOpen ? t.closeMenu : t.openMenu}>{mobileOpen ? <X /> : <Menu />}</button>
      </div>
    </header>

    <main id="main">
      {isTerms ? <Terms language={language} /> : isGallery ? <div className="gallery-page"><div className="section-shell"><a className="text-link" href={sitePath('/')}>{language === 'pt' ? 'Página inicial' : 'Home'}</a></div><Gallery language={language} page /></div> : <>
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero-image" src={sitePath('/images/amago-espresso.png')} alt={language === 'en' ? 'An Âmago cup beneath the espresso machine' : 'Uma chávena do Âmago na máquina de espresso'} fetchPriority="high" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="hero-location"><span />{t.location}</p>
          <h1 id="hero-title">{t.headline[0]}<br />{t.headline[1]}</h1>
          <p className="hero-description">{t.heroText}</p>
          <a className="button button-gold" href="#menu">{t.explore}</a>
        </div>
        <div className="hero-bottom"><span>{t.heroCaption}</span><a href="#essence">{t.scroll}</a></div>
      </section>


      <section className="essence section-shell" id="essence" aria-labelledby="essence-title">
        <div className="essence-heading"><span className="section-kicker">{t.essence}</span><h2 id="essence-title">âmago<span className="phonetic">/ˈɐ.mɐ.ɡu/</span></h2><p className="definition">{t.definition}</p></div>
        <div className="essence-story"><p>{t.story}</p><p>{t.storyEnd}</p><a className="text-link" href="#space">{t.ourSpace}</a></div>
      </section>

      <RealMenu language={language} />

      <section className="space-section" id="space" aria-labelledby="space-title"><div className="space-photo"><img src={sitePath('/images/amago-entrance.png')} alt={language === 'en' ? 'A takeaway cup outside the entrance to Âmago Café' : 'Um café para levar à entrada do Âmago Café'} loading="lazy" /><span>{t.spaceNote}</span></div><div className="space-copy"><Sun /><h2 id="space-title">{t.spaceHeading[0]}<br />{t.spaceHeading[1]}</h2><p>{t.spaceText}</p><a className="text-link" href={sitePath('/galeria.html')}>{t.spaceLink}</a></div></section>

      <section className="instagram-section section-shell" aria-labelledby="photos-title"><div className="instagram-intro"><h2 id="photos-title">{t.galleryHeading}</h2><p>{t.galleryText}</p><a className="text-link" href={sitePath('/galeria.html')}>{t.galleryLink}</a></div><a href={sitePath('/galeria.html')} className="instagram-photo instagram-photo-one" aria-label={t.galleryLink}><img src={sitePath('/images/amago-iced.png')} alt={language === 'en' ? 'Iced coffee and matcha at Âmago' : 'Café e matcha gelados no Âmago'} loading="lazy" /></a><a href={sitePath('/galeria.html')} className="instagram-photo instagram-photo-two" aria-label={t.galleryLink}><img src={sitePath('/images/amago-reading.png')} alt={language === 'en' ? 'An Âmago coffee and an open book' : 'Um café do Âmago e um livro aberto'} loading="lazy" /></a></section>



      <section className="visit-section" id="visit" aria-labelledby="visit-title"><div className="section-shell visit-layout"><div className="visit-intro"><span className="visit-pin"><MapPin size={22} /></span><h2 id="visit-title">{t.visitHeading[0]}<br />{t.visitHeading[1]}</h2><p>{t.visitText}</p><a className="button button-gold" href={mapsUrl} target="_blank" rel="noreferrer">{t.directions}</a></div><div className="visit-details"><div><h3>{t.addressLabel}</h3><address>{t.address}<br />{t.city}</address></div><div><h3>{t.hoursLabel}</h3><p>{t.hoursText}</p><a className="light-link" href={instagramUrl} target="_blank" rel="noreferrer">{t.contact}</a></div></div></div></section>

      <section className="faq-section section-shell" aria-labelledby="faq-title"><h2 id="faq-title">{t.faqTitle}</h2><div className="faq-list">{t.faqs.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={18} /></summary><p>{answer}</p></details>)}</div></section>
      </>}
    </main>

    <footer className="site-footer section-shell"><div className="footer-main"><a href="#top" className="brand"><Wordmark /></a><p>{t.footer}</p><div className="footer-links"><a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram @amago.cafe"><Instagram size={22} /></a><a href={mapsUrl} target="_blank" rel="noreferrer" aria-label={t.directions}><MapPin size={22} /></a><a href="#top" className="text-link" aria-label={t.backTop}>{t.backTop}</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Âmago Café</span><span><a className="agency-credit" href="https://raposoyuri94-star.github.io/nexzo-agency-website/" target="_blank" rel="noopener noreferrer">{t.rights}</a></span><span>Maputo, Moçambique</span></div><div className="footer-legal"><a href={sitePath('/termos.html')} aria-current={isTerms ? 'page' : undefined}>{language === 'pt' ? 'Termos e Condições' : 'Terms & Conditions'}</a></div></footer>

    <MobileNav language={language} isGallery={isGallery} isTerms={isTerms} onNavigate={() => setMobileOpen(false)} />
  </>;
}
