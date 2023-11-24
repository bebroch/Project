/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { contactData } from "src/utils/types/contact";
import { JsonService } from "src/Service/json/json.service";

@Injectable()
export class BuildUrlService {
    constructor(private readonly JsonService: JsonService) {}

    async ContactWithParams(queryData: contactData) {
        const { email, phone } = queryData;
        const url = await this.ApiContact();

        if (!email && !phone) return url;

        const query = email ? email : phone;

        return `${url}?query=${query}`;
    }

    async ContactWithId(id: number) {
        const url = await this.ApiContact();

        return `${url}/${id}`;
    }

    async LeadsLinkWithId(id: number) {
        const url = await this.ApiLeads();
        return `${url}/${id}/link`;
    }

    async LeadsLinksWithId(id: number) {
        const url = await this.ApiLeads();
        return `${url}/${id}/links`;
    }

    async ApiLeads() {
        const baseUrl = await this.JsonService.getBaseUrl();
        return `${baseUrl}/api/v4/leads`;
    }

    async ApiContact() {
        const baseUrl = await this.JsonService.getBaseUrl();
        return `${baseUrl}/api/v4/contacts`;
    }
}
