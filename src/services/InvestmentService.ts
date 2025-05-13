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
}