import mongoose, { Schema, Document } from "mongoose";

export interface IStore extends Document {
  owner_id: mongoose.Schema.Types.ObjectId;
  store_name: string;
  image_link: string;
  location: string;
  latitude: number;
  longitude: number;
  contact_info: string;
  opening_hours: string;
  description: string;
}

const StoreSchema = new Schema(
  {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    store_name: {
      type: String,
      required: true,
    },
    image_link: {
      type: String,
      default: "/img/default-store.jpg",
    },
    location: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      default: 0.0,
    },
    longitude: {
      type: Number,
      default: 0.0,
    },
    contact_info: {
      type: String,
      default: "-",
    },
    opening_hours: {
      type: String,
      default: "-",
    },
    description: {
      type: String,
      default: "-",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IStore>("Store", StoreSchema);
