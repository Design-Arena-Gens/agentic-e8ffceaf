"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import PPTXGenJS from "pptxgenjs";

type SlideContent = {
  id: string;
  title: string;
  subtitle?: string;
  bullets?: string[];
  spotlight?: { label: string; value: string; description?: string }[];
  stats?: { label: string; value: string }[];
  quote?: { text: string; author: string; role?: string };
  imageAlt?: string;
  footer?: string;
};

const SLIDES: SlideContent[] = [
  {
    id: "cover",
    title: "F STSC Department",
    subtitle: "Future Science, Technology & Societal Change",
    bullets: ["Innovating across science, systems, and communities", "Driving inclusive, sustainable impact"],
    footer: "Academic Year 2024-2025"
  },
  {
    id: "mission",
    title: "Mission & Vision",
    bullets: [
      "Advance integrative research at the nexus of science, technology, sustainability, and culture.",
      "Equip learners to lead transformative change across public, private, and civic sectors.",
      "Partner with communities to prototype solutions that scale responsibly."
    ],
    footer: "Guiding principles built with faculty, alumni, and stakeholders."
  },
  {
    id: "pillars",
    title: "Strategic Pillars",
    bullets: ["Connected Scholarship", "Immersive Learning", "Impactful Partnerships", "Responsible Innovation"],
    spotlight: [
      { label: "Academics", value: "18 interdisciplinary tracks" },
      { label: "Research", value: "42 active labs" },
      { label: "Community", value: "60+ civic partners" }
    ]
  },
  {
    id: "programs",
    title: "Signature Programs",
    bullets: [
      "Systems Futures Studio: multi-sector design sprints for urgent challenges.",
      "Tech for Humanity Lab: ethics, AI alignment, and policy innovation.",
      "Resilient Cities Residency: field immersion across 5 global hubs.",
      "Digital Commons Accelerator: open knowledge and platform cooperatives."
    ]
  },
  {
    id: "research",
    title: "Research Highlights",
    stats: [
      { label: "Funded projects", value: "94" },
      { label: "External grants (FY24)", value: "$68M" },
      { label: "Peer-reviewed outputs", value: "310+" },
      { label: "Multidisciplinary teams", value: "78%" }
    ],
    bullets: [
      "Climate-adaptive infrastructure modeling adopted by 4 city governments.",
      "Inclusive AI frameworks informing international regulation standards.",
      "Bio-circular materials prototype reaching pilot production in Q2 2025."
    ]
  },
  {
    id: "students",
    title: "Student Experience",
    bullets: [
      "Curriculum sequenced around challenge-based studios.",
      "Mentorship lattice connecting alumni, researchers, and civic leaders.",
      "Global exchange nodes in Singapore, Accra, Rotterdam, and São Paulo."
    ],
    stats: [
      { label: "Enrollment growth", value: "27% YoY" },
      { label: "Experiential placements", value: "93%" },
      { label: "Retention", value: "96%" }
    ]
  },
  {
    id: "partnerships",
    title: "Partnership Network",
    bullets: [
      "Strategic alliances with UNDP, World Economic Forum, and local municipalities.",
      "Industry consortium on responsible automation with 18 corporate partners.",
      "Community innovation grants program funding 150+ grassroots projects."
    ],
    spotlight: [
      { label: "Partner satisfaction", value: "4.8/5" },
      { label: "Joint pilots launched", value: "32" },
      { label: "Policy briefings delivered", value: "21 governments" }
    ]
  },
  {
    id: "roadmap",
    title: "2025 Roadmap",
    bullets: [
      "Launch F STSC Insight Observatory for data-driven foresight.",
      "Open-source Toolbox for regenerative systems design.",
      "Expand micro-credential stack with online-first formats.",
      "Build Living Learning Lab inside the new Sustainability Commons."
    ],
    footer: "Key milestones tracked via quarterly OKR cycles."
  },
  {
    id: "impact",
    title: "Measuring Impact",
    bullets: [
      "Triple bottom line scorecards embedded in every initiative.",
      "Community impact audits driven by participatory evaluation.",
      "Alumni impact fellows tracking longitudinal outcomes."
    ],
    stats: [
      { label: "Communities served", value: "275" },
      { label: "SDG alignment", value: "13 goals" },
      { label: "Equitable access", value: "72% scholarships" }
    ],
    footer: "Evidence informed, community accountable."
  },
  {
    id: "cta",
    title: "Call to Collaborate",
    subtitle: "Co-create the future with F STSC",
    bullets: [
      "Engage in cross-sector pilot projects.",
      "Sponsor applied research cohorts.",
      "Invest in student innovation seed funds.",
      "Champion equitable, regenerative systems."
    ],
    quote: {
      text: "We are architects of possibility, translating vision into shared progress.",
      author: "Dr. Amina Rios",
      role: "Dean, F STSC Department"
    }
  }
];

const theme = {
  accent: "#22d3ee",
  accentStrong: "#0ea5e9",
  accentSoft: "rgba(14,165,233,0.2)",
  surface: "rgba(15,23,42,0.8)",
  textPrimary: "#f8fafc",
  textSecondary: "#cbd5f5"
};

function useSlideDeck() {
  return useMemo(() => SLIDES, []);
}

function generatePpt(slides: SlideContent[]) {
  const pptx = new PPTXGenJS();
  pptx.title = "F STSC Department Overview";
  pptx.author = "F STSC Department";
  pptx.company = "F STSC";

  slides.forEach((slide, index) => {
    const pptSlide = pptx.addSlide();
    pptSlide.background = { color: "0F172A" };
    const titleY = 0.5;

    pptSlide.addText(slide.title, {
      x: 0.5,
      y: titleY,
      w: 9,
      h: 1,
      fontSize: 34,
      bold: true,
      color: "F8FAFC"
    });

    let cursorY = titleY + 1.1;

    if (slide.subtitle) {
      pptSlide.addText(slide.subtitle, {
        x: 0.5,
        y: cursorY,
        w: 9,
        h: 0.6,
        fontSize: 20,
        color: "BAE6FD"
      });
      cursorY += 0.6;
    }

    if (slide.bullets?.length) {
      pptSlide.addText(
        slide.bullets.map((text) => `• ${text}`).join("\n"),
        {
          x: 0.7,
          y: cursorY + 0.1,
          w: 5.5,
          h: 4,
          fontSize: 18,
          color: "E2E8F0",
          lineSpacing: 20
        }
      );
    }

    if (slide.stats?.length) {
      const statX = 6.5;
      const statY = cursorY;
      slide.stats.forEach((stat, statIndex) => {
        const y = statY + statIndex * 1.4;
        pptSlide.addShape(pptx.ShapeType.roundRect, {
          x: statX,
          y,
          w: 3,
          h: 1.2,
          fill: { color: "0B1120" },
          line: { color: "22D3EE", width: 1 }
        });
        pptSlide.addText(stat.value, {
          x: statX + 0.2,
          y: y + 0.1,
          w: 2.6,
          h: 0.6,
          fontSize: 24,
          color: "22D3EE",
          bold: true
        });
        pptSlide.addText(stat.label, {
          x: statX + 0.2,
          y: y + 0.6,
          w: 2.6,
          h: 0.4,
          fontSize: 16,
          color: "E2E8F0"
        });
      });
    }

    if (slide.spotlight?.length) {
      const baseY = cursorY + 0.2;
      slide.spotlight.forEach((item, spotlightIndex) => {
        const x = 0.6 + spotlightIndex * 3;
        pptSlide.addShape(pptx.ShapeType.roundRect, {
          x,
          y: baseY,
          w: 2.7,
          h: 1.8,
          fill: { color: "0B1120" },
          line: { color: "0EA5E9", width: 1 }
        });
        pptSlide.addText(item.label.toUpperCase(), {
          x: x + 0.2,
          y: baseY + 0.2,
          w: 2.3,
          h: 0.3,
          fontSize: 12,
          color: "94A3B8",
          bold: true
        });
        pptSlide.addText(item.value, {
          x: x + 0.2,
          y: baseY + 0.5,
          w: 2.3,
          h: 0.7,
          fontSize: 22,
          bold: true,
          color: "22D3EE"
        });
        if (item.description) {
          pptSlide.addText(item.description, {
            x: x + 0.2,
            y: baseY + 1.2,
            w: 2.3,
            h: 0.4,
            fontSize: 12,
            color: "E2E8F0"
          });
        }
      });
    }

    if (slide.quote) {
      pptSlide.addShape(pptx.ShapeType.roundRect, {
        x: 0.7,
        y: 5,
        w: 8.6,
        h: 1.5,
        fill: { color: "0B1120" },
        line: { color: "0EA5E9", width: 1 }
      });
      pptSlide.addText(`“${slide.quote.text}”`, {
        x: 0.95,
        y: 5.15,
        w: 8.1,
        h: 0.8,
        fontSize: 18,
        italic: true,
        color: "E2E8F0"
      });
      pptSlide.addText(`${slide.quote.author}${slide.quote.role ? ` — ${slide.quote.role}` : ""}`, {
        x: 0.95,
        y: 5.8,
        w: 8.1,
        h: 0.4,
        fontSize: 14,
        color: "BAE6FD"
      });
    }

    if (slide.footer) {
      pptSlide.addText(slide.footer, {
        x: 0.5,
        y: 6.7,
        w: 9,
        h: 0.3,
        fontSize: 12,
        color: "94A3B8"
      });
    } else {
      pptSlide.addText(`Slide ${index + 1} of ${slides.length}`, {
        x: 0.5,
        y: 6.7,
        w: 9,
        h: 0.3,
        fontSize: 12,
        color: "1D4ED8"
      });
    }
  });

  pptx.writeFile({ fileName: "F-STSC-Department-Overview.pptx" });
}

export default function Page() {
  const slides = useSlideDeck();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSlide = slides[currentIndex];

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, index));
    setCurrentIndex(clamped);
  };

  const next = () => goTo(currentIndex + 1);
  const previous = () => goTo(currentIndex - 1);

  return (
    <main className="deck">
      <section className="viewport">
        <article className="slide">
          <header className="slide-header">
            <div>
              <span className="slide-kicker">{currentSlide.id.replace(/-/g, " ").toUpperCase()}</span>
              <h1>{currentSlide.title}</h1>
            </div>
            <div className="slide-index">
              {currentIndex + 1} / {slides.length}
            </div>
          </header>
          {currentSlide.subtitle && <h2 className="slide-subtitle">{currentSlide.subtitle}</h2>}
          {currentSlide.bullets && (
            <ul className="slide-bullets">
              {currentSlide.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {currentSlide.stats && (
            <div className="grid">
              {currentSlide.stats.map((stat) => (
                <div key={stat.label} className="stat">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          )}
          {currentSlide.spotlight && (
            <div className="spotlight">
              {currentSlide.spotlight.map((item) => (
                <div key={item.label} className="spotlight-item">
                  <span className="spotlight-label">{item.label}</span>
                  <span className="spotlight-value">{item.value}</span>
                  {item.description && <span className="spotlight-description">{item.description}</span>}
                </div>
              ))}
            </div>
          )}
          {currentSlide.quote && (
            <blockquote className="quote">
              <p>{currentSlide.quote.text}</p>
              <cite>
                {currentSlide.quote.author}
                {currentSlide.quote.role ? ` — ${currentSlide.quote.role}` : ""}
              </cite>
            </blockquote>
          )}
          {currentSlide.footer && <footer className="slide-footer">{currentSlide.footer}</footer>}
        </article>
      </section>
      <aside className="controls">
        <div className="control-row">
          <button type="button" onClick={previous} disabled={currentIndex === 0} className="nav-button">
            Prev
          </button>
          <button type="button" onClick={next} disabled={currentIndex === slides.length - 1} className="nav-button">
            Next
          </button>
        </div>
        <div className="timeline">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(index)}
              className={clsx("timeline-node", { active: index === currentIndex })}
              aria-label={`Go to ${slide.title}`}
            >
              <span className="timeline-tooltip">
                {index + 1}. {slide.title}
              </span>
            </button>
          ))}
        </div>
        <button type="button" className="download-button" onClick={() => generatePpt(slides)}>
          Download PPT
        </button>
      </aside>
      <style jsx>{`
        .deck {
          display: grid;
          grid-template-columns: minmax(0, 2fr) minmax(240px, 280px);
          gap: 2rem;
          padding: 2.5rem;
          width: min(1200px, 95vw);
          background: rgba(15, 23, 42, 0.75);
          border-radius: 28px;
          border: 1px solid rgba(56, 189, 248, 0.25);
          box-shadow: 0 20px 60px rgba(2, 6, 23, 0.65);
          backdrop-filter: blur(18px);
        }

        .viewport {
          background: linear-gradient(160deg, rgba(14, 116, 144, 0.25), rgba(14, 165, 233, 0.05));
          border-radius: 24px;
          padding: 1.8rem 2rem;
          border: 1px solid rgba(30, 64, 175, 0.35);
          position: relative;
          overflow: hidden;
        }

        .viewport::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, rgba(56, 189, 248, 0.35), transparent 60%);
          opacity: 0.55;
          pointer-events: none;
        }

        .slide {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .slide-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .slide-kicker {
          font-size: 0.75rem;
          letter-spacing: 0.22em;
          color: ${theme.textSecondary};
        }

        h1 {
          font-size: 2.6rem;
          color: ${theme.textPrimary};
        }

        .slide-index {
          font-size: 1rem;
          color: ${theme.accent};
          font-weight: 600;
        }

        .slide-subtitle {
          font-size: 1.35rem;
          font-weight: 500;
          color: ${theme.textSecondary};
        }

        .slide-bullets {
          margin: 0;
          padding-left: 1rem;
          display: grid;
          gap: 0.6rem;
          color: ${theme.textPrimary};
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
        }

        .stat {
          background: ${theme.surface};
          border-radius: 16px;
          border: 1px solid rgba(14, 165, 233, 0.2);
          padding: 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          min-height: 120px;
        }

        .stat-value {
          font-size: 1.7rem;
          font-weight: 700;
          color: ${theme.accent};
        }

        .stat-label {
          font-size: 0.95rem;
          color: ${theme.textSecondary};
        }

        .spotlight {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 1rem;
        }

        .spotlight-item {
          background: rgba(15, 23, 42, 0.7);
          border-radius: 18px;
          border: 1px solid rgba(34, 211, 238, 0.2);
          padding: 1rem;
        }

        .spotlight-label {
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          color: ${theme.textSecondary};
        }

        .spotlight-value {
          display: block;
          margin-top: 0.45rem;
          font-size: 1.4rem;
          font-weight: 600;
          color: ${theme.accent};
        }

        .spotlight-description {
          display: block;
          margin-top: 0.4rem;
          color: ${theme.textSecondary};
          font-size: 0.9rem;
        }

        .quote {
          background: rgba(15, 23, 42, 0.6);
          border-left: 3px solid ${theme.accentStrong};
          padding: 1.2rem 1.4rem;
          font-size: 1.05rem;
          color: ${theme.textPrimary};
          border-radius: 14px;
        }

        .quote cite {
          display: block;
          margin-top: 0.8rem;
          font-size: 0.9rem;
          color: ${theme.accent};
          font-style: normal;
        }

        .slide-footer {
          font-size: 0.9rem;
          color: ${theme.textSecondary};
          margin-top: auto;
        }

        .controls {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }

        .control-row {
          display: flex;
          gap: 0.8rem;
        }

        .nav-button,
        .download-button {
          flex: 1;
          padding: 0.85rem 1.2rem;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, ${theme.accent}, ${theme.accentStrong});
          color: #082f49;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .nav-button[disabled] {
          cursor: not-allowed;
          opacity: 0.35;
          background: rgba(148, 163, 184, 0.3);
          color: rgba(226, 232, 240, 0.6);
        }

        .nav-button:not([disabled]):hover,
        .download-button:hover {
          opacity: 0.85;
          transform: translateY(-2px);
        }

        .download-button {
          width: 100%;
          font-size: 1rem;
        }

        .timeline {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.6rem;
        }

        .timeline-node {
          height: 42px;
          border-radius: 999px;
          background: rgba(148, 163, 184, 0.16);
          border: 1px solid transparent;
          position: relative;
          cursor: pointer;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .timeline-node:hover {
          border-color: rgba(34, 211, 238, 0.4);
          transform: translateY(-1px);
        }

        .timeline-node.active {
          background: rgba(34, 211, 238, 0.28);
          border-color: ${theme.accent};
        }

        .timeline-tooltip {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          font-size: 0.75rem;
          color: ${theme.textSecondary};
          padding: 0.6rem;
          text-align: center;
        }

        @media (max-width: 960px) {
          .deck {
            grid-template-columns: 1fr;
            padding: 1.5rem;
          }

          .controls {
            flex-direction: column;
          }

          .timeline {
            grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
          }
        }
      `}</style>
    </main>
  );
}
