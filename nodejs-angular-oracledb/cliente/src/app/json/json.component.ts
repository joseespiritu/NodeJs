import { Component, OnInit } from '@angular/core';
import { ApiDataService } from "../api-data.service";

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css']
})
export class JsonComponent implements OnInit {

  constructor(private _api: ApiDataService) { }

  public allPerson:any;
  private data: any;

  ngOnInit() {


    return this._api.getJson().subscribe((response) => {
      console.log(response);
      this.data = response;
      this.allPerson = this.data.personas;
      console.log(this.allPerson);
    })
  }

}
