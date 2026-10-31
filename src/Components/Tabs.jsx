import { Icon as Ic } from './Icon';
import '../Styles/Tabs.css';

export function Tabs({cur,go,unread}){const T=[['home','home','Início'],['saved','heart','Salvos'],['chats','chat','Conversas'],['account','user','Conta']];
return<div className="tabs">{T.map(([k,i,l])=><button key={k} className={cur===k?'on':''} onClick={()=>go(k)}><span  className="tabs-style-2"><Ic n={i} s={26}/>{k==='chats'&&unread>0&&<i  className="tabs-style-1"/>}</span>{l}</button>)}</div>}
