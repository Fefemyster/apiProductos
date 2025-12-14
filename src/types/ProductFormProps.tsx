import type { FormData } from "./FormData";
import type { ProductApi } from "./ProductoApi";

export interface ProductFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  productToEdit: ProductApi | null;
  setProductToEdit: React.Dispatch<React.SetStateAction<ProductApi | null>>;
  loading: boolean;
}
