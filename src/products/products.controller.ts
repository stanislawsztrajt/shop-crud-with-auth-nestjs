import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './product.schema';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Product> {
    return this.productsService.findById(id)
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.findByIdAndUpdate(id, updateProductDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.findByIdAndDelete(id)
  }
}
