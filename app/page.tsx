"use client";

import { useEffect, useRef, useState } from "react";

const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden>
    <path d="M2 7h10m0 0L8 3m4 4L8 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowLine = () => (
  <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden>
    <path d="M1 5h16m0 0L13 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const Chevron = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Home() {
  const [caseIdx, setCaseIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Reveal-on-scroll
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const caseCount = 4;

  // Position the track so the active card is centered in the viewport
  useEffect(() => {
    const update = () => {
      const track = trackRef.current;
      if (!track) return;
      const card = track.querySelector<HTMLElement>(".case");
      const viewport = track.parentElement as HTMLElement | null;
      if (!card || !viewport) return;
      const cardW = card.offsetWidth;
      const vpW = viewport.offsetWidth;
      if (!cardW || !vpW) return;
      const gap = 24;
      const step = cardW + gap;
      const offset = vpW / 2 - cardW / 2 - caseIdx * step;
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
    };
    update();
    requestAnimationFrame(update);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [caseIdx]);

  const scrollToCase = (idx: number) => setCaseIdx(idx);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setCaseIdx((i) => (i + 1) % caseCount);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="n7">
      <div className="bg-grid" aria-hidden />
      <div className="bg-glow bg-glow--pink" aria-hidden />
      <div className="bg-glow bg-glow--blue" aria-hidden />
      <div className="bg-noise" aria-hidden />

      {/* NAV */}
      <header className="nav">
        <div className="nav__inner">
          <a href="#" className="logo" aria-label="N7">
            <span className="logo__mark">N7</span>
          </a>
          <nav className="nav__links" aria-label="Primary">
            <button className="nav__link">Solutions <Chevron /></button>
            <button className="nav__link">Resources <Chevron /></button>
            <a className="nav__link" href="#about">About Us</a>
          </nav>
          <div className="nav__cta">
            <a className="btn btn--ghost btn--sm" href="#demo">Request Demo</a>
            <button className="nav__burger" aria-label="Open menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <h1 className="reveal" style={{ ["--d" as string]: "80ms" } as React.CSSProperties}>
              The new foundation of modern banking
            </h1>
            <p className="lede reveal" style={{ ["--d" as string]: "200ms" } as React.CSSProperties}>
              We drive innovation and growth, provide seamless customer experience and operational excellence
            </p>
          </div>

          <div className="hero__visual reveal" style={{ ["--d" as string]: "240ms" } as React.CSSProperties}>
            <div className="visual-stage">
              <div className="visual-photo">
                <img src="/img/girl.jpg" alt="Person using mobile banking" />
              </div>

              <div className="float-card float-card--profile">
                <div className="float-card__row">
                  <div className="avatar"><span>TK</span></div>
                  <div>
                    <div className="float-card__name">Toni Kross</div>
                    <div className="float-card__sub">Good Morning</div>
                  </div>
                </div>
                <div className="fc-balance-label">Total balance</div>
                <div className="float-card__amount">
                  <span className="amount__cur">$</span>42,295<span className="amount__cents">.00</span>
                  <em className="amount__currency">USD</em>
                </div>
                <div className="float-card__actions">
                  <div className="fc-action">
                    <button aria-label="Transfer">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7m0 0H8m9 0v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    <span>Fund<br />Transfer</span>
                  </div>
                  <div className="fc-action">
                    <button aria-label="Add money">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                    </button>
                    <span>Add<br />Money</span>
                  </div>
                  <div className="fc-action">
                    <button aria-label="More">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
                        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
                        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
                        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </button>
                    <span>More</span>
                  </div>
                </div>
              </div>

              <div className="float-card float-card--activity">
                <div className="fc-activity-head">Recent activity</div>
                <div className="fc-chips">
                  <button className="chip">This Day</button>
                  <button className="chip chip--active">This Week</button>
                  <button className="chip">This Month</button>
                  <button className="chip">6 Month</button>
                </div>
                <div className="fc-tx-row">
                  <div className="tx-ico tx-ico--p">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7m0 0H8m9 0v9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <div>
                    <div className="tx-title">To Jin <span className="tx-sub-inline">· Work</span></div>
                    <div className="tx-sub">12 Jun 2022</div>
                  </div>
                  <div className="tx-amt">-$59</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container hero__cta hero__cta--standalone reveal">
          <a href="#demo" className="btn btn--primary">Request Demo</a>
          <a href="#contact" className="btn btn--ghost">Contact Us</a>
        </div>

        <div className="container trusted reveal">
          <span className="trusted__label">Trusted By:</span>
          <div className="trusted__row">
            <span className="brand">
              <svg className="brand__ico" viewBox="0 0 20 20" fill="none" aria-hidden>
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="10" cy="10" r="1.2" fill="currentColor" />
              </svg>
              SHELLS
            </span>
            <span className="brand">
              <svg className="brand__ico" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M10 2L3 5v5c0 4 3 7 7 8 4-1 7-4 7-8V5l-7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              SmartFinder
            </span>
            <span className="brand">
              <svg className="brand__ico" viewBox="0 0 20 20" fill="none" aria-hidden>
                <circle cx="10" cy="10" r="8.4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 4l-4 7h3l-1 5 4-7h-3l1-5z" fill="currentColor" />
              </svg>
              Zoomerr
            </span>
            <span className="brand">
              <svg className="brand__ico" viewBox="0 0 22 20" fill="none" aria-hidden>
                <path d="M2 16L7 4l3.5 8L14 4l5 12" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
              ArtVenue
            </span>
            <span className="brand">
              <svg className="brand__ico" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M10 2L2 10l8 8 8-8-8-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M10 2v16M2 10h8" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 2L2 10l8 8z" fill="currentColor" fillOpacity=".55" />
              </svg>
              kontrastr
            </span>
            <span className="brand">
              <svg className="brand__ico" viewBox="0 0 22 20" fill="none" aria-hidden>
                <path d="M2 10c2-4 4-4 6 0s4 4 6 0 4-4 6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M2 14c2-4 4-4 6 0s4 4 6 0 4-4 6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".55" />
              </svg>
              WAVESMARATHON
            </span>
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="solutions" id="solutions">
        <div className="container solutions__grid">
          <aside className="solutions__intro reveal">
            <p className="kicker">— Our offerings</p>
            <h2>All of our solutions are tailor-made to your needs.</h2>
            <a href="#demo" className="btn btn--ghost btn--wide">Request Demo</a>
            <div className="orbit" aria-hidden>
              <div className="orbit__ring" />
              <div className="orbit__ring orbit__ring--2" />
              <div className="orbit__dot" />
            </div>
          </aside>

          <div className="solutions__cards">
            <article className="sol-card reveal">
              <div className="sol-card__icon">
                <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.2" /><circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.2" /><path d="M20 6v28M6 20h28" stroke="currentColor" strokeWidth="1.2" /></svg>
              </div>
              <h3>Core Banking <span className="mono">CB7</span></h3>
              <p>CB7 helps your financial institution improve the client experience, automate and optimize procedures, simplify banking operations for your employees, improve risk management, increase productivity, and ensure full regulatory compliance.</p>
              <a href="#" className="more-link">Learn More <ArrowLine /></a>
            </article>

            <article className="sol-card reveal" style={{ ["--d" as string]: "80ms" } as React.CSSProperties}>
              <div className="sol-card__icon">
                <svg viewBox="0 0 40 40" fill="none"><path d="M8 20l12-12 12 12-12 12L8 20z" stroke="currentColor" strokeWidth="1.2" /><path d="M14 20l6-6 6 6-6 6-6-6z" stroke="currentColor" strokeWidth="1.2" /></svg>
              </div>
              <h3>Digital Banking <span className="mono">N7</span></h3>
              <p>N7 brings full capabilities across strategy, human-centred design, operations, engineering and data science to create and deliver disruptive innovation. Our approach to building digital banks is specifically designed to help clients.</p>
              <a href="#" className="more-link">Learn More <ArrowLine /></a>
            </article>

            <article className="sol-card reveal">
              <div className="sol-card__icon">
                <svg viewBox="0 0 40 40" fill="none"><path d="M8 8l24 24M32 8L8 32" stroke="currentColor" strokeWidth="1.2" /><circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="1.2" /></svg>
              </div>
              <h3>Open Banking</h3>
              <p>Our API banking helps you to gain actionable insights, enable account aggregation, streamline customer onboarding, KYC, and payment initiation, offer predictive budgeting tools, and introduce enhanced credit scoring.</p>
              <a href="#" className="more-link">Learn More <ArrowLine /></a>
            </article>

            <article className="sol-card reveal" style={{ ["--d" as string]: "80ms" } as React.CSSProperties}>
              <span className="tag">NBFC</span>
              <div className="sol-card__icon">
                <svg viewBox="0 0 40 40" fill="none"><path d="M20 5l13 7.5v15L20 35 7 27.5v-15L20 5z" stroke="currentColor" strokeWidth="1.2" /><path d="M20 5v30M7 12.5l26 15M33 12.5l-26 15" stroke="currentColor" strokeWidth="1.2" /></svg>
              </div>
              <h3>Loan Origination System</h3>
              <p>N7 brings full capabilities across strategy, human-centred design, operations, engineering and data science to create and deliver disruptive innovation. Our approach to building digital banks is specifically designed to help clients.</p>
              <a href="#" className="more-link">Learn More <ArrowLine /></a>
            </article>

            <article className="sol-card reveal">
              <span className="tag">NBFC</span>
              <div className="sol-card__icon">
                <svg viewBox="0 0 40 40" fill="none"><path d="M6 14l14-8 14 8M6 14l14 8 14-8M6 14v12l14 8M34 14v12l-14 8" stroke="currentColor" strokeWidth="1.2" /></svg>
              </div>
              <h3>Loan Management System</h3>
              <p>N7 brings full capabilities across strategy, human-centred design, operations, engineering and data science to create and deliver disruptive innovation. Our approach to building digital banks is specifically designed to help clients.</p>
              <a href="#" className="more-link">Learn More <ArrowLine /></a>
            </article>
          </div>
        </div>
      </section>

      {/* CB7 */}
      <section className="cb7" id="cb7">
        <div className="cb7__watermark" aria-hidden>CB7</div>

        <div className="container cb7__top">
          <div className="cb7__copy reveal">
            <p className="kicker">— Core Banking CB7</p>
            <h2>A complete cloud-based core banking platform solution.</h2>
            <p className="lede underline-soft">Faster time to market with our cloud-based core banking services.</p>
            <div className="cb7__cta">
              <a className="btn btn--primary" href="#demo">Request Demo</a>
              <a className="more-link" href="#">Learn More <ArrowLine /></a>
            </div>
          </div>

          <div className="laptop reveal">
            <div className="laptop__lid">
              <div className="laptop__screen">
                <img src="/img/dash.png" alt="AML Dashboard" />
                <div className="laptop__glare" aria-hidden />
              </div>
              <div className="laptop__camera" aria-hidden />
            </div>
            <div className="laptop__base">
              <div className="laptop__hinge" aria-hidden />
              <div className="laptop__notch" aria-hidden />
            </div>
          </div>
        </div>

        <div className="container cb7__bottom">
          <div className="laptop laptop--turn reveal">
            <div className="laptop__lid">
              <div className="laptop__screen">
                <img src="/img/dash2.png" alt="KYC Dashboard" />
                <div className="laptop__glare" aria-hidden />
              </div>
              <div className="laptop__camera" aria-hidden />
            </div>
            <div className="laptop__base">
              <div className="laptop__hinge" aria-hidden />
              <div className="laptop__notch" aria-hidden />
            </div>
          </div>

          <div className="features reveal">
            <h3>Run a more efficient, flexible, and digitally connected corebanking system</h3>
            <p className="features__hint mono">What you will get:</p>
            <ul className="features__list">
              <li><span className="check" />Customer-On Boarding</li>
              <li><span className="check" />CRM Activities</li>
              <li><span className="check" />Managing deposits and withdrawals</li>
              <li><span className="check" />Configuring New Banking Products</li>
              <li><span className="check" />Transaction management</li>
              <li><span className="check" />Loan disbursal and Loan management</li>
              <li><span className="check" />Interest Calculation</li>
              <li><span className="check" />Establishing criteria for minimum balances, interest rates, number of withdrawals allowed.</li>
              <li><span className="check" />Payments processing (cash, cheques, mandates, NEFT, RTGS etc)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cta-band">
        <div className="container">
          <div className="cta-card reveal">
            <div className="cta-card__wm" aria-hidden>CB7</div>
            <div className="cta-card__copy">
              <h3>Take the full advantage of going paper-less now.</h3>
              <p>CB7 helps your financial institution improve the client experience, automate and optimize procedures, simplify banking operations.</p>
            </div>
            <div className="cta-card__actions">
              <a className="btn btn--ghost" href="#contact">Contact Us</a>
              <a className="btn btn--primary" href="#demo">Request Demo</a>
            </div>
          </div>
        </div>
      </section>

      {/* DIGITAL BANKING (light) */}
      <section className="digital">
        <div className="marquee" aria-hidden>
          <div className="marquee__track">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} style={{ display: "contents" }}>
                <span>{i % 2 === 0 ? "N7" : "CB7"}</span>
                <span className="wave">👋</span>
                <span>Say</span>
                <span>to the new way of banking</span>
                <span className="dot-sep">✷</span>
              </span>
            ))}
          </div>
        </div>

        <div className="container digital__layout">
          <aside className="digital__intro reveal">
            <p className="kicker dark">— Digital Banking N7</p>
            <h2 className="dark">Digital banking<br />out-of-the-box.</h2>
            <p className="digital__intro-lede">N7 helps your financial institution improve the client experience, automate and optimize procedures.</p>
            <div className="digital__intro__cta">
              <a href="#demo" className="btn btn--primary">Request Demo</a>
              <a href="#" className="more-link digital__intro-more">Learn More
                <svg width="18" height="10" viewBox="0 0 18 10" fill="none"><path d="M1 5h16m0 0L13 1m4 4l-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
              </a>
            </div>
          </aside>

          <div className="digital__rows">
          <div className="d-row reveal">
            <div className="phone">
              <div className="phone__notch" />
              <div className="phone__screen phone__screen--white">
                {/* Bar chart card */}
                <div className="ps-card">
                  <div className="ps-card__head">
                    <div>
                      <div className="ps-card__sub">March 2022</div>
                      <div className="ps-card__amount">$8,295<em>.00 USD</em></div>
                    </div>
                    <button className="ps-month">M
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 3.5L5 7l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                    </button>
                  </div>

                  <div className="ps-bars-row">
                    {[
                      { m: "Jan", h: 60, on: false },
                      { m: "Feb", h: 70, on: false },
                      { m: "Mar", h: 100, on: true },
                      { m: "Apr", h: 55, on: false },
                      { m: "May", h: 80, on: false },
                      { m: "Jun", h: 65, on: false },
                    ].map((b, i) => (
                      <div key={i} className="ps-bar-col">
                        <div className={`ps-bar ${b.on ? "ps-bar--on" : ""}`} style={{ height: `${b.h}%` }} />
                        <span className="ps-bar-label">{b.m}</span>
                      </div>
                    ))}
                  </div>

                  <div className="ps-card__split">
                    <div className="ps-split-item">
                      <span className="ps-split-ico"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 9l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                      <div>
                        <div className="ps-split-label">Income</div>
                        <div className="ps-split-val">$453.00</div>
                      </div>
                    </div>
                    <div className="ps-split-divider" />
                    <div className="ps-split-item">
                      <span className="ps-split-ico"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                      <div>
                        <div className="ps-split-label">Spend</div>
                        <div className="ps-split-val">$453.00</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent activity */}
                <div className="ps-activity">
                  <div className="ps-activity__head">Recent activity</div>
                  <div className="ps-activity__chips">
                    <button className="ps-chip">This Day</button>
                    <button className="ps-chip ps-chip--on">This Week</button>
                    <button className="ps-chip">This Month</button>
                    <button className="ps-chip">6 Month</button>
                  </div>
                  <div className="ps-row">
                    <span className="ps-row__ico ps-row__ico--out">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 10L10 4m0 0H5m5 0v5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <div className="ps-row__body">
                      <div className="ps-row__title">To Jin <span className="ps-row__sub-in">· Work</span></div>
                      <div className="ps-row__date">12 Jun 2022</div>
                    </div>
                    <div className="ps-row__amt">-$59</div>
                  </div>
                  <div className="ps-row">
                    <span className="ps-row__ico ps-row__ico--in">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10 4L4 10m0 0h5m-5 0V5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <div className="ps-row__body">
                      <div className="ps-row__title">From Google <span className="ps-row__sub-in">· Salary</span></div>
                      <div className="ps-row__date">10 Jun 2022</div>
                    </div>
                    <div className="ps-row__amt ps-row__amt--pos">+$859</div>
                  </div>
                </div>

                {/* Bottom nav */}
                <div className="ps-nav">
                  <div className="ps-nav__item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 11l9-7 9 7v9a2 2 0 01-2 2h-4v-7h-6v7H5a2 2 0 01-2-2v-9z" stroke="currentColor" strokeWidth="1.5" /></svg>
                    <span>Home</span>
                  </div>
                  <div className="ps-nav__item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3 10h18" stroke="currentColor" strokeWidth="1.5" /></svg>
                    <span>Card</span>
                  </div>
                  <div className="ps-nav__item ps-nav__item--on">
                    <span className="ps-nav__pill">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 8h14m0 0l-3-3m3 3l-3 3M20 16H6m0 0l3 3m-3-3l3-3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <span>Transaction</span>
                  </div>
                  <div className="ps-nav__item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.5" /></svg>
                    <span>Profile</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-copy">
              <h4>Fully compliant with regulatory requirement</h4>
              <ul className="ticks">
                <li>Pre-integrated Security System</li>
                <li>Fully Compliant With Regulatory Requirement</li>
                <li>Digitally Connected Core</li>
              </ul>
            </div>
          </div>

          {/* Phone 2 — Home: balance + actions + transactions + bottom nav */}
          <div className="d-row d-row--rev reveal">
            <div className="phone">
              <div className="phone__notch" />
              <div className="phone__screen phone__screen--white">
                {/* Header row: avatar + name + bell */}
                <div className="ps-home__head">
                  <div className="ps-home__avatar" />
                  <div className="ps-home__id">
                    <div className="ps-home__name">Toni Kross</div>
                    <div className="ps-home__greet">Good Morning</div>
                  </div>
                  <button className="ps-home__bell">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M6 8a6 6 0 1112 0v5l1.5 2h-15L6 13V8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M10 19a2 2 0 004 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                  </button>
                </div>

                {/* Balance */}
                <div className="ps-home__balance">
                  <div className="ps-home__bal-label">Total balance</div>
                  <div className="ps-home__bal-amt">$42,295<em>.00 USD</em></div>
                </div>

                <div className="ps-home__divider" />

                {/* Actions */}
                <div className="ps-home__actions">
                  <div className="ps-home__action">
                    <span className="ps-home__btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4m-18 5l9 4 9-4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg></span>
                    <span>Fund Transfer</span>
                  </div>
                  <div className="ps-home__action">
                    <span className="ps-home__btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" /><path d="M12 8v8m-3-3l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                    <span>Add Money</span>
                  </div>
                  <div className="ps-home__action">
                    <span className="ps-home__btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" /><rect x="14" y="4" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" /><rect x="4" y="14" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" /><rect x="14" y="14" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" /></svg></span>
                    <span>More</span>
                  </div>
                </div>

                {/* Recent activity */}
                <div className="ps-activity ps-activity--home">
                  <div className="ps-activity__head">Recent activity</div>
                  <div className="ps-row">
                    <span className="ps-row__ico ps-row__ico--out"><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M4 10L10 4m0 0H5m5 0v5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                    <div className="ps-row__body"><div className="ps-row__title">To Jin <span className="ps-row__sub-in">· Work</span></div><div className="ps-row__date">12 Jun 2022</div></div>
                    <div className="ps-row__amt">-$59</div>
                  </div>
                  <div className="ps-row">
                    <span className="ps-row__ico ps-row__ico--in"><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M10 4L4 10m0 0h5m-5 0V5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                    <div className="ps-row__body"><div className="ps-row__title">From Google <span className="ps-row__sub-in">· Salary</span></div><div className="ps-row__date">10 Jun 2022</div></div>
                    <div className="ps-row__amt">+$859</div>
                  </div>
                </div>

                <div className="ps-nav">
                  <div className="ps-nav__item ps-nav__item--on"><span className="ps-nav__pill"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 11l9-7 9 7v9a2 2 0 01-2 2h-4v-7h-6v7H5a2 2 0 01-2-2v-9z" stroke="#fff" strokeWidth="1.6" /></svg></span><span>Home</span></div>
                  <div className="ps-nav__item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3 10h18" stroke="currentColor" strokeWidth="1.5" /></svg><span>Card</span></div>
                  <div className="ps-nav__item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 8h14m0 0l-3-3m3 3l-3 3M20 16H6m0 0l3 3m-3-3l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg><span>Transaction</span></div>
                  <div className="ps-nav__item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.5" /></svg><span>Profile</span></div>
                </div>
              </div>
            </div>
            <div className="d-copy">
              <h4>No legacy IT systems</h4>
              <p>Our Digital Banking solutions are multilayered beyond the dimensional instructions taking advantage of digital transformation by ensuring customers trust and integrity by conclusion.</p>
              <ul className="ticks">
                <li>Adaptive &amp; Intelligent API architecture</li>
                <li>Ambient User Experience</li>
                <li>Cloud-native: Will lower TCO</li>
              </ul>
            </div>
          </div>

          {/* Phone 3 — Profile */}
          <div className="d-row reveal">
            <div className="phone">
              <div className="phone__notch" />
              <div className="phone__screen phone__screen--white">
                <div className="ps-profile">
                  <div className="ps-profile__avatar" />
                  <div className="ps-profile__name">Toni Kross</div>
                  <div className="ps-profile__email">tonikross@gmail.com</div>
                </div>
                <div className="ps-profile__list">
                  <div className="ps-prof-row"><span className="ps-prof-ico ps-prof-ico--1" />Personal Info<span className="ps-prof-arrow">›</span></div>
                  <div className="ps-prof-row"><span className="ps-prof-ico ps-prof-ico--2" />Security<span className="ps-prof-arrow">›</span></div>
                  <div className="ps-prof-row"><span className="ps-prof-ico ps-prof-ico--3" />Notifications<span className="ps-prof-arrow">›</span></div>
                  <div className="ps-prof-row"><span className="ps-prof-ico ps-prof-ico--4" />Support<span className="ps-prof-arrow">›</span></div>
                  <div className="ps-prof-row"><span className="ps-prof-ico ps-prof-ico--5" />Sign out<span className="ps-prof-arrow">›</span></div>
                </div>
                <div className="ps-nav">
                  <div className="ps-nav__item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 11l9-7 9 7v9a2 2 0 01-2 2h-4v-7h-6v7H5a2 2 0 01-2-2v-9z" stroke="currentColor" strokeWidth="1.5" /></svg><span>Home</span></div>
                  <div className="ps-nav__item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3 10h18" stroke="currentColor" strokeWidth="1.5" /></svg><span>Card</span></div>
                  <div className="ps-nav__item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 8h14m0 0l-3-3m3 3l-3 3M20 16H6m0 0l3 3m-3-3l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg><span>Transaction</span></div>
                  <div className="ps-nav__item ps-nav__item--on"><span className="ps-nav__pill"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#fff" strokeWidth="1.6" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#fff" strokeWidth="1.6" /></svg></span><span>Profile</span></div>
                </div>
              </div>
            </div>
            <div className="d-copy">
              <h4>No traditional branches</h4>
              <p>Our Digital Banking out-of-the-box helps you to accelerate innovations while reducing then and optimising operational costs for a seamless data driven experience.</p>
              <ul className="ticks">
                <li>Branchless &amp; Paperless Banking</li>
                <li>Digital Transformation Capability</li>
                <li>Optimized, Adaptable and Scalable</li>
              </ul>
            </div>
          </div>
          </div>
        </div>

        <div className="container">
          <div className="cta-card reveal">
            <div className="cta-card__wm" aria-hidden>CB7</div>
            <div className="cta-card__copy">
              <h3>Take the full advantage of going paper-less now.</h3>
              <p>N7 helps your financial institution improve the client experience, automate and optimize procedures, simplify banking operations.</p>
            </div>
            <div className="cta-card__actions">
              <a className="btn btn--ghost" href="#contact">Contact Us</a>
              <a className="btn btn--primary" href="#demo">Request Demo</a>
            </div>
          </div>
        </div>

      </section>

      {/* INSIGHTS */}
      <section className="insights" id="insights">
        <div className="container insights__head">
          <div className="reveal">
            <p className="kicker">— Insights</p>
            <h2>Get yourself up-to-speed<br />on all the things happening<br />in fintech.</h2>
            <a href="#" className="btn btn--ghost">Insights</a>
          </div>
          <div className="insights__grid">
            <article className="article-card reveal">
              <div className="article-card__art art--1" />
              <span className="article-card__meta mono">Article · 5 min</span>
              <h4>How to transition from a traditional to a digital bank</h4>
              <a href="#" className="more-link">Read Now <ArrowLine /></a>
            </article>
            <article className="article-card reveal" style={{ ["--d" as string]: "80ms" } as React.CSSProperties}>
              <div className="article-card__art art--2" />
              <span className="article-card__meta mono">Article · 7 min</span>
              <h4>How to transition from a traditional to a digital bank</h4>
              <a href="#" className="more-link">Read Now <ArrowLine /></a>
            </article>
            <article className="article-card article-card--wide reveal">
              <div className="article-card__art art--3" />
              <div>
                <span className="article-card__meta mono">Article · 4 min</span>
                <h4 style={{ marginTop: 12, marginBottom: 14 }}>How to transition from a traditional to a digital bank</h4>
                <a href="#" className="more-link">Read Now <ArrowLine /></a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="cases">
        <div className="container">
          <p className="kicker center">— Featured work</p>
          <h2 className="center">Our Case Studies</h2>
          <div className="cases__viewport">
            <div className="cases__track" ref={trackRef}>
              {[
                { num: "01", title: "How we help brand reach out to more people", brand: "Zoomerr" },
                { num: "02", title: "Re-architecting a 40-year-old core in 9 months", brand: "Nordia" },
                { num: "03", title: "Launching a neo-bank for SMEs in 6 markets", brand: "Kaivo" },
                { num: "04", title: "Mobile-first KYC for a 5M-customer rollout", brand: "Examen" },
              ].map((c, i) => (
                <article className={`case ${i === caseIdx ? "case--active" : ""}`} key={i}>
                  <div className="case__inner">
                    <div className="case__art">
                      <div className="case__art-grid">
                        <span /><span /><span /><span />
                      </div>
                      <div className="case__art-label mono">Case Study</div>
                    </div>
                    <div className="case__body">
                      <span className="case__num mono">Feature Studies</span>
                      <h4>{c.title}</h4>
                      <div className="case__brand">
                        <span className="case__brand-ico" />
                        {c.brand}
                      </div>
                      <a href="#" className="btn btn--ghost btn--block">Read More</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="cases__nav">
            <button onClick={() => scrollToCase((caseIdx - 1 + caseCount) % caseCount)} aria-label="Previous">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <span className="cases__dots">
              {Array.from({ length: caseCount }).map((_, i) => (
                <i key={i} className={i === caseIdx ? "active" : ""} onClick={() => scrollToCase(i)} />
              ))}
            </span>
            <button onClick={() => scrollToCase((caseIdx + 1) % caseCount)} aria-label="Next">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <a href="#" className="cases__viewall">View All →</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" id="about">
        <div className="container footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">N7</div>
          </div>

          <div className="footer__right">
            <div className="footer__offices">
              <div>
                <p className="footer__office-city">London</p>
                <address>Linkria Infosystems Ltd – CB7,<br />26 Main Road Sundridge,<br />TN18 6EH,<br />England, United Kingdom.</address>
              </div>
              <div>
                <p className="footer__office-city">Dubai</p>
                <address>Linkria Infosystems Ltd –<br />Linkria Infosystems Business,<br />Center 5-Cluster W,<br />Jumeirah Lakes Towers,<br />Dubai, United Arab Emirates</address>
              </div>
              <div>
                <p className="footer__office-city">Pune</p>
                <address>Linkria Infosystems Ltd –<br />CB7/ Nirmal, Anand Nagar,<br />Sunrity Road, Pune,<br />Maharashtra, 411041, India</address>
              </div>
            </div>

            <div className="footer__links">
              <div>
                <p className="footer__col-title">Solutions</p>
                <ul>
                  <li><a href="#">Core Banking CB7 <span>→</span></a></li>
                  <li><a href="#">Digital Banking N7 <span>→</span></a></li>
                  <li><a href="#">Open Banking <span>→</span></a></li>
                  <li><a href="#">Loan Origination System <span>→</span></a></li>
                  <li><a href="#">Loan Management System <span>→</span></a></li>
                  <li><a href="#">Digital Transformation <span>→</span></a></li>
                </ul>
              </div>
              <div>
                <p className="footer__col-title">N7 Banking</p>
                <ul>
                  <li><a href="#">About Us <span>→</span></a></li>
                  <li><a href="#">Solutions <span>→</span></a></li>
                  <li><a href="#">Contact <span>→</span></a></li>
                  <li><a href="#">Company <span>→</span></a></li>
                  <li><a href="#">Careers <span>→</span></a></li>
                  <li><a href="#">Insights <span>→</span></a></li>
                  <li><a href="#">Core Team <span>→</span></a></li>
                  <li><a href="#">Brand Center <span>→</span></a></li>
                </ul>
              </div>
              <div>
                <p className="footer__col-title">Our Socials</p>
                <ul>
                  <li><a href="#">LinkedIn <span>→</span></a></li>
                  <li><a href="#">X <span>→</span></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="container footer__base">
          <p>Copyright © 2026 by Linkria Infosystems Limited — (CB7 and N7 are Commercial Brands) — (Registered under the Companies Act 2006 in England and Wales) Number of Incorporation 13265921</p>
        </div>
      </footer>
    </div>
  );
}
