interface ProductGalleryProps {
  images: string[];
  alt: string;
  currentIndex: number;
  onChangeIndex: (index: number) => void;
  onImageClick?: () => void;
}

export function ProductGallery({
  images,
  alt,
  currentIndex,
  onChangeIndex,
  onImageClick,
}: ProductGalleryProps) {
  const goTo = (next: number) => {
    const total = images.length;
    onChangeIndex(((next % total) + total) % total);
  };

  return (
    <div className="gallery">
      <div className="gallery__main">
        <img
          src={images[currentIndex]}
          alt={`${alt} — фото ${currentIndex + 1}`}
          onClick={onImageClick}
          style={{ cursor: onImageClick ? "zoom-in" : undefined }}
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              className="gallery__arrow gallery__arrow--prev"
              onClick={(e) => {
                e.stopPropagation();
                goTo(currentIndex - 1);
              }}
              aria-label="Предыдущее фото"
            >
              ‹
            </button>
            <button
              type="button"
              className="gallery__arrow gallery__arrow--next"
              onClick={(e) => {
                e.stopPropagation();
                goTo(currentIndex + 1);
              }}
              aria-label="Следующее фото"
            >
              ›
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="gallery__thumbs">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={
                "gallery__thumb" + (i === currentIndex ? " gallery__thumb--active" : "")
              }
              onClick={() => onChangeIndex(i)}
              aria-label={`Показать фото ${i + 1}`}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}