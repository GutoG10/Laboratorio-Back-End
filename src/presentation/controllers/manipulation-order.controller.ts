import { Body, Controller, Post } from "@nestjs/common";
import { AuthUserDto, ManipulationOrderDTO } from "src/application/dto";
import { CreateManipulationOrderUsecase } from "src/application/usecases";
import { GetUser } from "src/common/user";

@Controller('manipulation-order')
export class ManipulationOrderController {
    constructor(
        private readonly createManipulationOrderUsecase: CreateManipulationOrderUsecase
    ){}

    @Post()
    async create(
        @Body() data: ManipulationOrderDTO,
        @GetUser() user: AuthUserDto
    ){
        return await this.createManipulationOrderUsecase.process(data, user)
    }
}