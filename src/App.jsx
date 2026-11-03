import { useEffect, useMemo, useState } from 'react';
import { Tabs } from './Components/Tabs';
import { LocationModal } from './Components/LocationModal';
import { RequestModal } from './Components/RequestModal';
import { ServicePublishModal } from './Components/ServicePublishModal';
import { DEFAULT_LOCATION, servicesAtLocation } from './data/locations';
import { regionalServices } from './data/regionalServices';
import { authenticateDemo } from './data/demoAccounts';
import { createPublication, demoRequestsFor } from './data/marketplace';
import { SERVICES, CHATS0 } from './data/index';
import { accountStorageKey, freshAccount, loadAccount, saveAccount } from './Utils/accountStorage';
import { MARKETPLACE_STORAGE_KEY, loadMarketplace, saveMarketplace } from './Utils/marketplaceStorage';
import { Login, Signup, Home, ProviderHome, Saved, Detail, Chats, Chat, Account, PersonalData, Vehicles, Privacy, Help, Guest } from './Pages';
import './Styles/App.css';

const mergeEntries = (current, added) => {
  const ids = new Set(current.map(item => item.id));
  return [...current, ...added.filter(item => !ids.has(item.id))];
};
const newSession = role => ({ saved: [], chats: role === 'provider' ? [] : CHATS0 });

export default function App() {
  const [initial] = useState(loadAccount);
  const [initialMarket] = useState(loadMarketplace);
  const [account, setAccount] = useState(initial.account);
  const [storageError, setStorageError] = useState(initial.error);
  const [marketplace, setMarketplace] = useState(initialMarket.data);
  const [marketError, setMarketError] = useState(initialMarket.error);
  const [scr, setScr] = useState('login');
  const [authenticated, setAuthenticated] = useState(false);
  const [guestLocation, setGuestLocation] = useState(DEFAULT_LOCATION);
  const [prev, setPrev] = useState('home');
  const [sel, setSel] = useState(1);
  const [chatId, setChatId] = useState(1);
  const [sessions, setSessions] = useState(() => ({ client: newSession('client'), provider: newSession('provider') }));
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState('');
  const [scale, setScale] = useState(1);
  const [showLocation, setShowLocation] = useState(false);
  const [catalog, setCatalog] = useState(SERVICES);
  const [regionIds, setRegionIds] = useState(() => new Set(SERVICES.map(service => service.id)));
  const [requestCatalog, setRequestCatalog] = useState(() => demoRequestsFor(DEFAULT_LOCATION));
  const [requestRegionIds, setRequestRegionIds] = useState(() => new Set(demoRequestsFor(DEFAULT_LOCATION).map(request => request.id)));
  const [providerView, setProviderView] = useState('requests');
  const [providerVehicle, setProviderVehicle] = useState('carros');
  const [providerReset, setProviderReset] = useState(0);
  const { user, vehicles, role } = account;
  const provider = authenticated && role === 'provider';
  const { saved, chats } = sessions[role];
  const location = authenticated ? account.location : guestLocation;
  const preferences = authenticated ? account.preferences : { notifications: false, deviceLocation: true };
  const privateScreen = ['account', 'saved', 'chats', 'personal', 'vehicles', 'privacy'].includes(scr);

  function setSaved(value) {
    setSessions(current => ({ ...current, [role]: { ...current[role], saved: typeof value === 'function' ? value(current[role].saved) : value } }));
  }
  function setChats(value) {
    setSessions(current => ({ ...current, [role]: { ...current[role], chats: typeof value === 'function' ? value(current[role].chats) : value } }));
  }
  function registerLocation(value) {
    const generated = regionalServices(value), requests = demoRequestsFor(value);
    setCatalog(current => mergeEntries(current, generated));
    setRequestCatalog(current => mergeEntries(current, requests));
    setRegionIds(new Set(generated.map(service => service.id)));
    setRequestRegionIds(new Set(requests.map(request => request.id)));
  }
  function explore() {
    setAuthenticated(false); setGuestLocation(DEFAULT_LOCATION); registerLocation(DEFAULT_LOCATION);
    setModal(false); setShowLocation(false); setToast(''); setScr('home');
  }
  function activateAccount(next) {
    try {
      const validated = saveAccount(next);
      setAccount(validated); registerLocation(validated.location);
      setAuthenticated(true); setStorageError(''); setToast(''); setModal(false); setShowLocation(false);
      setProviderView('requests'); setProviderVehicle('carros'); setScr('home');
      return true;
    } catch { return false; }
  }
  function login(email, password) {
    const demo = authenticateDemo(email, password);
    if (!demo) return 'E-mail ou senha incorretos. Confira os acessos de demonstração.';
    const loaded = loadAccount(demo.role);
    if (loaded.error) return loaded.error;
    return activateAccount(loaded.account) ? '' : 'Não foi possível abrir a conta neste navegador. Verifique o armazenamento e tente novamente.';
  }
  function registerClient(value) {
    const loaded = loadAccount('client');
    return activateAccount({ ...loaded.account, user: value, role: 'client' });
  }
  function logout() {
    setAuthenticated(false); setModal(false); setShowLocation(false); setToast(''); setScr('login');
  }

  useEffect(() => {
    const resize = () => setScale(Math.min(innerWidth / 430, innerHeight / 932, 1.2));
    resize(); addEventListener('resize', resize);
    return () => removeEventListener('resize', resize);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 3000);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    const sync = event => {
      if (event.key !== MARKETPLACE_STORAGE_KEY) return;
      const loaded = loadMarketplace(); setMarketplace(loaded.data); setMarketError(loaded.error);
    };
    addEventListener('storage', sync);
    return () => removeEventListener('storage', sync);
  }, []);

  function updateAccount(next) {
    try {
      if (next.role !== role) throw Error('Perfil incompatível.');
      const validated = saveAccount(next);
      registerLocation(validated.location); setAccount(validated); setStorageError('');
      return true;
    } catch {
      setStorageError('Não foi possível salvar a conta neste navegador. Seus dados anteriores foram mantidos.');
      return false;
    }
  }
  function setUser(value) {
    return updateAccount({ ...account, user: typeof value === 'function' ? value(user) : value });
  }
  function setPreferences(value) {
    return updateAccount({ ...account, preferences: value, location: !value.deviceLocation && location.id === 'device' ? { ...DEFAULT_LOCATION } : location });
  }
  function applyLocation(value) {
    if (authenticated) { if (!updateAccount({ ...account, location: value })) return false; }
    else { setGuestLocation(value); registerLocation(value); }
    setShowLocation(false); return true;
  }
  function resetAccount() {
    try { localStorage.removeItem(accountStorageKey(role)); } catch { return false; }
    setAccount(freshAccount(role)); registerLocation(DEFAULT_LOCATION);
    setSessions(current => ({ ...current, [role]: newSession(role) }));
    setSel(1); setChatId(1); setShowLocation(false); setModal(false);
    setStorageError(''); setAuthenticated(false); setScr('login'); setToast('Os dados deste perfil foram apagados do navegador.');
    return true;
  }
  function publish(kind, draft) {
    if (!authenticated || (kind === 'offer' && role !== 'provider') || (kind === 'request' && role !== 'client')) return false;
    try {
      const entry = createPublication(kind, draft, account, location);
      // Leia o estado mais recente para preservar publicações feitas em outra aba.
      const current = loadMarketplace();
      if (current.error) throw Error(current.error);
      const key = kind === 'offer' ? 'offers' : 'requests';
      const next = saveMarketplace({ ...current.data, [key]: [entry, ...current.data[key]] });
      setMarketplace(next); setMarketError(''); setModal(false);
      if (kind === 'offer') { setProviderView('offers'); setProviderVehicle(entry.cat); setProviderReset(value => value + 1); }
      setToast(kind === 'offer' ? 'Serviço publicado! Ele já está disponível para os clientes da região.' : 'Pedido publicado! Ele já está disponível para os prestadores da região.');
      return true;
    } catch {
      setMarketError('Não foi possível salvar a publicação neste navegador. Os campos do formulário foram mantidos.');
      return false;
    }
  }

  const services = useMemo(() => servicesAtLocation([...marketplace.offers, ...catalog], location), [marketplace.offers, catalog, location]);
  const requests = useMemo(() => servicesAtLocation([...marketplace.requests, ...requestCatalog], location), [marketplace.requests, requestCatalog, location]);
  const entries = useMemo(() => [...services, ...requests], [services, requests]);
  const nearbyServices = useMemo(() => services.filter(service => (regionIds.has(service.id) || service.kind === 'offer') && service.distance <= location.radius), [services, location.radius, regionIds]);
  const nearbyRequests = useMemo(() => requests.filter(request => (requestRegionIds.has(request.id) || request.ownerId === 'client') && request.distance <= location.radius), [requests, requestRegionIds, location.radius]);
  const ownOffers = services.filter(service => service.kind === 'offer' && service.ownerId === 'provider');
  const svcOf = id => entries.find(service => service.id === id);
  const toggle = id => {
    if (!authenticated) { setScr('saved'); return; }
    setSaved(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  };
  const go = screen => { setToast(''); setPrev(scr); setScr(screen); };
  const backToAccount = () => setScr('account');
  const openLocation = () => setShowLocation(true);
  function openSvc(id) { setSel(id); setPrev(['saved', 'home'].includes(scr) ? scr : 'home'); setScr('detail'); }
  function openChat(id) { setChatId(id); setChats(current => current.map(chat => chat.id === id ? { ...chat, unread: 0 } : chat)); setScr('chat'); }
  function startChat(service) {
    if (!authenticated) { setScr('chats'); return; }
    let chat = chats.find(item => item.sid === service.id);
    if (!chat) {
      chat = { id: Date.now(), sid: service.id, by: service.by, ini: service.ini, svc: service.t, time: 'Agora', unread: 0, msgs: [] };
      setChats(current => [chat, ...current]);
    }
    setChatId(chat.id); setScr('chat'); setPrev('detail');
  }
  function send(id, text) {
    const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setChats(current => current.map(chat => chat.id === id ? { ...chat, time, msgs: [...chat.msgs, ['me', text, time]] } : chat));
  }
  const main = ['home', 'saved', 'chats', 'account'].includes(scr);
  const currentChat = chats.find(chat => chat.id === chatId);

  return <div className="app" style={{ transform: `translate(-50%,-50%) scale(${scale})` }}>
    {authenticated && (storageError || marketError) && <p className="storage-warning" role="alert">{storageError || marketError}</p>}
    {scr === 'login' && <Login go={go} login={login} explore={explore} />}
    {scr === 'signup' && <Signup go={go} setUser={registerClient} />}
    {scr === 'home' && (provider ? <ProviderHome requests={nearbyRequests} offers={ownOffers} saved={saved} toggle={toggle} open={openSvc} publish={() => setModal(true)} location={location} openLocation={openLocation} go={go} view={providerView} setView={setProviderView} vehicle={providerVehicle} setVehicle={setProviderVehicle} resetKey={providerReset} /> : <Home location={location} openLocation={openLocation} isGuest={!authenticated} services={nearbyServices} saved={authenticated ? saved : []} toggle={toggle} open={openSvc} setModal={value => { if (!authenticated && value) { setScr('account'); setToast('Entre ou crie uma conta para pedir um serviço.'); return; } setModal(value); }} go={go} />)}
    {!authenticated && privateScreen && <Guest section={scr} go={go} location={location} openLocation={openLocation} />}
    {authenticated && scr === 'saved' && <Saved services={entries} saved={saved} toggle={toggle} open={openSvc} />}
    {scr === 'detail' && <Detail s={svcOf(sel)} role={authenticated ? role : null} saved={authenticated && saved.includes(sel)} toggle={toggle} back={() => setScr(prev)} chat={startChat} />}
    {authenticated && scr === 'chats' && <Chats chats={chats} open={openChat} go={go} />}
    {authenticated && scr === 'chat' && currentChat && <Chat c={currentChat} svc={svcOf(currentChat.sid)} back={() => setScr('chats')} send={send} openSvc={openSvc} />}
    {authenticated && scr === 'account' && <Account user={user} role={role} vehicles={vehicles} preferences={preferences} setPreferences={setPreferences} location={location} openLocation={openLocation} go={go} logout={logout} />}
    {authenticated && scr === 'personal' && <PersonalData user={user} back={backToAccount} save={value => { if (!setUser(value)) return false; setScr('account'); setToast('Dados pessoais salvos.'); return true; }} />}
    {authenticated && scr === 'vehicles' && <Vehicles vehicles={vehicles} back={backToAccount} save={value => { if (!updateAccount({ ...account, vehicles: value })) return false; setToast('Lista de veículos atualizada.'); return true; }} />}
    {authenticated && scr === 'privacy' && <Privacy account={account} setPreferences={setPreferences} restore={updateAccount} reset={resetAccount} back={backToAccount} />}
    {scr === 'help' && <Help back={backToAccount} go={go} openLocation={openLocation} />}
    {main && <Tabs cur={scr} go={go} unread={authenticated && preferences.notifications && chats.some(chat => chat.unread)} />}
    {authenticated && modal && (provider ? <ServicePublishModal location={location} openLocation={openLocation} close={() => setModal(false)} publish={draft => publish('offer', draft)} /> : <RequestModal location={location} vehicles={vehicles} openLocation={openLocation} close={() => setModal(false)} publish={draft => publish('request', draft)} />)}
    {showLocation && <LocationModal location={location} deviceLocationAllowed={preferences.deviceLocation} close={() => setShowLocation(false)} apply={applyLocation} />}
    {toast && <div className="toast" role="status">{toast}</div>}
  </div>;
}
