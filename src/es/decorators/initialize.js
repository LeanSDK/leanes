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

import assert from 'assert';

const cpoMetaObject = Symbol.for('~metaObject');

export default function initialize(acTarget) {
  assert(acTarget[cpoMetaObject] != null, 'Target for `initialize` decorator must be a Class');
  const { Proto, meta } = acTarget.Module.NS;
  acTarget.constructor = Proto;

  const vmWrapper = (BaseClass) => {
    class Wrapper extends BaseClass {
      @meta static object = {};
    }
    return Wrapper;
  }

  let Wrapped = null;

  if (acTarget.Module !== acTarget || acTarget.name === 'Module') {
    assert(acTarget.Module.isExtensible, `Module '${acTarget.Module.name}' has been frozen previously. Constant '${acTarget.name}' can not be declared`);

    Wrapped = vmWrapper(acTarget);
    Reflect.defineProperty(Wrapped, 'name', {
      value: acTarget.name
    })
    Wrapped.metaObject.parent = acTarget.metaObject;

    Reflect.defineProperty(acTarget.Module.prototype, Wrapped.name, {
      configurable: false,
      enumerable: true,
      writable: false,
      value: Wrapped
    });
    acTarget.Module.metaObject.addMetaData('constants', Wrapped.name, Wrapped);
  } else if (acTarget.Module === acTarget) {
    Reflect.defineProperty(acTarget.prototype, acTarget.name, {
      configurable: false,
      enumerable: true,
      writable: false,
      value: acTarget
    });
    acTarget.metaObject.addMetaData('constants', acTarget.name, acTarget);
  }

  acTarget.onInitialize();
  return Wrapped || acTarget;
};
