
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginBodyDTO, RegisterBodyDTO, RegisterResponseDTO, SendOTPBodyDTO } from "./auth.dto";
import { ZodSerializerDto } from "nestjs-zod";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('register')
     @ZodSerializerDto(RegisterResponseDTO)
    async register(@Body() body: RegisterBodyDTO) {
        return this.authService.register(body)
    }

    @Post('otp')
    async sendOTP(@Body() body: SendOTPBodyDTO) {
        return this.authService.sendOTP(body)
    }

    async Login(@Body() body: LoginBodyDTO) {
        return this.authService.login(body)
    }
}



