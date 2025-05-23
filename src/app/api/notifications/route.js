import { NextResponse } from 'next/server';
import pool from './../../../../script/mysqldb';

export async function GET() {
    try {
        const connection = await pool.getConnection();

        const [rows] = await connection.query(
            'SELECT table_number, response, timestamp FROM delivery_responses ORDER BY timestamp DESC'
        );

        connection.release();

        return NextResponse.json(rows);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch notifications' },
            { status: 500 }
        );
    }
} 