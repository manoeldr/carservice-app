export const VEHICLE_TYPES = [
  { id: 'carros', label: 'Carro' }, { id: 'motos', label: 'Moto' }, { id: 'outros', label: 'Outro' },
];
export const HELP_TOPICS = [
  { question: 'Como funciona a prioridade dos prestadores?', answer: 'O catálogo é ordenado por reputação: avaliações valem até 70 pontos e atividade vale até 30. Os níveis Bronze, Prata e Ouro indicam a evolução. A atividade tem limites por ação e considera os últimos 30 dias. No perfil prestador, abra Minha conta e depois Minha reputação para consultar as regras e conquistas.' },
  { question: 'Como avalio um prestador?', answer: 'Entre como cliente e abra os detalhes de um serviço. Escolha de 1 a 5 estrelas em Sua avaliação e salve. Você pode editar a nota; ela substitui a anterior e não aumenta a quantidade de avaliações. Neste protótipo, a avaliação é demonstrativa.' },
  { question: 'Como encontro um serviço?', answer: 'No Início, busque pelo nome do serviço ou prestador. Escolha Carros, Motos ou Outros e use Filtrar para selecionar óleo, pneus, lavagem e outras categorias.' },
  { question: 'Como mudo a região da busca?', answer: 'Toque na localização no Início ou em Minha conta. Escolha a região e o raio de busca. Você também pode usar a localização do dispositivo se permitir o acesso no navegador.', action: 'location', actionLabel: 'Alterar localização' },
  { question: 'Os prestadores e preços são reais?', answer: 'Não. Este é um protótipo acadêmico. Os serviços, prestadores, avaliações e preços são fictícios. Cada região recebe um catálogo de demonstração.' },
  { question: 'Como salvo um serviço ou converso?', answer: 'Toque no coração para adicionar aos Salvos. Nos detalhes do serviço, toque em Enviar mensagem para abrir uma conversa de demonstração. As mensagens não são enviadas a uma oficina real.' },
  { question: 'Onde cadastro meus veículos?', answer: 'Em Minha conta, abra Meus veículos para adicionar, editar ou remover carros, motos e outros veículos.', action: 'vehicles', actionLabel: 'Meus veículos' },
  { question: 'Meus dados ficam salvos?', answer: 'Dados pessoais, veículos, preferências e localização ficam salvos neste navegador em formato JSON. Você pode exportar um backup e importá-lo em outro navegador. Favoritos e mensagens ficam apenas na sessão.', action: 'privacy', actionLabel: 'Privacidade e segurança' },
  { question: 'Por que a localização não funciona?', answer: 'Confira a permissão de localização do navegador. A localização automática depende de uma conexão segura (HTTPS) ou localhost. Se não estiver disponível, selecione uma região manualmente.' },
  { question: 'O que acontece ao publicar um pedido?', answer: 'O pedido fica salvo neste navegador e aparece na tela inicial do prestador, conforme a região e a distância. Entre com prestador@email.com e prestador123 para conferir. É uma simulação local, sem contratação ou pagamento real.' },
  { question: 'Como acesso o modo prestador?', answer: 'Entre com prestador@email.com e senha prestador123. No Início, veja Pedidos de clientes ou Meus serviços. Use Publicar serviço para adicionar uma oferta ao catálogo do cliente. O acesso de cliente é cliente@email.com, senha cliente123.' },
];
