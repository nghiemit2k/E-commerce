import { Global, Module } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
import { HashingService } from './services/hashing.service'
import { TokenService } from './services/token.service'
import { JwtModule } from '@nestjs/jwt'
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard'
import { APIKeyGuard } from 'src/shared/guards/api-key.guard'
import { APP_GUARD } from '@nestjs/core'
import { SharedUserRepository } from './repositories/shared-user.repo'
// import { AuthenticationGuard } from 'src/shared/guards/authentication.guard'

const sharedServices = [PrismaService, HashingService, TokenService,SharedUserRepository ]

@Global()
@Module({
  providers: [
    ...sharedServices, SharedUserRepository
    // AccessTokenGuard,
    // APIKeyGuard,
    // {
    //   provide: APP_GUARD,
    //   // useClass: AuthenticationGuard,
    // },
  ],
  exports: sharedServices,
  imports: [JwtModule],
})
export class SharedModule {}
