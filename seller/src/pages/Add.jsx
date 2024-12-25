import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Add = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Men',
    subCategory: 'Topwear',
    stock: '',
    sizes: []
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      toast.error('Maximum 4 images allowed');
      return;
    }
    setImages(files);
  };

  const handleSizeToggle = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // if (!formData.name || !formData.price || !formData.stock) {
    //   toast.error('Please fill in all required fields');
    //   return;
    // }

    try {
      const newProduct = {
        id: Date.now(),
        name: formData.name,
        category: formData.category,
        subCategory: formData.subCategory,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        image: images.length > 0 ? URL.createObjectURL(images[0]) : 'https://placehold.co/300x200',
        status: 'Active',
        change: '+0%',
        changeType: 'increase',
        description: formData.description,
        sizes: formData.sizes
      };

      // Get existing products from localStorage
      const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
      const updatedProducts = [newProduct, ...existingProducts]; // Add new product at the beginning
      
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      toast.success('Product added successfully!');
      navigate('/products');
    } catch (error) {
      toast.error('Failed to add product');
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Images (Max 4)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="4"
            required
          />
        </div>

        {/* Category and Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Electronics">Electronics</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sub Category
            </label>
            <select
              value={formData.subCategory}
              onChange={(e) => setFormData({...formData, subCategory: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
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
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        {/* Sizes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Sizes
          </label>
          <div className="flex gap-4">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeToggle(size)}
                className={`px-4 py-2 rounded-md ${
                  formData.sizes.includes(size)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;