import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule,
    BrowserModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    SidebarModule,
    ToolbarModule,
  ],
  exports: [HeaderComponent,FooterComponent],
  providers: [],
})
export class AppCommonModule { }
