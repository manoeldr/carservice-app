import { useRef, useState } from 'react';
import { PageHeader } from '../Components/PageHeader';
import { downloadAccount, validateAccount } from '../Utils/accountStorage';
import { locationLabel } from '../data/locations';
import '../Styles/Privacy.css';

export function Privacy({ account, setPreferences, restore, reset, back }) {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef(null);
  async function readFile(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setError(''); setMessage(''); setPending(null); setConfirmReset(false);
    if (file.size > 1024 * 1024) return setError('Escolha um arquivo JSON de até 1 MB.');
    try { setPending(validateAccount(JSON.parse(await file.text()))); }
    catch (reason) { setError(reason instanceof SyntaxError ? 'Não foi possível ler o JSON. Escolha um backup exportado pelo Car Service.' : reason.message); }
  }
  function exportFile() {
    try { downloadAccount(account); setError(''); setMessage('Backup JSON preparado para download.'); }
    catch { setError('Não foi possível exportar os dados. Tente novamente.'); }
  }
  function importFile() {
    if (!restore(pending)) return setError('Não foi possível salvar o backup neste navegador.');
    setPending(null); setError(''); setMessage('Backup importado. Seus dados e sua localização foram atualizados.');
  }
  return <><PageHeader title="Privacidade e segurança" back={back} /><div className="scroll settings-content privacy-page">
    <section className="privacy-intro"><h2>Você controla seus dados</h2><p>Seu perfil, veículos, preferências e localização ficam somente neste navegador. Não são enviados a prestadores.</p><p>Este protótipo não tem autenticação real. Senhas não são armazenadas e sair da conta não apaga os dados salvos.</p></section>
    <h2 className="settings-section-title">Permissões</h2>
    <div className="card privacy-permission"><div><b>Localização do dispositivo</b><p>Permitir a opção “Usar minha localização”. O navegador também pedirá sua autorização.</p></div><button className="account-switch" role="switch" aria-label="Permitir localização do dispositivo" aria-checked={account.preferences.deviceLocation} onClick={() => { setError(''); if (!setPreferences({ ...account.preferences, deviceLocation: !account.preferences.deviceLocation })) setError('Não foi possível salvar a permissão.'); }}><span /></button></div>
    <h2 className="settings-section-title">Backup em JSON</h2>
    <p className="settings-note">O arquivo inclui nome, e-mail, celular, veículos, preferências e localização. Guarde-o em um local de sua confiança.</p>
    <div className="settings-actions"><button className="btn out" onClick={exportFile}>Exportar dados (.json)</button><button className="btn out" onClick={() => fileRef.current?.click()}>Importar backup (.json)</button><input ref={fileRef} className="privacy-file-input" type="file" accept=".json,application/json" aria-label="Selecionar backup JSON" onChange={readFile} /></div>
    {pending && <section className="card privacy-import" aria-label="Revisar backup"><h3>Revisar importação</h3><p><b>{pending.user.name}</b><br />{pending.user.email}<br />{pending.vehicles.length} veículo(s)<br />{locationLabel(pending.location)}</p><p>Ao confirmar, os dados atuais da conta serão substituídos.</p><div className="settings-actions"><button className="btn red" onClick={importFile}>Confirmar importação</button><button className="btn out" onClick={() => setPending(null)}>Cancelar importação</button></div></section>}
    {message && <p className="settings-success" role="status">{message}</p>}{error && <p className="settings-error" role="alert">{error}</p>}
    <h2 className="settings-section-title">Dados salvos</h2>
    <p className="settings-note">Você pode apagar os dados desta conta no navegador e voltar ao perfil de exemplo. Exporte um backup antes se quiser recuperá-los depois.</p>
    {confirmReset ? <div className="card privacy-reset"><h3>Apagar seus dados?</h3><p>Dados pessoais, veículos, preferências e localização serão removidos. Favoritos e conversas desta sessão também serão reiniciados.</p><div className="settings-actions"><button className="btn red" onClick={() => { if (!reset()) setError('Não foi possível apagar os dados neste navegador.'); }}>Confirmar exclusão dos dados</button><button className="btn out" onClick={() => setConfirmReset(false)}>Cancelar</button></div></div> : <button className="btn out privacy-delete" onClick={() => { setConfirmReset(true); setPending(null); }}>Apagar meus dados</button>}
  </div></>;
}
