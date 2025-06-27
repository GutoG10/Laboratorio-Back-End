import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { AuthUserDto, ManipulationOrderDTO } from "src/application/dto";
import { CreateManipulationOrderUsecase, GetAllManipulationOrderUsecase, GetManipulationOrderByIdUsecase, UpdateManipulationOrderUsecase } from "src/application/usecases";
import { GetUser } from "src/common/user";

@Controller('manipulation-order')
export class ManipulationOrderController {
    constructor(
        private readonly createManipulationOrderUsecase: CreateManipulationOrderUsecase,
        private readonly getAllManipulationOrderUsecase: GetAllManipulationOrderUsecase,
        private readonly getManipulationOrderByIdUsecase: GetManipulationOrderByIdUsecase,
        private readonly updateManipulationOrderUsecase: UpdateManipulationOrderUsecase,

    ){}

    @Get()
    async getAll() {
        return await this.getAllManipulationOrderUsecase.process();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.getManipulationOrderByIdUsecase.process(id)
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() data: ManipulationOrderDTO,
        @GetUser() user: AuthUserDto
    ){
        return await this.updateManipulationOrderUsecase.process(id, data, user)
    }

    @Post()
    async create(
        @Body() data: ManipulationOrderDTO,
        @GetUser() user: AuthUserDto
    ){
        return await this.createManipulationOrderUsecase.process(data, user)
    }
}