import { model, Schema } from "mongoose";
import { ICity } from "../types";

const citySchema = new Schema<ICity>(
  {
    _id: {
      type: String,
    },
    useCounty: {
      type: String,
    },
    stateEn: {
      type: String,
    },
    cityEn: {
      type: String,
    },
    countyEn: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Pet = model<ICity>("Notice", citySchema);
