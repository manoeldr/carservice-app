import { useState } from 'react';
import { PageHeader } from '../Components/PageHeader';
import { Icon } from '../Components/Icon';
import { VEHICLE_TYPES } from '../data/account';
import { normalizePlate, validPlate } from '../Utils/accountStorage';
import '../Styles/Vehicles.css';

const emptyVehicle = () => ({ type: 'carros', brand: '', model: '', year: '', plate: '', color: '' });

export function Vehicles({ vehicles, save, back }) {
  const [draft, setDraft] = useState(null);
  const [error, setError] = useState('');
  const [removing, setRemoving] = useState(null);
  const maxYear = new Date().getFullYear() + 1;
  const update = key => event => setDraft(current => ({ ...current, [key]: key === 'plate' ? normalizePlate(event.target.value) : event.target.value }));
  function submit(event) {
    event.preventDefault();
    const year = Number(draft.year);
    if (!draft.brand.trim() || !draft.model.trim()) return setError('Informe a marca e o modelo do veículo.');
    if (!Number.isInteger(year) || year < 1900 || year > maxYear) return setError(`Informe um ano entre 1900 e ${maxYear}.`);
    if (!validPlate(draft.plate)) return setError('Informe uma placa válida, como ABC1234 ou ABC1D23, ou deixe em branco.');
    if (draft.plate && vehicles.some(vehicle => vehicle.id !== draft.id && vehicle.plate === draft.plate)) return setError('Esta placa já está cadastrada.');
    if (!draft.id && vehicles.length >= 100) return setError('O limite é de 100 veículos cadastrados.');
    const vehicle = { ...draft, id: draft.id || globalThis.crypto?.randomUUID?.() || `vehicle-${Date.now()}-${Math.random().toString(36).slice(2)}`, brand: draft.brand.trim(), model: draft.model.trim(), color: draft.color.trim(), year };
    if (!save(draft.id ? vehicles.map(item => item.id === draft.id ? vehicle : item) : [...vehicles, vehicle])) return setError('Não foi possível salvar. Tente novamente.');
    setDraft(null); setError('');
  }
  function remove(id) {
    if (!save(vehicles.filter(vehicle => vehicle.id !== id))) return setError('Não foi possível remover o veículo. Tente novamente.');
    setRemoving(null); setError('');
  }
  return <><PageHeader title="Meus veículos" back={back} /><div className="scroll settings-content vehicles-page">
    {draft ? <form className="settings-form" noValidate onSubmit={submit}><h2>{draft.id ? 'Editar veículo' : 'Novo veículo'}</h2>
      <label htmlFor="vehicle-type">Tipo de veículo</label><select className="settings-input" id="vehicle-type" value={draft.type} onChange={update('type')}>{VEHICLE_TYPES.map(type => <option key={type.id} value={type.id}>{type.label}</option>)}</select>
      <label htmlFor="vehicle-brand">Marca</label><input className="settings-input" id="vehicle-brand" placeholder="Ex.: Chevrolet" maxLength={60} value={draft.brand} onChange={update('brand')} required />
      <label htmlFor="vehicle-model">Modelo</label><input className="settings-input" id="vehicle-model" placeholder="Ex.: Onix" maxLength={80} value={draft.model} onChange={update('model')} required />
      <div className="vehicle-form-grid"><div><label htmlFor="vehicle-year">Ano</label><input className="settings-input" id="vehicle-year" type="number" min="1900" max={maxYear} placeholder="2020" value={draft.year} onChange={update('year')} required /></div><div><label htmlFor="vehicle-color">Cor (opcional)</label><input className="settings-input" id="vehicle-color" maxLength={40} placeholder="Prata" value={draft.color} onChange={update('color')} /></div></div>
      <label htmlFor="vehicle-plate">Placa (opcional)</label><input className="settings-input vehicle-plate-input" id="vehicle-plate" placeholder="ABC1D23" maxLength={8} value={draft.plate} onChange={update('plate')} />
      {error && <p className="settings-error" role="alert">{error}</p>}
      <div className="settings-actions"><button className="btn red" type="submit">Salvar veículo</button><button className="btn out" type="button" onClick={() => { setDraft(null); setError(''); }}>Cancelar</button></div>
    </form> : <>
      <p className="sub">Cadastre seus veículos para consultar os dados sempre que precisar.</p>
      <button className="btn red vehicle-add" onClick={() => { setDraft(emptyVehicle()); setRemoving(null); setError(''); }}><Icon n="plus" />Adicionar veículo</button>
      {!vehicles.length && <div className="vehicle-empty"><Icon n="car" s={44} /><h2>Nenhum veículo cadastrado</h2><p>Adicione seu carro, moto ou utilitário.</p></div>}
      <div className="vehicle-list">{vehicles.map(vehicle => <article className="card vehicle-card" key={vehicle.id}><div className="row"><span className="vehicle-icon"><Icon n={vehicle.type === 'motos' ? 'bike' : vehicle.type === 'outros' ? 'truck' : 'car'} s={28} /></span><div><h2>{vehicle.brand} {vehicle.model}</h2><p>{vehicle.year}{vehicle.color ? ` · ${vehicle.color}` : ''}</p>{vehicle.plate && <small>{vehicle.plate}</small>}</div></div>
        {removing === vehicle.id ? <div className="vehicle-confirm"><p>Remover este veículo?</p><div className="row"><button className="lnk" onClick={() => remove(vehicle.id)}>Confirmar remoção</button><button onClick={() => setRemoving(null)}>Cancelar</button></div></div> : <div className="vehicle-card-actions"><button className="lnk" aria-label={`Editar ${vehicle.brand} ${vehicle.model}`} onClick={() => { setDraft({ ...vehicle }); setError(''); }}>Editar</button><button aria-label={`Remover ${vehicle.brand} ${vehicle.model}`} onClick={() => setRemoving(vehicle.id)}>Remover</button></div>}
      </article>)}</div>{error && <p className="settings-error" role="alert">{error}</p>}
    </>}
  </div></>;
}
