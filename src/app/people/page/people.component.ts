import {
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, map, switchMap } from 'rxjs';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { Person } from '../people';
import { PeopleService } from '../service/people.service';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
})
export class PeopleComponent implements OnInit, OnDestroy {
  private readonly NEW_PERSON_INTERVAL_TIME = 5000;

  protected person = signal<Person | null>(null);

  private _person$ = new Subject();
  protected get person$(): Observable<Person> {
    return this._person$.pipe(
      switchMap(() =>
        this.peopleService
          .fetchRandomPerson()
          .pipe(map((response) => response.results[0]))
      )
    );
  }

  private _peopleInterval: NodeJS.Timeout | undefined;

  constructor(
    private peopleService: PeopleService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.person$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((randomPerson) => this.person.set(randomPerson));
    this._person$.next({});
    this._peopleInterval = this.nextPersonInterval();
  }

  ngOnDestroy(): void {
    clearInterval(this._peopleInterval);
  }

  protected nextPerson(): void {
    this.person.set(null);
    this._person$.next({});
    this.resetNextPersonInterval();
  }

  private nextPersonInterval(): NodeJS.Timeout {
    return setInterval(
      () => this._person$.next({}),
      this.NEW_PERSON_INTERVAL_TIME
    );
  }

  private resetNextPersonInterval(): void {
    clearInterval(this._peopleInterval);
    this._peopleInterval = this.nextPersonInterval();
  }
}
