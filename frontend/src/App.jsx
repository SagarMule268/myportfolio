import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
const PORTFOLIO_URL = `${API_BASE_URL.replace(/\/$/, "")}/api/v1/portfolio/`;
const CONTACT_URL = `${API_BASE_URL.replace(/\/$/, "")}/api/v1/contact-message/`;

const emptyPortfolio = {
  hero: null,
  about: null,
  projects: [],
  experiences: [],
  education: [],
  skills: [],
  social_links: [],
};

function formatDate(value) {
  if (!value) return "Present";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function getTechnologies(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch {
    // Plain comma-separated values are also supported.
  }
  return value.split(",").map((technology) => technology.trim()).filter(Boolean);
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

function App() {
  const [portfolio, setPortfolio] = useState(emptyPortfolio);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [contactStatus, setContactStatus] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPortfolio() {
      try {
        const response = await fetch(PORTFOLIO_URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Portfolio request failed (${response.status}).`);
        }
        const data = await response.json();
        setPortfolio({ ...emptyPortfolio, ...data });
      } catch (error) {
        if (error.name !== "AbortError") {
          setLoadError(
            `${error.message} Make sure the backend is running and VITE_API_BASE_URL points to it.`,
          );
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadPortfolio();
    return () => controller.abort();
  }, []);

  async function handleContactSubmit(event) {
    event.preventDefault();
    setSending(true);
    setContactStatus({ type: "", message: "" });

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      subject: form.get("subject") || null,
      message: form.get("message"),
    };

    try {
      const response = await fetch(CONTACT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        const detail = result?.detail;
        const message = Array.isArray(detail)
          ? detail.map((item) => item.msg).join(" ")
          : typeof detail === "string"
            ? detail
            : `Message could not be sent (${response.status}).`;
        throw new Error(message);
      }

      formElement.reset();
      setContactStatus({
        type: "success",
        message: "Thanks for reaching out. Your message has been sent.",
      });
    } catch (error) {
      setContactStatus({ type: "error", message: error.message });
    } finally {
      setSending(false);
    }
  }

  const hero = portfolio.hero;
  const about = portfolio.about;
  const displayName = hero?.title || about?.title || "Portfolio";

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="topbar glass-panel">
        <a className="brand" href="#home" aria-label={`${displayName} home`}>
          <span className="brand-mark">{displayName.slice(0, 1).toUpperCase()}</span>
          <span>{displayName}</span>
        </a>
        <nav className="navigation" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="nav-cta" href="#contact">Let&apos;s talk <span aria-hidden="true">↗</span></a>
      </header>

      {loadError && (
        <div className="notice error-notice" role="alert">
          <strong>Couldn&apos;t load portfolio content.</strong> {loadError}
        </div>
      )}
      {loading && (
        <div className="loading-notice" role="status">
          <span className="loading-dot" /> Loading portfolio…
        </div>
      )}

      <section className="hero-section" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> {hero?.greeting || "Available for opportunities"}</p>
          <h1>
            {hero?.title || about?.title || "Creative developer"}
            <span className="hero-highlight">{hero?.subtitle || "Building thoughtful digital experiences."}</span>
          </h1>
          <p className="hero-description">
            {hero?.description || about?.professional_summary || about?.description || "A portfolio of selected work, experience, and skills."}
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              Explore my work <span aria-hidden="true">↓</span>
            </a>
            {hero?.primary_cta?.url ? (
              <a className="button button-quiet" href={hero.primary_cta.url} target="_blank" rel="noreferrer">
                {hero.primary_cta.text} <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <a className="button button-quiet" href="#contact">Get in touch <span aria-hidden="true">↗</span></a>
            )}
          </div>
          <div className="hero-meta">
            <span><span className="status-dot" /> Open to meaningful projects</span>
            <span className="meta-divider" />
            <span>{portfolio.projects.length} selected projects</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="orbit orbit-outer" aria-hidden="true" />
          <div className="orbit orbit-inner" aria-hidden="true" />
          <div className="profile-card glass-panel">
            {hero?.profile_image || about?.profile_image ? (
              <img
                className="profile-image"
                src={hero?.profile_image || about?.profile_image}
                alt={displayName}
              />
            ) : (
              <div className="profile-placeholder" aria-hidden="true">
                {(hero?.title || about?.title || "D").slice(0, 1).toUpperCase()}
              </div>
            )}
            <div className="profile-caption">
              <span className="caption-label">A little about me</span>
              <strong>{hero?.subtitle || about?.title || "Developer & creative thinker"}</strong>
            </div>
            <span className="profile-sparkle" aria-hidden="true">✳</span>
          </div>
          <div className="floating-note glass-panel"><span className="note-icon">✦</span> Built with curiosity</div>
        </div>
      </section>

      <section className="content-section" id="about">
        <SectionHeading
          eyebrow="01 / Introduction"
          title={about?.title || "A bit about me"}
          description={about?.description || about?.professional_summary || "The person behind the projects."}
        />
        <div className="about-grid">
          <article className="glass-panel about-card">
            <span className="card-kicker">My approach</span>
            <p>{about?.professional_summary || about?.description || hero?.description || "I enjoy turning thoughtful ideas into useful, polished digital experiences."}</p>
          </article>
          {about?.resume_url && (
            <a className="glass-panel resume-card" href={about.resume_url} target="_blank" rel="noreferrer">
              <span className="resume-icon" aria-hidden="true">↗</span>
              <span><span className="card-kicker">Want the full story?</span><strong>View my resume</strong></span>
            </a>
          )}
          <div className="glass-panel stat-card">
            <span className="stat-number">{portfolio.projects.length.toString().padStart(2, "0")}</span>
            <span className="card-kicker">Projects shared</span>
          </div>
        </div>
      </section>

      <section className="content-section" id="work">
        <SectionHeading
          eyebrow="02 / Selected work"
          title="Projects with purpose."
          description="A selection of work, ideas, and experiments. Each one is a chance to make something useful and memorable."
        />
        {portfolio.projects.length ? (
          <div className="project-grid">
            {portfolio.projects.map((project, index) => (
              <article className="project-card glass-panel" key={project.id}>
                <div className="project-image-wrap">
                  {project.image_url ? (
                    <img className="project-image" src={project.image_url} alt="" loading="lazy" />
                  ) : (
                    <div className={`project-placeholder placeholder-${index % 3}`} aria-hidden="true">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </div>
                  )}
                  {project.featured && <span className="featured-badge">Featured</span>}
                </div>
                <div className="project-details">
                  <div className="project-title-row">
                    <h3>{project.title}</h3>
                    {project.live_url && <a className="round-link" href={project.live_url} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title}`}>↗</a>}
                  </div>
                  <p>{project.description}</p>
                  <div className="tag-list">
                    {getTechnologies(project.technologies).map((technology) => (
                      <span className="tag" key={technology}>{technology}</span>
                    ))}
                  </div>
                  {project.github_url && (
                    <a className="text-link" href={project.github_url} target="_blank" rel="noreferrer">
                      View source <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="glass-panel empty-state">Projects will appear here once they have been added.</div>
        )}
      </section>

      <section className="content-section" id="experience">
        <SectionHeading
          eyebrow="03 / The journey"
          title="Experience & education."
          description="The roles and learning experiences that have shaped how I work."
        />
        <div className="journey-grid">
          <div className="journey-column">
            <h3 className="column-title">Experience</h3>
            {portfolio.experiences.length ? portfolio.experiences.map((item) => (
              <article className="journey-card glass-panel" key={item.id}>
                <div className="journey-date">{formatDate(item.start_date)} — {item.is_current ? "Present" : formatDate(item.end_date)}</div>
                <h4>{item.position}</h4>
                <p className="journey-subtitle">{item.company}{item.location ? ` · ${item.location}` : ""}</p>
                <p className="journey-description">{item.description}</p>
              </article>
            )) : <div className="glass-panel empty-state">Experience details will appear here.</div>}
          </div>
          <div className="journey-column">
            <h3 className="column-title">Education</h3>
            {portfolio.education.length ? portfolio.education.map((item) => (
              <article className="journey-card glass-panel" key={item.id}>
                <div className="journey-date">{formatDate(item.start_date)} — {formatDate(item.end_date)}</div>
                <h4>{item.degree}</h4>
                <p className="journey-subtitle">{item.institution}{item.field_of_study ? ` · ${item.field_of_study}` : ""}</p>
                {item.description && <p className="journey-description">{item.description}</p>}
              </article>
            )) : <div className="glass-panel empty-state">Education details will appear here.</div>}
          </div>
        </div>
      </section>

      <section className="content-section" id="skills">
        <SectionHeading
          eyebrow="04 / What I use"
          title="Tools of the trade."
          description="Technologies and skills I use to turn ideas into real-world products."
        />
        {portfolio.skills.length ? (
          <div className="skills-grid">
            {portfolio.skills.map((skill) => (
              <article className="skill-card glass-panel" key={skill.id}>
                {skill.icon_url ? (
                  <img className="skill-icon" src={skill.icon_url} alt="" loading="lazy" />
                ) : (
                  <span className="skill-icon skill-monogram" aria-hidden="true">{skill.name.slice(0, 1).toUpperCase()}</span>
                )}
                <span className="skill-name">{skill.name}</span>
                {skill.category && <span className="skill-category">{skill.category}</span>}
                {skill.proficiency && (
                  <span className="skill-meter" aria-label={`${skill.proficiency}% proficiency`}>
                    <span style={{ width: `${skill.proficiency}%` }} />
                  </span>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="glass-panel empty-state">Skills will appear here once they have been added.</div>
        )}
      </section>

      <section className="contact-section glass-panel" id="contact">
        <div className="contact-copy">
          <p className="eyebrow">05 / Start a conversation</p>
          <h2>Have a good idea?<br /><span>Let&apos;s make it real.</span></h2>
          <p>Share a little about what you&apos;re working on. I&apos;ll get back to you as soon as I can.</p>
          <div className="social-links">
            {portfolio.social_links.map((link) => (
              <a key={link.id} href={link.url} target="_blank" rel="noreferrer">
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
        <form className="contact-form" onSubmit={handleContactSubmit}>
          <label>
            Your name
            <input name="name" type="text" autoComplete="name" placeholder="Jane Smith" required maxLength={200} />
          </label>
          <label>
            Email address
            <input name="email" type="email" autoComplete="email" placeholder="jane@example.com" required />
          </label>
          <label>
            Subject <span className="optional-label">Optional</span>
            <input name="subject" type="text" placeholder="What would you like to build?" maxLength={300} />
          </label>
          <label>
            Your message
            <textarea name="message" rows="4" placeholder="Tell me a little about it…" required />
          </label>
          {contactStatus.message && (
            <p className={`form-status ${contactStatus.type}`} role={contactStatus.type === "error" ? "alert" : "status"}>
              {contactStatus.message}
            </p>
          )}
          <button className="button button-primary submit-button" type="submit" disabled={sending}>
            {sending ? "Sending…" : "Send message"} <span aria-hidden="true">↗</span>
          </button>
        </form>
      </section>

      <footer className="site-footer">
        <a className="brand" href="#home">
          <span className="brand-mark">{displayName.slice(0, 1).toUpperCase()}</span>
          <span>{displayName}</span>
        </a>
        <span>Designed with intention. Built with curiosity.</span>
        <a href="#home" className="back-to-top">Back to top ↑</a>
      </footer>
    </main>
  );
}

export default App;
