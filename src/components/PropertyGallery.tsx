"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import styles from "./PropertyDetails.module.css";

type PropertyGalleryProps = {
  title: string;
  coverImage: string;
  images: string[];
};

export default function PropertyGallery({
  title,
  coverImage,
  images,
}: PropertyGalleryProps) {
  const galleryImages = Array.from(
    new Set([coverImage, ...images].filter((image): image is string => Boolean(image)))
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const goTo = useCallback((direction: number) => {
    if (galleryImages.length < 2) return;
    setActiveIndex((current) =>
      (current + direction + galleryImages.length) % galleryImages.length
    );
  }, [galleryImages.length]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowRight") goTo(1);
      if (event.key === "ArrowLeft") goTo(-1);
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, goTo]);

  if (galleryImages.length === 0) {
    return (
      <div className={styles.galleryEmpty}>
        <span>T</span>
        <p>Property photography coming soon</p>
      </div>
    );
  }

  const activeImage = galleryImages[activeIndex];

  return (
    <>
      <section className={styles.gallery} aria-label="Property photos">
        <button
          type="button"
          className={styles.galleryMain}
          onClick={() => setLightboxOpen(true)}
          aria-label="Open property photo viewer"
        >
          <img src={activeImage} alt={`${title} — photo ${activeIndex + 1}`} />
          <span className={styles.expandHint}><Expand size={14} /> View gallery</span>
          <span className={styles.photoCount}>{activeIndex + 1} / {galleryImages.length}</span>
        </button>

        <div className={styles.gallerySide}>
          {galleryImages.slice(1, 3).map((image, index) => {
            const imageIndex = index + 1;
            return (
              <button
                type="button"
                className={`${styles.gallerySecondary} ${activeIndex === imageIndex ? styles.gallerySelected : ""}`}
                key={`${image}-${imageIndex}`}
                onClick={() => setActiveIndex(imageIndex)}
                aria-label={`View photo ${imageIndex + 1}`}
              >
                <img src={image} alt={`${title} — photo ${imageIndex + 1}`} />
                {index === 1 && galleryImages.length > 3 && (
                  <span className={styles.morePhotos}>+{galleryImages.length - 3} photos</span>
                )}
              </button>
            );
          })}
          {galleryImages.length === 1 && (
            <div className={styles.galleryPlaceholder}>
              <span>01</span>
              <p>More views of this property<br />will be added soon.</p>
            </div>
          )}
          {galleryImages.length === 2 && (
            <div className={styles.galleryPlaceholder}>
              <span>02</span>
              <p>More views of this property<br />will be added soon.</p>
            </div>
          )}
        </div>
      </section>

      {galleryImages.length > 1 && (
        <div className={styles.thumbnailRail} aria-label="Choose a property photo">
          {galleryImages.map((image, index) => (
            <button
              type="button"
              key={`${image}-${index}`}
              className={`${styles.thumbnail} ${activeIndex === index ? styles.thumbnailActive : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Select photo ${index + 1}`}
              aria-pressed={activeIndex === index}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo gallery`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLightboxOpen(false);
          }}
        >
          <button type="button" className={styles.lightboxClose} onClick={() => setLightboxOpen(false)} aria-label="Close gallery">
            <X size={23} />
          </button>
          <div className={styles.lightboxTop}>
            <span>{title}</span>
            <small>{activeIndex + 1} / {galleryImages.length}</small>
          </div>
          <div className={styles.lightboxStage}>
            {galleryImages.length > 1 && (
              <button type="button" className={styles.lightboxArrow} onClick={() => goTo(-1)} aria-label="Previous photo">
                <ChevronLeft size={27} />
              </button>
            )}
            <img src={activeImage} alt={`${title} — photo ${activeIndex + 1}`} />
            {galleryImages.length > 1 && (
              <button type="button" className={styles.lightboxArrow} onClick={() => goTo(1)} aria-label="Next photo">
                <ChevronRight size={27} />
              </button>
            )}
          </div>
          <div className={styles.lightboxThumbs}>
            {galleryImages.map((image, index) => (
              <button
                type="button"
                key={`${image}-${index}`}
                className={activeIndex === index ? styles.lightboxThumbActive : ""}
                onClick={() => setActiveIndex(index)}
                aria-label={`View photo ${index + 1}`}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
