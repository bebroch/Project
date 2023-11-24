import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
// Класс для отправки данных на сервер
export class RequestService {
    private async sendRequest(method: string, url: string, requestData: any) {
        return await axios.request({
            method,
            url,
            headers: requestData.headers,
            data: requestData.data,
        });
    }

    async get(url: string, data: any = null) {
        return await this.sendRequest("get", url, data);
    }

    async post(url: string, data: any = null) {
        return await this.sendRequest("post", url, data);
    }

    async patch(url: string, data: any = null) {
        return await this.sendRequest("patch", url, data);
    }
}
