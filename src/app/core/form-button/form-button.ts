import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-button',
  imports: [MatButtonModule],
  templateUrl: './form-button.html',
  styleUrl: './form-button.scss',
})
export class FormButton {

  isUpdate = input.required<boolean>()

}
