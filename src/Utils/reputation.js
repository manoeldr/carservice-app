import { ACTIVITY_RULES, DEMO_ACTIVITY, REPUTATION_RULES, REPUTATION_TIERS } from '../data/reputationRules';

const DAY_MS = 86400000;
export const emptyReputation = () => ({ version: 1, events: [], reviews: [] });
const dayOf = date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export function recordActivity(state, type, subject = '', label = '', now = new Date()) {
  const rule = ACTIVITY_RULES[type];
  if (!rule) throw Error('Atividade inválida.');
  const day = dayOf(now);
  const id = type === 'login' ? `login:${day}` : type === 'profile' ? 'profile:complete' : `${type}:${subject}`;
  if (!subject && ['publish', 'reply'].includes(type)) throw Error('A atividade precisa de uma publicação ou pedido.');
  if (state.events.some(event => event.id === id)) return state;
  const count = state.events.filter(event => event.type === type && dayOf(new Date(event.at)) === day).length;
  if (count >= rule.dailyLimit) return state;
  return { ...state, events: [...state.events, { id, type, subject: String(subject).slice(0, 180), label: String(label || rule.label).slice(0, 120), at: now.toISOString() }] };
}

export function setReview(state, providerId, stars, comment = '', now = new Date()) {
  if (typeof providerId !== 'string' || !providerId || !Number.isInteger(stars) || stars < 1 || stars > 5) throw Error('Escolha uma nota de 1 a 5.');
  const review = { providerId, reviewerId: 'client', stars, comment: comment.trim().slice(0, 500), at: now.toISOString() };
  return { ...state, reviews: [...state.reviews.filter(item => !(item.providerId === providerId && item.reviewerId === 'client')), review] };
}

export function providerIdOf(service) {
  if (service.kind === 'request') return null;
  if (service.ownerId === 'provider' || (service.by === 'Auto Center Silva' && service.loc === 'Vila Mariana' && (!service.city || service.city === 'São Paulo'))) return 'provider';
  return `demo:${service.by}|${service.loc}|${service.city || 'São Paulo'}`;
}

export function activityPoints(events, now = new Date()) {
  return events.filter(event => event.type === 'profile' || (now - new Date(event.at) >= 0 && now - new Date(event.at) < REPUTATION_RULES.activityWindowDays * DAY_MS))
    .reduce((sum, event) => sum + ACTIVITY_RULES[event.type].points, 0);
}

export function calculateReputation({ rating = 0, count = 0, initialActivity = 0 }, reviews = [], events = [], now = new Date()) {
  const total = count + reviews.length;
  const average = total ? (rating * count + reviews.reduce((sum, review) => sum + review.stars, 0)) / total : 0;
  const quality = total ? ((average * total + REPUTATION_RULES.priorRating * REPUTATION_RULES.priorCount) / (total + REPUTATION_RULES.priorCount)) / 5 * REPUTATION_RULES.qualityWeight : 0;
  const earned = activityPoints(events, now);
  const activity = Math.min(100, initialActivity + earned);
  const activityScore = activity / 100 * REPUTATION_RULES.activityWeight;
  const score = Math.round((quality + activityScore) * 10) / 10;
  const tier = [...REPUTATION_TIERS].reverse().find(item => score >= item.minimum && average >= item.rating && total >= item.reviews) || REPUTATION_TIERS[0];
  return { score, tier, rating: average, count: total, qualityScore: Math.round(quality * 10) / 10, activityScore: Math.round(activityScore * 10) / 10, activity, earned, initialActivity };
}

export function buildReputations(services, state, now = new Date()) {
  const baselines = new Map();
  for (const service of services) {
    const id = providerIdOf(service);
    if (!id) continue;
    const count = Number(service.n) || 0;
    const rating = Number(String(service.rate).replace(',', '.')) || 0;
    const existing = baselines.get(id);
    if (!existing || count > existing.count) baselines.set(id, { rating, count, initialActivity: DEMO_ACTIVITY[service.ini] || 0 });
  }
  return new Map([...baselines].map(([id, baseline]) => [id, calculateReputation(baseline, state.reviews.filter(review => review.providerId === id), id === 'provider' ? state.events : [], now)]));
}

export function attachReputations(services, reputations) {
  return services.map(service => {
    const providerId = providerIdOf(service), reputation = reputations.get(providerId);
    return reputation ? { ...service, providerId, reputation, rate: reputation.rating.toFixed(1).replace('.', ','), n: reputation.count } : service;
  });
}

export function sortByPriority(services) {
  return [...services].sort((a, b) => (b.reputation?.score || 0) - (a.reputation?.score || 0) || a.km - b.km || String(a.id).localeCompare(String(b.id)));
}
