import React, { useState } from 'react'
import { toast } from 'react-toastify'

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: []
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your API call here
    toast.success('Product added successfully!')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={productData.name}
            onChange={(e) => setProductData({...productData, name: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows="3"
            value={productData.description}
            onChange={(e) => setProductData({...productData, description: e.target.value})}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={productData.price}
              onChange={(e) => setProductData({...productData, price: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={productData.stock}
              onChange={(e) => setProductData({...productData, stock: e.target.value})}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={productData.category}
            onChange={(e) => setProductData({...productData, category: e.target.value})}
            required
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Product Images</label>
          <input
            type="file"
            multiple
            className="mt-1 block w-full"
            onChange={(e) => setProductData({...productData, images: e.target.files})}
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AddProduct