import React from 'react'

const Analytics = () => {
  const metrics = [
    { title: 'Revenue', value: '$45,231', change: '+20.1%' },
    { title: 'Orders', value: '356', change: '+10.1%' },
    { title: 'Customers', value: '2,103', change: '+15.1%' },
    { title: 'Avg. Order Value', value: '$127', change: '+5.1%' }
  ]

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Analytics</h1>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <div key={metric.title} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">{metric.title}</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold">{metric.value}</p>
              <p className="ml-2 text-sm font-medium text-green-600">{metric.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Revenue Overview</h3>
          <div className="h-80 bg-gray-100 rounded flex items-center justify-center">
            Revenue Chart Placeholder
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Orders Overview</h3>
          <div className="h-80 bg-gray-100 rounded flex items-center justify-center">
            Orders Chart Placeholder
          </div>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Top Products</h3>
          <div className="space-y-4">
            {/* Add your top products list here */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded"></div>
                <div className="ml-4">
                  <p className="text-sm font-medium">Gaming Laptop</p>
                  <p className="text-sm text-gray-500">Electronics</p>
                </div>
              </div>
              <p className="text-sm font-medium">$1,299</p>
            </div>
            {/* Add more products */}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Customer Demographics</h3>
          <div className="h-80 bg-gray-100 rounded flex items-center justify-center">
            Demographics Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics