import { Icon } from './Icon';
import '../Styles/Reputation.css';

export function ReputationBadge({ reputation, showScore = false }) {
  if (!reputation) return null;
  return <span className={`reputation-badge reputation-${reputation.tier.id}`} title={`${reputation.score.toLocaleString('pt-BR')} de 100 pontos de reputação`}><Icon n="star" s={13} />{reputation.tier.label}{showScore && ` · ${reputation.score.toLocaleString('pt-BR')} pts`}</span>;
}

export function ReputationSummary({ reputation }) {
  if (!reputation) return null;
  return <section className="reputation-summary" aria-label="Reputação do prestador"><div className="reputation-summary-heading"><div><h3>Reputação do prestador</h3><p>{reputation.count ? `${reputation.rating.toFixed(1).replace('.', ',')} de 5 · ${reputation.count} avaliações` : 'Sem avaliações ainda'}</p></div><ReputationBadge reputation={reputation} /></div><div className="reputation-score"><b>{reputation.score.toLocaleString('pt-BR')}<small> / 100</small></b><span>pontos de reputação</span></div><progress value={reputation.score} max="100" aria-label="Pontuação de reputação" /><p className="reputation-explanation">Avaliações: 70% · Atividade: 30%. Uma pontuação maior melhora a posição no catálogo.</p></section>;
}
