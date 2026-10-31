import { Icon as Ic } from '../Components/Icon';
import { Photo } from '../Components/Photo';
import { brl } from '../data/index.js';
import '../Styles/Detail.css';

export function Detail({s,saved,toggle,back,chat}){return(<>
<div className="bar detail-style-25" ><button onClick={back} aria-label="Voltar"><Ic n="back"/></button><b>Detalhes do serviço</b><div className="row"><Ic n="share"/><button onClick={()=>toggle(s.id)} data-saved={saved} aria-label="Salvar"><Ic n="heart" fill={saved}/></button></div></div>
<div className="scroll detail-style-24" >
<div className="img detail-style-23" ><Photo s={s}/><span  className="detail-style-22">1 / 3</span></div>
<div  className="detail-style-21">
<div  className="detail-style-20">{s.tag.toUpperCase()} • {s.cat.toUpperCase()}</div>
<h1  className="detail-style-19">{s.t}</h1>
<div  className="detail-style-18"><span  className="detail-style-17">{brl(s.p)}</span><span  className="detail-style-16">a partir de · peças + mão de obra</span></div>
<div className="card item detail-style-15" ><div className="av">{s.ini}</div><div  className="detail-style-14"><b  className="detail-style-13">{s.by}</b><div className="row detail-style-12" ><span  className="detail-style-11"><Ic n="star" s={18}/></span><b  className="detail-style-10">{s.rate}</b> ({s.n} avaliações)</div></div><Ic n="chev"/></div>
<h2  className="detail-style-9">Sobre o serviço</h2><p className="sub detail-style-8" >{s.desc}</p>
<div className="row detail-style-7" >{['Duração: '+s.dur,'Atendimento na oficina'].map(x=><span key={x}  className="detail-style-6">{x}</span>)}</div>
<div className="row detail-style-5" ><span  className="detail-style-4"><Ic n="pin" s={26}/></span><div><b  className="detail-style-3">{s.loc}{s.city !== '' && `, ${s.city || 'São Paulo'}`} · {String(s.km).replace('.',',')} km</b><div className="sub detail-style-2" >{s.addr}</div></div></div></div></div>
<div  className="detail-style-1"><button className="btn red" onClick={()=>chat(s)}><Ic n="chat"/>Enviar mensagem</button></div></>)}
