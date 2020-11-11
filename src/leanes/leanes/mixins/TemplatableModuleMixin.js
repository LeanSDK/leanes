// leanes-restful-addon



// // This file is part of LeanES.
// //
// // LeanES is free software: you can redistribute it and/or modify
// // it under the terms of the GNU Lesser General Public License as published by
// // the Free Software Foundation, either version 3 of the License, or
// // (at your option) any later version.
// //
// // LeanES is distributed in the hope that it will be useful,
// // but WITHOUT ANY WARRANTY; without even the implied warranty of
// // MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// // GNU Lesser General Public License for more details.
// //
// // You should have received a copy of the GNU Lesser General Public License
// // along with LeanES.  If not, see <https://www.gnu.org/licenses/>.

// export default (Module) => {
//   const {
//     initializeMixin, meta, property, method
//   } = Module.NS;

//   const cphTemplatesMap = Symbol.for('~templatesMap');
//   const cphTemplatesList = Symbol.for('~templatesList');
//   const cpoTemplates = Symbol.for('~templates');
//   const cphPathMap = Symbol.for('~pathMap');
//   const cpmTemplatesHandler = Symbol.for('~templatesHandler');

//   Module.defineMixin(__filename, (BaseClass) => {
//     @initializeMixin
//     class Mixin extends BaseClass {
//       @meta static object = {};

//       @property get Templates() {
//         const MClass = this.constructor;
//         return MClass[cpoTemplates] != null ? MClass[cpoTemplates] : MClass[cpoTemplates] = new Proxy(MClass, MClass[cpmTemplatesHandler]);
//       }

//       static get templates(): {[key: string]: Function} {
//         return this.metaObject.getGroup('templates', false);
//       }

//       static defineTemplate(filename: string, vmFunction: Function): Function {
//         const vsRoot = this.prototype.ROOT || '.';
//         const vsTemplatesDir = `${vsRoot}/templates/`;
//         const templateName = filename.replace(vsTemplatesDir, '').replace(/\.js|\.coffee/, '');
//         this.metaObject.addMetaData('templates', templateName, vmFunction);
//         return vmFunction;
//       }

//       static resolveTemplate(...args): Function {
//         const vsRoot = this.prototype.ROOT || '.';
//         const vsTemplatesDir = `${vsRoot}/templates/`;
//         const path = require('path'); //TODO
//         const templateName = path.resolve(...args).replace(vsTemplatesDir, '').replace(/\.js|\.coffee/, '');
//         return this.prototype.Templates[templateName];
//       }

//       // this.public(this.static({
//       //   static loadTemplates: Function
//       // }, {
//       //   default: function() {
//       //     var files, ref, vsRoot, vsTemplatesDir;
//       //     vsRoot = (ref = this.prototype.ROOT) != null ? ref : '.';
//       //     vsTemplatesDir = `${vsRoot}/templates`;
//       //     files = filesTreeSync(vsTemplatesDir, {
//       //       filesOnly: true
//       //     });
//       //     (files != null ? files : []).forEach((i) => {
//       //       var templateName, vsTemplatePath;
//       //       templateName = i.replace(/\.js|\.coffee/, '');
//       //       vsTemplatePath = `${vsTemplatesDir}/${templateName}`;
//       //       return require(vsTemplatePath)(this.Module);
//       //     });
//       //   }
//       // }));
//     }

//     Reflect.defineProperty(Mixin, cphTemplatesMap, {
//       enumerable: true,
//       writable: true,
//       value: null
//     });

//     Reflect.defineProperty(Mixin, cpoTemplates, {
//       enumerable: true,
//       writable: true,
//       value: null
//     });

//     Reflect.defineProperty(Mixin, cpmTemplatesHandler, {
//       enumerable: true,
//       value: {
//         // ownKeys: (aoTarget) =>
//         //   Reflect.ownKeys(aoTarget.templates),
//         // has: (aoTarget, asName) =>
//         //   indexOf.call(aoTarget.templates, asName) >= 0,
//         // set: (aoTarget, asName, aValue, aoReceiver) => {
//         //   if (!Reflect.get(aoTarget, asName)) {
//         //     aoTarget.metaObject.addMetaData('templates', asName, aValue);
//         //     Reflect.defineProperty(aoTarget, asName, {
//         //       configurable: false,
//         //       enumerable: true,
//         //       writable: false,
//         //       value: aValue
//         //     });
//         //     return aValue
//         //   }
//         // },
//         get: (aoTarget, asName) => {
//           if (!Reflect.get(aoTarget.templates, asName)) {
//             if (aoTarget[cphTemplatesMap] == null) {
//               const templatesMap = {};
//               const vsRoot = aoTarget.prototype.ROOT || '.';
//               const vsTemplatesDir = `${vsRoot}/templates/`;
//               for (const vsPath of aoTarget[cphTemplatesList]) {
//                 const vsName = vsPath.replace(vsTemplatesDir, '').replace(/\.js|\.coffee/, '');
//                 // const vsPath = aoTarget[cphPathMap][vsName];
//                 // console.log('<><><><> Templates.get', vsName, vsPath);
//                 // if (_.includes(vsPath, '/templates/')) {
//                 templatesMap[vsName] = vsPath;
//                 // }
//               }
//               aoTarget[cphTemplatesMap] = templatesMap;
//             }
//             const vsPath = aoTarget[cphTemplatesMap][asName];
//             if (vsPath) {
//               aoTarget.resolve(vsPath);
//             }
//           }
//           return Reflect.get(aoTarget.templates, asName);
//         }
//       }
//     });
//     Reflect.defineProperty(Mixin, 'onMetalize', {
//       configurable: true,
//       enumerable: true,
//       writable: true,
//       value: function(...args) {
//         Reflect.getPrototypeOf(Mixin).onMetalize.apply(this, args);
//         this[cphTemplatesMap] = undefined;
//         this[cpoTemplates] = undefined;
//         return;
//       }
//     });
//     return Mixin;
//   });
// }
