import { Component, OnInit, ViewChild } from '@angular/core';
import { Portfolio } from '../portfolio.model';
import { PortfolioListService } from './portfolio-list.service';
import { PortfolioAddComponent } from './portfolio-add/portfolio-add.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent implements OnInit {
  portfolios: Portfolio[];
  private portfolioAddComponent: PortfolioAddComponent;

  constructor(private portfolioListService: PortfolioListService) {}

  ngOnInit() {
  }


}
