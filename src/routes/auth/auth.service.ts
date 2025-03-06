import { HashingService } from "src/shared/services/hashing.service";
import { PrismaService } from "src/shared/services/prisma.service";
import { TokenService } from "src/shared/services/token.service";
import { RolesService } from "./roles.service";
import { isUniqueConstraintPrismaError } from "src/shared/helpers";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { ConflictException, Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    constructor(
        private readonly hashingService: HashingService,
        private readonly prismaService: PrismaService,
        private readonly tokenService: TokenService,
        private readonly roleService: RolesService
    ) { }
    
    async register(body: any) {
        try {
            const clientRoleId = await this.roleService.getClientRoleId()
            const hashedPassword = await this.hashingService.hash(body.password)
            const user = await this.prismaService.user.create({
                data: {
                    email: body.email,
                    password: hashedPassword,
                    name: body.name,
                    phoneNumber: body.phoneNumber,
                    roleId: clientRoleId
                }, 
                omit: {
                    password: true,
                    totpSecret: true
                }
            })
            return user
        } catch (error) {
            if (isUniqueConstraintPrismaError(error)) {
                throw new ConflictException('email exist')
            }
            throw error
        }
    }
}