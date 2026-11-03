import { useState, useRef, useEffect } from 'react';
import { Icon as Ic } from '../Components/Icon';
import { Photo } from '../Components/Photo';
import { brl } from '../data/index.js';
import '../Styles/Chat.css';

export function Chat({c,svc,back,send,openSvc}){const[t,setT]=useState(''),end=useRef();
useEffect(()=>{end.current&&end.current.scrollIntoView()},[c.msgs.length]);
const go=x=>{const v=(x||t).trim();if(v){send(c.id,v);setT('')}};
return(<><div className="bar chat-style-16" ><button onClick={back} aria-label="Voltar"><Ic n="back"/></button><div className="av chat-style-15" >{c.ini}</div><div  className="chat-style-14"><b  className="chat-style-13">{c.by}</b><div  className="chat-style-12">{svc.loc}{svc.city !== '' && ` · ${svc.city || 'São Paulo'}`}</div></div><Ic n="dots"/></div>
<div className="row chat-style-11"  onClick={()=>openSvc(svc.id)}><div  className="chat-style-10"><Photo s={svc}/></div><div  className="chat-style-9"><b  className="chat-style-8">{svc.t}</b><div  className="chat-style-7">{svc.kind === 'request' ? 'Pedido de cliente · orçamento a combinar' : `A partir de ${brl(svc.p)}`}</div></div><Ic n="chev"/></div>
<div className="scroll chat-style-6" >
<div className="center chat-style-5" >Hoje</div>
{c.msgs.map((m,i)=><div key={i} className={'bub '+m[0]}>{m[1]}<small>{m[2]}{m[0]==='me'&&' ✓✓'}</small></div>)}
{c.msgs.at(-1)?.[0]==='them'&&<button className="bub me chat-style-4"  onClick={()=>go('Combinado, até amanhã!')}>Combinado, até amanhã!</button>}
<div ref={end}/></div>
<div className="row chat-style-3" ><Ic n="plus" s={26}/><div className="field chat-style-2" ><input placeholder="Escreva uma mensagem..." value={t} onChange={e=>setT(e.target.value)} onKeyDown={e=>e.key==='Enter'&&go()}/></div><button onClick={()=>go()} aria-label="Enviar"  className="chat-style-1"><Ic n="up" s={26}/></button></div></>)}
