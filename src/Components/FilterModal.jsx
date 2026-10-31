import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { SERVICE_TYPES } from '../data/index.js';
import '../Styles/FilterModal.css';

export function FilterModal({ services, selected, close, apply }) {
  const [draft, setDraft] = useState(selected);
  const dialogRef = useRef(null);
  const resultCount = services.filter(service => !draft.length || draft.includes(service.serviceType)).length;

  useEffect(() => {
    const previousFocus = document.activeElement;
    dialogRef.current?.focus();
    return () => previousFocus?.focus();
  }, []);

  function handleKeyDown(event) {
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    if (event.key !== 'Tab') return;
    const elements = [...dialogRef.current.querySelectorAll('button:not(:disabled)')];
    const first = elements[0];
    const last = elements.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialogRef.current)) {
      event.preventDefault(); first.focus();
    }
  }

  function toggleType(id) {
    setDraft(current => current.includes(id) ? current.filter(type => type !== id) : [...current, id]);
  }

  return <div className="mask" onClick={close}>
    <div className="modal filter-modal" role="dialog" aria-modal="true" aria-labelledby="filter-title" aria-describedby="filter-description" ref={dialogRef} tabIndex={-1} onKeyDown={handleKeyDown} onClick={event => event.stopPropagation()}>
      <div className="row filter-modal-heading"><span className="filter-modal-icon"><Icon n="filter" s={26} /></span><button className="filter-modal-close" aria-label="Fechar filtros" onClick={close}><Icon n="x" /></button></div>
      <h2 id="filter-title">Filtrar serviços</h2>
      <p id="filter-description" className="sub">Escolha um ou mais tipos de serviço.</p>
      <div className="filter-options" role="group" aria-label="Tipos de serviço">
        {SERVICE_TYPES.map(type => {
          const active = draft.includes(type.id);
          const count = services.filter(service => service.serviceType === type.id).length;
          return <button key={type.id} className={'filter-option' + (active ? ' is-selected' : '')} aria-pressed={active} onClick={() => toggleType(type.id)}>
            <span className="filter-option-check">{active && <Icon n="check" s={16} />}</span><span>{type.label}</span><span className="filter-option-count">{count}</span>
          </button>;
        })}
      </div>
      <div className="filter-modal-summary"><span aria-live="polite">{resultCount} {resultCount === 1 ? 'serviço encontrado' : 'serviços encontrados'}</span><button className="lnk" onClick={() => setDraft([])}>Limpar filtros</button></div>
      <button className="btn red" onClick={() => apply(draft)}>Aplicar filtros</button>
    </div>
  </div>;
}
