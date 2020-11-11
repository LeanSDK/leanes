// leanes-configurable-addon


// const { expect, assert } = require('chai');
// const LeanES = require("../../../src/leanes/index.js").default;
// const {
//   initialize, partOf, nameBy, meta, constant
// } = LeanES.NS;

// describe('Configuration', () => {
//   describe('environment', () => {
//     it('should get environment name', () => {
//       @initialize
//       class Test extends LeanES {
//         @nameBy static  __filename = 'Test';
//         @meta static object = {};
//         @constant ROOT = `${__dirname}/config/`;
//       }

//       @initialize
//       @partOf(Test)
//       class Configuration extends LeanES.NS.Configuration {
//         @nameBy static  __filename = 'Configuration';
//         @meta static object = {};
//       }

//       const configuration = Test.NS.Configuration.new();
//       configuration.setName(LeanES.NS.CONFIGURATION);
//       configuration.setData(Test.NS.ROOT);
//       const environment = configuration.environment;
//       assert.isTrue(environment != null, 'configuration.environment isnt exist');
//       assert.isTrue(environment === LeanES.NS.DEVELOPMENT || environment === LeanES.NS.PRODUCTION);
//     });
//   });
//   describe('defineConfigProperties', () => {
//     it('should setup configuration instance', () => {
//       @initialize
//       class Test extends LeanES {
//         @nameBy static  __filename = 'Test';
//         @meta static object = {};
//         @constant ROOT = `${__dirname}/config`;
//       }

//       @initialize
//       @partOf(Test)
//       class Configuration extends LeanES.NS.Configuration {
//         @nameBy static  __filename = 'Configuration';
//         @meta static object = {};
//       }
//       const configuration = Test.NS.Configuration.new();
//       configuration.setName(LeanES.NS.CONFIGURATION);
//       configuration.setData(Test.NS.ROOT);
//       configuration.defineConfigProperties();
//       assert.propertyVal(configuration, 'test1', 'default');
//       assert.propertyVal(configuration, 'test2', 42);
//       assert.propertyVal(configuration, 'test3', true);
//       assert.propertyVal(configuration, 'test4', 'test');
//     });
//   });
//   describe('onRegister', () => {
//     it('should initiate setup configuration instance', () => {
//       @initialize
//       class Test extends LeanES {
//         @nameBy static  __filename = 'Test';
//         @meta static object = {};
//         @constant ROOT = `${__dirname}/config`;
//       }

//       @initialize
//       @partOf(Test)
//       class Configuration extends LeanES.NS.Configuration {
//         @nameBy static  __filename = 'Configuration';
//         @meta static object = {};
//       }
//       const configuration = Test.NS.Configuration.new();
//       configuration.setName(LeanES.NS.CONFIGURATION);
//       configuration.setData(Test.NS.ROOT);
//       configuration.onRegister();
//       assert.propertyVal(configuration, 'test1', 'default');
//       assert.propertyVal(configuration, 'test2', 42);
//       assert.propertyVal(configuration, 'test3', true);
//       assert.propertyVal(configuration, 'test4', 'test');
//     });
//   });
// });
