import type { ProductListProps } from "../types/ProductListProps";

const ProductList = ({
  products,
  handleEdit,
  handleDelete,
  loading,
}: ProductListProps) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Lista de Productos
      </h2>
      {loading && (
        <div className="text-center text-gray-500 mb-4">
          Cargando Productos...
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.title}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {product.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{product.title}</p>
            <p className="text-sm text-gray-600 mb-4">{product.price}</p>
            <p className="text-sm text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(product)}
                className="px-4 py-2 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition-colors duration-300"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
