import React, { useState } from "react";

// Adicionar a fonte Roboto via CSS
const style = document.createElement('style');
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap');
`;
document.head.appendChild(style);

// MAIN CONTENT:
const mainContentStyle: React.CSSProperties = {
  marginLeft: 240,
  padding: "30px 20px 20px 20px",
  transition: "margin-left 0.3s",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "100vh",
  fontFamily: "'Roboto', sans-serif",
};

const navbarStyle: React.CSSProperties = {
  background: "#333",
  padding: "1rem",
  borderRadius: "0 0 10px 10px",
  alignSelf: "stretch",
  fontFamily: "'Roboto', sans-serif",
};

const navbarUlStyle: React.CSSProperties = {
  listStyle: "none",
  display: "flex",
  gap: "2rem",
  margin: 0,
  padding: 0,
  justifyContent: "center",
};

const navbarAStyle: React.CSSProperties = {
  color: "#fff",
  textDecoration: "none",
  cursor: "pointer",
  fontFamily: "'Roboto', sans-serif",
  fontWeight: "500",
};

const titleStyle: React.CSSProperties = {
  fontSize: 28,
  color: "#fff",
  fontWeight: "700",
  marginBottom: 20,
  textAlign: "center" as "center",
  marginTop: 30,
  fontFamily: "'Roboto', sans-serif",
};

const cardsListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column" as "column",
  gap: 15,
  marginTop: 20,
  maxWidth: 400,
  width: "100%",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "#1e1e1e",
  padding: 20,
  borderRadius: 10,
  width: "100%",
  boxSizing: "border-box",
  fontFamily: "'Roboto', sans-serif",
};

const cardTextStyle: React.CSSProperties = {
  color: "#fff",
  fontSize: 18,
  fontFamily: "'Roboto', sans-serif",
  fontWeight: "400",
};

const repoLinkStyle: React.CSSProperties = {
  color: "#93c5fd",
  textDecoration: "underline",
  display: "inline-block",
  wordBreak: "break-all" as "break-all",
  marginTop: 12,
  fontFamily: "'Roboto', sans-serif",
  fontWeight: "400",
};

// Estilos da Sidebar atualizados
const sidebarStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: 220,
  zIndex: 1000,
  backgroundColor: '#1a1a1a',
  paddingTop: 60,
  paddingLeft: 10,
  paddingRight: 10,
  transition: "0.3s",
  fontFamily: "'Roboto', sans-serif",
};

const sidebarClosedStyle: React.CSSProperties = {
  ...sidebarStyle,
  width: 0,
  overflow: 'hidden',
  paddingTop: 0,
  paddingLeft: 0,
  paddingRight: 0,
};

const sidebarLinkStyle: React.CSSProperties = {
  padding: 15,
  marginTop: 5,
  marginBottom: 5,
  borderRadius: 8,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: '#fff',
  fontSize: 18,
  textAlign: 'center' as 'center',
  fontWeight: '600',
  textDecoration: 'none',
  display: 'block',
  cursor: 'pointer',
  transition: '0.3s',
  fontFamily: "'Roboto', sans-serif",
};

const sidebarLinkHoverStyle: React.CSSProperties = {
  ...sidebarLinkStyle,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
};

const toggleBtnStyle: React.CSSProperties = {
  position: 'absolute',
  left: 10,
  top: 10,
  backgroundColor: '#222',
  padding: '6px 10px',
  borderRadius: 6,
  border: 'none',
  color: '#fff',
  fontSize: 16,
  cursor: 'pointer',
  zIndex: 1001,
  fontFamily: "'Roboto', sans-serif",
  fontWeight: "500",
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 999,
};

function Navbar({
  onNavigate,
  current,
}: {
  onNavigate: (page: string) => void;
  current: string;
}) {
  return (
    <nav style={navbarStyle}>
      <ul style={navbarUlStyle}>
        <li>
          <a
            style={navbarAStyle}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("about");
            }}
          >
            Sobre/Contato
          </a>
        </li>
      </ul>
    </nav>
  );
}

function Sidebar({
  onNavigate,
  closed,
  toggle,
}: {
  onNavigate: (page: string) => void;
  closed: boolean;
  toggle: () => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  const sidebarItems = [
    { id: "home", label: "Início" },
    { id: "favorites", label: "Favoritos" },
    { id: "about", label: "Sobre/Contato" },
  ];

  return (
    <>
      {!closed && (
        <div 
          style={overlayStyle} 
          onClick={toggle}
        />
      )}
      <div style={closed ? sidebarClosedStyle : sidebarStyle} id="sidebar">
        <div style={{ flex: 1 }}>
          {sidebarItems.map((item) => (
            <a
              key={item.id}
              href="#"
              style={
                hovered === item.label ? sidebarLinkHoverStyle : sidebarLinkStyle
              }
              onMouseEnter={() => setHovered(item.label)}
              onMouseLeave={() => setHovered(null)}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.id);
                toggle();
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
      <button
        style={toggleBtnStyle}
        onClick={toggle}
        aria-label={closed ? "Abrir menu lateral" : "Fechar menu lateral"}
      >
        ☰
      </button>
    </>
  );
}

function AboutContact() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 800, width: "100%", margin: "40px 0" }}>
      {/* Sobre */}
      <div style={{ ...cardStyle, maxWidth: 800, width: "100%" }}>
        <div style={cardTextStyle}>
          <strong style={{fontWeight: "600"}}>Sobre:</strong> Zyshi Animes é um projeto público para site/aplicação mobile focado em conteúdo de animes, com a maior parte do código em TypeScript. O repositório funciona como base para interface e navegação responsiva, mas não contém descrição detalhada nem licença pública.
          <div>
            <a
              href="https://github.com/AshlyArcia/projeto_mobile_site_zyshi_animes"
              target="_blank"
              rel="noopener noreferrer"
              style={repoLinkStyle}
            >
              https://github.com/AshlyArcia/projeto_mobile_site_zyshi_animes
            </a>
          </div>
        </div>
      </div>

      {/* Contato */}
      <div style={{ ...cardStyle, maxWidth: 800, width: "100%" }}>
        <div style={cardTextStyle}>
          <strong style={{fontWeight: "600"}}>Contato:</strong>
          <div style={{ marginTop: 12 }}>
            <a href="mailto:ashly.arcia@escola.pr.gov.br" style={{ color: "#4af", fontFamily: "'Roboto', sans-serif" }}>
              ashly.arcia@escola.pr.gov.br
            </a>
          </div>
          <div style={{ marginTop: 8 }}>
            <a href="mailto:ribeiro.davi30@escola.pr.gov.br" style={{ color: "#4af", fontFamily: "'Roboto', sans-serif" }}>
              ribeiro.davi30@escola.pr.gov.br
            </a>
          </div>
          <div style={{ marginTop: 8 }}>
            <a href="mailto:anna.helloiza.santos@escola.pr.gov.br" style={{ color: "#4af", fontFamily: "'Roboto', sans-serif" }}>
              anna.helloiza.santos@escola.pr.gov.br
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeCards() {
  return (
    <>
      <div style={titleStyle}>ANIMES.</div>
      <div style={cardsListStyle}>
        <div style={cardStyle}>
          <div style={cardTextStyle}>Kaiju n 8</div>
        </div>
        <div style={cardStyle}>
          <div style={cardTextStyle}>One Piece</div>
        </div>
        <div style={cardStyle}>
          <div style={cardTextStyle}>Death Note</div>
        </div>
        <div style={cardStyle}>
          <div style={cardTextStyle}>Bleach</div>
        </div>
      </div>
    </>
  );
}

function Favorites() {
  return (
    <div style={{ ...cardStyle, maxWidth: 600, width: "100%", margin: "40px 0" }}>
      <div style={cardTextStyle}>
        <strong style={{fontWeight: "600"}}>Favoritos:</strong> Aqui você pode encontrar seus animes favoritos!
      </div>
    </div>
  );
}

export default function App() {
  const [sidebarClosed, setSidebarClosed] = useState(true);
  const [page, setPage] = useState("about");

  function handleNavigate(to: string) {
    setPage(to);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#121212", fontFamily: "'Roboto', sans-serif" }}>
      <Sidebar
        onNavigate={handleNavigate}
        closed={sidebarClosed}
        toggle={() => setSidebarClosed((v) => !v)}
      />
      <div
        style={
          sidebarClosed
            ? { ...mainContentStyle, marginLeft: 20 }
            : mainContentStyle
        }
      >
        <Navbar onNavigate={handleNavigate} current={page} />
        {page === "home" && <HomeCards />}
        {page === "about" && <AboutContact />}
        {page === "favorites" && <Favorites />}
      </div>
    </div>
  );
}