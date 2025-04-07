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

export const VeificationCodeSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    code: z.string().length(6),
    type: z.enum([TypeOfVerificationCode.REGISTER, TypeOfVerificationCode.FORGOT_PASSWORD]),
    expiresAt: z.date(),
    createdAt: z.date()
})

export type VeificationCodeType = z.infer<typeof VeificationCodeSchema>

export const SendOTPBodySchema = VeificationCodeSchema.pick({
    email: true,
    type: true
}).strict()

export type SendOTPBodyType = z.infer<typeof SendOTPBodySchema>

export const LoginBodySchema = userSchema.pick({
    email: true,
    password: true
}).strict()

export type LoginBodyType = z.infer<typeof LoginBodySchema>

export const LoginResSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string()
})

export type LoginResType = z.infer<typeof LoginResSchema>

export const RefreshTokenBodySchema = z.object({
    refreshToken: z.string()
}).strict()
export type RefreshTokenBodyType = z.infer<typeof RefreshTokenBodySchema>
export const RefreshTokenReSchema = LoginResSchema
export type RefreshTokenResType = LoginResType  

export const DeviceSchema = z.object({
    id: z.number(),
    userId: z.number(),
    userAgent: z.string(),
    ip: z.string(),
    lastActive: z.date(),
    createdAt: z.date(),
    isActive: z.boolean()
})
export type DeviceType = z.infer<typeof DeviceSchema>
export const RoleShema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    isActive: z.string(),
    createdById: z.number().nullable(),
    updatedById: z.number().nullable(),
    deletedAt: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
})
export type RoleType = z.infer<typeof RoleShema>