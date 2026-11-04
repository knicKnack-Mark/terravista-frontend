"use client";

import { FormEvent, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

export default function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Frontend demo only: no message is sent or stored.
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-eyebrow">
          <span />
          GET IN TOUCH
        </div>

        <h1>
          Let&apos;s find your
          <br />
          <em>next place.</em>
        </h1>

        <p>
          Whether you’re searching for a home or have a question about a
          property, our team is here to help you take the next step.
        </p>
      </section>

      <section className="contact-layout">
        <aside className="contact-details">
          <div className="contact-section-label">CONTACT DETAILS</div>

          <div className="contact-detail">
            <span className="contact-detail-icon">
              <Mail size={18} />
            </span>
            <div>
              <span className="contact-detail-label">EMAIL</span>
              <a href="mailto:hello@terravista.example">
                hello@terravista.example
              </a>
            </div>
          </div>

          <div className="contact-detail">
            <span className="contact-detail-icon">
              <Phone size={18} />
            </span>
            <div>
              <span className="contact-detail-label">PHONE</span>
              <a href="tel:+630000000000">+63 (000) 000 0000</a>
            </div>
          </div>

          <div className="contact-detail">
            <span className="contact-detail-icon">
              <MapPin size={18} />
            </span>
            <div>
              <span className="contact-detail-label">OFFICE</span>
              <p>By appointment</p>
              <p className="contact-muted">
                Contact us to arrange a visit.
              </p>
            </div>
          </div>

          <div className="contact-detail">
            <span className="contact-detail-icon">
              <Clock3 size={18} />
            </span>
            <div>
              <span className="contact-detail-label">AVAILABILITY</span>
              <p>Monday – Saturday</p>
              <p className="contact-muted">9:00 AM – 5:00 PM</p>
            </div>
          </div>

          <div className="contact-details-note">
            <span>Looking for a property?</span>
            <a href="/properties">
              Explore our listings <ArrowUpRight size={15} />
            </a>
          </div>
        </aside>

        <section className="contact-form-panel">
          {submitted ? (
            <div className="contact-success" role="status">
              <span className="contact-success-icon">
                <Check size={24} />
              </span>
              <div className="contact-section-label">MESSAGE PREPARED</div>
              <h2>Thank you for reaching out.</h2>
              <p>
                This is a frontend demo, so your message hasn’t been sent or
                saved. The form is ready to connect to a backend later.
              </p>
              <button
                className="contact-submit"
                onClick={() => setSubmitted(false)}
              >
                Write another message <ArrowUpRight size={16} />
              </button>
            </div>
          ) : (
            <>
              <div className="contact-section-label">SEND A MESSAGE</div>
              <h2>How can we help?</h2>
              <p className="contact-form-intro">
                Share a few details and we’ll know how best to assist.
              </p>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  <label>
                    <span>YOUR NAME</span>
                    <input
                      name="name"
                      type="text"
                      placeholder="Full name"
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label>
                    <span>EMAIL ADDRESS</span>
                    <input
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </label>
                </div>

                <label>
                  <span>SUBJECT</span>
                  <select name="subject" defaultValue="" required>
                    <option value="" disabled>
                      Select a subject
                    </option>
                    <option value="property">Property inquiry</option>
                    <option value="viewing">Schedule a viewing</option>
                    <option value="general">General question</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                <label>
                  <span>YOUR MESSAGE</span>
                  <textarea
                    name="message"
                    placeholder="Tell us a little about what you're looking for..."
                    rows={5}
                    required
                  />
                </label>

                <button className="contact-submit" type="submit">
                  Prepare message <Send size={15} />
                </button>
                <p className="contact-form-disclaimer">
                  Demo form — nothing is sent or stored.
                </p>
              </form>
            </>
          )}
        </section>
      </section>
    </main>
  );
}