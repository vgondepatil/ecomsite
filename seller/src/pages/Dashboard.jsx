import React from 'react'

const Dashboard = () => {
  const stats = [
    { title: 'Total Sales', value: '$12,426', change: '+12%', changeType: 'increase' },
    { title: 'Active Orders', value: '56', change: '+5%', changeType: 'increase' },
    { title: 'Products', value: '238', change: '+3%', changeType: 'increase' },
    { title: 'Returns', value: '8', change: '-2%', changeType: 'decrease' },
  ]

  const recentOrders = [
    { id: 1, customer: 'John Doe', product: 'Laptop', amount: '$999', status: 'Delivered' },
    { id: 2, customer: 'Jane Smith', product: 'Smartphone', amount: '$699', status: 'Processing' },
    // Add more orders
  ]

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <div className="flex items-center mt-2">
              <p className="text-2xl font-semibold">{stat.value}</p>
              <span className={`ml-2 text-sm font-medium ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Sales Overview</h3>
          {/* Add your preferred chart library here */}
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            Sales Chart Placeholder
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Top Products</h3>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            Products Chart Placeholder
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">#{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard