import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-head',
  imports: [CommonModule],
  templateUrl: './head.component.html',
  styleUrl: './head.component.css'
})
export class HeadComponent {
  @Input() budgetResult!: number
  @Input() depositResult!: number
  @Input() egressResult!: number
  @Input() percentageResult!: number

}
