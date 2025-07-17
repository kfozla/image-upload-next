"use client";
import React from "react";
import Image from "next/image";
import ImageModal from "./ImageModal";

function ImageList({ imageList }) {
  const [modalIndex, setModalIndex] = React.useState(null);
  if (!imageList || imageList.length === 0) return null;

  const imageUrls = imageList.map(
    (img) => `http://localhost:5132/${img.filePath}`
  );

  console.log(imageList);
  console.log(imageList[0].posterPath);
  return (
    <div className="mb-6 max-w-5xl mx-auto mt-4 px-4">
      <h2 className="text-lg font-semibold mb-4">Yüklenen Tüm Görseller</h2>

      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-4 gap-4">
        {imageList.map((imageObject, idx) => (
          <div
            key={idx}
            className="relative rounded-xl overflow-hidden shadow-md bg-white mb-4 break-inside-avoid cursor-pointer"
            onClick={() => setModalIndex(idx)}
          >
            <div className="absolute top-2 left-2 z-10 px-3 py-1 rounded-lg bg-black/40 text-white text-xs font-semibold backdrop-blur-sm">
              {imageObject.userName}
            </div>
            {/* Görsel mi video mu kontrolü artık fileType ile */}
            {imageObject.fileType === "video" ? (
              <div
                className="relative w-full h-full flex items-center justify-center bg-black/10 rounded-xl"
                style={{ height: imageObject.height || 200 }}
              >
                {/* Poster görseli varsa göster, yoksa siyah arka plan */}
                {imageObject.posterPath ? (
                  <img
                    src={`http://localhost:5132/${imageObject.posterPath}`}
                    alt="video-poster"
                    className="object-cover w-full h-full rounded-xl"
                  />
                ) : null}
                {/* Play ikonu */}
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.5)" />
                    <polygon points="19,16 34,24 19,32" fill="#fff" />
                  </svg>
                </span>
              </div>
            ) : (
              <Image
                src={`http://localhost:5132/${imageObject.filePath}`}
                alt={`list-preview-${idx}`}
                width={imageObject.width || 300}
                height={imageObject.height || 200}
                className="object-contain rounded-xl block mx-auto"
              />
            )}
          </div>
        ))}
      </div>
      {modalIndex !== null && (
        <ImageModal
          images={imageUrls}
          currentIndex={modalIndex}
          onClose={() => setModalIndex(null)}
          onPrev={() => setModalIndex((i) => Math.max(0, i - 1))}
          onNext={() =>
            setModalIndex((i) => Math.min(imageUrls.length - 1, i + 1))
          }
        />
      )}
    </div>
  );
}

export default ImageList;
