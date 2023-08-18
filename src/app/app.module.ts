import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CustomTextboxComponent } from './Components/custom-textbox/custom-textbox.component';
import { CustomDropdownComponent } from './Components/custom-dropdown/custom-dropdown.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CustomTextboxComponent,
    CustomDropdownComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
