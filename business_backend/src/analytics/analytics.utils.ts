// src/auth/analytics/analytics.utils.ts
import { Sale } from '../sales/entities/sale.entity';
import { Product } from '../inventory/entities/product.entity';

export function calculateSalesSummary(sales: Sale[]) {
  const count = sales.length;
  const total = sales.reduce((sum, s) => sum + s.price, 0);
  //const averageSale = count ? total / count : 0;

  return {
    count,
    total,
    // averageSale,
  };
}

export function calculateInventoryStatus(products: Product[]) {
  // const totalProducts = products.length;
  // const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);
  // const lowStock = products.filter((p) => p.quantity < 5);

  // return {
  //   totalProducts,
  //   totalStock,
  //   lowStockCount: lowStock.length,
  //   lowStockProducts: lowStock,
  // };

  return products.map((p) => ({
    id: p.id,
    name: p.name,
    quantity: p.quantity,
    lowStock: p.quantity < 10,
  }));
}
