import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import { promisify } from "util";

@Injectable()
// Класс для чтения data.json в корне проекта
export class JsonService {
    async getData(key: string): Promise<Record<string, any> | null> {
        const readFileAsync = promisify(fs.readFile);
        const data = await readFileAsync("data.json", "utf8");
        const jsonData = JSON.parse(data);
        return jsonData[key];
    }

    async getBase(): Promise<Record<string, any> | null> {
        return this.getData("base");
    }

    async getClient(): Promise<Record<string, any> | null> {
        return this.getData("client");
    }

    async getServer(): Promise<Record<string, any> | null> {
        return this.getData("server");
    }

    async getToken(): Promise<string> {
        const jsonDataServer = await this.getServer();
        const token = "Bearer " + jsonDataServer.access_token;
        return token;
    }

    async getBaseUrl(): Promise<string> {
        const jsonDataBase = await this.getBase();
        return jsonDataBase.url;
    }
}
