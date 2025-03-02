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
    if (indice !== -1) {
      this.deposit.splice(indice, 1);
      this.saveToLocalStorage();
    }
 }

 getTotalDeposit(){
  return this.deposit.reduce((total, deposit) => total + deposit.value, 0);
 }

 getTotalEgress(){
  return this.egressService.egress.reduce((total, egress) => total + egress.value, 0);
 }

 getBudget(){
  return this.getTotalDeposit() - this.getTotalEgress();
 }

 exportToExcel(){

//obtener los metodos
const totalDeposit = this.getTotalDeposit();
const totalEgress = this.getTotalEgress();
const budget = this.getBudget();

//combinar ingresos y egresos
  const allTransactions =[
    ...this.deposit.map((d) => ({
      Descripción: d.description,
      Valor: d.value,
      Tipo: 'Ingreso',
      Fecha: d.date
    })),

    ...this.egressService.egress.map((e) => ({
      Descripción: e.description,
      Valor: e.value,
      Tipo: 'Egreso',
      Fecha: e.date
    })),
    { Tipo: 'TOTAL', Descripción: 'Ingresos', Valor: totalDeposit, Fecha: '' },
    { Tipo: 'TOTAL', Descripción: 'Egresos', Valor: totalEgress, Fecha: '' },
    { Tipo: 'PRESUPUESTO', Descripción: 'Disponible', Valor: budget, Fecha: '' }
  ];

  //agregar fila con presupuesto disponible

  allTransactions.push({
    Tipo: 'Presupuesto',
    Descripción: 'Presupuesto Final',
    Valor: this.getBudget(),
    Fecha: new Date().toISOString().split('T')[0]
  })

  const workssheet = XLSX.utils.json_to_sheet(allTransactions);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, workssheet, 'Movimientos');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array'});
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `movimientos_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  clearDeposits() {
    this.deposit = [];
    this.saveToLocalStorage();
  }

 }

