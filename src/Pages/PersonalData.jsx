import { useState } from 'react';
import { PageHeader } from '../Components/PageHeader';
import { formatPhone, validEmail, validPhone } from '../Utils/accountStorage';
import '../Styles/PersonalData.css';

export function PersonalData({ user, save, back }) {
  const [draft, setDraft] = useState({ ...user, phone: user.phone || '' });
  const [error, setError] = useState('');
  const update = key => event => setDraft(current => ({ ...current, [key]: key === 'phone' ? formatPhone(event.target.value) : event.target.value }));
  function submit(event) {
    event.preventDefault();
    if (draft.name.trim().length < 2) return setError('Informe seu nome completo.');
    if (!validEmail(draft.email.trim())) return setError('Informe um e-mail válido.');
    if (!validPhone(draft.phone)) return setError('Informe um celular com DDD e 10 ou 11 dígitos.');
    const success = save({ name: draft.name.trim(), email: draft.email.trim().toLowerCase(), phone: draft.phone });
    if (!success) setError('Não foi possível salvar neste navegador. Seus campos foram mantidos; tente novamente.');
  }
  return <><PageHeader title="Dados pessoais" back={back} /><div className="scroll settings-content personal-page"><p className="sub">Mantenha seus dados de contato atualizados.</p>
    <form className="settings-form" onSubmit={submit} noValidate>
      <label htmlFor="profile-name">Nome completo</label><input className="settings-input" id="profile-name" autoComplete="name" maxLength={120} value={draft.name} onChange={update('name')} required />
      <label htmlFor="profile-email">E-mail</label><input className="settings-input" id="profile-email" type="email" autoComplete="email" maxLength={254} value={draft.email} onChange={update('email')} required />
      <label htmlFor="profile-phone">Celular</label><input className="settings-input" id="profile-phone" type="tel" autoComplete="tel" placeholder="(11) 99999-9999" value={draft.phone} onChange={update('phone')} required />
      {error && <p className="settings-error" role="alert">{error}</p>}
      <p className="settings-note">Seus dados ficam salvos neste navegador. Em Privacidade e segurança você pode baixar um backup em JSON.</p>
      <button className="btn red" type="submit">Salvar dados</button><button className="btn out" type="button" onClick={back}>Cancelar</button>
    </form>
  </div></>;
}
