import { sitePath } from './paths';
import { useEffect, useState } from 'react';
import { Home, Images, MapPin, UtensilsCrossed } from 'lucide-react';
import type { Language } from './content';

type Destination = 'home' | 'menu' | 'gallery' | 'visit';

export function MobileNav({ language, isGallery, onNavigate }: {
  language: Language;
  isGallery: boolean;
  onNavigate: () => void;
}) {
  const [active, setActive] = useState<Destination>(isGallery ? 'gallery' : 'home');

  useEffect(() => {
    if (isGallery) return;
    let frame = 0;
    const update = () => {
      const position = window.innerHeight * 0.4;
      const section = (['visit', 'menu'] as const).find(id => {
        const bounds = document.getElementById(id)?.getBoundingClientRect();
        return bounds && bounds.top <= position && bounds.bottom > position;
      });
      setActive(section ?? 'home');
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [isGallery]);

  const destinations = [
    { id: 'home', label: language === 'pt' ? 'Início' : 'Home', href: `${isGallery ? sitePath('/') : ''}#top`, Icon: Home },
    { id: 'menu', label: 'Menu', href: `${isGallery ? sitePath('/') : ''}#menu`, Icon: UtensilsCrossed },
    { id: 'gallery', label: language === 'pt' ? 'Galeria' : 'Gallery', href: sitePath('/galeria.html'), Icon: Images },
    { id: 'visit', label: language === 'pt' ? 'Visitar' : 'Visit', href: `${isGallery ? sitePath('/') : ''}#visit`, Icon: MapPin },
  ] as const;

  return <nav className="mobile-bottom-nav" aria-label={language === 'pt' ? 'Navegação móvel' : 'Mobile navigation'}>
    {destinations.map(({ id, label, href, Icon }) => <a key={id} href={href} aria-current={active === id ? (isGallery ? 'page' : 'location') : undefined} onClick={onNavigate}>
      <span className="mobile-tab-icon"><Icon size={21} strokeWidth={1.6} aria-hidden="true" /></span>
      <span>{label}</span>
    </a>)}
  </nav>;
}
