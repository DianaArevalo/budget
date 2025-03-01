import { Injectable } from '@angular/core';
import { Egress } from './egress.model';

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
}
