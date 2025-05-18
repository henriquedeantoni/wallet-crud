import { Investment } from "@src/models/Investment";
export function mapInvestmentRow(row: any): Investment {
  return {
    id: row.id,
    userId: row.user_id,
    assetId: row.asset_id,
    quantity: row.quantity,
    purchasePrice: row.purchase_price,
    purchaseDate: row.purchase_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}