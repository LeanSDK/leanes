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
import inversify from 'inversify';
import {
  injectable, decorate, inject, tagged, named, optional, unmanaged,
  multiInject, targetName
} from 'inversify';
import ES from '../es';

import AdapterTF from './clean/Adapter';
import CaseTF from './clean/Case';
import SuiteTF from './clean/Suite';

import NotificationTF from './observer/Notification';
import NotifierTF from './observer/Notifier';
import ObserverTF from './observer/Observer'
import ProxyTF from './proxy/Proxy'
import MediatorTF from './mediator/Mediator';
import CommandTF from './command/Command';
import FacadeTF from './facade/Facade';

import ViewTF from './core/View';
import ModelTF from './core/Model';
import ControllerTF from './core/Controller';

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

NotificationTF(PureMVC);
NotifierTF(PureMVC);
ObserverTF(PureMVC);

AdapterTF(PureMVC);
CaseTF(PureMVC);
SuiteTF(PureMVC);

ProxyTF(PureMVC);
MediatorTF(PureMVC);
CommandTF(PureMVC);
FacadeTF(PureMVC);

ViewTF(PureMVC);
ModelTF(PureMVC);
ControllerTF(PureMVC);

export default PureMVC;
