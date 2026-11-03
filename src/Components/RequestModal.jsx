import { useState } from 'react';
import { Icon } from './Icon';
import { useModalDialog } from './useModalDialog';
import { locationLabel } from '../data/locations';
import { VEHICLE_TYPES } from '../data/account';
import { SERVICE_TYPES } from '../data/index';
import '../Styles/RequestModal.css';

export function RequestModal({ close, publish, location, openLocation, vehicles = [] }) {
  const [draft, setDraft] = useState({ t: '', desc: '', cat: 'carros', serviceType: 'mecanica', vehicle: '' });
  const [error, setError] = useState('');
  const dialog = useModalDialog(close);
  const update = key => event => setDraft(current => ({ ...current, [key]: event.target.value }));
  function submit(event) {
    event.preventDefault();
    if (!draft.t.trim() || !draft.desc.trim()) return setError('Preencha título e descrição.');
    if (publish({ ...draft, t: draft.t.trim(), desc: draft.desc.trim() }) === false) setError('Não foi possível publicar o pedido. Tente novamente.');
  }
  return <div className="mask" onClick={close}><form className="modal publication-modal" role="dialog" aria-modal="true" aria-labelledby="request-title" ref={dialog.ref} tabIndex={-1} onKeyDown={dialog.onKeyDown} onClick={event => event.stopPropagation()} onSubmit={submit} noValidate>
    <div className="row requestmodal-style-11"><span className="requestmodal-style-10"><Icon n="wrench" s={26} /></span><button type="button" onClick={close} aria-label="Fechar pedido" className="requestmodal-style-9"><Icon n="x" /></button></div>
    <h2 id="request-title" className="requestmodal-style-8">Qual serviço você precisa?</h2><p className="sub requestmodal-style-7">Descreva sua necessidade para os prestadores da região.</p>
    <label htmlFor="request-name">Título</label><input className="settings-input" id="request-name" placeholder="Revisão para viagem" maxLength={100} value={draft.t} onChange={update('t')} required />
    <label htmlFor="request-description">Descrição</label><textarea className="publication-description" id="request-description" placeholder="Conte o que precisa, o modelo do veículo e quando gostaria do atendimento." maxLength={2000} value={draft.desc} onChange={update('desc')} required />
    <div className="publication-grid"><div><label htmlFor="request-vehicle-type">Tipo de veículo</label><select className="settings-input" id="request-vehicle-type" value={draft.cat} onChange={event => setDraft(current => ({ ...current, cat: event.target.value, vehicle: '' }))}>{VEHICLE_TYPES.map(type => <option key={type.id} value={type.id}>{type.label}</option>)}</select></div><div><label htmlFor="request-category">Categoria</label><select className="settings-input" id="request-category" value={draft.serviceType} onChange={update('serviceType')}>{SERVICE_TYPES.map(type => <option key={type.id} value={type.id}>{type.label}</option>)}</select></div></div>
    <label htmlFor="request-vehicle">Veículo (opcional)</label><input className="settings-input" id="request-vehicle" list="registered-vehicles" placeholder="Ex.: Chevrolet Onix · 2020" maxLength={120} value={draft.vehicle} onChange={update('vehicle')} /><datalist id="registered-vehicles">{vehicles.filter(vehicle => vehicle.type === draft.cat).map(vehicle => <option key={vehicle.id} value={`${vehicle.brand} ${vehicle.model} · ${vehicle.year}`} />)}</datalist>
    <label>Localização</label><button type="button" className="field request-location" onClick={openLocation} aria-label="Alterar localização do pedido"><Icon n="pin" /><span className="requestmodal-style-3">{locationLabel(location)}</span><Icon n="down" /></button>
    <p className="settings-note publication-note">Seu pedido será exibido no perfil prestador deste navegador. Não inclua dados pessoais na descrição.</p>
    {error && <p className="settings-error" role="alert">{error}</p>}<button className="btn red" type="submit">Publicar pedido</button>
  </form></div>;
}
