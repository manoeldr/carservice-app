import { useState } from 'react';
import { Icon as Ic } from '../Components/Icon';
import { lastOf } from '../data/index.js';
import '../Styles/Chats.css';

export function Chats({chats,open,go}){const[f,setF]=useState('all'),[q,setQ]=useState('');
const un=chats.filter(c=>c.unread).length;
const list=chats.filter(c=>(f==='all'||c.unread)&&(c.by+c.svc+lastOf(c)).toLowerCase().includes(q.toLowerCase()));
return(<div className="scroll chats-style-18" >
    <div className="row chats-style-17" ><h1  className="chats-style-16">Conversas</h1><button  onClick={()=>go('home')} aria-label="Nova conversa" className="chats-style-15"><Ic n="edit" s={28}/></button></div>
    <div className="field chats-style-14" ><Ic n="search" s={24}/><input placeholder="Buscar nas conversas" value={q} onChange={e=>setQ(e.target.value)}/></div>
    <div className="row chats-style-13" ><button className={('chip'+(f==='all'?' on':'')) + " chats-style-12"}  onClick={()=>setF('all')}>Todas</button><button className={('chip'+(f==='un'?' on':'')) + " chats-style-11"}  onClick={()=>setF('un')}>Não lidas · {un}</button></div>
        {list.map(c=><div key={c.id} className="row chats-style-10"  onClick={()=>open(c.id)}>
    <div className="av chats-style-9" >{c.ini}</div>
    <div  className="chats-style-8"><b  className="chats-style-7">{c.by}</b><div  className="chats-style-6">{c.svc}</div><div data-unread={Boolean(c.unread)}  className="chats-style-5">{lastOf(c)}</div></div>
    <div  className="chats-style-4"><span data-unread={Boolean(c.unread)}  className="chats-style-3">{c.time}</span>{c.unread>0&&<span className="badge">{c.unread}</span>}</div></div>)}
        {!list.length&&<p className="sub chats-style-2" >Nenhuma conversa por aqui ainda.</p>}
    <p className="center row chats-style-1" ><Ic n="lock" s={18}/>Combine os detalhes antes de contratar.</p></div>)}
