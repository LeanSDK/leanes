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

import type { HookedObjectInterface } from '../interfaces/HookedObjectInterface';

export default (Module) => {
  const {
    CoreObject,
    initialize, partOf, meta, property, method, nameBy,
    Utils: { _ }
  } = Module.NS;


  @initialize
  @partOf(Module)
  class HookedObject extends CoreObject implements HookedObjectInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property name: string = null;

    @property _anchor: object = null;

    @method async _doHook(asHook, alArguments, asErrorMessage, aDefaultValue): Promise<?any> {
      const anchor = this._anchor || this;
      if (asHook != null) {
        if (_.isFunction(anchor[asHook])) {
          return await anchor[asHook](...alArguments);
        } else if (_.isString(anchor[asHook])) {
          return (typeof anchor.emit === "function" ? await anchor.emit(anchor[asHook], ...alArguments) : undefined);
        } else {
          throw new Error(asErrorMessage);
        }
      } else {
        return await aDefaultValue;
      }
    }

    constructor(name: string, anchor: ?object) {
      super(... arguments);
      this.name = name;
      if (anchor != null) {
        this._anchor = anchor;
      }
    }
  }
}
