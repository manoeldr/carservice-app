import { SERVICES } from './index.js';
import { DEFAULT_LOCATION } from './locations.js';

function hash(text) {
  let value = 2166136261;
  for (const character of text) value = Math.imul(value ^ character.charCodeAt(0), 16777619);
  return value >>> 0;
}

function randomSequence(seed) {
  let value = seed;
  return () => {
    value = (value + 0x6D2B79F5) | 0;
    let next = Math.imul(value ^ (value >>> 15), 1 | value);
    next ^= next + Math.imul(next ^ (next >>> 7), 61 | next);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

// Catálogo fictício estável por região. Alterar somente o raio não muda os serviços.
export function regionalServices(location) {
  if (location.id === DEFAULT_LOCATION.id) return SERVICES;
  const regionKey = `${location.id}:${location.lat.toFixed(3)}:${location.lon.toFixed(3)}`;
  const seed = hash(regionKey);
  const random = randomSequence(seed);
  const regionName = location.id === 'device' ? 'da Região' : location.name;
  const providers = {
    AC: `Auto Center ${regionName}`,
    PC: `Pneus ${regionName}`,
    BG: `Brilho Garage ${regionName}`,
    OP: `Oficina ${regionName}`,
    MC: `Moto Care ${regionName}`,
    FS: `Fretes ${regionName}`,
  };
  const catalog = SERVICES.map((service, index) => {
    // Uma oferta de cada serviço-base perto do centro; demais até 8 km.
    const distance = index < 8 ? .3 + random() * 1.2 : .5 + random() * 7.5;
    const angle = random() * Math.PI * 2;
    const lat = location.lat + Math.cos(angle) * distance / 111.195;
    const lon = location.lon + Math.sin(angle) * distance / (111.195 * Math.max(.01, Math.cos(location.lat * Math.PI / 180)));
    return {
      ...service,
      id: `region-${seed}-${service.id}`,
      coordinates: { lat, lon },
      by: providers[service.ini],
      loc: location.id === 'device' ? 'Sua região' : location.name,
      city: location.city || '',
      addr: 'Endereço a combinar pelo chat',
      p: Math.max(10, Math.round(service.p * (.8 + random() * .4))),
      rate: (4.5 + random() * .5).toFixed(1).replace('.', ','),
      n: 15 + Math.floor(random() * 180),
      simulated: true,
    };
  });
  for (let index = catalog.length - 1; index > 0; index--) {
    const other = Math.floor(random() * (index + 1));
    [catalog[index], catalog[other]] = [catalog[other], catalog[index]];
  }
  return catalog;
}
