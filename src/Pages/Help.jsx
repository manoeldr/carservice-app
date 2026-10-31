import { useState } from 'react';
import { PageHeader } from '../Components/PageHeader';
import { Icon } from '../Components/Icon';
import { HELP_TOPICS } from '../data/account';
import '../Styles/Help.css';

export function Help({ back, go, openLocation }) {
  const [query, setQuery] = useState('');
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const topics = HELP_TOPICS.filter(topic => normalize(topic.question + ' ' + topic.answer).includes(normalize(query)));
  return <><PageHeader title="Central de ajuda" back={back} /><div className="scroll settings-content help-page"><h2>Como podemos ajudar?</h2><p className="sub">Encontre respostas sobre o Car Service.</p>
    <div className="field help-search"><Icon n="search" /><input aria-label="Buscar na ajuda" placeholder="Busque sua dúvida" value={query} onChange={event => setQuery(event.target.value)} /></div>
    <div className="help-topics">{topics.map(topic => <details className="help-topic" key={topic.question}><summary>{topic.question}<Icon n="down" s={18} /></summary><div className="help-answer"><p>{topic.answer}</p>{topic.action && <button className="lnk" onClick={() => topic.action === 'location' ? openLocation() : go(topic.action)}>{topic.actionLabel}</button>}</div></details>)}</div>
    {!topics.length && <p className="settings-note help-empty">Nenhuma resposta encontrada. Tente termos como “veículos”, “localização” ou “dados”.</p>}
    <section className="card help-about"><Icon n="info" s={24} /><div><h3>Sobre este app</h3><p>Protótipo acadêmico de Interface Homem-Computador da FSG. Serviços, mensagens e pedidos são simulações; não há atendimento humano ou contratação pelo app.</p></div></section>
  </div></>;
}
