import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { Product } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private bcService: BreadcrumbService,
    private basketService: BasketService
  ) {
    this.bcService.set('@productDetails', ' ');
  }
  product!: Product;
  quantity = 1;
  quantityInBasket = 0;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idString = params.get('id');
      // const id = idString ? parseInt(idString, 10) : null;
      if (idString) {
        this.shopService.getProduct(+idString).subscribe({
          next: (data) => {
            this.product = data;
            this.bcService.set('@productDetails', this.product.name);
            this.basketService.basketSource$.pipe(take(1)).subscribe({
              next: (basket) => {
                const item = basket?.items.find((x) => x.id === +idString);
                if (item) {
                  this.quantity = item.quantity;
                  this.quantityInBasket = item.quantity;
                }
              },
            });
          },
          error: (error) => console.log(error),
        });
      }
    });
  }
  incrementQuantity() {
    this.quantity++;
  }
  decrementQuantity() {
    if(this.quantity > 0)
      this.quantity--;
  }
  updateBasket() {
    if (this.quantity > this.quantityInBasket) {
      const itemsToAdd = this.quantity - this.quantityInBasket;
      this.quantityInBasket += itemsToAdd;
      this.basketService.addItemToBasket(this.product, itemsToAdd);
    } else {
      const itemsToRemove = this.quantityInBasket - this.quantity;
      this.quantityInBasket -= itemsToRemove;
      this.basketService.removeItemFromBasket(this.product.id, itemsToRemove);
    }
  }
  get buttonText() {
    return this.quantityInBasket === 0 ? 'Add to cart' : 'Update basket';
  }
}
