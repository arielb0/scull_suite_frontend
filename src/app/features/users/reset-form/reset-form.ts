import { Component, input, output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-reset-form',
  imports: [ReactiveFormsModule, MatInputModule, MatButton],
  templateUrl: './reset-form.html',
  styleUrl: './reset-form.scss'
})
export class ResetForm {

  buttonAction = input.required<string>()
  onSubmit = output<string>()

  resetForm = new FormGroup({
    email: new FormControl('')
  })

}
