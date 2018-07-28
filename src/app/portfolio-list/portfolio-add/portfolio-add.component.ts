import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PortfolioListService } from '../portfolio-list.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-portfolio-add',
  templateUrl: './portfolio-add.component.html'
})
export class PortfolioAddComponent implements OnInit {
  @Output() formEnabled = new EventEmitter<boolean>();

  constructor(private service: PortfolioListService, private router: Router) {}

  ngOnInit() {
  }

  addPortfolio(form: NgForm) {
    var newPortfolio = form.value.portfolio;
    this.service.addPortfolio(newPortfolio);
    this.router.navigate(['/portfolio/' + newPortfolio]);
    form.reset();
    this.formEnabled.emit(false);
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (event.target.textContent != 'add') {
      this.formEnabled.emit(false);
    }
  }

}
