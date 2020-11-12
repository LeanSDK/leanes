const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const path = process.env.ENV === 'dev' ? "../../lib/index.dev" : "../../src/leanes/index.js";
const LeanES = require(path).default;
const {
  CoreObject, Proto,
  initialize, partOf, nameBy, meta
} = LeanES.NS;

console.log('ENV _________________________ ', process.env.ENV);


describe('CoreObject', () => {
  describe('constructor', () => {
    it('should be created (via `.new` operator)', () => {
      expect(new CoreObject()).to.be.an.instanceof(CoreObject);
    });
    it('should be created (Test Module)', () => {
      expect(() => {
        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
        }

        @initialize
        @partOf(Test)
        class SubTest extends CoreObject {
        }
        const subTest = new SubTest()
      }).to.not.throw()
    });
  });

  describe('.new', () => {
    it('should be created (via `.new` method)', () => {
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class SubTest extends CoreObject {
      }
      expect(SubTest.new()).to.be.an.instanceof(SubTest);
    });
  });

  describe('call method class', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
      sandbox.spy(CoreObject.class);
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('should have class (static)', () => {
      expect(CoreObject.class()).to.equal(Proto);
    })

    it('should have class (Test Module)', async () => {
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class SubTest extends CoreObject {
      }

      expect(SubTest.class()).to.equal(Proto);
    })
  });

  describe('call method class (instance)', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
      sandbox.spy(CoreObject.new);
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('should have class (instance)', () => {
      expect(CoreObject.new().class()).to.equal(CoreObject);
    });

    it('should have class (Test Module)', () => {
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class SubTest extends CoreObject {
      }

      expect(SubTest.new().class()).to.equal(SubTest)
    });
  });

  describe('.replicateObject', () => {
    it('should replicate specified class', async () => {
      const instance = CoreObject.new();
      const replica = await CoreObject.replicateObject(instance);
      assert.equal(replica.type, 'instance', 'Replica type isn`t instance')
      assert.equal(replica.class, 'CoreObject', 'Class name is different')
    })
    it('should replicate specified class (Test Module)', async () => {
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class MyClass extends Test.NS.CoreObject {
      }

      const instance = MyClass.new();
      const replica = await MyClass.replicateObject(instance);
      assert.equal(replica.type, 'instance', 'Replica type isn`t instance')
      assert.equal(replica.class, 'MyClass', 'Class name is different')
    })
  });

  describe('.restoreObject', () => {
    it('should restore specified class by replica', async () => {
      const voRestored = await LeanES.restoreObject(LeanES, { type: 'instance', class: 'CoreObject' })
      assert.equal(voRestored.constructor, CoreObject, 'Restored instance constructor is not CoreObject')
    })
    it('should restore specified class by replica (Test Module)', async () => {
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class MyClass extends Test.NS.CoreObject {
        @nameBy static __filename = 'MyClass';
        @meta static object = {};
      }

      const voRestored = await Test.restoreObject(Test, { type: 'instance', class: 'MyClass' })
      assert.equal(voRestored.constructor, MyClass, 'Restored instance constructor is not MyClass')
    })
  });

  describe('call method wrap', () => {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
      sandbox.spy(CoreObject.wrap);
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('should have wrap', () => {
      expect(CoreObject.wrap.bind(CoreObject, [() => { }])).to.not.throw();
    })
  })

  describe('.superclass', () => {
    it('should have superclass', async () => {
      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @partOf(Test)
      class SubTest extends CoreObject {
      }

      @partOf(Test)
      class SubSubTest extends SubTest {
      }

      assert(SubSubTest.superclass() === SubTest, 'SubSubTest inheritance broken');
      assert(SubTest.superclass() === CoreObject, 'SubTest inheritance broken');
    })
  });
});
