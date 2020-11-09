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
const cphUtilsMap = Symbol.for('~utilsMap');

export default function loadUtils({ filesTreeSync }) {
  (filesTreeSync: (string, ?object) => string[]);
  return target => {
    assert(target[cpoMetaObject] != null, 'Target for `loadUtils` decorator must be a Class');
    const vsRoot = target.prototype.ROOT != null ? target.prototype.ROOT : '.';
    const vsUtilsDir = `${vsRoot}/utils`;
    const files = filesTreeSync(vsUtilsDir, {
      filesOnly: true
    });
    const utilsMap = (files != null ? files : []).reduce((up, i) => {
      const vsPathMatch = i.match(/([\w\-\_]+)\.js$/);
      const [blackhole, utilName] = vsPathMatch != null ? vsPathMatch : [];
      if (utilName != null && !/^\./.test(i)) {
        up[utilName] = `${vsUtilsDir}/${i.replace(/\.js/, '')}`;
      }
      return up;
    }, {});
    Reflect.defineProperty(target, cphUtilsMap, {
      enumerable: true,
      writable: true,
      value: utilsMap
    });
    return target;
  }
};
