import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image_link: string;
  store_id: mongoose.Schema.Types.ObjectId;
}

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "-",
    },
    price: {
      type: Number,
      required: true,
    },
    image_link: {
      type: String,
      default: "/img/default-product.jpg",
    },
    store_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Store",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
