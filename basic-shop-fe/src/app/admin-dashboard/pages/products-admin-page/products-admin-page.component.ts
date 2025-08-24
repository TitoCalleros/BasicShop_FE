import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsService } from '@products/services/products.service';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { PaginationComponent } from "@shared/components/pagination/pagination.component";
import { ProductTableComponent } from "@products/components/product-table/product-table.component";

@Component({
  selector: 'app-products-admin-page',
  imports: [PaginationComponent, ProductTableComponent, RouterLink],
  templateUrl: './products-admin-page.component.html',
})
export class ProductsAdminPageComponent {
  productsService = inject(ProductsService);

  paginationService = inject(PaginationService);

  productsPerPage = signal(9);

  productsResource = rxResource({
    request: () => ({ page: this.paginationService.currentPage(), pageSize: this.productsPerPage() }),
    loader: ({request}) => {
      return this.productsService.getProducts({page: request.page, pageSize: request.pageSize, search: '', sort: 0, gender: ''});
    }
  });


}
