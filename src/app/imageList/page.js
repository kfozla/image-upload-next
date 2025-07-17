"use client";
import Header from "../components/Header";
import ImageList from "../components/ImageList";
import { getImages, getUserImages } from "../api/apiClient";
import { useState, useEffect } from "react";
import ImageUploadForm from "../components/ImageUploadForm";
import UserImageList from "../components/UserImageList";

export default function ImagesPage() {
  const [images, setImages] = useState([]);
  const [userImages, setUserImages] = useState([]);
  useEffect(() => {
    async function fetchImages() {
      try {
        const data = await getImages();
        setImages(data);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
      try {
        const userName =
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("username="))
            ?.split("=")[1] || "";
        if (!userName) {
          console.error("Username not found in cookies");
          return;
        }
        const data = await getUserImages(userName);
        setUserImages(data);
      } catch (error) {
        console.error("Failed to fetch user images:", error);
      }
    }
    fetchImages();
  }, []);

  return (
    <div>
      <Header />
      <ImageUploadForm />
      <UserImageList imageList={userImages} />
      <ImageList imageList={images} />
    </div>
  );
}
