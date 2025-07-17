"use client";
import React from "react";
import Image from "next/image";

function ImagePreview({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-4 mt-4 justify-center">
      {images.map((img, idx) => {
        const url = typeof img === "string" ? img : URL.createObjectURL(img);
        return (
          <div key={idx} className="border rounded-lg p-2 bg-gray-50 shadow-sm">
            <Image
              src={url}
              alt={`preview-${idx}`}
              width={128}
              height={128}
              className="w-32 h-32 object-cover rounded-md"
            />
          </div>
        );
      })}
    </div>
  );
}

export default ImagePreview;
