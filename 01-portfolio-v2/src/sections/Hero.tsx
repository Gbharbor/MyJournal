import { technologies } from "@/data/technologies";

export default function Hero() {
  return (
    <section className="hero" id="home" aria-label="Apresentação">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>  

      <div className="hero-overlay" />

      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-eyebrow">Frontend Developer</span>

          <h1 className="hero-title">
            Construo interfaces modernas, escaláveis e bem estruturadas.
          </h1>

          <p className="hero-text">
            Desenvolvedor focado em aplicações com React e TypeScript, com
            atenção à organização de código, arquitetura e qualidade de UI.
          </p>

          <div className="hero-stack">
            {technologies.map((tech, index) => (
              <i
                key={tech.name}
                className={tech.icon}
                title={tech.name}
                style={{ "--i": index } as React.CSSProperties}
              />
            ))}
          </div>

          <div className="hero-actions">
            <a href="#projects" className="button-primary">
              Ver projetos
            </a>

            <a
              href="https://github.com/Gbharbor"
              target="_blank"
              className="button-secondary"
            >
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}