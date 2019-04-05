import { NavItem } from '../nav-items';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';


@Component({
  selector: 'app-menu-item',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  @Input() items: NavItem[];
  navItems: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getMenuItem().subscribe(
      data => {
        this.navItems = data;
        console.log(this.navItems.length+ ": nav items length");
       /* alert(this.navItems.length+ ": nav items length");
        alert( " child nav items length "+this.navItems[0].children.length )*/
      }, error => {
        console.log(JSON.stringify(error) + "error");
      })
  }


}
