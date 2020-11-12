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

export default function mixin(...alMixins) {
  return target => {
    assert(target[cpoMetaObject] != null, 'Target for `mixin` decorator must be a Class');
    const vlMixins = _.castArray(alMixins);
    vlMixins.forEach((vmMixin) => {
      assert(vmMixin != null, 'Supplied mixin was not found');
      assert(_.isFunction(vmMixin), 'Mixin must be a function');

      const SuperClass = Reflect.getPrototypeOf(target);
      const Mixin = vmMixin(SuperClass);
      Reflect.defineProperty(Mixin, 'name', {
        value: vmMixin.name
      })

      Reflect.setPrototypeOf(target, Mixin);
      Reflect.setPrototypeOf(target.prototype, Mixin.prototype);

      target.metaObject.parent = Mixin.metaObject;
      target.metaObject.addMetaData('applyedMixins', Mixin.name, Mixin);
      (typeof Mixin.including === 'function') && Mixin.including.call(target);
    });
    return target;
  };
}
