import axios from "axios";

const url = "http://localhost:5132/api";

const apiClient = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getImages = async () => {
  try {
    const response = await apiClient.get("/image/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};
export const uploadImages = async (formData, onUploadProgress) => {
  try {
    const response = await apiClient.post("image/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};
export const deleteImage = async (imageId) => {
  try {
    const response = await apiClient.delete(`/image/delete`, {
      params: { id: imageId },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};
export const getUserImages = async (username) => {
  try {
    const response = await apiClient.get(`/image/user/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user images:", error);
    throw error;
  }
};
