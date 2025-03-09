import { HashingService } from "src/shared/services/hashing.service";
import { RolesService } from "./roles.service";
import { generateOTP, isUniqueConstraintPrismaError } from "src/shared/helpers";
import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { RegisterBodyType, SendOTPBodyType } from "./auth.model";
import { AuthRepoitory } from "./auth.repo";
import { SharedUserRepository } from "src/shared/repositories/shared-user.repo";
import { addMilliseconds } from "date-fns";
import envConfig from "src/shared/config";
import ms from 'ms'
import { TypeOfVerificationCode } from "src/shared/constants/auth.constant";
@Injectable()
export class AuthService {
    constructor(
        private readonly hashingService: HashingService,
        private readonly roleService: RolesService,
        private readonly authRepository: AuthRepoitory,
        private readonly shareUserRepository: SharedUserRepository
    ) { }
    
    async register(body: RegisterBodyType) {
        try {
            const verificationCode = await this.authRepository.findUniqueVerificationCode({
                email: body.email,
                code: body.code,
                type: TypeOfVerificationCode.REGISTER
            })
          
            if (verificationCode == null) {
               throw new UnprocessableEntityException([
                {
                    message: 'Code OTP invalid',
                    path: 'code '
                }
                ])
            }
            if (verificationCode.expiresAt < new Date()) {
                throw new UnprocessableEntityException([
                {
                    message: 'Code OTP expired',
                    path: 'code '
                }
                ])
            }
            
            const clientRoleId = await this.roleService.getClientRoleId()
            const hashedPassword = await this.hashingService.hash(body.password)
            return  await this.authRepository.createUser({
                email: body.email,
                name: body.name,
                phoneNumber: body.phoneNumber,
                password: hashedPassword,
                roleId: clientRoleId
                
            })
        } catch (error) {
            if (isUniqueConstraintPrismaError(error)) {
                throw new UnprocessableEntityException([
                    {
                        message: 'email exist',
                        path: 'email'
                    }
                ])
            }
            throw error
        }
    }

    async sendOTP(body: SendOTPBodyType) {
        const user = await this.shareUserRepository.findUnique({
            email: body.email
        })
        if (user) {
            throw new UnprocessableEntityException([
                {
                    message: 'email exist',
                    path: 'email'
                }
            ])
        }
        const code = generateOTP()
        const verificationCode = this.authRepository.createVerificationCode({
            email: body.email,
            code,
            type: body.type,
            expiresAt: addMilliseconds(new Date(), ms(envConfig.OTP_EXPIRES_IN))
        })
        return verificationCode
    }
}