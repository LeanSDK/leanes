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

// const indexOf = [].indexOf;
const slice = [].slice;
const hasProp = {}.hasOwnProperty;

let _class = null;

import CoreObjectTF from './CoreObject';

export default (NS) => {
  if (_class !== null) {
    return _class;
  }

  const {
    PRODUCTION, DEVELOPMENT, MODULE,
    MetaObject,
    _, inflect, assert, meta, nameBy,
  } = NS.prototype;

  const CoreObject = CoreObjectTF(NS);

  const cphFilesList = Symbol.for('~filesList');
  const cphTemplatesList = Symbol.for('~templatesList');
  const cphMigrationsMap = Symbol.for('~migrationsMap');
  const cphUtilsMap = Symbol.for('~utilsMap');
  const cpoUtils = Symbol.for('~utils');
  // const cpoUtilsMeta = Symbol.for('~utilsMeta');
  const cpmUtilsHandler = Symbol.for('~utilsHandler');
  const cpmHandler = Symbol.for('~handler');
  const cphPathMap = Symbol.for('~pathMap');
  const cpoNamespace = Symbol.for('~namespace');

  class Module extends CoreObject {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    static MODULE = MODULE;

    static new() {
      assert.fail('new method unsupported for Module');
    }

    static resolve(name) {
      return [[], true];
    }

    static require(path) {
      return null;
    }

    static get constants() {
      return this.metaObject.getGroup('constants', false);
    }

    static get utilities() {
      return this.metaObject.getGroup('utilities', false);
      // return this[cpoUtilsMeta] != null ? this[cpoUtilsMeta] : this[cpoUtilsMeta] = this.metaObject.getGroup('utilities', false);
    }

    static get decorators() {
      return this.metaObject.getGroup('decorators', false);
    }

    static get mixins() {
      return this.metaObject.getGroup('mixins', false);
    }

    static get plugins() {
      return this.metaObject.getGroup('plugins', false);
    }

    static get patches() {
      return this.metaObject.getGroup('patches', false);
    }

    static get environment() {
      return this.Module.prototype.ENV;
    }

    static defineMixin(...args) {
      assert(args.length > 0, 'defineMixin() method required two arguments');

      const [ filename, vmFunction ] = args;
      const [ mixinName ] = slice.call(filename.split('/'), -1)[0].split('.');

      Reflect.defineProperty(vmFunction, 'name', {
        configurable: false,
        enumerable: true,
        writable: false,
        value: mixinName
      });
      this.metaObject.addMetaData('constants', mixinName, vmFunction);
      Reflect.defineProperty(this.prototype, mixinName, {
        configurable: false,
        enumerable: true,
        writable: false,
        value: vmFunction
      });
      this.metaObject.addMetaData('mixins', mixinName, vmFunction);
      return vmFunction;
    }

    static definePatch(...args) {
      assert(args.length > 0, 'definePatch() method required two arguments');

      const [ filename, vmFunction ] = args;
      const [ patchName ] = slice.call(filename.split('/'), -1)[0].split('.');

      Reflect.defineProperty(vmFunction, 'name', {
        configurable: false,
        enumerable: true,
        writable: false,
        value: patchName
      });
      this.metaObject.addMetaData('constants', patchName, vmFunction);
      Reflect.defineProperty(this.prototype, patchName, {
        configurable: false,
        enumerable: true,
        writable: false,
        value: vmFunction
      });
      this.metaObject.addMetaData('patches', patchName, vmFunction);
      return vmFunction;
    }

    static defineUtil(filename, vmFunction) {
      const [ utilName ] = slice.call(filename.split('/'), -1)[0].split('.');

      Reflect.defineProperty(vmFunction, 'name', {
        configurable: false,
        enumerable: true,
        writable: false,
        value: utilName
      });
      Reflect.defineProperty(this.prototype, utilName, {
        configurable: false,
        enumerable: true,
        writable: false,
        value: vmFunction
      });
      this.metaObject.addMetaData('utilities', utilName, vmFunction);
      return vmFunction;
    }

    // static set Utils(ahConfig) {
    //   for (const vsKey in ahConfig) {
    //     if (!hasProp.call(ahConfig, vsKey)) continue;
    //     const vValue = ahConfig[vsKey];
    //     if (!this.Module[vsKey]) {
    //       this.metaObject.addMetaData('utilities', vsKey, vValue);
    //       Reflect.defineProperty(this, vsKey, {
    //         configurable: false,
    //         enumerable: true,
    //         writable: false,
    //         value: vValue
    //       });
    //     }
    //   }
    // }

    get Utils() {
      const MClass = this.constructor;
      return MClass[cpoUtils] != null ? MClass[cpoUtils] : MClass[cpoUtils] = new Proxy(MClass, MClass[cpmUtilsHandler]);
    }

    static get NS() {
      const MClass = this;
      return MClass[cpoNamespace] != null ? MClass[cpoNamespace] : MClass[cpoNamespace] = new Proxy(MClass, MClass[cpmHandler]);
    }

    constructor() {
      super()
      if (this instanceof Module) {
        assert.fail('new operator unsupported');
      }
    }
  };


  Reflect.defineProperty(Module, cphFilesList, {
    enumerable: true,
    writable: true,
    value: null
  });

  Reflect.defineProperty(Module, cphTemplatesList, {
    enumerable: true,
    writable: true,
    value: null
  });

  Reflect.defineProperty(Module, cphMigrationsMap, {
    enumerable: true,
    writable: true,
    value: null
  });

  Reflect.defineProperty(Module, cphUtilsMap, {
    enumerable: true,
    writable: true,
    value: null
  });

  Reflect.defineProperty(Module, cpoUtils, {
    enumerable: true,
    writable: true,
    value: null
  });

  // Reflect.defineProperty(Module, cpoUtilsMeta, {
  //   enumerable: true,
  //   writable: true,
  //   value: null
  // });

  Reflect.defineProperty(Module, cphPathMap, {
    enumerable: true,
    writable: true,
    value: null
  });

  Reflect.defineProperty(Module, cpoNamespace, {
    enumerable: true,
    writable: true,
    value: null
  });

  Reflect.defineProperty(Module, cpmUtilsHandler, {
    enumerable: true,
    value: {
      // ownKeys: (aoTarget) =>
      //   Reflect.ownKeys(aoTarget.utilities),
      // has: (aoTarget, asName) =>
      //   indexOf.call(aoTarget.utilities, asName) >= 0,
      // set: (aoTarget, asName, aValue, aoReceiver) => {
      //   if (!Reflect.get(aoTarget, asName)) {
      //     aoTarget.metaObject.addMetaData('utilities', asName, aValue);
      //     Reflect.defineProperty(aoTarget, asName, {
      //       configurable: false,
      //       enumerable: true,
      //       writable: false,
      //       value: aValue
      //     });
      //     return aValue
      //   }
      // },
      get: (aoTarget, asName) => {
        if (!Reflect.get(aoTarget.prototype, asName)) {
          // if (aoTarget[cphUtilsMap] == null) {
          //   const utilsMap = {};
          //   for (const vsName in aoTarget[cphPathMap]) {
          //     const vsPath = aoTarget[cphPathMap][vsName];
          //     // console.log('<><><><> Utils.get', vsName, vsPath);
          //     if (_.includes(vsPath, '/utils/')) {
          //       utilsMap[vsName] = vsPath;
          //     }
          //   }
          //   aoTarget[cphUtilsMap] = utilsMap;
          // }
          const vsPath = aoTarget[cphUtilsMap][asName];
          if (vsPath) {
            aoTarget.resolve(vsPath);
          }
        }
        return Reflect.get(aoTarget.prototype, asName);
      }
    }
  });

  Reflect.defineProperty(Module, cpmHandler, {
    enumerable: true,
    value: {
      get: (aoTarget, asName) => {
        if (!Reflect.get(aoTarget.prototype, asName)) {
          assert(aoTarget[cphPathMap] != null, `The decorator \`@resolver(require, name => require(name))\` should be added above ${aoTarget.name} declaration`);
          const vsPath = aoTarget[cphPathMap][asName];
          assert(vsPath != null, `Class/util ${asName} should be defined on ${aoTarget.name} directly or use \`@loadFiles\` decorator above ${aoTarget.name} declaration`);
          // console.log('>?>?>?> Module.NS.get before aoTarget.resolve', vsPath);
          if (vsPath) {
            aoTarget.resolve(vsPath);
          }
        }
        // console.log('>?>?>?> Module.NS.get', aoTarget.name, asName, [Reflect.get(aoTarget.prototype, asName)]);
        return Reflect.get(aoTarget.prototype, asName);
      }
    }
  });

  Reflect.defineProperty(Module.prototype, 'MetaObject', {
    configurable: false,
    enumerable: true,
    writable: false,
    value: MetaObject
  });

  _class = Module;
  return Module;
};
