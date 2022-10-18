import { Component, ElementRef, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'fs-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })
  }

  avoid(event: MouseEvent, button: HTMLButtonElement) {
    console.log(event.offsetX, event.offsetY)
    console.log(button.clientLeft, button.clientTop)
  }

  back() {

  }

}
