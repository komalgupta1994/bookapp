import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.service';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserFormComponent } from './user-form/user-form.component';
import { CreateUserComponent } from './create-user/create-user.component';

//defines all routes
const appRoutes: Routes =

[{

    "path": "login",
    "component": LoginComponent
},{

    "path": "register",
    "component": RegisterComponent
},{

    "path": "user",
    "component": UserFormComponent,
    "canActivate": [AuthGuard]
},{

    "path": "add-user",
    "component": CreateUserComponent,
    "canActivate": [AuthGuard]
},{

    "path": "",
    'redirectTo': '/login',
    'pathMatch': 'full'
}]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes , { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {


}