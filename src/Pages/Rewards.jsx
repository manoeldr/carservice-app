import { useState } from 'react';
import { PageHeader } from '../Components/PageHeader';
import { COMPLETION_POINTS, REWARDS, wallet } from '../Utils/serviceOrders';
import '../Styles/ServiceOrders.css';

export function Rewards({ data, redeem, back }) {
  const [pending, setPending] = useState('');
  const [error, setError] = useState('');
  const balance = wallet(data);
  function confirm(id) { const message = redeem(id); setError(message || ''); if (!message) setPending(''); }
  return <><PageHeader title="Pontos e recompensas" back={back} /><div className="scroll settings-content rewards-page">
    <section className="card reward-balance"><p>Seu saldo disponível</p><h2>{balance.balance.toLocaleString('pt-BR')} pontos</h2><p>{balance.completed} serviço(s) concluído(s) · {balance.earned} pontos ganhos · {balance.spent} resgatados</p></section>
    <p className="settings-note">Ganhe {COMPLETION_POINTS} pontos por serviço concluído com foto. Cada serviço pontua uma única vez. Recusas e cancelamentos não pontuam. O saldo para trocar por benefícios é separado da nota de reputação.</p>
    <h2 className="settings-section-title">Benefícios de demonstração</h2><p className="settings-note">Parceiros e cupons fictícios para apresentar o conceito. Não são válidos em aplicativos reais.</p>
    {REWARDS.map(reward => <section className="card reward-card" key={reward.id}><h3>{reward.title}</h3><p>{reward.description}</p><b>{reward.cost} pontos</b>{pending === reward.id ? <div className="order-form"><p>Usar {reward.cost} pontos para gerar este cupom demonstrativo?</p><button className="btn red" onClick={() => confirm(reward.id)}>Confirmar resgate</button><button className="lnk" onClick={() => setPending('')}>Voltar</button></div> : <button className="btn out" disabled={balance.balance < reward.cost} onClick={() => { setPending(reward.id); setError(''); }}>{balance.balance < reward.cost ? `Faltam ${reward.cost - balance.balance} pontos` : 'Resgatar benefício'}</button>}</section>)}
    {error && <p role="alert" className="settings-error">{error}</p>}
    <h2 className="settings-section-title">Meus cupons</h2>{!data.redemptions.length && <p className="settings-note">Seus resgates aparecerão aqui.</p>}{data.redemptions.map(item => <section key={item.code} className="card reward-card"><h3>{REWARDS.find(r => r.id === item.rewardId).title}</h3><code>{item.code}</code><p>{item.cost} pontos · {new Date(item.at).toLocaleDateString('pt-BR')} · cupom fictício</p></section>)}
    <h2 className="settings-section-title">Serviços que geraram pontos</h2>{data.orders.filter(o => o.status === 'completed').map(order => <div key={order.id} className="reward-history"><b>{order.service.t}</b><span>+{COMPLETION_POINTS} pontos</span><small>{new Date(order.completedAt).toLocaleDateString('pt-BR')} · comprovante registrado</small></div>)}
  </div></>;
}
