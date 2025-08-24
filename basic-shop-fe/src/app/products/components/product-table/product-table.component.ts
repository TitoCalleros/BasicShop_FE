import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { ProductsService } from '@products/services/products.service';

@Component({
  selector: 'product-table',
  imports: [CurrencyPipe, ProductImagePipe, RouterLink],
  templateUrl: './product-table.component.html',
})
export class ProductTableComponent {
  products = input.required<Product[]>();

  productService = inject(ProductsService);

  changeSelectedProduct(id: string) {
    console.log(`Selected id: ${this.productService.selectedId()} - id: ${id}`);

    if (this.productService.selectedId() == id)
    {
      this.productService.selectedId.set(null);
      return;
    }

    this.productService.selectedId.set(id);

  }

}
