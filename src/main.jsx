import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search, Menu, X, ChevronRight, ArrowRight, Hammer, Bath, CookingPot, Sofa, Trees, Paintbrush,
  Heart, ExternalLink, ShieldCheck, Tag, Sparkles, Wrench, Lightbulb, Plug, Droplets, Mail, Info,
  FileText, Cookie, Ruler, Euro, BookOpen, CheckCircle2
} from "lucide-react";
import "./styles.css";
import { products } from "./products";

const categories = [
  { id: "banos", name: "Baños", icon: Bath }, { id: "cocinas", name: "Cocinas", icon: CookingPot },
  { id: "herramientas", name: "Herramientas", icon: Hammer }, { id: "materiales", name: "Materiales", icon: Wrench },
  { id: "decoracion", name: "Decoración", icon: Sofa }, { id: "jardin", name: "Jardín", icon: Trees },
  { id: "pintura", name: "Pintura", icon: Paintbrush }, { id: "iluminacion", name: "Iluminación", icon: Lightbulb },
  { id: "electricidad", name: "Electricidad", icon: Plug }, { id: "fontaneria", name: "Fontanería", icon: Droplets }
];

const guides = [
  { id: "bano", cat: "Baño", title: "Cómo planificar una reforma de baño", text: "Qué medir, qué materiales necesitas y en qué orden conviene organizar el proyecto.", items: ["Medir el espacio y comprobar instalaciones", "Definir ducha, mueble, grifería y almacenaje", "Preparar revestimientos, selladores y herramientas", "Comparar productos antes de comprar"] },
  { id: "cocina", cat: "Cocina", title: "Guía para renovar una cocina sin complicaciones", text: "Una ruta práctica para organizar muebles, fregadero, iluminación, almacenamiento y pequeños cambios.", items: ["Tomar medidas de paredes y puntos de agua", "Definir zonas de trabajo y almacenamiento", "Revisar iluminación y enchufes", "Separar materiales de obra de elementos decorativos"] },
  { id: "pintura", cat: "Pintura", title: "Qué necesitas para pintar una habitación", text: "Lista de preparación, protección, herramientas y consumibles para evitar compras innecesarias.", items: ["Proteger suelo, muebles y rodapiés", "Preparar paredes y reparar pequeñas imperfecciones", "Elegir rodillo, brocha y bandeja adecuados", "Calcular la cantidad de pintura según superficie"] },
  { id: "bricolaje", cat: "Bricolaje", title: "Herramientas básicas para empezar en casa", text: "Una selección orientativa de herramientas para montaje, mantenimiento y pequeños proyectos.", items: ["Taladro/atornillador", "Juego de brocas y puntas", "Cinta métrica, nivel y lápiz", "Destornilladores, alicates y llaves"] },
  { id: "jardin", cat: "Jardín", title: "Cómo preparar una terraza para disfrutarla más", text: "Ideas para combinar mobiliario, iluminación, orden y mantenimiento del espacio exterior.", items: ["Medir la zona útil", "Priorizar almacenamiento y circulación", "Elegir iluminación para exterior", "Añadir mobiliario según el uso real"] },
  { id: "ahorro", cat: "Presupuesto", title: "Cómo organizar el presupuesto de una reforma", text: "Método sencillo para separar materiales, herramientas, mano de obra y margen para imprevistos.", items: ["Dividir el proyecto por estancias", "Separar materiales y herramientas", "Comparar alternativas de producto", "Reservar un margen para imprevistos"] }
];

function money(value) { return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value); }

function App() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [openGuide, setOpenGuide] = useState(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return products.filter(p => {
      const categoryOk = activeCategory === "todos" || p.category === activeCategory;
      const queryOk = !q || [p.name, p.store, p.category, p.description].some(v => String(v).toLowerCase().includes(q));
      return categoryOk && queryOk;
    });
  }, [query, activeCategory]);

  function toggleFavorite(id) { setFavorites(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]); }
  function scrollTo(id) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileMenu(false); }
  function scrollToProducts(category = "todos") { setActiveCategory(category); scrollTo("productos"); }

  return <div className="app">
    <div className="topbar"><div className="container topbar-inner"><span>🏠 Ideas prácticas para reformas y mejora del hogar</span><span>Contenido editorial independiente · Enlaces identificados</span></div></div>

    <header className="header"><div className="container header-inner">
      <button className="mobile-menu-btn" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Abrir menú">{mobileMenu ? <X size={23}/> : <Menu size={23}/>}</button>
      <a className="logo" href="#inicio" onClick={() => scrollTo("inicio")}><span className="logo-mark">RL</span><span><strong>HOME</strong><small>& REFORMAS</small></span></a>
      <div className="search"><Search size={20}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar baño, cocina, herramientas..." aria-label="Buscar"/>{query && <button onClick={() => setQuery("")} aria-label="Limpiar"><X size={17}/></button>}</div>
      <nav className={`nav ${mobileMenu ? "nav-open" : ""}`}>
        <button onClick={() => scrollTo("inicio")}>Inicio</button><button onClick={() => scrollTo("guias")}>Guías</button><button onClick={() => scrollTo("proyectos")}>Proyectos</button><button onClick={() => scrollTo("categorias")}>Categorías</button><button onClick={() => scrollTo("productos")}>Productos</button><button onClick={() => scrollTo("sobre-nosotros")}>Sobre RL Home</button>
      </nav>
    </div></header>

    <main>
      <section className="hero" id="inicio"><div className="container hero-grid"><div className="hero-copy">
        <span className="eyebrow"><Sparkles size={15}/> GUÍAS · REFORMAS · BRICOLAJE · HOGAR</span>
        <h1>Planifica mejor.<br/><span>Reforma con criterio.</span></h1>
        <p>RL Home & Reformas es una guía práctica para quienes quieren mejorar su hogar. Explicamos proyectos, materiales y herramientas, y después mostramos productos que pueden servir para llevar cada idea a la práctica.</p>
        <div className="hero-actions"><button className="btn btn-primary" onClick={() => scrollTo("guias")}>Explorar guías <ArrowRight size={18}/></button><button className="btn btn-light" onClick={() => scrollTo("productos")}>Ver productos</button></div>
        <div className="trust-row"><span><BookOpen size={17}/> Contenido práctico</span><span><ShieldCheck size={17}/> Enlaces de afiliación identificados</span><span><CheckCircle2 size={17}/> Información orientativa</span></div>
      </div><div className="hero-card"><div className="hero-card-content"><span>PLAN DE PROYECTO</span><strong>De la idea a la lista de compra</strong><p>Empieza con una guía, define lo que necesitas y consulta productos por categoría.</p><button onClick={() => scrollTo("proyectos")}>Ver proyectos <ChevronRight size={17}/></button></div></div></div></section>

      <section className="category-section" id="proyectos"><div className="container"><div className="section-heading"><div><span className="section-kicker">PROYECTOS</span><h2>¿Qué quieres mejorar?</h2></div></div><div className="project-grid">
        {guides.slice(0,4).map(g => <button className="project-card" key={g.id} onClick={() => { setOpenGuide(g.id); scrollTo("guias"); }}><span>{g.cat}</span><strong>{g.title}</strong><small>Ver guía <ChevronRight size={13}/></small></button>)}
      </div></div></section>

      <section className="guides-section" id="guias"><div className="container"><div className="section-heading"><div><span className="section-kicker">CONTENIDO EDITORIAL</span><h2>Guías para reformar y mantener tu hogar</h2></div><span className="results-count">6 guías prácticas</span></div>
        <div className="guide-grid">{guides.map(g => <article className="guide-card" key={g.id}><span className="guide-cat">{g.cat}</span><h3>{g.title}</h3><p>{g.text}</p><button className="text-button" onClick={() => setOpenGuide(openGuide === g.id ? null : g.id)}>{openGuide === g.id ? "Cerrar guía" : "Leer guía"} <ArrowRight size={15}/></button>{openGuide === g.id && <div className="guide-detail"><h4>Pasos recomendados</h4><ul>{g.items.map(item => <li key={item}><CheckCircle2 size={15}/>{item}</li>)}</ul><button className="btn btn-primary btn-small" onClick={() => scrollToProducts("todos")}>Consultar productos relacionados <ArrowRight size={15}/></button></div>}</article>)}</div>
      </div></section>

      <section className="category-section" id="categorias"><div className="container"><div className="section-heading"><div><span className="section-kicker">DESCUBRE</span><h2>Explora por categoría</h2></div><button className="text-button" onClick={() => scrollToProducts("todos")}>Ver todo <ArrowRight size={16}/></button></div><div className="category-grid">{categories.map(({id,name,icon:Icon}) => <button key={id} className="category-card" onClick={() => scrollToProducts(id)}><span className="category-icon"><Icon size={25}/></span><strong>{name}</strong><small>Ver selección <ChevronRight size={13}/></small></button>)}</div></div></section>

      <section className="offers-section" id="ofertas"><div className="container"><div className="offers-banner"><div><span className="section-kicker">SELECCIÓN Y PROMOCIONES</span><h2>Ideas y productos para tu próximo proyecto</h2><p>Cuando una tienda colaboradora ofrece una promoción general, sus condiciones pueden cambiar. Comprueba siempre precio, disponibilidad, gastos de envío y condiciones en la tienda antes de comprar.</p></div><button className="btn btn-primary" onClick={() => scrollToProducts("todos")}>Consultar selección <ArrowRight size={18}/></button></div></div></section>

      <section className="products-section" id="productos"><div className="container"><div className="section-heading"><div><span className="section-kicker">PRODUCTOS RELACIONADOS</span><h2>{activeCategory === "todos" ? "Selección orientativa" : categories.find(c => c.id === activeCategory)?.name}</h2></div><span className="results-count">{filtered.length} opciones</span></div><p className="section-note">Estos productos son ejemplos de la estructura editorial. Los precios, disponibilidad y enlaces comerciales se completarán con información vigente de las tiendas colaboradoras.</p><div className="filter-row"><button className={activeCategory === "todos" ? "filter active" : "filter"} onClick={() => setActiveCategory("todos")}>Todos</button>{categories.map(c => <button key={c.id} className={activeCategory === c.id ? "filter active" : "filter"} onClick={() => setActiveCategory(c.id)}>{c.name}</button>)}</div>{filtered.length === 0 ? <div className="empty"><Search size={35}/><h3>No encontramos productos</h3><p>Prueba otra palabra o categoría.</p></div> : <div className="product-grid">{filtered.map(product => <article className="product-card" key={product.id}><div className="product-image"><img src={product.image} alt={product.name} loading="lazy"/><span className="badge">{product.badge}</span><button className={`favorite ${favorites.includes(product.id) ? "liked" : ""}`} onClick={() => toggleFavorite(product.id)} aria-label="Guardar producto"><Heart size={18} fill={favorites.includes(product.id) ? "currentColor" : "none"}/></button></div><div className="product-body"><span className="store">{product.store}</span><h3>{product.name}</h3><p className="product-description">{product.description}</p><div className="price-row"><strong className="consult-price">Consultar precio</strong></div><a className="buy-button" href={product.affiliateUrl || "#"} target="_blank" rel="nofollow sponsored noopener noreferrer" onClick={e => { if (!product.affiliateUrl || product.affiliateUrl.includes("TU_ENLACE_AWIN")) { e.preventDefault(); alert("Este producto todavía no tiene un enlace comercial configurado."); } }}>Ver información <ExternalLink size={16}/></a></div></article>)}</div>}</div></section>

      <section className="about-section" id="sobre-nosotros"><div className="container about-grid"><div><span className="section-kicker">SOBRE RL HOME</span><h2>Contenido antes que catálogo</h2></div><div><p>RL Home & Reformas es un proyecto editorial independiente sobre reformas, mantenimiento, bricolaje, decoración y mejora del hogar. El objetivo es explicar cada proyecto de forma sencilla y contextualizar las herramientas, materiales y productos que pueden intervenir en él.</p><p>Algunos enlaces pueden ser enlaces de afiliación. Si una compra se realiza después de acceder desde RL Home & Reformas, el sitio podría recibir una comisión, sin coste adicional para la persona compradora. La existencia de una comisión no cambia el precio fijado por la tienda.</p><p><strong>RL Home no es Leroy Merlin ni representa oficialmente a Leroy Merlin.</strong> Cuando se utilicen enlaces de una tienda colaboradora, se identificará claramente el destino.</p></div></div></section>

      <section className="how-section" id="como-funciona"><div className="container"><div className="section-heading centered"><div><span className="section-kicker">CÓMO FUNCIONA</span><h2>Investiga. Compara. Decide.</h2></div></div><div className="steps"><div><span>01</span><h3>Entiende el proyecto</h3><p>Lee una guía y define medidas, materiales, herramientas y prioridades.</p></div><div><span>02</span><h3>Consulta alternativas</h3><p>Utiliza las categorías y fichas para localizar productos relacionados con cada proyecto.</p></div><div><span>03</span><h3>Comprueba la tienda</h3><p>Antes de comprar, revisa la ficha, precio, disponibilidad y condiciones en la tienda de destino.</p></div></div></div></section>

      <section className="info-section" id="contacto"><div className="container info-grid"><div className="info-card"><Mail size={22}/><h3>Contacto editorial</h3><p>Para consultas, colaboraciones o propuestas relacionadas con el contenido de RL Home & Reformas.</p><small>Antes de publicar la versión definitiva, sustituye este bloque por un correo real.</small></div><div className="info-card"><Info size={22}/><h3>Afiliación transparente</h3><p>Los enlaces de afiliación se identifican y no implican un coste adicional para quien compra.</p></div><div className="info-card"><Ruler size={22}/><h3>Información de producto</h3><p>Los datos comerciales pueden cambiar. La información vigente será siempre la mostrada por la tienda de destino.</p></div></div></section>

      <section className="legal-section" id="legal"><div className="container legal-grid"><article id="aviso-legal"><FileText size={20}/><h3>Aviso legal</h3><p><strong>Titular:</strong> [COMPLETAR]</p><p><strong>Domicilio:</strong> [COMPLETAR]</p><p><strong>Email:</strong> [COMPLETAR]</p><p><strong>Identificación fiscal:</strong> [COMPLETAR SI CORRESPONDE]</p><p>Estos datos deben completarse antes de presentar el sitio como versión definitiva.</p></article><article id="privacidad"><ShieldCheck size={20}/><h3>Privacidad</h3><p>La política definitiva debe indicar qué datos personales se recogen, finalidad, base jurídica, conservación y derechos de las personas usuarias, adaptándose a las herramientas realmente instaladas.</p></article><article id="cookies"><Cookie size={20}/><h3>Cookies</h3><p>La política de cookies debe reflejar las herramientas realmente utilizadas. Si se incorporan analítica, publicidad o tecnologías no necesarias, deberá actualizarse y aplicarse el consentimiento que corresponda.</p></article><article id="afiliacion"><Tag size={20}/><h3>Enlaces de afiliación</h3><p>Algunos enlaces pueden generar una comisión para RL Home & Reformas cuando se realiza una compra tras un clic. Esto no incrementa el precio fijado por la tienda.</p></article></div></section>
    </main>

    <footer className="footer"><div className="container footer-grid"><div><a className="logo footer-logo" href="#inicio" onClick={() => scrollTo("inicio")}><span className="logo-mark">RL</span><span><strong>HOME</strong><small>& REFORMAS</small></span></a><p>Guías, proyectos y recursos para renovar y mejorar tu hogar.</p></div><div><h4>Contenido</h4><a href="#guias">Guías</a><a href="#proyectos">Proyectos</a><a href="#categorias">Categorías</a><a href="#productos">Productos</a></div><div><h4>RL Home</h4><a href="#sobre-nosotros">Sobre nosotros</a><a href="#como-funciona">Cómo funciona</a><a href="#contacto">Contacto</a></div><div><h4>Información</h4><a href="#aviso-legal"><FileText size={13}/> Aviso legal</a><a href="#privacidad"><ShieldCheck size={13}/> Privacidad</a><a href="#cookies"><Cookie size={13}/> Cookies</a><a href="#afiliacion"><Tag size={13}/> Afiliación</a></div></div><div className="footer-bottom"><div className="container">© 2026 RL Home & Reformas · Proyecto editorial independiente · Las condiciones comerciales corresponden a cada tienda.</div></div></footer>
  </div>;
}

createRoot(document.getElementById("root")).render(<App/>);
