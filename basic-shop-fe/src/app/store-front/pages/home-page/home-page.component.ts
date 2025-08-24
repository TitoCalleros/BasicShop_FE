import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop'
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '@products/services/products.service';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { PaginationComponent } from "src/app/shared/components/pagination/pagination.component";


@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  productsResource = rxResource({
    request: () => ({page: this.paginationService.currentPage()}),
    loader: ({ request }) => {
      return this.productsService.getProducts({page: request.page, pageSize: 8, search: '', sort: 0, gender: ''});
    }
  });
}
