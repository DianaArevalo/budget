import { Injectable } from '@angular/core';
import { Egress } from './egress.model';
import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class EgressService {

  egress: Egress[] =[];

  constructor(){
    this.loadEgress();//cargar los datos 
  }

  addEgress(newEgress:Egress){
    this.egress.push(newEgress);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(){
    localStorage.setItem('egress', JSON.stringify(this.egress));
  }

  private loadEgress(){
    const data = localStorage.getItem('egress');
    if(data){
      this.egress = JSON.parse(data);
    }
  }

  delete(egress: Egress){
    const indice: number = this.egress.indexOf(egress);
    this.egress.splice(indice, 1);
  }


  exportToExcel(){
    const worksheet = XLSX.utils.json_to_sheet(this.egress);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'egress');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    saveAs(blob, `egress_${new Date().toISOString().split('T')[0]}.xlsx`);
  }

  clearEgress() {
    this.egress = [];
  }
}
