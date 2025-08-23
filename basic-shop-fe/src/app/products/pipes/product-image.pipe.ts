import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productImage'
})

export class ProductImagePipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'men':
        return './assets/images/male-icon2.svg';

      case 'women':
        return './assets/images/woman-icon.svg';

      default:
        return './assets/images/kids.svg';
    }
  }
}
