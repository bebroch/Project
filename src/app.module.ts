import { Module } from "@nestjs/common";
import { V3Controller } from "./api/v3/v3.controller";
import { ApiController } from "./api/api.controller";
import { TokenService } from "./Service/token/token.service";
import { RequestService } from "./Service/request/request.service";
import { RequestDataBuilderService } from "./Service/request-data-builder/request-data-builder.service";
import { JsonService } from "./Service/json/json.service";
import { ResponseService } from "./Service/response/response.service";
import { ContactService } from "./Service/contact/contact.service";
import { BuildUrlService } from "./Service/build-url/build-url.service";
import { GenerateDataContactService } from "./Service/generate-data/generate-data-contact/generate-data-contact.service";
import { GenerateDataDealService } from "./Service/generate-data/generate-data-deal/generate-data-deal.service";

@Module({
    controllers: [ApiController, V3Controller],
    providers: [
        TokenService,
        RequestService,
        RequestDataBuilderService,
        JsonService,
        ResponseService,
        GenerateDataContactService,
        ContactService,
        BuildUrlService,
        GenerateDataDealService,
    ],
})
export class AppModule {}
