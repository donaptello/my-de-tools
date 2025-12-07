export const tables: Record<string, string[]> = {
    customers: ["id", "name", "email", "created_at"],
    orders: ["order_id", "customer_id", "amount", "order_date"],
    products: ["product_id", "product_name", "price"]
}