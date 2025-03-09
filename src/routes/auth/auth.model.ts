// import { UserStatus } from '@prisma/client'
import { createZodDto } from 'nestjs-zod'
import { TypeOfVerificationCode } from 'src/shared/constants/auth.constant'
import { userSchema } from 'src/shared/models/shared-user.model'
import { z } from 'zod'



export const RegisterBodySchema = userSchema.pick({
    email: true,
    password: true,
    name: true,
    phoneNumber: true
}).extend({
    confirmPassword: z.string().min(6).max(100),
    code: z.string().length(6)
}).strict().superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: 'custom',
            message: 'Password and confirmPassword must match',
            path: ['confirmPassword']
        })
    }
})

export type RegisterBodyType = z.infer<typeof RegisterBodySchema>

export const RegisterResShema = userSchema.omit({
    password: true,
    totpSecret: true
})

export type RegisterResponseType = z.infer<typeof RegisterResShema>

export const VeificationCode = z.object({
    id: z.number(),
    email: z.string().email(),
    code: z.string().length(6),
    type: z.enum([TypeOfVerificationCode.REGISTER, TypeOfVerificationCode.FORGOT_PASSWORD]),
    expiresAt: z.date(),
    createdAt: z.date()
})

export type VeificationCodeType = z.infer<typeof VeificationCode>

export const SendOTPBodySchema = VeificationCode.pick({
    email: true,
    type: true
}).strict()

export type SendOTPBodyType = z.infer<typeof SendOTPBodySchema>
