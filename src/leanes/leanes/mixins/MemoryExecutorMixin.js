// This file is part of LeanES.
//
// LeanES is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// LeanES is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with LeanES.  If not, see <https://www.gnu.org/licenses/>.

const hasProp = {}.hasOwnProperty;

import EventEmitter from 'events';
import type { ResqueInterface } from '../interfaces/ResqueInterface';
import type { NotificationInterface } from '../../patternes';

export default (Module) => {
  const {
    SCRIPT_RESULT, START_RESQUE, RESQUE, RESQUE_EXECUTOR,
    initializeMixin, meta, property, method,
    Utils: { _, genRandomAlphaNumbers }
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      // ipoTimer = PointerT(_Class.private({
      @property _timer: ?(object | number) = null;

      // ipbIsStopped = PointerT(_Class.private({
      @property _isStopped: boolean = true;

      // ipoDefinedProcessors = PointerT(_Class.private({
      @property _definedProcessors: {[key: string]: {|
        listener: Function,
        concurrency: number
      |}} = null;

      // ipoConcurrencyCount = PointerT(_Class.private({
      @property _concurrencyCount: {[key: string]: number} = null;

      // ipoResque = PointerT(_Class.private({
      @property _resque: ResqueInterface = null;

      @method fullQueueName(queueName: string): string {
        return this._resque.fullQueueName(queueName);
      }

      @method listNotificationInterests(): string[] {
        return [SCRIPT_RESULT, START_RESQUE];
      }

      @method handleNotification(aoNotification: NotificationInterface) {
        const vsName = aoNotification.getName();
        const voBody = aoNotification.getBody();
        const vsType = aoNotification.getType();
        switch (vsName) {
          case SCRIPT_RESULT:
            this.getViewComponent().emit(vsType, voBody);
            break;
          case START_RESQUE:
            this.start();
        }
      }

      @method onRegister(...args) {
        super.onRegister(...args);
        this.setViewComponent(new EventEmitter());
        this._concurrencyCount = {};
        this._definedProcessors = {};
        this._resque = this.facade.getProxy(RESQUE);
        this.defineProcessors();
      }

      @method async reDefineProcessors() {
        this.stop();
        this._definedProcessors = {};
        await this.defineProcessors();
      }

      @method async defineProcessors() {
        const self = this;
        const ref = await this._resque.allQueues();
        for (const { name, concurrency } of ref) {
          const fullQueueName = this._resque.fullQueueName(name);
          // [let moduleName] = fullQueueName.split('|>');
          //if (moduleName === this.moduleName()) {
          this.define(name, { concurrency }, async function(job, done) {
            const reverse = genRandomAlphaNumbers(32);
            self.getViewComponent().once(reverse, function(aoError) {
              return done(aoError);
            });
            const { scriptName, data } = job.data;
            self.send(scriptName, data, reverse);
          });
          //}
          continue;
        }
      }

      @method onRemove(...args) {
        super.onRemove(...args);
        this.stop();
      }

      @method async cyclePart() {
        const ref = this._definedProcessors;
        for (const queueName in ref) {
          if (!hasProp.call(ref, queueName)) continue;
          const { listener, concurrency } = ref[queueName];
          const currentQC = this._concurrencyCount[queueName];
          const now = Date.now();
          const progressJobs = (await this._resque.progressJobs(queueName));
          for (const job of progressJobs) {
            if ((now - job.startedAt) < job.lockLifetime) {
              job.status = 'scheduled';
            }
          }
          const pendingJobs = (await this._resque.pendingJobs(queueName));
          if (((currentQC != null) && currentQC < concurrency) || (currentQC == null)) {
            for (const job of pendingJobs) {
              if (job.delayUntil < now) {
                listener(job);
              }
              if (currentQC >= concurrency) {
                break;
              }
            }
          }
        }
        this.recursion();
      }

      @method async recursion() {
        if (this._isStopped) {
          return;
        }
        const self = this;
        this._timer = setTimeout(async () => {
          clearTimeout(self._timer);
          return (await self.cyclePart());
        }, 100);
      }

      @method async start() {
        this._isStopped = false;
        await this.recursion();
      }

      @method stop() {
        this._isStopped = true;
        if (this._timer != null) {
          clearTimeout(this._timer);
        }
      }

      @method define(queueName: string, opts: { concurrency: number }, lambda: Function) {
        const { concurrency } = opts;
        const listener = (job) => {
          let base;
          const done = (err) => {
            if (err != null) {
              job.status = 'failed';
              job.reason = err;
            } else {
              job.status = 'completed';
            }
            this._concurrencyCount[queueName] -= 1;
          };
          if ((base = this._concurrencyCount)[queueName] == null) {
            base[queueName] = 0;
          }
          this._concurrencyCount[queueName] += 1;
          job.status = 'running';
          job.startedAt = Date.now();
          lambda(job, done);
        };
        this._definedProcessors[queueName] = { listener, concurrency };
      }
    }
    return Mixin;
  });
}
