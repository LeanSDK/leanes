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

export default function instanceOf(x, Type) {
  if (x == null) {
    return false;
  }
  switch (Type) {
    case String:
      return _.isString(x);
    case Number:
      return _.isNumber(x);
    case Boolean:
      return _.isBoolean(x);
    case Array:
      return _.isArray(x);
    case Object:
      return _.isPlainObject(x);
    case Date:
      return _.isDate(x);
    default:
      return (function(a) {
        while (a = a.__proto__) {
          if (a === Type.prototype) {
            return true;
          }
        }
        return false;
      })(x);
  }
}
