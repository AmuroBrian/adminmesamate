'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

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
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Notifications</h1>
                <Button
                    onClick={fetchNotifications}
                    disabled={loading}
                >
                    {loading ? 'Refreshing...' : 'Refresh'}
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Table Number</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {notifications.map((notification, index) => (
                            <TableRow key={index}>
                                <TableCell>{notification.table_number}</TableCell>
                                <TableCell>{notification.response}</TableCell>
                                <TableCell>{new Date(notification.timestamp).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                        {notifications.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    No notifications found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
} 