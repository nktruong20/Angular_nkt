import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminAppComponent } from './admin-app/admin-app.component';
import { MainComponent } from './pages/main/main.component';
import { TableComponent } from './category/table/table.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { CreateCateComponent } from './category/create-cate/create-cate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateCateComponent } from './category/update-cate/update-cate.component';
import { TableTourComponent } from './tour/table-tour/table-tour.component';
import { CreateTourComponent } from './tour/create-tour/create-tour.component';
import { UpdateTourComponent } from './tour/update-tour/update-tour.component';



@NgModule({
  declarations: [
    AdminAppComponent,
    MainComponent,
    TableComponent,
    NavbarComponent,
    FooterComponent,
    CreateCateComponent,
    UpdateCateComponent,
    TableTourComponent,
    CreateTourComponent,
    UpdateTourComponent,
   

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
