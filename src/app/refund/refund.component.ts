import { Component, OnInit } from "@angular/core";
import { RefundService } from "src/app/refund/refund.service";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-refund",
  templateUrl: "./refund.component.html",
  styleUrls: ["./refund.component.css"]
})
export class RefundComponent implements OnInit {
  RefDet = [];
  closeResult: string;
  count: string = "2";
  constructor(private _http: RefundService, private modalService: NgbModal) {}

  ngOnInit() {
    this.showCount();
  }
  showReports(basic2) {
    this.modalService
      .open(basic2, { ariaLabelledBy: "modal-basic-title",backdrop: 'static', keyboard: false })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  showCount() {
    this._http
      .getAll(this.count)

      .subscribe(response => {
        this.RefDet = response;
        console.log("RefDet" + JSON.stringify(response));
      });
  }
  Bills = [];
  showPdf(data) {
    this._http.getPdf(data.billNo).subscribe(response => {
      this.Bills = response;
      console.log(this.Bills);
      console.log(response);
    });
  }
}