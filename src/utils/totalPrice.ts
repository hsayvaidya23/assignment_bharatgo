interface Product {
  price: number;
  count: number;
}

export const totalPrice = (products: Product[]) => {
    return products.reduce((sum: number, product: Product) => sum + product.price * product.count, 0);
};