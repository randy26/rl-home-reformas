import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search, Menu, X, ChevronRight, ArrowRight,
  Hammer, Bath, CookingPot, Sofa, Trees, Paintbrush,
  Heart, ExternalLink, ShieldCheck, Tag, Sparkles, Wrench,
  Home, Lightbulb, Plug, Droplets, Mail, Info, FileText, Cookie
} from "lucide-react";
import "./styles.css";
import { products } from "./products";

const categories = [
  { id: "banos", name: "Baños", icon: Bath },
  { id: "cocinas", name: "Cocinas", icon: CookingPot },
  { id: "herramientas", name: "Herramientas", icon: Hammer },
  { id: "materiales", name: "Materiales", icon: Wrench },
  { id: "decoracion", name: "Decoración", icon: Sofa },
  { id: "jardin", name: "Jardín", icon: Trees },
  { id: "pintura", name: "Pintura", icon: Paintbrush },
  { id: "iluminacion", name: "Iluminación", icon: Lightbulb },
  { id: "electricidad", name: "Electricidad", icon: Plug },
  { id: "fontaneria", name: "Fontanería", icon: Droplets }
];

function money(value) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);
}

function App() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return products.filter((p) => {
      const categoryOk = activeCategory === "todos" || p.category === activeCategory;
      const queryOk = !q || [p.name, p.store, p.category, p.description].some((v) => v.toLowerCase().includes(q));
      return categoryOk && queryOk;
    });
  }, [query, activeCategory]);

  function toggleFavorite(id) {
    setFavorites((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  }

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  }

  function scrollToProducts(category = "todos") {
    setActiveCategory(category);
    scrollTo("productos");
  }

  return (
    <div className="app">
      <div className="topbar">
        <div className="container topbar-inner">
          <span>🚚 Ideas, productos y soluciones para mejorar tu hogar</span>
          <span>Información y enlaces a tiendas colaboradoras</span>
        </div>
      </div>

      <header className="header">
        <div className="container header-inner">
          <button className="mobile-menu-btn" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Abrir menú">
            {mobileMenu ? <X size={23} /> : <Menu size={23} />}
          </button>
          <a className="logo" href="#inicio" onClick={() => scrollTo("inicio")} aria-label="RL Home y Reformas">
            <span className="logo-mark">RL</span>
            <span><strong>HOME</strong><small>& REFORMAS</small></span>
          </a>
          <div className="search">
            <Search size={20} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar herramientas, baño, cocina..." aria-label="Buscar productos" />
            {query && <button onClick={() => setQuery("")} aria-label="Limpiar búsqueda"><X size={17} /></button>}
          </div>
          <nav className={`nav ${mobileMenu ? "nav-open" : ""}`}>
            <button onClick={() => scrollTo("inicio")}>Inicio</button>
            <button onClick={() => scrollTo("categorias")}>Categorías</button>
            <button onClick={() => scrollToProducts("herramientas")}>Herramientas</button>
            <button onClick={() => scrollToProducts("banos")}>Baños</button>
            <button onClick={() => scrollTo("ofertas")}>Ofertas</button>
            <button onClick={() => scrollTo("como-funciona")}>Cómo funciona</button>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow"><Sparkles size={15} /> INSPIRACIÓN PARA TU HOGAR</span>
              <h1>Reforma tu hogar.<br /><span>Encuentra ideas y productos.</span></h1>
              <p>RL Home & Reformas reúne ideas, guías y una selección de productos para baños, cocinas, herramientas, materiales y mejora del hogar. Comparamos opciones y te dirigimos a tiendas colaboradoras para consultar la información actual.</p>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => scrollToProducts("todos")}>Ver productos <ArrowRight size={18} /></button>
                <button className="btn btn-light" onClick={() => scrollTo("ofertas")}>Ofertas de hoy</button>
              </div>
              <div className="trust-row">
                <span><ShieldCheck size={17} /> Enlaces identificados</span>
                <span><Tag size={17} /> Selección editorial</span>
              </div>
            </div>
            <div className="hero-card">
              <div className="hero-card-content">
                <span>GUÍA DE REFORMA</span>
                <strong>Empieza por tu proyecto</strong>
                <p>Explora categorías y encuentra herramientas, materiales y soluciones para tu hogar.</p>
                <button onClick={() => scrollTo("categorias")}>Explorar categorías <ChevronRight size={17} /></button>
              </div>
            </div>
          </div>
        </section>

        <section className="category-section" id="categorias">
          <div className="container">
            <div className="section-heading">
              <div><span className="section-kicker">DESCUBRE</span><h2>Compra por categoría</h2></div>
              <button className="text-button" onClick={() => scrollToProducts("todos")}>Ver todo <ArrowRight size={16} /></button>
            </div>
            <div className="category-grid">
              {categories.map(({ id, name, icon: Icon }) => (
                <button key={id} className="category-card" onClick={() => scrollToProducts(id)}>
                  <span className="category-icon"><Icon size={25} /></span>
                  <strong>{name}</strong>
                  <small>Ver selección <ChevronRight size={13} /></small>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="offers-section" id="ofertas">
          <div className="container">
            <div className="offers-banner">
              <div>
                <span className="section-kicker">🔥 OFERTAS DE HOY</span>
                <h2>Selección para tu próxima reforma</h2>
                <p>Las condiciones, precios, disponibilidad y gastos de envío pueden cambiar. Consulta siempre la información final en la tienda antes de comprar.</p>
              </div>
              <button className="btn btn-primary" onClick={() => scrollToProducts("todos")}>Ver selección <ArrowRight size={18} /></button>
            </div>
          </div>
        </section>

        <section className="products-section" id="productos">
          <div className="container">
            <div className="section-heading">
              <div><span className="section-kicker">SELECCIÓN RL HOME</span><h2>{activeCategory === "todos" ? "Productos destacados" : categories.find(c => c.id === activeCategory)?.name}</h2></div>
              <span className="results-count">{filtered.length} opciones</span>
            </div>
            <div className="filter-row">
              <button className={activeCategory === "todos" ? "filter active" : "filter"} onClick={() => setActiveCategory("todos")}>Todos</button>
              {categories.map(c => <button key={c.id} className={activeCategory === c.id ? "filter active" : "filter"} onClick={() => setActiveCategory(c.id)}>{c.name}</button>)}
            </div>
            {filtered.length === 0 ? (
              <div className="empty"><Search size={35} /><h3>No encontramos productos</h3><p>Prueba con otra palabra o categoría.</p></div>
            ) : (
              <div className="product-grid">
                {filtered.map((product) => (
                  <article className="product-card" key={product.id}>
                    <div className="product-image">
                      <img src={product.image} alt={product.name} loading="lazy" />
                      <span className="badge">{product.badge}</span>
                      <button className={`favorite ${favorites.includes(product.id) ? "liked" : ""}`} onClick={() => toggleFavorite(product.id)} aria-label="Guardar producto"><Heart size={18} fill={favorites.includes(product.id) ? "currentColor" : "none"} /></button>
                    </div>
                    <div className="product-body">
                      <span className="store">{product.store}</span>
                      <h3>{product.name}</h3>
                      <p className="product-description">{product.description}</p>
                      <div className="price-row">
                        {product.price ? <><strong>{money(product.price)}</strong><del>{product.oldPrice ? money(product.oldPrice) : ""}</del>{product.discount ? <span>-{product.discount}%</span> : null}</> : <strong className="consult-price">Consultar precio</strong>}
                      </div>
                      <a className="buy-button" href={product.affiliateUrl || "#"} target="_blank" rel="nofollow sponsored noopener noreferrer" onClick={(e) => { if (!product.affiliateUrl || product.affiliateUrl.includes("TU_ENLACE_AWIN")) { e.preventDefault(); alert("Este producto todavía no tiene un enlace de afiliado Awin configurado."); } }}>
                        Ver producto <ExternalLink size={16} />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="about-section" id="sobre-nosotros">
          <div className="container about-grid">
            <div><span className="section-kicker">SOBRE RL HOME</span><h2>Una guía práctica para mejorar tu hogar</h2></div>
            <div><p>RL Home & Reformas es un proyecto editorial centrado en reformas, mantenimiento, decoración y mejora del hogar. Seleccionamos ideas y productos por categorías para que puedas investigar opciones antes de visitar la tienda.</p><p>Cuando un producto contiene un enlace de afiliado, podemos recibir una comisión si realizas una compra después de acceder desde nuestra web. Esto no supone un coste adicional para ti.</p></div>
          </div>
        </section>

        <section className="how-section" id="como-funciona">
          <div className="container">
            <div className="section-heading centered"><div><span className="section-kicker">CÓMO FUNCIONA</span><h2>Encuentra. Compara. Compra.</h2></div></div>
            <div className="steps">
              <div><span>01</span><h3>Busca</h3><p>Encuentra ideas y productos por categoría o usando el buscador.</p></div>
              <div><span>02</span><h3>Compara</h3><p>Revisa características, precio y condiciones directamente en la tienda.</p></div>
              <div><span>03</span><h3>Compra</h3><p>Si decides comprar, el enlace te lleva al sitio de la tienda colaboradora.</p></div>
            </div>
          </div>
        </section>

        <section className="info-section" id="contacto">
          <div className="container info-grid">
            <div className="info-card"><Mail size={22} /><h3>Contacto</h3><p>Para consultas, colaboraciones o incidencias relacionadas con RL Home & Reformas, utiliza el canal de contacto que se publique en la versión definitiva del sitio.</p><small>Antes de presentar la web como definitiva, sustituye este texto por un correo de contacto real.</small></div>
            <div className="info-card"><Info size={22} /><h3>Afiliación</h3><p>Algunos enlaces pueden ser enlaces de afiliado. Si realizas una compra después de acceder desde RL Home & Reformas, podemos recibir una comisión sin coste adicional para ti.</p></div>
            <div className="info-card"><ShieldCheck size={22} /><h3>Precios y disponibilidad</h3><p>Los precios, stock, promociones, gastos de envío y condiciones pertenecen a cada tienda y pueden cambiar. La información válida es la que aparece en la tienda al realizar la compra.</p></div>
          </div>
        </section>

        <section className="legal-section" id="legal">
          <div className="container legal-grid">
            <article id="aviso-legal"><FileText size={20} /><h3>Aviso legal</h3><p><strong>Titular:</strong> [COMPLETAR NOMBRE O EMPRESA]</p><p><strong>Domicilio:</strong> [COMPLETAR]</p><p><strong>Email:</strong> [COMPLETAR]</p><p><strong>Identificación fiscal:</strong> [COMPLETAR SI CORRESPONDE]</p><p>Completa estos datos antes de considerar esta sección definitiva y antes de realizar acciones comerciales en España.</p></article>
            <article id="privacidad"><ShieldCheck size={20} /><h3>Política de privacidad</h3><p>Esta web debe informar de forma clara qué datos personales recoge, para qué se utilizan, durante cuánto tiempo se conservan, la base jurídica aplicable y cómo ejercer los derechos de las personas usuarias.</p><p>La versión definitiva debe adaptarse a las herramientas realmente instaladas en la web.</p></article>
            <article id="cookies"><Cookie size={20} /><h3>Política de cookies</h3><p>Esta versión no incorpora deliberadamente un sistema propio de analítica o publicidad personalizada. Si se añaden cookies no necesarias, herramientas de analítica o publicidad, habrá que actualizar esta política y el mecanismo de consentimiento correspondiente.</p></article>
            <article id="afiliacion"><Tag size={20} /><h3>Enlaces de afiliación</h3><p>RL Home & Reformas puede participar en programas de afiliación. Algunos enlaces pueden generar una comisión para el sitio cuando una compra se realiza después de un clic, sin coste adicional para el comprador.</p></article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div><a className="logo footer-logo" href="#inicio" onClick={() => scrollTo("inicio")}><span className="logo-mark">RL</span><span><strong>HOME</strong><small>& REFORMAS</small></span></a><p>Ideas, productos y recursos para renovar y mejorar tu hogar.</p></div>
          <div><h4>Categorías</h4><button onClick={() => scrollToProducts("banos")}>Baños</button><button onClick={() => scrollToProducts("cocinas")}>Cocinas</button><button onClick={() => scrollToProducts("herramientas")}>Herramientas</button><button onClick={() => scrollToProducts("jardin")}>Jardín</button></div>
          <div><h4>RL Home</h4><a href="#sobre-nosotros">Sobre nosotros</a><a href="#ofertas">Ofertas</a><a href="#como-funciona">Cómo funciona</a><a href="#contacto">Contacto</a></div>
          <div><h4>Información</h4><a href="#aviso-legal"><FileText size={13} /> Aviso legal</a><a href="#privacidad"><ShieldCheck size={13} /> Privacidad</a><a href="#cookies"><Cookie size={13} /> Cookies</a><a href="#afiliacion"><Tag size={13} /> Afiliación</a></div>
        </div>
        <div className="footer-bottom"><div className="container">© 2026 RL Home & Reformas · Información orientativa · Las condiciones finales corresponden a cada tienda.</div></div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
