/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { contactData } from "src/utils/types/contact";
import { JsonService } from "src/Service/json/json.service";

@Injectable()
export class BuildUrlService {
    constructor(private readonly JsonService: JsonService) {}

    async ContactWithParams(query: contactData) {
        const { name, email, phone } = query;
        const url = await this.ApiContact();

        if (!name || !email || !phone) return url;

        return `${url}?name=${name}&email=${email}&phone=${phone}`;
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
