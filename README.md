# E-Commerce App

> Nền tảng thương mại điện tử thời trang full-stack với giao diện khách hàng, quản trị viên và RESTful API.

**Live Demo:** [Frontend](https://1-e-commerce-app.vercel.app/) | [Admin](https://1-e-commerce-app-admin.vercel.app/)

## Mục lục

- [Giới thiệu](#giới-thiệu)
- [Live Deploy](#live-deploy)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Tính năng](#tính-năng)
- [Hướng dẫn cài đặt](#hướng-dẫn-cài-đặt)
- [Cấu hình môi trường](#cấu-hình-môi-trường)
- [Cách sử dụng](#cách-sử-dụng)
- [API Endpoints](#api-endpoints)
- [Cấu trúc dữ liệu](#cấu-trúc-dữ-liệu)
- [Đóng góp](#đóng-góp)
- [Giấy phép](#giấy-phép)

## Giới thiệu

E-Commerce App là dự án ứng dụng thương mại điện tử bán quần áo thời trang, bao gồm ba thành phần chính:

- **Frontend** — Giao diện mua sắm cho khách hàng (xem sản phẩm, giỏ hàng, đặt hàng, thanh toán Stripe/COD).
- **Backend** — RESTful API với xác thực JWT, quản lý sản phẩm, giỏ hàng, đơn hàng, tích hợp Cloudinary cho lưu trữ hình ảnh và Stripe cho thanh toán.
- **Admin** — Bảng điều khiển quản trị để thêm/sửa/xóa sản phẩm và quản lý trạng thái đơn hàng.

Toàn bộ giao diện sử dụng tiếng Việt, tiền tệ VND.

## Live Deploy

| Ứng dụng              | Link                                                                            |
| --------------------- | ------------------------------------------------------------------------------- |
| Frontend (Khách hàng) | [1-e-commerce-app.vercel.app](https://1-e-commerce-app.vercel.app/)             |
| Admin (Quản trị)      | [1-e-commerce-app-admin.vercel.app](https://1-e-commerce-app-admin.vercel.app/) |

## Công nghệ sử dụng

### Frontend & Admin

| Công nghệ       | Phiên bản | Mục đích                    |
| --------------- | --------- | --------------------------- |
| React           | 19        | UI library                  |
| Vite            | 8         | Build tool & dev server     |
| Tailwind CSS    | 4         | Utility-first CSS framework |
| React Router    | 7         | Client-side routing         |
| Axios           | 1.19      | HTTP client                 |
| Zod             | 4         | Schema validation           |
| React Hot Toast | 2.6       | Toast notifications         |
| Lucide React    | 1.28      | Icon library                |

### Backend

| Công nghệ                                    | Phiên bản | Mục đích           |
| -------------------------------------------- | --------- | ------------------ |
| Node.js                                      | —         | Runtime            |
| Express                                      | 5         | Web framework      |
| MongoDB (Mongoose)                           | 9         | Database & ODM     |
| JWT (jsonwebtoken)                           | 9         | Xác thực           |
| bcrypt                                       | 6         | Mã hóa mật khẩu    |
| Cloudinary                                   | 2.10      | Lưu trữ hình ảnh   |
| Stripe                                       | 22        | Thanh toán online  |
| Multer                                       | 2         | Upload file        |
| Swagger (swagger-jsdoc + swagger-ui-express) | —         | Tài liệu API       |
| Zod                                          | 4         | Request validation |

### Công cụ phát triển

- **Biome** — Linter & formatter
- **ESLint** — JavaScript linting
- **Nodemon** — Auto-restart server khi phát triển

## Cấu trúc dự án

```
1-e-commerce-app/
├── admin/                    # Bảng điều khiển quản trị
│   ├── public/
│   ├── src/
│   │   ├── components/       # Navbar, Sidebar
│   │   ├── config/           # Cấu hình API admin
│   │   ├── pages/            # Add, List, Orders, Login
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/                  # RESTful API
│   ├── src/
│   │   ├── config/           # MongoDB, Cloudinary, Swagger
│   │   ├── controllers/      # Business logic
│   │   ├── middleware/        # Auth, Admin Auth, Multer
│   │   ├── models/           # Mongoose schemas
│   │   ├── repositories/
│   │   ├── routes/           # API route definitions
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/            # Zod validation schemas
│   │   ├── seed.js           # Seed data
│   │   └── server.js         # Entry point
│   └── package.json
├── frontend/                 # Giao diện khách hàng
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/       # Navbar, Footer, Hero, ProductItem, etc.
│   │   ├── context/          # ShopContext (state management)
│   │   ├── pages/            # Home, Collection, Product, Cart, etc.
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Tính năng

### Khách hàng (Frontend)

- Đăng ký / Đăng nhập tài khoản
- Duyệt sản phẩm theo danh mục (Men, Women, Kids) và danh mục con (Topwear, Bottomwear, Winterwear)
- Tìm kiếm sản phẩm
- Xem chi tiết sản phẩm với nhiều hình ảnh và kích thước
- Thêm vào giỏ hàng, cập nhật số lượng
- Đặt hàng với hai phương thức thanh toán:
  - **COD** — Thanh toán khi nhận hàng
  - **Stripe** — Thanh toán online qua Stripe Checkout
- Xem lịch sử đơn hàng và trạng thái giao hàng
- Lazy loading trang với Suspense

### Quản trị viên (Admin)

- Đăng nhập quản trị
- Thêm sản phẩm mới (tên, mô tả, giá, danh mục, kích thước, hình ảnh)
- Chỉnh sửa sản phẩm (cập nhật thông tin và hình ảnh)
- Xóa sản phẩm (hình ảnh tự động xóa trên Cloudinary)
- Xem danh sách tất cả đơn hàng
- Cập nhật trạng thái đơn hàng (Đã đặt hàng → Đang đóng gói → Đang giao hàng → Đang trên đường giao → Đã giao hàng)

### Backend API

- RESTful API với phiên bản hóa (`/api/v1/`)
- Xác thực JWT cho người dùng và quản trị viên
- Validate request đầu vào bằng Zod
- Upload hình ảnh lên Cloudinary thông qua Multer
- Tích hợp Stripe Checkout cho thanh toán online
- Tài liệu Swagger UI tại `/api-docs`
- CORS cho phép gọi API từ Frontend và Admin

## Hướng dẫn cài đặt

### Yêu cầu

- [Node.js](https://nodejs.org/) >= 18
- [MongoDB](https://www.mongodb.com/) (local hoặc MongoDB Atlas)
- Tài khoản [Cloudinary](https://cloudinary.com/) (cho lưu trữ hình ảnh)
- Tài khoản [Stripe](https://stripe.com/) (cho thanh toán online, tùy chọn)

### Bước 1: Clone dự án

```bash
git clone <repository-url>
cd 1-e-commerce-app
```

### Bước 2: Cài đặt dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Admin
cd ../admin
npm install
```

### Bước 3: Cấu hình biến môi trường

Tạo file `.env` trong thư mục `backend/` dựa trên file `.env.example`:

```env
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_api_secret
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=12345678
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

Tạo file `.env` trong thư mục `frontend/`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Tạo file `.env` trong thư mục `admin/`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

## Cấu hình môi trường

| Biết môi trường         | Thư mục         | Mô tả                                          |
| ----------------------- | --------------- | ---------------------------------------------- |
| `PORT`                  | backend         | Cổng server (mặc định: 4000)                   |
| `MONGODB_URI`           | backend         | URI kết nối MongoDB                            |
| `CLOUDINARY_NAME`       | backend         | Tên tài khoản Cloudinary                       |
| `CLOUDINARY_API_KEY`    | backend         | API key Cloudinary                             |
| `CLOUDINARY_SECRET_KEY` | backend         | API secret Cloudinary                          |
| `JWT_SECRET`            | backend         | Secret key cho JWT                             |
| `ADMIN_EMAIL`           | backend         | Email đăng nhập admin                          |
| `ADMIN_PASSWORD`        | backend         | Mật khẩu đăng nhập admin                       |
| `STRIPE_SECRET_KEY`     | backend         | Secret key Stripe (nếu dùng thanh toán online) |
| `FRONTEND_URL`          | backend         | URL frontend (cho Stripe redirect)             |
| `ADMIN_URL`             | backend         | URL admin (cho CORS)                           |
| `VITE_BACKEND_URL`      | frontend, admin | URL backend API                                |

## Cách sử dụng

### Chạy trong môi trường phát triển

Mở 3 terminal riêng biệt:

```bash
# Terminal 1 — Backend (port 4000)
cd backend
npm run dev

# Terminal 2 — Frontend (port 5173)
cd frontend
npm run dev

# Terminal 3 — Admin (port 5174)
cd admin
npm run dev
```

> **Lưu ý:** Lệnh `npm run dev` của backend sẽ tự động chạy seed data lần đầu (`node src/seed.js`).

### Chạy trong môi trường production

```bash
# Build Frontend & Admin
cd frontend && npm run build
cd ../admin && npm run build

# Start Backend
cd ../backend
npm start
```

### Tài liệu API

Sau khi backend khởi động, truy cập Swagger UI tại:

```
http://localhost:4000/api-docs
```

## API Endpoints

### User — `/api/v1/user`

| Method | Endpoint    | Mô tả                    | Auth |
| ------ | ----------- | ------------------------ | ---- |
| POST   | `/register` | Đăng ký người dùng mới   | —    |
| POST   | `/login`    | Đăng nhập người dùng     | —    |
| POST   | `/admin`    | Đăng nhập admin          | —    |
| POST   | `/profile`  | Lấy thông tin người dùng | User |

### Product — `/api/v1/product`

| Method | Endpoint  | Mô tả                 | Auth  |
| ------ | --------- | --------------------- | ----- |
| GET    | `/list`   | Lấy tất cả sản phẩm   | —     |
| POST   | `/single` | Lấy chi tiết sản phẩm | —     |
| POST   | `/add`    | Thêm sản phẩm mới     | Admin |
| POST   | `/update` | Cập nhật sản phẩm     | Admin |
| POST   | `/remove` | Xóa sản phẩm          | Admin |

### Cart — `/api/v1/cart`

| Method | Endpoint  | Mô tả                       | Auth |
| ------ | --------- | --------------------------- | ---- |
| POST   | `/add`    | Thêm sản phẩm vào giỏ hàng  | User |
| POST   | `/update` | Cập nhật số lượng trong giỏ | User |
| POST   | `/get`    | Lấy dữ liệu giỏ hàng        | User |

### Order — `/api/v1/order`

| Method | Endpoint        | Mô tả                        | Auth  |
| ------ | --------------- | ---------------------------- | ----- |
| POST   | `/place`        | Đặt hàng (COD)               | User  |
| POST   | `/stripe`       | Đặt hàng (Stripe)            | User  |
| POST   | `/verifyStripe` | Xác nhận thanh toán Stripe   | User  |
| POST   | `/userorders`   | Lấy đơn hàng của người dùng  | User  |
| POST   | `/list`         | Lấy tất cả đơn hàng          | Admin |
| POST   | `/status`       | Cập nhật trạng thái đơn hàng | Admin |

## Cấu trúc dữ liệu

### User

```
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  cartData: Object (default: {})
}
```

### Product

```
{
  name: String (required),
  description: String (required),
  price: Number (required),
  category: String (required) — "Men" | "Women" | "Kids",
  subCategory: String (required) — "Topwear" | "Bottomwear" | "Winterwear",
  sizes: Array (required) — ["S", "M", "L", "XL", ...],
  image: Array (required) — Cloudinary URLs,
  bestseller: Boolean,
  date: Number (timestamp)
}
```

### Order

```
{
  userId: ObjectId (ref: "user", required),
  items: Array (required),
  amount: Number (required),
  address: Object (required),
  payment: Boolean (default: false),
  paymentMethod: String (required) — "cod" | "stripe",
  status: String (default: "Order Placed"),
  date: Date (default: now)
}
```

**Trạng thái đơn hàng:** `Order Placed` → `Packing` → `Shipped` → `Out for delivery` → `Delivered`

## Đóng góp

Nếu bạn muốn đóng góp cho dự án, vui lòng fork repository, tạo branch mới cho tính năng và gửi Pull Request. Đảm bảo code tuân thủ cấu hình Biome và ESLint đã có sẵn.

## Giấy phép

Dự án này sử dụng giấy phép ISC.
