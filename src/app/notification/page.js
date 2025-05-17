'use client';

import { useState, useEffect } from 'react';
import { FiRefreshCw } from 'react-icons/fi';

export default function NotificationPage() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/notifications');
            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <div className="p-6 bg-white min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-black">Notifications</h1>
                <button
                    onClick={fetchNotifications}
                    disabled={loading}
                    className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-md shadow-md hover:bg-green-700 disabled:opacity-50 transition-colors border-2 border-black"
                >
                    <FiRefreshCw className={`w-5 h-5 text-white ${loading ? 'animate-spin' : ''}`} />
                    <span className="text-white">{loading ? 'Refreshing...' : 'Refresh'}</span>
                </button>
            </div>

            {notifications.length === 0 ? (
                <p className="text-black text-center py-8">No notifications found.</p>
            ) : (
                <div className="space-y-4">
                    {notifications.slice().reverse().map((notification, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-lg border-2 border-black"
                        >
                            <h2 className="text-xl font-semibold text-black mb-3">
                                Table #{notification.table_number}
                            </h2>
                            <div className="mt-3">
                                <p className="text-black text-lg">{notification.response}</p>
                                <p className="text-black text-sm mt-2">
                                    {new Date(notification.timestamp).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
} 