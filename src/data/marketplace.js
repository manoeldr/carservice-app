import { SERVICE_TYPES } from './index';

export const PUBLICATION_PHOTOS = {
  oleo: '/fotos/troca-oleo.jpg', pneus: '/fotos/alinhamento.jpg', lavagem: '/fotos/lavagem.jpg',
  eletrica: '/fotos/diagnostico.jpg', mecanica: '/fotos/diagnostico.jpg', freios: '/fotos/freios.jpg',
  estetica: '/fotos/polimento.jpg', transporte: '/fotos/frete.jpg',
};

const REQUEST_EXAMPLES = [
  { t: 'Revisão antes de viajar', desc: 'Vou viajar no fim de semana e preciso conferir óleo, freios e pneus. Gostaria de receber um orçamento e saber a disponibilidade para esta semana.', by: 'Ana Souza', vehicle: 'Chevrolet Onix · 2020', cat: 'carros', serviceType: 'mecanica' },
  { t: 'Carro com dificuldade para dar partida', desc: 'O carro demora para ligar de manhã e a luz da bateria acendeu. Preciso avaliar bateria e alternador antes de trocar qualquer peça.', by: 'Rafael Lima', vehicle: 'Hyundai HB20 · 2019', cat: 'carros', serviceType: 'eletrica' },
  { t: 'Troca de óleo e filtros do meu carro', desc: 'Meu carro chegou à quilometragem da revisão. Procuro troca de óleo conforme a especificação do fabricante e avaliação dos filtros.', by: 'Beatriz Costa', vehicle: 'Volkswagen Polo · 2021', cat: 'carros', serviceType: 'oleo' },
  { t: 'Pneu perdendo pressão', desc: 'Um pneu está esvaziando devagar. Preciso verificar se tem furo ou problema na válvula e conferir os outros pneus.', by: 'Pedro Santos', vehicle: 'Fiat Argo · 2022', cat: 'carros', serviceType: 'pneus' },
  { t: 'Limpeza interna dos bancos', desc: 'Preciso higienizar os bancos de tecido e o carpete. Quero saber o tempo para secar e se é possível agendar para sábado.', by: 'Camila Alves', vehicle: 'Renault Sandero · 2018', cat: 'carros', serviceType: 'lavagem' },
  { t: 'Barulho ao frear', desc: 'O freio começou a fazer um ruído e gostaria de avaliar as pastilhas e os discos. Peço orçamento antes da troca de peças.', by: 'Diego Martins', vehicle: 'Toyota Corolla · 2017', cat: 'carros', serviceType: 'freios' },
  { t: 'Polimento para remover riscos leves', desc: 'A pintura tem pequenos riscos e marcas de lavagem. Procuro uma avaliação para polimento e proteção da pintura.', by: 'Luiza Ferreira', vehicle: 'Honda Fit · 2016', cat: 'carros', serviceType: 'estetica' },
  { t: 'Revisão de moto para uso diário', desc: 'Uso a moto para trabalhar e preciso revisar a corrente, trocar o óleo e conferir os freios. Prefiro atendimento pela manhã.', by: 'Marcos Oliveira', vehicle: 'Honda CG 160 · 2022', cat: 'motos', serviceType: 'mecanica' },
  { t: 'Moto com falha na iluminação', desc: 'O farol está oscilando e a seta parou de funcionar. Preciso identificar a causa e receber um orçamento.', by: 'Julia Ramos', vehicle: 'Yamaha Fazer · 2021', cat: 'motos', serviceType: 'eletrica' },
  { t: 'Frete para transportar uma mesa', desc: 'Preciso levar uma mesa e quatro cadeiras para outro endereço na região. Gostaria de combinar o horário e saber se há ajudante.', by: 'Bruno Rocha', vehicle: 'Transporte com utilitário', cat: 'outros', serviceType: 'transporte' },
];

export const initialsOf = name => name.trim().split(/\s+/).map(word => word[0]).slice(0, 2).join('').toUpperCase();
export const publicationId = prefix => `${prefix}-${globalThis.crypto?.randomUUID?.() || Date.now() + '-' + Math.random().toString(36).slice(2)}`;

export function createPublication(kind, draft, account, location) {
  if ((kind === 'offer' && account.role !== 'provider') || (kind === 'request' && account.role !== 'client')) throw Error('Este perfil não pode fazer esta publicação.');
  const t = draft.t.trim(), desc = draft.desc.trim();
  if (!t || !desc || !['carros', 'motos', 'outros'].includes(draft.cat) || !SERVICE_TYPES.some(type => type.id === draft.serviceType)) throw Error('Preencha título, descrição, veículo e categoria.');
  if (t.length > 100 || desc.length > 2000) throw Error('Revise o tamanho do título e da descrição.');
  if (kind === 'offer' && (!Number.isFinite(draft.p) || draft.p <= 0 || draft.p > 1000000)) throw Error('Informe um preço válido maior que zero.');
  return {
    id: publicationId(kind), kind, ownerId: account.role,
    t, desc, cat: draft.cat, serviceType: draft.serviceType,
    img: PUBLICATION_PHOTOS[draft.serviceType],
    p: kind === 'offer' ? Math.round(draft.p * 100) / 100 : null,
    by: account.user.name, ini: initialsOf(account.user.name),
    vehicle: kind === 'request' ? (draft.vehicle || '').trim().slice(0, 120) : '',
    loc: location.id === 'device' ? 'Sua região' : location.name, city: location.city || '',
    coordinates: { lat: location.lat, lon: location.lon },
    addr: 'Local a combinar pelo chat', tag: kind === 'request' ? 'Pedido de cliente' : SERVICE_TYPES.find(type => type.id === draft.serviceType).label,
    dur: kind === 'offer' ? (draft.dur || '').trim().slice(0, 80) || 'Sob consulta' : 'A combinar',
    rate: 'Novo', n: 0, createdAt: new Date().toISOString(),
  };
}

export function demoRequestsFor(location) {
  const key = `${location.id}-${location.lat.toFixed(3)}-${location.lon.toFixed(3)}`;
  return REQUEST_EXAMPLES.map((request, index) => ({
    ...request, id: `demo-request-${key}-${index}`, kind: 'request', ownerId: 'example',
    ini: initialsOf(request.by), img: PUBLICATION_PHOTOS[request.serviceType], p: null,
    loc: location.id === 'device' ? 'Sua região' : location.name, city: location.city || '',
    coordinates: { lat: location.lat + (index % 3 + 1) * .003, lon: location.lon + (index % 2 ? -.004 : .004) },
    addr: 'Local a combinar pelo chat', tag: 'Pedido de cliente', dur: 'A combinar', rate: '', n: 0,
    createdAt: new Date(Date.now() - (index + 1) * 3600000).toISOString(), simulated: true,
  }));
}
