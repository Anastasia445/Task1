import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { MainService } from 'src/app/services/main.service';
import { main } from 'src/app/main-page/main-page.component';
@Component({
  selector: 'app-product-sales-chart',
  templateUrl: './product-sales-chart.component.html',
  styleUrls: ['./product-sales-chart.component.css']
})
export class ProductSalesChartComponent implements OnInit {

  public radarChartOptions: ChartOptions = {
    responsive: true,
  };
  //public radarChartLabels: Label[] = ['товар1', 'товар2', 'товар3', 'товар4', 'товар5', 'товар6', 'товар7'];

  /*public radarChartData: ChartDataSets[] = [
    { data: [254, 459, 298, 289, 584, 458, 285], label: 'Женщины' },
    { data: [633, 344, 354, 556, 289, 227, 254], label: 'Мужчины' }
  ];*/
  public radarChartType: ChartType = 'radar';


  records: main[]; 
  constructor(private MainService: MainService) { }

  ngOnInit() {
      this.barChartData1();
  }

  public radarChartData: ChartDataSets[] = [
    // { data: [54, 49, 59, 72], label: 'Женщины' },
     //{ data: [109, 43, 15, 53], label: 'Мужчины' }
    { data: [], label: 'title "e":' },
    { data: [], label: 'body "e":' },
   ];
   public radarChartLabels: Label[] = ['1','2','3','4','5','6','7','8','9','10'];
  
   barChartData1(){
     this.MainService.getRecords10().subscribe(
       results => {
         this.records = results;
         this.records.forEach(
           li => {
            this.radarChartData[0].data.push(li.title.match(/e/g).length);
             this.radarChartData[1].data.push(li.body.match(/e/g).length);
                 });
                   }
     )}

}
