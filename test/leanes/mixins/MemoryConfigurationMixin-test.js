// leanes-configurable-addon


// const chai = require("chai");
// const expect = chai.expect;
// const assert = chai.assert;
// const LeanES = require("../../../src/leanes/index.js").default;
// const {
//   initialize, partOf, nameBy, resolver, meta, attribute, mixin, constant
// } = LeanES.NS;

// describe('MemoryConfigurationMixin', () => {
//    describe('defineConfigProperties', () => {
//      it('should define configuration properties', () => {
//        @initialize
//        class Test extends LeanES {
//          @nameBy static  __filename = 'Test';
//          @meta static object = {};
//          @constant ROOT = `${__dirname}/config/root`;
//        }

//        @initialize
//        @mixin(LeanES.NS.MemoryConfigurationMixin)
//        @partOf(Test)
//        class TestConfiguration extends LeanES.NS.Proxy {
//          @nameBy static  __filename = 'TestConfiguration';
//          @meta static object = {};
//        }

//       const config = TestConfiguration.new();
//       config.setName('TEST_CONFIG');
//       config.setData({
//         test1: {
//           description: 'test1 description',
//           type: 'string',
//           default: 'Test1'
//         },
//         test2: {
//           description: 'test2 description',
//           type: 'number',
//           default: 42.42
//         },
//         test3: {
//           description: 'test3 description',
//           type: 'boolean',
//           default: true
//         },
//         test4: {
//           description: 'test4 description',
//           type: 'integer',
//           default: 42
//         },
//         test5: {
//           description: 'test5 description',
//           type: 'json',
//           default: JSON.stringify({
//             test: "test"
//           })
//         },
//         test6: {
//           description: 'test6 description',
//           type: 'password',
//           default: 'testpassword'
//         }
//       });
//       config.defineConfigProperties();
//       assert.propertyVal(config, 'test1', 'Test1');
//       assert.propertyVal(config, 'test2', 42.42);
//       assert.propertyVal(config, 'test3', true);
//       assert.propertyVal(config, 'test4', 42);
//       assert.deepPropertyVal(config, 'test5', '{"test":"test"}');
//       assert.propertyVal(config, 'test6', 'testpassword');
//     });
//   });
// });
