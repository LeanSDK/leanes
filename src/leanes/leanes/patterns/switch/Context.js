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

// import accepts from 'accepts';
// import createError from 'http-errors';

// import type { SwitchInterface } from '../../interfaces/SwitchInterface';
// import type { ContextInterface } from '../../interfaces/ContextInterface';
// import type { RequestInterface } from '../../interfaces/RequestInterface';
// import type { ResponseInterface } from '../../interfaces/ResponseInterface';

// /*
// Идеи взяты из https://github.com/koajs/koa/blob/master/lib/context.js
// */

// export default (Module) => {
//   const {
//     DEVELOPMENT,
//     CoreObject,
//     Request, Response,
//     assert,
//     initialize, partOf, meta, property, method, nameBy,
//     Utils: { _, statuses }
//   } = Module.NS;


//   @initialize
//   @partOf(Module)
//   class Context extends CoreObject implements ContextInterface {
//     @nameBy static  __filename = __filename;
//     @meta static object = {};

//     @property _req: object = null; // native request object

//     @property _res: object = null; // native response object

//     @property get req(): object {
//       return this._req;
//     }

//     @property get res(): object {
//       return this._res;
//     }

//     @property request: ?RequestInterface = null;

//     @property response: ?ResponseInterface = null;

//     @property accept: object = null;

//     @property state: ?object = null;

//     @property switch: SwitchInterface = null;

//     @property respond: ?boolean = null;

//     @property routePath: ?string = null;

//     @property pathParams: ?object = null;

//     @property transaction: ?object = null;

//     @property session: ?object = null;

//     @property isPerformExecution: boolean = false;

//     @method 'throw'(...args: [string | number, ?string, ?object]): void {
//       throw createError(...args);
//     }

//     @method assert(...args) {
//       return assert(...args);
//     }

//     @method onerror(err: ?any): void {
//       if (err == null) {
//         return;
//       }
//       if (!_.isError(err)) {
//         err = new Error(`non-error thrown: ${err}`);
//       }
//       const headerSent = err.headerSent = !!(this.headerSent || !this.writable);
//       this.switch.getViewComponent().emit('error', err, this);
//       if (headerSent) return;

//       if (_.isFunction(this.res.getHeaderNames))
//         this.res.getHeaderNames().forEach((name) => {this.res.removeHeader(name)});

//       const vlHeaderNames = Object.keys(this.res.headers || {});

//       vlHeaderNames.forEach((name) => {
//         this.res.removeHeader(name);
//         delete this.res.headers[name];
//       });

//       this.set(err.headers || {});
//       this.type = 'text';
//       if ('ENOENT' === err.code) {
//         err.status = 404;
//       }
//       if (!_.isNumber(err.status) || !statuses[err.status]) {
//         err.status = 500;
//       }
//       const code = statuses[err.status];
//       const msg = err.expose ? err.message : code;
//       const message = {
//         error: true,
//         errorNum: err.status,
//         errorMessage: msg,
//         code: err.code || code
//       };
//       if (this.switch.configs.environment === DEVELOPMENT) {
//         message.exception = `${err.name || 'Error'}: ${msg}`;
//         message.stacktrace = err.stack.split('\n');
//       }
//       this.status = err.status;
//       const vsMessage = JSON.stringify(message);
//       this.length = Buffer.byteLength(vsMessage);
//       this.res.end(vsMessage);
//     }

//     // Request aliases
//     @property get header(): object {
//       return this.request.header;
//     }

//     @property get headers(): object {
//       return this.request.headers;
//     }

//     @property get method(): string {
//       return this.request.method;
//     }

//     @property set method(method: string): string {
//       return this.request.method = method;
//     }

//     @property get url(): string {
//       return this.request.url;
//     }

//     @property set url(url: string): string {
//       return this.request.url = url;
//     }

//     @property originalUrl: string = null;

//     @property get origin(): string {
//       return this.request.origin;
//     }

//     @property get href(): string {
//       return this.request.href;
//     }

//     @property get path(): string {
//       return this.request.path;
//     }

//     @property set path(path: string): string {
//       return this.request.path = path;
//     }

//     @property get query(): object {
//       return this.request.query;
//     }

//     @property set query(query: object): object {
//       return this.request.query = query;
//     }

//     @property get querystring(): string {
//       return this.request.querystring;
//     }

//     @property set querystring(querystring: string): string {
//       return this.request.querystring = querystring;
//     }

//     @property get host(): string {
//       return this.request.host;
//     }

//     @property get hostname(): string {
//       return this.request.hostname;
//     }

//     @property get fresh(): boolean {
//       return this.request.fresh;
//     }

//     @property get stale(): boolean {
//       return this.request.stale;
//     }

//     @property get socket(): ?object {
//       return this.request.socket;
//     }

//     @property get protocol(): string {
//       return this.request.protocol;
//     }

//     @property get secure(): boolean {
//       return this.request.secure;
//     }

//     @property get ip(): string {
//       return this.request.ip;
//     }

//     @property get ips(): string[] {
//       return this.request.ips;
//     }

//     @property get subdomains(): string[] {
//       return this.request.subdomains;
//     }

//     @method is(...args: [string | Array]): ?(string | boolean) {
//       return this.request.is(...args);
//     }

//     @method accepts(...args: [?(string | Array)]): string | Array | boolean {
//       return this.request.accepts(...args);
//     }

//     @method acceptsEncodings(...args: [?(string | Array)]): string | Array {
//       return this.request.acceptsEncodings(...args);
//     }

//     @method acceptsCharsets(...args: [?(string | Array)]): string | Array  {
//       return this.request.acceptsCharsets(...args);
//     }

//     @method acceptsLanguages(...args: [?(string | Array)]): string | Array {
//       return this.request.acceptsLanguages(...args);
//     }

//     @method 'get'(...args: [string]): string {
//       return this.request.get(...args);
//     }

//     // Response aliases
//     @property get body(): any {
//       return this.response.body;
//     }

//     @property set body(body: any): any {
//       return this.response.body = body;
//     }

//     @property get status(): ?number {
//       return this.response.status;
//     }

//     @property set status(status: ?number): ?number {
//       return this.response.status = status;
//     }

//     @property get message(): string {
//       return this.response.message;
//     }

//     @property set message(message: string): string {
//       return this.response.message = message;
//     }

//     @property get length(): number {
//       return this.response.length;
//     }

//     @property set length(length: number): number {
//       return this.response.length = length;
//     }

//     @property get writable(): boolean {
//       return this.response.writable;
//     }

//     @property get type(): ?string {
//       return this.response.type;
//     }

//     @property set type(type: ?string): ?string {
//       return this.response.type = type;
//     }

//     @property get headerSent(): ?boolean {
//       return this.response.headerSent;
//     }

//     @method redirect(...args: [string]): ?string {
//       return this.response.redirect(...args);
//     }

//     @method attachment(...args: [string]): void  {
//       return this.response.attachment(...args);
//     }

//     @method 'set'(...args: [string | object]): ?any {
//       return this.response.set(...args);
//     }

//     @method append(...args: [string, string | string[]]): void {
//       return this.response.append(...args);
//     }

//     @method vary(...args: [string]): void {
//       return this.response.vary(...args);
//     }

//     @method flushHeaders(...args): void {
//       return this.response.flushHeaders(...args);
//     }

//     @method remove(...args: [string]): void {
//       return this.response.remove(...args);
//     }

//     @property set lastModified(date: string | Date): Date {
//       return this.response.lastModified = date;
//     }

//     @property set etag(value: string): string {
//       return this.response.etag = value;
//     }

//     @method static async restoreObject() {
//       assert.fail(`restoreObject method not supported for ${this.name}`);
//     }

//     @method static async replicateObject() {
//       assert.fail(`replicateObject method not supported for ${this.name}`);
//     }

//     constructor(switchInstanse: SwitchInterface, req: object, res: object) {
//       super(... arguments);
//       this._req = req;
//       this._res = res;
//       this.switch = switchInstanse;
//       this.originalUrl = req.url;
//       this.accept = accepts(req);
//       this.request = Request.new(this, req);
//       this.response = Response.new(this, res);
//       this.state = {};
//     }
//   }
// }
