import { AuthGuard } from './guards/auth.guard';
import { ThirdComponent } from './third/third.component';
import { SecondComponent } from './second/second.component';
import { FirstComponent } from './first/first.component';
import { MaincontentComponent } from './maincontent/maincontent.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';

import { LoginComponent } from './login/login.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch:"full" },
    { path: 'login', component: LoginComponent},
    { path: 'sideMenu', component: SidebarMenuComponent, canActivate : [AuthGuard] },
    { path: 'maincontent', component: MaincontentComponent,
        children: [
            { path: 'first', component: FirstComponent, canActivate : [AuthGuard] },
            { path: 'second', component: SecondComponent, canActivate : [AuthGuard] },
            { path: 'third', component: ThirdComponent, canActivate : [AuthGuard] }

        ], canActivate : [AuthGuard]
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }