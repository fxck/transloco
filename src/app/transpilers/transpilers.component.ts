import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-transpilers',
  templateUrl: './transpilers.component.html',
  styleUrls: ['./transpilers.component.css']
})
export class TranspilersComponent {
  dynamic = '🦄';
  key = 'home';
  userGender = 'female';

  constructor(private _translocoService: TranslocoService) {
    setTimeout(() => {
      this._translocoService
        .selectTranslate('mf.nested', {
          people: { count: '1' },
          'moreNesting.projects': { count: '1' }
        })
        .subscribe(console.log);
    }, 1000);
  }
  changeParam() {
    this.dynamic = this.dynamic === '🦄' ? '🦄🦄🦄' : '🦄';
  }
}
