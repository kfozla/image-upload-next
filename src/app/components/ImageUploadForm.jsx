"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import ImagePreview from "./ImagePreview";

import { uploadImages } from "../api/apiClient";

function ImageUploadForm() {
  const [username, setUsername] = useState("");
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [uploadedUsername, setUploadedUsername] = useState("");

  // HEIC dönüştürme ve dosya seçimi
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const convertedImages = [];

    for (const file of files) {
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
          // Dönüştürme başarısızsa orijinal dosyayı ekle
          convertedImages.push(file);
        }
      } else {
        convertedImages.push(file);
      }
    }

    setImages(convertedImages);
  };

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      const cookieUser =
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("username="))
          ?.split("=")[1] || "";
      setUsername(cookieUser);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(false);
    setProgress(0);

    if (!username || images.length === 0) {
      alert("Lütfen kullanıcı adınızı ve en az bir görsel seçin.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      setProgress(10);
      await uploadImages(formData);
      setProgress(80);
    } catch (error) {
      console.error("Görsel yükleme hatası:", error);
      alert("Görsel yükleme sırasında bir hata oluştu.");
      setProgress(0);
      return;
    }

    setProgress(100);
    setUploadedUsername(username);
    setShowAlert(true);
    console.log("Kullanıcı Adı:", username);
    console.log("Seçilen Görseller:", images);
    window.location.reload();
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
          accept="image/*"
          multiple
          onChange={handleImageChange}
          required
        />
        <Button type="submit" className="mt-2 px-6 py-4">
          Yükle
        </Button>
        {progress > 0 && progress < 100 && (
          <Progress value={progress} className="w-full mt-4" />
        )}
      </form>
      <ImagePreview images={images} />
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
