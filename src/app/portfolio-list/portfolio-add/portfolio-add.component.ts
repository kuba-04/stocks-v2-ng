import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PortfolioListService } from '../portfolio-list.service';

@Component({
  selector: 'app-portfolio-add',
  templateUrl: './portfolio-add.component.html'
})
export class PortfolioAddComponent implements OnInit {

  constructor(private service: PortfolioListService) { }

  ngOnInit() {
  }

  addPortfolio(form: NgForm) {
    this.service.addPortfolio(form.value.portfolio);
    form.reset();
  }

}
