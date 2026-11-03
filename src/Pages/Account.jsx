import { Icon } from '../Components/Icon';
import { locationLabel } from '../data/locations';
import '../Styles/Account.css';

function AccountRow({ icon, title, subtitle, onClick, children }) {
  const content = <><span className="account-row-icon"><Icon n={icon} s={24} /></span><span className="account-row-text"><b>{title}</b><small>{subtitle}</small></span>{children || <Icon n="chev" s={20} />}</>;
  return onClick ? <button className="item account-row" onClick={onClick}>{content}</button> : <div className="item account-row">{content}</div>;
}

export function Account({ user, role, vehicles, preferences, setPreferences, location, openLocation, go, logout }) {
  const initials = user.name.split(/\s+/).filter(Boolean).map(word => word[0]).slice(0, 2).join('').toUpperCase();
  const vehicleSummary = vehicles.length === 1 ? `${vehicles[0].brand} ${vehicles[0].model} · ${vehicles[0].year}` : vehicles.length ? `${vehicles.length} veículos cadastrados` : 'Cadastre seu primeiro veículo';
  return <div className="scroll account-page">
    <h1>Minha conta</h1>
    <div className="row account-profile"><div className="av account-avatar">{initials}</div><div className="account-profile-text"><b>{user.name}</b><p>{user.email}</p><span className="profile-badge account-role">{role === 'provider' ? 'Prestador' : 'Cliente'}</span></div><button className="account-edit" aria-label="Editar dados pessoais" onClick={() => go('personal')}><Icon n="edit" s={24} /></button></div>
    <h2 className="account-section-title">SUA CONTA</h2>
    <div className="card"><AccountRow icon="user" title="Dados pessoais" subtitle="Nome, e-mail e celular" onClick={() => go('personal')} /><AccountRow icon="car" title="Meus veículos" subtitle={vehicleSummary} onClick={() => go('vehicles')} /><AccountRow icon="pin" title="Localização" subtitle={locationLabel(location)} onClick={openLocation} /></div>
    <h2 className="account-section-title">CONFIGURAÇÕES E SUPORTE</h2>
    <div className="card"><AccountRow icon="bell" title="Notificações" subtitle={preferences.notifications ? 'Indicador de novas mensagens ativado' : 'Indicador de novas mensagens desativado'}><button className="account-switch" role="switch" aria-label="Notificações" aria-checked={preferences.notifications} onClick={() => setPreferences({ ...preferences, notifications: !preferences.notifications })}><span /></button></AccountRow><AccountRow icon="shield" title="Privacidade e segurança" subtitle="Permissões e dados salvos" onClick={() => go('privacy')} /><AccountRow icon="help" title="Central de ajuda" subtitle="Perguntas frequentes e orientações" onClick={() => go('help')} /></div>
    <button className="lnk row account-logout" onClick={logout}><Icon n="out" s={24} />Sair da conta</button>
    <p className="center account-version">Car Service · Versão 1.0.0</p>
    <div className="account-footer-links"><button onClick={() => go('help')}>Sobre o protótipo</button><span>·</span><button onClick={() => go('privacy')}>Privacidade</button></div>
  </div>;
}
