
"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type PropertyPage = "featured" | "listing";

export function usePropertyPageAnimations(page: PropertyPage) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const rootSelector =
      page === "featured" ? ".featured-section" : ".listing-page";

    const root = document.querySelector<HTMLElement>(rootSelector);

    if (!root) return;

    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          if (page === "featured") {
            // Featured section heading
            gsap.from(".featured-heading-copy > *", {
              opacity: 0,
              y: 35,
              duration: 0.85,
              stagger: 0.14,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".featured-heading",
                start: "top 85%",
                once: true,
              },
            });

            // Category filters
            gsap.from(".featured-filter", {
              opacity: 0,
              x: 30,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".featured-filter",
                start: "top 90%",
                once: true,
              },
            });

            // Property cards
            gsap.from(".property-card", {
              opacity: 0,
              y: 65,
              scale: 0.97,
              duration: 0.9,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".property-grid",
                start: "top 82%",
                once: true,
              },
            });

            // Property image reveal
            gsap.from(".property-card-image img", {
              scale: 1.13,
              duration: 1.2,
              stagger: 0.12,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".property-grid",
                start: "top 82%",
                once: true,
              },
            });

            // Bottom section
            gsap.from(".featured-bottom > *", {
              opacity: 0,
              y: 25,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".featured-bottom",
                start: "top 90%",
                once: true,
              },
            });
          }

          if (page === "listing") {
            // Listing hero entrance
            const heroTimeline = gsap.timeline({
              defaults: { ease: "power3.out" },
            });

            heroTimeline
              .from(".listing-back-link", {
                opacity: 0,
                x: -20,
                duration: 0.6,
              })
              .from(
                ".listing-eyebrow",
                {
                  opacity: 0,
                  y: 20,
                  duration: 0.7,
                },
                "-=0.25",
              )
              .from(
                ".listing-hero h1",
                {
                  opacity: 0,
                  y: 45,
                  duration: 1,
                },
                "-=0.3",
              )
              .from(
                ".listing-hero-inner > p",
                {
                  opacity: 0,
                  y: 25,
                  duration: 0.7,
                },
                "-=0.55",
              )
              .from(
                ".listing-hero-meta",
                {
                  opacity: 0,
                  y: 20,
                  duration: 0.7,
                },
                "-=0.4",
              );

            // Listing section heading
            gsap.from(".listing-section-heading > *", {
              opacity: 0,
              y: 30,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".listing-section-heading",
                start: "top 85%",
                once: true,
              },
            });

            // Filter panel
            gsap.from(".listing-filter-panel", {
              opacity: 0,
              y: 40,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".listing-filter-panel",
                start: "top 88%",
                once: true,
              },
            });

            // Toolbar
            gsap.from(".listing-toolbar", {
              opacity: 0,
              y: 20,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".listing-toolbar",
                start: "top 90%",
                once: true,
              },
            });

            // Property cards
            gsap.from(".listing-property-card", {
              opacity: 0,
              y: 60,
              scale: 0.97,
              duration: 0.85,
              stagger: 0.13,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".listing-property-grid",
                start: "top 82%",
                once: true,
              },
            });

            // Listing images
            gsap.from(".listing-card-image img", {
              scale: 1.12,
              duration: 1.2,
              stagger: 0.12,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".listing-property-grid",
                start: "top 82%",
                once: true,
              },
            });

            // Footer
            gsap.from(".listing-footer > *", {
              opacity: 0,
              y: 25,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".listing-footer",
                start: "top 95%",
                once: true,
              },
            });
          }
        },
      );

      return () => media.revert();
    }, root);

    return () => ctx.revert();
  }, [page]);
}
