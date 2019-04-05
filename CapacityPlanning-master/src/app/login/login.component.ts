import { AuthService } from './../auth.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as crypto from 'crypto-js';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string; password: string; response: any;
  header = { "alg": "HS256", "typ": "JWT" }; data = {
    "id": 1,
    "username": "Koushik Kasetty",
    "expiresIn": '2h'
  };
  secret = "My very confidential secret!!!";
  stringifiedHeader: any; encodedHeader: any; stringifiedData: any; encodedData: any;
  signature: any;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    console.log(this.username + " : " + this.password);
    this.authService.login(this.username, this.password).subscribe(
      res => {
        this.response = res;
        try {
          if (this.response.length > 0) {
            console.log(JSON.stringify(this.response));
            var result = this.encodeToJWT();
            if (result) {
              localStorage.setItem('currentUser', JSON.stringify(this.username));
              localStorage.setItem('token', JSON.stringify(result));
              this.router.navigateByUrl('maincontent');
            }
            else
              this.router.navigateByUrl('maincontent');
          }
          else
            alert(' please provide valid username / password');
        } catch (error) {
          console.log(error);
        }
      }, err => {
        console.log(err);
      }
    )
  }
  encodeToJWT() {

    this.stringifiedHeader = crypto.enc.Utf8.parse(JSON.stringify(this.header));
    this.encodedHeader = this.base64url(this.stringifiedHeader);

    this.stringifiedData = crypto.enc.Utf8.parse(JSON.stringify(this.data));
    this.encodedData = this.base64url(this.stringifiedData);

    this.signature = this.encodedHeader + "." + this.encodedData;
    this.signature = crypto.HmacSHA256(this.signature, this.secret);
    this.signature = this.base64url(this.signature);
    console.log(this.encodedHeader + "." + this.encodedData + "." + this.signature);
    return this.encodedHeader + "." + this.encodedData + "." + this.signature;
  }

  base64url(source) {
    // Encode in classical base64
    var encodedSource = "";
    encodedSource = crypto.enc.Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
  }


}