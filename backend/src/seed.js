import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { v2 as cloudinary } from "cloudinary";

import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/mongodb.js";
import productModel from "./models/productModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendAssetsPath = path.resolve(__dirname, "../../frontend/src/assets");

const products = [
  {
    bestseller: true,
    category: "Women",
    description:
      "Áo nữ cổ tròn cotton - Sản phẩm thời trang nữ, thuộc dòng áo mặc trên (Topwear). Chất liệu cotton thoáng khí, phù hợp cho các hoạt động hàng ngày.",
    image: ["p_img1.png"],
    name: "Áo nữ cổ tròn cotton",
    price: 100000,
    sizes: ["S", "M", "L"],
    subCategory: "Topwear",
  },
  {
    bestseller: true,
    category: "Men",
    description:
      "Áo thun nam cổ tròn cotton nguyên chất - Sản phẩm thời trang nam, thuộc dòng áo mặc trên (Topwear). Chất liệu cotton 100% thoáng khí, kiểu dáng đơn giản.",
    image: ["p_img2_1.png", "p_img2_2.png", "p_img2_3.png", "p_img2_4.png"],
    name: "Áo thun nam cổ tròn cotton nguyên chất",
    price: 200000,
    sizes: ["M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: true,
    category: "Kids",
    description:
      "Áo nữ giới cổ tròn cotton - Sản phẩm thời trang trẻ em, thuộc dòng áo mặc trên (Topwear). Phù hợp cho bé gái, chất liệu cotton mềm mại.",
    image: ["p_img3.png"],
    name: "Áo nữ giới cổ tròn cotton",
    price: 220000,
    sizes: ["S", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: true,
    category: "Men",
    description:
      "Áo thun nam cổ tròn cotton nguyên chất - Sản phẩm thời trang nam, thuộc dòng áo mặc trên (Topwear). Chất liệu cotton 100%, kiểu dáng thoải mái.",
    image: ["p_img4.png"],
    name: "Áo thun nam cổ tròn cotton nguyên chất",
    price: 110000,
    sizes: ["S", "M", "XXL"],
    subCategory: "Topwear",
  },
  {
    bestseller: true,
    category: "Women",
    description:
      "Áo nữ cổ tròn cotton - Sản phẩm thời trang nữ, thuộc dòng áo mặc trên (Topwear). Thiết kế cổ tròn thanh lịch, phù hợp nhiều phong cách.",
    image: ["p_img5.png"],
    name: "Áo nữ cổ tròn cotton",
    price: 130000,
    sizes: ["M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: true,
    category: "Kids",
    description:
      "Áo nữ giới cổ tròn cotton - Sản phẩm thời trang trẻ em, thuộc dòng áo mặc trên (Topwear). Màu sắc tươi sáng, phù hợp cho bé.",
    image: ["p_img6.png"],
    name: "Áo nữ giới cổ tròn cotton",
    price: 140000,
    sizes: ["S", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Men",
    description:
      "Quần âu nam dạng ôm - Sản phẩm thời trang nam, thuộc dòng quần mặc dưới (Bottomwear). Kiểu dáng ôm body, phù hợp cho công sở và dạo phố.",
    image: ["p_img7.png"],
    name: "Quần âu nam dạng ôm",
    price: 190000,
    sizes: ["S", "L", "XL"],
    subCategory: "Bottomwear",
  },
  {
    bestseller: false,
    category: "Men",
    description:
      "Áo thun nam cổ tròn cotton nguyên chất - Sản phẩm thời trang nam, thuộc dòng áo mặc trên (Topwear). Form dáng ôm, chất liệu cao cấp.",
    image: ["p_img8.png"],
    name: "Áo thun nam cổ tròn cotton nguyên chất",
    price: 140000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Kids",
    description:
      "Áo nữ giới cổ tròn cotton - Sản phẩm thời trang trẻ em, thuộc dòng áo mặc trên (Topwear). Thiết kế đơn giản, dễ phối đồ cho bé.",
    image: ["p_img9.png"],
    name: "Áo nữ giới cổ tròn cotton",
    price: 100000,
    sizes: ["M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Men",
    description:
      "Quần âu nam dạng ôm - Sản phẩm thời trang nam, thuộc dòng quần mặc dưới (Bottomwear). Chất liệu vải cao cấp, form dáng hiện đại.",
    image: ["p_img10.png"],
    name: "Quần âu nam dạng ôm",
    price: 110000,
    sizes: ["S", "L", "XL"],
    subCategory: "Bottomwear",
  },
  {
    bestseller: false,
    category: "Men",
    description:
      "Áo thun nam cổ tròn cotton nguyên chất - Sản phẩm thời trang nam, thuộc dòng áo mặc trên (Topwear). Kiểu dáng trẻ trung, phong cách.",
    image: ["p_img11.png"],
    name: "Áo thun nam cổ tròn cotton nguyên chất",
    price: 120000,
    sizes: ["S", "M", "L"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Men",
    description:
      "Áo thun nam cổ tròn cotton nguyên chất - Sản phẩm thời trang nam, thuộc dòng áo mặc trên (Topwear). Màu sắc đa dạng, dễ phối đồ.",
    image: ["p_img12.png"],
    name: "Áo thun nam cổ tròn cotton nguyên chất",
    price: 150000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Women",
    description:
      "Áo nữ cổ tròn cotton - Sản phẩm thời trang nữ, thuộc dòng áo mặc trên (Topwear). Chất liệu cotton mềm mại, form dáng nữ tính.",
    image: ["p_img13.png"],
    name: "Áo nữ cổ tròn cotton",
    price: 130000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Kids",
    description:
      "Áo thun bé trai cổ tròn cotton nguyên chất - Sản phẩm thời trang trẻ em, thuộc dòng áo mặc trên (Topwear). Phù hợp cho bé trai, chất liệu an toàn.",
    image: ["p_img14.png"],
    name: "Áo thun bé trai cổ tròn cotton nguyên chất",
    price: 160000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Men",
    description:
      "Quần âu nam dạng ôm - Sản phẩm thời trang nam, thuộc dòng quần mặc dưới (Bottomwear). Thiết kế thanh lịch, phù hợp cho phái mạnh.",
    image: ["p_img15.png"],
    name: "Quần âu nam dạng ôm",
    price: 140000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Bottomwear",
  },
  {
    bestseller: false,
    category: "Kids",
    description:
      "Áo nữ giới cổ tròn cotton - Sản phẩm thời trang trẻ em, thuộc dòng áo mặc trên (Topwear). Thiết kế dễ thương, phù hợp cho bé gái.",
    image: ["p_img16.png"],
    name: "Áo nữ giới cổ tròn cotton",
    price: 170000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Men",
    description:
      "Quần âu nam dạng ôm - Sản phẩm thời trang nam, thuộc dòng quần mặc dưới (Bottomwear). Phù hợp cho các buổi gặp mặt, sự kiện.",
    image: ["p_img17.png"],
    name: "Quần âu nam dạng ôm",
    price: 150000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Bottomwear",
  },
  {
    bestseller: false,
    category: "Kids",
    description:
      "Áo thun bé trai cổ tròn cotton nguyên chất - Sản phẩm thời trang trẻ em, thuộc dòng áo mặc trên (Topwear). Chất liệu cotton cao cấp, thoải mái.",
    image: ["p_img18.png"],
    name: "Áo thun bé trai cổ tròn cotton nguyên chất",
    price: 180000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Kids",
    description:
      "Áo thun bé trai cổ tròn cotton nguyên chất - Sản phẩm thời trang trẻ em, thuộc dòng áo mặc trên (Topwear). Màu sắc nam tính, dễ phối đồ.",
    image: ["p_img19.png"],
    name: "Áo thun bé trai cổ tròn cotton nguyên chất",
    price: 160000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Women",
    description:
      "Quần palazzo nữ có dây lưng - Sản phẩm thời trang nữ, thuộc dòng quần mặc dưới (Bottomwear). Kiểu dáng rộng rãi, thoải mái, có dây lưng.",
    image: ["p_img20.png"],
    name: "Quần palazzo nữ có dây lưng",
    price: 190000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Bottomwear",
  },
  {
    bestseller: false,
    category: "Women",
    description:
      "Áo khoác nữ zipper form rộng - Sản phẩm thời trang nữ, thuộc dòng áo khoác mùa đông (Winterwear). Thiết kế zipper tiện lợi, form rộng thoải mái.",
    image: ["p_img21.png"],
    name: "Áo khoác nữ zipper form rộng",
    price: 170000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
  {
    bestseller: false,
    category: "Women",
    description:
      "Quần palazzo nữ có dây lưng - Sản phẩm thời trang nữ, thuộc dòng quần mặc dưới (Bottomwear). Form dáng nữ tính, phù hợp cho phái đẹp.",
    image: ["p_img22.png"],
    name: "Quần palazzo nữ có dây lưng",
    price: 200000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Bottomwear",
  },
  {
    bestseller: false,
    category: "Kids",
    description:
      "Áo thun bé trai cổ tròn cotton nguyên chất - Sản phẩm thời trang trẻ em, thuộc dòng áo mặc trên (Topwear). Kiểu dáng đơn giản, phù hợp cho bé.",
    image: ["p_img23.png"],
    name: "Áo thun bé trai cổ tròn cotton nguyên chất",
    price: 180000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Kids",
    description:
      "Áo thun bé trai cổ tròn cotton nguyên chất - Sản phẩm thời trang trẻ em, thuộc dòng áo mặc trên (Topwear). Chất liệu cotton an toàn cho làn da bé.",
    image: ["p_img24.png"],
    name: "Áo thun bé trai cổ tròn cotton nguyên chất",
    price: 210000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Kids",
    description:
      "Áo nữ giới cổ tròn cotton - Sản phẩm thời trang trẻ em, thuộc dòng áo mặc trên (Topwear). Thiết kế cổ tròn kinh điển, phù hợp cho mọi hoạt động.",
    image: ["p_img25.png"],
    name: "Áo nữ giới cổ tròn cotton",
    price: 190000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Women",
    description:
      "Áo khoác nữ zipper form rộng - Sản phẩm thời trang nữ, thuộc dòng áo khoác mùa đông (Winterwear). Giữ ấm tốt, kiểu dáng thời trang.",
    image: ["p_img26.png"],
    name: "Áo khoác nữ zipper form rộng",
    price: 220000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
  {
    bestseller: false,
    category: "Kids",
    description:
      "Áo nữ giới cổ tròn cotton - Sản phẩm thời trang trẻ em, thuộc dòng áo mặc trên (Topwear). Chất liệu cotton thoáng khí, thoải mái cho bé.",
    image: ["p_img27.png"],
    name: "Áo nữ giới cổ tròn cotton",
    price: 200000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Men",
    description:
      "Áo khoác denim nam slim fit form rộng - Sản phẩm thời trang nam, thuộc dòng áo khoác mùa đông (Winterwear). Chất liệu denim cao cấp, form slim fit.",
    image: ["p_img28.png"],
    name: "Áo khoác denim nam slim fit form rộng",
    price: 230000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
  {
    bestseller: false,
    category: "Women",
    description:
      "Áo nữ cổ tròn cotton - Sản phẩm thời trang nữ, thuộc dòng áo mặc trên (Topwear). Màu sắc trang nhã, phù hợp cho công sở.",
    image: ["p_img29.png"],
    name: "Áo nữ cổ tròn cotton",
    price: 210000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Kids",
    description:
      "Áo nữ giới cổ tròn cotton - Sản phẩm thời trang trẻ em, thuộc dòng áo mặc trên (Topwear). Kiểu dáng dễ thương, phù hợp cho bé gái.",
    image: ["p_img30.png"],
    name: "Áo nữ giới cổ tròn cotton",
    price: 240000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Men",
    description:
      "Áo thun nam cổ tròn cotton nguyên chất - Sản phẩm thời trang nam, thuộc dòng áo mặc trên (Topwear). Chất liệu cotton 100%, bền đẹp theo thời gian.",
    image: ["p_img31.png"],
    name: "Áo thun nam cổ tròn cotton nguyên chất",
    price: 220000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Men",
    description:
      "Áo thun nam cổ tròn cotton nguyên chất - Sản phẩm thời trang nam, thuộc dòng áo mặc trên (Topwear). Phù hợp cho phái mạnh yêu thích sự đơn giản.",
    image: ["p_img32.png"],
    name: "Áo thun nam cổ tròn cotton nguyên chất",
    price: 250000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Kids",
    description:
      "Áo nữ giới cổ tròn cotton - Sản phẩm thời trang trẻ em, thuộc dòng áo mặc trên (Topwear). Chất liệu cotton mềm mại, an toàn cho bé.",
    image: ["p_img33.png"],
    name: "Áo nữ giới cổ tròn cotton",
    price: 230000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Women",
    description:
      "Áo nữ cổ tròn cotton - Sản phẩm thời trang nữ, thuộc dòng áo mặc trên (Topwear). Kiểu dáng nữ tính, phù hợp cho phái đẹp.",
    image: ["p_img34.png"],
    name: "Áo nữ cổ tròn cotton",
    price: 260000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Women",
    description:
      "Áo khoác nữ zipper form rộng - Sản phẩm thời trang nữ, thuộc dòng áo khoác mùa đông (Winterwear). Form rộng, giữ ấm tốt cho mùa đông.",
    image: ["p_img35.png"],
    name: "Áo khoác nữ zipper form rộng",
    price: 240000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
  {
    bestseller: false,
    category: "Women",
    description:
      "Áo khoác nữ zipper form rộng - Sản phẩm thời trang nữ, thuộc dòng áo khoác mùa đông (Winterwear). Thiết kế zipper tiện lợi, phong cách.",
    image: ["p_img36.png"],
    name: "Áo khoác nữ zipper form rộng",
    price: 270000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
  {
    bestseller: false,
    category: "Women",
    description:
      "Áo nữ cổ tròn cotton - Sản phẩm thời trang nữ, thuộc dòng áo mặc trên (Topwear). Chất liệu cotton cao cấp, form dáng thoải mái.",
    image: ["p_img37.png"],
    name: "Áo nữ cổ tròn cotton",
    price: 250000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Men",
    description:
      "Áo thun nam cổ tròn cotton nguyên chất - Sản phẩm thời trang nam, thuộc dòng áo mặc trên (Topwear). Kiểu dáng hiện đại, phù hợp cho giới trẻ.",
    image: ["p_img38.png"],
    name: "Áo thun nam cổ tròn cotton nguyên chất",
    price: 280000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Men",
    description:
      "Áo sơ mi nam cotton trơn in - Sản phẩm thời trang nam, thuộc dòng áo mặc trên (Topwear). Thiết kế sơ mi cổ điển, chất liệu cotton.",
    image: ["p_img39.png"],
    name: "Áo sơ mi nam cotton trơn in",
    price: 260000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Men",
    description:
      "Áo khoác denim nam slim fit form rộng - Sản phẩm thời trang nam, thuộc dòng áo khoác mùa đông (Winterwear). Chất liệu denim bền, form slim fit ôm body.",
    image: ["p_img40.png"],
    name: "Áo khoác denim nam slim fit form rộng",
    price: 290000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
  {
    bestseller: false,
    category: "Men",
    description:
      "Áo thun nam cổ tròn cotton nguyên chất - Sản phẩm thời trang nam, thuộc dòng áo mặc trên (Topwear). Màu sắc đa dạng, dễ phối đồ.",
    image: ["p_img41.png"],
    name: "Áo thun nam cổ tròn cotton nguyên chất",
    price: 270000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Kids",
    description:
      "Áo thun bé trai cổ tròn cotton nguyên chất - Sản phẩm thời trang trẻ em, thuộc dòng áo mặc trên (Topwear). Form dáng thoải mái, phù hợp cho bé.",
    image: ["p_img42.png"],
    name: "Áo thun bé trai cổ tròn cotton nguyên chất",
    price: 300000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Topwear",
  },
  {
    bestseller: false,
    category: "Kids",
    description:
      "Quần âu trẻ em dạng ôm slim fit - Sản phẩm thời trang trẻ em, thuộc dòng quần mặc dưới (Bottomwear). Form dáng ôm, phù hợp cho bé.",
    image: ["p_img43.png"],
    name: "Quần âu trẻ em dạng ôm slim fit",
    price: 280000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Bottomwear",
  },
  {
    bestseller: false,
    category: "Women",
    description:
      "Áo khoác nữ zipper form rộng - Sản phẩm thời trang nữ, thuộc dòng áo khoác mùa đông (Winterwear). Kiểu dáng thời trang, giữ ấm hiệu quả.",
    image: ["p_img44.png"],
    name: "Áo khoác nữ zipper form rộng",
    price: 310000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
  {
    bestseller: false,
    category: "Men",
    description:
      "Áo khoác denim nam slim fit form rộng - Sản phẩm thời trang nam, thuộc dòng áo khoác mùa đông (Winterwear). Phù hợp cho phái mạnh yêu thích phong cách denim.",
    image: ["p_img45.png"],
    name: "Áo khoác denim nam slim fit form rộng",
    price: 290000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
  {
    bestseller: false,
    category: "Men",
    description:
      "Áo khoác denim nam slim fit form rộng - Sản phẩm thời trang nam, thuộc dòng áo khoác mùa đông (Winterwear). Chất liệu denim cao cấp, bền đẹp.",
    image: ["p_img46.png"],
    name: "Áo khoác denim nam slim fit form rộng",
    price: 320000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
  {
    bestseller: false,
    category: "Kids",
    description:
      "Quần âu trẻ em dạng ôm slim fit - Sản phẩm thời trang trẻ em, thuộc dòng quần mặc dưới (Bottomwear). Chất liệu vải cao cấp, thoải mái cho bé.",
    image: ["p_img47.png"],
    name: "Quần âu trẻ em dạng ôm slim fit",
    price: 300000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Bottomwear",
  },
  {
    bestseller: false,
    category: "Men",
    description:
      "Áo khoác denim nam slim fit form rộng - Sản phẩm thời trang nam, thuộc dòng áo khoác mùa đông (Winterwear). Kiểu dáng hiện đại, phù hợp cho mùa đông.",
    image: ["p_img48.png"],
    name: "Áo khoác denim nam slim fit form rộng",
    price: 330000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
  {
    bestseller: false,
    category: "Kids",
    description:
      "Quần âu trẻ em dạng ôm slim fit - Sản phẩm thời trang trẻ em, thuộc dòng quần mặc dưới (Bottomwear). Form dáng hiện đại, phù hợp cho bé.",
    image: ["p_img49.png"],
    name: "Quần âu trẻ em dạng ôm slim fit",
    price: 310000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Bottomwear",
  },
  {
    bestseller: false,
    category: "Kids",
    description:
      "Quần âu trẻ em dạng ôm slim fit - Sản phẩm thời trang trẻ em, thuộc dòng quần mặc dưới (Bottomwear). Màu sắc đa dạng, dễ phối đồ cho bé.",
    image: ["p_img50.png"],
    name: "Quần âu trẻ em dạng ôm slim fit",
    price: 340000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Bottomwear",
  },
  {
    bestseller: false,
    category: "Women",
    description:
      "Áo khoác nữ zipper form rộng - Sản phẩm thời trang nữ, thuộc dòng áo khoác mùa đông (Winterwear). Phù hợp cho phái đẹp trong mùa đông giá lạnh.",
    image: ["p_img51.png"],
    name: "Áo khoác nữ zipper form rộng",
    price: 320000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
  {
    bestseller: false,
    category: "Men",
    description:
      "Áo khoác denim nam slim fit form rộng - Sản phẩm thời trang nam, thuộc dòng áo khoác mùa đông (Winterwear). Form slim fit, giữ ấm tốt cho phái mạnh.",
    image: ["p_img52.png"],
    name: "Áo khoác denim nam slim fit form rộng",
    price: 350000,
    sizes: ["S", "M", "L", "XL"],
    subCategory: "Winterwear",
  },
];

const uploadImageToCloudinary = (imagePath) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "1-e-commerce-app/products", resource_type: "image" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      },
    );
    stream.end(fs.readFileSync(imagePath));
  });
};

const seedProducts = async () => {
  try {
    await connectDB();
    connectCloudinary();

    const existingCount = await productModel.countDocuments();
    if (existingCount > 0) {
      console.log(`Có ${existingCount} sản phẩm trong database. Bỏ qua seed.`);
      process.exit(0);
    }

    console.log("Bắt đầu seed dữ liệu sản phẩm...");

    const seededProducts = [];

    for (const product of products) {
      const imageUrls = [];

      for (const imageName of product.image) {
        const imagePath = path.join(frontendAssetsPath, imageName);

        if (fs.existsSync(imagePath)) {
          console.log(`Đang upload: ${imageName}`);
          const url = await uploadImageToCloudinary(imagePath);
          imageUrls.push(url);
        } else {
          console.log(`Không tìm thấy: ${imageName}`);
        }
      }

      if (imageUrls.length > 0) {
        seededProducts.push({
          bestseller: product.bestseller,
          category: product.category,
          date: Date.now(),
          description: product.description,
          image: imageUrls,
          name: product.name,
          price: product.price,
          sizes: product.sizes,
          subCategory: product.subCategory,
        });
      }
    }

    if (seededProducts.length > 0) {
      await productModel.insertMany(seededProducts);
      console.log(`Đã seed thành công ${seededProducts.length} sản phẩm!`);
    } else {
      console.log("Không có sản phẩm nào để seed.");
    }

    process.exit(0);
  } catch (error) {
    console.error("Lỗi khi seed dữ liệu:", error);
    process.exit(1);
  }
};

seedProducts();
