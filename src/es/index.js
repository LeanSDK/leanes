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

import assign from './utils/assign';
import copy from './utils/copy';
import filter from './utils/filter';
import forEach from './utils/forEach';
import instanceOf from './utils/instanceOf';
import isThenable from './utils/isThenable';
import jsonStringify from './utils/jsonStringify';
import map from './utils/map';
import uuid from './utils/uuid';
import isAsync from './utils/isAsync';

import decorator from './decorators/decorator';
import freeze from './decorators/freeze';
import initialize from './decorators/initialize';
import initializeMixin from './decorators/initializeMixin';
import initializePatch from './decorators/initializePatch';
import mixin from './decorators/mixin';
import patch from './decorators/patch';
import plugin from './decorators/plugin';
import meta from './decorators/meta';
import partOf from './decorators/partOf';
import nameBy from './decorators/nameBy';
import constant from './decorators/constant';
import util from './decorators/util';
import method from './decorators/method';
import property from './decorators/property';
import machine from './decorators/machine';
import resolver from './decorators/resolver';
import chains from './decorators/chains';

import loadFiles from './decorators/loadFiles';
import loadUtils from './decorators/loadUtils';

import MetaObject from './MetaObject';
import CoreObject from './CoreObject';

import Proto from './Proto';
import Module from './Module';

import HookedObject from './statemachine/HookedObject';
import State from './statemachine/State';
import Transition from './statemachine/Transition';
import Event from './statemachine/Event';
import StateMachine from './statemachine/StateMachine';
import StateMachineMixin from './mixins/StateMachineMixin';

export type {HookedObjectInterface} from './interfaces/HookedObjectInterface';
export type {TransitionInterface} from './interfaces/TransitionInterface';
export type {EventInterface} from './interfaces/EventInterface';
export type {StateInterface} from './interfaces/StateInterface';
export type {StateMachineInterface} from './interfaces/StateMachineInterface';
export type {CoreObjectInterface} from './interfaces/CoreObjectInterface';

import assert from 'assert';
import lodash from 'lodash';

const inflect = require('i')();

const cpoMetaObject = Symbol.for('~metaObject');
const cphUtilsMap = Symbol.for('~utilsMap');
const cpoUtils = Symbol.for('~utils');
const cphPathMap = Symbol.for('~pathMap');
const cphMigrationsMap = Symbol.for('~migrationsMap');
const cphTemplatesList = Symbol.for('~templatesList');
const cphFilesList = Symbol.for('~filesList');
const cpoNamespace = Symbol.for('~namespace');

const MODULE = Symbol.for('Module');
const CORE_OBJECT = Symbol.for('CoreObject');
const PROTO = Symbol.for('Proto');
const PRODUCTION = 'production';
const DEVELOPMENT = 'development';
const CLASS_KEYS = [
  'arguments', 'name', 'displayName', 'caller', 'length', 'prototype',
  'constructor', '__super__', 'including'
];
const INSTANCE_KEYS = [
  'constructor', '__proto__',
  'arguments', 'caller'
]

@((target) => {
  Reflect.defineProperty(target, 'name', {get: ()=> '_ES'});
  Reflect.defineProperty(target.prototype, 'ROOT', { value: __dirname });
  Reflect.defineProperty(target.prototype, 'ENV', { value: DEVELOPMENT });
  Reflect.defineProperty(target.prototype, 'assert', { value: assert });
  Reflect.defineProperty(target.prototype, 'assign', { value: assign });
  Reflect.defineProperty(target.prototype, 'lodash', { value: lodash });
  Reflect.defineProperty(target.prototype, '_', { value: lodash });
  Reflect.defineProperty(target.prototype, 'inflect', { value: inflect });
  Reflect.defineProperty(target.prototype, 'MODULE', { value: MODULE });
  Reflect.defineProperty(target.prototype, 'CORE_OBJECT', { value: CORE_OBJECT });
  Reflect.defineProperty(target.prototype, 'PROTO', { value: PROTO });
  Reflect.defineProperty(target.prototype, 'PRODUCTION', { value: PRODUCTION });
  Reflect.defineProperty(target.prototype, 'DEVELOPMENT', { value: DEVELOPMENT });
  Reflect.defineProperty(target.prototype, 'CLASS_KEYS', { value: CLASS_KEYS });
  Reflect.defineProperty(target.prototype, 'INSTANCE_KEYS', { value: INSTANCE_KEYS });
  Reflect.defineProperty(target.prototype, 'initialize', { value: initialize });
  Reflect.defineProperty(target.prototype, 'meta', { value: meta });
  Reflect.defineProperty(target.prototype, 'constant', { value: constant });
  Reflect.defineProperty(target.prototype, 'util', { value: util });
  Reflect.defineProperty(target.prototype, 'nameBy', { value: nameBy });

  target.prototype.MetaObject = MetaObject(target);
  target.prototype.CoreObject = CoreObject(target);

  Reflect.defineProperty(target, cpoMetaObject, {
    enumerable: false,
    configurable: true,
    value: target.prototype.MetaObject.new(target, undefined)
  });

  target.prototype.Proto = Proto(target);
  target.prototype.Module = Module(target);
})
class _ES {
  static get isExtensible() {
    return true;
  }
}

@StateMachineMixin
@StateMachine
@Event
@Transition
@State
@HookedObject

@((target) => {
  target.prototype.CoreObject.constructor = target.prototype.Proto;
  target.prototype.MetaObject.constructor = target.prototype.Proto;

  target.prototype.Proto.Module = target;
  target.prototype.CoreObject.Module = target;
  target.prototype.MetaObject.Module = target;
})

@initialize
@resolver(require, name => require(name))
class ES extends _ES.prototype.Module {
  @nameBy static  __filename = 'ES';
  @meta static object = {};

  @constant ROOT = __dirname;
  @constant ENV = DEVELOPMENT;
  @constant MODULE = MODULE;
  @constant CORE_OBJECT = CORE_OBJECT;
  @constant PROTO = PROTO;
  @constant PRODUCTION = PRODUCTION;
  @constant DEVELOPMENT = DEVELOPMENT;
  @constant CLASS_KEYS = CLASS_KEYS;
  @constant INSTANCE_KEYS = INSTANCE_KEYS;

  @util assert = assert;
  @util assign = assign;
  @util copy = copy;
  @util filter = filter;
  @util forEach = forEach;
  @util instanceOf = instanceOf;
  @util isThenable = isThenable;
  @util jsonStringify = jsonStringify;
  @util map = map;
  @util uuid = uuid;
  @util isAsync = isAsync;
  @util lodash = lodash;
  @util _ = lodash;
  @util inflect = inflect;

  @decorator decorator = decorator;
  @decorator freeze = freeze;
  @decorator initialize = initialize;
  @decorator initializeMixin = initializeMixin;
  @decorator initializePatch = initializePatch;
  @decorator mixin = mixin;
  @decorator patch = patch;
  @decorator plugin = plugin;
  @decorator meta = meta;
  @decorator partOf = partOf;
  @decorator nameBy = nameBy;
  @decorator constant = constant;
  @decorator util = util;
  @decorator method = method;
  @decorator prop = property;
  @decorator property = property;
  @decorator machine = machine;
  @decorator statemachine = machine;
  @decorator resolver = resolver;
  @decorator chains = chains;
  @decorator loadFiles = loadFiles;
  @decorator loadUtils = loadUtils;

  @constant MetaObject = _ES.prototype.MetaObject;
  @constant CoreObject = _ES.prototype.CoreObject;
  @constant Proto = _ES.prototype.Proto;

  static get Module() {
    return this;
  }
}

Reflect.defineProperty(ES, 'onMetalize', {
  configurable: true,
  enumerable: true,
  writable: true,
  value: function(...args) {
    Reflect.getPrototypeOf(ES).onMetalize.apply(this, args);
    this[cphPathMap] = undefined;
    this[cpoNamespace] = undefined;
    this[cphUtilsMap] = undefined;
    this[cpoUtils] = undefined;
    this[cphMigrationsMap] = undefined;
    this[cphTemplatesList] = undefined;
    this[cphFilesList] = undefined;
    return;
  }
});

freeze(ES);

export default ES;
