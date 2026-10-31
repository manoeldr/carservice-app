import { useState } from 'react';
import { Icon as Ic } from '../Components/Icon';
import { Field } from '../Components/Field';
import { PwField } from '../Components/Field';
import '../Styles/Signup.css';

export function Signup({go,setUser}){
const[f,setF]=useState({n:'',e:'',c:'',p:''}),[ok,setOk]=useState(true),[err,setErr]=useState('');
const s=k=>v=>setF(o=>({...o,[k]:v}));
const mask=v=>{const d=v.replace(/\D/g,'').slice(0,11);return d.length>6?`(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`:d.length>2?`(${d.slice(0,2)}) ${d.slice(2)}`:d};
const send=()=>{if(!f.n.trim())return setErr('Informe seu nome.');if(!/\S+@\S+\.\S+/.test(f.e))return setErr('Digite um e-mail válido.');if(f.p.length<8||!/\d/.test(f.p)||!/[a-zA-Z]/.test(f.p))return setErr('A senha precisa de 8 caracteres, com letras e números.');if(!ok)return setErr('Aceite os termos para continuar.');if(!setUser({name:f.n.trim(),email:f.e,phone:f.c}))return setErr('Não foi possível salvar a conta neste navegador. Tente novamente.');go('home')};
return(<><div className="bar"><button onClick={()=>go('login')} aria-label="Voltar"><Ic n="back"/></button><b  className="signup-style-10">Criar conta</b><Ic n="help"/></div>
<div className="scroll"><div  className="signup-style-9"/>
<h1>Seu próximo cuidado começa aqui.</h1><p className="sub">Salve serviços e converse com profissionais da sua região.</p>
<label>Nome completo</label><Field icon="user" ph="Como você se chama?" val={f.n} set={s('n')}/>
<label>E-mail</label><Field icon="mail" ph="seuemail@exemplo.com" val={f.e} set={s('e')} type="email"/>
<label>Celular</label><Field icon="chat" ph="(11) 99999-9999" val={f.c} set={v=>s('c')(mask(v))}/>
<label>Senha</label><PwField ph="Crie uma senha" val={f.p} set={s('p')}/>
<p className="sub signup-style-8" >Use pelo menos 8 caracteres, letras e números.</p>
<div className="row signup-style-7" >
<button onClick={()=>setOk(!ok)} role="checkbox" aria-checked={ok} aria-label="Aceitar termos"  className="signup-style-6">{ok&&<Ic n="check" s={20}/>}</button>
<p className="sub signup-style-5" >Li e aceito os <b  className="signup-style-4">Termos de uso</b> e a <b  className="signup-style-3">Política de privacidade</b> do Car Service.</p></div>
{err&&<p  className="signup-style-2">{err}</p>}
<button className="btn red" onClick={send}><Ic n="arrow"/>Criar minha conta</button>
<p className="center signup-style-1" >Já tem uma conta? <button className="lnk" onClick={()=>go('login')}>Entrar</button></p></div></>)}
