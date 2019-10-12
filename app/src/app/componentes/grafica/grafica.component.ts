import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss'],
})
export class GraficaComponent implements OnInit {
  
  BarChart=[];
  PieChart=[];
  tipo: boolean = JSON.parse(localStorage.getItem('sala')); //true = lindo, false = feo
  datos = JSON.parse(localStorage.getItem('grafica'));
  
  constructor() {
   }

  ngOnInit() {

  	let votos = this.datos.map(x => x.votos);
  	let ref = this.datos.map(x => x.usuario);
  	//console.log(this.tipo);
  	// Bar chart:
	this.BarChart = new Chart('barChart', {
	  type: 'bar',
	data: {
	 labels: ref,
	 datasets: [{
	     label: 'Foto',
	     data: votos,
	     backgroundColor: [
	         'rgba(255, 99, 132, 0.2)',
	         'rgba(54, 162, 235, 0.2)',
	         'rgba(255, 206, 86, 0.2)',
	         'rgba(75, 192, 192, 0.2)',
	         'rgba(153, 102, 255, 0.2)',
	         'rgba(255, 159, 64, 0.2)'
	     ],
	     borderColor: [
	         'rgba(255,99,132,1)',
	         'rgba(54, 162, 235, 1)',
	         'rgba(255, 206, 86, 1)',
	         'rgba(75, 192, 192, 1)',
	         'rgba(153, 102, 255, 1)',
	         'rgba(255, 159, 64, 1)'
	     ],
	     borderWidth: 1
	 }]
	}, 
	options: {
	 title:{
	     text:"Fotos Feas",
	     display:true
	 },
	 scales: {
	     yAxes: [{
	         ticks: {
	             beginAtZero:true
	         }
	     }]
	 }
	}
	});

	// pie chart:
	this.PieChart = new Chart('pieChart', {
	  type: 'pie',
	data: {
	 labels: ref,
	 datasets: [{
	     label: 'Fotos Lindas',
	     data: votos,
	     backgroundColor: [
	         'rgba(255, 99, 132, 0.2)',
	         'rgba(54, 162, 235, 0.2)',
	         'rgba(255, 206, 86, 0.2)',
	         'rgba(75, 192, 192, 0.2)',
	         'rgba(153, 102, 255, 0.2)',
	         'rgba(255, 159, 64, 0.2)'
	     ],
	     borderColor: [
	         'rgba(255,99,132,1)',
	         'rgba(54, 162, 235, 1)',
	         'rgba(255, 206, 86, 1)',
	         'rgba(75, 192, 192, 1)',
	         'rgba(153, 102, 255, 1)',
	         'rgba(255, 159, 64, 1)'
	     ],
	     borderWidth: 1
	 }]
	}, 
	options: {
	 title:{
	     text:"Fotos Lindas",
	     display:true
	 },
	 scales: {
	     yAxes: [{
	         ticks: {
	             beginAtZero:true
	         }
	     }]
	 }
	}
	});



  }


}
