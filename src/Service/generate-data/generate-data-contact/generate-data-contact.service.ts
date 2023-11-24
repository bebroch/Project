import { Injectable } from "@nestjs/common";
import { contactData } from "src/utils/types/contact";

@Injectable()
// Класс для создания дополнительных полей для amoCRM
export class GenerateDataContactService {
    contact(data: contactData) {
        const { name, email, phone } = data;
        return {
            name,
            custom_fields_values: [
                {
                    field_id: 33809,
                    field_name: "Телефон",
                    field_code: "PHONE",
                    field_type: "multitext",
                    values: [
                        {
                            value: phone,
                            enum_id: 16655,
                            enum_code: "WORK",
                        },
                    ],
                },
                {
                    field_id: 33811,
                    field_name: "Email",
                    field_code: "EMAIL",
                    field_type: "multitext",
                    values: [
                        {
                            value: email,
                            enum_id: 16667,
                            enum_code: "WORK",
                        },
                    ],
                },
            ],
        };
    }

    contacts(data: contactData[]) {
        return data.map((contact) => {
            return this.contact(contact);
        });
    }

    oneContactInArray(data: contactData) {
        return [this.contact(data)];
    }
}
