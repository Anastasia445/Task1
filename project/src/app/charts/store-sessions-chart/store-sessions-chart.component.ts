import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { MainService } from 'src/app/services/main.service';
import { main } from 'src/app/main-page/main-page.component';
@Component({
  selector: 'app-store-sessions-chart',
  templateUrl: './store-sessions-chart.component.html',
  styleUrls: ['./store-sessions-chart.component.css']
})
export class StoreSessionsChartComponent implements OnInit {

  records: main[];  
  constructor( private MainService: MainService,) { }

  ngOnInit() {
    this.barChartData1();
    this.sum();
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  
 // public barChartLabels: Label[] = ['20-30 лет', '30-40 лет', '40-50 лет','50-60 лет'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
   // { data: [54, 49, 59, 72], label: 'Женщины' },
    //{ data: [109, 43, 15, 53], label: 'Мужчины' }
    { data: [], label: 'count' },
  ];
  public barChartLabels: Label[] =  ['1','2','3','4','5','6','7','8','9','10'];
 
  barChartData1(){
    this.MainService.getRecords10().subscribe(
      results => {
        this.records = results;
        this.records.forEach(
          li => {
            let count = li.title.replace(/\s/g, '').length;
            this.barChartData[0].data.push(count);
                });
                  }
    )}

  sum(){
  
  }

}
