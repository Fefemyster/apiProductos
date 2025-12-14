import type { ProductApi } from "./ProductApi";

export interface ProductListProps {
  products: ProductApi[];
  handleEdit: (product: ProductApi) => void;
  handleDelete: (id: number) => void;
  loading: boolean;
}
