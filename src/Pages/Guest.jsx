import { Icon } from '../Components/Icon';
import { PageHeader } from '../Components/PageHeader';
import '../Styles/Guest.css';

const TITLES = { account: 'Minha conta', saved: 'Salvos', chats: 'Conversas', personal: 'Dados pessoais', vehicles: 'Meus veículos', privacy: 'Privacidade e segurança', reputation: 'Minha reputação' };
const DESCRIPTIONS = {
  reputation: 'Entre como prestador para consultar sua reputação.',
  account: 'Entre ou crie sua conta para cadastrar seus dados e veículos.',
  saved: 'Entre ou crie sua conta para salvar seus serviços favoritos.',
  chats: 'Entre ou crie sua conta para conversar com os prestadores.',
  personal: 'Entre na sua conta para acessar seus dados pessoais.',
  vehicles: 'Entre na sua conta para cadastrar e consultar seus veículos.',
  privacy: 'Entre na sua conta para gerenciar suas permissões e seus dados salvos.',
};

export function Guest({ section, go, location, openLocation }) {
  const main = ['account', 'saved', 'chats'].includes(section);
  return <>
    {!main && <PageHeader title={TITLES[section]} back={() => go('account')} />}
    <div className="scroll guest-page">
      {main && <h1>{TITLES[section]}</h1>}
      <section className="guest-intro"><span className="guest-avatar"><Icon n="user" s={40} /></span><h2>Você está como visitante</h2><p>{DESCRIPTIONS[section]}</p></section>
      <div className="settings-actions"><button className="btn red" onClick={() => go('login')}>Entrar</button><button className="btn out" onClick={() => go('signup')}>Criar conta</button></div>
      {section === 'account' && <div className="card guest-links"><button onClick={openLocation}><Icon n="pin" /><span><b>Localização da busca</b><small>{location.name}{location.city ? `, ${location.city}` : ''}</small></span><Icon n="chev" s={18} /></button><button onClick={() => go('help')}><Icon n="help" /><span><b>Central de ajuda</b><small>Perguntas frequentes</small></span><Icon n="chev" s={18} /></button></div>}
      <button className="lnk guest-continue" onClick={() => go('home')}>Continuar explorando serviços</button>
    </div>
  </>;
}
