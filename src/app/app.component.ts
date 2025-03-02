import { Component, OnInit } from '@angular/core';
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
    public depositService: DepositService,
    public egressService: EgressService
  ){
    this.deposit = this.depositService.deposit;
    this.egress = this.egressService.egress;
  }

  ngOnInit(){
    this.checkAndExportData();
  }

  private checkAndExportData(){
    const lastExport = localStorage.getItem('lastExportDate');
    const today = new Date();
    const lastExportDate = lastExport ? new Date(lastExport) : new Date(0);

    //verificar si ha pasado un mes antes de la ultima exportación

    if (today.getMonth() !== lastExportDate.getMonth() || today.getFullYear() !== lastExportDate.getFullYear()) {
      alert('Exportando datos a excel, asegurese de guardar sus datos despues de recargar');
      this.depositService.exportToExcel();
      

      // Limpiar los datos después de la exportación
    this.depositService.clearDeposits();
    this.egressService.clearEgress();

    // También limpiar la lista en el componente
    this.deposit = [];
    this.egress = [];

    localStorage.setItem('lastExportDate', today.toISOString()); // Guarda la fecha de exportación
      
    }
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
