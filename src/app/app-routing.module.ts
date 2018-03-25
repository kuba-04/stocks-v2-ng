import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StocksListComponent } from "./stocks-list/stocks-list.component";
import { PortfolioListComponent } from "./portfolio-list/portfolio-list.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'main', component: StocksListComponent },
    { path: ':id', component: PortfolioListComponent }
    // { path: 'portfolio:', component: PortfolioListComponent,
    //       children: [
    //     { path: ':id', component: PortfolioListComponent }]}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
