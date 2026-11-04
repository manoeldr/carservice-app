import { ReputationBadge } from './ReputationBadge';
import { RequestCard } from './RequestCard';
import { Icon as Ic } from './Icon';
import { Photo } from './Photo';
import { brl } from '../data/index.js';
import '../Styles/ServiceCard.css';

export function ServiceCard({s,saved,toggle,open}){if(s.kind === 'request')return <RequestCard s={s} saved={saved} toggle={toggle} open={open}/>;return(<div  onClick={()=>open(s.id)} className="servicecard-style-4">
<div className="img"><Photo s={s}/>
<button className="heart" aria-label="Salvar" onClick={e=>{e.stopPropagation();toggle(s.id)}} data-saved={saved}><Ic n="heart" s={20} fill={saved}/></button></div>
<div  className="servicecard-style-3">{s.t}</div><div  className="servicecard-style-2">{brl(s.p)}</div>
<div className="servicecard-reputation">{s.reputation?.count > 0 && <span><Ic n="star" s={13}/> {s.rate}</span>}<ReputationBadge reputation={s.reputation}/></div>
<div  className="servicecard-style-1">{s.by}<br/>{s.loc} · {String(s.km).replace('.',',')} km</div></div>)}
