import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaLinkedin, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";
import "./Portfolio.css";

export default function Portfolio() {
  // Accent theme (CSS variable)
  const [accent, setAccent] = useState("#6f7cff");
  const [dark, setDark] = useState(true);

  // Project filtering and search
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  // Command Palette (⌘/Ctrl + K)
  const [paletteOpen, setPaletteOpen] = useState(false);
  const paletteRef = useRef(null);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Animation control
  const [isLoaded, setIsLoaded] = useState(false);

  const projects = useMemo(
    () => [
      {
        id: 1,
        title: "MPeoples Business Solutions Private Limited",
        tags: ["React", "CSS"],
        category: "Web",
        desc: "Developed Responsive web application for the currently working company.",
        year: 2025,
        link: "https://mpeoples.in/"
      },
      {
        id: 2,
        title: "Today Talks",
        tags: ["Node.js", "React", "MongoDb"],
        category: "Web",
        desc: "Developed a news Website 'TodayTalks' includin Adsense.",
        year: 2025,
        link: "https://todaytalks.in/"
      },
      {
        id: 3,
        title: "Makkal Sinthanai Peravai",
        tags: ["React", "CSS"],
        category: "Web",
        desc: "Developed a Portfolio website for an Organisation.",
        year: 2025,
        link: "https://www.makkalsinthanaiperavai.com/"
      },
      {
        id: 4,
        title: "Erode Book Festival",
        tags: ["React", "CSS"],
        category: "Infra",
        desc: "Developed a Portfolio website for an Erode Book Festival.",
        year: 2025,
        link: "https://erodebookfestival.in/"
      },
      {
        id: 5,
        title: "TStalin Gunasekaran",
        tags: ["React", "CSS"],
        category: "Web",
        desc: "Developed a Portfolio website for an TStalin Gunasekaran.,Lawyer.,Writer.",
        year: 2025,
        link: "https://tstalingunasekaran.in/"
      },
      {
        id: 6,
        title: "Automated Email Reporting System",
        tags: ["Node.js", "Automation"],
        category: "Backend",
        desc: "Implemented automated email functionality to send reports directly to clients, reducing manual efforts by 90%.",
        year: 2024,
        link: "#"
      }
    ],
    []
  );

  const filtered = useMemo(() => {
    const byCat =
      category === "All"
        ? projects
        : projects.filter((p) => p.category === category);
    const q = query.trim().toLowerCase();
    return q
      ? byCat.filter((p) =>
          (p.title + " " + p.desc + " " + p.tags.join(" "))
            .toLowerCase()
            .includes(q)
        )
      : byCat;
  }, [category, query, projects]);

  // Set loaded state after initial render
  useEffect(() => {
    setIsLoaded(true);

    // Initialize scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    // Observe all sections and cards
    document
      .querySelectorAll("section, .card, .hero-copy, .hero-card")
      .forEach((el) => {
        observer.observe(el);
      });

    return () => observer.disconnect();
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      // Ctrl/Cmd + K toggles palette
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        return;
      }
      // D toggles dark mode
      if (!e.ctrlKey && !e.metaKey && e.key.toLowerCase() === "d") {
        setDark((v) => !v);
      }
      // / focuses search
      if (!e.ctrlKey && !e.metaKey && e.key === "/") {
        e.preventDefault();
        document.getElementById("projectSearch")?.focus();
      }
      // Escape closes mobile menu and palette
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close palette when clicking outside
  useEffect(() => {
    const onClick = (e) => {
      if (
        paletteOpen &&
        paletteRef.current &&
        !paletteRef.current.contains(e.target)
      ) {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [paletteOpen]);

  // Sticky header shadow on scroll
  useEffect(() => {
    const onScroll = () => {
      const nav = document.querySelector(".navbar");
      if (!nav) return;
      if (window.scrollY > 12) nav.classList.add("elevated");
      else nav.classList.remove("elevated");
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll for internal links
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("href");
        if (id && id.startsWith("#") && id.length > 1) {
          e.preventDefault();
          document
            .querySelector(id)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
          setMobileMenuOpen(false);
        }
      });
    });
    return () =>
      links.forEach((link) => link.removeEventListener("click", () => {}));
  }, []);

  const categories = ["All", "Web", "Backend"];

  return (
    <div
      className={`site ${dark ? "theme-dark" : "theme-light"} ${
        isLoaded ? "loaded" : ""
      }`}
      style={{ ["--accent"]: accent }}
    >
      {/* Animated background blobs */}
      <div className="bg-blobs" aria-hidden>
        <div className="blob" />
        <div className="blob" />
        <div className="blob" />
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar1">
          <div className="brand">
            <span className="brand-badge">TJ</span>
            <span className="brand-name">Tejas Jagadale</span>
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`nav-actions ${mobileMenuOpen ? "mobile-open" : ""}`}>
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#experience" className="nav-link">
              Experience
            </a>
            <a href="#projects" className="nav-link">
              Projects
            </a>
            <a href="#skills" className="nav-link">
              Skills
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
            <button
              className="btn btn-outline"
              onClick={() => setDark((v) => !v)}
              aria-label="Toggle theme"
            >
              {dark ? "Light" : "Dark"}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero container-xl">
        <div className="hero-copy">
          <div className="hero-badge">Full Stack Developer</div>
          <h1>
            Building <span className="accent-underline">user-friendly</span>{" "}
            applications
            <br /> with modern web technologies.
          </h1>
          <p className="lead">
            Full‑stack developer focused on creating responsive, efficient web
            applications using React, Node.js, and cloud platforms.
          </p>
          <div className="cta-row">
            <a href="/pdf/TejasResume.pdf" className="btn btn-lg btn-primary">
              View Resume
            </a>
            <a href="#contact" className="btn btn-lg btn-outline">
              Hire Me
            </a>
          </div>
          <div className="quick-stats">
            <div className="stat">
              <span>1.6+</span> yrs experience
            </div>
            <div className="stat">
              <span>5+</span> shipped apps
            </div>
            <div className="stat">
              <span>90%</span> efficiency gains
            </div>
          </div>
        </div>
        <div className="hero-card tilt">
          <ul className="hero-highlights">
            <li>
              ⚡ <strong>Full Stack:</strong> &nbsp; Proficient in both
              front-end and back-end development
            </li>
            <li>
              🧠 <strong>AI Integration:</strong> &nbsp; Experience with Vision
              AI and Gen AI
            </li>
            <li>
              ☁️ <strong>Cloud Platforms:</strong> &nbsp; AWS and GCP experience
            </li>
            <li>
              📈 <strong>Impact:</strong> &nbsp; 90% reduction in manual efforts
            </li>
          </ul>
        </div>
      </header>

      {/* About */}
      <section id="about" className="section container-xl">
        <div className="row g-4 align-center">
          <div className="col col-6 col-md-12 aboutone">
            <h2>About Me</h2>
            <p>
              Full Stack Web Developer with 1.6 years of experience in
              developing user-friendly, responsive web applications. Proficient
              in front-end technologies like JavaScript, React, HTML5, CSS3 as
              well as back-end frameworks such as Node.js.
            </p>
            <div className="pill-row">
              {[
                "React",
                "Node.js",
                "JavaScript",
                "HTML5",
                "CSS3",
                "AWS",
                "GCP",
                "REST APIs"
              ].map((s) => (
                <span key={s} className="pill">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="col col-6 col-md-12">
            <div className="card luxe">
              <h3 className="mb-2">What I Bring</h3>
              <ul className="checklist">
                <li>Automation solutions that reduce manual effort</li>
                <li>Responsive and user-friendly UI development</li>
                <li>Cost optimization through cloud resource management</li>
                <li>Integration of third-party libraries and APIs</li>
              </ul>
              <div className="row g-3 mt-3">
                <div className="col col-6 col-sm-12">
                  <div className="metric">
                    <span className="metric-num">
                      <span className="up">▲</span> 90%
                    </span>
                    <span className="metric-label">Efficiency gain</span>
                  </div>
                </div>
                <div className="col col-6 col-sm-12">
                  <div className="metric">
                    <span className="metric-num">
                      <span className="down">▼</span> 200%
                    </span>
                    <span className="metric-label">Cost reduction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="section container-xl">
        <h2>Experience</h2>
        <div className="timeline">
          {[
            {
              role: "Front End Developer",
              org: "MPeoples Business Solution Pvt Ltd",
              period: "Feb 2025 — Present",
              points: [
                "Developed Responsive and User Friendly Websites using React.js, Next.js, and CSS",
                "Maintaining the website which includes updates, changes and improvements"
              ]
            },
            {
              role: "Full Stack Developer",
              org: "OneIntegral Technologies Pvt Ltd",
              period: "Oct 2023 — Dec 2024",
              points: [
                "Implemented automated email functionality reducing manual efforts by 90%",
                "Maintained admin panel to manage system configurations and user roles",
                "Optimized AWS resources reducing costs by over 200%",
                "Developed Data Extraction system using Node.js, Vision AI and Gen AI"
              ]
            }
          ].map((job, i) => (
            <article key={i} className="timeline-item card">
              <div className="timeline-dot" />
              <div className="timeline-body">
                <header className="timeline-header">
                  <h3>
                    {job.role} <span className="muted">@ {job.org}</span>
                  </h3>
                  <div className="muted">{job.period}</div>
                </header>
                <ul className="bullet-list">
                  {job.points.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section container-xl">
        <h2>Skills</h2>
        <div className="row g-4">
          {[
            { name: "ReactJS / NextJS", level: 85 },
            { name: "Node.js / API Design", level: 80 },
            { name: "JavaScript", level: 90 },
            { name: "HTML / CSS", level: 95 }
            // { name: "AWS / GCP", level: 75 }
          ].map((s, i) => (
            <div key={i} className="col col-6 col-md-12">
              <div className="skill">
                <div className="skill-head">
                  <strong>{s.name}</strong>
                  <span className="muted">{s.level}%</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4 mt-4">
          <div className="col col-6 col-md-12">
            <h3>Tools/Software</h3>
            <div className="pill-row">
              {[
                "VS Code",
                "Postman",
                "JIRA",
                "BitBucket",
                "WinSCP",
                "PuTTY"
              ].map((tool) => (
                <span key={tool} className="pill">
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div className="col col-6 col-md-12">
            <h3>Languages</h3>
            <div className="pill-row">
              {[
                "English (Fluent)",
                "Tamil (Fluent)",
                "Marathi (Fluent)",
                "Hindi (Proficient)"
              ].map((lang) => (
                <span key={lang} className="pill">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section container-xl">
        <div className="row align-center between projectsector mb-3">
          <h2 className="col">Projects</h2>
          <div className="col col-6 col-md-12 text-right">
            <div className="row g-2 align-center">
              <div className="col"></div>
              <div className="col">
                <input
                  id="projectSearch"
                  className="form-control"
                  placeholder="Search ( / )"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid">
          {filtered.map((p) => (
            <a
              key={p.id}
              href={p.link}
              className="card project tilt"
              target="_blank"
              rel="noreferrer"
            >
              <div className="project-top">
                <span className="badge soft">{p.category}</span>
                <span className="muted">{p.year}</span>
              </div>
              <h3>{p.title}</h3>
              <p className="muted">{p.desc}</p>
              <div className="tag-row">
                {p.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Education & Certifications */}
      <section id="awards" className="section container-xl">
        <h2>Education & Certifications</h2>

        <div className="row g-4 educ">
          <div className="col col-6 col-md-12">
            <div className="card luxe">
              <h3>Education</h3>
              <div className="timeline-item">
                <h4>B.E - Electronics and Communication Engineering</h4>
                <div className="muted">Sona College of Technology</div>
                <div className="muted">Sep 2017 - Oct 2021</div>
              </div>
            </div>
          </div>

          <div className="col col-6 col-md-12">
            <div className="card luxe">
              <h3>Certifications</h3>
              <ul className="checklist">
                <li>
                  Full Stack Web Development - Edureka <br />
                  <a
                    href="/pdf/fsdcertificate.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary mt-2"
                  >
                    View Certificate
                  </a>
                </li>
                <li>
                  Ultimate AWS Certified Solutions Architect Associate SAA-C03 -
                  Udemy <br />
                </li>
                <li>
                  Responsive Web Design Essentials - CSS, Bootstrap, Javascript,
                  Web Development Course - Udemy <br />
                  <a
                    href="/pdf/udemy.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary mt-2"
                  >
                    View Certificate
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card luxe mt-4">
          <h3>Hobbies</h3>
          <div className="pill-row">
            {["Singing", "Listening to Music", "Watching Movies"].map(
              (hobby) => (
                <span key={hobby} className="pill">
                  {hobby}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section container-xl">
        <div className="row g-4 align-center">
          <div className="col col-6 col-md-12">
            <h2>Contact</h2>
            <p className="muted">
              Let's discuss how I can help bring your web application ideas to
              life with modern technologies and efficient solutions.
            </p>
            <div className="row g-3 mt-2 condact">
              <div className="col col-6 col-sm-12">
                <a
                  className="btn btn-block"
                  href="mailto:tejasjagadale43@gmail.com"
                >
                  Email
                </a>
              </div>
              <div className="col col-6 col-sm-12">
                <a
                  className="btn btn-outline btn-block"
                  href="https://www.linkedin.com/in/tejasjagadale43"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container-xl footer1">
          <div className="col text-right flex items-center gap-3">
            {/* Social Media Icons */}
            <div className="social-icons d-inline-flex">
              <a
                href="https://www.linkedin.com/in/tejas-jagadale43?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://youtube.com/@tejasjagdale?si=_VK2HQ3_wwheU8bs"
                target="_blank"
                rel="noopener noreferrer"
                className="youtube"
              >
                <FaYoutube size={20} />
              </a>
              <a
                href="https://www.instagram.com/tejas__verse?utm_source=qr&igsh=MWFzaXNleTdkcnc2bA=="
                target="_blank"
                rel="noopener noreferrer"
                className="instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://x.com/TejasJagad83787?t=Hw75CHA2rw_NCUE_xWS8dQ&s=08 "
                target="_blank"
                rel="noopener noreferrer"
                className="twitter"
              >
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Accent color picker */}
          <input
            type="color"
            value={accent}
            onChange={(e) => setAccent(e.target.value)}
            aria-label="Choose accent color"
          />
        </div>
      </footer>

      {/* Command Palette */}
      {paletteOpen && (
        <div className="palette-overlay">
          <div className="palette card" ref={paletteRef}>
            <input
              className="form-control palette-input"
              placeholder="Type a command… (e.g., 'Go to projects', 'Toggle dark', 'Download resume')"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const v = e.currentTarget.value.toLowerCase();
                  if (v.includes("project"))
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" });
                  if (v.includes("dark")) setDark((x) => !x);
                  if (v.includes("resume"))
                    alert("Resume download is mocked in this demo.");
                  setPaletteOpen(false);
                }
                if (e.key === "Escape") setPaletteOpen(false);
              }}
            />
            <div className="palette-hints muted">
              Try: <code>Go to projects</code> • <code>Toggle dark</code> •{" "}
              <code>Download resume</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
