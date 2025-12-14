import type { ProductApi } from "./ProductoApi";

export interface ProductListProps {
  products: ProductApi[];
  handleEdit: (product: ProductApi) => void;
  handleDelete: (id: number) => void;
  loading: boolean;
}
