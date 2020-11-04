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

// console.log('?>?>?>11--1');
import PatternES from '../patternes';
// console.log('?>?>?>11--2');
import Pipes from '../pipes';
// console.log('?>?>?>11');
import joi from 'joi-browser';
// console.log('?>?>?>22');
import moment from 'moment';
import statuses from 'statuses';

import action from './decorators/action';
import attribute from './decorators/attribute';
import belongsTo from './decorators/belongsTo';
import computed from './decorators/computed';
import hasEmbed from './decorators/hasEmbed';
import hasEmbeds from './decorators/hasEmbeds';
import hasMany from './decorators/hasMany';
import hasOne from './decorators/hasOne';
import relatedEmbed from './decorators/relatedEmbed';
import relatedEmbeds from './decorators/relatedEmbeds';
import relatedTo from './decorators/relatedTo';

const {
  initialize, meta, nameBy, constant, resolver, util, freeze, decorator
} = PatternES.NS;
// console.log('?>?>?>33');


@initialize
@resolver(require, name => require(name))
class LeanES extends PatternES {
  @nameBy static  __filename = 'LeanES';
  @meta static object = {};

  @constant ROOT = __dirname;

  @constant HANDLER_RESULT =  'HANDLER_RESULT';
  @constant RECORD_CHANGED =  'RECORD_CHANGED';
  @constant CONFIGURATION =  'ConfigurationProxy';
  @constant STARTUP = 'STARTUP';
  @constant MIGRATE = 'MIGRATE';
  @constant ROLLBACK = 'ROLLBACK';
  @constant STOPPED_MIGRATE = 'STOPPED_MIGRATE';
  @constant STOPPED_ROLLBACK = 'STOPPED_ROLLBACK';
  @constant STARTUP_COMPLETE = 'STARTUP_COMPLETE';
  @constant LIGHTWEIGHT = Symbol.for('LIGHTWEIGHT');
  @constant MIGRATIONS = 'MigrationsCollection';
  @constant SESSIONS = 'SessionsCollection';
  @constant USERS = 'UsersCollection';
  @constant SPACES = 'SpacesCollection';
  @constant ROLES = 'RolesCollection';
  @constant UPLOADS = 'UploadsCollection';
  @constant RESQUE = 'ResqueProxy';
  @constant START_RESQUE = 'START_RESQUE';
  @constant DELAYED_JOBS_QUEUE = 'delayed_jobs';
  @constant DELAYED_JOBS_SCRIPT = 'DelayedJobScript';
  @constant DEFAULT_QUEUE = 'default';
  @constant SCRIPT_RESULT =  'SCRIPT_RESULT';
  @constant SHELL =  'SHELL';
  // @constant APPLICATION_MEDIATOR =  'ApplicationMediator';
  // @constant APPLICATION_PROXY =  'ApplicationProxy';
  @constant APPLICATION_ROUTER =  'ApplicationRouter';
  @constant APPLICATION_RENDERER =  'ApplicationRenderer';
  @constant APPLICATION_SWITCH =  'ApplicationSwitch';
  @constant APPLICATION_GATEWAY =  'ApplicationGateway';
  @constant RESOURCE_RENDERER =  'ResourceRenderer';
  @constant RESQUE_EXECUTOR =  'ResqueExecutor';
  @constant LOG_MSG = 'LOG_MSG';
  @constant UP = Symbol.for('UP');
  @constant DOWN = Symbol.for('DOWN');
  @constant NON_OVERRIDDEN = Symbol.for('NON_OVERRIDDEN');
  @constant SUPPORTED_TYPES = {
    json:         'json',
    binary:       'binary',
    boolean:      'boolean',
    date:         'date',
    datetime:     'datetime',
    number:       'number',
    decimal:      'decimal',
    float:        'float',
    integer:      'integer',
    primary_key:  'primary_key',
    string:       'string',
    text:         'text',
    time:         'time',
    timestamp:    'timestamp',
    array:        'array',
    hash:         'hash',
  };
  @constant REVERSE_MAP = {
    createCollection: 'dropCollection',
    dropCollection: 'dropCollection',
    createEdgeCollection: 'dropEdgeCollection',
    dropEdgeCollection: 'dropEdgeCollection',
    addField: 'removeField',
    removeField: 'removeField',
    addIndex: 'removeIndex',
    removeIndex: 'removeIndex',
    addTimestamps: 'removeTimestamps',
    removeTimestamps: 'addTimestamps',
    changeCollection: 'changeCollection',
    changeField: 'changeField',
    renameField: 'renameField',
    renameIndex: 'renameIndex',
    renameCollection: 'renameCollection'
  };
  @constant METHODS = [
    'get',
    'post',
    'put',
    'head',
    'delete',
    'options',
    'trace',
    'copy',
    'lock',
    'mkcol',
    'move',
    'purge',
    'propfind',
    'proppatch',
    'unlock',
    'report',
    'mkactivity',
    'checkout',
    'merge',
    'm-search',
    'notify',
    'subscribe',
    'unsubscribe',
    'patch',
    'search',
    'connect'
  ];

  @decorator action = action;
  @decorator attribute = attribute;
  @decorator belongsTo = belongsTo;
  @decorator computed = computed;
  @decorator hasEmbed = hasEmbed;
  @decorator hasEmbeds = hasEmbeds;
  @decorator hasMany = hasMany;
  @decorator hasOne = hasOne;
  @decorator relatedEmbed = relatedEmbed;
  @decorator relatedEmbeds = relatedEmbeds;
  @decorator relatedTo = relatedTo;

  @util joi = joi;
  @util moment = moment;
  @util statuses = statuses;

  @constant Pipes = Pipes;
}

// require('./utils/genRandomAlphaNumbers').default(LeanES);
import genRandomAlphaNumbersTF from './utils/genRandomAlphaNumbers';
genRandomAlphaNumbersTF(LeanES);
// require('./utils/hashPassword').default(LeanES);
import hashPasswordTF from './utils/hashPassword';
hashPasswordTF(LeanES);
// require('./utils/jwtDecode').default(LeanES);
import jwtDecodeTF from './utils/jwtDecode';
jwtDecodeTF(LeanES);
// require('./utils/jwtEncode').default(LeanES);
import jwtEncodeTF from './utils/jwtEncode';
jwtEncodeTF(LeanES);
// require('./utils/request').default(LeanES);
import requestTF from './utils/request';
requestTF(LeanES);
// console.log('>>?MMMMM LeanES after 000');
// require('./utils/verifyPassword').default(LeanES);
import verifyPasswordTF from './utils/verifyPassword';
verifyPasswordTF(LeanES);
// console.log('>>?MMMMM LeanES after 111');

// require('./mixins/ConfigurableMixin').default(LeanES);
import ConfigurableMixinTF from './mixins/ConfigurableMixin';
ConfigurableMixinTF(LeanES);
// require('./mixins/RelationsMixin').default(LeanES);
import RelationsMixinTF from './mixins/RelationsMixin';
RelationsMixinTF(LeanES);
// require('./mixins/DelayableMixin').default(LeanES);
import DelayableMixinTF from './mixins/DelayableMixin';
DelayableMixinTF(LeanES);
// console.log('>>?MMMMM LeanES after 222');

// require('./patterns/iterator/Cursor').default(LeanES);
import CursorTF from './patterns/iterator/Cursor';
CursorTF(LeanES);
// console.log('>>?MMMMM LeanES after 333');
// require('./patterns/data_mapper/Transform').default(LeanES);
import TransformTF from './patterns/data_mapper/Transform';
TransformTF(LeanES);
// console.log('>>?MMMMM LeanES after 333+1');
// require('./patterns/data_mapper/StringTransform').default(LeanES);
import StringTransformTF from './patterns/data_mapper/StringTransform';
StringTransformTF(LeanES);
// console.log('>>?MMMMM LeanES after 333+1');
// require('./patterns/data_mapper/NumberTransform').default(LeanES);
import NumberTransformTF from './patterns/data_mapper/NumberTransform';
NumberTransformTF(LeanES);
// require('./patterns/data_mapper/PrimaryKeyTransform').default(LeanES);
import PrimaryKeyTransformTF from './patterns/data_mapper/PrimaryKeyTransform';
PrimaryKeyTransformTF(LeanES);
// console.log('>>?MMMMM LeanES after 333+1');
// require('./patterns/data_mapper/DateTransform').default(LeanES);
import DateTransformTF from './patterns/data_mapper/DateTransform';
DateTransformTF(LeanES);
// console.log('>>?MMMMM LeanES after 333+1');
// require('./patterns/data_mapper/BooleanTransform').default(LeanES);
import BooleanTransformTF from './patterns/data_mapper/BooleanTransform';
BooleanTransformTF(LeanES);
// console.log('>>?MMMMM LeanES after 333+1');
// require('./patterns/data_mapper/ObjectTransform').default(LeanES);
import ObjectTransformTF from './patterns/data_mapper/ObjectTransform';
ObjectTransformTF(LeanES);
// console.log('>>?MMMMM LeanES after 333+1');
// require('./patterns/data_mapper/ArrayTransform').default(LeanES);
import ArrayTransformTF from './patterns/data_mapper/ArrayTransform';
ArrayTransformTF(LeanES);
// console.log('>>?MMMMM LeanES after 333+1');
// require('./patterns/data_mapper/ComplexObjectTransform').default(LeanES);
import ComplexObjectTransformTF from './patterns/data_mapper/ComplexObjectTransform';
ComplexObjectTransformTF(LeanES);
// console.log('>>?MMMMM LeanES after 333+1');
// require('./patterns/data_mapper/ComplexArrayTransform').default(LeanES);
import ComplexArrayTransformTF from './patterns/data_mapper/ComplexArrayTransform';
ComplexArrayTransformTF(LeanES);
// console.log('>>?MMMMM LeanES after 333+1');
// require('./patterns/data_mapper/Serializer').default(LeanES);
import SerializerTF from './patterns/data_mapper/Serializer';
SerializerTF(LeanES);
// console.log('>>?MMMMM LeanES after 333+1');
// require('./patterns/data_mapper/Objectizer').default(LeanES);
import ObjectizerTF from './patterns/data_mapper/Objectizer';
ObjectizerTF(LeanES);
// console.log('>>?MMMMM LeanES after 333+1');
// require('./patterns/data_mapper/Record').default(LeanES);
import RecordTF from './patterns/data_mapper/Record';
RecordTF(LeanES);
// console.log('>>?MMMMM LeanES after 333+1');
// require('./patterns/data_mapper/Queue').default(LeanES);
import QueueTF from './patterns/data_mapper/Queue';
QueueTF(LeanES);
// console.log('>>?MMMMM LeanES after 333+1');
// require('./patterns/data_mapper/Migration').default(LeanES);
import MigrationTF from './patterns/data_mapper/Migration';
MigrationTF(LeanES);
// console.log('>>?MMMMM LeanES after 444');

// require('./patterns/query_object/Query').default(LeanES);
import QueryTF from './patterns/query_object/Query';
QueryTF(LeanES);
// console.log('>>?MMMMM LeanES after 555');

// require('./patterns/proxy/Collection').default(LeanES);
// require('./patterns/proxy/Configuration').default(LeanES);
// require('./patterns/proxy/ResourceRenderer').default(LeanES);
// require('./patterns/proxy/Router').default(LeanES);
// require('./patterns/proxy/Resque').default(LeanES);
import CollectionTF from './patterns/proxy/Collection';
import ConfigurationTF from './patterns/proxy/Configuration';
import ResourceRendererTF from './patterns/proxy/ResourceRenderer';
import RouterTF from './patterns/proxy/Router';
import ResqueTF from './patterns/proxy/Resque';
CollectionTF(LeanES);
ConfigurationTF(LeanES);
ResourceRendererTF(LeanES);
RouterTF(LeanES);
ResqueTF(LeanES);
// console.log('>>?MMMMM LeanES after 666');

// require('./mixins/HttpCollectionMixin').default(LeanES);
// require('./mixins/HttpSerializerMixin').default(LeanES);
// require('./mixins/MemoryCollectionMixin').default(LeanES);
// require('./mixins/GenerateAutoincrementIdMixin').default(LeanES);
// require('./mixins/GenerateUuidIdMixin').default(LeanES);
// require('./mixins/MemoryResqueMixin').default(LeanES);
// require('./mixins/MemoryConfigurationMixin').default(LeanES);
import HttpCollectionMixinTF from './mixins/HttpCollectionMixin';
import HttpSerializerMixinTF from './mixins/HttpSerializerMixin';
import MemoryCollectionMixinTF from './mixins/MemoryCollectionMixin';
import GenerateAutoincrementIdMixinTF from './mixins/GenerateAutoincrementIdMixin';
import GenerateUuidIdMixinTF from './mixins/GenerateUuidIdMixin';
import MemoryResqueMixinTF from './mixins/MemoryResqueMixin';
import MemoryConfigurationMixinTF from './mixins/MemoryConfigurationMixin';
HttpCollectionMixinTF(LeanES);
HttpSerializerMixinTF(LeanES);
MemoryCollectionMixinTF(LeanES);
GenerateAutoincrementIdMixinTF(LeanES);
GenerateUuidIdMixinTF(LeanES);
MemoryResqueMixinTF(LeanES);
MemoryConfigurationMixinTF(LeanES);
// console.log('>>?MMMMM LeanES after 777');

// require('./mixins/IterableMixin').default(LeanES);
// require('./mixins/QueryableCollectionMixin').default(LeanES);
// require('./mixins/ThinHttpCollectionMixin').default(LeanES);
// require('./mixins/SchemaModuleMixin').default(LeanES);
// require('./mixins/CrudResourceRendererMixin').default(LeanES);
// require('./mixins/TemplatableModuleMixin').default(LeanES);
// require('./mixins/EmbeddableRecordMixin').default(LeanES);
import IterableMixinTF from './mixins/IterableMixin';
import QueryableCollectionMixinTF from './mixins/QueryableCollectionMixin';
import ThinHttpCollectionMixinTF from './mixins/ThinHttpCollectionMixin';
import SchemaModuleMixinTF from './mixins/SchemaModuleMixin';
import CrudResourceRendererMixinTF from './mixins/CrudResourceRendererMixin';
import TemplatableModuleMixinTF from './mixins/TemplatableModuleMixin';
import EmbeddableRecordMixinTF from './mixins/EmbeddableRecordMixin';
IterableMixinTF(LeanES);
QueryableCollectionMixinTF(LeanES);
ThinHttpCollectionMixinTF(LeanES);
SchemaModuleMixinTF(LeanES);
CrudResourceRendererMixinTF(LeanES);
TemplatableModuleMixinTF(LeanES);
EmbeddableRecordMixinTF(LeanES);
// console.log('>>?MMMMM LeanES after 888');

// require('./patterns/switch/Request').default(LeanES);
// require('./patterns/switch/Response').default(LeanES);
// require('./patterns/switch/Context').default(LeanES);
// require('./patterns/mediator/Switch').default(LeanES);
import RequestTF from './patterns/switch/Request';
import ResponseTF from './patterns/switch/Response';
import ContextTF from './patterns/switch/Context';
import SwitchTF from './patterns/mediator/Switch';
RequestTF(LeanES);
ResponseTF(LeanES);
ContextTF(LeanES);
SwitchTF(LeanES);
// console.log('>>?MMMMM LeanES after 999');

// require('./patterns/command/Resource').default(LeanES);
import ResourceTF from './patterns/command/Resource';
ResourceTF(LeanES);
// console.log('>>?MMMMM LeanES after 1010');
// require('./patterns/command/MigrateCommand').default(LeanES);
// require('./patterns/command/RollbackCommand').default(LeanES);
import MigrateCommandTF from './patterns/command/MigrateCommand';
MigrateCommandTF(LeanES);
import RollbackCommandTF from './patterns/command/RollbackCommand';
RollbackCommandTF(LeanES);
// console.log('>>?MMMMM LeanES after 1111');
// require('./patterns/command/Script').default(LeanES);
// require('./patterns/command/DelayedJobScript').default(LeanES);
import ScriptTF from './patterns/command/Script';
ScriptTF(LeanES);
import DelayedJobScriptTF from './patterns/command/DelayedJobScript';
DelayedJobScriptTF(LeanES);
// console.log('>>?MMMMM LeanES after 1212');

// require('./mixins/ApplicationMediatorMixin').default(LeanES);
// require('./mixins/MemoryExecutorMixin').default(LeanES);
// require('./mixins/QueryableResourceMixin').default(LeanES);
// require('./mixins/EditableResourceMixin').default(LeanES);
// require('./mixins/MemoryMigrationMixin').default(LeanES);
// require('./mixins/LoggingJunctionMixin').default(LeanES);
import ApplicationMediatorMixinTF from './mixins/ApplicationMediatorMixin';
import MemoryExecutorMixinTF from './mixins/MemoryExecutorMixin';
import QueryableResourceMixinTF from './mixins/QueryableResourceMixin';
import EditableResourceMixinTF from './mixins/EditableResourceMixin';
import MemoryMigrationMixinTF from './mixins/MemoryMigrationMixin';
import LoggingJunctionMixinTF from './mixins/LoggingJunctionMixin';
ApplicationMediatorMixinTF(LeanES);
MemoryExecutorMixinTF(LeanES);
QueryableResourceMixinTF(LeanES);
EditableResourceMixinTF(LeanES);
MemoryMigrationMixinTF(LeanES);
LoggingJunctionMixinTF(LeanES);
// console.log('>>?MMMMM LeanES after 1313');

// require('./patterns/facade/Application').default(LeanES);
import ApplicationTF from './patterns/facade/Application';
ApplicationTF(LeanES);
// console.log('>>?MMMMM LeanES after 1414');

// require('./patterns/command/LogMessageCommand').default(LeanES);
import LogMessageCommandTF from './patterns/command/LogMessageCommand';
LogMessageCommandTF(LeanES);

// export * from '../patternes';
// console.log('>>?MMMMM LeanES after 1515');
export * from '../pipes';
// console.log('>>?MMMMM LeanES after 1616');

export type { AttributeConfigT } from './types/AttributeConfigT';
export type { AttributeOptionsT } from './types/AttributeOptionsT';
export type { ComputedConfigT } from './types/ComputedConfigT';
export type { ComputedOptionsT } from './types/ComputedOptionsT';
export type { EmbedConfigT } from './types/EmbedConfigT';
export type { EmbedOptionsT } from './types/EmbedOptionsT';
export type { HttpRequestHashT } from './types/HttpRequestHashT';
export type { HttpRequestParamsT } from './types/HttpRequestParamsT';
export type { JoiT } from './types/JoiT';
export type { MomentT } from './types/MomentT';
export type { RelationConfigT } from './types/RelationConfigT';
export type { RelationInverseT } from './types/RelationInverseT';
export type { RelationOptionsT } from './types/RelationOptionsT';
export type {
  RequestT, LegacyResponseInterface, AxiosResponse, AxiosTransformer,
  AxiosBasicCredentials, AxiosProxyConfig, RequestArgumentsT,
  Config, LegacyRequestInterface,
  Cancel, Canceler, CancelTokenStatic, CancelToken, CancelTokenSource,
  AxiosInterceptorManager
} from './types/RequestT';
export type { ResourceListResultT } from './types/ResourceListResultT';
export type { ResourceRendererItemResultT } from './types/ResourceRendererItemResultT';
export type { ResourceRendererListResultT } from './types/ResourceRendererListResultT';
export type { RouteOptionsT } from './types/RouteOptionsT';
export type { RouterRouteT } from './types/RouterRouteT';
export type { StreamT } from './types/StreamT';
// console.log('>>?MMMMM LeanES after 1717');

export type { ApplicationInterface } from './interfaces/ApplicationInterface';
export type { CollectionInterface } from './interfaces/CollectionInterface';
// export type { CommandInterface } from './interfaces/CommandInterface';
// export type { ControllerInterface } from './interfaces/ControllerInterface';
export type { ConfigurationInterface } from './interfaces/ConfigurationInterface';
export type { ContextInterface } from './interfaces/ContextInterface';
// export type { ControllerInterface } from './interfaces/ControllerInterface';
export type { CursorInterface } from './interfaces/CursorInterface';
export type { DelayableInterface } from './interfaces/DelayableInterface';
export type { EmbeddableStaticInterface } from './interfaces/EmbeddableStaticInterface';
// export type { FacadeInterface } from './interfaces/FacadeInterface';
export type { IterableInterface } from './interfaces/IterableInterface';
// export type { MediatorInterface } from './interfaces/MediatorInterface';
export type { MigrationInterface } from './interfaces/MigrationInterface';
export type { MigrationStaticInterface } from './interfaces/MigrationStaticInterface';
// console.log('>>?MMMMM LeanES after 1818');
// export type { ModelInterface } from './interfaces/ModelInterface';
// export type { NotificationInterface } from './interfaces/NotificationInterface';
// export type { NotifierInterface } from './interfaces/NotifierInterface';
export type { ObjectizerInterface } from './interfaces/ObjectizerInterface';
// export type { ObserverInterface } from './interfaces/ObserverInterface';
// export type { ProxyInterface } from './interfaces/ProxyInterface';
export type { QueryableCollectionInterface } from './interfaces/QueryableCollectionInterface';
export type { QueryInterface } from './interfaces/QueryInterface';
export type { QueueInterface } from './interfaces/QueueInterface';
export type { RecordInterface } from './interfaces/RecordInterface';
export type { RecordStaticInterface } from './interfaces/RecordStaticInterface';
export type { RelatableStaticInterface } from './interfaces/RelatableStaticInterface';
// console.log('>>?MMMMM LeanES after 1919');
export type { RequestInterface } from './interfaces/RequestInterface';
export type { ResourceInterface } from './interfaces/ResourceInterface';
export type { ResourceRendererInterface } from './interfaces/ResourceRendererInterface';
export type { ResponseInterface } from './interfaces/ResponseInterface';
export type { ResqueInterface } from './interfaces/ResqueInterface';
export type { RouterInterface } from './interfaces/RouterInterface';
export type { ScriptInterface } from './interfaces/ScriptInterface';
export type { SerializableInterface } from './interfaces/SerializableInterface';
export type { SerializerInterface } from './interfaces/SerializerInterface';
export type { SwitchInterface } from './interfaces/SwitchInterface';
export type { TransformStaticInterface } from './interfaces/TransformStaticInterface';
// console.log('>>?MMMMM LeanES after 2020');
// export type { ViewInterface } from './interfaces/ViewInterface';

export default freeze(LeanES);
// console.log('>>?MMMMM LeanES after 2121');
