import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface DropdownOption {
  key: string;
  value: string;
}



@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDropdownComponent),
      multi: true
    }
  ]
})
export class CustomDropdownComponent implements ControlValueAccessor {
  @Input() pageSize: number = 5;
  @Input() apiEndpoint: string = ''
  @Input() placeholder: string = "Select an option";
  @Input() options: DropdownOption[] = [];
  @Input() serverSidePagination: boolean = false;
  @Output() selectedOption: EventEmitter<DropdownOption> = new EventEmitter<DropdownOption>();
  showDropdown: boolean = false;
  selectedItem: DropdownOption | undefined;
  selectedValue: string = '';
  paginatedItems: DropdownOption[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  searchText: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private elementRef: ElementRef, private http: HttpClient) {

  }

  fetchServerSideOptions(page: number, pageSize: number, searchText: string) {

    if (!this.apiEndpoint) {
      throw new Error('API endpoint is required for server-side pagination.');
    }

    const apiUrl = `${this.apiEndpoint}?page=${page}&pageSize=${pageSize}&searchText=${searchText}`;
    this.http.get<DropdownOption[]>(apiUrl).subscribe(options => {
      this.options = options; // Update options from the server
      this.paginateItems(); // Update paginatedItems
    }, error => {
      throw new Error('An error occurred while fetching data.' + error.message);
    }).add(() => {
      this.loading = false;
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown) {
      this.currentPage = 1;
      if (this.serverSidePagination) {
        this.fetchServerSideOptions(this.currentPage, this.pageSize, this.searchText);
      } else {
        this.paginateItems();
      }
    }
  }

  onSearch() {
    this.currentPage = 1;
    if (this.serverSidePagination) {
      this.fetchServerSideOptions(this.currentPage, this.pageSize, this.searchText);
    } else {
      this.paginateItems();
    }
  }

  paginateItems() {

    let filteredOptions = this.options;

    if (this.searchText) {
      filteredOptions = this.options.filter(option =>
        option.value.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    this.totalPages = Math.ceil(filteredOptions.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, filteredOptions.length);
    this.paginatedItems = filteredOptions.slice(startIndex, endIndex);
  }

  goToPrevPage() {
    this.currentPage--;
    this.paginateItems();
  }

  goToNextPage() {
    this.currentPage++;
    this.paginateItems();
  }

  onItemSelected(option: DropdownOption) {
    this.selectedItem = option;
    this.selectedValue = option.value;
    this.showDropdown = false;
    this.selectedOption.emit(option);
    this.onChange(option);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const isInside = this.elementRef.nativeElement.contains(clickedElement);
    if (!isInside) {
      this.showDropdown = false;
      this.currentPage = 1;
      this.paginateItems();
    }
  }

  clearSelection() {
    this.selectedItem = undefined;
    this.selectedValue = '';
    this.showDropdown = false;
    this.currentPage = 1;
    this.searchText = '';
    this.paginateItems();
    this.selectedOption.emit(undefined);
    this.onChange(undefined);
  }

  /**Formcontrol Implementation */
  onChange: any = () => { };
  onTouch: any = () => { };

  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.selectedItem = obj;
      this.selectedValue = obj.value;
    } else {
      this.selectedItem = undefined;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {

  }
}
