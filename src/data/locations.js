// Coordenadas aproximadas para o catálogo fictício de demonstração.
export const LOCATIONS = [
  { id: 'vila-mariana', name: 'Vila Mariana', city: 'São Paulo', lat: -23.5902, lon: -46.6359 },
  { id: 'saude', name: 'Saúde', city: 'São Paulo', lat: -23.6103, lon: -46.6366 },
  { id: 'moema', name: 'Moema', city: 'São Paulo', lat: -23.6025, lon: -46.6636 },
  { id: 'ipiranga', name: 'Ipiranga', city: 'São Paulo', lat: -23.5892, lon: -46.6075 },
  { id: 'bela-vista', name: 'Bela Vista', city: 'São Paulo', lat: -23.5613, lon: -46.6484 },
  { id: 'pinheiros', name: 'Pinheiros', city: 'São Paulo', lat: -23.5673, lon: -46.7019 },
  { id: 'santana', name: 'Santana', city: 'São Paulo', lat: -23.5015, lon: -46.6245 },
  { id: 'tatuape', name: 'Tatuapé', city: 'São Paulo', lat: -23.5403, lon: -46.5766 },
  { id: 'caxias', name: 'Centro', city: 'Caxias do Sul', lat: -29.1685, lon: -51.1794 },
  { id: 'porto-alegre', name: 'Centro Histórico', city: 'Porto Alegre', lat: -30.0328, lon: -51.2302 },
];
export const SEARCH_RADII = [2, 5, 10, 20, 50];
export const DEFAULT_LOCATION = { ...LOCATIONS[0], radius: 10 };
export const locationLabel = location => location.city ? `${location.name}, ${location.city}` : location.name;

export function distanceKm(from, to) {
  const radians = angle => angle * Math.PI / 180;
  const dLat = radians(to.lat - from.lat);
  const dLon = radians(to.lon - from.lon);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(radians(from.lat)) * Math.cos(radians(to.lat)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1 - a)));
}

export function servicesAtLocation(services, location) {
  return services.map(service => {
    const point = service.coordinates || LOCATIONS.find(place => place.name === service.loc && place.city === 'São Paulo');
    const distance = point ? distanceKm(location, point) : Infinity;
    return { ...service, distance, km: Math.round(distance * 10) / 10 };
  });
}
