import { Controller, Get } from "@nestjs/common";
import { TokenService } from "src/Service/token/token.service";

@Controller("api")
export class ApiController {
    constructor(private readonly apiService: TokenService) {}

    @Get()
    api() {
        return this.apiService.fetchData();
    }
}
