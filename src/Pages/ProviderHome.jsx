import { useEffect, useRef, useState } from 'react';
import { ReputationBadge } from '../Components/ReputationBadge';
import { Icon } from '../Components/Icon';
import { RequestCard } from '../Components/RequestCard';
import { ServiceCard } from '../Components/ServiceCard';
import { FilterModal } from '../Components/FilterModal';
import { SERVICE_TYPES, filterServices } from '../data/index';
import { VEHICLE_TYPES } from '../data/account';
import { locationLabel } from '../data/locations';
import '../Styles/Home.css';
import '../Styles/ProviderHome.css';

export function ProviderHome({ requests, offers, saved, toggle, open, publish, location, openLocation, go, view, setView, vehicle, setVehicle, resetKey, reputation }) {
  const [query, setQuery] = useState('');
  const [types, setTypes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const listRef = useRef(null);
  useEffect(() => { setQuery(''); setTypes([]); }, [resetKey]);
  const source = view === 'requests' ? requests : offers;
  const list = filterServices(source, { vehicle, query, types });
  const available = filterServices(source, { vehicle, query });
  useEffect(() => { if (listRef.current) listRef.current.scrollTop = 0; }, [vehicle, query, types, view, location]);
  return <>
    <main className="home provider-home">
      <header className="home-header">
        <div className="row home-heading"><h1>Car Service</h1><button className="home-settings" aria-label="Ajustes" onClick={() => go('account')}><Icon n="filter" /></button></div>
        <div className="provider-home-profile"><span className="profile-badge">Prestador</span><button onClick={() => go('reputation')} aria-label="Ver minha reputação"><ReputationBadge reputation={reputation} showScore /></button></div>
        <div className="provider-home-views" aria-label="Conteúdo do início"><button aria-pressed={view === 'requests'} className={view === 'requests' ? 'is-active' : ''} onClick={() => setView('requests')}>Pedidos de clientes</button><button aria-pressed={view === 'offers'} className={view === 'offers' ? 'is-active' : ''} onClick={() => setView('offers')}>Meus serviços<span>{offers.length}</span></button></div>
        <div className="field home-search"><Icon n="search" s={22} /><input aria-label={view === 'requests' ? 'Buscar pedidos' : 'Buscar meus serviços'} placeholder={view === 'requests' ? 'Qual pedido você procura?' : 'Buscar nos serviços publicados'} value={query} onChange={event => setQuery(event.target.value)} /></div>
        <button className="row home-location" aria-label="Alterar localização" aria-haspopup="dialog" onClick={openLocation}><span className="home-accent"><Icon n="pin" /></span><b>{locationLabel(location)}</b><span className="home-muted">· {location.radius} km</span><Icon n="down" s={18} /></button>
        <div className="row home-vehicles" aria-label="Tipo de veículo">{VEHICLE_TYPES.map(type => <button className={'chip' + (vehicle === type.id ? ' on' : '')} key={type.id} aria-pressed={vehicle === type.id} onClick={() => setVehicle(type.id)}><Icon n={type.id === 'motos' ? 'bike' : type.id === 'outros' ? 'truck' : 'car'} />{type.id === 'carros' ? 'Carros' : type.id === 'motos' ? 'Motos' : 'Outros'}</button>)}</div>
      </header>
      <section className="home-featured" aria-labelledby="provider-section-title">
        <div className="row home-featured-heading"><h2 id="provider-section-title">{view === 'requests' ? 'Pedidos na região' : 'Serviços publicados'}</h2><button className="lnk row home-filter-button" aria-haspopup="dialog" aria-expanded={showFilters} onClick={() => setShowFilters(true)}><Icon n="filter" s={20} />Filtrar{types.length > 0 && <span className="home-filter-count">{types.length}</span>}</button></div>
        {types.length > 0 && <div className="home-active-filters"><p>{SERVICE_TYPES.filter(type => types.includes(type.id)).map(type => type.label).join(' · ')}</p><button className="lnk" onClick={() => setTypes([])}>Limpar</button></div>}
        <p className="home-demo-note">{view === 'requests' ? 'Pedidos locais e exemplos para demonstração' : 'Suas ofertas ficam visíveis para o perfil cliente'}</p>
        <div className="home-services" ref={listRef} tabIndex={0} aria-label={view === 'requests' ? 'Lista de pedidos de clientes' : 'Lista dos meus serviços'}>
          {list.length ? <div className={view === 'requests' ? 'provider-request-list' : 'grid'}>{list.map(item => view === 'requests' ? <RequestCard key={item.id} s={item} saved={saved.includes(item.id)} toggle={toggle} open={open} /> : <ServiceCard key={item.id} s={item} saved={saved.includes(item.id)} toggle={toggle} open={open} />)}</div> : <div className="home-empty"><h3>{view === 'requests' ? 'Nenhum pedido encontrado' : 'Nenhum serviço encontrado'}</h3><p>{view === 'requests' ? 'Tente outra busca, ajuste os filtros ou altere a região.' : 'Publique seus serviços ou ajuste a busca e o tipo de veículo.'}</p>{types.length > 0 && <button className="lnk" onClick={() => setTypes([])}>Limpar filtros</button>}{view === 'offers' && <button className="lnk home-change-location" onClick={publish}>{offers.length ? 'Publicar outro serviço' : 'Publicar meu primeiro serviço'}</button>}</div>}
        </div>
      </section>
    </main>
    <button className="fab" onClick={publish}><Icon n="plus" />Publicar serviço</button>
    {showFilters && <FilterModal services={available} selected={types} close={() => setShowFilters(false)} apply={value => { setTypes(value); setShowFilters(false); }} />}
  </>;
}
