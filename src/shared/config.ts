import z from 'zod'
import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

config({
  path: '.env',
})

if (!fs.existsSync(path.resolve('.env'))) {
  console.log('can not find env')
  process.exit(1)
}

const configSchema = z.object({
  DATABASE_URL: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),
  SECRET_API_KEY: z.string(),
  ADMIN_NAME: z.string(),
  ADMIN_PASSWORD: z.string(),
  ADMIN_EMAIL: z.string(),
  ADMIN_PHONE_NUMBER: z.string(),
  OTP_EXPIRES_IN: z.string(),
  RESEND_API_KEY: z.string(),
})
const configServer = configSchema.safeParse(process.env)
if (!configServer.success) {
  console.log("data on .env is incorrect")
  console.error(configServer.error)
  process.exit(1)
}
// class ConfigSchema {
//   @IsString()
//   DATABASE_URL: string
//   @IsString()
//   ACCESS_TOKEN_SECRET: string
//   @IsString()
//   ACCESS_TOKEN_EXPIRES_IN: string
//   @IsString()
//   REFRESH_TOKEN_SECRET: string
//   @IsString()
//   REFRESH_TOKEN_EXPIRES_IN: string
//   @IsString()
//   SECRET_API_KEY: string
// }

// const configServer = plainToInstance(ConfigSchema, process.env, {
//   enableImplicitConversion: true,
// })
// const errorArray = validateSync(configServer)

// if (errorArray.length > 0) {
//   console.log('Các giá trị khai báo trong file .env không hợp lệ')
//   const errors = errorArray.map((eItem) => {
//     return {
//       property: eItem.property,
//       constraints: eItem.constraints,
//       value: eItem.value,
//     }
//   })
//   throw errors
// }
const envConfig = configServer.data

export default envConfig
