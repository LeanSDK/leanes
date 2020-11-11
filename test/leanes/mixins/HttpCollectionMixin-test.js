//leanes-queryable-addon (QueryableHttpCollectionMixin)


// const { expect, assert } = require('chai');
// const sinon = require('sinon');
// const _ = require('lodash');
// const LeanES = require("../../../src/leanes/index.js").default;
// const {
//   initialize, partOf, nameBy, meta, mixin, constant, method, attribute, property
// } = LeanES.NS;

// const commonServerInitializer = require('../../../test/common/server');
// const server = commonServerInitializer({
//   fixture: 'HttpCollectionMixin'
// });

// describe('HttpCollectionMixin', () => {
//   describe('.new', () => {
//     it('should create HTTP collection instance', () => {
//       const collectionName = 'TestsCollection';

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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       assert.instanceOf(collection, HttpCollection, 'The `collection` is not an instance of HttpCollection')
//     });
//   });
//   describe('.sendRequest', () => {
//     let facade = null;
//     before(() => {
//       server.listen(8000);
//     });
//     afterEach(async () => {
//       await new Promise((resolve) => server.close(resolve))
//       facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
//     });
//     it('should make simple request', async () => {
//       const collectionName = 'TestsCollection';
//       const KEY = 'FACADE_TEST_HTTP_COLLECTION_000';
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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       facade.registerProxy(collection);
//       assert.instanceOf(collection, HttpCollection, 'The `collection` is not an instance of HttpCollection');
//       const data = await collection.sendRequest(
//         'GET',
//         'http://localhost:8000',
//         {
//           responseType: 'json',
//           headers: {}
//         }
//       );
//       assert.equal(data.status, 200);
//       assert.equal((data.body != null ? data.body.message : ''), 'OK')
//     });
//   });
//   describe('.requestHashToArguments, .makeRequest', () => {
//     let facade = null;
//     before(() => {
//       server.listen(8000);
//     });
//     afterEach(async () => {
//       await new Promise((resolve) => server.close(resolve))
//       facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
//     });
//     it('should make simple request', async () => {
//       const collectionName = 'TestsCollection';
//       const KEY = 'FACADE_TEST_HTTP_COLLECTION_001';
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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       facade.registerProxy(collection);
//       assert.instanceOf(collection, HttpCollection);
//       const hash = collection.requestHashToArguments({
//         method: 'GET',
//         url: 'http://localhost:8000',
//         headers: {},
//         data: null
//       });
//       assert.equal(hash[0], 'GET', 'Method is incorrect');
//       assert.equal(hash[1], 'http://localhost:8000', 'URL is incorrect');
//       assert.equal(hash[2] != null ? hash[2].responseType : void 0, 'json', 'JSON option is not set');
//       const data = await collection.makeRequest({
//         method: 'GET',
//         url: 'http://localhost:8000',
//         headers: {},
//         data: null
//       });
//       assert.equal(data.status, 200, 'Request received not OK status');
//       assert.equal(data != null ? data.body != null ? data.body.message : void 0 : void 0, 'OK', 'Incorrect body');
//     });
//   });
//   describe('.methodForRequest', () => {
//     it('should get method name from request params', () => {
//       const collectionName = 'TestsCollection';

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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       let method = collection.methodForRequest({
//         requestType: 'query',
//         recordName: 'TestRecord'
//       });
//       assert.equal(method, 'POST', 'Find method is incorrect');
//       method = collection.methodForRequest({
//         requestType: 'patchBy',
//         recordName: 'TestRecord'
//       });
//       assert.equal(method, 'POST', 'Insert method is incorrect');
//       method = collection.methodForRequest({
//         requestType: 'removeBy',
//         recordName: 'TestRecord'
//       });
//       assert.equal(method, 'POST', 'Update method is incorrect');
//       method = collection.methodForRequest({
//         requestType: 'takeAll',
//         recordName: 'TestRecord'
//       });
//       assert.equal(method, 'GET', 'Replace method is incorrect');
//       method = collection.methodForRequest({
//         requestType: 'takeBy',
//         recordName: 'TestRecord'
//       });
//       assert.equal(method, 'GET', 'Remove method is incorrect');
//       method = collection.methodForRequest({
//         requestType: 'take',
//         recordName: 'TestRecord'
//       });
//       assert.equal(method, 'GET', 'Find method is incorrect');
//       method = collection.methodForRequest({
//         requestType: 'push',
//         recordName: 'TestRecord'
//       });
//       assert.equal(method, 'POST', 'Insert method is incorrect');
//       method = collection.methodForRequest({
//         requestType: 'remove',
//         recordName: 'TestRecord'
//       });
//       assert.equal(method, 'DELETE', 'Update method is incorrect');
//       method = collection.methodForRequest({
//         requestType: 'override',
//         recordName: 'TestRecord'
//       });
//       assert.equal(method, 'PUT', 'Replace method is incorrect');
//       method = collection.methodForRequest({
//         requestType: 'someOther',
//         recordName: 'TestRecord'
//       });
//       assert.equal(method, 'GET', 'Any other method is incorrect');
//     });
//   });
//   describe('.urlPrefix', () => {
//     it('should get url prefix', () => {
//       const collectionName = 'TestsCollection';

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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       let url = collection.urlPrefix('Test', 'Tests');
//       assert.equal(url, 'Tests/Test');
//       url = collection.urlPrefix('/Test');
//       assert.equal(url, 'http://localhost:8000/Test');
//       url = collection.urlPrefix();
//       assert.equal(url, 'http://localhost:8000/v1');
//     });
//   });
//   describe('.makeURL', () => {
//     it('should get new url by options', () => {
//       const collectionName = 'TestsCollection';

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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       let url = collection.makeURL('Test', null, null, true);
//       assert.equal(url, 'http://localhost:8000/v1/tests/query');
//       url = collection.makeURL('Test', {
//         a: '1'
//       }, null, true);
//       assert.equal(url, 'http://localhost:8000/v1/tests/query?query=%7B%22a%22%3A%221%22%7D');
//       url = collection.makeURL('Test', {
//         a: '1'
//       }, null, false);
//       assert.equal(url, 'http://localhost:8000/v1/tests?query=%7B%22a%22%3A%221%22%7D');
//       url = collection.makeURL('Test', null, '123', false);
//       assert.equal(url, 'http://localhost:8000/v1/tests/123');
//     });
//   });
//   describe('.pathForType', () => {
//     it('should get url for type', () => {
//       const collectionName = 'TestsCollection';

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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       let url = collection.pathForType('Type');
//       assert.equal(url, 'types');
//       url = collection.pathForType('TestRecord');
//       assert.equal(url, 'tests');
//       url = collection.pathForType('test-info');
//       assert.equal(url, 'test_infos');
//     });
//   });
//   describe('.urlForQuery', () => {
//     it('should get url for `query` request', () => {
//       const collectionName = 'TestsCollection';

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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       let url = collection.urlForQuery('Test', {});
//       assert.equal(url, 'http://localhost:8000/v1/tests/query');
//       url = collection.urlForQuery('TestRecord', {});
//       assert.equal(url, 'http://localhost:8000/v1/tests/query');
//     });
//   });
//   describe('.urlForPatchBy', () => {
//     it('should get url for `patch by` request', () => {
//       const collectionName = 'TestsCollection';

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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       let url = collection.urlForPatchBy('Test', {});
//       assert.equal(url, 'http://localhost:8000/v1/tests/query');
//       url = collection.urlForPatchBy('TestRecord', {});
//       assert.equal(url, 'http://localhost:8000/v1/tests/query');
//     });
//   });
//   describe('.urlForRemoveBy', () => {
//     it('should get url for `remove by` request', () => {
//       const collectionName = 'TestsCollection';

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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       let url = collection.urlForRemoveBy('Test', {});
//       assert.equal(url, 'http://localhost:8000/v1/tests/query');
//       url = collection.urlForRemoveBy('TestRecord', {});
//       assert.equal(url, 'http://localhost:8000/v1/tests/query');
//     });
//   });
//   describe('.urlForTakeAll', () => {
//     it('should get url for `take all` request', () => {
//       const collectionName = 'TestsCollection';

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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       let url = collection.urlForTakeAll('Test', {});
//       assert.equal(url, 'http://localhost:8000/v1/tests?query=%7B%7D');
//       url = collection.urlForTakeAll('TestRecord', {});
//       assert.equal(url, 'http://localhost:8000/v1/tests?query=%7B%7D');
//     });
//   });
//   describe('.urlForTakeBy', () => {
//     it('should get url for `take by` request', () => {
//       const collectionName = 'TestsCollection';

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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       let url = collection.urlForTakeBy('Test', {});
//       assert.equal(url, 'http://localhost:8000/v1/tests?query=%7B%7D');
//       url = collection.urlForTakeBy('TestRecord', {});
//       assert.equal(url, 'http://localhost:8000/v1/tests?query=%7B%7D');
//     });
//   });
//   describe('.urlForTake', () => {
//     it('should get url for `take` request', () => {
//       const collectionName = 'TestsCollection';

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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       let url = collection.urlForTake('Test', '123');
//       assert.equal(url, 'http://localhost:8000/v1/tests/123');
//       url = collection.urlForTake('TestRecord', '123');
//       assert.equal(url, 'http://localhost:8000/v1/tests/123');
//     });
//   });
//   describe('.urlForPush', () => {
//     it('should get url for `push` request', () => {
//       const collectionName = 'TestsCollection';

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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       let url = collection.urlForPush('Test', {});
//       assert.equal(url, 'http://localhost:8000/v1/tests');
//       url = collection.urlForPush('TestRecord', {});
//       assert.equal(url, 'http://localhost:8000/v1/tests');
//     });
//   });
//   describe('.urlForRemove', () => {
//     it('should get url for `remove` request', () => {
//       const collectionName = 'TestsCollection';

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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       let url = collection.urlForRemove('Test', '123');
//       assert.equal(url, 'http://localhost:8000/v1/tests/123');
//       url = collection.urlForRemove('TestRecord', '123');
//       assert.equal(url, 'http://localhost:8000/v1/tests/123');
//     });
//   });
//   describe('.urlForOverride', () => {
//     it('should get url for `override` request', () => {
//       const collectionName = 'TestsCollection';

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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       let url = collection.urlForOverride('Test', {}, '123');
//       assert.equal(url, 'http://localhost:8000/v1/tests/123');
//       url = collection.urlForOverride('TestRecord', {}, '123');
//       assert.equal(url, 'http://localhost:8000/v1/tests/123');
//     });
//   });
//   describe('.buildURL', () => {
//     it('should get url from request params', () => {
//       const collectionName = 'TestsCollection';

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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//         @method urlForSomeRequest() {
//           return '';
//         }
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       let url = collection.buildURL('Test', {}, null, 'query', {
//         a: '1'
//       });
//       assert.equal(url, 'http://localhost:8000/v1/tests/query');
//       url = collection.buildURL('Test', {}, null, 'patchBy', {
//         a: '1'
//       });
//       assert.equal(url, 'http://localhost:8000/v1/tests/query');
//       url = collection.buildURL('Test', {}, null, 'removeBy', {
//         a: '1'
//       });
//       assert.equal(url, 'http://localhost:8000/v1/tests/query');
//       url = collection.buildURL('Test', {}, null, 'takeAll', {
//         a: '1'
//       });
//       assert.equal(url, 'http://localhost:8000/v1/tests?query=%7B%22a%22%3A%221%22%7D');
//       url = collection.buildURL('Test', {}, null, 'takeBy', {
//         a: '1'
//       });
//       assert.equal(url, 'http://localhost:8000/v1/tests?query=%7B%22a%22%3A%221%22%7D');
//       url = collection.buildURL('Test', {}, '123', 'take');
//       assert.equal(url, 'http://localhost:8000/v1/tests/123');
//       url = collection.buildURL('Test', {
//         a: '1'
//       }, null, 'push');
//       assert.equal(url, 'http://localhost:8000/v1/tests');
//       url = collection.buildURL('Test', {}, '123', 'remove');
//       assert.equal(url, 'http://localhost:8000/v1/tests/123');
//       url = collection.buildURL('Test', {}, '123', 'override');
//       assert.equal(url, 'http://localhost:8000/v1/tests/123');
//       url = collection.buildURL('Test', {}, null, 'someRequest', {
//         a: '1'
//       });
//       assert.isString(url);
//     });
//   });
//   describe('.urlForRequest', () => {
//     it('should get url from request params', () => {
//       const collectionName = 'TestsCollection';

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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//         @method urlForTest(recordName, query, snapshot, id) {
//           return `TEST_${recordName != null ? recordName : 'RECORD_NAME'}_${id != null ? id : 'RECORD_ID'}_${JSON.stringify(snapshot) != null ? JSON.stringify(snapshot) : 'SNAPSHOT'}_${JSON.stringify(query) != null ? JSON.stringify(query) : 'QUERY'}`;
//         }
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       let url = collection.urlForRequest({
//         recordName: 'Test',
//         snapshot: {},
//         requestType: 'query',
//         query: {},
//         id: '123'
//       });
//       assert.equal(url, 'http://localhost:8000/v1/tests/query');
//       url = collection.urlForRequest({
//         recordName: 'Test',
//         snapshot: {},
//         requestType: 'patchBy',
//         query: {},
//         id: '123'
//       });
//       assert.equal(url, 'http://localhost:8000/v1/tests/query');
//       url = collection.urlForRequest({
//         recordName: 'Test',
//         snapshot: {},
//         requestType: 'removeBy',
//         query: {},
//         id: '123'
//       });
//       assert.equal(url, 'http://localhost:8000/v1/tests/query');
//       url = collection.urlForRequest({
//         recordName: 'Test',
//         snapshot: {},
//         requestType: 'takeAll',
//         query: {},
//         id: '123'
//       });
//       assert.equal(url, 'http://localhost:8000/v1/tests?query=%7B%7D');
//       url = collection.urlForRequest({
//         recordName: 'Test',
//         snapshot: {},
//         requestType: 'takeBy',
//         query: {},
//         id: '123'
//       });
//       assert.equal(url, 'http://localhost:8000/v1/tests?query=%7B%7D');
//       url = collection.urlForRequest({
//         recordName: 'Test',
//         snapshot: {},
//         requestType: 'take',
//         query: {},
//         id: '123'
//       });
//       assert.equal(url, 'http://localhost:8000/v1/tests/123');
//       url = collection.urlForRequest({
//         recordName: 'Test',
//         snapshot: {},
//         requestType: 'push',
//         query: {},
//         id: '123'
//       });
//       assert.equal(url, 'http://localhost:8000/v1/tests');
//       url = collection.urlForRequest({
//         recordName: 'Test',
//         snapshot: {},
//         requestType: 'remove',
//         query: {},
//         id: '123'
//       });
//       assert.equal(url, 'http://localhost:8000/v1/tests/123');
//       url = collection.urlForRequest({
//         recordName: 'Test',
//         snapshot: {},
//         requestType: 'override',
//         query: {},
//         id: '123'
//       });
//       assert.equal(url, 'http://localhost:8000/v1/tests/123');
//       url = collection.urlForRequest({
//         recordName: 'Test',
//         snapshot: {},
//         requestType: 'test',
//         query: {},
//         id: '123'
//       });
//       assert.equal(url, 'TEST_Test_123_{}_{}');
//     });
//   });
//   describe('.headersForRequest', () => {
//     it('should get headers for collection', () => {
//       const collectionName = 'TestsCollection';
//       const KEY = 'TEST_HTTP_COLLECTION_123456';
//       const facade = LeanES.NS.Facade.getInstance(KEY);

//       @initialize
//       class Test extends LeanES {
//         @nameBy static __filename = 'Test';
//         @meta static object = {};
//         @constant ROOT = `${__dirname}/config/root`;
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
//       const configs = LeanES.NS.Configuration.new();
//       configs.setName(LeanES.NS.CONFIGURATION);
//       configs.setData(Test.NS.ROOT);
//       facade.registerProxy(configs);

//       @initialize
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       collection.initializeNotifier(KEY);
//       let headers = collection.headersForRequest({
//         requestType: 'query',
//         recordName: 'test'
//       });
//       assert.deepEqual(headers, {
//         'Accept': 'application/json',
//         // 'Authorization': `Bearer ${configs.apiKey}`
//       });
//       headers = collection.headersForRequest({
//         requestType: 'patchBy',
//         recordName: 'test'
//       });
//       assert.deepEqual(headers, {
//         'Accept': 'application/json',
//         // 'Authorization': `Bearer ${configs.apiKey}`
//       });
//       headers = collection.headersForRequest({
//         requestType: 'removeBy',
//         recordName: 'test'
//       });
//       assert.deepEqual(headers, {
//         'Accept': 'application/json',
//         // 'Authorization': `Bearer ${configs.apiKey}`
//       });
//       headers = collection.headersForRequest({
//         requestType: 'takeAll',
//         recordName: 'test'
//       });
//       assert.deepEqual(headers, {
//         'Accept': 'application/json',
//         // 'Authorization': `Bearer ${configs.apiKey}`,
//         // 'NonLimitation': configs.apiKey
//       });
//       headers = collection.headersForRequest({
//         requestType: 'takeBy',
//         recordName: 'test'
//       });
//       assert.deepEqual(headers, {
//         'Accept': 'application/json',
//         // 'Authorization': `Bearer ${configs.apiKey}`,
//         // 'NonLimitation': configs.apiKey
//       });
//       headers = collection.headersForRequest({
//         requestType: 'take',
//         recordName: 'test'
//       });
//       assert.deepEqual(headers, {
//         'Accept': 'application/json',
//         // 'Authorization': `Bearer ${configs.apiKey}`
//       });
//       headers = collection.headersForRequest({
//         requestType: 'push',
//         recordName: 'test'
//       });
//       assert.deepEqual(headers, {
//         'Accept': 'application/json',
//         // 'Authorization': `Bearer ${configs.apiKey}`
//       });
//       headers = collection.headersForRequest({
//         requestType: 'remove',
//         recordName: 'test'
//       });
//       assert.deepEqual(headers, {
//         'Accept': 'application/json',
//         // 'Authorization': `Bearer ${configs.apiKey}`
//       });
//       headers = collection.headersForRequest({
//         requestType: 'override',
//         recordName: 'test'
//       });
//       assert.deepEqual(headers, {
//         'Accept': 'application/json',
//         // 'Authorization': `Bearer ${configs.apiKey}`
//       });
//       collection.headers = {
//         'Allow': 'GET'
//       };
//       headers = collection.headersForRequest();
//       assert.deepEqual(headers, {
//         'Accept': 'application/json',
//         // 'Authorization': `Bearer ${configs.apiKey}`,
//         'Allow': 'GET'
//       });
//     });
//   });
//   describe('.dataForRequest', () => {
//     it('should get data for request', () => {
//       const collectionName = 'TestsCollection';

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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       let data = collection.dataForRequest({
//         requestType: 'push',
//         recordName: 'TestRecord',
//         snapshot: {
//           name: 'test1'
//         }
//       });
//       assert.deepEqual(data, {
//         name: 'test1'
//       });
//       data = collection.dataForRequest({
//         requestType: 'override',
//         recordName: 'TestRecord',
//         snapshot: {
//           name: 'test2'
//         }
//       });
//       assert.deepEqual(data, {
//         name: 'test2'
//       });
//       data = collection.dataForRequest({
//         requestType: 'query',
//         recordName: 'TestRecord',
//         query: {
//           name: 'test3'
//         }
//       });
//       assert.deepEqual(data, {
//         query: {
//           name: 'test3'
//         }
//       });
//       data = collection.dataForRequest({
//         requestType: 'patchBy',
//         recordName: 'TestRecord',
//         query: {
//           name: 'test4'
//         }
//       });
//       assert.deepEqual(data, {
//         query: {
//           name: 'test4'
//         }
//       });
//       data = collection.dataForRequest({
//         requestType: 'removeBy',
//         recordName: 'TestRecord',
//         query: {
//           name: 'test5'
//         }
//       });
//       assert.deepEqual(data, {
//         query: {
//           name: 'test5'
//         }
//       });
//     });
//   });
//   describe('.requestFor', () => {
//     let facade = null;
//     afterEach(async () => {
//       facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
//     });
//     it('should request params', () => {
//       const collectionName = 'TestsCollection';
//       const KEY = 'TEST_HTTP_COLLECTION_654321';
//       facade = LeanES.NS.Facade.getInstance(KEY);

//       @initialize
//       class Test extends LeanES {
//         @nameBy static __filename = 'Test';
//         @meta static object = {};
//         @constant ROOT = `${__dirname}/config/root`;
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
//       const configs = LeanES.NS.Configuration.new();
//       configs.setName(LeanES.NS.CONFIGURATION);
//       configs.setData(Test.NS.ROOT);
//       facade.registerProxy(configs);

//       @initialize
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       facade.registerProxy(collection);
//       const sampleData = {
//         name: 'test'
//       };
//       let request = collection.requestFor({
//         recordName: 'TestRecord',
//         snapshot: void 0,
//         requestType: 'takeAll',
//         query: {
//           name: 'test'
//         }
//       });
//       assert.deepEqual(request, {
//         method: 'GET',
//         url: 'http://localhost:8000/v1/tests?query=%7B%22name%22%3A%22test%22%7D',
//         headers: {
//           'Accept': 'application/json',
//           // 'Authorization': `Bearer ${configs.apiKey}`,
//           // 'NonLimitation': configs.apiKey
//         },
//         data: void 0
//       });
//       request = collection.requestFor({
//         recordName: 'TestRecord',
//         snapshot: sampleData,
//         requestType: 'push'
//       });
//       assert.deepEqual(request, {
//         method: 'POST',
//         url: 'http://localhost:8000/v1/tests',
//         headers: {
//           'Accept': 'application/json',
//           // 'Authorization': `Bearer ${configs.apiKey}`
//         },
//         data: sampleData
//       });
//       request = collection.requestFor({
//         recordName: 'TestRecord',
//         snapshot: sampleData,
//         requestType: 'override',
//         id: '123'
//       });
//       assert.deepEqual(request, {
//         method: 'PUT',
//         url: 'http://localhost:8000/v1/tests/123',
//         headers: {
//           'Accept': 'application/json',
//           // 'Authorization': `Bearer ${configs.apiKey}`
//         },
//         data: sampleData
//       });
//       request = collection.requestFor({
//         recordName: 'TestRecord',
//         requestType: 'remove',
//         query: {
//           name: 'test'
//         },
//         id: '123'
//       });
//       assert.deepEqual(request, {
//         method: 'DELETE',
//         url: 'http://localhost:8000/v1/tests/123',
//         headers: {
//           'Accept': 'application/json',
//           // 'Authorization': `Bearer ${configs.apiKey}`
//         },
//         data: void 0
//       });
//       request = collection.requestFor({
//         recordName: 'TestRecord',
//         snapshot: void 0,
//         requestType: 'take',
//         id: '123'
//       });
//       assert.deepEqual(request, {
//         method: 'GET',
//         url: 'http://localhost:8000/v1/tests/123',
//         headers: {
//           'Accept': 'application/json',
//           // 'Authorization': `Bearer ${configs.apiKey}`
//         },
//         data: void 0
//       });
//       request = collection.requestFor({
//         recordName: 'TestRecord',
//         snapshot: sampleData,
//         requestType: 'query',
//         query: {
//           name: 'test'
//         }
//       });
//       assert.deepEqual(request, {
//         method: 'POST',
//         url: 'http://localhost:8000/v1/tests/query',
//         headers: {
//           'Accept': 'application/json',
//           // 'Authorization': `Bearer ${configs.apiKey}`
//         },
//         data: {
//           query: sampleData
//         }
//       });
//       request = collection.requestFor({
//         recordName: 'TestRecord',
//         snapshot: sampleData,
//         requestType: 'patchBy',
//         query: {
//           name: 'test'
//         }
//       });
//       assert.deepEqual(request, {
//         method: 'POST',
//         url: 'http://localhost:8000/v1/tests/query',
//         headers: {
//           'Accept': 'application/json',
//           // 'Authorization': `Bearer ${configs.apiKey}`
//         },
//         data: {
//           query: sampleData
//         }
//       });
//       request = collection.requestFor({
//         recordName: 'TestRecord',
//         snapshot: sampleData,
//         requestType: 'removeBy',
//         query: {
//           name: 'test'
//         }
//       });
//       assert.deepEqual(request, {
//         method: 'POST',
//         url: 'http://localhost:8000/v1/tests/query',
//         headers: {
//           'Accept': 'application/json',
//           // 'Authorization': `Bearer ${configs.apiKey}`
//         },
//         data: {
//           query: sampleData
//         }
//       });
//     });
//   });
//   describe('.push', () => {
//     let facade = null;
//     before(() => {
//       server.listen(8000);
//     });
//     afterEach(async () => {
//       await new Promise((resolve) => server.close(resolve))
//       facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
//     });
//     it('should put data into collection', async () => {
//       const collectionName = 'TestsCollection';
//       const KEY = 'FACADE_TEST_HTTP_COLLECTION_002';
//       facade = LeanES.NS.Facade.getInstance(KEY);

//       @initialize
//       class Test extends LeanES {
//         @nameBy static __filename = 'Test';
//         @meta static object = {};
//         @constant ROOT = `${__dirname}/config/root`;
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
//       const configs = LeanES.NS.Configuration.new();
//       configs.setName(LeanES.NS.CONFIGURATION);
//       configs.setData(Test.NS.ROOT);
//       facade.registerProxy(configs);

//       @initialize
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       facade.registerProxy(collection);
//       const spyPush = sinon.spy(collection, 'push');
//       const spySendRequest = sinon.spy(collection, 'sendRequest');
//       assert.instanceOf(collection, HttpCollection);
//       const record = await collection.create({
//         test: 'test1'
//       });
//       assert.equal(record, spyPush.args[0][0]);
//       assert.equal(spySendRequest.args[0][0], 'POST');
//       assert.equal(spySendRequest.args[0][1], 'http://localhost:8000/v1/tests');
//       assert.equal(spySendRequest.args[0][2].body.test, 'test1');
//       assert.equal(spySendRequest.args[0][2].body.type, 'Test::TestRecord');
//       assert.deepEqual(spySendRequest.args[0][2].headers, {
//         'Accept': 'application/json',
//         // 'Authorization': `Bearer ${configs.apiKey}`
//       });
//     });
//   });
//   describe('.remove', () => {
//     let facade = null;
//     before(() => {
//       server.listen(8000);
//     });
//     afterEach(async () => {
//       await new Promise((resolve) => server.close(resolve))
//       facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
//     });
//     it('should remove data from collection', async () => {
//       const collectionName = 'TestsCollection';
//       const KEY = 'FACADE_TEST_HTTP_COLLECTION_003';
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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//         @method generateId() {
//           return LeanES.NS.Utils.uuid.v4();
//         }
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       facade.registerProxy(collection);
//       const spySendRequest = sinon.spy(collection, 'sendRequest');
//       assert.instanceOf(collection, HttpCollection);
//       const record = await collection.create({
//         test: 'test1'
//       });
//       const resp = await record.destroy();
//       assert.equal(spySendRequest.lastCall.args[0], 'DELETE');
//       assert.equal(spySendRequest.lastCall.args[1], `http://localhost:8000/v1/tests/${record.id}`);
//       assert.deepEqual(spySendRequest.lastCall.args[2].headers, {
//         'Accept': 'application/json'
//       });
//     });
//   });
//   describe('.take', () => {
//     let facade = null;
//     before(() => {
//       server.listen(8000);
//     });
//     afterEach(async () => {
//       await new Promise((resolve) => server.close(resolve))
//       facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
//     });
//     it('should get data item by id from collection', async () => {
//       const collectionName = 'TestsCollection';
//       const KEY = 'FACADE_TEST_HTTP_COLLECTION_004';
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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//         @method generateId() {
//           return LeanES.NS.Utils.uuid.v4();
//         }
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       facade.registerProxy(collection);
//       assert.instanceOf(collection, HttpCollection);
//       const record = await collection.create({
//         test: 'test1'
//       });
//       const recordDuplicate = await collection.take(record.id);
//       assert.notEqual(record, recordDuplicate);
//       const ref = Test.NS.TestRecord.attributes;
//       for (let j = 0; j < ref.length; j++) {
//         const attribute = ref[j];
//         assert.equal(record[attribute], recordDuplicate[attribute]);
//       }
//     });
//   });
//   describe('.takeMany', () => {
//     let facade = null;
//     before(() => {
//       server.listen(8000);
//     });
//     afterEach(async () => {
//       await new Promise((resolve) => server.close(resolve))
//       facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
//     });
//     it('should get data items by id list from collection', async () => {
//       const collectionName = 'TestsCollection';
//       const KEY = 'FACADE_TEST_HTTP_COLLECTION_005';
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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//         @method generateId() {
//           return LeanES.NS.Utils.uuid.v4();
//         }
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       facade.registerProxy(collection);
//       assert.instanceOf(collection, HttpCollection);
//       const originalRecords = [];
//       for (let i = 1; i <= 5; i++) {
//         originalRecords.push(await collection.create({
//           test: 'test1'
//         }));
//       }
//       const ids = originalRecords.map((item) => {
//         return item.id;
//       });
//       const recordDuplicates = await (await collection.takeMany(ids)).toArray();
//       assert.equal(originalRecords.length, recordDuplicates.length);
//       const count = originalRecords.length;
//       let k;
//       for (let i = k = 1; (1 <= count ? k <= count : k >= count); i = 1 <= count ? ++k : --k) {
//         const ref1 = Test.NS.TestRecord.attributes;
//         for (let l = 0; l < ref1.length; l++) {
//           const attribute = ref1[l];
//           assert.equal(originalRecords[i][attribute], recordDuplicates[i][attribute]);
//         }
//       }
//     });
//   });
//   describe('.takeBy', () => {
//     let facade = null;
//     before(() => {
//       server.listen(8000);
//     });
//     afterEach(async () => {
//       await new Promise((resolve) => server.close(resolve))
//       facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
//     });
//     it('should get data items by id list from collection', async () => {
//       const collectionName = 'TestsCollection';
//       const KEY = 'FACADE_TEST_HTTP_COLLECTION_006';
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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//         @method generateId() {
//           return LeanES.NS.Utils.uuid.v4();
//         }
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       facade.registerProxy(collection);
//       assert.instanceOf(collection, HttpCollection);
//       const count = 5;
//       let j;
//       for (let i = j = 1; (1 <= count ? j <= count : j >= count); i = 1 <= count ? ++j : --j) {
//         await collection.create({
//           test: 'test1'
//         });
//       }
//       let k;
//       for (let i = k = 1; (1 <= count ? k <= count : k >= count); i = 1 <= count ? ++k : --k) {
//         await collection.create({
//           test: 'test2'
//         });
//       }
//       const records = await (await collection.takeBy({
//         '@doc.test': 'test2'
//       })).toArray();
//       assert.lengthOf(records, count);
//       for (let l = 0; l < records.length; l++) {
//         const record = records[l];
//         assert.propertyVal(record, 'test', 'test2');
//       }
//     });
//   });
//   describe('.takeAll', () => {
//     let facade = null;
//     before(() => {
//       server.listen(8000);
//     });
//     afterEach(async () => {
//       await new Promise((resolve) => server.close(resolve))
//       facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
//     });
//     it('should get all data items from collection', async () => {
//       const collectionName = 'TestsCollection';
//       const KEY = 'FACADE_TEST_HTTP_COLLECTION_007';
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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//         @method generateId() {
//           return LeanES.NS.Utils.uuid.v4();
//         }
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       facade.registerProxy(collection);
//       assert.instanceOf(collection, HttpCollection);
//       const originalRecords = [];
//       for (let i = 1; i <= 5; i++) {
//         originalRecords.push(await collection.create({
//           test: 'test1'
//         }));
//       }
//       const ids = originalRecords.map(function (item) {
//         return item.id;
//       });
//       const recordDuplicates = await (await collection.takeAll()).toArray();
//       assert.equal(originalRecords.length, recordDuplicates.length);
//       const count = originalRecords.length;
//       let k;
//       for (let i = k = 1; (1 <= count ? k <= count : k >= count); i = 1 <= count ? ++k : --k) {
//         const ref1 = Test.NS.TestRecord.attributes;
//         for (let l = 0; l < ref1.length; l++) {
//           const attribute = ref1[l];
//           assert.equal(originalRecords[i][attribute], recordDuplicates[i][attribute]);
//         }
//       }
//     });
//   });
//   describe('.override', () => {
//     let facade = null;
//     before(() => {
//       server.listen(8000);
//     });
//     afterEach(async () => {
//       await new Promise((resolve) => server.close(resolve))
//       facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
//     });
//     it('should replace data item by id in collection', async () => {
//       const collectionName = 'TestsCollection';
//       const KEY = 'FACADE_TEST_HTTP_COLLECTION_008';
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
//       class TestRecord extends LeanES.NS.Record {
//         @nameBy static __filename = 'TestRecord';
//         @meta static object = {};
//         @attribute({ type: 'string' }) name;
//         constructor() {
//           super(...arguments);
//           this.type = 'Test::TestRecord';
//         }
//       }

//       @initialize
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//         @method generateId() {
//           return LeanES.NS.Utils.uuid.v4();
//         }
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       facade.registerProxy(collection);
//       assert.instanceOf(collection, HttpCollection);
//       const record = await collection.create({
//         name: 'test1'
//       });
//       const updatedRecord = await collection.override(record.id, await collection.build({
//         name: 'test2'
//       }));
//       assert.isDefined(updatedRecord);
//       assert.equal(record.id, updatedRecord.id);
//       assert.propertyVal(record, 'name', 'test1');
//       assert.propertyVal(updatedRecord, 'name', 'test2');
//     });
//   });
//   describe('.includes', () => {
//     let facade = null;
//     before(() => {
//       server.listen(8000);
//     });
//     afterEach(async () => {
//       await new Promise((resolve) => server.close(resolve))
//       facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
//     });
//     it('should test if item is included in the collection', async () => {
//       const collectionName = 'TestsCollection';
//       const KEY = 'FACADE_TEST_HTTP_COLLECTION_009';
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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//         @method generateId() {
//           return LeanES.NS.Utils.uuid.v4();
//         }
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       facade.registerProxy(collection);
//       assert.instanceOf(collection, HttpCollection);
//       const record = await collection.create({
//         test: 'test1'
//       });
//       assert.isDefined(record);
//       const includes = await collection.includes(record.id);
//       assert.isTrue(includes);
//     });
//   });
//   describe('.length', () => {
//     let facade = null;
//     before(() => {
//       server.listen(8000);
//     });
//     afterEach(async () => {
//       await new Promise((resolve) => server.close(resolve))
//       facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
//     });
//     it('should count items in the collection', async () => {
//       const collectionName = 'TestsCollection';
//       const KEY = 'FACADE_TEST_HTTP_COLLECTION_010';
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
//       @mixin(LeanES.NS.HttpCollectionMixin)
//       @mixin(LeanES.NS.QueryableCollectionMixin)
//       @mixin(LeanES.NS.GenerateUuidIdMixin)
//       @partOf(Test)
//       class HttpCollection extends LeanES.NS.Collection {
//         @nameBy static __filename = 'HttpCollection';
//         @meta static object = {};
//         @property host = 'http://localhost:8000';
//         @property namespace = 'v1';
//         @method generateId() {
//           return LeanES.NS.Utils.uuid.v4();
//         }
//       }
//       const collection = HttpCollection.new();
//       collection.setName(collectionName);
//       collection.setData({
//         delegate: 'TestRecord'
//       });
//       facade.registerProxy(collection);
//       assert.instanceOf(collection, HttpCollection);
//       const count = 11;
//       let j;
//       for (let i = j = 1; (1 <= count ? j <= count : j >= count); i = 1 <= count ? ++j : --j) {
//         await collection.create({
//           test: 'test1'
//         });
//       }
//       const length = await collection.length();
//       assert.equal(count, length);
//     });
//   });
// });
