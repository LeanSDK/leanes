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
const cphPathMap = Symbol.for('~pathMap');
const cphFilesList = Symbol.for('~filesList');

export default function loadFiles({ filesTreeSync }) {
  (filesTreeSync: (string, ?object) => string[]);
  return target => {
    assert(target[cpoMetaObject] != null, 'Target for `loadFiles` decorator must be a Class');
    const vsRoot = target.prototype.ROOT != null ? target.prototype.ROOT : '.';
    const files = filesTreeSync(vsRoot, {
      filesOnly: true
    });
    const [ pathMap, filesList ] = (files != null ? files : []).reduce(([cp, fp], i) => {
      if (/\.[.]+$/.test(i) && !/^\./.test(i)) {
        fp.push(i);
      }
      const vsPathMatch = i.match(/([\w\-\_]+)\.js$/);
      const [blackhole, fileName] = vsPathMatch != null ? vsPathMatch : [];
      if (fileName != null && !/^\./.test(i)) {
        cp[fileName] = `${vsRoot}/${i.replace(/\.js/, '')}`;
      }
      return [cp, fp];
    }, [{}, []]);
    Reflect.defineProperty(target, cphPathMap, {
      enumerable: true,
      writable: true,
      value: pathMap
    });
    Reflect.defineProperty(target, cphFilesList, {
      enumerable: true,
      writable: true,
      value: filesList
    });
    return target;
  }
};
