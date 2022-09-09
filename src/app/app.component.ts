import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm: FormGroup;
  forbiddenUsername = ['Chris', "Anna"];

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNamesValidate.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender': new FormControl('male', Validators.required),
      'hobbies': new FormArray([]),
    });
  }

  onSubmit() {
    console.log(this.signUpForm);
  }
  onAddHobby() {
    const controllerHobby = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(controllerHobby);
  }

  getcontrols() { return (this.signUpForm.get('hobbies') as FormArray).controls; }

  forbiddenNamesValidate(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsername.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }
}
