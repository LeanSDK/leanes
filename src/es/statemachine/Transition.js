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

/*
Transition instances for StateMachine class

Inspiration:

- https://github.com/PureMVC/puremvc-js-util-statemachine
- https://github.com/aasm/aasm
*/

import type { TransitionInterface } from '../interfaces/TransitionInterface';

const splice = [].splice;

export default (Module) => {
  const {
    HookedObject,
    initialize, partOf, meta, property, method, nameBy,
  } = Module.NS;


  @initialize
  @partOf(Module)
  class Transition extends HookedObject implements TransitionInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property _guard: ?string = null;

    @property _if: ?string = null;

    @property _unless: ?string = null;

    @property _after: ?string = null;

    @property _success: ?string = null;

    @method async testGuard(...args): Promise<?any> {
      return (await this._doHook(this._guard, args, 'Specified "guard" not found', true));
    }

    @method async testIf(...args): Promise<?any> {
      return (await this._doHook(this._if, args, 'Specified "if" not found', true));
    }

    @method async testUnless(...args): Promise<?any> {
      return (await this._doHook(this._unless, args, 'Specified "unless" not found', false));
    }

    @method async doAfter(...args): Promise<?any> {
      return (await this._doHook(this._after, args, 'Specified "after" not found', args));
    }

    @method async doSuccess(...args): Promise<?any> {
      return (await this._doHook(this._success, args, 'Specified "success" not found', args));
    }

    constructor(name: string, anchor: object, ...args1) {
      let config, ref;
      ref = args1, [...args1] = ref, [config] = splice.call(args1, -1);
      if (config === void 0) {
        config = {};
      }
      super(... arguments);
      ({
        guard: this._guard,
        if: this._if,
        unless: this._unless,
        after: this._after,
        success: this._success
      } = config);
    }
  }
}
