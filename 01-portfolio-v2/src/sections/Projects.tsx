import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="projects-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Selected Work</span>

          <h2 className="section-title">Projetos em destaque</h2>

          <p className="section-description">
            Uma seleção de projetos desenvolvidos com foco em interface,
            organização de código e experiência do utilizador.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}