import { Component, Input } from "@angular/core";
import * as screenfull from "screenfull";
import * as $ from "jquery";
import { Router } from "@angular/router";
// import Chart from '../../node_modules/chart.js/dist/Chart.js';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";

  isCompressFullScreen: boolean;
  isExpandFullScreen: boolean;

  app = {
    name: "Angulr",
    version: "2.2.0",
    color: {
      primary: "#7266ba",
      info: "#23b7e5",
      success: "#27c24c",
      warning: "#fad733",
      danger: "#f05050",
      light: "#e8eff0",
      dark: "#3a3f51",
      black: "#1c2b36"
    },
    settings: {
      themeID: 1,
      navbarHeaderColor: "bg-black",
      navbarCollapseColor: "bg-white-only",
      asideColor: "bg-black",
      headerFixed: true,
      asideFixed: false,
      asideFolded: false,
      asideDock: false,
      container: false
    }
  };

  constructor(private router: Router) {}

  ngOnInit() {}
  expandFullScreen() {
    if (screenfull.enabled) {
      this.isExpandFullScreen = false;
      this.isCompressFullScreen = true;
      screenfull.toggle();
    }
  }

  compressFullScreen() {
    if (screenfull.enabled) {
      this.isExpandFullScreen = true;
      this.isCompressFullScreen = false;
      screenfull.toggle();
    }
  }

  dashboardv1() {
    this.router.navigate(["/dashboard"]);
    this.app.settings.asideFolded = false;
    this.app.settings.asideDock = false;
  }

  dashboardv2() {
    this.router.navigate(["/dashboardv2"]);
    this.app.settings.asideFolded = true;
    this.app.settings.asideDock = true;
  }
}
