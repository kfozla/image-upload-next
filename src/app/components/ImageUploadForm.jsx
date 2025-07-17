"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import ImagePreview from "./ImagePreview";
import { uploadImages } from "../api/apiClient";

function ImageUploadForm() {
  const [username, setUsername] = useState("");
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [uploadedUsername, setUploadedUsername] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const cookieUser =
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("username="))
          ?.split("=")[1] || "";
      setUsername(cookieUser);
    }
  }, []);

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files ?? []);
    const convertedImages = [];
    setProgress(10); // Dönüştürme başlıyor
    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (
        file.type === "image/heic" ||
        file.name.toLowerCase().endsWith(".heic")
      ) {
        try {
          const heic2any = (await import("heic2any")).default;
          const convertedBlob = await heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 0.9,
          });
          const convertedFile = new File(
            [convertedBlob],
            file.name.replace(/\.heic$/i, ".jpg"),
            { type: "image/jpeg" }
          );
          convertedImages.push(convertedFile);
        } catch (err) {
          console.error("HEIC dönüştürme hatası:", err);
          convertedImages.push(file);
        }
      } else {
        convertedImages.push(file);
      }
    }
    setImages(convertedImages);
    setUploading(false);
    setProgress(0); // Dönüştürme bittiğinde progress sıfırlanır
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(false);
    setProgress(0);
    setUploading(true);

    if (!username || images.length === 0) {
      alert("Lütfen kullanıcı adınızı ve en az bir görsel seçin.");
      setUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await uploadImages(formData, (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      });
      setProgress(100); // Yükleme tamamlanınca progress 100
      setUploadedUsername(username);
      setShowAlert(true);
      window.location.reload();
    } catch (error) {
      console.error("Görsel yükleme hatası:", error);
      alert("Yükleme sırasında hata oluştu.");
      setProgress(0);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white shadow-md rounded-lg justify-center items-center flex flex-col max-w-md mx-auto mt-10 gap-4"
      >
        <Label htmlFor="image" className="self-start">
          Görsel Yükle
        </Label>
        <Input
          id="image"
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleImageChange}
          required
        />
        <Button
          type="submit"
          className={`mt-2 px-6 py-4${
            (progress > 0 && progress < 100) || uploading
              ? " bg-gray-300 text-gray-500 cursor-not-allowed"
              : ""
          }`}
          disabled={(progress > 0 && progress < 100) || uploading}
        >
          Yükle
        </Button>
        {(uploading || progress > 0) && progress < 100 && (
          <Progress value={progress} className="w-full mt-4" />
        )}
      </form>

      <ImagePreview images={images} uploading={uploading} />

      {showAlert && (
        <Alert className="mt-4 max-w-md mx-auto text-center text-green-600">
          <AlertTitle>Yükleme Başarılı!</AlertTitle>
          <AlertDescription className=" text-sm text-muted-foreground mx-auto ">
            {images.length} görsel başarıyla yüklendi. Kullanıcı adı:{" "}
            {uploadedUsername}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export default ImageUploadForm;
