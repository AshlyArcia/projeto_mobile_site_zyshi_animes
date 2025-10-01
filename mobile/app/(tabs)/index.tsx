import React, { useState } from "react";
import SidebarBg from "./assets/images/sidebar-bg.jpg.png"; // Caminho correto para sua imagem

const sidebarStyle: React.CSSProperties = {
  height: "100vh",
  width: 220,
  position: "fixed",
  top: 0,
  left: 0,
  background: "#b71616",
  backgroundImage: `url(${SidebarBg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  paddingTop: 20,
  transition: "0.3s",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const sidebarClosedStyle: React.CSSProperties = {
  ...sidebarStyle,
  width: 0,
  overflow: "hidden",
  paddingTop: 0,
};

const sidebarLinkStyle: React.CSSProperties = {
  color: "#fff",
  padding: 15,
  textDecoration: "none",
  display: "block",
  fontSize: 18,
  width: "100%",
  textAlign: "center" as "center",
  borderRadius: 8,
  transition: ".3s",
  cursor: "pointer",
};

const sidebarLinkHoverStyle: React.CSSProperties = {
  ...sidebarLinkStyle,
  background: "#444",
};

const toggleBtnStyle: React.CSSProperties = {
  position: "absolute" as "absolute",
  left: 230,
  top: 20,
  background: "#222",
  color: "#fff",
  border: "none",
  fontSize: 24,
  cursor: "pointer",
  padding: "5px 12px",
  zIndex: 2,
};

const mainContentStyle: React.CSSProperties = {
  marginLeft: 240,
  padding: "30px 20px 20px 20px",
  transition: "margin-left 0.3s",
};

const navbarStyle: React.CSSProperties = {
  background: "#333",
  padding: "1rem",
  marginLeft: -20,
  marginRight: -20,
  borderRadius: "0 0 10px 10px",
};

const navbarUlStyle: React.CSSProperties = {
  listStyle: "none",
  display: "flex",
  gap: "2rem",
  margin: 0,
  padding: 0,
};

const navbarAStyle: React.CSSProperties = {
  color: "#fff",
  textDecoration: "none",
};

const titleStyle: React.CSSProperties = {
  fontSize: 28,
  color: "#fff",
  fontWeight: "bold",
  marginBottom: 20,
  textAlign: "center" as "center",
  marginTop: 30,
};

const cardsListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column" as "column",
  gap: 15,
  marginTop: 20,
  maxWidth: 400,
  marginLeft: "auto",
  marginRight: "auto",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "#1e1e1e",
  padding: 20,
  borderRadius: 10,
};

const cardTextStyle: React.CSSProperties = {
  color: "#fff",
  fontSize: 18,
};

function Navbar({ onNavigate, current }: { onNavigate: (page: string) => void, current: string }) {
  return (
    <nav style={navbarStyle}>
      <ul style={navbarUlStyle}>
        <li>
          <a
            style={navbarAStyle}
            onClick={() => onNavigate("home")}
            href="#"
          >
            Home
          </a>
        </li>
        <li>
          <a
            style={navbarAStyle}
            onClick={() => onNavigate("about")}
            href="#"
          >
            Sobre
          </a>
        </li>
        <li>
          <a
            style={navbarAStyle}
            onClick={() => onNavigate("contact")}
            href="#"
          >
            Contato
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
  return (
    <>
      <div style={closed ? sidebarClosedStyle : sidebarStyle} id="sidebar">
        <a
          style={hovered === "Início" ? sidebarLinkHoverStyle : sidebarLinkStyle}
          onMouseEnter={() => setHovered("Início")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onNavigate("home")}
        >
          Início
        </a>
        <a
          style={
            hovered === "Serviços" ? sidebarLinkHoverStyle : sidebarLinkStyle
          }
          onMouseEnter={() => setHovered("Serviços")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onNavigate("services")}
        >
          Serviços
        </a>
        <a
          style={hovered === "Sobre" ? sidebarLinkHoverStyle : sidebarLinkStyle}
          onMouseEnter={() => setHovered("Sobre")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onNavigate("about")}
        >
          Sobre
        </a>
        <a
          style={
            hovered === "Contato" ? sidebarLinkHoverStyle : sidebarLinkStyle
          }
          onMouseEnter={() => setHovered("Contato")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onNavigate("contact")}
        >
          Contato
        </a>
      </div>
      <button style={toggleBtnStyle} onClick={toggle}>
        ☰
      </button>
    </>
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

function About() {
  return (
    <div style={{ ...cardStyle, maxWidth: 600, margin: "40px auto" }}>
      <div style={cardTextStyle}>
        <strong>Sobre:</strong> Este é um projeto exemplo com Sidebar, Navbar e cards de animes, tudo em um único arquivo!
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div style={{ ...cardStyle, maxWidth: 600, margin: "40px auto" }}>
      <div style={cardTextStyle}>
        <strong>Contato:</strong> Envie um email para{" "}
        <a href="mailto:contato@exemplo.com" style={{ color: "#4af" }}>
          contato@exemplo.com
        </a>
      </div>
    </div>
  );
}

function Services() {
  return (
    <div style={{ ...cardStyle, maxWidth: 600, margin: "40px auto" }}>
      <div style={cardTextStyle}>
        <strong>Serviços:</strong> Aqui você pode encontrar nossos serviços fictícios!
      </div>
    </div>
  );
}

export default function App() {
  const [sidebarClosed, setSidebarClosed] = useState(false);
  const [page, setPage] = useState("home");

  function handleNavigate(to: string) {
    setPage(to);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#121212" }}>
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
        {page === "about" && <About />}
        {page === "contact" && <Contact />}
        {page === "services" && <Services />}
      </div>
    </div>
  );
}