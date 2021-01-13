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
const cplExtensibles = Symbol.for('~isExtensible');
const cpsExtensibleSymbol = Symbol.for('~extensibleSymbol');

export default function meta(acTarget) {
  assert(acTarget[cpoMetaObject] != null, 'Target for `meta` decorator must be a Class');
  const { MetaObject } = acTarget.Module.prototype;
  const superclass = Reflect.getPrototypeOf(acTarget) || {};
  const parent = acTarget.metaObject || superclass.metaObject;
  Reflect.defineProperty(acTarget, cpoMetaObject, {
    enumerable: false,
    configurable: true,
    value: MetaObject.new(acTarget, parent)
  });
  Reflect.defineProperty(acTarget, cpsExtensibleSymbol, {
    enumerable: false,
    configurable: true,
    value: Symbol('extensibleSymbol')
  });
  acTarget[cplExtensibles][acTarget[cpsExtensibleSymbol]] = true;
  acTarget.onMetalize();

  return;
};
