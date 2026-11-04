"use client";

import { useMemo, useState } from "react";
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
          `${article.title} ${article.excerpt} ${article.category}`
            .toLowerCase()
            .includes(query),
      );
  }, [activeCategory, search]);

  return (
    <main className="news-page">
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
          onClick={() => setSelectedArticle(featured)}
          aria-label={`Read ${featured.title}`}
        >
          <div className="news-featured-art">
            <div className="news-art-orbit news-art-orbit-one" />
            <div className="news-art-orbit news-art-orbit-two" />
            <div className="news-art-building">
              <span />
              <span />
              <span />
              <span />
            </div>
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
            <h2>Ideas worth <em>keeping.</em></h2>
          </div>

          <label className="news-search">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search articles"
              aria-label="Search articles"
            />
          </label>
        </div>

        <div className="news-filters" aria-label="Filter articles by category">
          {categories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? "active" : ""}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredArticles.length > 0 ? (
          <div className="news-grid">
            {filteredArticles.map((article, index) => (
              <article className="news-card" key={article.slug}>
                <button
                  className={`news-card-art news-card-art-${index % 3}`}
                  onClick={() => setSelectedArticle(article)}
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
                    className="news-card-link"
                    onClick={() => setSelectedArticle(article)}
                  >
                    Read article <ArrowRight size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="news-empty">
            <p>No articles match that search.</p>
            <button
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
          <h2>Find a place that feels like <em>you.</em></h2>
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
              setSelectedArticle(null);
            }
          }}
        >
          <article
            className="news-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="news-modal-title"
          >
            <button
              className="news-modal-close"
              onClick={() => setSelectedArticle(null)}
              aria-label="Close article"
            >
              <X size={20} />
            </button>

            <div className="news-modal-category">{selectedArticle.category}</div>
            <h2 id="news-modal-title">{selectedArticle.title}</h2>
            <div className="news-meta news-modal-meta">
              <CalendarDays size={14} />
              <span>{selectedArticle.date}</span>
              <span>·</span>
              <Clock3 size={14} />
              <span>{selectedArticle.readTime}</span>
            </div>
            <p className="news-modal-intro">{selectedArticle.excerpt}</p>
            <div className="news-modal-content">
              {selectedArticle.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="news-modal-footer">
              <span>Written by {selectedArticle.author}</span>
              <button onClick={() => setSelectedArticle(null)}>
                <ArrowLeft size={15} /> Back to journal
              </button>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}