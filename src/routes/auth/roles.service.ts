import { Injectable } from "@nestjs/common";
import { RoleName } from "src/shared/constants/role.constant";
import { PrismaService } from "src/shared/services/prisma.service";

@Injectable()
export class RolesService {
    private clientRolesId: number | null = null;
    constructor(private readonly prismaService: PrismaService) { 
         
    }
    
    async getClientRoleId() {
     
        if (this.clientRolesId) {
            return this.clientRolesId;
        }
        const role = await this.prismaService.role.findFirstOrThrow({
            where: {
                name: RoleName.Client
            }
        })
        this.clientRolesId = role.id
        return role.id
    }
}
