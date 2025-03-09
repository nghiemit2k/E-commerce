import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/services/prisma.service";
import { RegisterBodyType, VeificationCodeType } from "./auth.model";
import { UserType } from "src/shared/models/shared-user.model";
import { VerificationCodeType } from "@prisma/client";
import { TypeOfVerificationCodeType } from "src/shared/constants/auth.constant";



@Injectable()
export class AuthRepoitory {
    constructor(private readonly prismaService: PrismaService) { }
    
    async createUser(user: Omit<RegisterBodyType, 'confirmPassword' | 'code'> & Pick<UserType, 'roleId'>): Promise<Omit<UserType, 'password' | 'totpSecret'>> {
        return this.prismaService.user.create({
            data: user,
            omit: {
                password: true,
                totpSecret: true
            }
        })
          
    }

    async createVerificationCode(payload: Pick<VeificationCodeType, 'email' | 'type' | 'code' | 'expiresAt'>) {
        return this.prismaService.verificationCode.upsert({
            where: {
                email: payload.email
            },
            create: payload,
            update: {
                code: payload.code,
                expiresAt: payload.expiresAt
            }
        })
    }
    async findUniqueVerificationCode(uniqueValue: { email: string } | { id: number } | {
        email: string,
        code: string,
        type: TypeOfVerificationCodeType
    }) {
        return this.prismaService.verificationCode.findUnique({
            where: uniqueValue
        })
    }
}