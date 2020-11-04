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
import type { NotificationInterface } from '../../patternes';
import type { ContextInterface } from '../interfaces/ContextInterface';
import type { ResourceInterface } from '../interfaces/ResourceInterface';
import type {
  LegacyResponseInterface, AxiosResponse, Config
} from '../types/RequestT';

export default (Module) => {
  const {
    APPLICATION_SWITCH,
    HANDLER_RESULT, SCRIPT_RESULT,
    STOPPED_MIGRATE, STOPPED_ROLLBACK, MIGRATE, ROLLBACK,
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
        interests.push(HANDLER_RESULT);
        interests.push(SCRIPT_RESULT);
        interests.push(STOPPED_MIGRATE);
        interests.push(STOPPED_ROLLBACK);
        return interests;
      }

      @method handleNotification(aoNotification: NotificationInterface): void {
        const vsName = aoNotification.getName();
        const voBody = aoNotification.getBody();
        const vsType = aoNotification.getType();
        switch (vsName) {
          case HANDLER_RESULT:
          case STOPPED_MIGRATE:
          case STOPPED_ROLLBACK:
          case SCRIPT_RESULT:
            this.emitter.emit(vsType, voBody);
            break;
          default:
            super.handleNotification(aoNotification);
        }
      }

      @method async migrate(opts: ?{|until: ?string|}): Promise<void> {
        return await new Promise((resolve, reject) => {
          // resolve('async migrate(opts)');
          try {
            const reverse = genRandomAlphaNumbers(32);
            this.emitter.once(reverse, ({ error }) => {
              if (error != null) {
                reject(error);
                return;
              }
              resolve();
            });
            this.send(MIGRATE, opts, reverse);
          } catch (err) {
            reject(err);
          }
        });
      }

      @method async rollback(opts: ?{|steps: ?number, until: ?string|}): Promise<void> {
        return await new Promise((resolve, reject) => {
          // resolve();
          try {
            const reverse = genRandomAlphaNumbers(32);
            this.emitter.once(reverse, ({ error }) => {
              if (error != null) {
                reject(error);
                return;
              }
              resolve();
            });
            this.send(ROLLBACK, opts, reverse);
          } catch (err) {
            reject(err);
          }
        });
      }

      @method async run(scriptName: string, data?: any): Promise<?any> {
        return await new Promise((resolve, reject) => {
          // resolve();
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

      @method async execute<
        T = any, R = Promise<{|result: T, resource: ResourceInterface|}>
      >(resourceName: string, opts: {
        context: ContextInterface,
        reverse: string
      }, action: string): Promise<R> {
        const { context, reverse } = opts;
        return await new Promise((resolve, reject) => {
          // resolve();
          try {
            this.emitter.once(reverse, ({ error, result, resource }) => {
              if (error != null) {
                reject(error);
                return;
              }
              resolve({ result, resource });
            });
            this.send(resourceName, { context, reverse }, action, null);
          } catch (err) {
            reject(err);
          }
        });
      }

      @method async perform<
        T = any, R = T, L = LegacyResponseInterface<AxiosResponse<T, R>>
      >(methodName: string, url: string, options: Config<T, R>): Promise<?L> {
        const appSwitch = this.facade.getMediator(APPLICATION_SWITCH);
        if (appSwitch != null) {
          return await appSwitch.perform<T, R, L>(methodName, url, options);
        }
      }

      constructor() {
        super(... arguments);
        this.emitter = new EventEmitter();
      }
    }
    return Mixin;
  });
}
