import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StocksListComponent } from "./stocks-list/stocks-list.component";
import { PortfolioListComponent } from "./portfolio-list/portfolio-list.component";
import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterSuccessComponent } from "./auth/register/register-success/register-success.component";

const appRoutes: Routes = [
    { path: '', redirectTo: 'portfolio/main', pathMatch: 'full' },
    { path: 'portfolio', children: [
        { path: '', component: PortfolioListComponent },
        // { path: 'main', component: PortfolioListComponent },
        { path: ':id', component: PortfolioListComponent },
    ]},
    { path: 'user/register', component: RegisterComponent },
    { path: 'user/login', component: LoginComponent },
    { path: 'user/register-success', component: RegisterSuccessComponent }
]

@NgModule({
    imports: [RouterModule, RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
