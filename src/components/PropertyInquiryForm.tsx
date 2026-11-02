
"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";

type Props = {
  propertyTitle: string;
  propertySlug: string;
};

export default function PropertyInquiryForm({
  propertyTitle,
  propertySlug,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="inquiry-success" role="status">
        <CheckCircle2 size={34} />
        <h3>Inquiry prepared!</h3>
        <p>
          Thank you, {name}. Your interest in {propertyTitle} has been
          recorded on this page.
        </p>
        <button type="button" onClick={() => setSubmitted(false)}>
          Edit inquiry
        </button>
      </div>
    );
  }

  return (
    <form className="property-inquiry-form" onSubmit={handleSubmit}>
      <input type="hidden" name="propertySlug" value={propertySlug} />

      <label>
        Your name
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </label>

      <label>
        Email address
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>

      <label>
        Contact number
        <input
          type="tel"
          name="phone"
          placeholder="Your phone number"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </label>

      <label>
        Message
        <textarea
          name="message"
          placeholder={`I'm interested in ${propertyTitle}...`}
          rows={3}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </label>

      <button type="submit">
        Send inquiry
        <Send size={16} />
      </button>
    </form>
  );
}
