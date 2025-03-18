import pool from "./../../../../script/mysqldb"; // Ensure correct import path

export async function GET() {
    try {
        const [rows] = await pool.query(
            "SELECT OrderID, JSON_UNQUOTE(Orders) AS Orders, Status FROM Customer"
        );

        // Ensure Orders is a valid JSON string before parsing
        const formattedRows = rows.map(row => ({
            OrderID: row.OrderID,
            Orders: typeof row.Orders === "string" ? JSON.parse(row.Orders) : row.Orders, // Only parse if it's a string
            Status: row.Status
        }));

        return Response.json(formattedRows, { status: 200 });
    } catch (error) {
        console.error("Database Error:", error);
        return Response.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
}
