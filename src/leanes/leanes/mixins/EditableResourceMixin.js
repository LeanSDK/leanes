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
//     initializeMixin, meta, method, chains,
//     Utils: { _ }
//   } = Module.NS;


//   Module.defineMixin(__filename, (BaseClass) => {
//     @initializeMixin
//     @chains(function () {
//       this.beforeHook('protectEditable', {
//         only: ['create', 'update', 'delete']
//       });
//       this.beforeHook('setCurrentUserOnCreate', {
//         only: ['create']
//       });
//       this.beforeHook('setCurrentUserOnUpdate', {
//         only: ['update']
//       });
//       this.beforeHook('setCurrentUserOnDelete', {
//         only: ['delete']
//       });
//     })
//     class Mixin extends BaseClass {
//       @meta static object = {};

//       @method async setCurrentUserOnCreate(...args) {
//         this.recordBody.creatorId = this.session.uid || null;
//         this.recordBody.editorId = this.recordBody.creatorId;
//         return args;
//       }

//       @method async setCurrentUserOnUpdate(...args) {
//         this.recordBody.editorId = this.session.uid || null;
//         return args;
//       }

//       @method async setCurrentUserOnDelete(...args) {
//         this.recordBody.editorId = this.session.uid || null;
//         this.recordBody.removerId = this.recordBody.editorId;
//         return args;
//       }

//       @method async protectEditable(...args) {
//         this.recordBody = _.omit(this.recordBody, [
//           'creatorId', 'editorId', 'removerId'
//         ]);
//         return args;
//       }
//     }
//     return Mixin;
//   });
// }
