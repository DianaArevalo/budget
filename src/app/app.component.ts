import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DepositComponent } from "./deposit/deposit.component";
import { HeadComponent } from "./head/head.component";
import { FormComponent } from "./form/form.component";
import { EgressComponent } from "./egress/egress.component";
import { Deposit} from "./deposit/deposit.model";
import { Egress } from './egress/egress.model';
import { DepositService } from './deposit/deposit.service';
import { EgressService } from './egress/egress.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeadComponent, FormComponent, DepositComponent, EgressComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CASA DE NUTRIAS';

  imagePath: string ='../assets/images/economy2.jpg';

  deposit: Deposit[]=[];
  egress: Egress[]=[];

  constructor(
    private depositService: DepositService,
    private egressService: EgressService
  ){
    this.deposit = this.depositService.deposit;
    this.egress = this.egressService.egress;
  }

  getDepositResult(){
    let depositResult: number = 0;
    this.deposit.forEach(deposit => {
      depositResult += deposit.value;
    });
    return depositResult;
  }

  getEgressResult(){
    let egressResult: number = 0;
    this.egress.forEach(egress => {
      egressResult += egress.value;
    })
    return egressResult;
  }

  getPercentage(){
    return this.getEgressResult()/this.getDepositResult();
  }

  getBudgetResult(){
    return this.getDepositResult() - this.getEgressResult();
  }
}
