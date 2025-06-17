import { IsString } from "class-validator"

export class PasswordDTO {
    
    @IsString()
    currentPassword: string

    @IsString()
    newPassword: string
}