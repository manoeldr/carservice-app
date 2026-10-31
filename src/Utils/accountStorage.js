import defaults from '../data/account-defaults.json';
import { LOCATIONS, SEARCH_RADII, DEFAULT_LOCATION } from '../data/locations';

export const ACCOUNT_STORAGE_KEY = 'carservice.account.v1';
const cleanText = (value, max = 120) => typeof value === 'string' ? value.trim().slice(0, max) : '';
export const freshAccount = () => JSON.parse(JSON.stringify(defaults));
export const normalizePlate = value => value.replace(/[^a-z0-9]/gi, '').toUpperCase().slice(0, 7);
export const validEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export const validPhone = value => /^\d{10,11}$/.test(value.replace(/\D/g, ''));
export const validPlate = value => !value || /^[A-Z]{3}\d[A-Z0-9]\d{2}$/.test(value);
export function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  const split = digits.length > 10 ? 7 : 6;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, split)}${digits.length > split ? '-' + digits.slice(split) : ''}`;
}

export function validateAccount(value) {
  if (!value || value.version !== 1 || !value.user || !Array.isArray(value.vehicles) || !value.preferences || !value.location) throw Error('O arquivo não tem o formato de conta do Car Service.');
  const user = {
    name: cleanText(value.user.name),
    email: cleanText(value.user.email, 254).toLowerCase(),
    phone: formatPhone(cleanText(value.user.phone, 30)),
  };
  if (user.name.length < 2 || !validEmail(user.email) || (user.phone && !validPhone(user.phone))) throw Error('Confira nome, e-mail e celular no arquivo.');
  if (value.vehicles.length > 100) throw Error('O limite é de 100 veículos por conta.');
  const ids = new Set(), plates = new Set();
  const vehicles = value.vehicles.map(vehicle => {
    if (!vehicle || typeof vehicle !== 'object') throw Error('Há um veículo inválido no arquivo.');
    const item = {
      id: cleanText(vehicle.id, 100),
      type: cleanText(vehicle.type, 10),
      brand: cleanText(vehicle.brand, 60),
      model: cleanText(vehicle.model, 80),
      year: Number(vehicle.year),
      plate: normalizePlate(cleanText(vehicle.plate, 20)),
      color: cleanText(vehicle.color, 40),
    };
    if (!item.id || ids.has(item.id) || !['carros', 'motos', 'outros'].includes(item.type) || !item.brand || !item.model || !Number.isInteger(item.year) || item.year < 1900 || item.year > new Date().getFullYear() + 1 || !validPlate(item.plate) || (item.plate && plates.has(item.plate))) throw Error('Há um veículo inválido ou repetido no arquivo.');
    ids.add(item.id); if (item.plate) plates.add(item.plate);
    return item;
  });
  const preferences = value.preferences;
  if (typeof preferences.notifications !== 'boolean' || typeof preferences.deviceLocation !== 'boolean') throw Error('As preferências do arquivo são inválidas.');
  const candidate = value.location;
  if (!SEARCH_RADII.includes(candidate.radius)) throw Error('A distância de busca do arquivo é inválida.');
  let location;
  if (candidate.id === 'device') {
    if (!Number.isFinite(candidate.lat) || !Number.isFinite(candidate.lon) || Math.abs(candidate.lat) > 90 || Math.abs(candidate.lon) > 180) throw Error('A localização do arquivo é inválida.');
    location = { id: 'device', name: 'Localização atual', lat: candidate.lat, lon: candidate.lon, radius: candidate.radius };
  } else {
    const known = LOCATIONS.find(place => place.id === candidate.id);
    if (!known) throw Error('A região do arquivo não está disponível.');
    location = { ...known, radius: candidate.radius };
  }
  if (!preferences.deviceLocation && location.id === 'device') location = { ...DEFAULT_LOCATION };
  return { version: 1, user, vehicles, preferences: { notifications: preferences.notifications, deviceLocation: preferences.deviceLocation }, location };
}

export function loadAccount() {
  try {
    const json = localStorage.getItem(ACCOUNT_STORAGE_KEY);
    return { account: json ? validateAccount(JSON.parse(json)) : freshAccount(), error: '' };
  } catch {
    return { account: freshAccount(), error: 'Não foi possível ler a conta salva. Os dados atuais ficam nesta sessão; importe um backup ou tente salvar novamente.' };
  }
}

export function saveAccount(account) {
  const validated = validateAccount(account);
  localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(validated));
  return validated;
}

export function downloadAccount(account) {
  const file = new Blob([JSON.stringify(validateAccount(account), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url; link.download = 'carservice-conta.json';
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
