import { model, Schema } from "mongoose";
import { IPet } from "../types";

const addPetSchema = new Schema<IPet>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    title: {
      type: String,
      required: [true, "Set title of pet"],
    },
    imgUrl: {
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const AddPet = model<IPet>("AddPet", addPetSchema);
