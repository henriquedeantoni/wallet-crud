import { Investment } from "../models/Investment";
import { User } from '../models/User';

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

export function mapUserRow(row: any): User {
  return {
    id: row.id,
    email: row.email,
    firstName: row.firstName,
    lastName: row.lastName,
    tel: row.tel,
    password: row.password,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
