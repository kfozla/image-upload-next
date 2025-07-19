"use client";
import Header from "../components/Header";
import ImageList from "../components/ImageList";
import { getImages, getUserImages } from "../api/apiClient";
import { useState, useEffect } from "react";
import ImageUploadForm from "../components/ImageUploadForm";
import UserImageList from "../components/UserImageList";

export default function ImagesPage() {
  const [userImages, setUserImages] = useState([]);
  const [listImages, setListImages] = useState([]);
  useEffect(() => {
    async function fetchImages() {
      try {
        const data = await getImages();

        const userName =
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("username="))
            ?.split("=")[1] || "";
        if (!userName) {
          console.error("Username not found in cookies");
          return;
        }
        const userImagesdata = data.filter(
          (image) => image.userName === userName
        );
        setUserImages(userImagesdata);
        const listImagesData = data.filter(
          (image) => image.userName !== userName
        );
        setListImages(listImagesData);
      } catch (error) {
        console.error("Failed to fetch images or user images:", error);
      }
    }
    fetchImages();
  }, []);
  {
    console.log("User Images:", userImages);
    console.log("List Images:", listImages);
  }

  return (
    <div className=" bg-[#f8f5ef]">
      <Header />
      <ImageUploadForm />
      <UserImageList imageList={userImages} />
      <ImageList imageList={listImages} />
    </div>
  );
}
