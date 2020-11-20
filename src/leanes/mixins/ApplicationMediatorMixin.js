// This file is part of LeanES.
//
// LeanES is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// LeanES is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with LeanES.  If not, see <https://www.gnu.org/licenses/>.

import EventEmitter from 'events';
import type { NotificationInterface } from '../../puremvc';
import type {
  LegacyResponseInterface, AxiosResponse, Config
} from '../types/RequestT';

export default (Module) => {
  const {
    SCRIPT_RESULT,
    initializeMixin, meta, property, method,
    Utils: { genRandomAlphaNumbers }
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @property emitter: EventEmitter = null;

      @method listNotificationInterests(...args): string[] {
        const interests = super.listNotificationInterests(...args);
        interests.push(SCRIPT_RESULT);
        return interests;
      }

      @method handleNotification<T = ?any>(aoNotification: NotificationInterface<T>): ?Promise<void> {
        const vsName = aoNotification.getName();
        const voBody = aoNotification.getBody();
        const vsType = aoNotification.getType();
        switch (vsName) {
          case SCRIPT_RESULT:
            this.emitter.emit(vsType, voBody);
            break;
          default:
            super.handleNotification(aoNotification);
        }
      }

      @method async run<T = ?any>(scriptName: string, data: T): Promise<?any> {
        return await new Promise((resolve, reject) => {
          try {
            const reverse = genRandomAlphaNumbers(32);
            this.emitter.once(reverse, ({ error, result }) => {
              if (error != null) {
                reject(error);
                return;
              }
              resolve(result);
            });
            this.send(scriptName, data, reverse);
          } catch (err) {
            reject(err);
          }
        });
      }

      constructor() {
        super(... arguments);
        this.emitter = new EventEmitter();
      }
    }
    return Mixin;
  });
}
