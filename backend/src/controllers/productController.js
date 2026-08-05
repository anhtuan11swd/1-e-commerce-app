import { v2 as cloudinary } from "cloudinary";

import productModel from "../models/productModel.js";
import {
  addProductBodySchema,
  removeProductSchema,
  singleProductSchema,
  updateProductSchema,
} from "../utils/validation.js";

const extractPublicId = (url) => {
  const parts = url.split("/");
  const uploadIndex = parts.indexOf("upload");
  if (uploadIndex === -1) return null;
  const withVersion = parts.slice(uploadIndex + 1);
  if (withVersion[0]?.startsWith("v")) withVersion.shift();
  const path = withVersion.join("/");
  return path.replace(/\.[^.]+$/, "");
};

const deleteCloudinaryImages = async (images) => {
  if (!images || images.length === 0) return;
  await Promise.all(
    images.map(async (url) => {
      const publicId = extractPublicId(url);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId, {
          resource_type: "image",
        });
      }
    }),
  );
};

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    let parsedSizes;
    try {
      parsedSizes = JSON.parse(sizes);
    } catch {
      return res.json({
        message: "Định dạng kích thước không hợp lệ",
        success: false,
      });
    }

    const parsed = addProductBodySchema.safeParse({
      bestseller,
      category,
      description,
      name,
      price: Number(price),
      sizes: parsedSizes,
      subCategory,
    });

    if (!parsed.success) {
      return res.json({
        message: parsed.error.issues[0].message,
        success: false,
      });
    }

    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );

    if (images.length === 0) {
      return res.json({
        message: "Cần ít nhất một hình ảnh",
        success: false,
      });
    }

    const imageUrl = await Promise.all(
      images.map(async (item) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "1-e-commerce-app/products", resource_type: "image" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            },
          );
          stream.end(item.buffer);
        });
      }),
    );

    const productData = {
      bestseller: bestseller === "true",
      category,
      date: Date.now(),
      description,
      image: imageUrl,
      name: parsed.data.name,
      price: parsed.data.price,
      sizes: parsed.data.sizes,
      subCategory,
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ message: "Sản phẩm đã được thêm thành công", success: true });
  } catch {
    res.json({ message: "Lỗi", success: false });
  }
};

const listProducts = async (_req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ products, success: true });
  } catch {
    res.json({ message: "Lỗi", success: false });
  }
};

const removeProduct = async (req, res) => {
  try {
    const parsed = removeProductSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.json({
        message: parsed.error.issues[0].message,
        success: false,
      });
    }

    const product = await productModel.findById(parsed.data.id);
    if (!product) {
      return res.json({
        message: "Không tìm thấy sản phẩm",
        success: false,
      });
    }

    await deleteCloudinaryImages(product.image);
    await productModel.findByIdAndDelete(parsed.data.id);

    res.json({ message: "Sản phẩm đã được xóa thành công", success: true });
  } catch {
    res.json({ message: "Lỗi", success: false });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id, sizes, bestseller, price, ...otherFields } = req.body;

    const parsedData = { ...otherFields };
    if (price !== undefined) parsedData.price = Number(price);
    if (bestseller !== undefined) parsedData.bestseller = bestseller;

    if (sizes !== undefined) {
      let parsedSizes;
      try {
        parsedSizes = JSON.parse(sizes);
      } catch {
        return res.json({
          message: "Định dạng kích thước không hợp lệ",
          success: false,
        });
      }
      parsedData.sizes = parsedSizes;
    }

    const parsed = updateProductSchema.safeParse({
      id,
      ...parsedData,
    });

    if (!parsed.success) {
      return res.json({
        message: parsed.error.issues[0].message,
        success: false,
      });
    }

    const existingProduct = await productModel.findById(id);
    if (!existingProduct) {
      return res.json({
        message: "Không tìm thấy sản phẩm",
        success: false,
      });
    }

    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];

    const newImages = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );

    const updateData = { ...parsed.data };
    delete updateData.id;

    if (newImages.length > 0) {
      await deleteCloudinaryImages(existingProduct.image);

      const imageUrl = await Promise.all(
        newImages.map(async (item) => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "1-e-commerce-app/products", resource_type: "image" },
              (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
              },
            );
            stream.end(item.buffer);
          });
        }),
      );

      updateData.image = imageUrl;
    }

    if (updateData.bestseller !== undefined) {
      updateData.bestseller = updateData.bestseller === "true";
    }

    await productModel.findByIdAndUpdate(id, updateData);

    res.json({
      message: "Sản phẩm đã được cập nhật thành công",
      success: true,
    });
  } catch {
    res.json({ message: "Lỗi", success: false });
  }
};

const singleProduct = async (req, res) => {
  try {
    const parsed = singleProductSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.json({
        message: parsed.error.issues[0].message,
        success: false,
      });
    }

    const product = await productModel.findById(parsed.data.productId);
    if (!product) {
      return res.json({
        message: "Không tìm thấy sản phẩm",
        success: false,
      });
    }

    res.json({ product, success: true });
  } catch {
    res.json({ message: "Lỗi", success: false });
  }
};

export {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
  updateProduct,
};
