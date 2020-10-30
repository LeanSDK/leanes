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

import { is as typeis } from 'type-is';
import { contentType as getType } from 'mime-types';
import { extname } from 'path';
import onFinished from 'on-finished';
import destroy from 'destroy';
import vary from 'vary'
import ensureErrorHandler from 'error-inject';
import contentDisposition from 'content-disposition';
import escapeHtml from 'escape-html';

import type { SwitchInterface } from '../../interfaces/SwitchInterface';
import type { ContextInterface } from '../../interfaces/ContextInterface';
import type { ResponseInterface } from '../../interfaces/ResponseInterface';

const hasProp = {}.hasOwnProperty;

/*
Идеи взяты из https://github.com/koajs/koa/blob/master/lib/response.js
*/

export default (Module) => {
  const {
    CoreObject,
    assert,
    initialize, partOf, meta, property, method, nameBy,
    Utils: { _, statuses, assign }
  } = Module.NS;


  @initialize
  @partOf(Module)
  class Response extends CoreObject implements ResponseInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property _res: object = null; // native response object

    @property get res(): object { // native response object
      return this._res;
    }

    @property get 'switch'(): SwitchInterface {
      return this.ctx.switch;
    }

    @property ctx: ContextInterface = null;

    @property get socket(): ?object {
      return this.ctx.req.socket;
    }

    @property get header(): object {
      return this.headers;
    }

    @property get headers(): object {
      // return this.res._headers || this.res.headers;
      if (_.isFunction(this.res.getHeaders)) {
        return this.res.getHeaders()
      } else {
        return this.res._headers || {}
      }
    }

    @property get status(): ?number {
      return this.res.statusCode;
    }

    @property set status(code: ?number): ?number {
      assert(_.isNumber(code), 'status code must be a number');
      assert(statuses[code], `invalid status code: ${code}`);
      assert(!this.res.headersSent, 'headers have already been sent');
      this._explicitStatus = true;
      this.res.statusCode = code;
      this.res.statusMessage = statuses[code];
      if (Boolean(this.body && statuses.empty[code])) {
        this.body = null;
      }
      return code;
    }

    @property get message(): string {
      return this.res.statusMessage || statuses[this.status];
    }

    @property set message(msg: string): string {
      this.res.statusMessage = msg;
      return msg;
    }

    @property get body(): any {
      return this._body;
    }

    @property set body(val: any): any {
      const original = this._body;
      this._body = val;
      if (this.res.headersSent) return;
      if (val == null) {
        if (!statuses.empty[this.status]) {
          this.status = 204;
        }
        this.remove('Content-Type');
        this.remove('Content-Length');
        this.remove('Transfer-Encoding');
        return;
      }
      if (!this._explicitStatus) {
        this.status = 200;
      }
      const setType = !this.headers['content-type'];
      if (_.isString(val)) {
        if (setType) {
          this.type = /^\s*</.test(val) ? 'html' : 'text';
        }
        this.length = Buffer.byteLength(val);
        return;
      }
      if (_.isBuffer(val)) {
        if (setType) {
          this.type = 'bin';
        }
        this.length = val.length;
        return;
      }
      if (_.isFunction(val.pipe)) {
        onFinished(this.res, destroy.bind(null, val))
        ensureErrorHandler(val, (err) => this.ctx.onerror(err))
        if (original != null && original !== val)
          this.remove('Content-Length');
        if (setType)
          this.type = 'bin';
        return
      }
      this.remove('Content-Length');
      this.type = 'json';
      return val;
    }

    @property get length(): number {
      const len = this.headers['content-length'];
      if (len == null) {
        if (!this.body) {
          return 0;
        }
        if (_.isString(this.body)) {
          return Buffer.byteLength(this.body);
        }
        if (_.isBuffer(this.body)) {
          return this.body.length;
        }
        if (_.isObjectLike(this.body)) {
          return Buffer.byteLength(JSON.stringify(this.body));
        }
        return 0;
      }
      return ~~Number(len);
    }

    @property set length(n: number): number {
      this.set('Content-Length', n);
      return n;
    }

    @property get headerSent(): ?boolean {
      return this.res.headersSent;
    }

    @method vary(field: string) {
      vary(this.res, field)
    }

    @method redirect(url: string, alt: ?string) {
      if ('back' === url)
        url = this.ctx.get('Referrer') || alt || '/';
      this.set('Location', url);
      if (!statuses.redirect[this.status])
        this.status = 302;
      if (this.ctx.accepts('html')) {
        url = escapeHtml(url);
        this.type = 'text/html; charset=utf-8';
        this.body = `Redirecting to <a href=\"${url}\">#{url}</a>.`;
        return
      }
      this.type = 'text/plain; charset=utf-8'
      this.body = `Redirecting to ${url}`
    }

    @method attachment(filename: string) {
      if (filename != null) {
        this.type = extname(filename)
      }
      this.set('Content-Disposition', contentDisposition(filename));
    }

    @property get lastModified(): ?Date {
      const date = this.get('last-modified')
      if (date != null)
        return new Date(date);
    }

    @property set lastModified(val: string | Date): Date {
      if (_.isString(val))
        val = new Date(val);
      this.set('Last-Modified', val.toUTCString());
      return val
    }

    @property get etag(): ?string {
      return this.get('ETag')
    }

    @property set etag(val: string): string {
      if (!/^(W\/)?"/.test(val)) val = `\"${val}\"`;
      this.set('ETag', val);
      return val;
    }

    @property get type(): ?string {
      const type = this.get('Content-Type');
      if (!type) return '';
      return type.split(';')[0];
    }

    @property set type(_type: ?string): ?string {
      const type = getType(_type);
      if (type) {
        this.set('Content-Type', type);
      } else {
        this.remove('Content-Type');
      }
      return _type;
    }

    @method is(...args: [string | Array]): ?(string | boolean) {
      let [ types ] = args;
      if (!types) {
        return this.type || false;
      }
      if (!_.isArray(types)) {
        types = args;
      }
      return typeis(this.type, types);
    }

    @method 'get'(field: string): string | string[] {
      return this.headers[field.toLowerCase()] || '';
    }

    @method 'set'(...args: [string | object]): ?any {
      const [ field, val ] = args;
      if (2 === args.length) {
        if (_.isArray(val)) {
          this.res.setHeader(field, val.map(String));
        } else {
          this.res.setHeader(field, String(val));
        }
      } else {
        for (const key in field) {
          if (!hasProp.call(field, key)) continue;
          this.set(key, field[key]);
        }
      }
    }

    @method append(field: string, val: string | string[]): void {
      const prev = this.get(field);
      if (prev != null && prev !== '') {
        if (_.isArray(prev)) {
          val = prev.concat(val);
        } else {
          val = [prev].concat(val);
        }
      }
      this.set(field, val);
    }

    @method remove(field: string): void {
      this.res.removeHeader(field)
    }

    @property get writable(): boolean {
      if (this.res.finished) return false;
      const socket = this.res.socket;
      if (socket == null) return true;
      return socket.writable;
    }

    @method flushHeaders(): void {
      // const headerNames = Object.keys(this.res._headers) || Object.keys(this.res.headers);
      // for (const header of headerNames) {
      //   this.remove(header);
      // }
      if (_.isFunction(this.res.flushHeaders)) {
        this.res.flushHeaders();
      } else {
        const headerNames = _.isFunction(this.res.getHeaderNames)
          ? this.res.getHeaderNames()
          : Object.keys(this.res._headers);
        for (const header of headerNames) {
          this.res.removeHeader(header);
        }
      }
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }

    constructor(context: ContextInterface, res: object) {
      super(... arguments);
      this.ctx = context;
      this._res = res;
    }
  }
}
