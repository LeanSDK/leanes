const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const path = process.env.ENV === 'build' ? "../../lib/index.dev" : "../../src/index.js";
const LeanES = require(path).default;
const { MetaObject } = LeanES.NS;

describe('MetaObject', () => {
  describe('.new', () => {
    it('should create new meta-object', () => {
      expect(() => {
        const target = {};
        const myInstance = new MetaObject(target);
        assert.instanceOf(myInstance, MetaObject, 'Cannot instantiate class MetaObject')
      }).to.not.throw()
    })
  });
  describe('.addMetaData', () => {
    it('should add key with data', () => {
      expect(() => {
        const target = {};
        const myInstance = new MetaObject(target);
        myInstance.addMetaData('testGroup', 'testProp', {'test': 'test1'})
        assert.deepEqual(myInstance.data.testGroup.testProp, {'test': 'test1'}, 'Data not removed')
      }).to.not.throw()
    })
  });
  describe('.removeMetaData', () => {
    it('should remove key with data', () => {
      expect(() => {
        const target = {};
        const myInstance = new MetaObject(target);
        myInstance.addMetaData('testGroup', 'testProp', {'test': 'test1'});
        myInstance.removeMetaData('testGroup', 'testProp')
        assert.isUndefined(myInstance.data.testGroup.testProp, 'Data not removed')
      }).to.not.throw()
    })
  });
  describe('parent', () => {
    it('should create meta-data with parent', () => {
      expect(() => {
        const target = {};
        const target2 = {};
        const myParentInstance = new MetaObject(target);
        const myInstance = new MetaObject(target2, myParentInstance);
        assert.equal(myInstance.parent, myParentInstance, 'Parent is incorrect')
      }).to.not.throw()
    })
  });
  describe('.getGroup', () => {
    it('should retrieve data group from meta-object', () => {
      expect(() => {
        const target = {};
        const myInstance = new MetaObject(target);
        myInstance.addMetaData('testGroup', 'testProp1', {'test': 'test1'});
        myInstance.addMetaData('testGroup', 'testProp2', {'test': 'test2'});
        assert.deepEqual(myInstance.getGroup('testGroup'), {
          'testProp1': {
            'test': 'test1'
          },
          'testProp2': {
            'test': 'test2'
          }
        }, 'Group is incorrect')
      }).to.not.throw()
    })
    it('should retrieve data group from meta-object with parent', () => {
      expect(() => {
        const target = {};
        const target2 = {};
        const myParentInstance = new MetaObject(target);
        myParentInstance.addMetaData('testGroup', 'testProp0', {'test': 'test0'});
        const myInstance = new MetaObject(target2, myParentInstance);
        myInstance.addMetaData('testGroup', 'testProp1', {'test': 'test1'});
        myInstance.addMetaData('testGroup', 'testProp2', {'test': 'test2'});
        assert.deepEqual(myInstance.getGroup('testGroup'), {
          'testProp0': {
            'test': 'test0'
          },
          'testProp1': {
            'test': 'test1'
          },
          'testProp2': {
            'test': 'test2'
          }
        }, 'Group is incorrect')
      }).to.not.throw()
    })
  });
})
