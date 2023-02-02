import { UpdateTourComponent } from './tour/update-tour/update-tour.component';
import { CreateTourComponent } from './tour/create-tour/create-tour.component';
import { TableTourComponent } from './tour/table-tour/table-tour.component';
import { UpdateCateComponent } from './category/update-cate/update-cate.component';
import { CreateCateComponent } from './category/create-cate/create-cate.component';
import { MainComponent } from './pages/main/main.component';
import { AdminAppComponent } from './admin-app/admin-app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './category/table/table.component';

const routes: Routes = [
  {path: '', component:AdminAppComponent, children:[
    {path:"", component: MainComponent},
    {path:"category", component: TableComponent},
    {path:"create-category", component: CreateCateComponent},
    {path:"update-category/:id", component: UpdateCateComponent},
    {path:"tour", component: TableTourComponent},
    {path:"create-tour", component: CreateTourComponent},
    {path:"update-tour/:id", component: UpdateTourComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
