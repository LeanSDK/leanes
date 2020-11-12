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
const slice = [].slice;

export default function nameBy(target, key, descriptor) {
  const filename = descriptor.value || descriptor.initializer && descriptor.initializer();
  assert(filename != null, 'Value must be __filename');
  assert(target[cpoMetaObject] != null, 'Target for `nameBy` decorator must be a Class');
  const [ classname ] = slice.call(filename.split('/'), -1)[0].split('.');
  Reflect.defineProperty(target, 'name', {get: () => classname});
  return descriptor;
};
