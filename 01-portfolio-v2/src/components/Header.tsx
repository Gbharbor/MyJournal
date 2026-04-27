import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header" data-header>
      <div className="container">
        <Link href="#home" className="logo" aria-label="Ir para o início">
          <Image
            src="/images/newlogo2.png"
            width={50}
            height={50}
            alt="Logo GBHarbor"
          />
        </Link>

        <nav className="navbar" data-navbar aria-label="Navegação principal">
          <ul className="navbar-list">
            <li>
              <Link href="#home" className="navbar-link">
                Início
              </Link>
            </li>

            <li>
              <Link href="#technologies" className="navbar-link">
                Tecnologias
              </Link>
            </li>

            <li>
              <Link href="#projects" className="navbar-link">
                Projetos
              </Link>
            </li>

            <li>
              <Link href="#contact" className="navbar-link">
                Contacto
              </Link>
            </li>
          </ul>

          <div className="navbar-bottom">
            <div className="profile-card">
              <Image
                src="/images/github_git_icon_145985.png"
                width={30}
                height={30}
                alt="Ícone do GitHub"
                className="profile-banner"
              />

              <a
                href="https://github.com/Gbharbor"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>GitHub</p>
              </a>
            </div>
          </div>
        </nav>

        <button
          className="menu-indicator"
          type="button"
          aria-label="Abrir ou fechar menu"
        >
          <span>&#9664;</span>
        </button>
      </div>
    </header>
  );
}