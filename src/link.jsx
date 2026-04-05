import { useEffect, useRef, useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');`;

const G = "#00ff41";

const css = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }

  body {
    background: #000;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    cursor: none;
    overflow-x: hidden;
  }

  /* Figma cursor */
  .cur {
    position: fixed;
    top: 0; left: 0;
    pointer-events: none;
    z-index: 9999;
    will-change: transform;
  }

  .cur-label {
    position: absolute;
    top: 20px; left: 12px;
    background: ${G};
    color: #000;
    font-family: 'Poppins', sans-serif;
    font-size: 10px;
    font-weight: 500;
    padding: 2px 8px 3px;
    border-radius: 0 5px 5px 5px;
    white-space: nowrap;
  }

  /* Layout */
  .wrap {
    max-width: 680px;
    margin: 0 auto;
    padding: 0 1.75rem;
  }

  /* Top bar */
  .bar {
    padding: 2rem 1.75rem;
    max-width: 680px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: #fff;
  }

  .logo img {
    height: 120px;
    width: auto;
    display: block;
  }

  .logo-dot {
    display: inline-block;
    width: 6px; height: 6px;
    background: ${G};
    border-radius: 50%;
    margin-left: 2px;
    vertical-align: middle;
    position: relative; top: -1px;
  }

  /* Hero */
  .hero {
    padding: 3.5rem 1.75rem 0;
    max-width: 680px;
    margin: 0 auto;
  }

  .hero h1 {
    font-size: clamp(2.4rem, 7vw, 4.5rem);
    font-weight: 600;
    line-height: 1.08;
    letter-spacing: -0.03em;
    color: #fff;
  }

  .hero h1 em {
    font-style: italic;
    font-weight: 300;
    position: relative;
    display: inline-block;
    color: #fff;
  }

  .hero h1 em::after {
    content: '';
    position: absolute;
    left: 0; bottom: 4px;
    width: 100%; height: 6px;
    background: ${G};
    z-index: -1;
    transform: scaleX(0);
    transform-origin: left;
    animation: ul 0.6s 0.7s cubic-bezier(0.16,1,0.3,1) forwards;
  }

  @keyframes ul { to { transform: scaleX(1); } }

  /* Body copy */
  .body {
    padding: 2.5rem 1.75rem 0;
    max-width: 680px;
    margin: 0 auto;
  }

  .line {
    font-size: clamp(1rem, 2.4vw, 1.2rem);
    font-weight: 300;
    line-height: 1.65;
    letter-spacing: -0.01em;
    color: #fff;
    margin-bottom: 0;
  }

  .line em { font-style: italic; font-weight: 400; }

  .hl {
    background: ${G};
    padding: 0 4px 1px;
    border-radius: 2px;
    font-style: normal;
  }

  .sep {
    width: 28px; height: 2px;
    background: ${G};
    margin: 1.8rem 0;
    border-radius: 2px;
  }

  /* Pills */
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: 'Poppins', sans-serif;
    font-size: 0.65em;
    font-weight: 500;
    padding: 3px 10px 4px;
    border-radius: 100px;
    text-decoration: none;
    letter-spacing: 0.01em;
    vertical-align: middle;
    position: relative; top: -2px;
    cursor: none;
    transition: opacity 0.2s;
  }

  .pill svg { width: 11px; height: 11px; flex-shrink: 0; }
  .pill:hover { opacity: 0.75; }

  .pill-dark { background: #fff; color: #000; }
  .pill-dark:hover { background: ${G}; color: #000; opacity: 1; }

  .pill-green { background: ${G}; color: #000; }

  /* Footer */
  footer {
    max-width: 680px;
    margin: 4rem auto 0;
    padding: 2rem 1.75rem 3rem;
    border-top: 1px solid #333;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .foot-cta {
    font-size: clamp(1.5rem, 4vw, 2.2rem);
    font-weight: 600;
    letter-spacing: -0.03em;
    color: #fff;
  }

  .foot-copy {
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #666;
  }

  /* Fade animation */
  .fade { opacity: 0; transform: translateY(18px); transition: opacity 0.65s ease, transform 0.65s ease; }
  .fade.in { opacity: 1; transform: none; }
  .fade.d1 { transition-delay: 0.05s; }
  .fade.d2 { transition-delay: 0.16s; }
  .fade.d3 { transition-delay: 0.28s; }
  .fade.d4 { transition-delay: 0.4s; }
`;

function useFade(ref) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return v;
}

function F({ children, d = 1, style = {} }) {
  const ref = useRef();
  const v = useFade(ref);
  return <div ref={ref} className={`fade d${d} ${v ? "in" : ""}`} style={style}>{children}</div>;
}

const Arrow = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 10L10 2M4 2h6v6" />
  </svg>
);

const Spotify = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.312a.748.748 0 01-1.03.25c-2.817-1.722-6.365-2.112-10.542-1.157a.748.748 0 01-.354-1.454c4.573-1.045 8.494-.595 11.675 1.332a.748.748 0 01.251 1.029zm1.472-3.27a.937.937 0 01-1.288.308C14.773 12.334 10.71 11.76 7.57 12.74a.937.937 0 01-.578-1.786c3.553-1.074 8.075-.554 11.2 1.598a.937.937 0 01.296 1.49zm.126-3.405C15.655 8.545 9.963 8.35 6.805 9.34a1.125 1.125 0 01-.692-2.14c3.641-1.142 9.682-.92 13.503 1.39a1.125 1.125 0 01-1.102 1.957z" />
  </svg>
);

const PORTFOLIO_URL = "https://www.behance.net/chukwudimark1";
const SPOTIFY_URL   = "https://open.spotify.com/artist/0ruSPUfDomJIG7UoC1rs2M";

export default function Portfolio() {
  const curRef = useRef();
  const pos = useRef({ x: -300, y: -300 });
  const raf = useRef();
  const logoUrl = '/logo.png';

  useEffect(() => {
    const mv = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", mv);
    const tick = () => {
      if (curRef.current) curRef.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px)`;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", mv); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <>
      <style>{FONTS}{css}</style>

      {/* Figma cursor */}
      <div ref={curRef} className="cur">
        <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
          <path d="M2.5 2.5L15.5 10L9.5 12L7 19.5L2.5 2.5Z" fill="#111" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
        <div className="cur-label">Mark</div>
      </div>

      {/* Top bar */}
      <div className="bar">
        <span className="logo"><img src={logoUrl} alt="Mark" /></span>
      </div>

      {/* Hero */}
      <div className="hero">
        <h1>Hi, I'm <em>Mark.</em></h1>
      </div>

      {/* Content */}
      <div className="body">

        <F d={1}>
          <p className="line">
            I'm a Brand Designer. I give brands, companies and startups unique identities —{" "}
            <a className="pill pill-dark" href={PORTFOLIO_URL} target="_blank" rel="noreferrer">
              see my portfolio <Arrow />
            </a>
          </p>
        </F>

        <div className="sep" />

        <F d={2}>
          <p className="line">
            When I'm not in figma creating brand projects, I'm in <span className="hl">VS Code</span> building cool apps and websites. Just love making things.
          </p>
        </F>

        <div className="sep" />

        <F d={3}>
          <p className="line">
           By the way, <em>The Dynamites.</em> They were really cool.{" "}
            <a className="pill pill-green" href={SPOTIFY_URL} target="_blank" rel="noreferrer">
              <Spotify /> Check them out
            </a>
          </p>
        </F>

      </div>

      <footer>
        <F d={4}><span className="foot-cta">Let's Create.</span></F>
        <span className="foot-copy">© {new Date().getFullYear()} markthecreator</span>
      </footer>
    </>
  );
}
