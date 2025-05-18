import { Investment } from "@src/models/Investment";
import {InvestmentRepository} from "@src/repositories/InvestmentRepository";

export class InvestmentService{
    constructor(private investmentRepository = new InvestmentRepository()){}
  async getAll(): Promise<Investment[]> {
    return await this.investmentRepository.findAll();
  }

  async getById(id: number): Promise<Investment | null> {
    return await this.investmentRepository.findById(id);
  }

 async create(investmentData: Omit<Investment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Investment> {
    return await this.investmentRepository.create(investmentData);
  }

  async findByUserId(userId: number): Promise<Investment[]> {
    return await this.investmentRepository.findByUserId(userId);
  }

  async update(id: number, updates: Partial<Omit<Investment, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>): Promise<void> {
    return await this.investmentRepository.update(id, updates);
  }

  async delete(id: number): Promise<void> {
    return await this.investmentRepository.delete(id);
  }
}