export interface Investment {
    id: number;
    userId: number;
    assetId: number;
    quantity: number;
    purchasePrice: number;
    purchaseDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}