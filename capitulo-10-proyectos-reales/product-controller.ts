// Generado por Kiro, refinado por humano

import {
Controller, Get, Post, Put, Delete,
Param, Query, Body, UseGuards
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AdminGuard } from '../auth/admin.guard';
import {
CreateProductDto, UpdateProductDto,
ProductQueryDto
} from './dto';

@Controller('products')
export class ProductController {
constructor(private readonly productService: ProductService) {}

@Get()
async findAll(@Query() query: ProductQueryDto) {
return this.productService.findAll(query);
}

@Get(':id')
async findOne(@Param('id') id: string) {
return this.productService.findOne(id);
}

@Post()
@UseGuards(AdminGuard)
async create(@Body() createProductDto: CreateProductDto) {
return this.productService.create(createProductDto);
}

@Put(':id')
@UseGuards(AdminGuard)
async update(
@Param('id') id: string,
@Body() updateProductDto: UpdateProductDto
