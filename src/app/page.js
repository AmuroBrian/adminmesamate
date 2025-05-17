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

  // Function to update order status in database
  const updateOrderStatus = async (orderId, currentStatus) => {
    const statusFlow = ["Pending", "Serving", "Complete"];
    const currentIndex = statusFlow.indexOf(currentStatus);
    const nextStatus = statusFlow[(currentIndex + 1) % statusFlow.length];

    try {
      const response = await fetch("/api/admin/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ OrderID: orderId, Status: nextStatus }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Update UI only if the request is successful
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.OrderID === orderId ? { ...order, Status: nextStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-black">Orders</h1>
      {orders.length === 0 ? (
        <p className="text-white">No orders found.</p>
      ) : (
        <div className="space-y-8">
          {orders.slice().reverse().map((order) => {
            const orderTotal = order.Orders.orders.reduce((sum, item) => sum + Number(item.total), 0);
            return (
              <div
                key={order.OrderID}
                className="border p-6 rounded-lg shadow-md text-black bg-white"
              >
                <h2 className="text-xl font-bold text-black mb-4 p-2">
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
                <p className="text-lg font-semibold mt-4 p-2">
                  Order Total: ₱{orderTotal.toFixed(2)}
                </p>
                <p
                  className={`text-lg font-semibold mt-4 p-2 cursor-pointer ${order.Status === "Pending"
                    ? "bg-yellow-400"
                    : order.Status === "Serving"
                      ? "bg-blue-400"
                      : "bg-green-400"
                    }`}
                  onClick={() => updateOrderStatus(order.OrderID, order.Status)}
                >
                  Status: {order.Status}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
