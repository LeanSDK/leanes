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

import assign from './utils/assign';

const hasProp = {}.hasOwnProperty;

let _class = null;

export default (NS) => {
  if (_class !== null) {
    return _class;
  }

  const iphData = Symbol.for('~data');
  const ipoParent = Symbol.for('~parent');
  const ipoTarget = Symbol.for('~target');

  class MetaObject {
    static new(...args) {
      return Reflect.construct(this, args);
    }

    get data() {
      return this[iphData];
    }

    get parent() {
      return this[ipoParent];
    }
    set parent(newParent) {
      this[ipoParent] = newParent;
      return newParent;
    }

    get target() {
      return this[ipoTarget];
    }

    addMetaData(asGroup, asKey, ahMetaData) {
      const base = this[iphData];
      if (base[asGroup] == null) {
        base[asGroup] = {};
      }
      Reflect.defineProperty(base[asGroup], asKey, {
        configurable: true,
        enumerable: true,
        value: ahMetaData
      });
    }

    mergeMetaData(asGroup, asKey, ahMetaData) {
      const base = this[iphData];
      if (base[asGroup] == null) {
        base[asGroup] = {};
      }
      const hash = base[asGroup][asKey];
      if (hash != null) {
        const newHash = assign({}, hash, ahMetaData);
        for (const key in newHash) {
          if (!hasProp.call(newHash, key)) continue;
          hash[key] = newHash[key];
        }
      } else {
        Reflect.defineProperty(base[asGroup], asKey, {
          configurable: true,
          enumerable: true,
          value: assign({}, ahMetaData)
        });
      }
    }

    appendMetaData(asGroup, asKey, ahMetaData) {
      const base = this[iphData];
      if (base[asGroup] == null) {
        base[asGroup] = {};
      }
      const list = base[asGroup][asKey];
      if (list != null) {
        list.push(ahMetaData);
      } else {
        Reflect.defineProperty(base[asGroup], asKey, {
          configurable: true,
          enumerable: true,
          value: [ahMetaData]
        });
      }
    }

    removeMetaData(asGroup, asKey) {
      if (this[iphData][asGroup] != null) {
        Reflect.deleteProperty(this[iphData][asGroup], asKey);
      }
    }

    collectGroup(asGroup, collector = []) {
      const parent = this[ipoParent];
      const parentCollector = parent && typeof parent.collectGroup === "function" && parent.collectGroup(asGroup, collector);
      collector = collector.concat(parentCollector ? parentCollector : []);
      const group = this[iphData][asGroup];
      collector.push(group != null ? group : {});
      return collector;
    }

    getGroup(asGroup, abDeep = true) {
      const assign = abDeep ? NS.prototype.assign : Object.assign;
      const vhGroup = assign({}, ...(this.collectGroup(asGroup)));
      return vhGroup;
    }

    getOwnGroup(asGroup) {
      const group = this[iphData][asGroup];
      // return group != null ? group : {};
      return group || {};
    }

    constructor(target, parent) {
      this[ipoTarget] = target;
      this[ipoParent] = parent;
      this[iphData] = {};
      const data = parent != null ? parent.data : undefined;
      if (data !== undefined) {
        for (const key in data) {
          if (!hasProp.call(data, key)) continue;
          this[iphData][key] = {};
        }
      }
    }
  }

  Reflect.defineProperty(MetaObject, 'name', {get: ()=> 'MetaObject'});
  _class = MetaObject;
  return MetaObject;
}
