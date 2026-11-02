
"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Search, Menu, X, Building2 } from "lucide-react";
import gsap from "gsap";
import type { FormEvent } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"buy" | "rent">("buy");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("Any price");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      timeline
        .fromTo(".navbar", { y: -25, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8,
        })
        .fromTo(".hero-content > *", { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.12,
        }, "-=0.35")
        // .fromTo(".property-visual", { opacity: 0, scale: 1.05 }, {
        //   opacity: 1, scale: 1, duration: 1.5,
        // }, "-=1")
        .fromTo(".property-visual", { scale: 1.04 }, {
          scale: 1, duration: 1.5,
        }, "-=1")
        .fromTo(".search-panel", { y: 25, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8,
        }, "-=0.7")
        .fromTo(".hero-footer", { opacity: 0 }, {
          opacity: 1, duration: 0.7,
        }, "-=0.3");

      gsap.to(".property-visual", {
        y: -8,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSearchMessage(
      `Searching properties to ${activeTab} in ${
        location.trim() || "all locations"
      } — ${budget}.`
    );
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main className="terravista">
      <header className="navbar">
        <a href="#home" className="brand">
          <div className="brand-icon">
            <Building2 size={42} strokeWidth={1.2} />
          </div>
          <div className="brand-copy">
            <span className="brand-small">THE</span>
            <span className="brand-name">TERRAVISTA</span>
            <span className="brand-tagline">YOUR FUTURE, ELEVATED</span>
          </div>
        </a>

        <nav className={menuOpen ? "nav-links mobile-open" : "nav-links"}>
          <a className="active" href="#home" onClick={closeMenu}>Home</a>
          <a href="#buyers" onClick={closeMenu}>Buyers</a>
          <a href="#properties" onClick={closeMenu}>Properties</a>
          <a href="#news" onClick={closeMenu}>News</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>

        <a href="#contact" className="contact-button">Contact</a>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <section className="hero" id="home">
        <div
          className="property-visual"
          id="properties"
          role="img"
          aria-label="Modern luxury villa with glass architecture and warm exterior lighting"
        />

        <div className="hero-content">
          <span className="eyebrow">REAL ESTATE</span>

          <h1>
            Discover Your Future:
            <br />
            Find The Perfect Property
          </h1>

          <p>
            Discover exceptional homes and extraordinary spaces.
            Find the perfect property that matches your lifestyle
            and brings your vision of home to life.
          </p>

          <a href="#properties" className="explore-button">
            Explore Now
            <ArrowRight size={19} />
          </a>
        </div>

        <form className="search-panel" onSubmit={handleSearch} id="buyers">
          <div className="search-tabs">
            <button
              type="button"
              className={activeTab === "buy" ? "selected" : ""}
              onClick={() => {
                setActiveTab("buy");
                setSearchMessage("");
              }}
            >
              Buy
            </button>

            <button
              type="button"
              className={activeTab === "rent" ? "selected" : ""}
              onClick={() => {
                setActiveTab("rent");
                setSearchMessage("");
              }}
            >
              Rent
            </button>
          </div>

          <div className="search-fields">
            <label className="search-field">
              <span>Location</span>
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Enter your preferred location"
              />
            </label>

            <label className="search-field">
              <span>Pricing</span>
              <select
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
              >
                <option>Any price</option>
                <option>Below $100,000</option>
                <option>$100,000 - $300,000</option>
                <option>$300,000 - $500,000</option>
                <option>Above $500,000</option>
              </select>
            </label>

            <button
              type="submit"
              className="search-button"
              aria-label="Search properties"
            >
              <Search size={22} />
            </button>
          </div>

          {searchMessage && (
            <p className="search-feedback" role="status">
              {searchMessage}
            </p>
          )}
        </form>
      </section>

      <footer className="hero-footer">
        <span>EXCEPTIONAL PROPERTIES. EXTRAORDINARY LIVING.</span>
        <span>01 — 01</span>
      </footer>
    </main>
  );
}
