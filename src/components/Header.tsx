import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header" data-header>
      <div className="container header-container">
        <Link href="#home" className="logo" aria-label="Ir para o início">
          <Image
            src="/images/newlogo2.png"
            width={50}
            height={50}
            alt="Logo GBHarbor"
            priority
          />
        </Link>

        <nav className="navbar" aria-label="Navegação principal">
          <ul className="navbar-list">
            <li>
              <Link href="#home" className="navbar-link">
                Início
              </Link>
            </li>

            <li>
            <Link href="#capabilities" className="navbar-link">
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
        </nav>

        <a
          href="https://github.com/Gbharbor"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
          aria-label="Ver GitHub"
        >
          <Image
            src="/images/github_git_icon_145985.png"
            width={24}
            height={24}
            alt=""
          />
          <span>GitHub</span>
        </a>
      </div>
    </header>
  );
}