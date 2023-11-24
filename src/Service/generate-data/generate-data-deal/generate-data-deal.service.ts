import { Injectable } from "@nestjs/common";
import { dealData } from "src/utils/types/deal";

@Injectable()
export class GenerateDataDealService {
    arrayOfOneDeal(data: dealData) {
        return [data];
    }

    arrayOfOneAttachDeal(contact_id: number) {
        return [
            {
                to_entity_id: contact_id,
                to_entity_type: "contacts",
            },
        ];
    }
}
