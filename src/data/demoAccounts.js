// Acessos públicos de demonstração para o protótipo acadêmico.
export const DEMO_ACCOUNTS = [
  { role: 'client', label: 'Cliente', email: 'cliente@email.com', password: 'cliente123', name: 'Lucas Martins' },
  { role: 'provider', label: 'Prestador', email: 'prestador@email.com', password: 'prestador123', name: 'Auto Center Silva' },
];

export function authenticateDemo(email, password) {
  const normalized = email.trim().toLowerCase();
  return DEMO_ACCOUNTS.find(account => account.email === normalized && account.password === password) || null;
}
