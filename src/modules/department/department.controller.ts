import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Department')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  async getAllDepartments() {
    return await this.departmentService.getAll();
  }

  @Get(':departmentId')
  async getDepartment(@Param('departmentId', ParseIntPipe) id: string) {
    return await this.departmentService.getOne(id);
  }

  @Post()
  async createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    return await this.departmentService.create(createDepartmentDto);
  }

  @Patch(':departmentId')
  async update(
    @Param('departmentId', ParseIntPipe) id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return await this.departmentService.update(id, updateDepartmentDto);
  }

  @Delete(':departmentId')
  async delete(@Param('departmentId', ParseIntPipe) id: string) {
    return await this.departmentService.delete(id);
  }
}
