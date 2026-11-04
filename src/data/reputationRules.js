export const REPUTATION_RULES = {
  qualityWeight: 70,
  activityWeight: 30,
  priorRating: 3.5,
  priorCount: 5,
  activityWindowDays: 30,
};
export const REPUTATION_TIERS = [
  { id: 'bronze', label: 'Bronze', minimum: 0, rating: 0, reviews: 0 },
  { id: 'silver', label: 'Prata', minimum: 65, rating: 4, reviews: 3 },
  { id: 'gold', label: 'Ouro', minimum: 85, rating: 4.5, reviews: 5 },
];
export const ACTIVITY_RULES = {
  login: { points: 5, dailyLimit: 1, label: 'Acessar o app em um novo dia', detail: 'Uma vez por dia' },
  publish: { points: 10, dailyLimit: 3, label: 'Publicar um serviço', detail: 'Até 3 publicações por dia' },
  reply: { points: 5, dailyLimit: 5, label: 'Responder a um pedido de cliente', detail: 'Primeira resposta por pedido; até 5 por dia' },
  profile: { points: 10, dailyLimit: 1, label: 'Completar os dados pessoais', detail: 'Uma única vez' },
};
// Atividade inicial fictícia para os prestadores de demonstração.
export const DEMO_ACTIVITY = { AC: 40, BG: 70, PC: 55, OP: 35, MC: 45, FS: 25 };
export const ACHIEVEMENTS = [
  { type: 'login', title: 'Presença registrada', icon: 'user' },
  { type: 'publish', title: 'Primeira oferta', icon: 'wrench' },
  { type: 'reply', title: 'Primeira resposta', icon: 'chat' },
  { type: 'profile', title: 'Perfil completo', icon: 'check' },
];
