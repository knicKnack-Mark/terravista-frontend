
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Search, Menu, X } from "lucide-react";
import gsap from "gsap";
import type { FormEvent } from "react";


const PropertyScene = dynamic(
  () => import("@/components/PropertyScene"),
  { ssr: false }
);

export default function Home() {
  const [activeTab, setActiveTab] = useState<"buy" | "rent">("buy");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("Any price");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");

  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    timeline
      .fromTo(
        ".navbar",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 }
      )
      .fromTo(
        ".hero-content > *",
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.13 },
        "-=0.45"
      )
      .fromTo(
        ".search-panel",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.45"
      )
      .fromTo(
        ".scene-container",
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, duration: 1.3 },
        "-=1"
      );

    return () => {
      timeline.kill();
    };
  }, []);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearchMessage(
      `Searching ${activeTab === "buy" ? "properties to buy" : "properties to rent"} in ${location || "all locations"} — ${budget}.`
    );
  };

  return (
    <main className="terravista">
      <header className="navbar">
        <a href="/" className="brand">
          <div className="brand-mark">T</div>
          <div>
            <span className="brand-small">THE</span>
            <span className="brand-name">TERRAVISTA</span>
            <span className="brand-tagline">YOUR FUTURE, ELEVATED</span>
          </div>
        </a>

        <nav className={menuOpen ? "nav-links mobile-open" : "nav-links"}>
          <a className="active" href="/">Home</a>
          <a href="#buyers">Buyers</a>
          <a href="#properties">Properties</a>
          <a href="#news">News</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#contact" className="contact-button">
          Contact
        </a>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section className="hero">
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
            Explore Now <ArrowRight size={18} />
          </a>
        </div>

        <div className="scene-container">
          <PropertyScene />
        </div>

        <form className="search-panel" onSubmit={handleSearch}>
          <div className="search-tabs">
            <button
              type="button"
              className={activeTab === "buy" ? "selected" : ""}
              onClick={() => setActiveTab("buy")}
            >
              Buy
            </button>

            <button
              type="button"
              className={activeTab === "rent" ? "selected" : ""}
              onClick={() => setActiveTab("rent")}
            >
              Rent
            </button>
          </div>

          <div className="search-fields">
            <label className="search-field">
              <span>Location</span>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your preferred location"
              />
            </label>

            <label className="search-field">
              <span>Pricing</span>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
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
              <Search size={21} />
            </button>
          </div>

          {searchMessage && (
            <p className="search-feedback">{searchMessage}</p>
          )}
        </form>
      </section>

      <div className="hero-footer">
        <span>EXCEPTIONAL PROPERTIES. EXTRAORDINARY LIVING.</span>
        <span>01 — 01</span>
      </div>
    </main>
  );
}
