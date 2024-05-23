import { CommonModule } from '@angular/common';
import { Component, DestroyRef, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { tabRoutes } from './app.routes';
import { TabsComponent } from './shared/tabs/tabs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TabsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly TABS = tabRoutes;

  protected activeTabIndex = signal<number>(0);

  constructor(private router: Router, private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.setActiveTabIndex(event.urlAfterRedirects);
        }
      });
  }

  protected navigateTo(tabIndex: number): void {
    const activeTab = this.TABS[tabIndex];
    if (!activeTab?.path) return;

    this.router.navigate([activeTab.path]);
  }

  private setActiveTabIndex(currentUrl: string): void {
    const index = this.TABS.findIndex(
      (tab) => currentUrl.slice(1) === tab.path
    );
    if (index < 0) return;

    this.activeTabIndex.set(index);
  }
}
