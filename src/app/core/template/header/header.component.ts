import { Component, Input, OnInit } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TabMenuModule,
    AvatarModule,
    ButtonModule,
    BreadcrumbModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Input() items!: MenuItem[];

  username!: string | undefined;

  initialsName!: string;

  constructor() {}

  ngOnInit(): void {
    this.getUserPrincipal();
    this.initialsName = 'RC';
  }

  async getUserPrincipal() {
    this.username = 'Usuário';
    this.getInitials(this.username);
  }

  getInitials(fullName: string) {
    let initials = '';
    if (fullName) {
      const namesArray = fullName.split(' ');
      if (namesArray.length > 0) {
        initials += namesArray[0].charAt(0);
      }
      if (namesArray.length > 1) {
        initials += namesArray[namesArray.length - 1].charAt(0);
      }
    }
    this.initialsName = initials.toUpperCase();
  }
}
