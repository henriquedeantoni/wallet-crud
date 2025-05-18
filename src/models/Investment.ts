export interface Investment {
  id: number;
  userId: number;
  assetId: number;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string; // ou Date
  createdAt?: Date;
  updatedAt?: Date;
}