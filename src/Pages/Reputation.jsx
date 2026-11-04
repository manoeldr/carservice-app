import { PageHeader } from '../Components/PageHeader';
import { Icon } from '../Components/Icon';
import { ReputationSummary } from '../Components/ReputationBadge';
import { ACHIEVEMENTS, ACTIVITY_RULES } from '../data/reputationRules';
import '../Styles/Reputation.css';

export function Reputation({ reputation, events, back }) {
  const recent = [...events].sort((a, b) => Date.parse(b.at) - Date.parse(a.at)).slice(0, 6);
  return <><PageHeader title="Minha reputação" back={back} /><div className="scroll settings-content reputation-page"><h2>Seu atendimento ganha destaque</h2><p className="sub">Boas avaliações e participação no app melhoram a posição dos seus serviços nas buscas dos clientes.</p>
    <ReputationSummary reputation={reputation} />
    <div className="reputation-breakdown"><div><span>Avaliações</span><b>{reputation.qualityScore.toLocaleString('pt-BR')} <small>/ 70</small></b></div><div><span>Atividade</span><b>{reputation.activityScore.toLocaleString('pt-BR')} <small>/ 30</small></b></div></div>
    <h2 className="settings-section-title">Como alcançar os níveis</h2>
    <ul className="reputation-levels"><li><b>Bronze</b><span>Início da jornada</span></li><li><b>Prata</b><span>65 pontos, média de pelo menos 4 e 3 avaliações</span></li><li><b>Ouro</b><span>85 pontos, média de pelo menos 4,5 e 5 avaliações</span></li></ul>
    <p className="settings-note">A atividade sozinha não garante um nível alto. Uma nota com poucas avaliações tem peso moderado no cálculo.</p>
    <h2 className="settings-section-title">Suas conquistas</h2><div className="reputation-achievements">{ACHIEVEMENTS.map(achievement => {
      const earned = events.some(event => event.type === achievement.type);
      return <div className={'reputation-achievement' + (earned ? ' is-earned' : '')} key={achievement.type}><Icon n={achievement.icon} s={24} /><b>{achievement.title}</b><small>{earned ? 'Conquistado' : 'A conquistar'}</small></div>;
    })}</div>
    <h2 className="settings-section-title">Ganhe pontos de atividade</h2><div className="card reputation-rules">{Object.entries(ACTIVITY_RULES).map(([type, rule]) => <div key={type}><span><b>{rule.label}</b><small>{rule.detail}</small></span><strong>+{rule.points}</strong></div>)}</div>
    <p className="settings-note reputation-window">A pontuação usa a atividade dos últimos 30 dias, com limite de 100 pontos de atividade. A conquista de perfil completo permanece. O catálogo inclui avaliações e atividade iniciais de demonstração.</p>
    <h2 className="settings-section-title">Atividade registrada</h2>{recent.length ? <ol className="reputation-history">{recent.map(event => <li key={event.id}><div><b>{event.label}</b><small>{new Date(event.at).toLocaleDateString('pt-BR')}</small></div><span>+{ACTIVITY_RULES[event.type].points}</span></li>)}</ol> : <p className="settings-note">Suas próximas ações aparecerão aqui.</p>}
  </div></>;
}
