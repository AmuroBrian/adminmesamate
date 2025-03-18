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

        const data = await response.json(); // JSON is already parsed
        console.log("Fetched Orders:", data); // Debugging output

        setOrders(data); // No need for data.orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 bg-yellow-400">
      <h1 className="text-2xl font-bold mb-4 text-black">Orders</h1>
      {orders.length === 0 ? (
        <p className="text-white">No orders found.</p>
      ) : (
        <ul className="space-y-4 flex flex-col-reverse">
          {orders.map((order) => (
            <li key={order.OrderID} className="border p-4 rounded-lg shadow-md text-black">
              <h2 className="text-lg font-semibold text-black">Order #{order.OrderID}</h2>
              <pre className="text-sm bg-gray-100 p-2 rounded-lg overflow-auto">
                {JSON.stringify(order.Orders.orders, null, 2)} {/* No need for JSON.parse() */}
                {console.log(order)}
              </pre>
              <p className="text-black">Status: {order.Status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
