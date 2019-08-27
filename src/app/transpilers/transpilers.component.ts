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
          peopleCount: '1',
          projectCount: '1'
        })
        .subscribe(console.log);
    }, 100);
  }

  changeParam() {
    this.dynamic = this.dynamic === '🦄' ? '🦄🦄🦄' : '🦄';
  }
}
