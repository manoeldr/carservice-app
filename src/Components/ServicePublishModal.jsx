import { useState } from 'react';
import { publicAsset } from '../Utils/publicAsset';
import { Icon } from './Icon';
import { useModalDialog } from './useModalDialog';
import { locationLabel } from '../data/locations';
import { VEHICLE_TYPES } from '../data/account';
import { SERVICE_TYPES } from '../data/index';
import { PUBLICATION_PHOTOS } from '../data/marketplace';
import '../Styles/ServicePublishModal.css';

export function ServicePublishModal({ close, publish, location, openLocation }) {
  const [draft, setDraft] = useState({ t: '', desc: '', p: '', dur: '', cat: 'carros', serviceType: 'mecanica' });
  const [error, setError] = useState('');
  const dialog = useModalDialog(close);
  const update = key => event => setDraft(current => ({ ...current, [key]: event.target.value }));
  function submit(event) {
    event.preventDefault();
    if (!draft.t.trim() || !draft.desc.trim()) return setError('Preencha título e descrição do serviço.');
    if (!/^\d+(?:[.,]\d{1,2})?$/.test(draft.p.trim())) return setError('Informe um preço válido, por exemplo 189,90.');
    const price = Number(draft.p.trim().replace(',', '.'));
    if (price <= 0 || price > 1000000) return setError('O preço deve ser maior que zero e de até R$ 1.000.000.');
    if (publish({ ...draft, p: price }) === false) setError('Não foi possível publicar o serviço. Tente novamente.');
  }
  return <div className="mask" onClick={close}><form className="modal publication-modal" role="dialog" aria-modal="true" aria-labelledby="publish-service-title" ref={dialog.ref} tabIndex={-1} onKeyDown={dialog.onKeyDown} onClick={event => event.stopPropagation()} onSubmit={submit} noValidate>
    <div className="row service-publish-heading"><span className="service-publish-icon"><Icon n="wrench" s={26} /></span><button type="button" className="service-publish-close" onClick={close} aria-label="Fechar publicação de serviço"><Icon n="x" /></button></div>
    <h2 id="publish-service-title">Publicar serviço</h2><p className="sub">Apresente o atendimento que você oferece aos clientes.</p>
    <label htmlFor="offer-name">Título do serviço</label><input className="settings-input" id="offer-name" placeholder="Ex.: Troca de óleo e filtro" maxLength={100} value={draft.t} onChange={update('t')} required />
    <label htmlFor="offer-description">Descrição</label><textarea className="publication-description" id="offer-description" placeholder="Explique o que está incluído e como funciona o atendimento." maxLength={2000} value={draft.desc} onChange={update('desc')} required />
    <div className="publication-grid"><div><label htmlFor="offer-price">Preço a partir de (R$)</label><input className="settings-input" id="offer-price" inputMode="decimal" placeholder="189,90" value={draft.p} onChange={update('p')} required /></div><div><label htmlFor="offer-duration">Duração (opcional)</label><input className="settings-input" id="offer-duration" placeholder="40–60 min" maxLength={80} value={draft.dur} onChange={update('dur')} /></div></div>
    <div className="publication-grid"><div><label htmlFor="offer-vehicle-type">Tipo de veículo</label><select className="settings-input" id="offer-vehicle-type" value={draft.cat} onChange={update('cat')}>{VEHICLE_TYPES.map(type => <option key={type.id} value={type.id}>{type.label}</option>)}</select></div><div><label htmlFor="offer-category">Categoria</label><select className="settings-input" id="offer-category" value={draft.serviceType} onChange={update('serviceType')}>{SERVICE_TYPES.map(type => <option key={type.id} value={type.id}>{type.label}</option>)}</select></div></div>
    <div className="service-publish-photo"><img src={publicAsset(PUBLICATION_PHOTOS[draft.serviceType])} alt="Imagem ilustrativa da categoria escolhida" /><p>Foto ilustrativa da categoria</p></div>
    <label>Localização</label><button type="button" className="field request-location" onClick={openLocation} aria-label="Alterar localização do serviço"><Icon n="pin" /><span className="service-publish-location">{locationLabel(location)}</span><Icon n="down" /></button>
    <p className="settings-note publication-note">A oferta ficará visível para o perfil cliente neste navegador.</p>
    {error && <p className="settings-error" role="alert">{error}</p>}<button className="btn red" type="submit">Publicar serviço</button>
  </form></div>;
}
