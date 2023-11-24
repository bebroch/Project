/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { RequestDataBuilderService } from "src/Service/request-data-builder/request-data-builder.service";
import { contactData } from "src/utils/types/contact";
import { GenerateDataContactService } from "src/Service/generate-data/generate-data-contact/generate-data-contact.service";
import { GenerateDataDealService } from "src/Service/generate-data/generate-data-deal/generate-data-deal.service";

@Injectable()
export class ContactService {
    constructor(
        private readonly RequestDataBuilderService: RequestDataBuilderService,
        private readonly GenerateDataContactService: GenerateDataContactService,
        private readonly GenerateDataDealService: GenerateDataDealService,
    ) {}

    // Найти или создать Контакт, далее создать сделку
    async findOrCreateAndMakeDeal(data: contactData) {
        const { name } = data;

        let contact = await this.findByEmailOrPhone(data);

        if (!contact) {
            contact = await this.create(data);
        } else {
            contact = await this.update(contact.id, data);
        }

        const deal = await this.makeDeal(`Сделка с ${name}`);

        await this.attachDeal(contact.id, deal.id);
    }

    // Нахождение контакта по email
    async findByEmail(email: string) {
        return await this.RequestDataBuilderService.getContacts({
            email,
        });
    }

    // Нахождение контакта по телефону
    async findByPhone(phone: string) {
        return await this.RequestDataBuilderService.getContacts({
            phone,
        });
    }

    // Нахождение контакта по Email, если не находит, то по телефону
    async findByEmailOrPhone(data: contactData) {
        const contactByEmail = await this.findByEmail(data.email);
        const contactByPhone = await this.findByPhone(data.phone);
        console.log(contactByEmail, contactByPhone);
        const contact = contactByEmail ? contactByEmail : contactByPhone;
        return contact;
    }

    // Создание контакта
    async create(data: contactData) {
        const contactData =
            this.GenerateDataContactService.oneContactInArray(data);
        return await this.RequestDataBuilderService.createContact(contactData);
    }

    // Обновление данных контакта
    async update(id: number, data: contactData) {
        const contactData = this.GenerateDataContactService.contact(data);
        return await this.RequestDataBuilderService.updateContact(
            id,
            contactData,
        );
    }

    // Создание сделки
    async makeDeal(name: string) {
        const dealData = this.GenerateDataDealService.arrayOfOneDeal({ name });
        return await this.RequestDataBuilderService.makeDeal(dealData);
    }

    // Привязка Контакта к сделке
    async attachDeal(contact_id: number, deal_id: number) {
        await this.RequestDataBuilderService.attachContactToDeal(
            contact_id,
            deal_id,
        );
    }
}
