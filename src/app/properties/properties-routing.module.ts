import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertiesComponent } from './properties.component';
import { OwnpropertiesComponent } from './components/ownproperties/ownproperties.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { ContentGuard } from '../guard/auth.guard';
import { PropertyCreateComponent } from './components/property-create/property-create.component';

const routes: Routes = [{ path: '', component: PropertiesComponent, children:[
  {path:"own", component: OwnpropertiesComponent, canActivate:[ContentGuard]},
  {path:"own/:id", component: PropertyDetailComponent, canActivate:[ContentGuard]},
  {path:":id", component: PropertyDetailComponent, canActivate:[ContentGuard]},
  {path:"create", component: PropertyCreateComponent, canActivate:[ContentGuard]}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertiesRoutingModule { }
