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

import _ from 'lodash';
import assert from 'assert';

const cpoMetaObject = Symbol.for('~metaObject');

export default function patch(...alPatches) {
  return target => {
    assert(target[cpoMetaObject] != null, 'Target for `patch` decorator must be a Class');
    assert(target.Module !== target, 'Target for `patch` decorator can not be a Module or its subclass');
    const vlPatches = _.castArray(alPatches);
    vlPatches.forEach((vmPatch) => {
      assert(vmPatch != null, 'Supplied patch was not found');
      assert(_.isFunction(vmPatch), 'Patch must be a function');

      const SuperClass = Reflect.getPrototypeOf(target);
      const Patch = vmPatch(SuperClass);
      Reflect.defineProperty(Patch, 'name', {
        value: vmPatch.name
      })

      Reflect.setPrototypeOf(target, Patch);
      Reflect.setPrototypeOf(target.prototype, Patch.prototype);

      target.metaObject.parent = Patch.metaObject;
      target.metaObject.addMetaData('applyedPatches', Patch.name, Patch);
      (typeof Patch.including === 'function') && Patch.including.call(target);
      return target;
    });
  };
}
