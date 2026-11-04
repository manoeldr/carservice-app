import { sortByPriority } from '../Utils/reputation';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '../Components/Icon';
import { ServiceCard } from '../Components/ServiceCard';
import { FilterModal } from '../Components/FilterModal';
import { locationLabel } from '../data/locations';
import { SERVICE_TYPES, filterServices } from '../data/index.js';
import '../Styles/Home.css';

const VEHICLE_TYPES = [['carros', 'car', 'Carros'], ['motos', 'bike', 'Motos'], ['outros', 'truck', 'Outros']];

export function Home({ services, saved, toggle, open, setModal, go, location, openLocation, isGuest }) {
  const [vehicle, setVehicle] = useState('carros');
  const [query, setQuery] = useState('');
  const [types, setTypes] = useState([]);
  const [order, setOrder] = useState('reputation');
  const [showFilters, setShowFilters] = useState(false);
  const listRef = useRef(null);
  const filtered = filterServices(services, { vehicle, query, types });
  const list = order === 'reputation' ? sortByPriority(filtered) : [...filtered].sort((a, b) => order === 'distance' ? a.km - b.km : a.p - b.p);
  const available = filterServices(services, { vehicle, query });

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [vehicle, query, types, location, order]);

  return <>
    <main className="home">
      <header className="home-header">
        <div className="row home-heading">
          <h1>Car Service</h1>
          <button className="home-settings" onClick={() => go('account')} aria-label="Ajustes"><Icon n="filter" /></button>
        </div>
        {isGuest && <div className="home-guest-note"><span>Explorando como visitante</span><button className="lnk" onClick={() => go('login')}>Entrar</button></div>}
        <div className="field home-search">
          <Icon n="search" s={24} />
          <input aria-label="Buscar serviços" placeholder="Qual serviço você procura?" value={query} onChange={event => setQuery(event.target.value)} />
        </div>
        <button className="row home-location" aria-label="Alterar localização" aria-haspopup="dialog" onClick={openLocation}>
          <span className="home-accent"><Icon n="pin" /></span>
          <b>{locationLabel(location)}</b><span className="home-muted">· {location.radius} km</span><Icon n="down" s={18} />
        </button>
        <div className="row home-vehicles" aria-label="Tipo de veículo">
          {VEHICLE_TYPES.map(([key, icon, label]) => <button key={key} className={'chip' + (vehicle === key ? ' on' : '')} aria-pressed={vehicle === key} onClick={() => setVehicle(key)}><Icon n={icon} />{label}</button>)}
        </div>
      </header>
      <section className="home-featured" aria-labelledby="featured-title">
        <div className="row home-featured-heading">
          <h2 id="featured-title">Serviços em destaque</h2>
          <button className="lnk row home-filter-button" aria-haspopup="dialog" aria-expanded={showFilters} onClick={() => setShowFilters(true)}>
            <Icon n="filter" s={20} />Filtrar{types.length > 0 && <span className="home-filter-count">{types.length}</span>}
          </button>
        </div>
        {types.length > 0 && <div className="home-active-filters">
          <p>{SERVICE_TYPES.filter(type => types.includes(type.id)).map(type => type.label).join(' · ')}</p>
          <button className="lnk" onClick={() => setTypes([])}>Limpar</button>
        </div>}
        <div className="home-order"><label htmlFor="service-order">Ordenar por</label><select id="service-order" value={order} onChange={event => setOrder(event.target.value)}><option value="reputation">Reputação</option><option value="distance">Menor distância</option><option value="price">Menor preço</option></select></div>
        <p className="home-demo-note">{order === 'reputation' ? 'Prioridade: avaliações (70%) + atividade (30%)' : 'Serviços de demonstração · prestadores fictícios'}</p>
        <div className="home-services" ref={listRef} tabIndex={0} aria-label="Lista de serviços em destaque">
          {list.length ? <div className="grid">{list.map(service => <ServiceCard key={service.id} s={service} saved={saved.includes(service.id)} toggle={toggle} open={open} />)}</div> : <div className="home-empty"><p>Nenhum serviço encontrado nesta região. Tente outra busca, ajuste os filtros ou aumente a distância.</p>{types.length > 0 && <button className="lnk" onClick={() => setTypes([])}>Limpar filtros</button>}<button className="lnk home-change-location" onClick={openLocation}>Alterar região ou distância</button></div>}
        </div>
      </section>
    </main>
    <button className="fab" onClick={() => setModal(true)}><Icon n="plus" />Pedir serviço</button>
    {showFilters && <FilterModal services={available} selected={types} close={() => setShowFilters(false)} apply={selection => { setTypes(selection); setShowFilters(false); }} />}
  </>;
}
