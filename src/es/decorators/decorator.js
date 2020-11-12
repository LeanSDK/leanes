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

export default function decorator(target, key, descriptor) {
  assert(target.constructor[cpoMetaObject] != null, 'Target for `decorator` decorator must be a Module.prototype');
  assert(target.constructor.isExtensible, `Class '${target.constructor.name}' has been frozen previously. Decorator '${key}' can not be declared`);
  const newDescriptor = {
    configurable: false,
    enumerable: true,
    writable: false,
    value: (descriptor.value || descriptor.initializer())
  };
  Reflect.defineProperty(target.constructor.prototype, key, newDescriptor);
  target.constructor.metaObject.addMetaData('decorators', key, newDescriptor);
  return;
};
