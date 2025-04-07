import { UserStatus } from '@prisma/client'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'
import { LoginBodySchema, LoginResSchema, RegisterBodySchema, RegisterResShema, SendOTPBodySchema } from './auth.model'

// const userSchema = z.object({
//     id: z.number(),
//     email: z.string(),
//     name: z.string(),
//     phoneNumber: z.string(),
//     avatar: z.string().nullable(),
//     status: z.enum([UserStatus.ACTIVE, UserStatus.INACTIVE, UserStatus.BLOCKED]),
//     roleId: z.number(),
//     createdById: z.number().nullable(),
//     updatedById: z.number().nullable(),
//     deletedAt: z.date().nullable(),
//     createdAt: z.date(),
//     updatedAt: z.date()

// })
// const registerBodySchema = z.object({
//     email: z.string().email(),
//     password: z.string().min(6).max(100),
//     name: z.string().min(1).max(100),
//     confirmPassword: z.string().min(6).max(100),
//     phoneNumber: z.string().min(10).max(15),
// }).strict().superRefine(({ confirmPassword, password }, ctx) => {
//     if (confirmPassword !== password) {
//         ctx.addIssue({
//             code: 'custom',
//             message: 'Password and confirmPassword must match',
//             path: ['confirmPassword']
//         })
//     }
// })

export class RegisterBodyDTO extends createZodDto(RegisterBodySchema) { }
export class RegisterResponseDTO extends createZodDto(RegisterResShema) { }
export class SendOTPBodyDTO extends createZodDto(SendOTPBodySchema) { }
export class LoginBodyDTO extends createZodDto(LoginBodySchema) { }
export class LoginResDTO extends  createZodDto(LoginResSchema) {}