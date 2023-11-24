import { Injectable } from "@nestjs/common";

@Injectable()
// Класс для отправки ответа пользователю
export class ResponseService {
    send(message: any) {
        if (typeof message === "string") return { message };

        return message;
    }
}
