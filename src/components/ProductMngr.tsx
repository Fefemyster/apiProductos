//import useUser from "../hooks/useUser";
import UserForm from "./ProductForm";
import useProduct from "../hooks/useProductos";
import ProductList from "./ProductList";

const ProductMngr = () => {
  const {
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
  } = useProduct();
  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-10 tracking-tight">
        Gestor de Productos
      </h1>

      <UserForm
        formData={formData}
        setFormData={setFormData}
        handleInputChange={handleInputChange}
        handleSubmit={hanldleSubmit}
        useProduct={productToEdit}
        setUserToEdit={setProductToEdit}
        loading={loading}
      />

      <ProductList
        products={products}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
};

export default ProductMngr;
