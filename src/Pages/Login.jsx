import { useState } from 'react';
import { Icon } from '../Components/Icon';
import { Field, PwField } from '../Components/Field';
import { DEMO_ACCOUNTS } from '../data/demoAccounts';
import '../Styles/Login.css';

export function Login({ go, login, explore }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  function enter(event) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError('Digite um e-mail válido.');
    if (!password) return setError('Digite sua senha.');
    setError(login(email, password) || '');
  }
  return <div className="scroll login-style-12">
    <div className="login-style-11"><div className="login-style-10"><svg width="130" height="52" viewBox="0 0 130 52"><path d="M10 28c8-10 20-16 40-16 14 0 24 4 34 8l28 6" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" /><path d="M16 30h60l10 8h-16" fill="none" stroke="#DC2B2F" strokeWidth="6" strokeLinecap="round" /></svg><div className="login-style-9">CAR <span className="login-style-8">SERVICE</span></div></div><div className="login-style-7">SEU VEÍCULO. EM BOAS MÃOS.</div></div>
    <div className="login-style-6"><h1>Bom ter você por aqui.</h1><p className="sub">Entre como cliente ou prestador para continuar.</p>
      <form noValidate onSubmit={enter}>
        <label htmlFor="login-email">E-mail</label><Field id="login-email" icon="mail" type="email" autoComplete="username" ph="seuemail@exemplo.com" val={email} set={setEmail} />
        <label htmlFor="login-password">Senha</label><PwField id="login-password" autoComplete="current-password" ph="Digite sua senha" val={password} set={setPassword} />
        {error && <p className="login-style-5" role="alert">{error}</p>}
        <button className="btn red login-submit" type="submit"><Icon n="arrow" />Entrar</button>
      </form>
      <details className="login-demo"><summary>Acessos de demonstração</summary>{DEMO_ACCOUNTS.map(account => <p key={account.role}><b>{account.label}</b><span>{account.email}</span><span>Senha: {account.password}</span></p>)}</details>
      <p className="center login-style-2">ou encontre serviços sem entrar</p><button className="btn out" onClick={explore}>Explorar serviços</button>
      <p className="center login-style-1">Novo por aqui? <button className="lnk" onClick={() => go('signup')}>Crie sua conta</button></p>
    </div>
  </div>;
}
