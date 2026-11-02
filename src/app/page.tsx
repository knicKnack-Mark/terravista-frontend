
"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowRight,
  Search,
  Menu,
  X,
  Building2,
  MapPin,
  ChevronDown,
} from "lucide-react";
import gsap from "gsap";
import FeaturedProperties from "@/components/FeaturedProperties"; 


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
        .fromTo(
          ".navbar",
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75 }
        )
        .fromTo(
          ".hero-content > *",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.12 },
          "-=0.35"
        )
        .fromTo(
          ".property-visual",
          { scale: 1.04 },
          { scale: 1, duration: 1.6 },
          "-=1"
        )
        .fromTo(
          ".search-panel",
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.7"
        )
        .fromTo(
          ".hero-footer",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.25"
        );

      gsap.to(".property-visual", {
        y: -7,
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
    <main className="terravista" id="home">
      <header className="navbar">
        <a href="#home" className="brand" aria-label="TerraVista home">
          <div className="brand-icon">
            <Building2 size={36} strokeWidth={1.15} />
          </div>

          <div className="brand-copy">
            <span className="brand-small">THE</span>
            <span className="brand-name">TERRAVISTA</span>
            <span className="brand-tagline">YOUR FUTURE, ELEVATED</span>
          </div>
        </a>

        <nav className={menuOpen ? "nav-links mobile-open" : "nav-links"}>
          <a className="active" href="#home" onClick={closeMenu}>
            Home
          </a>
          <a href="#buyers" onClick={closeMenu}>
            Buyers
          </a>
          <a href="#properties" onClick={closeMenu}>
            Properties
          </a>
          <a href="#news" onClick={closeMenu}>
            News
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </nav>

        <a href="#contact" className="contact-button">
          <span>Get in touch</span>
          <ArrowRight size={16} />
        </a>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          type="button"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </header>

      <section className="hero">
        <div
          className="property-visual"
          role="img"
          aria-label="Modern luxury villa with glass architecture and landscaped garden"
        />

        <div className="hero-content">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            <span>REAL ESTATE · EST. FOR LIVING</span>
          </div>

          <h1>
            Discover Your
            <br />
            <span>Future Home.</span>
          </h1>

          <p className="hero-description">
            Exceptional homes. Extraordinary possibilities.
            Discover a property that reflects your lifestyle
            and makes every moment feel like home.
          </p>

          <a href="#properties" className="explore-button">
            <span>Explore properties</span>
            <span className="explore-icon">
              <ArrowRight size={17} />
            </span>
          </a>

          <div className="hero-note">
            <span className="hero-note-dot" />
            <span>FIND A PLACE THAT FEELS LIKE YOURS</span>
          </div>
        </div>

        <form
          className="search-panel"
          onSubmit={handleSearch}
          id="properties"
        >
          <div className="search-panel-top">
            <div className="search-heading">
              <span className="search-kicker">START YOUR SEARCH</span>
              <span className="search-title">Find your place</span>
            </div>

            <div className="search-tabs" id="buyers">
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
          </div>

          <div className="search-fields">
            <label className="search-field location-field">
              <span>Location</span>
              <div className="field-control">
                <MapPin size={17} />
                <input
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="City, neighborhood or ZIP"
                />
              </div>
            </label>

            <label className="search-field">
              <span>Price range</span>
              <div className="field-control select-control">
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
                <ChevronDown size={16} />
              </div>
            </label>

            <button
              type="submit"
              className="search-button"
              aria-label="Search properties"
            >
              <Search size={20} />
              <span>Search</span>
            </button>
          </div>

          {searchMessage && (
            <p className="search-feedback" role="status">
              {searchMessage}
            </p>
          )}
        </form>
      </section>

      <footer className="hero-footer" id="contact">
        <div className="footer-brand">
          <span className="footer-mark">T</span>
          <span>EXCEPTIONAL PROPERTIES. EXTRAORDINARY LIVING.</span>
        </div>
        <span className="footer-count">01 <i /> 01</span>
      </footer>

      <div id="news" className="anchor-target" />
      <FeaturedProperties />
    </main>
  );
}
