//leanes-queryable-addon


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

// import type { QueryInterface } from '../interfaces/QueryInterface';
// import type { CursorInterface } from '../interfaces/CursorInterface';
// import type { CollectionInterface } from '../interfaces/CollectionInterface';
// import type { RecordInterface } from '../interfaces/RecordInterface';
// import type { QueryableCollectionInterface } from '../interfaces/QueryableCollectionInterface';

// export default (Module) => {
//   const {
//     assert,
//     initializeMixin, meta, method,
//     Utils: { _ }
//   } = Module.NS;

//   Module.defineMixin(__filename, (BaseClass) => {
//     @initializeMixin
//     class Mixin<
//       C = CollectionInterface, D = RecordInterface
//     > extends BaseClass implements QueryableCollectionInterface<C, D> {
//       @meta static object = {};

//       @method async findBy(
//         query: object, options: ?object = {}
//       ): Promise<CursorInterface<C, D>> {
//         return await this.takeBy(query, options);
//       }

//       @method async takeBy(
//         query: object, options: ?object = {}
//       ): Promise<CursorInterface<C, D>> {
//         return assert.fail('Not implemented specific method');
//       }

//       @method async deleteBy(query: object): Promise<void> {
//         const voRecordsCursor = await this.takeBy(query);
//         await voRecordsCursor.forEach(async (aoRecord) => {
//           await aoRecord.delete();
//         });
//       }

//       @method async destroyBy(query: object): Promise<void> {
//         const voRecordsCursor = await this.takeBy(query);
//         await voRecordsCursor.forEach(async (aoRecord) => {
//           await aoRecord.destroy();
//         });
//       }

//       @method async removeBy(query: object): Promise<void> {
//         const voQuery = Module.NS.Query.new().forIn({
//           '@doc': this.collectionFullName()
//         }).filter(query).remove('@doc').into(this.collectionFullName());
//         await this.query(voQuery);
//       }

//       @method async updateBy(query: object, properties: object): Promise<void> {
//         const voRecordsCursor = await this.takeBy(query);
//         await voRecordsCursor.forEach(async (aoRecord) => {
//           await aoRecord.updateAttributes(properties);
//         });
//       }

//       @method async patchBy(query: object, properties: object): Promise<void> {
//         const voQuery = Module.NS.Query.new().forIn({
//           '@doc': this.collectionFullName()
//         }).filter(query).patch(properties).into(this.collectionFullName());
//         await this.query(voQuery);
//       }

//       @method async exists(query: object): Promise<boolean> {
//         const voQuery = Module.NS.Query.new().forIn({
//           '@doc': this.collectionFullName()
//         }).filter(query).limit(1).return('@doc');
//         const cursor = await this.query(voQuery);
//         return await cursor.hasNext();
//       }

//       @method async query(
//         aoQuery: object | QueryInterface
//       ): Promise<QueryInterface> {
//         // console.log('>?>?? QueryableCollectionMixin::query enter');
//         const voQuery = (() => {
//           if (_.isPlainObject(aoQuery)) {
//             aoQuery = _.pick(aoQuery, Object.keys(aoQuery).filter((key) =>
//               aoQuery[key] != null
//             ));
//             return Module.NS.Query.new(aoQuery);
//           } else {
//             return aoQuery;
//           }
//         })();
//         // console.log('>?>?? QueryableCollectionMixin::query voQuery', voQuery);
//         return await this.executeQuery(await this.parseQuery(voQuery));
//       }

//       @method async parseQuery(
//         aoQuery: object | QueryInterface
//       ): Promise<object | string | QueryInterface> {
//         return assert.fail('Not implemented specific method');
//       }

//       @method async executeQuery(
//         query: object | string | QueryInterface
//       ): Promise<CursorInterface<?C, *>> {
//         return assert.fail('Not implemented specific method');
//       }
//     }
//     return Mixin;
//   });
// }
