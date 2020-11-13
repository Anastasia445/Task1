import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { MainService } from 'src/app/services/main.service';
import { main } from 'src/app/main-page/main-page.component';
@Component({
  selector: 'app-annual-sales-chart',
  templateUrl: './annual-sales-chart.component.html',
  styleUrls: ['./annual-sales-chart.component.css']
})
export class AnnualSalesChartComponent implements OnInit {

  /*public lineChartData: ChartDataSets[] = [
    { data: [643, 345, 534, 324, 456, 506, 680], label: 'Товар1' },
  ];*/
 // public lineChartLabels: Label[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  
  records: main[]; 
  constructor(private MainService: MainService) { }

  ngOnInit() {
      this.barChartData1();
  }

  public lineChartData: ChartDataSets[] = [
    // { data: [54, 49, 59, 72], label: 'Женщины' },
     //{ data: [109, 43, 15, 53], label: 'Мужчины' }
    { data: [], label: 'e:' },
   ];
   public lineChartLabels: Label[] = ['1','2','3','4','5','6','7','8','9','10'];
  
   barChartData1(){
     this.MainService.getRecords10().subscribe(
       results => {
         this.records = results;
         this.records.forEach(
           li => {
            // let count = li.title.replace(/\s/g, '').length;
             this.lineChartData[0].data.push(li.title.match(/e/g).length);
                 });
                   }
     )}
 

}
