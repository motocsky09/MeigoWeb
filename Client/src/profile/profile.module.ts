import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    ProfileRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
