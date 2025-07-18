"use client";
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { deleteImage } from "../api/apiClient";
import Image from "next/image";
import ImageModal from "./ImageModal";

function UserImageList({ imageList }) {
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("default");
  const [modalIndex, setModalIndex] = React.useState(null);

  async function handleDelete(id) {
    deleteImage(id)
      .then(() => {
        console.log("Image deleted successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
        if (error?.response?.status === 401) {
          setMessage("Yetkiniz yok. Görseli silemezsiniz.");
          setMessageType("destructive");
        } else {
          setMessage("Görsel silinirken bir hata oluştu.");
          setMessageType("destructive");
        }
        setTimeout(() => setMessage(""), 3000);
      });
  }
  if (!imageList || imageList.length === 0) return null;

  // Modal'da gösterilecek görsellerin url listesi
  const imageUrls = imageList.map(
    (img) => `http://localhost:5132/${img.filePath}`
  );

  return (
    <div className="mb-6 max-w-5xl mx-auto mt-4 px-4">
      <h2 className="text-lg font-semibold mb-4">
        Sizin Yüklediğiniz Görseller
      </h2>
      {message && (
        <div className="mb-4">
          <Alert variant={messageType}>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {imageList.map((imageObject, idx) => (
          <div
            key={idx}
            className="flex flex-col bg-white dark:bg-[#18181b] rounded-2xl shadow-lg border border-border overflow-hidden transition-transform hover:scale-[1.03] hover:shadow-2xl duration-200"
          >
            <div
              className="relative w-full aspect-[4/3] rounded-t-2xl overflow-hidden cursor-pointer"
              onClick={() => setModalIndex(idx)}
            >
              <div className="absolute top-2 left-2 z-10 px-3 py-1 rounded-lg bg-black/40 text-white text-xs font-semibold backdrop-blur-sm">
                {imageObject.userName}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(imageObject.id);
                  }}
                  className="absolute bottom-2 z-10 bg-red-500/80 hover:bg-red-600 text-white text-xs px-4 py-1 rounded-full font-semibold shadow-sm transition-colors backdrop-blur-sm"
                >
                  Sil
                </button>
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
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {modalIndex !== null && (
        <ImageModal
          images={imageUrls}
          imageUsernames={imageList.map((img) => img.userName)}
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

export default UserImageList;
