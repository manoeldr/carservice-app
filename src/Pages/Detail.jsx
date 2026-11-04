import { ReputationSummary } from '../Components/ReputationBadge';
import { RatingForm } from '../Components/RatingForm';
import { Icon } from '../Components/Icon';
import { Photo } from '../Components/Photo';
import { brl } from '../data/index';
import '../Styles/Detail.css';

export function Detail({ s, saved, toggle, back, chat, role, review, rate, login }) {
  const request = s.kind === 'request';
  const ownOffer = s.kind === 'offer' && role === 'provider';
  return <>
    <div className="bar detail-style-25"><button onClick={back} aria-label="Voltar"><Icon n="back" /></button><b>{request ? 'Detalhes do pedido' : 'Detalhes do serviço'}</b><button onClick={() => toggle(s.id)} data-saved={saved} aria-label="Salvar"><Icon n="heart" fill={saved} /></button></div>
    <div className="scroll detail-style-24"><div className="img detail-style-23"><Photo s={s} /></div><div className="detail-style-21">
      <div className="detail-style-20">{s.tag.toUpperCase()} • {s.cat.toUpperCase()}</div><h1 className="detail-style-19">{s.t}</h1>
      {request ? <p className="detail-request-price">Orçamento a combinar</p> : <div className="detail-style-18"><span className="detail-style-17">{brl(s.p)}</span><span className="detail-style-16">a partir de</span></div>}
      <div className="card item detail-style-15"><div className="av">{s.ini}</div><div className="detail-style-14"><b className="detail-style-13">{s.by}</b>{request ? <p className="detail-person-label">Cliente · {new Date(s.createdAt).toLocaleDateString('pt-BR')}</p> : s.n > 0 ? <div className="row detail-style-12"><span className="detail-style-11"><Icon n="star" s={18} /></span><b className="detail-style-10">{s.rate}</b> ({s.n} avaliações)</div> : <p className="detail-person-label">Novo serviço · sem avaliações</p>}</div></div>
      {!request && <ReputationSummary reputation={s.reputation} />}
      <h2 className="detail-style-9">{request ? 'O que o cliente precisa' : 'Sobre o serviço'}</h2><p className="sub detail-style-8">{s.desc}</p>
      <div className="row detail-style-7">{(request ? [s.vehicle || 'Veículo a combinar', 'Prazo a combinar'] : ['Duração: ' + s.dur, 'Atendimento a combinar']).map(text => <span key={text} className="detail-style-6">{text}</span>)}</div>
      <div className="row detail-style-5"><span className="detail-style-4"><Icon n="pin" s={26} /></span><div><b className="detail-style-3">{s.loc}{s.city !== '' && `, ${s.city || 'São Paulo'}`} · {String(s.km).replace('.', ',')} km</b><div className="sub detail-style-2">{s.addr}</div></div></div>
      {!request && role !== 'provider' && <RatingForm key={s.providerId} review={review} canRate={role === 'client'} save={rate} login={login} />}
      {ownOffer && <p className="settings-note detail-own-offer">Este serviço foi publicado por você e está disponível no catálogo do cliente.</p>}
    </div></div>
    {!ownOffer && <div className="detail-style-1"><button className="btn red" onClick={() => chat(s)}><Icon n="chat" />{request ? 'Conversar com cliente' : 'Enviar mensagem'}</button></div>}
  </>;
}
