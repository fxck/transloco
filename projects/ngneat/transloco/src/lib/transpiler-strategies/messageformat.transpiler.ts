import { TranslocoTranspiler, DefaultTranspiler } from '../transloco.transpiler';
import { HashMap, Translation } from '../types';

import * as MessageFormat from 'messageformat';
import { isObject, set, getValue } from '../helpers';

const iterate = (obj: Object, cb: Function) => {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object') {
      iterate(obj[key], cb);
    } else {
      obj[key] = cb(obj[key]);
    }
  });

  return obj;
};

export class MessageFormatTranspiler implements TranslocoTranspiler {
  defaultTranspiler: DefaultTranspiler = new DefaultTranspiler();
  //@ts-ignore
  messageFormat: MessageFormat = new MessageFormat();

  transpile(value: string, params: HashMap = {}, translation: Translation): string | Translation {
    if (!value) {
      return value;
    }

    if (isObject(value)) {
      if (params) {
        Object.keys(params).forEach(p => {
          const v = getValue(value as Object, p);
          const transpiled = this.defaultTranspiler.transpile(v, params, translation);
          const message = this.messageFormat.compile(transpiled);
          set(value, p, message(params[p]));
        });
      }

      return value;
    } else {
      const transpiled = this.defaultTranspiler.transpile(value, params, translation);

      const message = this.messageFormat.compile(transpiled);
      return message(params);
    }
  }
}
