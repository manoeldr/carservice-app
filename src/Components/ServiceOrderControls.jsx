import { useRef, useState } from 'react';
import { ORDER_STATUS, COMPLETION_POINTS } from '../Utils/serviceOrders';
import { prepareCompletionPhoto } from '../Utils/completionPhoto';
import '../Styles/ServiceOrders.css';

export function ServiceOrderControls({ order, provider, expanded, change, rewards }) {
  const [form, setForm] = useState('');
  const [reason, setReason] = useState('');
  const [photo, setPhoto] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const upload = useRef(0);
  async function choosePhoto(event) {
    const file = event.target.files?.[0]; event.target.value = '';
    if (!file) return;
    const sequence = ++upload.current;
    setBusy(true); setError(''); setPhoto('');
    try { const next = await prepareCompletionPhoto(file); if (sequence === upload.current) setPhoto(next); }
    catch (e) { if (sequence === upload.current) setError(e.message); }
    finally { if (sequence === upload.current) setBusy(false); }
  }
  function submit(action) {
    setError('');
    const result = change(action, { reason, photo });
    if (result) { setError(result); return; }
    setForm(''); setReason(''); setPhoto('');
  }
  return <section className="order-panel" aria-label="Situação do serviço">
    <div className={`order-status order-status-${order.status}`} role="status">{ORDER_STATUS[order.status]}</div>
    {order.status === 'pending' && <p>Combine o escopo, o valor e o horário antes do aceite.</p>}
    {order.status === 'accepted' && <p>Serviço em andamento. A conclusão exige uma foto do carro com a placa.</p>}
    {order.status === 'cancelled' && <p><b>Motivo do cancelamento:</b> {order.reason}</p>}
    {order.status === 'completed' && <><p>Comprovante registrado · validação demonstrativa.</p><img className="order-photo" src={order.photo} alt="Foto do veículo anexada como comprovante de conclusão" /><p>{provider ? `+${COMPLETION_POINTS} pontos creditados por este serviço.` : 'O prestador registrou a conclusão com uma foto.'}</p>{provider && <button className="lnk" onClick={rewards}>Ver meus pontos e recompensas</button>}</>}
    {provider && expanded && <div id="service-actions">
      {order.status === 'pending' && <div className="order-buttons"><button className="btn red" onClick={() => submit('accepted')}>Aceitar serviço</button><button className="btn out" onClick={() => setForm('refused')}>Recusar serviço</button></div>}
      {order.status === 'accepted' && <div className="order-buttons"><button className="btn red" onClick={() => { setForm('completed'); setError(''); }}>Concluir serviço</button><button className="btn out" onClick={() => { setForm('cancelled'); setError(''); }}>Cancelar serviço</button></div>}
      {form === 'refused' && order.status === 'pending' && <div className="order-form"><p>Confirmar a recusa? Este pedido não poderá ser aceito nesta conversa e não gerará pontos.</p><button className="btn out" onClick={() => submit('refused')}>Confirmar recusa</button><button className="lnk" onClick={() => setForm('')}>Voltar</button></div>}
      {form === 'cancelled' && order.status === 'accepted' && <form className="order-form" onSubmit={e => { e.preventDefault(); submit('cancelled'); }}><label htmlFor="cancellation-reason">Motivo do cancelamento (obrigatório)</label><textarea id="cancellation-reason" className="publication-description" minLength={10} maxLength={500} required value={reason} onChange={e => setReason(e.target.value)} placeholder="Explique ao cliente por que o serviço será cancelado." /><p>Mínimo de 10 caracteres. O motivo ficará registrado na conversa. Não serão gerados pontos.</p><button className="btn red" type="submit">Confirmar cancelamento</button><button type="button" className="lnk" onClick={() => setForm('')}>Voltar</button></form>}
      {form === 'completed' && order.status === 'accepted' && <div className="order-form"><h3>Comprovante do serviço</h3><p>Fotografe o carro com a placa visível. Neste protótipo, anexar a foto registra a validação demonstrativa; não há leitura automática da placa.</p><label className="btn out order-upload">Tirar foto<input type="file" accept="image/jpeg,image/png,image/webp" capture="environment" onChange={choosePhoto} disabled={busy} /></label><label className="btn out order-upload">Escolher da galeria<input type="file" accept="image/jpeg,image/png,image/webp" onChange={choosePhoto} disabled={busy} /></label>{busy && <p role="status">Preparando foto…</p>}{photo && <img className="order-photo" src={photo} alt="Prévia do comprovante de conclusão" />}<p>A foto e a placa ficarão neste dispositivo e visíveis ao perfil cliente no protótipo. Nenhum arquivo será enviado a um servidor.</p><button className="btn red" disabled={!photo || busy} onClick={() => submit('completed')}>Enviar comprovante e concluir · +{COMPLETION_POINTS} pontos</button><button className="lnk" onClick={() => { ++upload.current; setBusy(false); setPhoto(''); setForm(''); }}>Voltar</button></div>}
    </div>}
    {error && <p className="settings-error" role="alert">{error}</p>}
  </section>;
}
