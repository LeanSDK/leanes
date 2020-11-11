// leanes-configurable-addon


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

// const hasProp = {}.hasOwnProperty;

// export default (Module) => {
//   const {
//     assert,
//     initializeMixin, meta, property, method,
//     Utils: { _, assign }
//   } = Module.NS;

//   Module.defineMixin(__filename, (BaseClass) => {
//     @initializeMixin
//     class Mixin extends BaseClass {
//       @meta static object = {};

//       @property get ROOT(): string {
//         return this.Module.prototype.ROOT;
//       }

//       @method defineConfigProperties() {
//         const manifestPath = `${this.ROOT}/manifest.json`;
//         // const manifest = require(manifestPath);
//         // const manifestPath = './manifest.json';
//         const manifest = this.ApplicationModule.require(manifestPath);
//         this._name = manifest.name;
//         this._description = manifest.description;
//         this._license = manifest.license;
//         this._version = manifest.version;
//         this._keywords = manifest.keywords;
//         const configFromManifest = manifest.configuration;
//         const configs = assign({}, configFromManifest, this.getData());
//         for (const key in configs) {
//           if (!hasProp.call(configs, key)) continue;
//           const value = configs[key];
//           ((attr, config) => {
//             assert(config.description != null, 'Description in config definition is required');
//             assert(!config.required || (config.default != null), `Attribute '${attr}' is required in config`);
//             assert(config.type != null, 'Type in config definition is required');
//             switch (config.type) {
//               case 'string':
//                 assert(_.isString(config.default), `Default for '${attr}' must be string`);
//                 break;
//               case 'number':
//                 assert(_.isNumber(config.default), `Default for '${attr}' must be number`);
//                 break;
//               case 'boolean':
//                 assert(_.isBoolean(config.default), `Default for '${attr}' must be boolean`);
//                 break;
//               case 'integer':
//                 assert(_.isInteger(config.default), `Default for '${attr}' must be integer`);
//                 break;
//               case 'json':
//                 assert(_.isString(config.default), `Default for '${attr}' must be JSON string`);
//                 try {
//                   JSON.parse(config.default);
//                 } catch (error) {
//                   assert.fail(`Default for '${attr}' is not valid JSON`);
//                 }
//                 break;
//               case 'password':
//                 assert(_.isString(config.default), `Default for '${attr}' must be string`)
//             }
//             Reflect.defineProperty(this, attr, {
//               enumerable: true,
//               configurable: true,
//               writable: false,
//               value: config.default
//             });
//           })(key, value);
//         }
//       }
//     }
//     return Mixin;
//   });
// }
