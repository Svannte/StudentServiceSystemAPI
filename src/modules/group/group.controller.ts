import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('group')
@ApiTags('Group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  async getGroups(@Param('departmentId', ParseIntPipe) departmentId: string) {
    return this.groupService.getGroups(departmentId);
  }

  @Get(':groupId')
  async getGroup(
    @Param('departmentId', ParseIntPipe) departmentId: string,
    @Param('groupId', ParseIntPipe) groupId: string,
  ) {
    return await this.groupService.getGroup(departmentId, groupId);
  }

  @Post()
  async create(
    @Param('departmentId', ParseIntPipe) departmentId: string,
    @Body() createGroupDto: CreateGroupDto,
  ) {
    return this.groupService.create(departmentId, createGroupDto);
  }

  @Delete(':groupId')
  async delete(
    @Param('departmentId', ParseIntPipe) departmentId: string,
    @Param('groupId', ParseIntPipe) groupId: string,
  ) {
    return this.groupService.delete(departmentId, groupId);
  }
  @Patch(':groupId')
  async update(
    @Param('departmentId', ParseIntPipe) departmentId: string,
    @Param('groupId', ParseIntPipe) groupId: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupService.update(departmentId, groupId, updateGroupDto);
  }

  @Get(':groupId/students')
  async getStudents(
    @Param('departmentId', ParseIntPipe) departmentId: string,
    @Param('groupId', ParseIntPipe) groupId: string,
  ) {
    return await this.groupService.findAllStudents(departmentId, groupId);
  }

  @Post(':groupId/student/:studentId')
  async addStudent(
    @Param('departmentId', ParseIntPipe) departmentId: string,
    @Param('groupId', ParseIntPipe) groupId: string,
    @Param('studentId', ParseIntPipe) studentId: string,
  ) {
    return await this.groupService.addStudent(departmentId, groupId, studentId);
  }
}
