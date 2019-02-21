import { Component } from '@angular/core';

import * as iconv from 'iconv-lite';
import { Buffer as buffer } from 'buffer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /** 入力値 */
  public input: string = '';
  // iconv 内部でうまく処理される
  public codecs: string[] = [
    'ISO-8859-1',
    'Shift-JIS',
    'EUC-JP',
    'UTF-8',
    'UTF-16',
    'Base64'
  ];
  /** 結果の配列 */
  public results: any[] = this.codecs.reduce((prev, encoding) => {
    return prev.concat(this.codecs.map((decoding) => {
      return { encoding, decoding };
    }));
  }, []);
  
  /** 変換ボタン押下時 */
  public onSubmit(): void {
    this.results.forEach((result) => {
      const encoded = iconv.encode(this.input, result.encoding);
      const decoded = iconv.decode(buffer.from(encoded), result.decoding);
      result.result = decoded;
    });
  }
}
