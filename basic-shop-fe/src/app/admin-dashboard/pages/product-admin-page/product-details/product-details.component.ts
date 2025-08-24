import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '@products/interfaces/product.interface';
import { ProductsService } from '@products/services/products.service';
import { FormUtils } from '@shared/utils/form-utils';
import { FormErrorLabelComponent } from '@shared/components/form-error-label/form-error-label.component';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'product-details',
  imports: [ReactiveFormsModule, FormErrorLabelComponent, ProductImagePipe],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  productService = inject(ProductsService);
  product = input.required<Product>();

  fb = inject(FormBuilder);
  router = inject(Router);

  formUtils = FormUtils;

  wasSaved = signal(false);

  productDetailsForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(250)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0,  [Validators.required, Validators.min(1), Validators.max(30000), Validators.pattern(/^\d+$/)]],
    gender: ['men', [Validators.required, Validators.pattern(/men|women|kid/)]],
  });

  ngOnInit(): void {
    this.setFormValue(this.product());
  }

  setFormValue(formLike: Partial<Product>) {
    this.productDetailsForm.reset(formLike as any);
  }

  async onSubmit() {
    const isValid = this.productDetailsForm.valid;

    this.productDetailsForm.markAllAsTouched();

    if (!isValid) return;

    const formValue = this.productDetailsForm.value;

    const productLike: Partial<Product> = {
      ...(formValue as any)
    };

    if (this.product().id === 'new') {
      const product = await firstValueFrom(
        this.productService.createProduct(productLike)
      );

      this.showMessage(true, product.id);
    } else {
      await firstValueFrom(
        this.productService.updateProduct(this.product().id, productLike)
      );

      this.showMessage(false);
    }
  }

  showMessage(route:boolean, id: string = '') {
    this.wasSaved.set(true);
    setTimeout(() => {
      this.wasSaved.set(false);
      if (route) {
        this.router.navigate(['admin/product', id]);
      }
    }, 3000);
  }
}
