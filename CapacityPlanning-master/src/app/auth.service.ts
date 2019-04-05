import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {
    }

    login(emailId: any, password: any) {
        // var token = jwt.sign({userID: emailId}, 'todo-app-super-shared-secret', {expiresIn: '2h'});
        return this.http.get('http://localhost:3000/users?id=' + emailId + '&password=' + password + '');
    }
    getMenuItem() {
        return this.http.get('http://localhost:3000/menuItems?_page=1');
    }
    firstComponenetGetService() {
        return this.http.get('http://localhost:3000/tableData?_page=1');
    }
    secondComponenetGetService() {
        return this.http.get('http://localhost:3000/tableData?_page=1');
    }
    thirdComponenetGetService() {
        return this.http.get('http://localhost:3000/tableData?_page=1');
    }    
}
