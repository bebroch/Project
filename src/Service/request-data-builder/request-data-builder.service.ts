/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { RequestService } from "../request/request.service";
import { JsonService } from "src/Service/json/json.service";
import { BuildUrlService } from "src/Service/build-url/build-url.service";
import { contactData } from "src/utils/types/contact";
import { GenerateDataDealService } from "src/Service/generate-data/generate-data-deal/generate-data-deal.service";

@Injectable()
// Класс для создания данных и отправки на сервер amoCRM через класс RequestService
export class RequestDataBuilderService {
    constructor(
        private readonly RequestService: RequestService,
        private readonly JsonService: JsonService,
        private readonly BuildUrlService: BuildUrlService,
        private readonly GenerateDataDealService: GenerateDataDealService,
    ) {}

    private getDataContacts(response: any) {
        if (response.data._embedded.contacts.length === 1)
            return response.data._embedded.contacts[0];

        return response.data._embedded.contacts;
    }

    async getContacts(query: contactData) {
        const token = await this.JsonService.getToken();
        const fullUrl = await this.BuildUrlService.ContactWithParams(query);
        const response = await this.RequestService.get(fullUrl, {
            headers: { Authorization: token },
        });

        return this.getDataContacts(response);
    }

    async updateContact(id: number, data: Record<string, any>) {
        const token = await this.JsonService.getToken();
        const fullUrl = await this.BuildUrlService.ContactWithId(id);

        const response = await this.RequestService.patch(fullUrl, {
            headers: { Authorization: token },
            data,
        });

        return response.data;
    }

    async createContact(data: Record<string, any>) {
        const token = await this.JsonService.getToken();
        const fullUrl = await this.BuildUrlService.ApiContact();

        await this.RequestService.post(fullUrl, {
            headers: { Authorization: token },
            data,
        });
    }

    async makeDeal(data: Record<string, any>) {
        const token = await this.JsonService.getToken();
        const fullUrl = await this.BuildUrlService.ApiLeads();

        const response = await this.RequestService.post(fullUrl, {
            headers: { Authorization: token },
            data,
        });

        return response.data._embedded.leads[0];
    }

    async attachContactToDeal(contact_id: number, deal_id: number) {
        const token = await this.JsonService.getToken();
        const fullUrl = await this.BuildUrlService.LeadsLinkWithId(deal_id);
        const data =
            this.GenerateDataDealService.arrayOfOneAttachDeal(contact_id);

        const response = await this.RequestService.post(fullUrl, {
            headers: { Authorization: token },
            data,
        });
    }
}
