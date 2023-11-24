/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import axios from "axios";
import { JsonService } from "src/Service/json/json.service";

@Injectable()
// Класс берёт данные из JsonService и отправляет их на сервер для получения токена
export class TokenService {
    constructor(private readonly JsonService: JsonService) {}

    async fetchData(): Promise<Record<string, any> | null> {
        const jsonData = await this.JsonService.getClient();

        if (!jsonData) throw new Error("Client data not found");

        try {
            const url = jsonData.url;
            const postData = jsonData.data;
            const response = await axios.post(url, postData);
            return response.data;
        } catch (err) {
            return err.response.data;
        }
    }
}
