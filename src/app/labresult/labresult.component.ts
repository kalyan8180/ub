import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-labresult',
  templateUrl: './labresult.component.html',
  styleUrls: ['./labresult.component.css']
})
export class LabresultComponent implements OnInit {
  LabResultForm:FormGroup
  constructor() { }

  ngOnInit() {
  }

}
