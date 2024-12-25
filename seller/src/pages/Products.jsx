import { Description } from '@headlessui/react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Products = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    // Load products from localStorage
    const savedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(savedProducts);
  }, []);

  const handleDelete = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    toast.success('Product deleted successfully');
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    // Show edit modal or form
    document.getElementById('editModal').classList.remove('hidden');
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    try {
      const updatedProducts = products.map(product => 
        product.id === editingProduct.id ? editingProduct : product
      );
      
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      setEditingProduct(null);
      // Hide modal
      document.getElementById('editModal').classList.add('hidden');
      toast.success('Product updated successfully');
    } catch (error) {
      toast.error('Failed to update product');
      console.error(error);
    }
  };

  return (
    <div>
      {/* Filters and Controls */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>

          {/* <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select> */}

          <Link
            to="/add"
            className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add New Product
          </Link>
        </div>
      </div>

      {/* Edit Modal */}
      <div id="editModal" className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full hidden">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Edit Product</h3>
            {editingProduct && (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProduct(null);
                      document.getElementById('editModal').classList.add('hidden');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products
          .filter(product => 
            (categoryFilter === 'all' || product.category === categoryFilter) &&
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category} • {product.subCategory}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  product.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.change}
                </span>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">${product.price}</span>
                <span className="text-sm text-gray-500">Stock: {product.stock}</span>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;