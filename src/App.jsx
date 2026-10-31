import { useEffect, useMemo, useState } from 'react';
import { Tabs } from './Components/Tabs';
import { LocationModal } from './Components/LocationModal';
import { RequestModal } from './Components/RequestModal';
import { DEFAULT_LOCATION, servicesAtLocation } from './data/locations';
import { regionalServices } from './data/regionalServices';
import { SERVICES, CHATS0 } from './data/index';
import { ACCOUNT_STORAGE_KEY, freshAccount, loadAccount, saveAccount } from './Utils/accountStorage';
import { Login, Signup, Home, Saved, Detail, Chats, Chat, Account, PersonalData, Vehicles, Privacy, Help, Guest } from './Pages';
import './Styles/App.css';

function initialCatalog(location) {
  const region = regionalServices(location);
  const ids = new Set(SERVICES.map(service => service.id));
  return [...SERVICES, ...region.filter(service => !ids.has(service.id))];
}

export default function App() {
  const [initial] = useState(loadAccount);
  const [account, setAccount] = useState(initial.account);
  const [storageError, setStorageError] = useState(initial.error);
  const [scr, setScr] = useState('login');
  const [authenticated, setAuthenticated] = useState(false);
  const [guestLocation, setGuestLocation] = useState(DEFAULT_LOCATION);
  const [prev, setPrev] = useState('home');
  const [sel, setSel] = useState(1);
  const [chatId, setChatId] = useState(1);
  const [saved, setSaved] = useState([]);
  const [chats, setChats] = useState(CHATS0);
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState('');
  const [scale, setScale] = useState(1);
  const [showLocation, setShowLocation] = useState(false);
  const [catalog, setCatalog] = useState(() => initialCatalog(DEFAULT_LOCATION));
  const [regionIds, setRegionIds] = useState(() => new Set(regionalServices(DEFAULT_LOCATION).map(service => service.id)));
  const { user, vehicles } = account;
  const location = authenticated ? account.location : guestLocation;
  const preferences = authenticated ? account.preferences : { notifications: false, deviceLocation: true };
  const privateScreen = ['account', 'saved', 'chats', 'personal', 'vehicles', 'privacy'].includes(scr);

  function registerLocation(value) {
    const generated = regionalServices(value);
    setCatalog(current => {
      const ids = new Set(current.map(service => service.id));
      return [...current, ...generated.filter(service => !ids.has(service.id))];
    });
    setRegionIds(new Set(generated.map(service => service.id)));
  }
  function explore() {
    setAuthenticated(false); setGuestLocation(DEFAULT_LOCATION); registerLocation(DEFAULT_LOCATION);
    setModal(false); setShowLocation(false); setToast(''); setScr('home');
  }
  function enterAccount(value) {
    const nextUser = typeof value === 'function' ? value(account.user) : value;
    if (!updateAccount({ ...account, user: nextUser })) return false;
    setAuthenticated(true); setToast('');
    return true;
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

  function updateAccount(next) {
    try {
      const validated = saveAccount(next);
      registerLocation(validated.location);
      setAccount(validated); setStorageError('');
      return true;
    } catch {
      setStorageError('Não foi possível salvar a conta neste navegador. Seus dados anteriores foram mantidos. Verifique se o armazenamento está permitido e tente novamente.');
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
    if (authenticated) {
      if (!updateAccount({ ...account, location: value })) return false;
    } else {
      setGuestLocation(value); registerLocation(value);
    }
    setShowLocation(false); return true;
  }
  function resetAccount() {
    try { localStorage.removeItem(ACCOUNT_STORAGE_KEY); }
    catch { return false; }
    const fresh = freshAccount();
    setAccount(fresh); setCatalog(SERVICES); setRegionIds(new Set(SERVICES.map(service => service.id)));
    setSaved([]); setChats(CHATS0); setSel(1); setChatId(1); setShowLocation(false); setModal(false);
    setStorageError(''); setAuthenticated(false); setScr('login'); setToast('Seus dados foram apagados deste navegador.');
    return true;
  }

  const services = useMemo(() => servicesAtLocation(catalog, location), [catalog, location]);
  const nearbyServices = useMemo(() => services.filter(service => regionIds.has(service.id) && service.distance <= location.radius), [services, location.radius, regionIds]);
  const svcOf = id => services.find(service => service.id === id);
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
    {authenticated && storageError && <p className="storage-warning" role="alert">{storageError}</p>}
    {scr === 'login' && <Login go={go} setUser={enterAccount} explore={explore} />}
    {scr === 'signup' && <Signup go={go} setUser={enterAccount} />}
    {scr === 'home' && <Home location={location} openLocation={openLocation} isGuest={!authenticated} services={nearbyServices} saved={authenticated ? saved : []} toggle={toggle} open={openSvc} setModal={value => { if (!authenticated && value) { setScr('account'); setToast('Entre ou crie uma conta para pedir um serviço.'); return; } setModal(value); }} go={go} />}
    {!authenticated && privateScreen && <Guest section={scr} go={go} location={location} openLocation={openLocation} />}
    {authenticated && scr === 'saved' && <Saved services={services} saved={saved} toggle={toggle} open={openSvc} />}
    {scr === 'detail' && <Detail s={svcOf(sel)} saved={authenticated && saved.includes(sel)} toggle={toggle} back={() => setScr(prev)} chat={startChat} />}
    {authenticated && scr === 'chats' && <Chats chats={chats} open={openChat} go={go} />}
    {authenticated && scr === 'chat' && currentChat && <Chat c={currentChat} svc={svcOf(currentChat.sid)} back={() => setScr('chats')} send={send} openSvc={openSvc} />}
    {authenticated && scr === 'account' && <Account user={user} vehicles={vehicles} preferences={preferences} setPreferences={setPreferences} location={location} openLocation={openLocation} go={go} logout={logout} />}
    {authenticated && scr === 'personal' && <PersonalData user={user} back={backToAccount} save={value => { if (!setUser(value)) return false; setScr('account'); setToast('Dados pessoais salvos.'); return true; }} />}
    {authenticated && scr === 'vehicles' && <Vehicles vehicles={vehicles} back={backToAccount} save={value => { if (!updateAccount({ ...account, vehicles: value })) return false; setToast('Lista de veículos atualizada.'); return true; }} />}
    {authenticated && scr === 'privacy' && <Privacy account={account} setPreferences={setPreferences} restore={updateAccount} reset={resetAccount} back={backToAccount} />}
    {scr === 'help' && <Help back={backToAccount} go={go} openLocation={openLocation} />}
    {main && <Tabs cur={scr} go={go} unread={authenticated && preferences.notifications && chats.some(chat => chat.unread)} />}
    {authenticated && modal && <RequestModal location={location} openLocation={openLocation} close={() => setModal(false)} publish={() => { setModal(false); setToast('Pedido publicado! Esta é uma demonstração, sem envio a prestadores.'); }} />}
    {showLocation && <LocationModal location={location} deviceLocationAllowed={preferences.deviceLocation} close={() => setShowLocation(false)} apply={applyLocation} />}
    {toast && <div className="toast" role="status">{toast}</div>}
  </div>;
}
