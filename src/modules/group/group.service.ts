import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from '../department/entities/department.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getGroup(departmentId: string, groupId: string): Promise<Group> {
    const department = await this.departmentRepository.findOne({
      where: { id: +departmentId },
    });
    if (!department) {
      throw new NotFoundException(
        `Department with id:${departmentId} does not exist`,
      );
    }
    return this.groupRepository.findOne({ where: { id: +groupId } });
  }

  async getGroups(id: string): Promise<Group[]> {
    return await this.groupRepository.find({
      where: {
        department: { id: +id },
      },
    });
  }

  async create(id: string, createGroupDto: CreateGroupDto): Promise<Group> {
    const department = await this.departmentRepository.findOne({
      where: { id: +id },
      //groups: true,
      relations: { groups: true },
    });
    if (!department) {
      throw new NotFoundException(`Department with id:${id} does not exist`);
    }
    const group = this.groupRepository.create({
      ...createGroupDto,
      department: { id: +id },
    });
    return await this.groupRepository.save(group);

    //return await this.departmentRepository.save(department);
  }

  async delete(departmentId: string, groupId: string): Promise<DeleteResult> {
    const department = await this.departmentRepository.findOne({
      where: { id: +departmentId },
    });
    if (!department) {
      throw new NotFoundException(
        `Department with id:${departmentId} does not exist`,
      );
    }
    return await this.groupRepository.delete({ id: +groupId });
  }

  async update(
    departmentId: string,
    groupId: string,
    updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    const department = await this.departmentRepository.findOne({
      where: { id: +departmentId },
    });
    if (!department) {
      throw new NotFoundException(
        `Department with id:${departmentId} does not exist`,
      );
    }

    const group = await this.groupRepository.preload({
      id: +groupId,
      ...updateGroupDto,
    });
    if (!group) {
      throw new NotFoundException(`Group with id:${groupId} does not exist`);
    }
    return await this.groupRepository.save(group);
  }

  async findAllStudents(departmentId: string, groupId: string) {
    const department = await this.departmentRepository.findOne({
      where: { id: +departmentId },
    });
    if (!department) {
      throw new NotFoundException(
        `Department with id:${departmentId} does not exist`,
      );
    }
    const group = await this.groupRepository.findOne({
      where: { id: +groupId, department: department },
      relations: { students: true },
    });
    if (!group) {
      throw new NotFoundException(
        `Group with id:${groupId} for department with id:${departmentId} does not exist`,
      );
    }
    return group;
  }

  async addStudent(departmentId: string, groupId: string, userId: string) {
    const department = await this.departmentRepository.findOne({
      where: { id: +departmentId },
    });
    if (!department) {
      throw new NotFoundException(
        `Department with id:${departmentId} does not exist`,
      );
    }
    const group = await this.groupRepository.findOne({
      where: { id: +groupId, department: department },
    });
    if (!group) {
      throw new NotFoundException(
        `Group with id:${groupId} for department with id:${departmentId} does not exist`,
      );
    }
    const user = await this.userRepository.findOne({
      where: { id: +userId },
    });
    if (!user) {
      throw new NotFoundException(`User with id:${userId} does not exist`);
    }
    const updateUser = await this.userRepository.preload({
      ...user,
      //group: { id: +userId },
      group: group,
    });
    //user.group = group;
    //console.log(updateUser.group);
    return await this.userRepository.save(updateUser);
  }
}
