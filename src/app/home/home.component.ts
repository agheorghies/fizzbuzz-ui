import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FizzbuzzSeries, FizzbuzzService } from './../fizzbuzz.service';

export const sequenceValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const firstValue = control.get('firstValue');
  const lastValue = control.get('lastValue');

  return firstValue && lastValue &&
    parseInt(firstValue.value) > parseInt(lastValue.value) ? { sequenceViolation: true } : null;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formGroup = new FormGroup({
    firstValue: new FormControl('', [
      Validators.required
    ]),
    lastValue: new FormControl('', [
      Validators.required
    ])
  }, { validators: sequenceValidator });

  series: FizzbuzzSeries = [];
  error: any | null = null;

  constructor(private fizzbuzzService: FizzbuzzService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.formGroup.disable();
    this.series = [];
    this.error = null;

    this.fizzbuzzService.getSeries(
      this.formGroup.get('firstValue').value,
      this.formGroup.get('lastValue').value).subscribe((ret) => {
        this.formGroup.enable();
        this.series = ret;
      }, (error) => {
        this.formGroup.enable();
        this.error = error;
      })
  }
}
