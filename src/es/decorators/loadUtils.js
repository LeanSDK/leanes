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

export default function loadUtils(Module) {
  assert(Module[cpoMetaObject] != null, 'Target for `loadUtils` decorator must be a Class');
  const {
    FsUtils
  } = Module.NS;
  assert(FsUtils != null, 'Target for `loadUtils` decorator should has FsUtilsAddon');
  const {
    Utils: { filesTreeSync }
  } = FsUtils.NS;

  (filesTreeSync: (string, ?object) => string[]);

  const vsRoot = Module.prototype.ROOT != null ? Module.prototype.ROOT : '.';
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
  Reflect.defineProperty(Module, cphUtilsMap, {
    enumerable: true,
    writable: true,
    value: utilsMap
  });

  return Module;
}
