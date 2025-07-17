function ImagePreview({ images, uploading }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="relative">
      <div
        className={`flex flex-wrap gap-4 mt-4 justify-center ${
          uploading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {images.map((img, idx) => {
          const url = typeof img === "string" ? img : URL.createObjectURL(img);
          const fileType =
            img?.fileType ||
            (img?.type?.startsWith("video") ? "video" : "image");
          return (
            <div
              key={idx}
              className="border rounded-lg p-2 bg-gray-50 shadow-sm"
            >
              {fileType === "video" ? (
                <video
                  src={url}
                  controls
                  width={128}
                  height={128}
                  className="w-32 h-32 object-cover rounded-md"
                />
              ) : (
                <img
                  src={url}
                  alt={`preview-${idx}`}
                  width={128}
                  height={128}
                  className="w-32 h-32 object-cover rounded-md"
                />
              )}
            </div>
          );
        })}
      </div>

      {uploading && (
        <div className="text-center mt-2 text-sm text-gray-600 font-semibold">
          Lütfen bekleyiniz...
        </div>
      )}
    </div>
  );
}
export default ImagePreview;
