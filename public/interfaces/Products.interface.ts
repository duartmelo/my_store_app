export interface ProductsResponse {
  products: Array<Products>;
  total: number;
  skip: number;
  limit: number;
}

interface Products {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: Array<string>;
  brand: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<ProductReviews>;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  thumbnail: string | File;
  images: Array<string | File>;
}

interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

interface ProductReviews {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
}

interface ProductMeta {
  createdAt: Date;
  updatedAt: Date;
  barcode: string;
  qrCode: string;
}
