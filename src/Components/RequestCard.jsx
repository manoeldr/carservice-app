import { Icon } from './Icon';
import '../Styles/RequestCard.css';

export function RequestCard({ s, saved, toggle, open }) {
  return <article className="request-card">
    <div className="request-card-person"><span className="av request-card-avatar">{s.ini}</span><div><b>{s.by}</b><small>{new Date(s.createdAt).toLocaleDateString('pt-BR')}{s.simulated ? ' · Exemplo' : ' · Novo pedido'}</small></div><span className="request-card-category">{s.cat === 'carros' ? 'Carro' : s.cat === 'motos' ? 'Moto' : 'Outros'}</span></div>
    <button className="request-card-content" onClick={() => open(s.id)} aria-label={`Ver pedido: ${s.t}`}><h3>{s.t}</h3><p>{s.desc}</p>{s.vehicle && <span className="request-card-vehicle"><Icon n={s.cat === 'motos' ? 'bike' : 'car'} s={16} />{s.vehicle}</span>}</button>
    <div className="request-card-location"><Icon n="pin" s={16} /><span>{s.loc} · {String(s.km).replace('.', ',')} km</span></div>
    <div className="request-card-footer"><span>Orçamento a combinar</span><button className="lnk" onClick={() => open(s.id)}>Ver pedido <Icon n="chev" s={16} /></button>{toggle && <button className="request-card-save" aria-label={saved ? 'Remover pedido dos salvos' : 'Salvar pedido'} aria-pressed={saved} data-saved={saved} onClick={() => toggle(s.id)}><Icon n="heart" s={21} fill={saved} /></button>}</div>
  </article>;
}
