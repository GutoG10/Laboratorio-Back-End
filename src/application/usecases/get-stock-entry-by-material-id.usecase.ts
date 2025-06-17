import { RawMaterialRepository, StockEntryRepository } from "src/infrastructure/database/repositories";
import { StockEntryExpiredDTO } from "../dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetStockEntryByMaterialIdUsecase {
    constructor(private readonly _repository: StockEntryRepository) {}
    
    async process(id: string): Promise<StockEntryExpiredDTO> {
        const stockEntries = await this._repository.getByMaterialId(id);
        
        const response: StockEntryExpiredDTO = {
            expired: [],
            valid: []
        };

        stockEntries.forEach(entry => {
            const expirationDate = new Date(entry.expiration_date)
            if(expirationDate < new Date()) {
                response.expired.push(
                    {
                        id: entry.id,
                        batch_code: entry.batch_code,
                        expiration_date: entry.expiration_date,
                        quantity: Number(entry.quantity),
                        remaining_quantity: Number(entry.remaining_quantity),
                        unit_price: Number(entry.unit_price),
                        supplier: {
                            id: entry.supplier.id,
                            name: entry.supplier.name,
                        }
                    }
                )
            }
            else{
                response.valid.push(
                    {
                        id: entry.id,
                        batch_code: entry.batch_code,
                        expiration_date: entry.expiration_date,
                        quantity: Number(entry.quantity),
                        remaining_quantity: Number(entry.remaining_quantity),
                        unit_price: Number(entry.unit_price),
                        supplier: {
                            id: entry.supplier.id,
                            name: entry.supplier.name,
                        }
                    }
                )
            }
        })

        return response
    }
}