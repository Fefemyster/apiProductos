export interface ProductApi {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryId?: number;
  category?: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}
