const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const path = process.env.ENV === 'build' ? "../../lib/index.dev" : "../../src/index.js";
const LeanES = require(path).default;
const { Line, Pipe, PipeMessage, LineControlMessage } = LeanES.NS.Pipes.NS;

describe('Line', () => {
  describe('.new', () => {
    it('should create new Line instance', () => {
      expect(() => {
        const voOutput = Pipe.new();
        const queue = Line.new(voOutput);
        assert.equal(queue._output, voOutput, 'Output object is lost');
      }).to.not.throw(Error);
    });
  });
  describe('.write', () => {
    it('should get message with type `LeanES.NS.PipeMessage.NORMAL` and store it', async () => {
      const voOutput = Pipe.new();
      const queue = Line.new(voOutput);
      const message = PipeMessage.new(PipeMessage.NORMAL);
      await queue.write(message);
      assert.equal(queue._messages[0], message, 'Message was not saved');
    });
    it('should get message with type `LeanES.NS.LineControlMessage.FLUSH` and flush queue', async () => {
      const length = 3;
      const voOutput = Pipe.new();
      const  spyOutputWrite = sinon.spy(voOutput, 'write');
      const queue = Line.new(voOutput);
      let message = PipeMessage.new(PipeMessage.NORMAL);
      let j;
      for (let i = j = 1, ref = length; (1 <= ref ? j <= ref : j >= ref); i = 1 <= ref ? ++j : --j) {
        await queue.write(message);
      }
      assert.equal(queue._messages.length, length, 'Messages were not saved');
      message = LineControlMessage.new(LineControlMessage.FLUSH);
      await queue.write(message);
      assert.equal(queue._messages.length, 0, 'Messages not flushed');
      assert.equal(spyOutputWrite.callCount, length, 'Message not queued');
    });
    it('should get message with type `LeanES.NS.LineControlMessage.SORT` and fill queue', async () => {
      const length = 3;
      const voOutput = Pipe.new();
      const queue = Line.new(voOutput);
      let message = LineControlMessage.new(LineControlMessage.SORT);
      await queue.write(message);
      let j;
      for (let i = j = 1, ref = length; (1 <= ref ? j <= ref : j >= ref); i = 1 <= ref ? ++j : --j) {
        message = PipeMessage.new(PipeMessage.NORMAL, null, {
          [i]: `MESSAGE_${i}`
        }, length - i);
        await queue.write(message);
      }
      assert.deepEqual(queue._messages[0].getBody(), {
        3: 'MESSAGE_3'
      }, 'Message 0 is incorrect');
      assert.deepEqual(queue._messages[1].getBody(), {
        2: 'MESSAGE_2'
      }, 'Message 1 is incorrect');
      assert.deepEqual(queue._messages[2].getBody(), {
        1: 'MESSAGE_1'
      }, 'Message 2 is incorrect');
    });
    it('should get message with type `LeanES.NS.LineControlMessage.FIFO` and fill queue', async () => {
      const length = 3;
      const voOutput = Pipe.new();
      const queue = Line.new(voOutput);
      let message = LineControlMessage.new(LineControlMessage.FIFO);
      await queue.write(message);
      let j;
      for (let i = j = 1, ref = length; (1 <= ref ? j <= ref : j >= ref); i = 1 <= ref ? ++j : --j) {
        message = PipeMessage.new(PipeMessage.NORMAL, null, {
          [i]: `MESSAGE_${i}`
        }, length - i);
        await queue.write(message);
      }
      assert.deepEqual(queue._messages[0].getBody(), {
        1: 'MESSAGE_1'
      }, 'Message 0 is incorrect');
      assert.deepEqual(queue._messages[1].getBody(), {
        2: 'MESSAGE_2'
      }, 'Message 1 is incorrect');
      assert.deepEqual(queue._messages[2].getBody(), {
        3: 'MESSAGE_3'
      }, 'Message 2 is incorrect');
    });
  });
});
