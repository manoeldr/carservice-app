import { ServiceCard as Card } from '../Components/ServiceCard';
import '../Styles/Saved.css';

export function Saved({services,saved,toggle,open}){const l=services.filter(s=>saved.includes(s.id));
return(<div className="scroll"><h1  className="saved-style-2">Salvos</h1>{l.length?<div className="grid">{l.map(s=><Card key={s.id} s={s} saved toggle={toggle} open={open}/>)}</div>:<p className="sub saved-style-1" >Você ainda não salvou nenhum serviço. Toque no coração para guardar os que mais gostar.</p>}</div>)}
