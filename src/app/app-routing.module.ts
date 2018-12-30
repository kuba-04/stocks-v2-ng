import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StocksListComponent } from "./stocks-list/stocks-list.component";
import { PortfolioListComponent } from "./portfolio-list/portfolio-list.component";
import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterSuccessComponent } from "./auth/register/register-success/register-success.component";
import { RegisterConfirmedComponent } from "./auth/register/register-confirmed/register-confirmed.component";
import { ResetPasswordComponent } from "./auth/login/reset-password/reset-password.component";
import { ChangePasswordComponent } from "./auth/login/change-password/change-password.component";

const appRoutes: Routes = [
    { path: '', redirectTo: 'portfolio/main', pathMatch: 'full' },
    { path: 'portfolio', children: [
        { path: '', component: PortfolioListComponent },
        { path: ':id', component: PortfolioListComponent },
    ]},
    { path: 'user/register', component: RegisterComponent },
    { path: 'user/login', component: LoginComponent },
    { path: 'user/register-success', component: RegisterSuccessComponent },
    { path: 'user/register-confirmed', component: RegisterConfirmedComponent },
    { path: 'user/reset-password', component: ResetPasswordComponent },
    { path: 'user/change-password', component: ChangePasswordComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
