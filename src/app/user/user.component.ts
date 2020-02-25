import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
import { FormBuilder, FormControl,FormGroup } from "@angular/forms";
import { ToastrService } from 'ngx-toastr'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { user } from "src/app/user/user.model";
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { TempService } from "src/app/temp.service";
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  errorMsg: any;
Spec:user[]=[]

  flag = true;
  User = [];
  type = "text";
  match: string;
  formData: any;
  firstName:string
  middleName:string
  lastName:string
  user_Name:string
  role_Id:string
  dep:string
  Reference_Name:string
  location:string
  email:any
  personal_Contact_Number:number
  work_Contact_Number:number
  description:string
  confirm_password:any
  password:any
  hint_question_1:any
  hint_answer_1:any
  hint_question_2:any
  hint_answer_2:any
  hintAnswer2:any
  qual:string
  UserForm1:FormGroup
  qualification:string
  constructor(private fb: FormBuilder, private _http: UserService,private modalService: NgbModal, private router: Router,private toastr: ToastrService,private temp: TempService) {

    // this.router.routeReuseStrategy.shouldReuseRoute = function(){
    //   return false;
    // }

    // this.router.events.subscribe((evt) => {
    //   if (evt instanceof NavigationEnd) {
    //      // trick the Router into believing it's last link wasn't previously loaded
    //      this.router.navigated = false;         
    //      // if you need to scroll back to top, here is the right place
    //      window.scrollTo(0, 0);
    //   }
    // });

    this.router.events.subscribe((evt) => {
      this.router.routeReuseStrategy.shouldReuseRoute = function (future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot) {
        if (future.url.toString() === 'user' && curr.url.toString() === future.url.toString()) {
          return false;
        }
        return (future.routeConfig === curr.routeConfig);
      };
    
  });
        this.UserForm = fb.group({
          
            'firstName':[null],
            'middleName':[null],
            'lastName':[null],
            'user_Name':[null],
            'role_Id':[null],
        'dep':[null],
        'Reference_Name':[null],
        'location':[null],
        'email':[null],
        'personal_Contact_Number':[null],
        'work_Contact_Number':[null],
        'description':[null],
        'qual':[null],
          'password':[null],
          'confirm_password':[null],
          'hint_question_1':[null],
          'hint_answer_1':[null],
          'hint_question_2':[null],
          'hint_answer_2':[null],
          'qualification':[null]
        });
        this.UserForm1 = fb.group({
          'specName':[null],
        });
    
}
titleName:any=[]
  ngOnInit() {
    this.titleName=this.temp.gettitles()
    this.getUserId()
 this.Spec[0]=new user()
  }
  submitted=false

  errors:string
  onSubmit(value: any) {
    // alert("User created sucessfully");
  // if(this.role_Id==='ADMIN')
  //   {
  //     this.Temp=[]
  this.submitted =true
 if(!this.UserForm.valid)
  {
    return
  }
  //   }
   if(this.middleName==null)
    [
      this.middleName=""
    ]

    let param = {

      // "user_Id": data.user_Id,
      "firstName": this.firstName,
      "middleName": this.middleName,
      "lastName": this.lastName,
      "userName": this.user_Name,
      "roleName": this.role_Id,
      "department":this.dep,
      "refName": this.Reference_Name,
      "location": this.location,
      "email": this.email,
      "personalContactNumber": this.personal_Contact_Number,
      "workContactNumber": this.work_Contact_Number,
      "description": this.description,
      "passwordStuff": {
        "password": this.password,
        "confirmPassword": this.confirm_password,
        "hintQuestion1": this.hint_question_1,
        "hintAnswer1": this.hint_answer_1,
        "hintQuestion2": this.hint_question_2,
        "hintAnswer2": this.hint_answer_2,

      },
      "doctorDetails":
      {
        "specilization":this.qual,
        "qualification":this.qualification 
      },
    
  //     "doctorSpecialization":
        
  //  this.Temp
  //  (selectionChange)="push(qual)"
        // {
        //   "spec":this.qual
        // }
       
        
      }
    
  
  
      this._http.postCreate(param)
        .subscribe(
          data => {
          // alert(data.status)
            // if(data.status === 500)
            //   {
            //     (err) =>{
            //       this.toastr.error(data.message)
            //     }
            //   }
 
            console.log("data**" + JSON.stringify(data));
         
          },
          (err) => {
            //  if(err.status==500)
            //   {
            //     this.toastr.error
            //   }
            this.toastr.error(err['error']?err['error'].message:'Error Occured!');//"Patient Already Created")
    
          },
        ()=>
        {
          // this.router.navigate(['/userreg'])
          this.toastr.success("user created sucessfully ")
          this.router.navigate(['/user'])
        } 
    
       
          );
    
  }   
  // reloadPage() { 
  //   this.router.navigate(["/user"]);
  // }
  open2(basic1) {
    
   this.modalService.open(basic1, {ariaLabelledBy: 'modal-basic-title',backdrop: 'static', keyboard: false}).result.then((result) => {
     this.closeResult = `Closed with: ${result}`;
   }, (reason) => {
     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   });
 }

 private getDismissReason(reason: any): string {
 
   if (reason === ModalDismissReasons.ESC) {
     return 'by pressing ESC';
   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
     return 'by clicking on a backdrop';
   } else {
     return  `with: ${reason}`;
   }
 
   
 }

 
  closeResult: string;
   UserForm: FormGroup;
 
 
  hideAnswer() {
    if (this.flag === true) {
      this.type = "password";
      this.flag = false;
    }
    else {
      this.type = "text";
      this.flag = true;
    }
  }
  checkConfirmPass(pass) {
    this.match = pass;
  }
  getUserId() {
    this._http.getUserId()
      .subscribe(
        response => {

          this.User = response;
          console.log("user" + JSON.stringify(response));
          console.log(this.User[1].nextUserId);
        });
  }
  // userForm=[FormGroup]

  // reset() {
  //  this..reset();
  //  }
  refresh() {

    location.reload();
}


specName:string
save()

{



let par = {
  
  "specName":this.specName
}
this._http.post(par)
 .subscribe(
 data => {

console.log("data**" + JSON.stringify(data));


  },

  (err)=>{
    this.toastr.error("error")
  },
  ()=>{
    this.toastr.success("Specilization registered  sucessfully ")
    location.reload()
   }
  
);



}
reset()
{
  this.submitted=false
  this.UserForm.reset()
}
Temp=[]
push()

{ 
  this.Temp=[]


  this.Temp.push({"spec":this.qual})
  console.log(this.Temp)
}


}






