import { MessageService } from 'primeng/components/common/messageservice';
import { AuthGuard } from './services/auth.services';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Config } from '../config/config';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import {GrowlModule} from 'primeng/growl';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { UsersTypesComponent } from './components/users-types/users-types.component';
import { TypesComponent } from './components/types/types.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddUsersTypeComponent } from './components/add-users-type/add-users-type.component';
import { ItemsComponent } from './components/items/items.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { AddItemsTypeComponent } from './components/add-items-type/add-items-type.component';
import { HomeComponent } from './components/home/home.component';
import { NotificationsComponent } from './components/notifications/notifications.component';


@NgModule({
  declarations: [
    AppComponent,
    TypesComponent,
    LoginComponent,
    UsersComponent,
    AdduserComponent,
    UsersTypesComponent,
    HeaderComponent,
    FooterComponent,
    AddUsersTypeComponent,
    ItemsComponent,
    AddItemComponent,
    AddItemsTypeComponent,
    HomeComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, canActivate: [AuthGuard]},
      { path: "login", component: LoginComponent},
      { path: "users", component: UsersComponent, canActivate: [AuthGuard]},
      { path: "addUser", component: AdduserComponent, canActivate: [AuthGuard]},
      { path: "usersTypes", component: UsersTypesComponent, canActivate: [AuthGuard]},
      { path: "addUsersType", component: AddUsersTypeComponent, canActivate: [AuthGuard]},
      { path: "items", component: ItemsComponent, canActivate: [AuthGuard]},
      { path: "addItem", component: AddItemComponent, canActivate: [AuthGuard]},
      { path: "types", component: TypesComponent, canActivate: [AuthGuard]},
      { path: "addItemsType", component: AddItemsTypeComponent, canActivate: [AuthGuard]}
    ]),
    AngularFireModule.initializeApp(Config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpModule,
    HttpClientModule,
    GrowlModule,
    MessagesModule,
    MessageModule
  ],
  providers: [
    AuthGuard,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
