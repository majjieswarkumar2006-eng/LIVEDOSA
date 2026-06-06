"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  // Reveal animations on scroll
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal-element");

    const revealOnScroll = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // Trigger only once
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    revealElements.forEach((element) => {
      revealOnScroll.observe(element);
    });

    // Trigger reveal for first elements instantly
    const timer = setTimeout(() => {
      const heroContent = document.querySelector(".hero-content");
      const heroVisual = document.querySelector(".hero-visual");
      if (heroContent) heroContent.classList.add("active");
      if (heroVisual) heroVisual.classList.add("active");
    }, 100);

    return () => {
      revealOnScroll.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // Modal & Simulation states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPlanName, setModalPlanName] = useState("");
  const [activeTab, setActiveTab] = useState("form"); // "form" | "simulation"

  // Simulator states
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(180);
  const [status, setStatus] = useState("Preparing Launch...");
  const [subtext, setSubtext] = useState("Baking dosa golden-crispy on AI induction Tawa...");
  const [droneLeft, setDroneLeft] = useState(10);
  const [isArrived, setIsArrived] = useState(false);

  // Form states
  const [selectedDosa, setSelectedDosa] = useState("Classic Masala Dosa");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [extraCrispy, setExtraCrispy] = useState(true);
  const [extraGunpowder, setExtraGunpowder] = useState(true);
  const [doubleChutney, setDoubleChutney] = useState(false);

  // Open & Close modal
  const openOrderModal = (planName = "") => {
    setIsModalOpen(true);
    setActiveTab("form");
    setModalPlanName(planName);
  };

  const closeOrderModal = () => {
    setIsModalOpen(false);
  };

  // Close modal on overlay click
  const handleOverlayClick = (e) => {
    if (e.target.id === "orderModal") {
      closeOrderModal();
    }
  };

  // Run Simulation when activeTab switches to "simulation"
  useEffect(() => {
    if (activeTab !== "simulation" || !isModalOpen) return;

    // Reset simulator state variables
    setProgress(0);
    setCountdown(180);
    setStatus("Preparing Launch...");
    setSubtext("Baking dosa golden-crispy on AI induction Tawa...");
    setDroneLeft(10);
    setIsArrived(false);

    const statusStages = [
      { limit: 20, status: "Preparing Tawa...", subtext: "Spreading organic batter & high-grade ghee..." },
      { limit: 40, status: "Crisping Chamber active", subtext: "Locking dosa into CrispHull™ thermal shield..." },
      { limit: 60, status: "Injecting Cartridges", subtext: "Injected fresh coconut chutney, tomato dip & sambar..." },
      { limit: 80, status: "Clearance Granted", subtext: "Rotor blade acceleration sequence initiated..." },
      { limit: 100, status: "IN FLIGHT", subtext: "En-route. Evading signal towers and routing through corridors..." }
    ];

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = Math.min(prevProgress + 1.5, 100);

        // Find stage
        const currentStage = statusStages.find((stage) => nextProgress <= stage.limit) || statusStages[statusStages.length - 1];

        if (nextProgress >= 100) {
          clearInterval(interval);
          setStatus("ARRIVED");
          setSubtext("Drone hovering at balcony! Payload released. Enjoy!");
          setCountdown(0);
          setIsArrived(true);
          return 100;
        }

        setStatus(currentStage.status);
        setSubtext(currentStage.subtext);

        if (nextProgress >= 80) {
          setCountdown((prevCountdown) => {
            const nextCountdown = prevCountdown - 2;
            return nextCountdown < 0 ? 0 : nextCountdown;
          });

          // Drone map interpolation between 10% and 90%
          const mapPercentage = 10 + ((nextProgress - 80) / 20) * 80;
          setDroneLeft(mapPercentage);
        }

        return nextProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [activeTab, isModalOpen]);

  // Start simulation on form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setActiveTab("simulation");
  };

  // Determine dynamic styles for status badge in simulator
  let statusBadgeStyle = {
    background: "rgba(0, 240, 255, 0.1)",
    borderColor: "rgba(0, 240, 255, 0.2)",
    color: "var(--accent)",
  };

  if (isArrived) {
    statusBadgeStyle = {
      background: "rgba(0, 255, 100, 0.1)",
      borderColor: "rgba(0, 255, 100, 0.2)",
      color: "#00FF64",
    };
  } else if (progress < 80) {
    statusBadgeStyle = {
      background: "rgba(255, 107, 0, 0.1)",
      borderColor: "rgba(255, 107, 0, 0.2)",
      color: "var(--primary)",
    };
  }

  return (
    <>
      {/* Ambient Glow effects */}
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>
      <div className="ambient-glow-3"></div>

      {/* Navigation */}
      <header>
        <div className="container nav-container">
          <a href="#" className="logo" id="navLogo">
            {/* Drone / Dosa SVG Mascot */}
            <svg className="logo-icon" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" stroke="var(--primary)" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="2" y1="12" x2="22" y2="12" stroke="var(--accent)" strokeWidth="2" />
              <line x1="12" y1="2" x2="12" y2="22" stroke="var(--accent)" strokeWidth="2" />
              <path d="M7 8 L12 4 L17 8" stroke="var(--secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Air<span style={{ color: "var(--primary)" }}>Dosa</span></span>
          </a>
          
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
          </ul>

          <div className="nav-cta">
            <a href="#pricing" className="btn btn-secondary">Pricing Plans</a>
            <button className="btn btn-primary" onClick={() => openOrderModal()} id="navOrderBtn">Order Now</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="heroSection">
        <div className="container hero-grid">
          <div className="hero-content reveal-element">
            <div className="hero-badge">
              <span></span>AI-Autopilot Active
            </div>
            <h1 className="hero-title">
              Piping Hot Dosas.<br />
              <span className="gradient-text">Delivered via AI Drone</span><br />
              in 180 Seconds.
            </h1>
            <p className="hero-tagline">
              Experience the aerospace upgrade to South Indian breakfast. Our state-of-the-art AI-guided drone fleet guarantees golden-crisp dosas fly straight from our tawas to your balcony, keeping the crunch 100% intact.
            </p>
            <div className="hero-ctas">
              <button className="btn btn-primary" onClick={() => openOrderModal()} id="heroOrderBtn">Instant Flight Launch</button>
              <a href="#features" className="btn btn-secondary">Explore Engineering</a>
            </div>
            <div className="hero-rating">
              <div className="rating-stars">★★★★★</div>
              <div className="rating-text">Loved by 15,000+ techies in Bengaluru, Chennai & Hyderabad</div>
            </div>
          </div>
          <div className="hero-visual reveal-element">
            <div className="hero-image-container">
              <Image src="/airdosa_hero.png" alt="AirDosa drone carrying dosa illustration" className="hero-image" id="heroImg" width={480} height={480} priority />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-header reveal-element">
            <h2>The Aerospace Kitchen</h2>
            <p>We didn&apos;t just build a delivery system. We re-engineered the thermodynamic structure of South Indian cuisine.</p>
          </div>
          <div className="features-grid">
            {/* Feature Card 1 */}
            <div className="feature-card glass-panel reveal-element" id="featCard1">
              <div className="feature-icon-wrapper">
                {/* Heat / Fire Shield Icon */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072 2.143-.224 4 1.5 5.5z" fill="currentColor" />
                  <path d="M15.5 14.5A2.5 2.5 0 0 0 13 12c0-1.38.5-2 1-3 1.072 2.143.224 4-1.5 5.5z" fill="currentColor" />
                </svg>
              </div>
              <h3>CrispHull™ Thermal Capsule</h3>
              <p>Every drone carries a pressurized, aerogel-insulated chamber heated to exactly 72°C. Relative humidity is dynamically purged to ensure your dosa is never soggy, arriving with its signature golden crunch.</p>
            </div>

            {/* Feature Card 2 */}
            <div className="feature-card glass-panel reveal-element" id="featCard2">
              <div className="feature-icon-wrapper">
                {/* Navigation / Drone Path Icon */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2" />
                  <circle cx="16" cy="6" r="3" />
                  <circle cx="18" cy="18" r="3" />
                </svg>
              </div>
              <h3>AI-Tawa™ Route Planning</h3>
              <p>Our deep-learning autopilot processes thousands of micro-weather systems, bird migratory patterns, and skyscraper obstacles in real-time. It maps the shortest three-dimensional trajectory, bypassing peak road traffic entirely.</p>
            </div>

            {/* Feature Card 3 */}
            <div className="feature-card glass-panel reveal-element" id="featCard3">
              <div className="feature-icon-wrapper">
                {/* Sparkles/Layers Cartridge Icon */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3>Triple-Jet Chutney Injector</h3>
              <p>Drones are loaded with sealed, hygienic cartridges of coconut chutney, spiced tomato chutney, and piping hot sambar. The dynamic cargo bay pressure-injects fresh dips to prevent mixing during hyper-sonic flight.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing" id="pricing">
        <div className="container">
          <div className="section-header reveal-element">
            <h2>Launch Options</h2>
            <p>Get ready for takeoff. Choose the plan that aligns with your South Indian breakfast frequency.</p>
          </div>
          <div className="pricing-grid">
            {/* Plan 1 */}
            <div className="pricing-card glass-panel reveal-element" id="priceCard1">
              <div className="pricing-header">
                <h3>Single Propeller</h3>
                <p className="pricing-desc">Perfect for weekend cravings and casual breakfasts.</p>
                <div className="pricing-price">
                  <span className="currency">₹</span>
                  <span className="amount">49</span>
                  <span className="period">/delivery</span>
                </div>
              </div>
              <ul className="pricing-features">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  Standard Drone Dispatch (5-7 mins)
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  Double-cartridge Chutney
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  Autonomous Flight Path
                </li>
                <li className="disabled">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  Hot Sambar Thermos Container
                </li>
                <li className="disabled">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  Drone Cam Live-Feed Access
                </li>
              </ul>
              <button className="btn btn-secondary" onClick={() => openOrderModal("Single Propeller")} id="pricingBtn1">Launch Single Flight</button>
            </div>

            {/* Plan 2 */}
            <div className="pricing-card glass-panel premium reveal-element" id="priceCard2">
              <div className="pricing-header">
                <h3>Jetstream Premium</h3>
                <p className="pricing-desc">For true dosa-connoisseurs. Unlimited flights at your command.</p>
                <div className="pricing-price">
                  <span className="currency">₹</span>
                  <span className="amount">299</span>
                  <span className="period">/month</span>
                </div>
              </div>
              <ul className="pricing-features">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <strong>Unlimited Free Flights</strong>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  Hyper-Speed Dispatch (&lt;3 mins)
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  Triple-cartridge Chutney + Hot Sambar
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  Pre-heated CrispHull™ setting
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  Drone Cam Live-Feed Access
                </li>
              </ul>
              <button className="btn btn-primary" onClick={() => openOrderModal("Jetstream Premium")} id="pricingBtn2">Subscribe & Launch</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container footer-grid">
          <div className="footer-column footer-logo-desc">
            <a href="#" className="logo">
              <svg className="logo-icon" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" stroke="var(--primary)" strokeWidth="2" strokeDasharray="4 2" />
                <line x1="2" y1="12" x2="22" y2="12" stroke="var(--accent)" strokeWidth="2" />
                <line x1="12" y1="2" x2="12" y2="22" stroke="var(--accent)" strokeWidth="2" />
                <path d="M7 8 L12 4 L17 8" stroke="var(--secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Air<span style={{ color: "var(--primary)" }}>Dosa</span></span>
            </a>
            <p>Re-engineering South Indian breakfast. Powered by AI navigation, flown by aerospace drones, served golden and crispy.</p>
          </div>
          <div className="footer-column">
            <h4>Navigation</h4>
            <ul>
              <li><a href="#heroSection">Home</a></li>
              <li><a href="#features">Engineering Features</a></li>
              <li><a href="#pricing">Launch Options</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Legal & Support</h4>
            <ul>
              <li><a href="#">Flight Regulations</a></li>
              <li><a href="#">No-Fly Zones</a></li>
              <li><a href="#">Safety & Hygiene</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>
          <div className="footer-column footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Get notified when our drone service expands to your neighborhood sector.</p>
            <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert("Subscribed to Sector launch updates!"); e.target.reset(); }}>
              <input type="email" placeholder="Enter sector pincode" className="newsletter-input" required id="newsletterEmail" />
              <button type="submit" className="btn btn-primary" id="newsletterBtn">Notify</button>
            </form>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>&copy; 2026 AirDosa Technologies Pvt Ltd. All rights reserved.</p>
          <div className="social-links">
            <a href="#" className="social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
            </a>
            <a href="#" className="social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            <a href="#" className="social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
          </div>
        </div>
      </footer>

      {/* Floating CTA Button */}
      <button className="floating-cta" onClick={() => openOrderModal()} id="floatingCTA">
        {/* Drone SVG mini */}
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
          <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" />
          <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="2" />
          <circle cx="4" cy="12" r="2" fill="currentColor" />
          <circle cx="20" cy="12" r="2" fill="currentColor" />
        </svg>
        Order Now
      </button>

      {/* Modal Form & Live Drone Simulator */}
      <div 
        className={`modal-overlay ${isModalOpen ? "active" : ""}`} 
        id="orderModal" 
        onClick={handleOverlayClick}
      >
        <div className="modal-card glass-panel" id="modalCard">
          <button className="modal-close" onClick={closeOrderModal} id="closeModalBtn">×</button>
          
          {activeTab === "form" && (
            <div id="modalOrderState">
              <h3 className="modal-title">Configure Flight Launch</h3>
              <p className="modal-subtitle" id="modalPlanSubtitle">
                {modalPlanName 
                  ? `Deploying via ${modalPlanName} configuration dashboard.` 
                  : "Configure your instant delivery order parameters."}
              </p>
              
              <form className="order-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="dosaSelect">Dosa Model Select</label>
                  <select 
                    id="dosaSelect" 
                    className="form-select"
                    value={selectedDosa}
                    onChange={(e) => setSelectedDosa(e.target.value)}
                  >
                    <option value="Classic Masala Dosa">Classic Masala Dosa (Piping Hot Potato Fill)</option>
                    <option value="Mysore Masala Dosa">Mysore Masala Dosa (Red Garlic Chutney Layer)</option>
                    <option value="Cheese Chilli Dosa">Cheese Chilli Dosa (High-Melting Mozzarella)</option>
                    <option value="Rava Onion Dosa">Rava Onion Dosa (Extra Porous, Maximum Crisp)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="deliveryAddress">Delivery Landing Coordinates (Address)</label>
                  <input 
                    type="text" 
                    id="deliveryAddress" 
                    className="form-input" 
                    placeholder="e.g. 5th Floor Balcony, Flat 502, Sector 4, Indiranagar" 
                    required 
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Custom Payload Options</label>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        id="extraCrispy" 
                        checked={extraCrispy} 
                        onChange={(e) => setExtraCrispy(e.target.checked)}
                      />
                      Hyper-Crispy Pre-Heat (Increases crunch retention by 15%)
                    </label>
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        id="extraGunpowder" 
                        checked={extraGunpowder} 
                        onChange={(e) => setExtraGunpowder(e.target.checked)}
                      />
                      Podi (Gunpowder) Dusting (Adds spicy roasted lentil coating)
                    </label>
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        id="doubleChutney"
                        checked={doubleChutney} 
                        onChange={(e) => setDoubleChutney(e.target.checked)}
                      />
                      Supplementary Chutney Cartridges (+₹15)
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: "10px" }} id="launchDroneBtn">
                  Initiate Drone Launch
                </button>
              </form>
            </div>
          )}

          {activeTab === "simulation" && (
            <div id="modalSimulationState" className="order-simulator" style={{ display: "block" }}>
              <div className="status-badge" id="simulatorStatus" style={statusBadgeStyle}>
                {status}
              </div>
              
              <div className="simulator-drone-container">
                <svg className="simulator-drone" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
                <div className="simulator-beam"></div>
              </div>

              <div className="countdown-timer" id="simCountdown">{countdown}s</div>
              <p id="simulatorETA" style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "24px" }}>
                Estimated arrival to your balcony
              </p>

              <div className="progress-bar-outer">
                <div className="progress-bar-inner" id="simProgress" style={{ width: `${progress}%` }}></div>
              </div>

              {/* Simulation Radar Map */}
              <div className="simulator-map-box">
                {/* Saffron source pin */}
                <div className="map-pin kitchen">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                {/* Dashed connection line */}
                <div className="map-line"></div>
                {/* Floating drone icon representing actual position */}
                <div 
                  className="map-drone-icon" 
                  id="mapDrone"
                  style={{ left: `${droneLeft}%` }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="4" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="12" y1="4" x2="12" y2="20" />
                  </svg>
                </div>
                {/* Gold destination home pin */}
                <div className="map-pin home">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
                  </svg>
                </div>
              </div>

              <p id="simStatusSubtext" style={{ fontSize: "15px", color: "#fff", fontWeight: 600 }}>
                {subtext}
              </p>
              
              <button 
                className="btn btn-secondary" 
                onClick={closeOrderModal} 
                style={{ marginTop: "24px", width: "100%" }} 
                id="dismissSimBtn"
              >
                {isArrived ? "Acknowledge Delivery" : "Abort Delivery"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
