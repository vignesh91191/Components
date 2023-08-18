import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

interface DropdownOption {
  key: string;
  value: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  apiEndpoint: string = "";

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.apiEndpoint = "";
    this.myForm = new FormGroup({
      name: new FormControl({ key: '1', value: 'name 1' }),
      email: new FormControl('')
    });
  }
  title = 'SGWebcontrol';
  myForm!: FormGroup;
  dropdownOptions: DropdownOption[] = [
    { key: '1', value: 'Vignesh' },
    { key: '2', value: 'Mahesh' },
    { key: '3', value: 'Rajesh' },
    { key: '4', value: 'Suresh' },
    { key: '5', value: 'Keerthi' },
    { key: '6', value: 'Karthi' },
    { key: '7', value: 'Avinash' },
    { key: '8', value: 'Praveen' },
  ];

  dropdownOptions1: DropdownOption[] = [
    { key: '1', value: 'name 1' },
    { key: '2', value: 'name 2' },
    { key: '3', value: 'name 3' },
    { key: '4', value: 'name 4' },
    { key: '5', value: 'name 5' },
    { key: '6', value: 'name 6' },
    { key: '7', value: 'name 7' },
    { key: '8', value: 'name 8' },
  ];



  onOptionSelected(data: any) {

  }

  onOptionSelected1(data: any) {

  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Name', form.value.email);
  }


}
