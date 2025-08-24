import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { ProductsService } from '@products/services/products.service';

@Component({
  selector: 'app-product-page',
  imports: [ProductImagePipe, CurrencyPipe, RouterLink],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {

  productsService = inject(ProductsService);
  activatedRoute = inject(ActivatedRoute);

  id: string = this.activatedRoute.snapshot.params['id'];

  productResource = rxResource({
    request: () => ({id: this.id}),
    loader: ({request}) => {
      return this.productsService.getProductById(request.id);
    }
  });

}
