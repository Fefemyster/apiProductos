import type { ProductFormProps } from "../types/ProductFormProps";
import Swal from "sweetalert2";

const ProductForm = ({
  formData,
  setFormData,
  handleInputChange,
  handleSubmit,
  productToEdit,
  setProductToEdit,
  loading,
}: ProductFormProps) => {
  const onSubmit = (e: any) => {
    e.preventDefault();

    const missing: string[] = [];
    if (!formData.title || formData.title.trim() === "") missing.push("Título");
    if (!formData.description || formData.description.trim() === "")
      missing.push("Descripción");

    const price = Number(formData.price);
    if (isNaN(price) || price <= 0) missing.push("Precio (mayor que 0)");

    const categoryId = Number(formData.categoryId);
    if (isNaN(categoryId) || categoryId <= 0)
      missing.push("ID de Categoria (mayor que 0)");

    if (!formData.images || formData.images.length === 0 || !formData.images[0])
      missing.push("Imagen");

    if (missing.length > 0) {
      Swal.fire({
        title: "Faltan campos",
        text: `Por favor complete: ${missing.join(", ")}`,
        icon: "error",
      });
      return;
    }

    handleSubmit(e);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        {productToEdit ? "Editar Producto" : "Añadir Nuevo Producto"}
      </h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Descripción
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Precio</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            step="0.01"
          />
        </div>
        {!productToEdit && (
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              ID de Categoria
            </label>
            <input
              type="number"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-colors duration-300"
            disabled={loading}
          >
            {loading ? "Cargando" : productToEdit ? "Actualizar" : "Guardar"}
          </button>
          {productToEdit && (
            <button
              type="button"
              onClick={() => {
                setProductToEdit(null);
                setFormData({
                  title: "",
                  price: 0,
                  description: "",
                  categoryId: 10,
                  images: [
                    "https://img.amiami.com/images/product/main/254/GOODS-04731677.jpg",
                  ],
                });
              }}
              className="w-full md:w-auto ml-4 px-6 py-3 bg-gray-400 text-white font-semibold rounded-xl shadow-lg hover:bg-gray-500 transition-colors duration-300"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
