const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const apiRoutes = {
    PRODUCTS: `${apiUrl}/api/products`,
    CART: `${apiUrl}/api/shoppCart`
}

export { apiRoutes };
