import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { LOCATIONS, SEARCH_RADII, locationLabel } from '../data/locations';
import '../Styles/LocationModal.css';

const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

export function LocationModal({ location, close, apply, deviceLocationAllowed = true }) {
  const [draft, setDraft] = useState(location);
  const [query, setQuery] = useState('');
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState('');
  const dialogRef = useRef(null);
  const active = useRef(true);
  const requestId = useRef(0);
  const places = LOCATIONS.filter(place => normalize(locationLabel(place)).includes(normalize(query)));

  useEffect(() => {
    active.current = true;
    const previousFocus = document.activeElement;
    dialogRef.current?.focus();
    return () => { active.current = false; previousFocus?.focus(); };
  }, []);

  function handleKeyDown(event) {
    if (event.key === 'Escape') { event.preventDefault(); close(); return; }
    if (event.key !== 'Tab') return;
    const elements = [...dialogRef.current.querySelectorAll('button:not(:disabled), input, select')];
    const first = elements[0], last = elements.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialogRef.current)) {
      event.preventDefault(); first.focus();
    }
  }

  function useDeviceLocation() {
    if (!navigator.geolocation) { setError('Este navegador não oferece localização. Escolha uma região abaixo.'); return; }
    const id = ++requestId.current;
    setLocating(true); setError('');
    navigator.geolocation.getCurrentPosition(position => {
      if (!active.current || requestId.current !== id) return;
      const { latitude: lat, longitude: lon } = position.coords;
      setDraft(current => ({ id: 'device', name: 'Localização atual', lat, lon, radius: current.radius }));
      setLocating(false);
    }, reason => {
      if (!active.current || requestId.current !== id) return;
      setError(reason.code === 1 ? 'Permissão de localização negada. Você pode escolher uma região abaixo.' : reason.code === 3 ? 'A localização demorou para responder. Tente novamente ou escolha uma região.' : 'Não foi possível obter sua localização. Escolha uma região ou tente novamente.');
      setLocating(false);
    }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 });
  }

  function choose(place) {
    requestId.current += 1;
    setLocating(false); setError('');
    setDraft(current => ({ ...place, radius: current.radius }));
  }

  return <div className="mask location-mask" onClick={close}>
    <div className="modal location-modal" ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="location-title" aria-describedby="location-description" onKeyDown={handleKeyDown} onClick={event => event.stopPropagation()}>
      <div className="row location-heading"><span className="location-icon"><Icon n="pin" s={26} /></span><button className="location-close" aria-label="Fechar localização" onClick={close}><Icon n="x" /></button></div>
      <h2 id="location-title">Onde buscar serviços?</h2>
      <p className="sub" id="location-description">Escolha uma região e a distância da busca.</p>
      <button className="btn out location-device" onClick={useDeviceLocation} disabled={locating || !deviceLocationAllowed}><Icon n="pin" s={20} />{locating ? 'Obtendo localização...' : 'Usar minha localização'}</button>
      {!deviceLocationAllowed && <p className="location-note">O uso da localização do dispositivo está desativado em Privacidade e segurança. Você pode escolher uma região abaixo.</p>}
      {error && <p className="location-error" role="alert">{error}</p>}
      <div className="field location-search"><Icon n="search" s={20} /><input aria-label="Buscar bairro ou cidade" placeholder="Buscar bairro ou cidade" value={query} onChange={event => setQuery(event.target.value)} /></div>
      <div className="location-places" role="group" aria-label="Regiões disponíveis">
        {places.map(place => <button className={'location-place' + (draft.id === place.id ? ' is-selected' : '')} key={place.id} aria-pressed={draft.id === place.id} onClick={() => choose(place)}><Icon n="pin" s={20} /><span><b>{place.name}</b><small>{place.city}</small></span>{draft.id === place.id && <Icon n="check" s={20} />}</button>)}
        {!places.length && <p className="location-no-results">Região não encontrada. Tente o nome da cidade ou use sua localização.</p>}
      </div>
      <label htmlFor="location-radius">Distância máxima</label>
      <select id="location-radius" className="location-radius" value={draft.radius} onChange={event => setDraft(current => ({ ...current, radius: Number(event.target.value) }))}>{SEARCH_RADII.map(radius => <option key={radius} value={radius}>Até {radius} km</option>)}</select>
      <p className="location-selected" aria-live="polite">{locationLabel(draft)} · {draft.radius} km{draft.id === 'device' && <small>{draft.lat.toFixed(4)}, {draft.lon.toFixed(4)}</small>}</p>
      <p className="location-note">Cada região recebe serviços fictícios de demonstração, com preços e distâncias simulados.</p>
      <button className="btn red" disabled={locating} onClick={() => { if (apply(draft) === false) setError('Não foi possível salvar a localização neste navegador. Tente novamente.'); }}>Aplicar localização</button>
    </div>
  </div>;
}
