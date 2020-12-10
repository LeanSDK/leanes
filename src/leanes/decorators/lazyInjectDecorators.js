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

import assert from 'assert';

const INJECTION = Symbol.for("INJECTION");

function _proxyGetter(
  proto: any,
  key: string,
  resolve: () => any,
  doCache: boolean
) {
  function getter() {
    if (doCache && !Reflect.hasMetadata(INJECTION, this, key)) {
      Reflect.defineMetadata(INJECTION, resolve(), this, key);
    }
    if (Reflect.hasMetadata(INJECTION, this, key)) {
      return Reflect.getMetadata(INJECTION, this, key);
    } else {
      return resolve();
    }
  }

  function setter(newVal: any) {
    Reflect.defineMetadata(INJECTION, newVal, this, key);
  }

  Reflect.defineProperty(proto, key, {
    configurable: true,
    enumerable: true,
    get: getter,
    set: setter
  });
}

function lazyInject(serviceIdentifier, opts: ?object = {}) {
  return function(proto: any, key: string): void {
    const resolve = () => {
      assert(this._container != null, `Instance of ${proto.constructor.name} should has '_container' property with current Container instance`);
      return this._container.get(serviceIdentifier);
    };
    const doCache = opts.doCache != null ? opts.doCache : true;
    _proxyGetter(proto, key, resolve, doCache);
  };
};

function lazyInjectNamed(serviceIdentifier, named: string, opts: ?object = {}) {
  return function(proto: any, key: string): void {
    const resolve = () => {
      assert(this._container != null, `Instance of ${proto.constructor.name} should has '_container' property with current Container instance`);
      return this._container.getNamed(serviceIdentifier, named);
    };
    const doCache = opts.doCache != null ? opts.doCache : true;
    _proxyGetter(proto, key, resolve, doCache);
  };
};

function lazyInjectTagged(serviceIdentifier, key: string, value: any, opts: ?object = {}) {
  return function(proto: any, key: string): void {
    const resolve = () => {
      assert(this._container != null, `Instance of ${proto.constructor.name} should has '_container' property with current Container instance`);
      return this._container.getTagged(serviceIdentifier, key, value);
    };
    const doCache = opts.doCache != null ? opts.doCache : true;
    _proxyGetter(proto, key, resolve, doCache);
  };
};

function lazyMultiInject(serviceIdentifier, opts: ?object = {}) {
  return function(proto: any, key: string): void {
    const resolve = () => {
      assert(this._container != null, `Instance of ${proto.constructor.name} should has '_container' property with current Container instance`);
      return this._container.getAll(serviceIdentifier);
    };
    const doCache = opts.doCache != null ? opts.doCache : true;
    _proxyGetter(proto, key, resolve, doCache);
  };
};

export {
  lazyInject,
  lazyInjectNamed,
  lazyInjectTagged,
  lazyMultiInject
}
