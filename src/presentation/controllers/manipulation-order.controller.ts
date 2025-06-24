import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AuthUserDto, ManipulationOrderDTO } from "src/application/dto";
import { CreateManipulationOrderUsecase, GetAllManipulationOrderUsecase, GetManipulationOrderByIdUsecase } from "src/application/usecases";
import { GetUser } from "src/common/user";

@Controller('manipulation-order')
export class ManipulationOrderController {
    constructor(
        private readonly createManipulationOrderUsecase: CreateManipulationOrderUsecase,
        private readonly getAllManipulationOrderUsecase: GetAllManipulationOrderUsecase,
        private readonly getManipulationOrderByIdUsecase: GetManipulationOrderByIdUsecase,
    ){}

    @Get()
    async getAll() {
        return await this.getAllManipulationOrderUsecase.process();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.getManipulationOrderByIdUsecase.process(id)
    }

    @Post()
    async create(
        @Body() data: ManipulationOrderDTO,
        @GetUser() user: AuthUserDto
    ){
        return await this.createManipulationOrderUsecase.process(data, user)
    }
}