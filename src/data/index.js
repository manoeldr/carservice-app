const FEATURED_SERVICES=[
{id:1,serviceType:'oleo',img:'/fotos/troca-oleo.jpg',t:'Troca de óleo e filtro',p:189,by:'Auto Center Silva',ini:'AC',loc:'Vila Mariana',km:1.2,cat:'carros',e:'🛢️',bg:'#3a3d44',rate:'4,9',n:86,dur:'40–60 min',addr:'Rua Domingos de Morais, 1450',tag:'Manutenção',desc:'Troca de óleo do motor e filtro, com inspeção dos níveis e descarte correto. Usamos a especificação indicada para o seu carro. Confirme o valor para seu modelo pelo chat.'},
{id:2,serviceType:'pneus',img:'/fotos/alinhamento.jpg',t:'Alinhamento 3D',p:120,by:'Pneus & Cia',ini:'PC',loc:'Saúde',km:2.4,cat:'carros',e:'🛞',bg:'#59616b',rate:'4,8',n:61,dur:'30–40 min',addr:'Av. Jabaquara, 820',tag:'Pneus',desc:'Alinhamento computadorizado 3D com relatório antes e depois do serviço.'},
{id:3,serviceType:'lavagem',img:'/fotos/lavagem.jpg',t:'Lavagem completa',p:65,by:'Brilho Garage',ini:'BG',loc:'Moema',km:3.1,cat:'carros',e:'🧽',bg:'#22262c',rate:'4,7',n:140,dur:'60 min',addr:'Al. dos Anapurus, 300',tag:'Estética',desc:'Lavagem externa e limpeza interna completa, com secagem e acabamento.'},
{id:4,serviceType:'freios',img:'/fotos/freios.jpg',t:'Revisão de freios',p:150,by:'Auto Center Silva',ini:'AC',loc:'Vila Mariana',km:1.2,cat:'carros',e:'🛑',bg:'#4a4f57',rate:'4,9',n:86,dur:'60–90 min',addr:'Rua Domingos de Morais, 1450',tag:'Manutenção',desc:'Inspeção de pastilhas, discos e fluido de freio. Peças cobradas à parte.'},
{id:5,serviceType:'mecanica',img:'/fotos/diagnostico.jpg',t:'Diagnóstico do motor',p:99,by:'Oficina do Pedro',ini:'OP',loc:'Ipiranga',km:4.0,cat:'carros',e:'🔧',bg:'#6a6f77',rate:'4,6',n:47,dur:'45 min',addr:'Rua Bom Pastor, 210',tag:'Manutenção',desc:'Leitura de scanner e inspeção visual para identificar falhas no motor.'},
{id:6,serviceType:'estetica',img:'/fotos/polimento.jpg',t:'Polimento automotivo',p:280,by:'Brilho Garage',ini:'BG',loc:'Moema',km:3.1,cat:'carros',e:'✨',bg:'#15171a',rate:'4,7',n:140,dur:'3–4 h',addr:'Al. dos Anapurus, 300',tag:'Estética',desc:'Polimento técnico com remoção de riscos leves e proteção da pintura.'},
{id:7,serviceType:'mecanica',img:'/fotos/moto.jpg',t:'Revisão de moto',p:130,by:'Moto Care',ini:'MC',loc:'Vila Mariana',km:1.8,cat:'motos',e:'🏍️',bg:'#3d3a44',rate:'4,8',n:52,dur:'60 min',addr:'Rua Vergueiro, 900',tag:'Manutenção',desc:'Revisão geral: óleo, corrente, freios e pneus.'},
{id:8,serviceType:'transporte',img:'/fotos/frete.jpg',t:'Frete de utilitário',p:220,by:'Fretes SP',ini:'FS',loc:'Moema',km:3.5,cat:'outros',e:'🚚',bg:'#44403a',rate:'4,5',n:30,dur:'Sob consulta',addr:'Av. Ibirapuera, 100',tag:'Transporte',desc:'Fretes e pequenas mudanças na região.'},
];

// Catálogo de demonstração: preços ilustrativos e fotos compartilhadas por tipo de serviço.
const ADDITIONAL_SERVICES = [
  {
    "baseId": 1,
    "t": "Troca de óleo sintético",
    "p": 229,
    "desc": "Serviço de manutenção com verificação de compatibilidade dos filtros e lubrificantes com o veículo. Confirme pelo chat a especificação, os materiais incluídos e o orçamento para o seu modelo."
  },
  {
    "baseId": 1,
    "t": "Troca de óleo semissintético",
    "p": 169,
    "desc": "Serviço de manutenção com verificação de compatibilidade dos filtros e lubrificantes com o veículo. Confirme pelo chat a especificação, os materiais incluídos e o orçamento para o seu modelo."
  },
  {
    "baseId": 1,
    "t": "Troca do filtro de óleo",
    "p": 59,
    "desc": "Serviço de manutenção com verificação de compatibilidade dos filtros e lubrificantes com o veículo. Confirme pelo chat a especificação, os materiais incluídos e o orçamento para o seu modelo."
  },
  {
    "baseId": 1,
    "t": "Troca do filtro de ar",
    "p": 69,
    "desc": "Serviço de manutenção com verificação de compatibilidade dos filtros e lubrificantes com o veículo. Confirme pelo chat a especificação, os materiais incluídos e o orçamento para o seu modelo."
  },
  {
    "baseId": 1,
    "t": "Troca do filtro de combustível",
    "p": 89,
    "desc": "Serviço de manutenção com verificação de compatibilidade dos filtros e lubrificantes com o veículo. Confirme pelo chat a especificação, os materiais incluídos e o orçamento para o seu modelo."
  },
  {
    "baseId": 1,
    "t": "Revisão de lubrificação",
    "p": 119,
    "desc": "Serviço de manutenção com verificação de compatibilidade dos filtros e lubrificantes com o veículo. Confirme pelo chat a especificação, os materiais incluídos e o orçamento para o seu modelo."
  },
  {
    "baseId": 1,
    "t": "Troca de óleo para SUV",
    "p": 259,
    "desc": "Serviço de manutenção com verificação de compatibilidade dos filtros e lubrificantes com o veículo. Confirme pelo chat a especificação, os materiais incluídos e o orçamento para o seu modelo."
  },
  {
    "baseId": 1,
    "t": "Kit de filtros para revisão",
    "p": 199,
    "desc": "Serviço de manutenção com verificação de compatibilidade dos filtros e lubrificantes com o veículo. Confirme pelo chat a especificação, os materiais incluídos e o orçamento para o seu modelo."
  },
  {
    "baseId": 2,
    "t": "Balanceamento de rodas",
    "p": 80,
    "desc": "Atendimento para rodas e pneus, com avaliação do estado dos componentes antes da execução. Confirme pelo chat as medidas dos pneus, a quantidade de rodas e o orçamento."
  },
  {
    "baseId": 2,
    "t": "Rodízio de pneus",
    "p": 60,
    "desc": "Atendimento para rodas e pneus, com avaliação do estado dos componentes antes da execução. Confirme pelo chat as medidas dos pneus, a quantidade de rodas e o orçamento."
  },
  {
    "baseId": 2,
    "t": "Calibragem e inspeção de pneus",
    "p": 35,
    "desc": "Atendimento para rodas e pneus, com avaliação do estado dos componentes antes da execução. Confirme pelo chat as medidas dos pneus, a quantidade de rodas e o orçamento."
  },
  {
    "baseId": 2,
    "t": "Montagem de pneus",
    "p": 50,
    "desc": "Atendimento para rodas e pneus, com avaliação do estado dos componentes antes da execução. Confirme pelo chat as medidas dos pneus, a quantidade de rodas e o orçamento."
  },
  {
    "baseId": 2,
    "t": "Alinhamento para SUV",
    "p": 160,
    "desc": "Atendimento para rodas e pneus, com avaliação do estado dos componentes antes da execução. Confirme pelo chat as medidas dos pneus, a quantidade de rodas e o orçamento."
  },
  {
    "baseId": 2,
    "t": "Reparo de pneu furado",
    "p": 45,
    "desc": "Atendimento para rodas e pneus, com avaliação do estado dos componentes antes da execução. Confirme pelo chat as medidas dos pneus, a quantidade de rodas e o orçamento."
  },
  {
    "baseId": 2,
    "t": "Inspeção de desgaste dos pneus",
    "p": 40,
    "desc": "Atendimento para rodas e pneus, com avaliação do estado dos componentes antes da execução. Confirme pelo chat as medidas dos pneus, a quantidade de rodas e o orçamento."
  },
  {
    "baseId": 2,
    "t": "Alinhamento e balanceamento",
    "p": 180,
    "desc": "Atendimento para rodas e pneus, com avaliação do estado dos componentes antes da execução. Confirme pelo chat as medidas dos pneus, a quantidade de rodas e o orçamento."
  },
  {
    "baseId": 3,
    "t": "Lavagem externa",
    "p": 40,
    "desc": "Limpeza automotiva com produtos adequados às superfícies do veículo. Confirme pelo chat o porte do carro, os materiais dos bancos e o que está incluído no atendimento."
  },
  {
    "baseId": 3,
    "t": "Limpeza interna",
    "p": 55,
    "desc": "Limpeza automotiva com produtos adequados às superfícies do veículo. Confirme pelo chat o porte do carro, os materiais dos bancos e o que está incluído no atendimento."
  },
  {
    "baseId": 3,
    "t": "Lavagem de SUV",
    "p": 95,
    "desc": "Limpeza automotiva com produtos adequados às superfícies do veículo. Confirme pelo chat o porte do carro, os materiais dos bancos e o que está incluído no atendimento."
  },
  {
    "baseId": 3,
    "t": "Higienização de bancos",
    "p": 180,
    "desc": "Limpeza automotiva com produtos adequados às superfícies do veículo. Confirme pelo chat o porte do carro, os materiais dos bancos e o que está incluído no atendimento."
  },
  {
    "baseId": 3,
    "t": "Limpeza de carpetes",
    "p": 120,
    "desc": "Limpeza automotiva com produtos adequados às superfícies do veículo. Confirme pelo chat o porte do carro, os materiais dos bancos e o que está incluído no atendimento."
  },
  {
    "baseId": 3,
    "t": "Lavagem detalhada",
    "p": 150,
    "desc": "Limpeza automotiva com produtos adequados às superfícies do veículo. Confirme pelo chat o porte do carro, os materiais dos bancos e o que está incluído no atendimento."
  },
  {
    "baseId": 3,
    "t": "Limpeza de rodas",
    "p": 45,
    "desc": "Limpeza automotiva com produtos adequados às superfícies do veículo. Confirme pelo chat o porte do carro, os materiais dos bancos e o que está incluído no atendimento."
  },
  {
    "baseId": 3,
    "t": "Lavagem ecológica",
    "p": 70,
    "desc": "Limpeza automotiva com produtos adequados às superfícies do veículo. Confirme pelo chat o porte do carro, os materiais dos bancos e o que está incluído no atendimento."
  },
  {
    "baseId": 4,
    "t": "Troca de pastilhas dianteiras",
    "p": 140,
    "desc": "Avaliação do sistema de freios e execução do serviço após confirmação do orçamento. Informe pelo chat o modelo do veículo; peças e materiais devem ser combinados com a oficina."
  },
  {
    "baseId": 4,
    "t": "Troca de pastilhas traseiras",
    "p": 130,
    "desc": "Avaliação do sistema de freios e execução do serviço após confirmação do orçamento. Informe pelo chat o modelo do veículo; peças e materiais devem ser combinados com a oficina."
  },
  {
    "baseId": 4,
    "t": "Troca de fluido de freio",
    "p": 110,
    "desc": "Avaliação do sistema de freios e execução do serviço após confirmação do orçamento. Informe pelo chat o modelo do veículo; peças e materiais devem ser combinados com a oficina."
  },
  {
    "baseId": 4,
    "t": "Inspeção dos discos de freio",
    "p": 80,
    "desc": "Avaliação do sistema de freios e execução do serviço após confirmação do orçamento. Informe pelo chat o modelo do veículo; peças e materiais devem ser combinados com a oficina."
  },
  {
    "baseId": 4,
    "t": "Revisão do freio de mão",
    "p": 95,
    "desc": "Avaliação do sistema de freios e execução do serviço após confirmação do orçamento. Informe pelo chat o modelo do veículo; peças e materiais devem ser combinados com a oficina."
  },
  {
    "baseId": 4,
    "t": "Diagnóstico do sistema ABS",
    "p": 120,
    "desc": "Avaliação do sistema de freios e execução do serviço após confirmação do orçamento. Informe pelo chat o modelo do veículo; peças e materiais devem ser combinados com a oficina."
  },
  {
    "baseId": 4,
    "t": "Limpeza do sistema de freios",
    "p": 100,
    "desc": "Avaliação do sistema de freios e execução do serviço após confirmação do orçamento. Informe pelo chat o modelo do veículo; peças e materiais devem ser combinados com a oficina."
  },
  {
    "baseId": 5,
    "t": "Diagnóstico eletrônico",
    "p": 120,
    "desc": "Inspeção técnica para identificar falhas e orientar a manutenção. Informe pelo chat os sintomas, o modelo e o ano do veículo. Reparos e peças são orçados separadamente."
  },
  {
    "baseId": 5,
    "t": "Inspeção antes de viajar",
    "p": 180,
    "desc": "Inspeção técnica para identificar falhas e orientar a manutenção. Informe pelo chat os sintomas, o modelo e o ano do veículo. Reparos e peças são orçados separadamente."
  },
  {
    "baseId": 5,
    "t": "Teste de bateria e alternador",
    "p": 65,
    "desc": "Inspeção técnica para identificar falhas e orientar a manutenção. Informe pelo chat os sintomas, o modelo e o ano do veículo. Reparos e peças são orçados separadamente."
  },
  {
    "baseId": 5,
    "t": "Diagnóstico de falha na partida",
    "p": 110,
    "desc": "Inspeção técnica para identificar falhas e orientar a manutenção. Informe pelo chat os sintomas, o modelo e o ano do veículo. Reparos e peças são orçados separadamente."
  },
  {
    "baseId": 5,
    "t": "Avaliação de luz no painel",
    "p": 90,
    "desc": "Inspeção técnica para identificar falhas e orientar a manutenção. Informe pelo chat os sintomas, o modelo e o ano do veículo. Reparos e peças são orçados separadamente."
  },
  {
    "baseId": 5,
    "t": "Inspeção de vazamentos",
    "p": 100,
    "desc": "Inspeção técnica para identificar falhas e orientar a manutenção. Informe pelo chat os sintomas, o modelo e o ano do veículo. Reparos e peças são orçados separadamente."
  },
  {
    "baseId": 5,
    "t": "Avaliação de carro usado",
    "p": 250,
    "desc": "Inspeção técnica para identificar falhas e orientar a manutenção. Informe pelo chat os sintomas, o modelo e o ano do veículo. Reparos e peças são orçados separadamente."
  },
  {
    "baseId": 6,
    "t": "Enceramento automotivo",
    "p": 110,
    "desc": "Cuidado estético com avaliação prévia das condições da pintura ou da superfície tratada. Confirme pelo chat a área de aplicação, o acabamento esperado e o orçamento."
  },
  {
    "baseId": 6,
    "t": "Polimento de faróis",
    "p": 130,
    "desc": "Cuidado estético com avaliação prévia das condições da pintura ou da superfície tratada. Confirme pelo chat a área de aplicação, o acabamento esperado e o orçamento."
  },
  {
    "baseId": 6,
    "t": "Cristalização da pintura",
    "p": 350,
    "desc": "Cuidado estético com avaliação prévia das condições da pintura ou da superfície tratada. Confirme pelo chat a área de aplicação, o acabamento esperado e o orçamento."
  },
  {
    "baseId": 6,
    "t": "Proteção da pintura",
    "p": 220,
    "desc": "Cuidado estético com avaliação prévia das condições da pintura ou da superfície tratada. Confirme pelo chat a área de aplicação, o acabamento esperado e o orçamento."
  },
  {
    "baseId": 6,
    "t": "Polimento de riscos leves",
    "p": 190,
    "desc": "Cuidado estético com avaliação prévia das condições da pintura ou da superfície tratada. Confirme pelo chat a área de aplicação, o acabamento esperado e o orçamento."
  },
  {
    "baseId": 6,
    "t": "Revitalização de pintura",
    "p": 300,
    "desc": "Cuidado estético com avaliação prévia das condições da pintura ou da superfície tratada. Confirme pelo chat a área de aplicação, o acabamento esperado e o orçamento."
  },
  {
    "baseId": 7,
    "t": "Troca de óleo da moto",
    "p": 75,
    "desc": "Manutenção de motocicleta com avaliação dos componentes relacionados ao serviço. Confirme pelo chat o modelo, a cilindrada e os materiais incluídos no orçamento."
  },
  {
    "baseId": 7,
    "t": "Ajuste e lubrificação de corrente",
    "p": 45,
    "desc": "Manutenção de motocicleta com avaliação dos componentes relacionados ao serviço. Confirme pelo chat o modelo, a cilindrada e os materiais incluídos no orçamento."
  },
  {
    "baseId": 7,
    "t": "Revisão de freios da moto",
    "p": 95,
    "desc": "Manutenção de motocicleta com avaliação dos componentes relacionados ao serviço. Confirme pelo chat o modelo, a cilindrada e os materiais incluídos no orçamento."
  },
  {
    "baseId": 7,
    "t": "Troca de pneu de moto",
    "p": 70,
    "desc": "Manutenção de motocicleta com avaliação dos componentes relacionados ao serviço. Confirme pelo chat o modelo, a cilindrada e os materiais incluídos no orçamento."
  },
  {
    "baseId": 7,
    "t": "Revisão elétrica da moto",
    "p": 110,
    "desc": "Manutenção de motocicleta com avaliação dos componentes relacionados ao serviço. Confirme pelo chat o modelo, a cilindrada e os materiais incluídos no orçamento."
  },
  {
    "baseId": 7,
    "t": "Inspeção de moto para viagem",
    "p": 150,
    "desc": "Manutenção de motocicleta com avaliação dos componentes relacionados ao serviço. Confirme pelo chat o modelo, a cilindrada e os materiais incluídos no orçamento."
  },
  {
    "baseId": 7,
    "t": "Troca de relação da moto",
    "p": 180,
    "desc": "Manutenção de motocicleta com avaliação dos componentes relacionados ao serviço. Confirme pelo chat o modelo, a cilindrada e os materiais incluídos no orçamento."
  },
  {
    "baseId": 8,
    "t": "Pequena mudança",
    "p": 280,
    "desc": "Transporte local com utilitário, sujeito à disponibilidade e capacidade do veículo. Informe pelo chat os endereços, os volumes, os andares e a necessidade de ajudante."
  },
  {
    "baseId": 8,
    "t": "Transporte de móveis",
    "p": 240,
    "desc": "Transporte local com utilitário, sujeito à disponibilidade e capacidade do veículo. Informe pelo chat os endereços, os volumes, os andares e a necessidade de ajudante."
  },
  {
    "baseId": 8,
    "t": "Entrega de eletrodomésticos",
    "p": 190,
    "desc": "Transporte local com utilitário, sujeito à disponibilidade e capacidade do veículo. Informe pelo chat os endereços, os volumes, os andares e a necessidade de ajudante."
  },
  {
    "baseId": 8,
    "t": "Frete para compras volumosas",
    "p": 160,
    "desc": "Transporte local com utilitário, sujeito à disponibilidade e capacidade do veículo. Informe pelo chat os endereços, os volumes, os andares e a necessidade de ajudante."
  },
  {
    "baseId": 8,
    "t": "Transporte com utilitário",
    "p": 210,
    "desc": "Transporte local com utilitário, sujeito à disponibilidade e capacidade do veículo. Informe pelo chat os endereços, os volumes, os andares e a necessidade de ajudante."
  }
];

export const SERVICE_TYPES = [
  { id: 'oleo', label: 'Óleo e filtros' },
  { id: 'pneus', label: 'Pneus' },
  { id: 'lavagem', label: 'Lavagem' },
  { id: 'eletrica', label: 'Elétrica' },
  { id: 'mecanica', label: 'Mecânica' },
  { id: 'freios', label: 'Freios' },
  { id: 'estetica', label: 'Estética' },
  { id: 'transporte', label: 'Transporte' },
];

const SERVICE_TYPE_OVERRIDES = {
  'Diagnóstico eletrônico': 'eletrica',
  'Teste de bateria e alternador': 'eletrica',
  'Diagnóstico de falha na partida': 'eletrica',
  'Avaliação de luz no painel': 'eletrica',
  'Diagnóstico do sistema ABS': 'eletrica',
  'Troca de óleo da moto': 'oleo',
  'Revisão de freios da moto': 'freios',
  'Troca de pneu de moto': 'pneus',
  'Revisão elétrica da moto': 'eletrica',
};

export const SERVICES = [
  ...FEATURED_SERVICES,
  ...ADDITIONAL_SERVICES.map(({ baseId, ...service }, index) => {
    const base = FEATURED_SERVICES.find(item => item.id === baseId);
    return {
      ...base,
      ...service,
      serviceType: SERVICE_TYPE_OVERRIDES[service.t] || base.serviceType,
      id: index + 9,
      dur: 'Sob consulta',
    };
  }),
];

export const brl = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: Number.isInteger(value) ? 0 : 2, maximumFractionDigits: 2 }).format(value);
export const CHATS0=[
{id:1,sid:1,by:'Auto Center Silva',ini:'AC',svc:'Troca de óleo e filtro',time:'10:42',unread:2,msgs:[['me','Olá! Esse valor vale para um Onix 2020?','10:30'],['them','Olá, Lucas! Sim, fica R$ 189 com óleo 5W-30, filtro e mão de obra.','10:33'],['them','Também conferimos os níveis e fazemos o descarte do óleo usado.','10:34'],['me','Ótimo! Posso levar amanhã às 10h?','10:40'],['them','Pode trazer às 10h. Te esperamos!','10:42']]},
{id:2,sid:3,by:'Brilho Garage',ini:'BG',svc:'Lavagem completa',time:'09:18',unread:1,msgs:[['them','A lavagem inclui a limpeza interna.','09:18']]},
{id:3,sid:2,by:'Pneus & Cia',ini:'PC',svc:'Alinhamento 3D',time:'Ontem',unread:0,msgs:[['me','Perfeito, obrigado!','18:02']]},
{id:4,sid:5,by:'Oficina do Pedro',ini:'OP',svc:'Diagnóstico do motor',time:'Ontem',unread:0,msgs:[['them','Qual é o ano do seu veículo?','16:20']]},
{id:5,sid:4,by:'Auto Center Silva',ini:'AC',svc:'Revisão de freios',time:'Seg.',unread:0,msgs:[['me','Vou conferir e te aviso.','11:00']]},
{id:6,sid:7,by:'Moto Care',ini:'MC',svc:'Revisão de moto',time:'Seg.',unread:0,msgs:[['them','Atendemos esse modelo, sim.','10:10']]},
];
export const lastOf=c=>{const m=c.msgs[c.msgs.length-1];if(!m)return 'Inicie uma conversa.';return (m[0]==='me'?'Você: ':'')+m[1]};

const normalizeSearch = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

export function filterServices(services, { vehicle, query = '', types = [] }) {
  const search = normalizeSearch(query);
  return services.filter(service =>
    service.cat === vehicle &&
    (!types.length || types.includes(service.serviceType)) &&
    normalizeSearch(`${service.t} ${service.by}`).includes(search)
  );
}
