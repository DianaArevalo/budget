import { Injectable } from '@angular/core';
import { Deposit } from './deposit.model';
import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';
import { EgressService } from '../egress/egress.service';

@Injectable({
  providedIn: 'root'
})
export class DepositService {
 deposit: Deposit[]=[];

 constructor(private egressService: EgressService) { 
  //cargar lso datos al iniciar
  this.loadDeposit();  
 }

 addDeposit(newDeposit: Deposit): void{
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


 exportToExcel(){
//combinar ingresos y egresos
  const combinedData =[
    ...this.deposit.map((d) => ({
      Descripción: d.description,
      Valor: d.value,
      Tipo: 'Ingreso',
    })),

    ...this.egressService.egress.map((e) => ({
      Descripción: e.description,
      Valor: e.value,
      Tipo: 'Egreso',
    }))
  ];

  const workssheet = XLSX.utils.json_to_sheet(combinedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, workssheet, 'Movimientos');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array'});
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `movimientos_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  clearDeposits() {
    this.deposit = [];
  }

 }

