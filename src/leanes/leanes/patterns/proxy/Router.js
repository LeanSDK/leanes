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

// import type { RouterInterface } from '../../interfaces/RouterInterface';
// import type { RouteOptionsT } from '../../types/RouteOptionsT';
// import type { RouterRouteT } from '../../types/RouterRouteT';

// const slice = [].slice;
// const hasProp = {}.hasOwnProperty;

// export default (Module) => {
//   const {
//     Proxy, Proto,
//     ConfigurableMixin,
//     assert,
//     initialize, partOf, meta, property, method, nameBy, mixin,
//     Utils: { _, inflect }
//   } = Module.NS;


//   @initialize
//   @partOf(Module)
//   @mixin(ConfigurableMixin)
//   class Router extends Proxy implements RouterInterface {
//     @nameBy static __filename = __filename;
//     @meta static object = {};

//     // ipsPath = PointerT(Router.protected({
//     @property _path: ?string = '/';

//     // ipsName = PointerT(Router.protected({
//     @property _name: ?string = '';

//     // ipsModule = PointerT(Router.protected({
//     @property _module: ?string = null;

//     // iplOnly = PointerT(Router.protected({
//     @property _only: ?(string | string[]) = null;

//     // iplVia = PointerT(Router.protected({
//     @property _via: ?(string | string[]) = null;

//     // iplExcept = PointerT(Router.protected({
//     @property _except: ?(string | string[]) = null;

//     // ipoAbove = PointerT(Router.protected({
//     @property _above: ?object = null;

//     // ipsAt = PointerT(Router.protected({
//     @property _at: ?('collection' | 'member') = null;

//     // ipsResource = PointerT(Router.protected({
//     @property _resource: ?string = null;

//     // ipsTag = PointerT(Router.protected({
//     @property _tag: ?string = null;

//     // ipsTemplates = PointerT(Router.protected({
//     @property _templates: ?string = null;

//     // ipsParam = PointerT(Router.protected({
//     @property _param: ?string = null;

//     // iplRouters = PointerT(Router.protected({
//     @property _routers: ?Array<Router> = [];

//     // iplPathes = PointerT(Router.protected({
//     @property _pathes: ?Array<RouterRouteT> = [];

//     // iplResources = PointerT(Router.protected({
//     @property _resources: ?Array<Router> = [];

//     // iplRoutes = PointerT(Router.protected({
//     // @property _routes: ?Array<RouterRouteT> = null;

//     @property get path(): ?string {
//       return this._path;
//     }

//     @property get name(): ?string {
//       return this._resource || this._name;
//     }

//     @property get above(): ?object {
//       return this._above;
//     }

//     @property get tag(): ?string {
//       return this._tag;
//     }

//     @property get templates(): ?string {
//       return this._templates;
//     }

//     @property get param(): ?string {
//       return this._param;
//     }

//     @method defaultEntityName(): string {
//       const tmpName = this._name.replace(/\/$/, '').split('/');
//       const [vsEntityName] = slice.call(tmpName, -1);
//       return inflect.singularize(vsEntityName);
//     }

//     @method map() { return; }

//     @method root(opts: { to: ?string, at: ?('collection' | 'member'), resource: ?string, action: ?string }) { return; }

//     @method defineMethod(
//       container: Array<RouterRouteT>,
//       method: string,
//       path: string,
//       opts: ?RouteOptionsT = {}
//     ) {
//       let {
//         to,
//         at,
//         resource,
//         action,
//         tag: asTag,
//         template,
//         keyName,
//         entityName,
//         recordName
//       } = opts;
//       assert(path != null, 'path is required');
//       path = path.replace(/^[\/]/, '');
//       if (to != null) {
//         assert(/[#]/.test(to), '`to` must be in format `<resource>#<action>`');
//         [resource, action] = to.split('#');
//       }
//       const vsResource = this._resource;
//       if ((resource == null) && vsResource !== '') {
//         resource = vsResource;
//       }
//       const vsName = this._name;
//       if ((resource == null) && vsName !== '') {
//         resource = vsName;
//       }
//       assert(resource != null, 'options `to` or `resource` must be defined');
//       if (action == null) {
//         action = path;
//       }
//       if (!/[\/]$/.test(resource)) {
//         resource += '/';
//       }
//       if (keyName == null) {
//         keyName = this._param != null ? this._param.replace(/^\:/, '') : undefined;
//       }
//       if (entityName == null) {
//         entityName = this.defaultEntityName();
//       }
//       if (!(_.isString(recordName) || _.isNull(recordName))) {
//         recordName = this.defaultEntityName();
//       }
//       const vsParentTag = (this._tag != null) && this._tag !== '' ? this._tag : '';
//       const vsTag = (asTag != null) && asTag !== '' ? `/${asTag}` : '';
//       const tag = `${vsParentTag}${vsTag}`;
//       path = (() => {
//         switch (at || this._at) {
//           case 'member':
//             return `${this._path}:${inflect.singularize(inflect.underscore(resource.replace(/[\/]/g, '_').replace(/[_]$/g, '')))}/${path}`;
//           case 'collection':
//             return `${this._path}${path}`;
//           default:
//             return `${this._path}${path}`;
//         }
//       })();
//       if (template == null) {
//         template = resource + action;
//       }
//       container.push({ method, path, resource, action, tag, template, keyName, entityName, recordName });
//     }

//     @method 'get'(asPath: string, aoOpts: ?RouteOptionsT) {
//       // @._pathes ?= []
//       this.defineMethod(this._pathes, 'get', asPath, aoOpts);
//     }

//     @method post(asPath: string, aoOpts: ?RouteOptionsT) {
//       // @._pathes ?= []
//       this.defineMethod(this._pathes, 'post', asPath, aoOpts);
//     }

//     @method put(asPath: string, aoOpts: ?RouteOptionsT) {
//       // @._pathes ?= []
//       this.defineMethod(this._pathes, 'put', asPath, aoOpts);
//     }

//     @method 'delete'(asPath: string, aoOpts: ?RouteOptionsT) {
//       // @._pathes ?= []
//       this.defineMethod(this._pathes, 'delete', asPath, aoOpts);
//     }

//     @method head(asPath: string, aoOpts: ?RouteOptionsT) {
//       // @._pathes ?= []
//       this.defineMethod(this._pathes, 'head', asPath, aoOpts);
//     }

//     @method options(asPath: string, aoOpts: ?RouteOptionsT) {
//       // @._pathes ?= []
//       this.defineMethod(this._pathes, 'options', asPath, aoOpts);
//     }

//     @method patch(asPath: string, aoOpts: ?RouteOptionsT) {
//       // @._pathes ?= []
//       this.defineMethod(this._pathes, 'patch', asPath, aoOpts);
//     }

//     @method resource(
//       asName: string,
//       aoOpts: ?({
//         path: ?string,
//         module: ?string,
//         only: ?(string | string[]),
//         via: ?(string | string[]),
//         except: ?(string | string[]),
//         tag: ?string,
//         templates: ?string,
//         param: ?string,
//         at: ?('collection' | 'member'),
//         resource: ?string,
//         above: ?object
//       } | Function) = null,
//       lambda: ?Function = null
//     ) {
//       const vcModule = this.Module;
//       if (_.isFunction(aoOpts)) {
//         lambda = aoOpts;
//         aoOpts = {};
//       }
//       if (aoOpts == null) {
//         aoOpts = {};
//       }
//       if (lambda == null) {
//         lambda = () => { };
//       }
//       let {
//         path,
//         module: vsModule,
//         only,
//         via,
//         except,
//         tag: asTag,
//         templates: alTemplates,
//         param: asParam,
//         at,
//         resource: asResource,
//         above
//       } = aoOpts;
//       path = path != null ? path.replace(/^[\/]/, '') : undefined;
//       const vsPath = (path != null) && path !== '' ? `${path}/` : (path != null) && path === '' ? '' : `${asName}/`;
//       const vsFullPath = (() => {
//         switch (at || this._at) {
//           case 'member':
//             const splittedPath = this._path.split('/');
//             const [previously, empty] = slice.call(splittedPath, -2);
//             return `${this._path}:${inflect.singularize(inflect.underscore(previously))}/${vsPath}`;
//           case 'collection':
//             return `${this._path}${vsPath}`;
//           default:
//             return `${this._path}${vsPath}`;
//         }
//       })();
//       const vsParentName = this._name;
//       const vsParentTemplates = (this._templates != null) && this._templates !== '' ? `${this._templates}/` : '';
//       const vsParentTag = (this._tag != null) && this._tag !== '' ? this._tag : '';
//       const vsName = (vsModule != null) && vsModule !== '' ? `${vsModule}/` : (vsModule != null) && vsModule === '' ? '' : `${asName}/`;
//       const vsTemplates = (alTemplates != null) && alTemplates !== '' ? alTemplates : (alTemplates != null) && alTemplates === '' ? '' : (vsModule != null) && vsModule !== '' ? vsModule : (vsModule != null) && vsModule === '' ? '' : asName;
//       const vsTag = (asTag != null) && asTag !== '' ? `/${asTag}` : '';
//       const vsParam = (asParam != null) && asParam !== '' ? asParam : ':' + inflect.singularize(inflect.underscore((asResource != null ? asResource : `${vsParentName}${vsName}`).replace(/[\/]/g, '_').replace(/[_]$/g, '')));

//       // @._routers ?= []
//       @partOf(vcModule)
//       class ResourceRouter extends Router {
//         // class ResourceRouter extends this.constructor {
//         @nameBy static __filename = 'ResourceRouter';
//         @meta static object = {};

//         @property _path: string = vsFullPath;

//         @property _name: string = `${vsParentName}${vsName}`;

//         @property _module: string = vsModule;

//         @property _only: ?(string | string[]) = only;

//         @property _via: ?(string | string[]) = via;

//         @property _except: ?(string | string[]) = except;

//         @property _above: ?object = above;

//         @property _tag: string = `${vsParentTag}${vsTag}`;

//         @property _templates: string = `${vsParentTemplates}${vsTemplates}`.replace(/[\/][\/]/g, '/');

//         @property _param: string = vsParam;

//         @property _resource: ?string = asResource;

//         @method map() {
//           return lambda.call(this);
//         }
//       }
//       ResourceRouter.constructor = Proto;
//       ResourceRouter.onInitialize();
//       this._routers.push(ResourceRouter);
//       // const vlRoutes = this._routes;
//       // (this._pathes || []).forEach((item) => {
//       //   vlRoutes.push(item);
//       // });
//       // const vlResources = this._resources;
//       // if (this._routers != null) {
//       // this._routers.forEach((InheritedRouter) => {
//       const inheritedRouter = ResourceRouter.new();
//       inheritedRouter.defineValues();
//       this._resources.push(inheritedRouter);
//       // (inheritedRouter.routes || []).forEach((item) => {
//       //   vlRoutes.push(item);
//       // });
//       // (inheritedRouter.resources || []).forEach((item) => {
//       //   vlResources.push(item);
//       // });
//       // });
//       // }
//       // this._routes = vlRoutes;
//       // this._resources = vlResources;

//     }

//     @method namespace(
//       asName: ?string,
//       aoOpts: ({
//         module: ?string,
//         prefix: ?string,
//         tag: ?string,
//         templates: ?string,
//         at: ?('collection' | 'member'),
//         above: ?object
//       } | Function) = null,
//       lambda: ?Function = null
//     ) {
//       const vcModule = this.Module;
//       if (_.isFunction(aoOpts)) {
//         lambda = aoOpts;
//         aoOpts = {};
//       }
//       if (aoOpts == null) {
//         aoOpts = {};
//       }
//       const {
//         module: vsModule,
//         prefix,
//         tag: asTag,
//         templates: alTemplates,
//         at,
//         above
//       } = aoOpts;
//       const vsParentPath = this._path;
//       const vsPath = (prefix != null) && prefix !== '' ? `${prefix}/` : (prefix != null) && prefix === '' ? '' : `${asName}/`;
//       const vsParentName = this._name;
//       const vsParentTemplates = (this._templates != null) && this._templates !== '' ? `${this._templates}/` : '';
//       const vsParentTag = (this._tag != null) && this._tag !== '' ? this._tag : '';
//       const vsName = (vsModule != null) && vsModule !== '' ? `${vsModule}/` : (vsModule != null) && vsModule === '' ? '' : `${asName}/`;
//       const vsTemplates = (alTemplates != null) && alTemplates !== '' ? alTemplates : (alTemplates != null) && alTemplates === '' ? '' : (vsModule != null) && vsModule !== '' ? vsModule : (vsModule != null) && vsModule === '' ? '' : asName;
//       const vsTag = (asTag != null) && asTag !== '' ? `/${asTag}` : '';

//       // @._routers ?= []
//       @partOf(vcModule)
//       class NamespaceRouter extends Router {
//         // class NamespaceRouter extends this.constructor {
//         @nameBy static __filename = 'NamespaceRouter';
//         @meta static object = {};

//         @property _path: string = `${vsParentPath}${vsPath}`;

//         @property _name: string = `${vsParentName}${vsName}`;

//         @property _except: ?(string | string[]) = ['all'];

//         @property _tag: string = `${vsParentTag}${vsTag}`;

//         @property _templates: string = `${vsParentTemplates}${vsTemplates}`.replace(/[\/][\/]/g, '/');

//         @property _at: ?('collection' | 'member') = at;

//         @property _above: ?object = above;

//         @method map() {
//           return lambda.call(this);
//         }
//       }
//       NamespaceRouter.constructor = Proto;
//       NamespaceRouter.onInitialize();
//       this._routers.push(NamespaceRouter);
//       // const vlRoutes = this._routes;
//       // (this._pathes || []).forEach((item) => {
//       //   vlRoutes.push(item);
//       // });
//       // const vlResources = this._resources;
//       // if (this._routers != null) {
//       // this._routers.forEach((InheritedRouter) => {
//       const inheritedRouter = NamespaceRouter.new();
//       inheritedRouter.defineValues();
//       this._resources.push(inheritedRouter);
//       // (inheritedRouter.routes || []).forEach((item) => {
//       //   vlRoutes.push(item);
//       // });
//       // (inheritedRouter.resources || []).forEach((item) => {
//       //   vlResources.push(item);
//       // });
//       // });
//       // }
//       // this._routes = vlRoutes;
//       // this._resources = vlResources;

//     }

//     @method member(lambda: Function) {
//       this.namespace(null, {
//         module: '',
//         prefix: '',
//         templates: '',
//         at: 'member'
//       }, lambda);
//     }

//     @method collection(lambda: Function) {
//       this.namespace(null, {
//         module: '',
//         prefix: '',
//         templates: '',
//         at: 'collection'
//       }, lambda);
//     }

//     @property get resources(): Array<Router> {
//       const vlResources = [];
//       (this._resources || []).forEach((item) => {
//         vlResources.push(item);
//       });
//       if (this._resources != null) {
//         this._resources.forEach((inheritedRouter) => {
//           (inheritedRouter._resources || []).forEach((item) => {
//             vlResources.push(item);
//           });
//         });
//       }
//       return vlResources;
//     }

//     @property get routes(): Array<{
//       method: string,
//       path: string,
//       resource: string,
//       action: string,
//       tag: string,
//       template: string,
//       keyName: ?string,
//       entityName: string,
//       recordName: ?string
//     }> {
//       // if ((this._routes != null) && this._routes.length > 0) {
//       //   return this._routes;
//       // } else {
//       const vlRoutes = [];
//       (this._pathes || []).forEach((item) => {
//         vlRoutes.push(item);
//       });
//       //   const vlResources = [];
//       //   if (this._routers != null) {
//       //     this._routers.forEach((InheritedRouter) => {
//       //       const inheritedRouter = InheritedRouter.new();
//       //       vlResources.push(inheritedRouter);
//       //       (inheritedRouter.routes || []).forEach((item) => {
//       //         vlRoutes.push(item);
//       //       });
//       //       (inheritedRouter.resources || []).forEach((item) => {
//       //         vlResources.push(item);
//       //       });
//       //     });
//       //   }
//       //   this._routes = vlRoutes;
//       //   this._resources = vlResources;
//       // }
//       // return this._routes;
//       if (this._resources != null) {
//         this._resources.forEach((inheritedRouter) => {
//           (inheritedRouter.routes || []).forEach((item) => {
//             vlRoutes.push(item);
//           });
//         });
//       }
//       return vlRoutes;
//     }

//     // @method init(...args) {
//     //   super.init(...args);
//     //   this._routers = [];
//     //   this._pathes = [];
//     // }

//     constructor() {
//       super(...arguments);
//     }

//     @method onRegister() {
//       super.onRegister(...arguments);
//       this.defineValues();
//     }

//     @method onRemove() {
//       super.onRemove(...arguments);
//     }

//     @method defineValues() {
//       this.map();
//       if (_.isString(this._only)) {
//         this._only = [this._only];
//       }
//       if (_.isString(this._via)) {
//         this._via = [this._via];
//       }
//       if (_.isString(this._except)) {
//         this._except = [this._except];
//       }
//       const voMethods = {
//         list: 'get',
//         detail: 'get',
//         create: 'post',
//         update: 'put',
//         delete: 'delete'
//       };
//       const voPaths = {
//         list: '',
//         detail: null,
//         create: '',
//         update: null,
//         delete: null
//       };
//       // @._pathes ?= []
//       if ((this._name != null) && this._name !== '') {
//         const vsKeyName = this._param && this._param.replace(/^\:/, '') || undefined;
//         const vsEntityName = this._above && this._above.entityName || this.defaultEntityName();
//         const vsAboveName = this._above && this._above.recordName || undefined;
//         // if (_.isNil(vsAboveName) && !_.isNull(vsAboveName)) {
//         //   const vsDefaultName = this.defaultEntityName();
//         // }
//         const vsRecordName = _.isNil(vsAboveName) && !_.isNull(vsAboveName) ? this.defaultEntityName() : vsAboveName;
//         if (this._only != null) {
//           this._only.forEach((asAction) => {
//             const vsPath = voPaths[asAction] || this._param;
//             this.defineMethod(this._pathes, voMethods[asAction], vsPath, {
//               action: asAction,
//               resource: this._resource || this._name,
//               template: this._templates + '/' + asAction,
//               keyName: vsKeyName,
//               entityName: vsEntityName,
//               recordName: vsRecordName
//             });
//           });
//         } else if (this._except != null) {
//           for (const asAction in voMethods) {
//             if (!hasProp.call(voMethods, asAction)) continue;
//             const vsMethod = voMethods[asAction];
//             if (!this._except.includes('all') && !this._except.includes(asAction)) {
//               const vsPath = voPaths[asAction] || this._param;
//               this.defineMethod(this._pathes, vsMethod, vsPath, {
//                 action: asAction,
//                 resource: this._resource || this._name,
//                 template: this._templates + '/' + asAction,
//                 keyName: vsKeyName,
//                 entityName: vsEntityName,
//                 recordName: vsRecordName
//               });
//             }
//           }
//         } else if (this._via != null) {
//           this._via.forEach((asCustomAction) => {
//             const vsPath = voPaths[asCustomAction] || this._param;
//             if (asCustomAction === 'all') {
//               for (const asAction in voMethods) {
//                 if (!hasProp.call(voMethods, asAction)) continue;
//                 const vsMethod = voMethods[asAction];
//                 this.defineMethod(this._pathes, vsMethod, vsPath, {
//                   action: asAction,
//                   resource: this._resource || this._name,
//                   template: this._templates + '/' + asAction,
//                   keyName: vsKeyName,
//                   entityName: vsEntityName,
//                   recordName: vsRecordName
//                 });
//               }
//             } else {
//               this.defineMethod(this._pathes, voMethods[asCustomAction], vsPath, {
//                 action: asCustomAction,
//                 resource: this._resource || this._name,
//                 template: this._templates + '/' + asAction,
//                 keyName: vsKeyName,
//                 entityName: vsEntityName,
//                 recordName: vsRecordName
//               });
//             }
//           });
//         } else {
//           for (const asAction in voMethods) {
//             if (!hasProp.call(voMethods, asAction)) continue;
//             const vsMethod = voMethods[asAction];
//             const vsPath = voPaths[asAction] || this._param;
//             this.defineMethod(this._pathes, vsMethod, vsPath, {
//               action: asAction,
//               resource: this._resource || this._name,
//               template: this._templates + '/' + asAction,
//               keyName: vsKeyName,
//               entityName: vsEntityName,
//               recordName: vsRecordName
//             });
//           }
//         }
//       }
//     }
//   }
// }
