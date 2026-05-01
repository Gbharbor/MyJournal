import Image from "next/image";

type Props = {
  title: string;
  description: string;
  image: string;
  stack: string[];
  liveUrl: string;
  repoUrl: string;
};

export default function ProjectCard({
  title,
  description,
  image,
  stack,
  liveUrl,
  repoUrl,
}: Props) {
  return (
    <article className="project-card">
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="project-image-link"
        aria-label={`Abrir projeto ${title}`}
      >
        <Image
          src={image}
          alt={title}
          width={600}
          height={350}
          className="project-image"
        />
      </a>

      <h3 className="project-card-title">{title}</h3>

      <p className="project-card-text">{description}</p>

      <div className="project-stack" aria-label="Tecnologias utilizadas">
        {stack.map((item) => (
          <i key={item} className={item} aria-hidden="true" />
        ))}
      </div>

      <div className="project-actions">
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link project-link-primary"
        >
          Ver projeto
        </a>

        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link project-link-secondary"
        >
          GitHub
        </a>
      </div>
    </article>
  );
}