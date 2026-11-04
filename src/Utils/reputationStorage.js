import { ACTIVITY_RULES } from '../data/reputationRules';
import { emptyReputation } from './reputation';

export const REPUTATION_STORAGE_KEY = 'carservice.reputation.v1';
export function validateReputation(value) {
  if (!value || value.version !== 1 || !Array.isArray(value.events) || !Array.isArray(value.reviews) || value.events.length > 10000 || value.reviews.length > 2000) throw Error('Dados de reputação inválidos.');
  const ids = new Set(), providers = new Set();
  const events = value.events.map(event => {
    if (!event || typeof event.id !== 'string' || !event.id || ids.has(event.id) || !ACTIVITY_RULES[event.type] || typeof event.subject !== 'string' || typeof event.label !== 'string' || !Number.isFinite(Date.parse(event.at))) throw Error('Atividade inválida.');
    ids.add(event.id);
    return { id: event.id, type: event.type, subject: event.subject.slice(0, 180), label: event.label.slice(0, 120), at: event.at };
  });
  const reviews = value.reviews.map(review => {
    if (!review || typeof review.providerId !== 'string' || !review.providerId || providers.has(review.providerId) || review.reviewerId !== 'client' || !Number.isInteger(review.stars) || review.stars < 1 || review.stars > 5 || typeof review.comment !== 'string' || !Number.isFinite(Date.parse(review.at))) throw Error('Avaliação inválida.');
    providers.add(review.providerId);
    return { providerId: review.providerId, reviewerId: 'client', stars: review.stars, comment: review.comment.slice(0, 500), at: review.at };
  });
  return { version: 1, events, reviews };
}
export function loadReputation() {
  try {
    const json = localStorage.getItem(REPUTATION_STORAGE_KEY);
    return { data: json ? validateReputation(JSON.parse(json)) : emptyReputation(), error: '' };
  } catch { return { data: emptyReputation(), error: 'Não foi possível ler a reputação salva neste navegador.' }; }
}
export function saveReputation(value) {
  const next = validateReputation(value);
  localStorage.setItem(REPUTATION_STORAGE_KEY, JSON.stringify(next));
  return next;
}
