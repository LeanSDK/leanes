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

// export interface ContextInterface {
//   +req: object; // native request object

//   +res: object; // native response object

//   request: ?RequestInterface;

//   response: ?ResponseInterface;

//   state: ?object;

//   respond: ?boolean;

//   routePath: ?string;

//   pathParams: ?object;

//   transaction: ?object;

//   session: ?object;

//   'throw'(...args: [string | number, ?string, ?object]): void;

//   assert(...args): void;

//   onerror(err: ?any): void;

//   // Request aliases
//   +header: object;

//   +headers: object;

//   method: string;

//   url: string;

//   originalUrl: string;

//   +origin: string;

//   +href: string;

//   path: string;

//   query: object;

//   querystring: string;

//   +host: string;

//   +hostname: string;

//   +fresh: boolean;

//   +stale: boolean;

//   +socket: ?object;

//   +protocol: string;

//   +secure: boolean;

//   +ip: ?string;

//   +ips: string[];

//   +subdomains: string[];

//   is(...args: [string | Array]): ?(string | boolean);

//   accepts(...args: [?(string | Array)]): string | Array | boolean;

//   acceptsEncodings(...args: [?(string | Array)]): string | Array;

//   acceptsCharsets(...args: [?(string | Array)]): string | Array;

//   acceptsLanguages(...args: [?(string | Array)]): string | Array;

//   'get'(...args: [string]): string;

//   // Response aliases
//   body: any;

//   status: ?number;

//   message: string;

//   length: number;

//   +writable: boolean;

//   type: ?string;

//   +headerSent: ?boolean;

//   'set'(...args: [string | object]): ?any;

//   append(...args: [string, string | string[]]): void;

//   flushHeaders(): void;

//   remove(...args: [string]): void;
// }
