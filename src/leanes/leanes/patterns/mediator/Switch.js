// leanes-restful-addon (HttpMediator)



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
// import type { SwitchInterface } from '../../interfaces/SwitchInterface';

// import type { ContextInterface } from '../../interfaces/ContextInterface';
// import type { ResourceRendererInterface } from '../../interfaces/ResourceRendererInterface';
// import type { ResourceInterface } from '../../interfaces/ResourceInterface';

// import type { RouterRouteT } from '../../types/RouterRouteT';
// import type {
//   LegacyResponseInterface, AxiosResponse, Config
// } from '../../types/RequestT';

// import pathToRegexp from 'path-to-regexp';
// import EventEmitter from 'events';
// import http from 'http';
// import onFinished from 'on-finished';
// import Stream from 'stream';

// const indexOf = [].indexOf;

// // from https://github.com/koajs/route/blob/master/index.js ###############
// const decode = (val: ?string): ?string => { // чистая функция
//   if (val) {
//     return decodeURIComponent(val);
//   }
// };

// const matches = (ctx: ContextInterface, methodName: string): boolean => {
//   if (!methodName) {
//     return true;
//   }
//   if (ctx.method === methodName) {
//     return true;
//   }
//   if (methodName === 'GET' && ctx.method === 'HEAD') {
//     return true;
//   }
//   return false;
// };

// export default (Module) => {
//   const {
//     MIGRATIONS,
//     APPLICATION_ROUTER,
//     APPLICATION_MEDIATOR,
//     HANDLER_RESULT,
//     METHODS,
//     Pipes,
//     Mediator,
//     Context, ResourceRenderer,
//     ConfigurableMixin,
//     assert,
//     initialize, partOf, meta, property, method, nameBy, mixin,
//     Utils: { _, inflect, genRandomAlphaNumbers, statuses }
//   } = Module.NS;


//   @initialize
//   @partOf(Module)
//   @mixin(ConfigurableMixin)
//   class Switch extends Mediator implements SwitchInterface {
//     @nameBy static  __filename = __filename;
//     @meta static object = {};

//     // iphEventNames = PointerT @private eventNames: Object
//     @property _eventNames: object = null;

//     // ipoHttpServer = PointerT(Switch.private({
//     @property _httpServer: object = null;

//     // ipoRenderers = PointerT(Switch.private({
//     @property _renderers: ?{[key: string]: ?ResourceRendererInterface} = null;

//     @property _composed: (ctx: ContextInterface) => Promise<void> = null;
//     @property _handler: (req: object, res: object) => Promise<void> = null;

//     @property middlewares: Array<(ctx: ContextInterface) => Promise<?boolean>> = null;

//     @property handlers: Array<(ctx: ContextInterface) => Promise<?boolean>> = null;

//     @property get responseFormats(): string[] {
//       return ['json', 'html', 'xml', 'atom', 'text'];
//     }

//     @property routerName: string = APPLICATION_ROUTER;
//     @property defaultRenderer: string = 'json';

//     @method static compose(
//       middlewares: Array<Function>,
//       handlers: Array<?Array<Function>>
//     ): (ctx: ContextInterface) => Promise<void> {
//       assert(_.isArray(middlewares), 'Middleware stack must be an array!');
//       assert(_.isArray(handlers), 'Handlers stack must be an array!');
//       return async (context: ContextInterface): Promise<void> => {
//         for (const middleware of middlewares) {
//           assert(_.isFunction(middleware), 'Middleware must be composed of functions!');
//           await middleware(context);
//         }
//         let runned = false;
//         for (const handlerGroup of handlers) {
//           if (handlerGroup == null) {
//             continue;
//           }
//           for (const handler of handlerGroup) {
//             assert(_.isFunction(handler), 'Handler must be composed of functions!');
//             if (await handler(context)) {
//               runned = true;
//               break;
//             }
//           }
//           if (runned) {
//             break;
//           }
//         }
//       }
//     }

//     @method static createMethod(methodName: ?string): void {
//       const originMethodName = methodName || 'all';
//       if (methodName) {
//         methodName = methodName.toUpperCase();
//       }
//       Reflect.defineProperty(this.prototype, `${originMethodName}`, method(
//         this.prototype, `${originMethodName}`, {
//           value: function (path: string, routeFunc: Function) {
//             assert(!!routeFunc, 'handler is required');
//             const { facade } = this;
//             const { ERROR, DEBUG, LEVELS, SEND_TO_LOG } = Module.NS.Pipes.NS.LogMessage;
//             const keys = [];
//             const re = pathToRegexp(path, keys);
//             facade.sendNotification(
//               SEND_TO_LOG, `${methodName != null ? methodName : 'ALL'} ${path} -> ${re}`, LEVELS[DEBUG]
//             );
//             this.use(keys.length, async (ctx) => {
//               if (!matches(ctx, methodName)) {
//                 return;
//               }
//               const m = re.exec(ctx.path);
//               if (m) {
//                 const pathParams = m.slice(1)
//                   .map(decode)
//                   .reduce((prev, item, index) => {
//                     prev[keys[index].name] = item;
//                     return prev;
//                   }, {});
//                 ctx.routePath = path;
//                 facade.sendNotification(
//                   SEND_TO_LOG, `${ctx.method} ${path} matches ${ctx.path} ${JSON.stringify(pathParams)}`, LEVELS[DEBUG]
//                 );
//                 ctx.pathParams = pathParams;
//                 return await routeFunc.call(this, ctx);
//               }
//             });
//           }
//         }
//       ));
//     }

//     @method del(...args) {
//       return this.delete(...args);
//     }

//     // @public jsonRendererName: String
//     // @public htmlRendererName: String
//     // @public xmlRendererName: String
//     // @public atomRendererName: String
//     @method listNotificationInterests(): string[] {
//       return [ HANDLER_RESULT ];
//     }

//     @method handleNotification(aoNotification: NotificationInterface): void {
//       const vsName = aoNotification.getName();
//       const voBody = aoNotification.getBody();
//       const vsType = aoNotification.getType();
//       switch (vsName) {
//         case HANDLER_RESULT:
//           this.getViewComponent().emit(vsType, voBody);
//       }
//     }

//     @method onRegister() {
//       const voEmitter = new EventEmitter();
//       if (!_.isFunction(voEmitter.eventNames)) {
//         const eventNames = this._eventNames = {};
//         const FILTER = ['newListener', 'removeListener'];
//         voEmitter.on('newListener', (event, listener) => {
//           if (indexOf.call(FILTER, event) < 0) {
//             if (eventNames[event] == null) {
//               eventNames[event] = 0;
//             }
//             ++eventNames[event];
//           }
//         });
//         voEmitter.on('removeListener', (event, listener) => {
//           if (indexOf.call(FILTER, event) < 0) {
//             if (eventNames[event] > 0) {
//               --eventNames[event];
//             }
//           }
//         });
//       }
//       if (voEmitter.listeners('error').length === 0) {
//         voEmitter.on('error', this.onerror.bind(this));
//       }
//       this.setViewComponent(voEmitter);
//       this.defineRoutes();
//       this.serverListen();
//     }

//     @method async onRemove() {
//       const voEmitter = this.getViewComponent();
//       const eventNames = typeof voEmitter.eventNames === "function"
//         ? voEmitter.eventNames()
//         : Object.keys(this._eventNames || {});
//       eventNames.forEach((eventName) => {
//         voEmitter.removeAllListeners(eventName);
//       });
//       await new Promise((resolve) => this._httpServer.close(resolve))
//       console.log("after Switch::onRemove", this._multitonKey);
//     }

//     @method serverListen() {
//       const {ERROR, DEBUG, LEVELS, SEND_TO_LOG} = Module.NS.Pipes.NS.LogMessage;
//       const port = typeof process !== "undefined" && process != null && process.env != null ? process.env.PORT || this.configs.port : this.configs.port;
//       const { facade } = this;
//       this._httpServer = http.createServer(this.callback());
//       this._httpServer.listen(port, function() {
//         // console.log "listening on port #{port}"
//         facade.sendNotification(SEND_TO_LOG, `listening on port ${port}`, LEVELS[DEBUG]);
//       });
//     }

//     @method use(index: number | Function, middleware: ?Function): SwitchInterface {
//       if (middleware == null) {
//         middleware = index;
//         index = null;
//       }
//       assert(_.isFunction(middleware), 'middleware or handler must be a function!');
//       const middlewareName = middleware.name || '-';
//       const { ERROR, DEBUG, LEVELS, SEND_TO_LOG} = Module.NS.Pipes.NS.LogMessage;
//       this.sendNotification(SEND_TO_LOG, `use ${middlewareName}`, LEVELS[DEBUG]);
//       if (index != null) {
//         if (this.handlers[index] == null) {
//           this.handlers[index] = [];
//         }
//         this.handlers[index].push(middleware);
//       } else {
//         this.middlewares.push(middleware);
//       }
//       return this;
//     }

//     @method callback(): (req: object, res: object) => Promise<void> {
//       // if (this._composed == null) {
//         this._composed = this.constructor.compose(
//           this.middlewares, this.handlers
//         );
//       // }
//       const fn = this._composed;
//       // if (this._handler == null) {
//         // this._handler = async (req, res) => {
//         return async (req, res) => {
//           const t1 = Date.now();
//           const { ERROR, DEBUG, LEVELS, SEND_TO_LOG } = Module.NS.Pipes.NS.LogMessage;
//           this.sendNotification(SEND_TO_LOG, '>>>>>> START REQUEST HANDLING', LEVELS[DEBUG]);
//           res.statusCode = 404;
//           const voContext = Context.new(this, req, res);
//           try {
//             await fn(voContext);
//             this.respond(voContext);
//           } catch (error) {
//             voContext.onerror(error);
//           }

//           onFinished(res, (err) => {
//             voContext.onerror(err);
//           });
//           this.sendNotification(SEND_TO_LOG, '>>>>>> END REQUEST HANDLING', LEVELS[DEBUG]);
//           const reqLength = voContext.request.length;
//           const resLength = voContext.response.length;
//           const time = Date.now() - t1;
//           await this.handleStatistics(reqLength, resLength, time, voContext);
//         };
//       // }
//       // return this._handler;
//     }

//     @method async handleStatistics(reqLength: number, resLength: number, time: number, aoContext: ContextInterface) {
//       const { DEBUG, LEVELS, SEND_TO_LOG } = Module.NS.Pipes.NS.LogMessage;
//       this.sendNotification(SEND_TO_LOG, `REQUEST LENGTH ${reqLength} byte RESPONSE LENGTH ${resLength} byte HANDLED BY ${time} ms`, LEVELS[DEBUG]);
//     }

//     @method onerror(err: Error): void {
//       assert(_.isError(err), `non-error thrown: ${err}`);
//       if (404 === err.status || err.expose) {
//         return;
//       }
//       if (this.configs.silent) {
//         return;
//       }
//       const msg = err.stack || String(err);
//       const { ERROR, DEBUG, LEVELS, SEND_TO_LOG } = Module.NS.Pipes.NS.LogMessage;
//       this.sendNotification(SEND_TO_LOG, msg.replace(/^/gm, '  '), LEVELS[ERROR]);
//     }

//     @method respond(ctx: ContextInterface): void {
//       if (ctx.respond === false) return;
//       let body = ctx.body;
//       const code = ctx.status;
//       if (statuses.empty[code]) {
//         ctx.body = null;
//         ctx.res.end();
//         return;
//       }
//       if ('HEAD' === ctx.method) {
//         if (!ctx.headersSent && _.isObjectLike(body)) {
//           ctx.length = Buffer.byteLength(JSON.stringify(body));
//         }
//         ctx.res.end();
//         return;
//       }
//       if (body == null) {
//         body = ctx.message || String(code);
//         if (!ctx.headersSent) {
//           ctx.type = 'text';
//           ctx.length = Buffer.byteLength(body);
//         }
//         ctx.res.end(body);
//         return;
//       }
//       if (_.isBuffer(body) || _.isString(body)) {
//         ctx.res.end(body);
//         return;
//       }
//       if (body instanceof Stream) {
//         body.pipe(ctx.res);
//         return;
//       }
//       body = JSON.stringify(body != null ? body : null);
//       if (!ctx.res.headersSent) {
//         ctx.length = Buffer.byteLength(body);
//       }
//       ctx.res.end(body);
//     }

//     @method async perform<
//       T = any, R = T, L = LegacyResponseInterface<AxiosResponse<T, R>>
//     >(methodName: string, url: string, options: Config<T, R>): Promise<L> {
//       this.sendNotification(SEND_TO_LOG, '>>>>>> START PERFORM-REQUEST HANDLING', LEVELS[DEBUG]);
//       if (this._composed == null) {
//         this._composed = this.constructor.compose(
//           this.middlewares, this.handlers
//         );
//       }
//       const fn = this._composed;
//       const req = {
//         method: methodName,
//         url,
//         headers: options.headers
//       };
//       if (options.body != null) {
//         req.body = options.data || options.body || options.form;
//         req.rawBody = new Buffer(JSON.stringify(req.body));
//       }
//       const res = { statusCode: 404 };
//       const voContext = Context.new(this, req, res);
//       voContext.isPerformExecution = true;
//       try {
//         await fn(voContext);
//         this.respond(voContext);
//       } catch (error) {
//         voContext.onerror(error);
//       }
//       const {
//         statusCode: status,
//         statusMessage: message,
//         body,
//         headers
//       } = res;
//       this.sendNotification(SEND_TO_LOG, '>>>>>> END PERFORM-REQUEST HANDLING', LEVELS[DEBUG]);
//       return { status, message, headers, body };
//     }

//     @method rendererFor(asFormat: string): ResourceRendererInterface {
//       if (this._renderers == null) {
//         this._renderers = {};
//       }
//       if (this._renderers[asFormat] == null) {
//         this._renderers[asFormat] = ((asFormat) => {
//           const voRenderer = this[`${asFormat}RendererName`] != null ?
//             this.facade.retrieveProxy(this[`${asFormat}RendererName`])
//           : ResourceRenderer.new();
//           return voRenderer;
//         })(asFormat);
//       }
//       return this._renderers[asFormat];
//     }

//     @method async sendHttpResponse(
//       ctx: ContextInterface,
//       aoData: ?any,
//       resource: ResourceInterface,
//       opts: RouterRouteT
//     ): Promise<void> {
//       if (opts.action === 'create') {
//         ctx.status = 201;
//       }
//       let voRenderer;
//       if ((ctx.headers && ctx.headers.accept || undefined) != null) {
//         const vsFormat = ctx.accepts(this.responseFormats);
//         switch (vsFormat) {
//           case false:
//             break;
//           default:
//             if (this[`${vsFormat}RendererName`] != null) {
//               voRenderer = this.rendererFor(vsFormat);
//             }
//         }
//       } else {
//         if (this[`${this.defaultRenderer}RendererName`] != null) {
//           voRenderer = this.rendererFor(this.defaultRenderer);
//         }
//       }
//       if (voRenderer != null) {
//         ctx.body = await voRenderer.render(ctx, aoData, resource, opts);
//       }
//     }

//     @method defineRoutes() {
//       const voRouter = this.facade.retrieveProxy(
//         this.routerName || APPLICATION_ROUTER
//       );
//       voRouter.routes.forEach((aoRoute) => {
//         return this.createNativeRoute(aoRoute);
//       });
//     }

//     @method sender(
//       resourceName: string,
//       aoMessage: {|context: ContextInterface, reverse: string|},
//       // { method: methodName, path, resource, action }: RouterRouteT
//       route: RouterRouteT
//     ): void {
//       this.sendNotification(resourceName, aoMessage, route.action);
//     }

//     @method createNativeRoute(opts: RouterRouteT): void {
//       const { method: methodName, path } = opts;
//       const resourceName = inflect.camelize(inflect.underscore(`${opts.resource.replace(/[\/]/g, '_')}Resource`));
//       if (typeof this[methodName] === "function") {
//         this[methodName](path, async (context) => {
//           await new Promise((resolve, reject) => {
//             try {
//               const reverse = genRandomAlphaNumbers(32);
//               this.getViewComponent().once(reverse, async ({ error, result, resource }) => {
//                 if (error != null) {
//                   console.log('>>>>>> ERROR AFTER RESOURCE', error);
//                   reject(error);
//                   return;
//                 }
//                 try {
//                   await this.sendHttpResponse(context, result, resource, opts);
//                   resolve();
//                 } catch (e) {
//                   reject(e);
//                 }
//               });
//               this.sender(resourceName, {context, reverse}, opts);
//             } catch (err) {
//               reject(err);
//             }
//           });
//           return true;
//         });
//       }
//     }

//     constructor() {
//       super(... arguments);
//       this._renderers = {};
//       this.middlewares = [];
//       this.handlers = [];
//     }
//   }

//   METHODS.forEach((methodName) => {
//     // console.log 'SWITCH:', @
//     Switch.createMethod(methodName);
//   });

//   Switch.createMethod(); // create 'all'
// }
