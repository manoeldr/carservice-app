import { SERVICE_TYPES } from '../data/index';
import { PUBLICATION_PHOTOS } from '../data/marketplace';

export const MARKETPLACE_STORAGE_KEY = 'carservice.marketplace.v1';
const emptyMarketplace = () => ({ version: 1, offers: [], requests: [] });

export function validateMarketplace(value) {
  if (!value || value.version !== 1 || !Array.isArray(value.offers) || !Array.isArray(value.requests)) throw Error('Formato de publicações inválido.');
  const ids = new Set();
  function validate(item, kind) {
    const required = ['id', 't', 'desc', 'by', 'ini', 'loc', 'city', 'addr', 'tag', 'dur', 'createdAt'];
    if (!item || item.kind !== kind || required.some(key => typeof item[key] !== 'string') || !item.id || ids.has(item.id) || !item.t.trim() || !item.desc.trim() || !item.by.trim() || item.t.length > 100 || item.desc.length > 2000 || !['carros', 'motos', 'outros'].includes(item.cat) || !SERVICE_TYPES.some(type => type.id === item.serviceType) || !Number.isFinite(Date.parse(item.createdAt))) throw Error('Publicação inválida.');
    if (item.ownerId !== (kind === 'offer' ? 'provider' : 'client')) throw Error('Autor da publicação inválido.');
    if (!Number.isFinite(item.coordinates?.lat) || !Number.isFinite(item.coordinates?.lon) || Math.abs(item.coordinates.lat) > 90 || Math.abs(item.coordinates.lon) > 180) throw Error('Localização da publicação inválida.');
    if (kind === 'offer' && (!Number.isFinite(item.p) || item.p <= 0 || item.p > 1000000)) throw Error('Preço inválido.');
    ids.add(item.id);
    return { id: item.id, kind, ownerId: item.ownerId, t: item.t, desc: item.desc, by: item.by, ini: item.ini,
      cat: item.cat, serviceType: item.serviceType, img: PUBLICATION_PHOTOS[item.serviceType],
      loc: item.loc, city: item.city, coordinates: { lat: item.coordinates.lat, lon: item.coordinates.lon },
      addr: item.addr, tag: item.tag, dur: item.dur, p: kind === 'offer' ? item.p : null,
      vehicle: typeof item.vehicle === 'string' ? item.vehicle.slice(0, 120) : '',
      createdAt: item.createdAt, rate: 'Novo', n: 0 };
  }
  if (value.offers.length + value.requests.length > 2000) throw Error('Limite de publicações atingido.');
  return { version: 1, offers: value.offers.map(item => validate(item, 'offer')), requests: value.requests.map(item => validate(item, 'request')) };
}
export function loadMarketplace() {
  try {
    const json = localStorage.getItem(MARKETPLACE_STORAGE_KEY);
    return { data: json ? validateMarketplace(JSON.parse(json)) : emptyMarketplace(), error: '' };
  } catch { return { data: emptyMarketplace(), error: 'Não foi possível ler as publicações salvas neste navegador.' }; }
}
export function saveMarketplace(value) {
  const validated = validateMarketplace(value);
  localStorage.setItem(MARKETPLACE_STORAGE_KEY, JSON.stringify(validated));
  return validated;
}
