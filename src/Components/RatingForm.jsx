import { useState } from 'react';
import { Icon } from './Icon';
import '../Styles/RatingForm.css';

export function RatingForm({ review, save, canRate, login }) {
  const [stars, setStars] = useState(review?.stars || 0);
  const [comment, setComment] = useState(review?.comment || '');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  function submit(event) {
    event.preventDefault();
    if (!stars) return setError('Escolha uma nota de 1 a 5 estrelas.');
    if (!save(stars, comment)) return setError('Não foi possível salvar a avaliação. Tente novamente.');
    setSaved(true); setError('');
  }
  return <section className="rating-section"><h2>Sua avaliação</h2><p>Ajude a compor a reputação deste prestador.</p>{canRate ? <form onSubmit={submit}><fieldset className="rating-stars"><legend>Nota do prestador</legend>{[1, 2, 3, 4, 5].map(value => <button key={value} type="button" aria-label={`${value} ${value === 1 ? 'estrela' : 'estrelas'}`} aria-pressed={stars === value} className={stars >= value ? 'is-filled' : ''} onClick={() => { setStars(value); setSaved(false); }}><Icon n="star" s={28} fill={stars >= value} /></button>)}</fieldset><label htmlFor="review-comment">Comentário (opcional)</label><textarea id="review-comment" className="publication-description" maxLength={500} value={comment} onChange={event => { setComment(event.target.value); setSaved(false); }} placeholder="Conte como foi a experiência neste protótipo." /><p className="rating-demo-note">Avaliação de demonstração. Uma nota por prestador; editar substitui a anterior.</p>{error && <p className="settings-error" role="alert">{error}</p>}{saved && <p className="settings-success" role="status">Avaliação salva e reputação atualizada.</p>}<button className="btn out" type="submit">{review ? 'Atualizar avaliação' : 'Salvar avaliação'}</button></form> : <button className="btn out" onClick={login}>Entrar como cliente para avaliar</button>}</section>;
}
