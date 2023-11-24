/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Query } from "@nestjs/common";
import { ResponseService } from "src/Service/response/response.service";
import { ContactService } from "src/Service/contact/contact.service";

@Controller("api/v3/contacts")
export class V3Controller {
    constructor(
        private readonly ResponseService: ResponseService,
        private readonly ContactService: ContactService,
    ) {}

    @Get()
    async getContacts(
        @Query("name") name: string,
        @Query("phone") phone: string,
        @Query("email") email: string,
    ) {
        try {
            await this.ContactService.findOrCreateAndMakeDeal({
                name,
                phone,
                email,
            });
            return this.ResponseService.send(
                "The deal was successfully created",
            );
        } catch (err: any) {
            console.error(err);
            // console.error(err.response.data["validation-errors"][0].errors);
            return this.ResponseService.send(
                "There was an error creating the deal",
            );
        }
    }
}
