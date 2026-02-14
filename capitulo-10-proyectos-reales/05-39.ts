return this.productService.update(id, updateProductDto);
}

@Delete(':id')
@UseGuards(AdminGuard)
async remove(@Param('id') id: string) {
return this.productService.softDelete(id);
}
}
