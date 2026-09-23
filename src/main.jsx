import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search, Menu, X, ChevronRight, ArrowRight, Hammer, Bath, CookingPot, Sofa,
  Trees, Paintbrush, Heart, ExternalLink, ShieldCheck, Tag, Sparkles, Wrench,
  Lightbulb, Plug, Droplets, Mail, Info, FileText, Cookie, Calculator,
  ShoppingCart, Share2, CheckCircle2, MessageCircle, Instagram, Facebook,
  Ruler, Euro, Bot, Send
} from "lucide-react";
import "./styles.css";
import { products } from "./products";

const categories = [
  { id:"banos", name:"Baños", icon:Bath }, { id:"cocinas", name:"Cocinas", icon:CookingPot },
  { id:"herramientas", name:"Herramientas", icon:Hammer }, { id:"materiales", name:"Materiales", icon:Wrench },
  { id:"decoracion", name:"Decoración", icon:Sofa }, { id:"jardin", name:"Jardín", icon:Trees },
  { id:"pintura", name:"Pintura", icon:Paintbrush }, { id:"iluminacion", name:"Iluminación", icon:Lightbulb },
  { id:"electricidad", name:"Electricidad", icon:Plug }, { id:"fontaneria", name:"Fontanería", icon:Droplets }
];

const money = (v) => new Intl.NumberFormat("es-ES",{style:"currency",currency:"EUR"}).format(v);
const AFFILIATE_READY = (p) => p.affiliateUrl && !p.affiliateUrl.includes("TU_ENLACE_AWIN");
const CONTACT_EMAIL = "TU_EMAIL@EJEMPLO.COM";
const WHATSAPP = "341111111111"; // reemplaza por tu número, sin + ni espacios

function App(){
  const [query,setQuery]=useState("");
  const [activeCategory,setActiveCategory]=useState("todos");
  const [mobileMenu,setMobileMenu]=useState(false);
  const [favorites,setFavorites]=useState(()=>JSON.parse(localStorage.getItem("rl-favorites")||"[]"));
  const [cart,setCart]=useState(()=>JSON.parse(localStorage.getItem("rl-lista")||"[]"));
  const [budget,setBudget]=useState({room:"Baño",width:2,length:3,budget:2000});
  const [aiResult,setAiResult]=useState(null);
  const [lead,setLead]=useState({name:"",email:"",project:""});
  const [showList,setShowList]=useState(false);

  const filtered=useMemo(()=>{
    const q=query.toLowerCase().trim();
    return products.filter(p=>(activeCategory==="todos"||p.category===activeCategory) &&
      (!q||[p.name,p.store,p.category,p.description].some(v=>v.toLowerCase().includes(q))));
  },[query,activeCategory]);

  const cartProducts=products.filter(p=>cart.includes(p.id));

  function toggleFavorite(id){
    setFavorites(c=>{const n=c.includes(id)?c.filter(x=>x!==id):[...c,id];localStorage.setItem("rl-favorites",JSON.stringify(n));return n;});
  }
  function addToList(id){
    setCart(c=>{const n=c.includes(id)?c:c.concat(id);localStorage.setItem("rl-lista",JSON.stringify(n));return n;});
    setShowList(true);
  }
  function removeFromList(id){setCart(c=>{const n=c.filter(x=>x!==id);localStorage.setItem("rl-lista",JSON.stringify(n));return n;});}
  function scrollTo(id){document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setMobileMenu(false);}
  function scrollProducts(cat="todos"){setActiveCategory(cat);scrollTo("productos");}
  function affiliateClick(p){
    if(!AFFILIATE_READY(p)){alert("Este producto todavía no tiene su enlace de afiliado Awin. Cuando tengas la campaña aprobada, pega aquí el enlace generado por Awin Link Builder.");return;}
    window.open(p.affiliateUrl,"_blank","noopener,noreferrer");
  }
  function runAdvisor(){
    const area=Number(budget.width)*Number(budget.length);
    const type=budget.room.toLowerCase();
    const factor=type.includes("baño")?550:type.includes("cocina")?850:280;
    const estimate=Math.round(area*factor);
    const limit=Number(budget.budget);
    const fit=estimate<=limit;
    const cats=type.includes("baño")?["banos","fontaneria"]:type.includes("cocina")?["cocinas","fontaneria"]:["pintura","iluminacion","herramientas"];
    const picks=products.filter(p=>cats.includes(p.category)).slice(0,4);
    setAiResult({area,estimate,fit,picks});
  }
  function share(){
    const data={title:"RL Home & Reformas",text:"Ideas, productos y herramientas para reformar tu hogar.",url:location.href};
    if(navigator.share) navigator.share(data); else navigator.clipboard?.writeText(location.href).then(()=>alert("Enlace copiado."));
  }
  function submitLead(e){
    e.preventDefault();
    const subject=encodeURIComponent("Nuevo proyecto desde RL Home & Reformas");
    const body=encodeURIComponent(`Nombre: ${lead.name}\nEmail: ${lead.email}\nProyecto: ${lead.project}`);
    location.href=`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return <div className="app">
    <div className="topbar"><div className="container topbar-inner"><span>🤖 Asistente de reformas + selección de productos</span><span>Enlaces de afiliación identificados · Información orientativa</span></div></div>
    <header className="header"><div className="container header-inner">
      <button className="mobile-menu-btn" onClick={()=>setMobileMenu(!mobileMenu)} aria-label="Menú">{mobileMenu?<X/>:<Menu/>}</button>
      <a className="logo" href="#inicio"><span className="logo-mark">RL</span><span><strong>HOME</strong><small>& REFORMAS</small></span></a>
      <div className="search"><Search size={20}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Busca baño, taladro, pintura..." /><button onClick={()=>query&&setQuery("")}>{query&&<X size={17}/>}</button></div>
      <nav className={`nav ${mobileMenu?"nav-open":""}`}>
        <button onClick={()=>scrollTo("inicio")}>Inicio</button><button onClick={()=>scrollTo("asesor")}>Asesor IA</button>
        <button onClick={()=>scrollTo("categorias")}>Categorías</button><button onClick={()=>scrollTo("productos")}>Productos</button>
        <button onClick={()=>scrollTo("presupuesto")}>Presupuesto</button><button onClick={()=>scrollTo("contacto")}>Contacto</button>
      </nav>
      <button className="list-button" onClick={()=>setShowList(true)} aria-label="Mi lista"><ShoppingCart size={19}/><span>{cart.length}</span></button>
    </div></header>

    <main>
      <section className="hero" id="inicio"><div className="container hero-grid">
        <div className="hero-copy"><span className="eyebrow"><Sparkles size={15}/> TU PROYECTO, PASO A PASO</span>
          <h1>Reforma tu hogar.<br/><span>Decide mejor y compra.</span></h1>
          <p>Una herramienta 24/7 para calcular, comparar y encontrar productos para tu reforma. Guarda tu lista, recibe recomendaciones y accede a las tiendas colaboradoras.</p>
          <div className="hero-actions"><button className="btn btn-primary" onClick={()=>scrollTo("asesor")}><Bot size={17}/> Consultar al asesor</button><button className="btn btn-light" onClick={()=>scrollTo("productos")}>Ver productos <ArrowRight size={18}/></button></div>
          <div className="trust-row"><span><ShieldCheck size={17}/> Afiliación transparente</span><span><Calculator size={17}/> Calculador gratuito</span><span><Share2 size={17}/> Comparte tu proyecto</span></div>
        </div>
        <div className="hero-card"><div className="hero-card-content"><span>HERRAMIENTA 24/7</span><strong>Tu reforma empieza aquí</strong><p>Calcula una estimación, descubre productos y crea una lista de compra en minutos.</p><button onClick={()=>scrollTo("asesor")}>Empezar ahora <ChevronRight size={17}/></button></div></div>
      </div></section>

      <section className="advisor-section" id="asesor"><div className="container">
        <div className="section-heading"><div><span className="section-kicker">🤖 ASESOR RL HOME</span><h2>Planifica tu reforma en 60 segundos</h2></div><span className="live-pill">● Disponible 24/7</span></div>
        <div className="advisor-grid">
          <div className="advisor-card">
            <div className="ai-title"><Bot size={22}/><div><strong>Asistente de proyecto</strong><small>Estimación orientativa · no sustituye un presupuesto profesional</small></div></div>
            <label>¿Qué vas a reformar?<select value={budget.room} onChange={e=>setBudget({...budget,room:e.target.value})}><option>Baño</option><option>Cocina</option><option>Habitación</option><option>Salón</option></select></label>
            <div className="form-row"><label>Ancho (m)<input type="number" min="1" value={budget.width} onChange={e=>setBudget({...budget,width:e.target.value})}/></label><label>Largo (m)<input type="number" min="1" value={budget.length} onChange={e=>setBudget({...budget,length:e.target.value})}/></label></div>
            <label>Presupuesto máximo (€)<input type="number" min="100" value={budget.budget} onChange={e=>setBudget({...budget,budget:e.target.value})}/></label>
            <button className="btn btn-primary full" onClick={runAdvisor}><Bot size={17}/> Generar mi plan</button>
          </div>
          <div className="result-card">
            {!aiResult?<><div className="result-empty"><Calculator size={38}/><h3>Tu recomendación aparecerá aquí</h3><p>Completa los datos y genera una estimación con productos relacionados.</p></div></>:
              <><div className="result-top"><div><small>SUPERFICIE</small><strong>{aiResult.area.toFixed(1)} m²</strong></div><div><small>ESTIMACIÓN ORIENTATIVA</small><strong>{money(aiResult.estimate)}</strong></div></div>
                <div className={`budget-alert ${aiResult.fit?"ok":"warn"}`}>{aiResult.fit?<><CheckCircle2 size={18}/> El cálculo entra dentro de tu presupuesto indicado.</>:<><Info size={18}/> La estimación supera tu presupuesto. Compara opciones y ajusta acabados.</>}</div>
                <h3>Productos para empezar</h3><div className="mini-products">{aiResult.picks.map(p=><div key={p.id}><img src={p.image} alt=""/><div><strong>{p.name}</strong><small>{p.store}</small></div><button onClick={()=>addToList(p.id)}>+ Lista</button></div>)}</div>
                <button className="text-button" onClick={()=>scrollProducts(aiResult.picks[0]?.category||"todos")}>Ver selección completa <ArrowRight size={16}/></button>
              </>}
          </div>
        </div>
      </div></section>

      <section className="category-section" id="categorias"><div className="container"><div className="section-heading"><div><span className="section-kicker">DESCUBRE</span><h2>Compra por categoría</h2></div><button className="text-button" onClick={()=>scrollProducts()}>Ver todo <ArrowRight size={16}/></button></div>
        <div className="category-grid">{categories.map(({id,name,icon:Icon})=><button key={id} className="category-card" onClick={()=>scrollProducts(id)}><span className="category-icon"><Icon size={25}/></span><strong>{name}</strong><small>Ver selección <ChevronRight size={13}/></small></button>)}</div>
      </div></section>

      <section className="offers-section"><div className="container"><div className="offers-banner"><div><span className="section-kicker">💶 MONETIZACIÓN</span><h2>Encuentra, guarda y compra cuando quieras</h2><p>Los botones llevan a la tienda colaboradora. Si el enlace es de afiliado y realizas una compra, RL Home puede recibir una comisión sin coste adicional para ti.</p></div><button className="btn btn-primary" onClick={()=>setShowList(true)}><ShoppingCart size={17}/> Mi lista ({cart.length})</button></div></div></section>

      <section className="products-section" id="productos"><div className="container"><div className="section-heading"><div><span className="section-kicker">SELECCIÓN RL HOME</span><h2>{activeCategory==="todos"?"Productos destacados":categories.find(c=>c.id===activeCategory)?.name}</h2></div><span className="results-count">{filtered.length} opciones</span></div>
        <div className="filter-row"><button className={activeCategory==="todos"?"filter active":"filter"} onClick={()=>setActiveCategory("todos")}>Todos</button>{categories.map(c=><button key={c.id} className={activeCategory===c.id?"filter active":"filter"} onClick={()=>setActiveCategory(c.id)}>{c.name}</button>)}</div>
        <div className="product-grid">{filtered.map(p=><article className="product-card" key={p.id}><div className="product-image"><img src={p.image} alt={p.name} loading="lazy"/><span className="badge">{p.badge}</span><button className={`favorite ${favorites.includes(p.id)?"liked":""}`} onClick={()=>toggleFavorite(p.id)}><Heart size={18} fill={favorites.includes(p.id)?"currentColor":"none"}/></button></div><div className="product-body"><span className="store">{p.store}</span><h3>{p.name}</h3><p className="product-description">{p.description}</p><div className="price-row">{p.price?<><strong>{money(p.price)}</strong><del>{p.oldPrice?money(p.oldPrice):""}</del>{p.discount?<span>-{p.discount}%</span>:null}</>:<strong className="consult-price">Consultar precio</strong>}</div><div className="product-actions"><button className="buy-button" onClick={()=>affiliateClick(p)}>Ver tienda <ExternalLink size={15}/></button><button className="save-button" onClick={()=>addToList(p.id)}><ShoppingCart size={15}/> Guardar</button></div></div></article>)}</div>
      </div></section>

      <section className="budget-section" id="presupuesto"><div className="container budget-grid"><div><span className="section-kicker">CAPTACIÓN DE CLIENTES</span><h2>¿Tienes una reforma y quieres hablar con alguien?</h2><p>Deja tus datos y describe el proyecto. Puedes conectar este formulario a tu email, CRM o automatización cuando tengas el canal definitivo.</p><div className="lead-benefits"><span><CheckCircle2/> Respuesta sobre tu proyecto</span><span><CheckCircle2/> Posibilidad de derivar a profesionales</span><span><CheckCircle2/> Nuevo canal de ingresos por leads</span></div></div>
        <form className="lead-form" onSubmit={submitLead}><label>Nombre<input required value={lead.name} onChange={e=>setLead({...lead,name:e.target.value})}/></label><label>Email<input required type="email" value={lead.email} onChange={e=>setLead({...lead,email:e.target.value})}/></label><label>¿Qué necesitas reformar?<textarea required rows="4" value={lead.project} onChange={e=>setLead({...lead,project:e.target.value})} placeholder="Ej.: baño de 4 m², quiero cambiar ducha, azulejos y mueble."/></label><button className="btn btn-primary full"><Send size={16}/> Solicitar orientación</button><small>Configura tu email real antes de publicar este formulario.</small></form>
      </div></section>

      <section className="social-section"><div className="container social-box"><div><span className="section-kicker">TRÁFICO 24/7</span><h2>Comparte tu herramienta de reforma</h2><p>Publica el enlace en Instagram, Facebook, Pinterest, TikTok o WhatsApp y lleva tráfico a tu calculadora y selección de productos.</p></div><div className="social-actions"><button className="btn btn-primary" onClick={share}><Share2 size={17}/> Compartir web</button><a className="social-link" href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Mira esta herramienta para planificar reformas: "+location.href)}`} target="_blank" rel="noopener noreferrer"><MessageCircle/> WhatsApp</a><a className="social-link" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Frandy26.github.io%2Frl-home-reformas%2F" target="_blank" rel="noopener noreferrer"><Facebook/> Facebook</a></div></div></section>

      <section className="info-section" id="contacto"><div className="container info-grid"><div className="info-card"><Mail size={22}/><h3>Contacto</h3><p>Configura un email real para consultas, colaboraciones y solicitudes de presupuesto.</p></div><div className="info-card"><Tag size={22}/><h3>Afiliación</h3><p>Los enlaces de afiliado deben identificarse claramente. Las comisiones dependen del programa, la campaña y las compras que cumplan sus condiciones.</p></div><div className="info-card"><ShieldCheck size={22}/><h3>Datos y confianza</h3><p>No prometemos precios, stock ni comisiones. La información final corresponde a cada tienda y debe revisarse antes de comprar.</p></div></div></section>

      <section className="legal-section"><div className="container legal-grid"><article><FileText size={20}/><h3>Aviso legal</h3><p>Completa titular, domicilio y datos fiscales que correspondan antes de realizar actividad comercial.</p></article><article><ShieldCheck size={20}/><h3>Privacidad</h3><p>Adapta esta política a los formularios, analítica, publicidad y herramientas que realmente instales.</p></article><article><Cookie size={20}/><h3>Cookies</h3><p>Si incorporas analítica o publicidad con cookies no necesarias, implementa el consentimiento y actualiza la información.</p></article><article><Info size={20}/><h3>Importante</h3><p>Esta web es una plantilla comercial. Sustituye marcadores, enlaces Awin, email y WhatsApp antes de publicarla.</p></article></div></section>
    </main>

    <footer className="footer"><div className="container footer-grid"><div><a className="logo footer-logo" href="#inicio"><span className="logo-mark">RL</span><span><strong>HOME</strong><small>& REFORMAS</small></span></a><p>Herramientas, ideas y productos para planificar mejoras del hogar.</p></div><div><h4>Explora</h4><a href="#asesor">Asesor IA</a><a href="#productos">Productos</a><a href="#presupuesto">Presupuesto</a></div><div><h4>Categorías</h4><button onClick={()=>scrollProducts("banos")}>Baños</button><button onClick={()=>scrollProducts("cocinas")}>Cocinas</button><button onClick={()=>scrollProducts("herramientas")}>Herramientas</button></div><div><h4>Legal</h4><a href="#contacto">Contacto</a><a href="#inicio">Afiliación</a><a href="#inicio">Privacidad</a></div></div><div className="footer-bottom"><div className="container">© 2026 RL Home & Reformas · Información orientativa · Revisa siempre las condiciones de la tienda.</div></div></footer>

    {showList&&<div className="modal-backdrop" onClick={()=>setShowList(false)}><aside className="list-modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><div><span className="section-kicker">TU LISTA</span><h2>Productos guardados</h2></div><button onClick={()=>setShowList(false)}><X/></button></div>{cartProducts.length===0?<div className="result-empty"><ShoppingCart size={35}/><p>Aún no has guardado productos.</p></div>:<>{cartProducts.map(p=><div className="list-item" key={p.id}><img src={p.image} alt=""/><div><strong>{p.name}</strong><small>{p.store}</small></div><button onClick={()=>removeFromList(p.id)}><X size={15}/></button></div>)}<p className="list-note">La lista es una ayuda para organizar tu compra. Los enlaces de afiliado se abren en la tienda y el pago se realiza allí.</p><button className="btn btn-primary full" onClick={()=>{setShowList(false);scrollTo("productos")}}>Ver productos y comprar</button></>}</aside></div>}
  </div>
}
createRoot(document.getElementById("root")).render(<App/>);
