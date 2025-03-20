"use client";

import { useEffect, useState } from "react";

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/admin/");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Orders:", data);

        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Function to toggle order status
  const updateOrderStatus = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.OrderID === orderId) {
          const statusFlow = ["Pending", "Serving", "Complete"];
          const currentIndex = statusFlow.indexOf(order.Status);
          const nextStatus = statusFlow[(currentIndex + 1) % statusFlow.length];

          return { ...order, Status: nextStatus };
        }
        return order;
      })
    );
  };

  return (
    <div className="p-6 bg-yellow-400">
      <h1 className="text-2xl font-bold mb-4 text-black">Orders</h1>
      {orders.length === 0 ? (
        <p className="text-white">No orders found.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.OrderID} className="border p-6 rounded-lg shadow-md text-black bg-white">
              <h2 className="text-xl font-bold text-black mb-4 bg-yellow-400 p-2">
                Order #{order.OrderID}
              </h2>
              <table className="w-full border-collapse border border-gray-300 mt-4">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-3 text-left">Item</th>
                    <th className="border p-3 text-left">Quantity</th>
                    <th className="border p-3 text-left">Price</th>
                    <th className="border p-3 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.Orders.orders.map((item, index) => (
                    <tr key={index} className="border">
                      <td className="border p-3">{item.title}</td>
                      <td className="border p-3">{item.quantity}</td>
                      <td className="border p-3">₱{Number(item.price).toFixed(2)}</td>
                      <td className="border p-3">₱{Number(item.total).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p
                className={`text-lg font-semibold mt-4 p-2 cursor-pointer ${
                  order.Status === "Pending"
                    ? "bg-yellow-400"
                    : order.Status === "Serving"
                    ? "bg-blue-400"
                    : "bg-green-400"
                }`}
                onClick={() => updateOrderStatus(order.OrderID)}
              >
                Status: {order.Status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
