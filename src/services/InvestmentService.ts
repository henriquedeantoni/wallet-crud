import { Investment } from "@src/models/Investment";
import {InvestmentRepository} from "@src/repositories/InvestmentRepository";

export class InvestmentService{
    constructor(private investmentRepository = new InvestmentRepository()){}

    getAll(){
        return this.investmentRepository.findAll();
    }

    getById(id: number){
        return this.investmentRepository.findById(id);
    }

    create(data: Omit<Investment, 'id'>){
        return this.investmentRepository.create(data);
    }

    update(id: number, data: Partial<Investment>){
        return this.investmentRepository.update(id, data);
    }
}