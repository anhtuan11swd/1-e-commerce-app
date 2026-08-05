import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  apis: ["./src/routes/*.js"],
  definition: {
    components: {
      schemas: {
        ErrorResponse: {
          properties: {
            message: {
              example: "Thông báo lỗi",
              type: "string",
            },
            success: {
              example: false,
              type: "boolean",
            },
          },
          type: "object",
        },
        Product: {
          properties: {
            _id: {
              example: "64f1a2b3c4d5e6f7a8b9c0d1",
              type: "string",
            },
            bestseller: {
              example: true,
              type: "boolean",
            },
            category: {
              example: "Men",
              type: "string",
            },
            date: {
              example: 1722902400000,
              type: "number",
            },
            description: {
              example: "Áo thun cotton cao cấp",
              type: "string",
            },
            image: {
              example: [
                "https://res.cloudinary.com/demo/image/upload/v1/products/shirt1.jpg",
              ],
              items: {
                type: "string",
              },
              type: "array",
            },
            name: {
              example: "Áo thun cotton nam cổ tròn",
              type: "string",
            },
            price: {
              example: 50000,
              type: "number",
            },
            sizes: {
              example: ["S", "M", "L", "XL"],
              items: {
                type: "string",
              },
              type: "array",
            },
            subCategory: {
              example: "Topwear",
              type: "string",
            },
          },
          type: "object",
        },
      },
      securitySchemes: {
        tokenAuth: {
          description: "JWT token từ phản hồi đăng nhập/đăng ký",
          in: "header",
          name: "token",
          type: "apiKey",
        },
      },
    },
    info: {
      description:
        "API cho ứng dụng thương mại điện tử với quản lý người dùng và sản phẩm",
      title: "API Thương mại điện tử",
      version: "1.0.0",
    },
    openapi: "3.0.0",
    servers: [
      {
        description: "Máy chủ phát triển",
        url: "http://localhost:4000",
      },
    ],
  },
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api-docs.json", (_req, res) => {
    res.json(swaggerSpec);
  });
};

export default setupSwagger;
