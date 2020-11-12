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

export default function property(target, key, descriptor) {
  const isClass = target[cpoMetaObject] != null;
  const vcClass = isClass ? target : target.constructor;
  const stringifyedKey = _.isSymbol(key)
    ? Symbol.keyFor(key)
    : key;
  assert(vcClass.isExtensible, `Class '${vcClass.name}' has been frozen previously. Property '${stringifyedKey}' can not be declared`);
  if (isClass) {
    vcClass.metaObject.mergeMetaData('classVariables', key, descriptor);
  } else {
    vcClass.metaObject.mergeMetaData('instanceVariables', key, descriptor);
  }
  return descriptor;
};
