import { Injectable } from '@angular/core';
import { Deposit } from './deposit.model';

@Injectable({
  providedIn: 'root'
})
export class DepositService {
 deposit: Deposit[]=[];

 constructor(){
  //cargar lso datos al iniciar
  this.loadDeposit();
 }

 addDeposit(newDeposit: Deposit){
  this.deposit.push(newDeposit);
  this.saveToLocalStorage();
 }

 private saveToLocalStorage(){
  localStorage.setItem('deposit', JSON.stringify(this.deposit));
 }

 private loadDeposit(){
  const data = localStorage.getItem('deposit');
    if (data) {
      this.deposit = JSON.parse(data);
    }  
 }

 delete(deposit: Deposit){
  const indice: number = this.deposit.indexOf(deposit);
  this.deposit.splice(indice, 1);
 }
}
