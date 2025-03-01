import { Component, Input } from '@angular/core';
import { Egress } from './egress.model';
import { EgressService } from './egress.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-egress',
  imports: [CommonModule],
  templateUrl: './egress.component.html',
  styleUrl: './egress.component.css'
})
export class EgressComponent {
  egress: Egress[] = [];

  @Input() depositResult!:number;

  constructor(private egressService: EgressService) {  
    this.egress = this.egressService.egress;
  }

  deleteEgress(egress: Egress){
     this.egressService.delete(egress)
  }

  calcPercentage(egress: Egress){
    return egress.value/this.depositResult
  }


}
