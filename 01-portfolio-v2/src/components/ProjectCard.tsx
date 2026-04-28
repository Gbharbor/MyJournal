type Props = {
    title: string;
    description: string;
    image: string;
    stack: string[];
    liveUrl: string;
  };
  
  export default function ProjectCard({
    title,
    description,
    image,
    stack,
    liveUrl,
  }: Props) {
    return (
      <article className="project-card">
        <img src={image} alt={title} className="project-image" />
  
        <h3>{title}</h3>
        <p>{description}</p>
  
        <div className="project-stack">
          {stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
  
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          Ver projeto
        </a>
      </article>
    );
  }