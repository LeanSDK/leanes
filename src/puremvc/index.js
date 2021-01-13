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

import "reflect-metadata";
import * as inversify from 'inversify';
import {
  injectable, decorate, inject, tagged, named, optional, unmanaged,
  multiInject, targetName
} from 'inversify';
import ES from '../es';

import Adapter from './clean/Adapter';
import Case from './clean/Case';
import Suite from './clean/Suite';

import Notification from './observer/Notification';
import Notifier from './observer/Notifier';
import Observer from './observer/Observer'
import Proxy from './proxy/Proxy'
import Mediator from './mediator/Mediator';
import Command from './command/Command';
import Facade from './facade/Facade';

import View from './core/View';
import Model from './core/Model';
import Controller from './core/Controller';

export * from '../es';
export type { AdapterInterface } from './interfaces/AdapterInterface';
export type { CaseInterface } from './interfaces/CaseInterface';
export type { SuiteInterface } from './interfaces/SuiteInterface';

export type { CommandInterface } from './interfaces/CommandInterface';
export type { ControllerInterface } from './interfaces/ControllerInterface';
export type { FacadeInterface } from './interfaces/FacadeInterface';
export type { MediatorInterface } from './interfaces/MediatorInterface';
export type { ModelInterface } from './interfaces/ModelInterface';
export type { NotificationInterface } from './interfaces/NotificationInterface';
export type { NotifierInterface } from './interfaces/NotifierInterface';
export type { ObserverInterface } from './interfaces/ObserverInterface';
export type { ProxyInterface } from './interfaces/ProxyInterface';
export type { ViewInterface } from './interfaces/ViewInterface';

const {
  CoreObject,
  initialize, meta, nameBy, constant, resolver, util, decorator
} = ES.NS;

decorate(injectable(), CoreObject);

@Controller
@Model
@View

@Facade
@Command
@Mediator
@Proxy

@Suite
@Case
@Adapter

@Observer
@Notifier
@Notification

@initialize
@resolver(require, name => require(name))
class PureMVC extends ES {
  @nameBy static  __filename = 'PureMVC';
  @meta static object = {};

  @constant ROOT = __dirname;
  @constant APPLICATION_MEDIATOR =  'ApplicationMediator';
  @constant APPLICATION_PROXY =  'ApplicationProxy';

  @util inversify = inversify;

  @decorator injectable = injectable;
  @decorator decorate = decorate;
  @decorator inject = inject;
  @decorator tagged = tagged;
  @decorator named = named;
  @decorator optional = optional;
  @decorator unmanaged = unmanaged;
  @decorator multiInject = multiInject;
  @decorator targetName = targetName;
}

export default PureMVC;
