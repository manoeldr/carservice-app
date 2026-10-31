import { locationLabel } from '../data/locations';
import { useState } from 'react';
import { Icon as Ic } from './Icon';
import { Field } from './Field';
import '../Styles/RequestModal.css';

export function RequestModal({close,publish,location,openLocation}){
const[t,setT]=useState(''),[d,setD]=useState(''),[err,setErr]=useState('');
return(<div className="mask" onClick={close}><div className="modal" onClick={e=>e.stopPropagation()}>
<div className="row requestmodal-style-11" ><div  className="requestmodal-style-10"><Ic n="wrench" s={26}/></div><button onClick={close} aria-label="Fechar"  className="requestmodal-style-9"><Ic n="x"/></button></div>
<h1  className="requestmodal-style-8">Qual serviço você precisa?</h1><p className="sub requestmodal-style-7" >Conte o que precisa e receba propostas de profissionais da sua região.</p>
<label>Título</label><Field icon="" ph="Revisão para viagem" val={t} set={setT}/>
<label>Descrição</label><div className="field requestmodal-style-6" ><textarea  placeholder="Preciso revisar os freios, o óleo e os pneus do meu Onix 2020 antes de viajar na próxima semana." value={d} onChange={e=>setD(e.target.value)} className="requestmodal-style-5"/></div>
<label>Localização</label><button className="field requestmodal-style-4 request-location" onClick={openLocation} aria-label="Alterar localização do pedido" ><Ic n="pin"/><span  className="requestmodal-style-3">{locationLabel(location)}</span><Ic n="down"/></button>
<p className="row sub requestmodal-style-2" ><Ic n="info" s={20}/>Seu pedido ficará visível para prestadores próximos. Não inclua dados pessoais.</p>
{err&&<p  className="requestmodal-style-1">{err}</p>}
<button className="btn red" onClick={()=>{if(!t.trim()||!d.trim())return setErr('Preencha título e descrição.');publish(t.trim(),d.trim())}}>Publicar</button></div></div>)}
