import React from "react";

function ImageModal({ images, currentIndex, onClose, onPrev, onNext }) {
  const src = images[currentIndex];
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <img
          src={src}
          alt={`preview-${currentIndex}`}
          className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl"
        />
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
