import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Compass,
  FileText,
  KeyRound,
  Search,
  ShieldCheck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Define your priorities",
    description:
      "Clarify your preferred location, budget, space requirements, and the features that matter most.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Explore the right properties",
    description:
      "Compare listings, review property details, and shortlist homes that match your goals.",
    icon: Search,
  },
  {
    number: "03",
    title: "Review the details",
    description:
      "Arrange a viewing and carefully review the property's documents, condition, and terms.",
    icon: FileText,
  },
  {
    number: "04",
    title: "Move forward with confidence",
    description:
      "Coordinate the next steps with the seller and your chosen legal or financial professionals.",
    icon: KeyRound,
  },
];

const considerations = [
  "Choose a budget that includes fees and ongoing costs.",
  "Compare locations based on your daily routine and long-term plans.",
  "Review property documents and ownership details before committing.",
  "Arrange an in-person viewing whenever possible.",
];

export default function BuyersPage() {
  return (
    <main className="buyers-page">
      <section className="buyers-hero">
        <div className="buyers-hero__image" aria-hidden="true" />

        <div className="buyers-container buyers-hero__content">
          <p className="buyers-eyebrow">A more considered way to buy</p>

          <h1>
            Find a place
            <br />
            that feels like <em>yours.</em>
          </h1>

          <p className="buyers-hero__description">
            A thoughtful property search starts with the right guidance.
            Explore homes, compare your options, and take your next step with
            clarity.
          </p>

          <div className="buyers-hero__actions">
            <Link href="/properties" className="buyers-button buyers-button--light">
              Explore properties <ArrowRight size={17} />
            </Link>

            <a href="#buying-process" className="buyers-text-link">
              Discover the process <ArrowDownRight size={17} />
            </a>
          </div>

          <div className="buyers-hero__note">
            <span className="buyers-hero__line" />
            <span>Thoughtful guidance. Exceptional places.</span>
          </div>
        </div>
      </section>

      <section className="buyers-intro buyers-container">
        <div>
          <p className="buyers-eyebrow">The TerraVista approach</p>
          <h2>
            Your next chapter
            <br />
            deserves <em>careful consideration.</em>
          </h2>
        </div>

        <div className="buyers-intro__copy">
          <p>
            Buying a home is more than choosing an address. It is a decision
            about how you want to live, what you value, and where you want to
            go next.
          </p>
          <p>
            Use our property collection as a starting point, then take the time
            to understand each home's details and possibilities.
          </p>
        </div>
      </section>

      <section className="buyers-process" id="buying-process">
        <div className="buyers-container">
          <div className="buyers-section-heading">
            <div>
              <p className="buyers-eyebrow">The buying journey</p>
              <h2>A clear path to <em>your next home.</em></h2>
            </div>
            <p>
              Every purchase is different. These four steps offer a practical
              starting point for your search.
            </p>
          </div>

          <div className="buyers-steps">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article className="buyers-step" key={step.number}>
                  <div className="buyers-step__top">
                    <span>{step.number}</span>
                    <Icon size={22} strokeWidth={1.4} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="buyers-considerations buyers-container">
        <div className="buyers-considerations__image" />

        <div className="buyers-considerations__content">
          <p className="buyers-eyebrow">Before you decide</p>
          <h2>Make space for the <em>important details.</em></h2>
          <p className="buyers-considerations__lead">
            A little preparation can make the property search more focused and
            help you ask better questions along the way.
          </p>

          <ul>
            {considerations.map((item) => (
              <li key={item}>
                <span className="buyers-check">
                  <Check size={14} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <p className="buyers-disclaimer">
            This guide is for general information and is not legal or financial
            advice. Consult qualified professionals for advice on your
            circumstances.
          </p>
        </div>
      </section>

      <section className="buyers-cta">
        <div className="buyers-container buyers-cta__inner">
          <div>
            <p className="buyers-eyebrow">Your search starts here</p>
            <h2>Ready to explore <em>what's possible?</em></h2>
          </div>

          <Link href="/properties" className="buyers-button buyers-button--light">
            Browse properties <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}