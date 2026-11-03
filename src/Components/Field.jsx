import { useState } from 'react';
import { Icon as Ic } from './Icon';
import '../Styles/Field.css';

export function PwField({ph,val,set,id,autoComplete}){const[s,setS]=useState(false);return(
<div className="field"><Ic n="lock"/><input id={id} autoComplete={autoComplete} type={s?'text':'password'} placeholder={ph} value={val} onChange={e=>set(e.target.value)}/><button type="button" onClick={()=>setS(!s)} aria-label={s ? "Ocultar senha" : "Mostrar senha"} aria-pressed={s}><Ic n={s?'eye':'eyeoff'}/></button></div>)}
export const Field=({icon,ph,val,set,type='text',id,autoComplete})=><div className="field">{icon && <Ic n={icon}/>}<input id={id} autoComplete={autoComplete} type={type} placeholder={ph} value={val} onChange={e=>set(e.target.value)}/></div>;
