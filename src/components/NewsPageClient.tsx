"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Search,
  X,
} from "lucide-react";

type Article = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  content: string[];
  image: string;
  featured?: boolean;
};

const articles: Article[] = [
  {
    slug: "designing-a-home-that-lasts",
    category: "Design",
    title: "Designing a home that feels timeless",
    excerpt:
      "A closer look at the materials, proportions, and thoughtful details that make a home feel considered for years to come.",
    date: "October 18, 2026",
    readTime: "5 min read",
    author: "TerraVista Editorial",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
    content: [
      "A timeless home is not defined by a single trend. It comes from a thoughtful balance of proportion, natural materials, light, and the way a space supports everyday life.",
      "Start with the essentials: a clear layout, durable finishes, and rooms that feel connected to their surroundings. Natural stone, warm wood, and restrained colors can create a calm foundation without making a home feel generic.",
      "The most enduring spaces also leave room for the people who live in them. Flexible rooms, useful storage, and carefully considered lighting help a home evolve with its owners.",
    ],
  },
  {
    slug: "understanding-the-buying-journey",
    category: "Guides",
    title: "A clearer path to your next property",
    excerpt:
      "The key steps to prepare for a property search, compare your options, and move forward with confidence.",
    date: "October 12, 2026",
    readTime: "4 min read",
    author: "TerraVista Editorial",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
    content: [
      "A successful property search begins with a clear picture of what matters most: location, budget, space, and the way you want to live.",
      "Before visiting properties, organize your priorities and make a short list of questions. Compare each home against the same criteria so the decision is based on more than first impressions.",
      "When a property feels right, take time to review the details and ask for any information you need. A considered process can make the experience more manageable.",
    ],
  },
  {
    slug: "the-value-of-location",
    category: "Market Notes",
    title: "Why location is more than an address",
    excerpt:
      "How access, neighborhood character, and the surrounding environment shape the experience of a home.",
    date: "October 5, 2026",
    readTime: "6 min read",
    author: "TerraVista Editorial",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85",
    content: [
      "Location influences much more than a property's map pin. It shapes daily routines, access to services, and the character of the community around a home.",
      "Consider how you move through the area during a typical week. Nearby amenities, transportation, green spaces, and the feel of the neighborhood can all influence how well a property fits your life.",
      "The right location is ultimately personal. Looking beyond the address helps you understand whether a property supports the lifestyle you want.",
    ],
  },
  {
    slug: "small-details-big-impact",
    category: "Design",
    title: "The small details that make a space feel complete",
    excerpt:
      "From lighting to hardware, discover how thoughtful finishing touches can bring a room together.",
    date: "September 27, 2026",
    readTime: "3 min read",
    author: "TerraVista Editorial",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85",
    content: [
      "Finishing details are often quiet, but they have a meaningful effect on how a space feels. Consistent finishes, layered lighting, and well-placed storage can make a room feel intentional.",
      "Rather than adding more, focus on choosing details that work together. A few carefully selected materials can create a stronger result than a collection of competing accents.",
    ],
  },
  {
    slug: "preparing-for-a-property-viewing",
    category: "Guides",
    title: "Make the most of your next property viewing",
    excerpt:
      "A practical checklist for looking beyond the first impression when you visit a home.",
    date: "September 19, 2026",
    readTime: "4 min read",
    author: "TerraVista Editorial",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85",
    content: [
      "A viewing is an opportunity to understand how a property works in real life. Look at natural light, storage, room flow, and the condition of important features.",
      "Bring a short checklist and take notes after each visit. If something is unclear, ask questions rather than relying on assumptions.",
      "A second visit can be useful when you are seriously considering a property. It gives you another chance to assess the details with a clearer perspective.",
    ],
  },
  {
    slug: "creating-a-sense-of-arrival",
    category: "Lifestyle",
    title: "Creating a sense of arrival at home",
    excerpt:
      "Small ways to make the transition from outside to inside feel welcoming and personal.",
    date: "September 10, 2026",
    readTime: "3 min read",
    author: "TerraVista Editorial",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1000&q=85",
    content: [
      "The entrance sets the tone for the rest of a home. A clear path, considered lighting, and a place to put everyday essentials can make arriving feel effortless.",
      "A sense of arrival does not require a large space. Even a compact entry can feel welcoming when it is organized and reflects the character of the home.",
    ],
  },
];

const categories = ["All", "Design", "Guides", "Market Notes", "Lifestyle"];

export default function NewsPageClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const pageRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const featured = articles.find((article) => article.featured)!;

  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return articles
      .filter((article) => !article.featured)
      .filter(
        (article) =>
          activeCategory === "All" || article.category === activeCategory,
      )
      .filter(
        (article) =>
          !query ||
          `${article.title} ${article.excerpt} ${article.category} ${article.content.join(" ")}`
            .toLowerCase()
            .includes(query),
      );
  }, [activeCategory, search]);

  // Main page entrance and scroll animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const heroTimeline = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        heroTimeline
          .from(".news-eyebrow", {
            opacity: 0,
            y: 18,
            duration: 0.8,
          })
          .from(
            ".news-hero h1",
            {
              opacity: 0,
              y: 45,
              duration: 1.1,
            },
            "-=0.45",
          )
          .from(
            ".news-hero-heading p",
            {
              opacity: 0,
              y: 22,
              duration: 0.8,
            },
            "-=0.65",
          )
          .from(
            ".news-hero-mark",
            {
              opacity: 0,
              x: 25,
              duration: 0.8,
            },
            "-=0.7",
          );

        gsap.from(".news-featured", {
          opacity: 0,
          y: 65,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".news-featured",
            start: "top 82%",
            once: true,
          },
        });

        gsap.from(".news-featured-art", {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.3,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".news-featured-card",
            start: "top 80%",
            once: true,
          },
        });

        gsap.from(".news-featured-copy > *", {
          opacity: 0,
          y: 25,
          duration: 0.75,
          stagger: 0.13,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".news-featured-copy",
            start: "top 85%",
            once: true,
          },
        });

        gsap.from(".news-library-heading > *", {
          opacity: 0,
          y: 35,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".news-library-heading",
            start: "top 85%",
            once: true,
          },
        });

        gsap.from(".news-filters button", {
          opacity: 0,
          y: 15,
          duration: 0.5,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".news-filters",
            start: "top 90%",
            once: true,
          },
        });

        gsap.utils.toArray<HTMLElement>(".news-card").forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 55,
            scale: 0.97,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          });
        });

        gsap.from(".news-bottom-cta", {
          opacity: 0,
          y: 55,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".news-bottom-cta",
            start: "top 88%",
            once: true,
          },
        });
      });

      return () => media.revert();
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Article modal entrance animation
  useEffect(() => {
    if (!selectedArticle) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".news-modal-backdrop",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        },
      );

      gsap.fromTo(
        ".news-modal",
        {
          opacity: 0,
          y: 45,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: "power3.out",
        },
      );
    });

    return () => ctx.revert();
  }, [selectedArticle]);

  const openArticle = (article: Article) => {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    setSelectedArticle(article);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
  };

  useEffect(() => {
    if (!selectedArticle) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeArticle();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, a[href], input, [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [selectedArticle]);

  return (
    <main className="news-page" ref={pageRef}>
      <section className="news-hero">
        <div className="news-eyebrow">
          <span />
          THE TERRAVISTA JOURNAL
        </div>

        <div className="news-hero-heading">
          <div>
            <h1>
              Perspective for
              <br />
              <em>the way you live.</em>
            </h1>

            <p>
              Thoughtful perspectives on property, design, and finding a place
              to call your own.
            </p>
          </div>

          <div className="news-hero-mark" aria-hidden="true">
            <span>TV</span>
            <ArrowDownRight size={30} strokeWidth={1} />
          </div>
        </div>
      </section>

      <section className="news-featured">
        <div className="news-section-label">
          <span>01 / EDITOR&apos;S PICK</span>
          <span>{featured.category}</span>
        </div>

        <button
          className="news-featured-card"
          onClick={() => openArticle(featured)}
          aria-label={`Read ${featured.title}`}
        >
          <div
            className="news-featured-art"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(8, 8, 7, 0.35), rgba(8, 8, 7, 0.04)), url("${featured.image}")`,
            }}
            role="img"
            aria-label="Elegant contemporary residential interior"
          >
            <span className="news-art-caption">THE ART OF LIVING WELL</span>
          </div>

          <div className="news-featured-copy">
            <div className="news-meta">
              <span>{featured.date}</span>
              <span>·</span>
              <span>{featured.readTime}</span>
            </div>

            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>

            <span className="news-read-link">
              Read the story <ArrowUpRight size={16} />
            </span>
          </div>
        </button>
      </section>

      <section className="news-library">
        <div className="news-library-heading">
          <div>
            <div className="news-section-label">02 / EXPLORE THE JOURNAL</div>
            <h2>
              Ideas worth <em>keeping.</em>
            </h2>
          </div>

          <label className="news-search">
            <Search size={17} />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search articles"
              aria-label="Search articles"
            />

            {search && (
              <button
                type="button"
                className="news-search-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </label>
        </div>

        <div
          className="news-filters"
          aria-label="Filter articles by category"
        >
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={activeCategory === category ? "active" : ""}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="news-results-line">
          <span>
            {filteredArticles.length}{" "}
            {filteredArticles.length === 1 ? "STORY" : "STORIES"}
          </span>

          {(search || activeCategory !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            >
              Reset filters <X size={13} />
            </button>
          )}
        </div>

        {filteredArticles.length > 0 ? (
          <div className="news-grid">
            {filteredArticles.map((article, index) => (
              <article className="news-card" key={article.slug}>
                <button
                  type="button"
                  className={`news-card-art news-card-art-${index % 3}`}
                  style={{
                    backgroundImage: `linear-gradient(0deg, rgba(8, 8, 7, 0.55), rgba(8, 8, 7, 0.04)), url("${article.image}")`,
                  }}
                  onClick={() => openArticle(article)}
                  aria-label={`Read ${article.title}`}
                >
                  <span>{article.category}</span>
                  <ArrowUpRight size={20} />
                </button>

                <div className="news-card-body">
                  <div className="news-meta">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>

                  <button
                    type="button"
                    className="news-card-link"
                    onClick={() => openArticle(article)}
                  >
                    Read article <ArrowRight size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="news-empty">
            <p>No articles match your search.</p>
            <span>Try another keyword or explore a different category.</span>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className="news-bottom-cta">
        <div>
          <span className="news-section-label">YOUR NEXT CHAPTER</span>
          <h2>
            Find a place that feels like <em>you.</em>
          </h2>
        </div>

        <a href="/properties">
          Explore properties <ArrowUpRight size={17} />
        </a>
      </section>

      {selectedArticle && (
        <div
          className="news-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeArticle();
            }
          }}
        >
          <article
            ref={modalRef}
            className="news-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="news-modal-title"
            tabIndex={-1}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="news-modal-close"
              onClick={closeArticle}
              aria-label="Close article"
            >
              <X size={20} />
            </button>

            <div className="news-modal-category">
              {selectedArticle.category}
            </div>

            <h2 id="news-modal-title">{selectedArticle.title}</h2>

            <div className="news-meta news-modal-meta">
              <CalendarDays size={14} />
              <span>{selectedArticle.date}</span>
              <span>·</span>
              <Clock3 size={14} />
              <span>{selectedArticle.readTime}</span>
            </div>

            <div
              className="news-modal-image"
              style={{
                backgroundImage: `url("${selectedArticle.image}")`,
              }}
              role="img"
              aria-label="Property and interior design photography"
            />

            <p className="news-modal-intro">{selectedArticle.excerpt}</p>

            <div className="news-modal-content">
              {selectedArticle.content.map((paragraph, index) => (
                <p key={`${selectedArticle.slug}-${index}`}>{paragraph}</p>
              ))}
            </div>

            <div className="news-modal-footer">
              <span>Written by {selectedArticle.author}</span>

              <button type="button" onClick={closeArticle}>
                <ArrowLeft size={15} /> Back to journal
              </button>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}