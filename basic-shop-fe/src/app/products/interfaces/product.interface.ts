export interface ProductsResponse {
  items:      Product[];
  page:       number;
  pageSize:   number;
  totalCount: number;
  totalPages: number;
}

export interface Product {
  id:          string;
  name:        string;
  description: string;
  price:       number;
  stock:       number;
  gender:      string;
}

