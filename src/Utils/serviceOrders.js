export const ORDERS_STORAGE_KEY = 'carservice.orders.v1';
export const COMPLETION_POINTS = 100;
export const ORDER_STATUS = { pending: 'Aguardando aceite', accepted: 'Serviço aceito', refused: 'Serviço recusado', cancelled: 'Serviço cancelado', completed: 'Serviço concluído' };
export const REWARDS = [
  { id: 'mobility', title: 'Mobilidade parceira', description: '10% de desconto em uma corrida', cost: 200 },
  { id: 'food', title: 'Delivery parceiro', description: 'R$ 15 de desconto em um pedido', cost: 300 },
  { id: 'carcare', title: 'Loja automotiva parceira', description: 'R$ 25 de desconto em acessórios', cost: 500 },
];
export const emptyOrders = () => ({ version: 1, orders: [], redemptions: [] });
const timestamp = value => typeof value === 'string' && Number.isFinite(Date.parse(value));
const photoValid = value => typeof value === 'string' && value.length < 300000 && /^data:image\/jpeg;base64,[A-Za-z0-9+/]+=*$/.test(value);

export function validateOrders(data) {
  if (!data || data.version !== 1 || !Array.isArray(data.orders) || !Array.isArray(data.redemptions) || data.orders.length > 500 || data.redemptions.length > 1000) throw Error('Dados de serviços inválidos.');
  const ids = new Set();
  for (const order of data.orders) {
    if (!order || typeof order.id !== 'string' || ids.has(order.id) || !Object.hasOwn(ORDER_STATUS, order.status) || !timestamp(order.createdAt) || !timestamp(order.updatedAt) || !order.service || !['string', 'number'].includes(typeof order.service.id) || order.service.kind !== 'request' || typeof order.service.t !== 'string' || typeof order.service.loc !== 'string' || typeof order.providerName !== 'string' || !Array.isArray(order.messages) || !Array.isArray(order.history)) throw Error('Serviço inválido.');
    ids.add(order.id);
    if (order.status === 'cancelled' && (typeof order.reason !== 'string' || order.reason.trim().length < 10)) throw Error('Informe um motivo de cancelamento com pelo menos 10 caracteres.');
    if (order.status === 'completed' && (!photoValid(order.photo) || !timestamp(order.completedAt))) throw Error('A conclusão exige uma foto válida.');
    if (order.messages.length > 2000 || order.messages.some(m => !['client', 'provider'].includes(m.sender) || typeof m.text !== 'string' || m.text.length > 2000 || !timestamp(m.at))) throw Error('Mensagem inválida.');
    if (order.history.length > 4 || order.history.some(h => !Object.hasOwn(ORDER_STATUS, h.status) || !timestamp(h.at) || typeof h.reason !== 'string')) throw Error('Histórico inválido.');
  }
  const codes = new Set();
  for (const redemption of data.redemptions) {
    const reward = REWARDS.find(r => r.id === redemption.rewardId);
    if (!reward || redemption.cost !== reward.cost || !timestamp(redemption.at) || typeof redemption.code !== 'string' || codes.has(redemption.code)) throw Error('Resgate inválido.');
    codes.add(redemption.code);
  }
  if (wallet(data).balance < 0) throw Error('Saldo insuficiente.');
  return data;
}
export function loadOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    return { data: raw ? validateOrders(JSON.parse(raw)) : emptyOrders(), error: '' };
  } catch { return { data: emptyOrders(), error: 'Não foi possível ler os serviços e pontos salvos. Os dados existentes foram preservados.' }; }
}
export function saveOrders(data) {
  validateOrders(data);
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(data));
  return data;
}
export function createOrder(data, service, providerName, now = new Date()) {
  if (service.kind !== 'request') throw Error('Abra um pedido de cliente para gerenciar o serviço.');
  const id = `order:${service.id}`;
  if (data.orders.some(o => o.id === id)) return data;
  // Guarde o pedido para poder retomar a conversa mesmo após trocar a região.
  const { reputation, ...snapshot } = service;
  const at = now.toISOString();
  return { ...data, orders: [{ id, service: snapshot, providerName, status: 'pending', createdAt: at, updatedAt: at, history: [], messages: [] }, ...data.orders] };
}
export function transitionOrder(data, id, action, details = {}, now = new Date()) {
  const order = data.orders.find(o => o.id === id);
  if (!order) throw Error('Serviço não encontrado.');
  const allowed = { pending: ['accepted', 'refused'], accepted: ['cancelled', 'completed'] };
  if (!allowed[order.status]?.includes(action)) throw Error('Este serviço já mudou de status. Confira a situação atual.');
  const reason = String(details.reason || '').trim().slice(0, 500);
  if (action === 'cancelled' && reason.length < 10) throw Error('Explique o motivo do cancelamento em pelo menos 10 caracteres.');
  if (action === 'completed' && !photoValid(details.photo)) throw Error('Anexe uma foto do carro com a placa para concluir.');
  const at = now.toISOString();
  const updated = { ...order, status: action, updatedAt: at, reason, history: [...order.history, { status: action, at, reason }], ...(action === 'completed' ? { photo: details.photo, completedAt: at, validation: 'demo' } : {}) };
  return { ...data, orders: data.orders.map(o => o.id === id ? updated : o) };
}
export function addOrderMessage(data, id, sender, text, now = new Date()) {
  const trimmed = text.trim().slice(0, 2000);
  if (!trimmed) return data;
  if (!['client', 'provider'].includes(sender) || !data.orders.some(o => o.id === id)) throw Error('Conversa inválida.');
  return { ...data, orders: data.orders.map(o => o.id === id ? { ...o, updatedAt: now.toISOString(), messages: [...o.messages, { sender, text: trimmed, at: now.toISOString() }] } : o) };
}
export function wallet(data) {
  const completed = data.orders.filter(o => o.status === 'completed');
  const earned = completed.length * COMPLETION_POINTS;
  const spent = data.redemptions.reduce((sum, r) => sum + r.cost, 0);
  return { completed: completed.length, earned, spent, balance: earned - spent };
}
export function redeemReward(data, rewardId, now = new Date()) {
  const reward = REWARDS.find(r => r.id === rewardId);
  if (!reward || wallet(data).balance < reward.cost) throw Error('Você ainda não tem pontos suficientes para este resgate.');
  const redemption = { rewardId, cost: reward.cost, at: now.toISOString(), code: `DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}` };
  return { ...data, redemptions: [redemption, ...data.redemptions] };
}
