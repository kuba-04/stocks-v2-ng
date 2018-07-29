import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PortfolioListService } from '../portfolio-list.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClickOutsideModule } from 'ng4-click-outside';
import { PortfolioListComponent } from '../portfolio-list.component';

@Component({
  selector: 'app-portfolio-add',
  templateUrl: './portfolio-add.component.html'
})
export class PortfolioAddComponent implements OnInit {
  // @Output() formEnabled = new EventEmitter<boolean>();

  constructor(private service: PortfolioListService, private router: Router,
    private parentComponent: PortfolioListComponent) {}

  ngOnInit() {
  }

  addPortfolio(form: NgForm) {
    var newPortfolio = form.value.portfolio;
    this.service.addPortfolio(newPortfolio);
    this.router.navigate(['/portfolio/' + newPortfolio]);
    this.parentComponent.setActivePortfolio(newPortfolio);
    form.reset();
    // this.formEnabled.emit(false);
    this.parentComponent.setEnabledPortfolioForm(false);
  }

  onCloseForm() {
    console.log('clicked')
    // this.formEnabled.emit(false);
    this.parentComponent.setEnabledPortfolioForm(false);
  }

}
