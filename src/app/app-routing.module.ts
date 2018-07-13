import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StocksListComponent } from "./stocks-list/stocks-list.component";
import { PortfolioListComponent } from "./portfolio-list/portfolio-list.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { SignInComponent } from "./auth/signIn/signIn.component";

const appRoutes: Routes = [
    { path: '', redirectTo: 'portfolio/main', pathMatch: 'full' },
    { path: 'portfolio', children: [
        { path: '', component: PortfolioListComponent },
        { path: 'main', component: PortfolioListComponent },
        { path: ':id', component: PortfolioListComponent },
    ]},
    { path: 'user/signup', component: SignupComponent },
    { path: 'user/signIn', component: SignInComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
