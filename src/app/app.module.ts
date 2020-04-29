import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule  } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatKeyboardModule } from '@ngx-material-keyboard/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Ng2Rut } from 'ng2-rut';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { PagoComponent } from './components/pago/pago.component';
import { PagoEfectivoComponent } from './components/pago-efectivo/pago-efectivo.component';
import { PagoServiceService } from './services/service/pago-service.service'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PagoComponent,
    PagoEfectivoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatKeyboardModule,
    ModalModule.forRoot(),
    Ng2Rut
  ],
  providers: [PagoServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
