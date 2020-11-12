import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-product-sales-chart',
  templateUrl: './product-sales-chart.component.html',
  styleUrls: ['./product-sales-chart.component.css']
})
export class ProductSalesChartComponent implements OnInit {

  public radarChartOptions: ChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['товар1', 'товар2', 'товар3', 'товар4', 'товар5', 'товар6', 'товар7'];

  public radarChartData: ChartDataSets[] = [
    { data: [254, 459, 298, 289, 584, 458, 285], label: 'Женщины' },
    { data: [633, 344, 354, 556, 289, 227, 254], label: 'Мужчины' }
  ];
  public radarChartType: ChartType = 'radar';

  constructor() { }

  ngOnInit() {
  }

}
