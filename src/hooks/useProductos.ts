import { useState, useEffect, useCallback, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import type { FormData } from "../types/FormData";
import type { ProductApi } from "../types/ProductoApi";

const useUser = () => {
  const [products, setProducts] = useState<ProductApi[]>([]);
  const [productToEdit, setProductToEdit] = useState<ProductApi | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    price: 0,
    description: "",
    categoryId: 10,
    images: [
      "https://img.amiami.com/images/product/main/254/GOODS-04731677.jpg",
    ],
  });

  const API_URL = "https://api.escuelajs.co/api/v1/products";
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<ProductApi[]>(API_URL);
      setProducts(response.data);
    } catch (err) {
      errorAlert(
        "No se pudo cargar los productos. Por favor, intente de nuevo más tarde."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const successAlert = (mensaje: string) => {
    Swal.fire({
      title: mensaje,
      icon: "success",
    });
  };

  const errorAlert = (mensaje: string) => {
    Swal.fire({
      title: mensaje,
      icon: "error",
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" || name === "categoryId" ? Number(value) : value,
    }));
  };

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  const hanldleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validación de campos
    const missing: string[] = [];
    if (!formData.title || formData.title.trim() === "") missing.push("Título");
    if (!formData.description || formData.description.trim() === "")
      missing.push("Descripción");
    if (typeof formData.price !== "number" || formData.price <= 0)
      missing.push("Precio (mayor que 0)");
    if (typeof formData.categoryId !== "number" || formData.categoryId <= 0)
      missing.push("ID de Categoría");
    if (!formData.images || formData.images.length === 0 || !formData.images[0])
      missing.push("Imagen");

    if (missing.length > 0) {
      errorAlert(`Por favor complete los siguientes campos: ${missing.join(", ")}`);
      return;
    }

    setLoading(true);

    try {
      if (productToEdit) {
        await axios.put(`${API_URL}/${productToEdit.id}`, {
          title: formData.title,
          price: formData.price,
          description: formData.description,
          images: formData.images,
        });
        successAlert("Producto actualizado correctamente.");
      } else {
        await axios.post(API_URL, {
          ...formData,
        });
        successAlert("Producto creado correctamente.");
      }

      setFormData({
        title: "",
        price: 0,
        description: "",
        categoryId: 14,
        images: [
          "https://img.amiami.com/images/product/main/254/GOODS-04731677.jpg",
        ],
      });
      setProductToEdit(null);
      await fetchProducts();
    } catch (error) {
      errorAlert("Error al guardar el producto. Verifique los datos.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: ProductApi) => {
    setProductToEdit(product);
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      categoryId: product.categoryId || 10,
      images: product.images,
    });
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No hay vuelta atrás!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await axios.delete(`${API_URL}/${id}`);
        await fetchProducts();
        successAlert("Producto eliminado correctamente");
      }
    } catch (error) {
      errorAlert("Error al eliminar un producto");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    productToEdit,
    setProductToEdit,
    loading,
    formData,
    setFormData,
    handleInputChange,
    hanldleSubmit,
    handleDelete,
    handleEdit,
  };
};

export default useUser;
