// leanes-restful-addon (HttpRequestInterface)



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

// export interface RequestInterface {
//   +req: object; // native request object

//   body: ?any;

//   +header: object;

//   +headers: object;

//   +originalUrl: string;

//   url: string;

//   +origin: string;

//   +href: string;

//   method: string;

//   path: string;

//   query: object;

//   querystring: string;

//   search: string;

//   +host: string;

//   +hostname: string;

//   +fresh: boolean;

//   +stale: boolean;

//   +idempotent: boolean;

//   +socket: ?object;

//   +charset: string;

//   +length: number;

//   +protocol: 'http' | 'https';

//   +secure: boolean;

//   ip: ?string;

//   +ips: string[];

//   +subdomains: string[];

//   accepts(...args: [?(string | Array)]): string | Array | boolean;

//   acceptsCharsets(...args: [?(string | Array)]): string | Array;

//   acceptsEncodings(...args: [?(string | Array)]): string | Array;

//   acceptsLanguages(...args: [?(string | Array)]): string | Array;

//   is(...args: [string | Array]): ?(string | boolean);

//   +type: string;

//   'get'(field: string): string;
// }
