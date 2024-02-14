import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SkinetUI';
  constructor(private basketService : BasketService) {}
  ngOnInit(): void {
    const id = localStorage.getItem('basket_id')
    console.log(id);
    
    if(id) this.basketService.getBasket(id);
  }
}
