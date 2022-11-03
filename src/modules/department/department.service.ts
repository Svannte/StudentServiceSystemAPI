import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async getAll(): Promise<Department[]> {
    return await this.departmentRepository.find();
  }

  async getOne(id: string): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id: +id },
      //relations: { groups: true },
    });

    if (!department) {
      throw new NotFoundException(`Department with id:${id} does not exist`);
    }
    return department;
  }

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const department = this.departmentRepository.create(createDepartmentDto);
    return await this.departmentRepository.save(department);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.departmentRepository.delete({ id: +id });
  }

  async update(
    id: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    const repository = await this.departmentRepository.preload({
      id: +id,
      ...updateDepartmentDto,
    });

    if (!repository) {
      throw new NotFoundException(`Department with id:${id} does not exist`);
    }
    return await this.departmentRepository.save(repository);
  }
}
