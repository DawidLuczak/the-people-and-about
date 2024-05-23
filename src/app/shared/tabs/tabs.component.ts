import { NgClass } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { Route } from '@angular/router';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  tabs = input.required<Route[]>();

  activeTabIndex = model.required<number>();
}
