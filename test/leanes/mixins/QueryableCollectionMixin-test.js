//leanes-queryable-addon

// const { expect, assert } = require('chai');
// const sinon = require('sinon');
// const _ = require('lodash');
// const LeanES = require("../../../src/leanes/index.js").default;
// const {
//   Cursor,
//   initialize, partOf, nameBy, meta, mixin, constant, method, attribute, property
// } = LeanES.NS;

// describe('QueryableCollectionMixin', () => {
//   describe('.new', () => {
//     it('should create queryable instance', () => {

//       @initialize
//       class Test extends LeanES {
//         @nameBy static __filename = 'Test';
//         @meta static object = {};
//       }

//       @initialize
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class Queryable extends LeanES.NS.CoreObject {
//         @nameBy static __filename = 'Test';
//         @meta static object = {};
//         @method async parseQuery(aoQuery) {
//           return aoQuery;
//         }
//         @method async executeQuery(aoParsedQuery) {
//           return aoParsedQuery;
//         }
//       }
//       const queryable = Queryable.new();
//       assert.instanceOf(queryable, Queryable, 'The `queryable` is not an instance of Queryable');
//     });
//   });
//   describe('.query', () => {
//     it('should execute query', async () => {

//       @initialize
//       class Test extends LeanES {
//         @nameBy static __filename = 'Test';
//         @meta static object = {};
//       }
//       const spyExecuteQuery = sinon.spy(async (aoParsedQuery) => {
//         return Cursor.new(null, [Symbol('any')]);
//       });
//       const spyParseQuery = sinon.spy(async (aoQuery) => {
//         return aoQuery;
//       });

//       let queryObj = null;

//       @initialize
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class Queryable extends LeanES.NS.CoreObject {
//         @nameBy static __filename = 'Test';
//         @meta static object = {};
//         @method async parseQuery(aoQuery) {
//           queryObj = aoQuery;
//           return spyParseQuery(aoQuery);
//         }
//         @method async executeQuery(aoQuery) {
//           return spyExecuteQuery(aoQuery);
//         }
//       }
//       const queryable = Queryable.new();
//       const query = {
//         test: 'test'
//       };
//       await queryable.query(query);
//       assert.isTrue(spyParseQuery.calledWith(queryObj));
//       assert.isTrue(spyExecuteQuery.calledWith(queryObj));
//     });
//   });
//   describe('.exists', () => {
//     let facade = null;
//     afterEach(async () => {
//       facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
//     });
//     it('should check data existance by query', async () => {
//       const KEY = 'FACADE_TEST_QUERYABLE_002';
//       facade = LeanES.NS.Facade.getInstance(KEY);

//       @initialize
//       class Test extends LeanES {
//         @nameBy static __filename = 'Test';
//         @meta static object = {};
//       }

//       @initialize
//       @partOf(Test)
//       class TestRecord extends LeanES.NS.Record {
//         @nameBy static __filename = 'TestRecord';
//         @meta static object = {};
//         @attribute({ type: 'string' }) test;
//         constructor() {
//           super(...arguments);
//           this.type = 'Test::TestRecord';
//         }
//       }

//       @initialize
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class Queryable extends LeanES.NS.Collection {
//         @nameBy static __filename = 'Test';
//         @meta static object = {};
//         @property get delegate() {
//           return TestRecord;
//         }
//         @method async parseQuery(aoQuery) {
//           return aoQuery;
//         }
//         @method async executeQuery(aoParsedQuery) {
//           const data = _.filter(this.getData(), aoParsedQuery.$filter);
//           return await Cursor.new(this, data);
//         }
//         @method async update(id, item) {
//           const record = await this.find(id);
//           for (const key in item) {
//             if (!{}.hasOwnProperty.call(item, key)) continue;
//             record[key] = item[key];
//             return await record;
//           }
//         }
//         @method async push(record) {
//           record.id = LeanES.NS.Utils.uuid.v4();
//           this.getData().push(record);
//           return await record;
//         }
//       }
//       const collection = Queryable.new();
//       collection.setName(KEY);
//       collection.setData([]);
//       facade.registerProxy(collection);
//       const queryable = facade.retrieveProxy(KEY);
//       await queryable.create({
//         test: 'test1'
//       });
//       await queryable.create({
//         test: 'test2'
//       });
//       await queryable.create({
//         test: 'test3'
//       });
//       await queryable.create({
//         test: 'test4'
//       });
//       assert.isTrue(await queryable.exists({
//         test: 'test2'
//       }));
//       assert.isFalse(await queryable.exists({
//         test: 'test5'
//       }));
//     });
//   });
//   describe('.findBy', () => {
//     let facade = null;
//     afterEach(async () => {
//       facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
//     });
//     it('should find data by query', async () => {
//       const KEY = 'FACADE_TEST_QUERYABLE_003';
//       facade = LeanES.NS.Facade.getInstance(KEY);

//       @initialize
//       class Test extends LeanES {
//         @nameBy static __filename = 'Test';
//         @meta static object = {};
//       }

//       @initialize
//       @partOf(Test)
//       class TestRecord extends LeanES.NS.Record {
//         @nameBy static __filename = 'TestRecord';
//         @meta static object = {};
//         @attribute({ type: 'string' }) test;
//         constructor() {
//           super(...arguments);
//           this.type = 'Test::TestRecord';
//         }
//       }

//       @initialize
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class Queryable extends LeanES.NS.Collection {
//         @nameBy static __filename = 'Queryable';
//         @meta static object = {};
//         @property get delegate() {
//           return TestRecord;
//         }
//         @method async parseQuery(aoQuery) {
//           return aoQuery;
//         }
//         @method async executeQuery(aoParsedQuery) {
//           const data = _.filter(this.getData(), aoParsedQuery.$filter);
//           return Cursor.new(this, data);
//         }
//         @method async update(id, item) {
//           const record = await this.find(id);
//           for (const key in item) {
//             if (!{}.hasOwnProperty.call(item, key)) continue;
//             record[key] = item[key];
//             return record;
//           }
//         }
//         @method async push(record) {
//           record.id = LeanES.NS.Utils.uuid.v4();
//           this.getData().push(record);
//           return record;
//         }
//         @method async takeBy(query) {
//           const voQuery = Test.NS.Query.new()
//             .forIn({ '@doc': this.collectionFullName() })
//             .filter(query)
//             .limit(1);
//           return await this.query(voQuery);
//         }
//       }
//       const collection = Queryable.new();
//       collection.setName(KEY);
//       collection.setData([]);
//       facade.registerProxy(collection);
//       const queryable = facade.retrieveProxy(KEY);
//       await queryable.create({
//         test: 'test1'
//       });
//       await queryable.create({
//         test: 'test2'
//       });
//       await queryable.create({
//         test: 'test3'
//       });
//       await queryable.create({
//         test: 'test4'
//       });
//       const record1 = await (await queryable.findBy({ 'test': 'test2' })).next();
//       assert.isDefined(record1);
//       assert.equal(record1.test, 'test2');
//       const record2 = await (await queryable.findBy({ 'test': 'test5' })).next();
//       assert.isUndefined(record2);
//     });
//   });
//   describe('.deleteBy', () => {
//     let facade = null;
//     afterEach(async () => {
//       facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
//     });
//     it('should find data by query', async () => {
//       const KEY = 'FACADE_TEST_QUERYABLE_004';
//       facade = LeanES.NS.Facade.getInstance(KEY);

//       @initialize
//       class Test extends LeanES {
//         @nameBy static __filename = 'Test';
//         @meta static object = {};
//       }

//       @initialize
//       @partOf(Test)
//       class TestRecord extends LeanES.NS.Record {
//         @nameBy static __filename = 'TestRecord';
//         @meta static object = {};
//         @attribute({ type: 'string' }) test;
//         constructor() {
//           super(...arguments);
//           this.type = 'Test::TestRecord';
//         }
//       }

//       @initialize
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class Queryable extends LeanES.NS.Collection {
//         @nameBy static __filename = 'Test';
//         @meta static object = {};
//         @property get delegate() {
//           return TestRecord;
//         }
//         @method async parseQuery(aoQuery) {
//           return await aoQuery;
//         }
//         @method async executeQuery(aoParsedQuery) {
//           const data = _.filter(this.getData(), aoParsedQuery.$filter);
//           return await Cursor.new(this, data);
//         }
//         @method async update(id, item) {
//           const record = await this.find(id);
//           for (const key in item) {
//             if (!{}.hasOwnProperty.call(item, key)) continue;
//             record[key] = item[key];
//             return await record;
//           }
//         }
//         @method async push(record) {
//           record.id = LeanES.NS.Utils.uuid.v4();
//           this.getData().push(record);
//           return await record;
//         }
//         @method async takeBy(query) {
//           const voQuery = Test.NS.Query.new()
//             .forIn({ '@doc': this.collectionFullName() })
//             .filter(query)
//             .limit(1);
//           return await this.query(voQuery);
//         }
//         @method async includes(id) {
//           return await this.exists({ id });
//         }
//         @method async override(id, aoRecord) {
//           const index = _.findIndex(this.getData(), { id });
//           this.getData()[index] = await this.serializer.serialize(aoRecord);
//           return await Test.NS.Cursor.new(this, [this.getData()[index]]).first();
//         }
//       }
//       const collection = Queryable.new();
//       collection.setName(KEY);
//       collection.setData([]);
//       facade.registerProxy(collection);
//       const queryable = facade.retrieveProxy(KEY);
//       await queryable.create({
//         test: 'test1'
//       });
//       await queryable.create({
//         test: 'test2'
//       });
//       await queryable.create({
//         test: 'test3'
//       });
//       await queryable.create({
//         test: 'test4'
//       });
//       await queryable.deleteBy({ test: 'test2' });
//       for (const rawData of queryable.getData()) {
//         assert.isDefined(rawData, 'No specified record');
//         if (rawData.test === 'test2') {
//           assert.propertyVal(rawData, 'isHidden', true, 'Record was not removed');
//           assert.isNotNull(rawData.deletedAt, 'Record deleted data is null');
//           assert.isDefined(rawData.deletedAt, 'Record deleted data is undefined');
//         } else {
//           assert.propertyVal(rawData, 'isHidden', false, 'Record was removed');
//           assert.isNull(rawData.deletedAt, 'Record deleted data is not null');
//         }
//       }
//     });
//   });
//   describe('.removeBy', () => {
//     let facade = null;
//     afterEach(async () => {
//       facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
//     });
//     it('should remove data by query', async () => {
//       const KEY = 'FACADE_TEST_QUERYABLE_005';
//       facade = LeanES.NS.Facade.getInstance(KEY);

//       @initialize
//       class Test extends LeanES {
//         @nameBy static __filename = 'Test';
//         @meta static object = {};
//       }

//       @initialize
//       @partOf(Test)
//       class TestRecord extends LeanES.NS.Record {
//         @nameBy static __filename = 'TestRecord';
//         @meta static object = {};
//         @attribute({ type: 'string' }) test;
//         constructor() {
//           super(...arguments);
//           this.type = 'Test::TestRecord';
//         }
//       }

//       @initialize
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class Queryable extends LeanES.NS.Collection {
//         @nameBy static __filename = 'Test';
//         @meta static object = {};
//         @property get delegate() {
//           return TestRecord;
//         }
//         @method async parseQuery(aoQuery) {
//           return await aoQuery;
//         }
//         @method async executeQuery(aoParsedQuery) {
//           let data = [];
//           switch (false) {
//             case !aoParsedQuery['$remove']:
//               _.remove(this.getData(), aoParsedQuery['$filter']);
//               return await Cursor.new(this, []);
//             default:
//               data = _.filter(this.getData(), aoParsedQuery.$filter);
//           }
//           return await Cursor.new(this, data);
//         }
//         @method async update(id, item) {
//           const data = _.filter(this.getData(), { id });
//           if (_.isArray(data)) {
//             for (i = 0; i < data.length; i++) {
//               const datum = data[i];
//               if (item.constructor.attributes != null) {
//                 vhAttributes = {};
//                 const ref = item.constructor.attributes;
//                 for (key in ref) {
//                   if (!{}.hasOwnProperty.call(ref, key)) continue;
//                   datum[key] = item[key];
//                 }
//               } else {
//                 for (key in item) {
//                   if (!{}.hasOwnProperty.call(item, key)) continue;
//                   datum[key] = item[key];;
//                 }
//               }
//             }
//           }
//           return data.length > 0;
//         }
//         @method async push(record) {
//           record.id = LeanES.NS.Utils.uuid.v4();
//           this.getData().push(await this.delegate.serialize(record));
//           return record;
//         }
//         @method async take(id) {
//           const data = _.find(this.getData(), { id });
//           if (data == null) {
//             throw (new Error('NOT_FOUND'))
//           }
//           return data;
//         }
//         @method async includes(id) {
//           return await this.exists({ id });
//         }
//         @method async override(id, aoRecord) {
//           const index = _.findIndex(this.getData(), { id });
//           this.getData()[index] = await this.serializer.serialize(aoRecord);
//           return await Test.NS.Cursor.new(this, [this.getData()[index]]).first();
//         }
//       }
//       const collection = Queryable.new();
//       collection.setName(KEY);
//       collection.setData([]);
//       facade.registerProxy(collection);
//       const queryable = facade.retrieveProxy(KEY);
//       await queryable.create({
//         test: 'test1'
//       });
//       await queryable.create({
//         test: 'test2'
//       });
//       await queryable.create({
//         test: 'test3'
//       });
//       await queryable.create({
//         test: 'test2'
//       });
//       await queryable.removeBy({ test: 'test2' });
//       const data = queryable.getData();
//       assert.lengthOf(data, 2, 'Records did not removed');
//       assert.lengthOf(_.filter(data, { test: 'test2' }), 0, 'Found removed records');
//     });
//   });
//   describe('.destroyBy', () => {
//     let facade = null;
//     afterEach(async () => {
//       facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
//     });
//     it('should remove records by query', async () => {
//       const KEY = 'FACADE_TEST_QUERYABLE_006';
//       facade = LeanES.NS.Facade.getInstance(KEY);

//       @initialize
//       class Test extends LeanES {
//         @nameBy static __filename = 'Test';
//         @meta static object = {};
//       }

//       @initialize
//       @partOf(Test)
//       class TestRecord extends LeanES.NS.Record {
//         @nameBy static __filename = 'TestRecord';
//         @meta static object = {};
//         @attribute({ type: 'string' }) test;
//         constructor() {
//           super(...arguments);
//           this.type = 'Test::TestRecord';
//         }
//       }

//       @initialize
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class Queryable extends LeanES.NS.Collection {
//         @nameBy static __filename = 'Test';
//         @meta static object = {};
//         @property get delegate() {
//           return TestRecord;
//         }
//         @method async parseQuery(aoQuery) {
//           return await aoQuery;
//         }
//         @method async executeQuery(aoParsedQuery) {
//           let data = [];
//           switch (false) {
//             case !aoParsedQuery['$remove']:
//               _.remove(this.getData(), aoParsedQuery['$filter']);
//               return await Cursor.new(this, []);
//             default:
//               data = _.filter(this.getData(), aoParsedQuery.$filter);
//           }
//           return await Cursor.new(this, data);
//         }
//         @method async update(id, item) {
//           const data = _.filter(this.getData(), { id });
//           if (_.isArray(data)) {
//             for (i = 0; i < data.length; i++) {
//               const datum = data[i];
//               if (item.constructor.attributes != null) {
//                 vhAttributes = {};
//                 const ref = item.constructor.attributes;
//                 for (key in ref) {
//                   if (!{}.hasOwnProperty.call(ref, key)) continue;
//                   datum[key] = item[key];
//                 }
//               } else {
//                 for (key in item) {
//                   if (!{}.hasOwnProperty.call(item, key)) continue;
//                   datum[key] = item[key];;
//                 }
//               }
//             }
//           }
//           return data.length > 0;
//         }
//         @method async push(record) {
//           record.id = LeanES.NS.Utils.uuid.v4();
//           this.getData().push(await this.delegate.serialize(record));
//           return record;
//         }
//         @method remove(id) {
//           _.remove(this.getData(), { id });
//         }
//         @method async takeBy(query) {
//           const voQuery = Test.NS.Query.new()
//             .forIn({ '@doc': this.collectionFullName() })
//             .filter(query)
//             .limit(1);
//           return await this.query(voQuery);
//         }
//         @method async includes(id) {
//           return await this.exists({ id });
//         }
//       }
//       const collection = Queryable.new();
//       collection.setName(KEY);
//       collection.setData([]);
//       facade.registerProxy(collection);
//       const queryable = facade.retrieveProxy(KEY);
//       await queryable.create({
//         test: 'test1'
//       });
//       await queryable.create({
//         test: 'test2'
//       });
//       await queryable.create({
//         test: 'test3'
//       });
//       await queryable.create({
//         test: 'test2'
//       });
//       await queryable.destroyBy({ test: 'test2' });
//       const data = queryable.getData();
//       assert.lengthOf(data, 2, 'Records did not removed');
//       assert.lengthOf(_.filter(data, { test: 'test2' }), 0, 'Found removed records');
//     });
//   });
//   describe('.updateBy', () => {
//     let facade = null;
//     afterEach(async () => {
//       facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
//     });
//     it('should update data in records by query', async () => {
//       const KEY = 'FACADE_TEST_QUERYABLE_009';
//       facade = LeanES.NS.Facade.getInstance(KEY);

//       @initialize
//       class Test extends LeanES {
//         @nameBy static __filename = 'Test';
//         @meta static object = {};
//       }

//       @initialize
//       @partOf(Test)
//       class TestRecord extends LeanES.NS.Record {
//         @nameBy static __filename = 'TestRecord';
//         @meta static object = {};
//         @attribute({ type: 'string' }) test;
//         @attribute({ type: 'boolean' }) updated = false;
//         constructor() {
//           super(...arguments);
//           this.type = 'Test::TestRecord';
//         }
//       }

//       @initialize
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class Queryable extends LeanES.NS.Collection {
//         @nameBy static __filename = 'Test';
//         @meta static object = {};
//         @property get delegate() {
//           return TestRecord;
//         }
//         @method async parseQuery(aoQuery) {
//           return await aoQuery;
//         }
//         @method async executeQuery(aoParsedQuery) {
//           const data = _.filter(this.getData(), aoParsedQuery.$filter)
//           return await Cursor.new(this, data);
//         }
//         @method async update(id, item) {
//           const data = _.filter(this.getData(), { id });
//           if (_.isArray(data)) {
//             for (i = 0; i < data.length; i++) {
//               const datum = data[i];
//               if (item.constructor.attributes != null) {
//                 vhAttributes = {};
//                 const ref = item.constructor.attributes;
//                 for (key in ref) {
//                   if (!{}.hasOwnProperty.call(ref, key)) continue;
//                   datum[key] = item[key];
//                 }
//               } else {
//                 for (key in item) {
//                   if (!{}.hasOwnProperty.call(item, key)) continue;
//                   datum[key] = item[key];;
//                 }
//               }
//             }
//           }
//           return data.length > 0;
//         }
//         @method async push(record) {
//           record.id = LeanES.NS.Utils.uuid.v4();
//           this.getData().push(await this.delegate.serialize(record));
//           return record;
//         }
//         @method async take(id) {
//           const data = _.find(this.getData(), { id });
//           if (data == null) {
//             throw (new Error('NOT_FOUND'))
//           }
//           return data;
//         }
//         @method async takeBy(query) {
//           const voQuery = Test.NS.Query.new()
//             .forIn({ '@doc': this.collectionFullName() })
//             .filter(query)
//             .limit(1);
//           return await this.query(voQuery);
//         }
//         @method async includes(id) {
//           return await this.exists({ id });
//         }
//         @method async override(id, aoRecord) {
//           const index = _.findIndex(this.getData(), { id });
//           this.getData()[index] = await this.serializer.serialize(aoRecord);
//           return await Test.NS.Cursor.new(this, [this.getData()[index]]).first();
//         }
//       }
//       const collection = Queryable.new();
//       collection.setName(KEY);
//       collection.setData([]);
//       facade.registerProxy(collection);
//       const queryable = facade.retrieveProxy(KEY);
//       await queryable.create({
//         test: 'test1'
//       });
//       await queryable.create({
//         test: 'test2'
//       });
//       await queryable.create({
//         test: 'test3'
//       });
//       await queryable.create({
//         test: 'test4'
//       });
//       await queryable.updateBy({ test: 'test2' }, { updated: true });
//       for (const rawData of queryable.getData()) {
//         assert.isDefined(rawData, 'No specified record');
//         if (rawData.test == 'test2') {
//           assert.propertyVal(rawData, 'updated', true, 'Record was not updated');
//         } else {
//           assert.propertyVal(rawData, 'updated', false, 'Record was updated');
//         }
//       }
//     });
//   });
//   describe('.patchBy', () => {
//     let facade = null;
//     afterEach(async () => {
//       facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
//     });
//     it('should update data in records by query', async () => {
//       const KEY = 'FACADE_TEST_QUERYABLE_010';
//       facade = LeanES.NS.Facade.getInstance(KEY);

//       @initialize
//       class Test extends LeanES {
//         @nameBy static __filename = 'Test';
//         @meta static object = {};
//       }

//       @initialize
//       @partOf(Test)
//       class TestRecord extends LeanES.NS.Record {
//         @nameBy static __filename = 'TestRecord';
//         @meta static object = {};
//         @attribute({ type: 'string' }) test;
//         @attribute({ type: 'boolean' }) updated = false;
//         constructor() {
//           super(...arguments);
//           this.type = 'Test::TestRecord';
//         }
//       }

//       @initialize
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class Queryable extends LeanES.NS.Collection {
//         @nameBy static __filename = 'Test';
//         @meta static object = {};
//         @property get delegate() {
//           return TestRecord;
//         }
//         @method async parseQuery(aoQuery) {
//           return aoQuery;
//         }
//         @method async executeQuery(aoParsedQuery) {
//           const item = aoParsedQuery['$patch'];
//           if (item != null) {
//             const toBeUpdated = _.filter(this.getData(), aoParsedQuery.$filter);
//             if (_.isArray(toBeUpdated)) {
//               for (const datum of toBeUpdated) {
//                 if (item.constructor.attributes != null) {
//                   const vhAttributes = {};
//                   const ref = item.constructor.attributes;
//                   for (const key in ref) {
//                     if (!{}.hasOwnProperty.call(ref, key)) continue;
//                     datum[key] = item[key];
//                   }
//                 } else {
//                   for (const key in item) {
//                     if (!{}.hasOwnProperty.call(item, key)) continue;
//                     const value = item[key];
//                     datum[key] = value;
//                   }
//                 }
//               }
//             }
//           }
//         }
//         @method async push(record) {
//           record.id = LeanES.NS.Utils.uuid.v4();
//           this.getData().push(await this.delegate.serialize(record));
//           return record;
//         }
//         @method async take(id) {
//           const data = _.find(this.getData(), { id });
//           if (data == null) {
//             throw (new Error('NOT_FOUND'))
//           }
//           return data;
//         }
//       }
//       const collection = Queryable.new();
//       collection.setName(KEY);
//       collection.setData([]);
//       facade.registerProxy(collection);
//       const queryable = facade.retrieveProxy(KEY);
//       await queryable.create({
//         test: 'test1'
//       });
//       await queryable.create({
//         test: 'test2'
//       });
//       await queryable.create({
//         test: 'test3'
//       });
//       await queryable.create({
//         test: 'test4'
//       });
//       await queryable.patchBy({ test: 'test2' }, { updated: true });
//       for (const rawData of queryable.getData()) {
//         assert.isDefined(rawData, 'No specified record');
//         if (rawData.test == 'test2') {
//           assert.propertyVal(rawData, 'updated', true, 'Record was not updated');
//         } else {
//           assert.propertyVal(rawData, 'updated', false, 'Record was updated');
//         }
//       }
//     });
//   });
// });
