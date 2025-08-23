import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const baseUrl = environment.baseUrl;

interface ProductOptions {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: number;
  gender?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);

  getProducts(options: ProductOptions) :Observable<Product[]> {

    const { page = 1, pageSize = 9, search = '', sort = 0, gender = ''} = options;

    return this.http.get<Product[]>(`${baseUrl}/products/filtered`, {
      params: {
        page,
        pageSize,
        search,
        sort,
        gender,
      }
    })
      .pipe(
        tap( resp => console.log(resp))
      )
  }
}
