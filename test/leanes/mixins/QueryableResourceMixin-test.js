//leanes-queryable-addon


// const EventEmitter = require('events');
// const { expect, assert } = require('chai');
// const sinon = require('sinon');
// const _ = require('lodash');
// const LeanES = require("../../../src/leanes/index.js").default;

// const hasProp = {}.hasOwnProperty;

// describe('QueryableResourceMixin', () => {
//   let facade = null;
//   afterEach(async () => {
//     facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
//   });
//   describe('.list', () => {
//     it('should list of resource items', async () => {
//       const {
//         initialize, partOf, nameBy, meta, mixin, constant, method, attribute, property
//       } = LeanES.NS;
//       const KEY = 'TEST_RESOURCE_QUERYABLE_001';
//       facade = LeanES.NS.Facade.getInstance(KEY);

//       @initialize
//       class Test extends LeanES {
//         @nameBy static __filename = 'Test';
//         @meta static object = {};
//         @constant ROOT = `${__dirname}/config/root`;
//       }

//       const configs = LeanES.NS.Configuration.new();
//       configs.setName(LeanES.NS.CONFIGURATION);
//       configs.setData(Test.NS.ROOT);
//       facade.registerProxy(configs);

//       @initialize
//       @partOf(Test)
//       class TestRouter extends LeanES.NS.Router {
//         @nameBy static __filename = 'TestRouter';
//         @meta static object = {};
//       }

//       @initialize
//       @partOf(Test)
//       class TestRecord extends LeanES.NS.Record {
//         @nameBy static __filename = 'TestRecord';
//         @meta static object = {};
//         @method findRecordByName() {
//           return TestRecord;
//         }
//         @attribute({ type: 'string' }) test;
//       }

//       @initialize
//       @mixin(LeanES.NS.QueryableResourceMixin)
//       @partOf(Test)
//       class TestResource extends LeanES.NS.Resource {
//         @nameBy static __filename = 'TestResource';
//         @meta static object = {};
//         @property entityName = 'TestEntity'
//       }

//       @initialize
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @mixin(LeanES.NS.GenerateUuidIdMixin)
//       @partOf(Test)
//       class TestCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'TestCollection';
//         @meta static object = {};
//         @method async parseQuery(aoQuery) {
//           if (aoQuery.$filter != null) {
//             if (aoQuery.$filter['$and'] != null) {
//               aoQuery.$filter = aoQuery.$filter.$and.reduce(function (prev, cur) {
//                 for (const k in cur) {
//                   if (!hasProp.call(cur, k)) continue;
//                   const v = cur[k];
//                   prev[k] = v;
//                 }
//                 return prev;
//               }, {});
//             }
//             aoQuery.$filter = _.mapKeys(aoQuery.$filter, function (value, key) {
//               return key.replace('@doc.', '');
//             });
//           }
//           return await aoQuery;
//         }
//         @method async takeAll() {
//           return await LeanES.NS.Cursor.new(this, this.getData().data);
//         }
//         @method async executeQuery(aoParsedQuery) {
//           const data = _.filter(this.getData().data, _.matches(aoParsedQuery.$filter));
//           return await LeanES.NS.Cursor.new(this, data);
//         }
//         @method push(aoRecord) {
//           const item = aoRecord.toJSON();
//           this.getData().data.push(item);
//           return aoRecord;
//         }
//       }

//       class MyResponse extends EventEmitter {
//         _headers = {}
//         getHeaders() {
//           return LeanES.NS.Utils.copy(this._headers);
//         }

//         getHeader(field) {
//           return this._headers[field.toLowerCase()];
//         }

//         setHeader(field, value) {
//           this._headers[field.toLowerCase()] = value;
//         }

//         removeHeader(field) {
//           delete this._headers[field.toLowerCase()];
//         }

//         end(data, encoding = 'utf-8', callback = () => { }) {
//           this.finished = true;
//           this.emit('finish', data != null ? typeof data.toString === "function" ? data.toString(encoding) : void 0 : void 0);
//           callback();
//         }

//         constructor(...args) {
//           super(...args);
//           this.finished = false;
//           this._headers = {};
//         }
//       };
//       const req = {
//         method: 'GET',
//         url: 'http://localhost:8888/space/SPASE123/test_entity_ID123456',
//         headers: {
//           'x-forward-for': '192.168.0.1'
//         }
//       }

//       const res = new MyResponse();
//       const router = TestRouter.new();
//       router.setName('TEST_SWITCH_ROUTER');
//       facade.registerProxy(router);

//       @initialize
//       @partOf(Test)
//       class TestSwitch extends LeanES.NS.Switch {
//         @nameBy static __filename = 'TestSwitch';
//         @meta static object = {};
//         @property routerName = 'TEST_SWITCH_ROUTER'
//       }
//       const switchM = TestSwitch.new();
//       switchM.setName('TEST_SWITCH_MEDIATOR');
//       facade.registerMediator(switchM);
//       const switchMediator = facade.retrieveMediator('TEST_SWITCH_MEDIATOR');
//       const COLLECTION_NAME = 'TestEntitiesCollection';
//       const col = TestCollection.new();
//       col.setName(COLLECTION_NAME);
//       col.setData({
//         delegate: 'TestRecord',
//         serializer: LeanES.NS.Serializer,
//         data: []
//       });
//       facade.registerProxy(col);
//       const collection = facade.retrieveProxy(COLLECTION_NAME);
//       await collection.create({
//         test: 'test1',
//         isHidden: false
//       });
//       await collection.create({
//         test: 'test2',
//         isHidden: false
//       });
//       let resource = TestResource.new();
//       resource.initializeNotifier(KEY);
//       let context = Test.NS.Context.new(switchMediator, req, res);
//       let result = await resource.list(context);
//       assert.deepEqual(result.meta, {
//         pagination: {
//           limit: 50,
//           offset:0
//         }
//       });
//       assert.propertyVal(result.items[0], 'test', 'test1');
//       assert.propertyVal(result.items[1], 'test', 'test2');
//       req.url = 'http://localhost:8888/space/SPACE123/test_entity/ID123456?query={"$filter":{"@doc.test":"test2"}}';
//       resource = TestResource.new();
//       resource.initializeNotifier(KEY);
//       context = Test.NS.Context.new(switchMediator, req, res);
//       result = await resource.list(context);
//       // console.log('/,./,./,./,./,./,./,./1111', result);
//       assert.propertyVal(result.items[0], 'test', 'test2')
//     })
//   })
// })
