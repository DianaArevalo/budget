import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DepositService } from '../deposit/deposit.service';
import { EgressService } from '../egress/egress.service';
import { Deposit } from '../deposit/deposit.model';
import { Egress } from '../egress/egress.model';

@Component({
  selector: 'app-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
 tipo:string = 'depositOperation';
 //input form
 descriptionInput: string| null = null;
 valueInput: number| null = null;

 constructor(private depositService: DepositService, private egressService: EgressService ){

 }

 typeOperation(evento: Event){
  const elementSelect = evento.target as HTMLSelectElement;
  this.tipo = elementSelect.value;
 }

 addValue(event: Event){
  event.preventDefault(); 
  
  if (this.descriptionInput != null && this.valueInput != null) {
    if (this.tipo === 'depositOperation') {
             this.depositService.addDeposit(
              new Deposit(this.descriptionInput, this.valueInput)
             );
    } else {
      this.egressService.addEgress(
        new Egress(this.descriptionInput, this.valueInput)
      );
    }    
  }
  else{
    console.log('Introduce valor en descripcion y valor validos');    
  }
  //Limpiar el formulario
  this.descriptionInput = null;
  this.valueInput = null;
 }

}
