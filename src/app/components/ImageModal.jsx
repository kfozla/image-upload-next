import React from "react";

function ImageModal({
  images,
  imageUsernames,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) {
  const src = images[currentIndex];
  // src'nin uzantısına göre video mu image mı kontrolü
  const isVideo = [".mp4", ".mov", ".webm", ".avi", ".mkv"].some((ext) =>
    src?.toLowerCase().endsWith(ext)
  );

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        onPrev && onPrev();
      } else if (e.key === "ArrowRight") {
        onNext && onNext();
      } else if (e.key === "Escape") {
        onClose && onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onPrev, onNext, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-lg bg-black/40 text-white text-xs font-semibold backdrop-blur-sm">
        {imageUsernames[currentIndex]}
      </div>
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {isVideo ? (
          <video
            src={src}
            controls
            className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl"
          />
        ) : (
          <img
            src={src}
            alt={`preview-${currentIndex}`}
            className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl"
          />
        )}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-black/70 text-white px-3 py-1 rounded-full"
        >
          Kapat
        </button>
        <div className="absolute bottom-1/2 left-0 w-full flex justify-between items-end px-4 pointer-events-none">
          <button
            className="pointer-events-auto bg-black/70 text-white px-3 py-1 rounded-full"
            onClick={onPrev}
            disabled={currentIndex === 0}
          >
            {"<"}
          </button>
          <button
            className="pointer-events-auto bg-black/70 text-white px-3 py-1 rounded-full"
            onClick={onNext}
            disabled={currentIndex === images.length - 1}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
