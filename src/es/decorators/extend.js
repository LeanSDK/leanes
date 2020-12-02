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

export default function extend(mixinName, className) {
  return Module => {
    assert(Module[cpoMetaObject] != null, 'Target for `extend` decorator must be a Class');
    assert(Module.Module === Module, 'Target for `extend` decorator should be a Module or its subclass');
    const { Proto, meta } = Module.NS;
    // const vlMixins = _.castArray(alMixins);
    const vmMixin = Module.NS[mixinName];
    const target = Module.NS[className];
    const vmWrapper = (BaseClass) => {
      class Wrapper extends BaseClass {
        @meta static object = {};
      }
      return Wrapper;
    }

    // let extended;

    // vlMixins.forEach((vmMixin) => {
    assert(vmMixin != null, 'Supplied mixin was not found');
    assert(_.isFunction(vmMixin), 'Mixin must be a function');
    // if (target.patches[vmMixin.name] != null) return;

    // const SuperClass = Reflect.getPrototypeOf(target);
    const extended = vmMixin(extended || target);
    Reflect.defineProperty(extended, 'name', {
      value: vmMixin.name
    })
    Reflect.defineProperty(extended, 'Module', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: Module
    });
    extended.constructor = Proto;

    // Reflect.setPrototypeOf(target, Patch);
    // Reflect.setPrototypeOf(target.prototype, Patch.prototype);

    // target.metaObject.parent = Patch.metaObject;
    extended.metaObject.addMetaData('applyedMixins', extended.name, extended);
    (typeof extended.including === 'function') && extended.including.call(extended);
    // target.metaObject.addMetaData('applyedPatches', Patch.name, Patch);
    // (typeof Patch.including === 'function') && Patch.including.call(target);
    // });

    const Wrapped = vmWrapper(extended || target);
    Reflect.defineProperty(Wrapped, 'name', {
      value: target.name
    })
    Wrapped.metaObject.parent = target.metaObject;
    Reflect.defineProperty(Module.prototype, Wrapped.name, {
      configurable: false,
      enumerable: true,
      writable: false,
      value: Wrapped
    });
    Module.metaObject.addMetaData('constants', Wrapped.name, Wrapped);
    return Module;
  };
}
