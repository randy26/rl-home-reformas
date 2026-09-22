import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search, ShoppingBag, Menu, X, ChevronRight, ArrowRight,
  Hammer, Bath, CookingPot, Sofa, Trees, Paintbrush,
  Heart, ExternalLink, ShieldCheck, Truck, Tag, Sparkles
} from "lucide-react";
import "./styles.css";

const categories = [
  { id: "banos", name: "Baños", icon: Bath },
  { id: "cocinas", name: "Cocinas", icon: CookingPot },
  { id: "herramientas", name: "Herramientas", icon: Hammer },
  { id: "decoracion", name: "Decoración", icon: Sofa },
  { id: "jardin", name: "Jardín", icon: Trees },
  { id: "pintura", name: "Pintura", icon: Paintbrush }
];

const products = [
  {
    id: 1,
    name: "Mueble de baño suspendido",
    category: "banos",
    store: "Leroy Merlin",
    price: 199.99,
    oldPrice: 249.99,
    discount: 20,
    badge: "Oferta",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=900&q=80",
    affiliateUrl: "https://www.awin1.com/cread.php?s=TU_ENLACE_AWIN&awinmid=TU_ID"
  },
  {
    id: 2,
    name: "Grifo monomando de cocina",
    category: "cocinas",
    store: "Leroy Merlin",
    price: 59.99,
    oldPrice: 79.99,
    discount: 25,
    badge: "Oferta",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
    affiliateUrl: "https://www.awin1.com/cread.php?s=TU_ENLACE_AWIN&awinmid=TU_ID"
  },
  {
    id: 3,
    name: "Taladro inalámbrico 18V",
    category: "herramientas",
    store: "Brico Depôt",
    price: 89.90,
    oldPrice: 109.90,
    discount: 18,
    badge: "Top ventas",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80",
    affiliateUrl: "https://www.awin1.com/cread.php?s=TU_ENLACE_AWIN&awinmid=TU_ID"
  },
  {
    id: 4,
    name: "Lámpara colgante moderna",
    category: "decoracion",
    store: "Aosom",
    price: 44.95,
    oldPrice: 59.95,
    discount: 25,
    badge: "Oferta",
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=900&q=80",
    affiliateUrl: "https://www.awin1.com/cread.php?s=TU_ENLACE_AWIN&awinmid=TU_ID"
  },
  {
    id: 5,
    name: "Set de muebles para jardín",
    category: "jardin",
    store: "VidaXL",
    price: 329.99,
    oldPrice: 399.99,
    discount: 17,
    badge: "Oferta",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
    affiliateUrl: "https://www.awin1.com/cread.php?s=TU_ENLACE_AWIN&awinmid=TU_ID"
  },
  {
    id: 6,
    name: "Pintura interior lavable",
    category: "pintura",
    store: "BAUHAUS",
    price: 34.90,
    oldPrice: 42.90,
    discount: 19,
    badge: "Oferta",
    image: "https://images.unsplash.com/photo-1562259949-e8e7684d7828?auto=format&fit=crop&w=900&q=80",
    affiliateUrl: "https://www.awin1.com/cread.php?s=TU_ENLACE_AWIN&awinmid=TU_ID"
  },
  {
    id: 7,
    name: "Espejo redondo para baño",
    category: "banos",
    store: "Aosom",
    price: 49.99,
    oldPrice: 64.99,
    discount: 23,
    badge: "Oferta",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
    affiliateUrl: "https://www.awin1.com/cread.php?s=TU_ENLACE_AWIN&awinmid=TU_ID"
  },
  {
    id: 8,
    name: "Organizador modular de herramientas",
    category: "herramientas",
    store: "Brico Depôt",
    price: 39.90,
    oldPrice: 49.90,
    discount: 20,
    badge: "Top ventas",
    image: "https://images.unsplash.com/photo-1581147036324-c17ac41f4b55?auto=format&fit=crop&w=900&q=80",
    affiliateUrl: "https://www.awin1.com/cread.php?s=TU_ENLACE_AWIN&awinmid=TU_ID"
  }
];

function money(value) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR"
  }).format(value);
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
      const queryOk =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.store.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return categoryOk && queryOk;
    });
  }, [query, activeCategory]);

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
    );
  }

  function scrollToProducts(category = "todos") {
    setActiveCategory(category);
    document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  }

  return (
    <div className="app">
      <div className="topbar">
        <div className="container topbar-inner">
          <span>🚚 Ideas y productos para tu hogar</span>
          <span>Compra directamente en tiendas colaboradoras</span>
        </div>
      </div>

      <header className="header">
        <div className="container header-inner">
          <button className="mobile-menu-btn" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Menú">
            {mobileMenu ? <X size={23} /> : <Menu size={23} />}
          </button>

          <a className="logo" href="#" onClick={() => scrollToProducts("todos")}>
            <span className="logo-mark">RL</span>
            <span>
              <strong>HOME</strong>
              <small>& REFORMAS</small>
            </span>
          </a>

          <div className="search">
            <Search size={20} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="¿Qué estás buscando?"
              aria-label="Buscar productos"
            />
            {query && <button onClick={() => setQuery("")}><X size={17} /></button>}
          </div>

          <nav className={`nav ${mobileMenu ? "nav-open" : ""}`}>
            <button onClick={() => scrollToProducts("todos")}>Inicio</button>
            <button onClick={() => scrollToProducts("banos")}>Baños</button>
            <button onClick={() => scrollToProducts("cocinas")}>Cocinas</button>
            <button onClick={() => scrollToProducts("herramientas")}>Herramientas</button>
            <button onClick={() => scrollToProducts("jardin")}>Jardín</button>
            <button onClick={() => scrollToProducts("todos")}>Ofertas</button>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow"><Sparkles size={15} /> INSPIRACIÓN PARA TU HOGAR</span>
              <h1>Reforma tu hogar.<br /><span>Encuentra todo en un solo lugar.</span></h1>
              <p>
                Descubre productos, herramientas y soluciones para baños, cocinas,
                jardín y reformas. Comparamos opciones de tiendas colaboradoras para ayudarte a encontrar lo que buscas.
              </p>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => scrollToProducts("todos")}>
                  Ver productos <ArrowRight size={18} />
                </button>
                <button className="btn btn-light" onClick={() => scrollToProducts("todos")}>
                  Ver ofertas
                </button>
              </div>
              <div className="trust-row">
                <span><ShieldCheck size={17} /> Enlaces seguros</span>
                <span><Tag size={17} /> Ofertas seleccionadas</span>
              </div>
            </div>
            <div className="hero-card">
              <div className="hero-card-content">
                <span>OFERTAS DE LA SEMANA</span>
                <strong>Renueva tu baño</strong>
                <p>Ideas y productos seleccionados para empezar tu proyecto.</p>
                <button onClick={() => scrollToProducts("banos")}>Explorar baño <ChevronRight size={17} /></button>
              </div>
            </div>
          </div>
        </section>

        <section className="category-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-kicker">DESCUBRE</span>
                <h2>Compra por categoría</h2>
              </div>
              <button className="text-button" onClick={() => scrollToProducts("todos")}>Ver todo <ArrowRight size={16} /></button>
            </div>
            <div className="category-grid">
              {categories.map(({ id, name, icon: Icon }) => (
                <button key={id} className="category-card" onClick={() => scrollToProducts(id)}>
                  <span className="category-icon"><Icon size={25} /></span>
                  <strong>{name}</strong>
                  <small>Ver productos <ChevronRight size={13} /></small>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="products-section" id="productos">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-kicker">SELECCIÓN RL HOME</span>
                <h2>{activeCategory === "todos" ? "Productos destacados" : categories.find(c => c.id === activeCategory)?.name}</h2>
              </div>
              <span className="results-count">{filtered.length} productos</span>
            </div>

            <div className="filter-row">
              <button className={activeCategory === "todos" ? "filter active" : "filter"} onClick={() => setActiveCategory("todos")}>Todos</button>
              {categories.map(c => (
                <button key={c.id} className={activeCategory === c.id ? "filter active" : "filter"} onClick={() => setActiveCategory(c.id)}>
                  {c.name}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="empty">
                <Search size={35} />
                <h3>No encontramos productos</h3>
                <p>Prueba con otra palabra o categoría.</p>
              </div>
            ) : (
              <div className="product-grid">
                {filtered.map((product) => (
                  <article className="product-card" key={product.id}>
                    <div className="product-image">
                      <img src={product.image} alt={product.name} loading="lazy" />
                      <span className="badge">{product.badge}</span>
                      <button className={`favorite ${favorites.includes(product.id) ? "liked" : ""}`} onClick={() => toggleFavorite(product.id)} aria-label="Favorito">
                        <Heart size={18} fill={favorites.includes(product.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <div className="product-body">
                      <span className="store">{product.store}</span>
                      <h3>{product.name}</h3>
                      <div className="price-row">
                        <strong>{money(product.price)}</strong>
                        <del>{money(product.oldPrice)}</del>
                        <span>-{product.discount}%</span>
                      </div>
                      <a
                        className="buy-button"
                        href={product.affiliateUrl}
                        target="_blank"
                        rel="nofollow sponsored noopener noreferrer"
                      >
                        Ver producto <ExternalLink size={16} />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="how-section">
          <div className="container">
            <div className="section-heading centered">
              <div>
                <span className="section-kicker">CÓMO FUNCIONA</span>
                <h2>Encuentra. Compara. Compra.</h2>
              </div>
            </div>
            <div className="steps">
              <div><span>01</span><h3>Busca</h3><p>Encuentra productos por categoría o utilizando el buscador.</p></div>
              <div><span>02</span><h3>Descubre</h3><p>Consulta las opciones y ofertas seleccionadas por RL Home.</p></div>
              <div><span>03</span><h3>Compra</h3><p>Te dirigimos a la tienda colaboradora para completar la compra.</p></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <a className="logo footer-logo" href="#">
              <span className="logo-mark">RL</span>
              <span><strong>HOME</strong><small>& REFORMAS</small></span>
            </a>
            <p>Productos e inspiración para renovar tu hogar.</p>
          </div>
          <div>
            <h4>Comprar</h4>
            <button onClick={() => scrollToProducts("banos")}>Baños</button>
            <button onClick={() => scrollToProducts("cocinas")}>Cocinas</button>
            <button onClick={() => scrollToProducts("herramientas")}>Herramientas</button>
            <button onClick={() => scrollToProducts("jardin")}>Jardín</button>
          </div>
          <div>
            <h4>RL Home</h4>
            <a href="#productos">Productos</a>
            <a href="#productos">Ofertas</a>
            <a href="#como-funciona">Cómo funciona</a>
          </div>
          <div>
            <h4>Información</h4>
            <p className="small">RL Home & Reformas puede recibir una comisión cuando compras a través de determinados enlaces de afiliado.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">© 2026 RL Home & Reformas · Todos los derechos reservados</div>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
