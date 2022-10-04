import { Component, OnInit } from '@angular/core'
import { SimonService } from './simon.service'


@Component({
  selector: 'fs-simon',
  templateUrl: './simon.component.html',
  styleUrls: ['./simon.component.scss']
})
export class SimonComponent implements OnInit {


  constructor(public game: SimonService) {
  }

  ngOnInit(): void {
  }

}
