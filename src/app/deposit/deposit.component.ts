import { Component } from '@angular/core';
import { Deposit } from './deposit.model';
import { DepositService } from './deposit.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deposit',
  imports: [CommonModule],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent {
  deposit: Deposit[] =[];

  constructor(private depositService: DepositService) {
    this.deposit = this.depositService.deposit;
   }

   deleteDeposit(deposit: Deposit){
    this.depositService.delete(deposit)
   }

}
