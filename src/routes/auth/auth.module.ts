import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RolesService } from "./roles.service";
import { AuthController } from "./auth.controller";
import { AuthRepoitory } from "./auth.repo";
import { SharedModule } from "src/shared/shared.module";

@Module({
    providers: [AuthService, RolesService,AuthRepoitory, SharedModule],
    controllers: [AuthController],
   
})

export class AuthModule{}