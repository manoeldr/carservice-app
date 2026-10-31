import { Icon } from './Icon';

export function PageHeader({ title, back }) {
  return <header className="bar settings-header"><button onClick={back} aria-label="Voltar para minha conta"><Icon n="back" /></button><h1>{title}</h1></header>;
}
