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

export default function machine(
  first: (string | Function),
  last: ?Function
) {
  const key = _.isFunction(first)
    ? 'default'
    : first;
  const functor = last || first;
  return target => {
    assert(target[cpoMetaObject] != null, 'Target for `machine` decorator must be a Class');
    assert(target.isExtensible, `Class '${target.name}' has been frozen previously. StateMachine '${key}' can not be declared`);
    target.metaObject.addMetaData('stateMachines', key, functor);
    return target;
  };
}
