import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load orders from localStorage (replace with your API call)
    const loadOrders = () => {
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(savedOrders);
    };

    loadOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    toast.success('Order status updated');
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Orders</h2>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  #{order.id.toString().slice(-4)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${order.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    className="text-sm border rounded-md px-2 py-1"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;