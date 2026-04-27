import Image from "next/image";

type Props = {
  title: string;
  description: string;
  image: string;
  stack: string[];
  liveUrl: string;
  status?: string; // opcional (ex: "In Progress")
};

export default function ProjectCard({
  title,
  description,
  image,
  stack,
  liveUrl,
  status,
}: Props) {
  return (
    <article className="project-card">
      <div className="project-image-wrapper">
        <Image
          src={image}
          alt={title}
          width={600}
          height={350}
          className="project-image"
        />

        {status && <span className="project-status">{status}</span>}
      </div>

      <div className="project-content">
        <h3 className="project-card-title">{title}</h3>

        <p className="project-card-text">{description}</p>

        <div className="project-stack">
          {stack.map((icon, index) => (
            <i key={index} className={icon}></i>
          ))}
        </div>

        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          Ver projeto →
        </a>
      </div>
    </article>
  );
}