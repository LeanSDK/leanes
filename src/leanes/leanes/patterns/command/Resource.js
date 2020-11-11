// leanes-restful-addon


// // This file is part of LeanES.
// //
// // LeanES is free software: you can redistribute it and/or modify
// // it under the terms of the GNU Lesser General Public License as published by
// // the Free Software Foundation, either version 3 of the License, or
// // (at your option) any later version.
// //
// // LeanES is distributed in the hope that it will be useful,
// // but WITHOUT ANY WARRANTY; without even the implied warranty of
// // MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// // GNU Lesser General Public License for more details.
// //
// // You should have received a copy of the GNU Lesser General Public License
// // along with LeanES.  If not, see <https://www.gnu.org/licenses/>.

// import type { NotificationInterface } from '../../../patternes';
// import type { CollectionInterface } from '../../interfaces/CollectionInterface';
// import type { RecordInterface } from '../../interfaces/RecordInterface';

// import type { ContextInterface } from '../../interfaces/ContextInterface';
// import type { ResourceInterface } from '../../interfaces/ResourceInterface';

// import type { ResourceListResultT } from '../../types/ResourceListResultT';

// const slice = [].slice;

// export default (Module) => {
//   const {
//     HANDLER_RESULT,
//     DELAYED_JOBS_QUEUE,
//     RESQUE,
//     MIGRATIONS,
//     // SimpleCommand,
//     Command,
//     ConfigurableMixin,
//     assert,
//     initialize, partOf, meta, property, method, nameBy, mixin, action, chains,
//     Utils: { _, inflect, assign, statuses }
//   } = Module.NS;

//   const HTTP_NOT_FOUND = statuses('not found');
//   const UNAUTHORIZED = statuses('unauthorized');
//   const FORBIDDEN = statuses('forbidden');
//   const UPGRADE_REQUIRED = statuses('upgrade required');


//   @initialize
//   @chains([
//     'list', 'detail', 'create', 'update', 'delete', 'destroy'
//   ], function () {
//     this.initialHook('beforeActionHook');
//     this.beforeHook('getQuery', {
//       only: ['list']
//     });
//     this.beforeHook('getRecordId', {
//       only: ['detail', 'update', 'delete', 'destroy']
//     });
//     this.beforeHook('checkExistence', {
//       only: ['detail', 'update', 'delete', 'destroy']
//     });
//     this.beforeHook('getRecordBody', {
//       only: ['create', 'update']
//     });
//     this.beforeHook('omitBody', {
//       only: ['create', 'update']
//     });
//     this.beforeHook('beforeUpdate', {
//       only: ['update']
//     });
//   })
//   @partOf(Module)
//   @mixin(ConfigurableMixin)
//   class Resource<
//     D = RecordInterface
//   > extends Command implements ResourceInterface {
//   // > extends SimpleCommand implements ResourceInterface {
//     @nameBy static  __filename = __filename;
//     @meta static object = {};

//     @property get entityName(): string {
//       return assert.fail('Not implemented specific property');
//     }

//     @property needsLimitation: boolean = true;

//     @method async checkApiVersion(...args) {
//       var ref, semver, vCurrentVersion, vVersion;
//       vVersion = this.context.pathParams.v;
//       vCurrentVersion = this.configs.version;
//       assert(vCurrentVersion != null, 'No `version` specified in the configuration');
//       const [ vNeedVersion ] = vCurrentVersion.match(/^\d{1,}[.]\d{1,}/) || [];
//       assert(vNeedVersion != null, 'Incorrect `version` specified in the configuration');
//       semver = require('semver'); //TODO !!!!!
//       if (!semver.satisfies(vCurrentVersion, vVersion)) {
//         this.context.throw(UPGRADE_REQUIRED, `Upgrade: v${vCurrentVersion}`);
//       }
//       return args;
//     }

//     @method async setOwnerId(...args) {
//       this.recordBody.ownerId = this.session.uid || null;
//       return args;
//     }

//     @method async protectOwnerId(...args) {
//       this.recordBody = _.omit(this.recordBody, ['ownerId']);
//       return args;
//     }

//     @method async filterOwnerByCurrentUser(...args) {
//       if (!this.session.userIsAdmin) {
//         if (this.listQuery == null) {
//           this.listQuery = {};
//         }
//       }
//       if (this.listQuery.$filter != null) {
//         this.listQuery.$filter = {
//           $and: [
//             this.listQuery.$filter,
//             {
//               '@doc.ownerId': {
//                 $eq: this.session.uid
//               }
//             }
//           ]
//         };
//       } else {
//         this.listQuery.$filter = {
//           '@doc.ownerId': {
//             $eq: this.session.uid
//           }
//         };
//       }
//       return args;
//     }

//     @method async checkOwner(...args) {
//       if (this.session.uid == null) {
//         this.context.throw(UNAUTHORIZED);
//         return;
//       }
//       if (this.session.userIsAdmin) {
//         return args;
//       }
//       const key = this.context.pathParams[this.keyName];
//       if (key == null) {
//         return args;
//       }
//       const doc = await this.collection.find(key);
//       if (doc == null) {
//         this.context.throw(HTTP_NOT_FOUND);
//       }
//       if (!doc.ownerId) {
//         return args;
//       }
//       if (this.session.uid !== doc.ownerId) {
//         this.context.throw(FORBIDDEN);
//         return;
//       }
//       return args;
//     }

//     @method async checkExistence(...args) {
//       if (this.recordId == null) {
//         this.context.throw(HTTP_NOT_FOUND);
//       }
//       if (!await this.collection.includes(this.recordId)) {
//         this.context.throw(HTTP_NOT_FOUND);
//       }
//       return args;
//     }

//     @method async adminOnly(...args) {
//       if (this.session.uid == null) {
//         this.context.throw(UNAUTHORIZED);
//         return;
//       }
//       if (!this.session.userIsAdmin) {
//         this.context.throw(FORBIDDEN);
//         return;
//       }
//       return args;
//     }

//     @method async checkSchemaVersion(...args) {
//       const voMigrations = this.facade.retrieveProxy(MIGRATIONS);
//       const migrationNames = this.Module.NS.MIGRATION_NAMES;
//       const [ lastMigration ] = slice.call(migrationNames, -1);
//       if (lastMigration == null) {
//         return args;
//       }
//       const includes = await voMigrations.includes(lastMigration);
//       if (includes) {
//         return args;
//       } else {
//         assert.fail('Code schema version is not equal current DB version');
//         return;
//       }
//       return args;
//     }

//     @property get keyName(): string {
//       return inflect.singularize(inflect.underscore(this.entityName));
//     }

//     @property get itemEntityName(): string {
//       return inflect.singularize(inflect.underscore(this.entityName));
//     }

//     @property get listEntityName(): string {
//       return inflect.pluralize(inflect.underscore(this.entityName));
//     }

//     @property get collectionName(): string {
//       return `${inflect.pluralize(inflect.camelize(this.entityName))}Collection`;
//     }

//     @property get collection(): CollectionInterface<D> {
//       return this.facade.retrieveProxy(this.collectionName);
//     }

//     @property context: ?ContextInterface = null;

//     @property listQuery: ?object = null;

//     @property recordId: ?string = null;

//     @property recordBody: ?object = null;

//     @property actionResult: ?any = null;

//     @property static get actions(): {[key: string]: object} {
//       return this.metaObject.getGroup('actions', false);
//     }

//     @action async list(): Promise<ResourceListResultT> {
//       const vlItems = await (
//         await this.collection.takeAll()
//       ).toArray();
//       return {
//         meta: {
//           pagination: {
//             limit: 'not defined',
//             offset: 'not defined'
//           }
//         },
//         items: vlItems
//       };
//     }

//     @action async detail(): Promise<object> {
//       return await this.collection.find(this.recordId);
//     }

//     @action async create(): Promise<object> {
//       return await this.collection.create(this.recordBody);
//     }

//     @action async update(): Promise<object> {
//       return await this.collection.update(this.recordId, this.recordBody);
//     }

//     @action async 'delete'(): Promise<void> {
//       await this.collection.delete(this.recordId);
//       this.context.status = 204;
//     }

//     @action async destroy(): Promise<void> {
//       await this.collection.destroy(this.recordId);
//       this.context.status = 204;
//     }

//     @method beforeActionHook(...args) {
//       [this.context] = args;
//       return args;
//     }

//     @method getQuery(...args) {
//       this.listQuery = JSON.parse(this.context.query['query'] || "{}");
//       return args;
//     }

//     @method getRecordId(...args) {
//       this.recordId = this.context.pathParams[this.keyName];
//       return args;
//     }

//     @method getRecordBody(...args) {
//       const body = this.context.request.body;
//       this.recordBody = body && body[this.itemEntityName] || undefined;
//       return args;
//     }

//     @method omitBody(...args) {
//       this.recordBody = _.omit(this.recordBody, ['_id', '_rev', 'rev', 'type', '_type', '_owner', '_space', '_from', '_to']);
//       const moduleName = this.collection.delegate.moduleName();
//       const name = this.collection.delegate.name;
//       this.recordBody.type = `${moduleName}::${name}`;
//       return args;
//     }

//     @method beforeUpdate(...args) {
//       this.recordBody = assign({}, this.recordBody, {
//         id: this.recordId
//       });
//       return args;
//     }

//     @method async doAction(asAction: string, context: ContextInterface): Promise<?any> {
//       const voResult = await (typeof this[asAction] === "function" ? this[asAction](context) : undefined);
//       this.actionResult = voResult;
//       await this.saveDelayeds();
//       return voResult;
//     }

//     @method async writeTransaction(asAction: string, aoContext: ContextInterface): Promise<boolean> {
//       return aoContext.method.toUpperCase() !== 'GET';
//     }

//     @method async saveDelayeds(): Promise<void> {
//       const resque = this.facade.retrieveProxy(RESQUE);
//       for (const delayed of await resque.getDelayed()) {
//         const { queueName, scriptName, data, delay } = delayed;
//         const queue = await resque.get(queueName || DELAYED_JOBS_QUEUE);
//         await queue.push(scriptName, data, delay);
//       }
//     }

//     @method async execute(aoNotification: NotificationInterface): Promise<void> {
//       let voResult;
//       const { ERROR, DEBUG, LEVELS, SEND_TO_LOG } = Module.NS.Pipes.NS.LogMessage;
//       const resourceName = aoNotification.getName();
//       const voBody = aoNotification.getBody();
//       const vsAction = aoNotification.getType();
//       try {
//         this.sendNotification(SEND_TO_LOG, '>>>>>>>>>>>>>> EXECUTION START', LEVELS[DEBUG]);
//         voResult = {
//           result: await this.doAction(vsAction, voBody.context),
//           resource: this
//         };
//         this.sendNotification(SEND_TO_LOG, '>>>>>>>>>>>>>> EXECUTION END', LEVELS[DEBUG]);
//       } catch (error) {
//         voResult = { error, resource: this };
//       }
//       this.sendNotification(HANDLER_RESULT, voResult, voBody.reverse);
//     }
//   }
// }
