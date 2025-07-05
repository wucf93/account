import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation } from '@nestjs/swagger';
import { CategoryEntity } from './entities/category.entity';
import { ApiResponseResult } from 'src/common';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: '获取所有分类' })
  @ApiResponseResult({ type: CategoryEntity, isArray: true })
  findAll() {
    return this.categoryService.findAll();
  }
}
