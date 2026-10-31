import { useState } from 'react';
import { Icon as Ic } from '../Components/Icon';
import { Field } from '../Components/Field';
import { PwField } from '../Components/Field';
import '../Styles/Login.css';

export function Login({go,setUser,explore}){
const[e,setE]=useState(''),[p,setP]=useState(''),[err,setErr]=useState('');
const enter=()=>{if(!/\S+@\S+\.\S+/.test(e))return setErr('Digite um e-mail válido.');if(p.length<1)return setErr('Digite sua senha.');setErr('');if(!setUser(u=>({...u,email:e})))return setErr('Não foi possível salvar a conta neste navegador. Tente novamente.');go('home')};
return(<div className="scroll login-style-12" >
<div  className="login-style-11">
<div  className="login-style-10"><svg width="130" height="52" viewBox="0 0 130 52"><path d="M10 28c8-10 20-16 40-16 14 0 24 4 34 8l28 6" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"/><path d="M16 30h60l10 8h-16" fill="none" stroke="#DC2B2F" strokeWidth="6" strokeLinecap="round"/></svg>
<div  className="login-style-9">CAR <span  className="login-style-8">SERVICE</span></div></div>
<div  className="login-style-7">SEU VEÍCULO. EM BOAS MÃOS.</div></div>
<div  className="login-style-6">
<h1>Bom ter você por aqui.</h1><p className="sub">Encontre o serviço certo para o seu veículo, perto de você.</p>
<label>E-mail</label><Field icon="mail" ph="seuemail@exemplo.com" val={e} set={setE} type="email"/>
<label>Senha</label><PwField ph="Digite sua senha" val={p} set={setP}/>
{err&&<p  className="login-style-5">{err}</p>}
<div  className="login-style-4"><button className="lnk login-style-3" >Esqueci minha senha</button></div>
<button className="btn red" onClick={enter}><Ic n="arrow"/>Entrar</button>
<p className="center login-style-2" >ou encontre serviços sem entrar</p>
<button className="btn out" onClick={explore}>Explorar serviços</button>
<p className="center login-style-1" >Novo por aqui? <button className="lnk" onClick={()=>go('signup')}>Crie sua conta</button></p>
</div></div>)}
