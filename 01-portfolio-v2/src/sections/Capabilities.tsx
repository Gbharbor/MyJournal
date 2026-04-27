const capabilities = [
    {
      number: "01",
      title: "Dashboards & Data",
      description:
        "Construção de interfaces para visualização de métricas, acompanhamento de dados e apoio à tomada de decisão.",
      stack: ["React", "TypeScript", "APIs"],
    },
    {
      number: "02",
      title: "Web Applications",
      description:
        "Desenvolvimento de aplicações com formulários, estado, autenticação e organização de dados.",
      stack: ["React", "Node.js", "Database"],
    },
    {
      number: "03",
      title: "Modern Interfaces",
      description:
        "Criação de páginas responsivas, componentes reutilizáveis e interfaces modernas com foco em usabilidade.",
      stack: ["HTML", "CSS", "Tailwind", "JavaScript"],
    },
    {
      number: "04",
      title: "Software Foundations",
      description:
        "Base em lógica de programação, modularização, estruturas de dados e organização de código com C/C++.",
      stack: ["C", "C++", "Algorithms"],
    },
  ];
  
  export default function Capabilities() {
    return (
      <section id="capabilities" className="capabilities section">
        <div className="container">
          <h2 className="section-title typing-effect typing-static-technologies">
            O que eu construo_
          </h2>
  
          <div className="capabilities-grid">
            {capabilities.map((item) => (
              <article className="capability-card" key={item.number}>
  
                <h3>{item.title}</h3>
  
                <p>{item.description}</p>
  
                <div className="capability-stack">
                  {item.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }