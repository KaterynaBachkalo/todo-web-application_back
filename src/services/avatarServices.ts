import multer, { FileFilterCallback } from "multer";
import serverConfig from "../configs/serverConfig";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

interface CustomUser {
  user: {
    _id: string;
    email: string;
    name: string;
    favorites: string[];
    avatar: string;
    phone: number;
  };
}
// ------------------ FOR STORAGE IN CLOUDINARY -----------------//

cloudinary.v2.config({
  cloud_name: serverConfig.cloudinaryName,
  api_key: serverConfig.cloudinaryKey,
  api_secret: serverConfig.cloudinarySecret,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: async (req: CustomUser, file) => {
    const folder = file.fieldname === "imgURL" ? "pet-avatars" : "avatars";
    const fileName = `${req.user._id}-${uuidv4()}`;
    return {
      folder,
      allowed_formats: ["jpg", "png"],
      public_id: fileName,
      transformation: [{ width: 350, height: 350, crop: "fill" }],
    };
  },
});

const upload = multer({ storage });

const createAvatar = async (file: Express.Multer.File) => {
  return (file as any).path;
};

const createPetAvatar = async (file: Express.Multer.File) => {
  return (file as any).path;
};

export { upload, createAvatar, createPetAvatar };
