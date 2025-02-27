import { model, Schema } from "mongoose";
import { IMyPet } from "../types";

const addPetSchema = new Schema<IMyPet>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    title: {
      type: String,
      required: [true, "Set title of pet"],
    },
    imgURL: {
      type: String,
      required: [true, "Set image of pet"],
    },
    species: {
      type: String,
      required: [true, "Set species of pet"],
    },
    birthday: {
      type: String,
      required: [true, "Set birthday of pet"],
    },
    sex: {
      type: String,
      required: [true, "Set sex of pet"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const AddPet = model<IMyPet>("AddPet", addPetSchema);
