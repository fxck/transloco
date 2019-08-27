import { TranslocoTranspiler, DefaultTranspiler } from '../transloco.transpiler';
import { HashMap, Translation } from '../types';

import * as MessageFormat from 'messageformat';
import { isString, isObject } from '../helpers';

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

    const transpiled = this.defaultTranspiler.transpile(value, params, translation);

    if (isObject(value)) {
      const transpiledObject = iterate(value, (a: string) => {
        const message = this.messageFormat.compile(a);
        return message(params);
      });

      return transpiledObject;
    } else {
      const message = this.messageFormat.compile(transpiled);
      return message(params);
    }
  }
}
