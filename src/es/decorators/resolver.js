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
const cphUtilsMap = Symbol.for('~utilsMap');
const cphMigrationsMap = Symbol.for('~migrationsMap');
const cphTemplatesList = Symbol.for('~templatesList');
const cphFilesList = Symbol.for('~filesList');

export default function resolver(req, amReg) {

  return target => {
    assert(target[cpoMetaObject] != null, 'Target for `resolver` decorator must be a Module subclass');
    const vmFunctor = function (name, isRecursion = false) {
      const errors = [];
      let currentHasError = true;
      const [
        maybeErrors, parentHasError
      ] = this.superclass().resolve(name, true);
      maybeErrors.forEach((i) => { errors.push(i); });
      try {
        const currentRes = amReg(name);
        if (currentRes && typeof currentRes.default === 'function') {
          currentRes.default(this);
        } else {
          currentRes(this);
        }
        currentHasError = false;
      } catch (e2) {
        if (e2.name.indexOf(` IN ${this.name}`) === -1) {
          e2.name += ` IN ${this.name}`;
        }
        errors.push(e2);
      }
      if (!isRecursion) {
        if (parentHasError && currentHasError) {
          for (const err of errors) {
            console.error(err);
          }
          const newError = new Error(`Resolver has undefined dependency. Class should be defined on ${this.name} directly or use \`@loadFiles\` decorator above ${this.name} declaration`);
          newError.name += ` IN ${this.name}`;
          throw newError;
        }
      }
      return [errors, parentHasError && currentHasError];
    };
    const [
      pathMap, utilsMap, migrationsMap, templatesList, filesList
    ] =
      Object.keys(req)
        .sort((a, b) =>
          (a.match(/\//g) || []).length - (b.match(/\//g) || []).length
        )
        .reduce(([cp, up, mp, tp, fp], vsItem) => {
          if (/\.[.]+$/.test(vsItem)) {
            fp.push(vsItem);
          }
          if (/\.js$/.test(vsItem)) {
            const vsPathMatch = vsItem.match(/([\w\-\_]+)\.js$/);
            const [blackhole, vsName] = vsPathMatch != null ? vsPathMatch : [];
            if (vsItem && vsName) {
              switch (false) {
                case !/.*\/templates\/.*/.test(vsItem):
                  tp.push(vsItem);
                  break;
                case !(/.*\/migrations\/.*/.test(vsItem) && vsName !== 'BaseMigration'):
                  if (mp[vsName] == null) mp[vsName] = vsItem;
                  break;
                case !/.*\/utils\/.*/.test(vsItem):
                  if (up[vsName] == null) up[vsName] = vsItem;
                  break;
                default:
                  if (cp[vsName] == null) cp[vsName] = vsItem;
              }
            }
          }
          return [cp, up, mp, tp, fp];
        }, [{}, {}, {}, [], []]);
    if (target[cphPathMap] == null) {
      Reflect.defineProperty(target, cphPathMap, {
        enumerable: true,
        writable: true,
        value: pathMap
      });
    }
    if (target[cphUtilsMap] == null) {
      Reflect.defineProperty(target, cphUtilsMap, {
        enumerable: true,
        writable: true,
        value: utilsMap
      });
    }
    if (target[cphMigrationsMap] == null) {
      Reflect.defineProperty(target, cphMigrationsMap, {
        enumerable: true,
        writable: true,
        value: migrationsMap
      });
    }
    if (target[cphTemplatesList] == null) {
      Reflect.defineProperty(target, cphTemplatesList, {
        enumerable: true,
        writable: true,
        value: templatesList
      });
    }
    if (target[cphFilesList] == null) {
      Reflect.defineProperty(target, cphFilesList, {
        enumerable: true,
        writable: true,
        value: filesList
      });
    }
    Reflect.defineProperty(target, 'resolve', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: vmFunctor
    });
    Reflect.defineProperty(target, 'require', {
      configurable: false,
      enumerable: true,
      writable: false,
      value: req
    });
    target.Module.metaObject.addMetaData('classMethods', 'resolve', vmFunctor);
    target.Module.metaObject.addMetaData('classMethods', 'require', req);
    return target;
  }
};
