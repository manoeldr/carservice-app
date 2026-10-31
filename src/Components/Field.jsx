import { useState } from 'react';
import { Icon as Ic } from './Icon';
import '../Styles/Field.css';

export function PwField({ph,val,set}){const[s,setS]=useState(false);return(
<div className="field"><Ic n="lock"/><input type={s?'text':'password'} placeholder={ph} value={val} onChange={e=>set(e.target.value)}/><button onClick={()=>setS(!s)} aria-label={s ? "Ocultar senha" : "Mostrar senha"} aria-pressed={s}><Ic n={s?'eye':'eyeoff'}/></button></div>)}
export const Field=({icon,ph,val,set,type='text'})=><div className="field">{icon && <Ic n={icon}/>}<input type={type} placeholder={ph} value={val} onChange={e=>set(e.target.value)}/></div>;
