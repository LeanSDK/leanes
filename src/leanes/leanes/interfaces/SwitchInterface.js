// leanes-restful-addon (HttpMediatorInterface)



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

// import type { ContextInterface } from '../interfaces/ContextInterface';
// import type { ResourceRendererInterface } from '../interfaces/ResourceRendererInterface';
// import type { ResourceInterface } from '../interfaces/ResourceInterface';

// import type { RouterRouteT } from '../types/RouterRouteT';
// import type {
//   LegacyResponseInterface, AxiosResponse, Config
// } from '../types/RequestT';

// export interface SwitchInterface {
//   middlewares: Array<(ctx: ContextInterface) => Promise<?boolean>>;

//   handlers: Array<(ctx: ContextInterface) => Promise<?boolean>>;

//   +responseFormats: string[];

//   routerName: string;

//   use(index: number | Function, middleware: ?Function): SwitchInterface;

//   callback(): (req: object, res: object) => Promise<void>;

//   handleStatistics(reqLength: number, resLength: number, time: number, aoContext: ContextInterface): Promise<void>;

//   onerror(err: Error): void;

//   respond(ctx: ContextInterface): void;

//   perform<
//     T = any, R = T, L = LegacyResponseInterface<AxiosResponse<T, R>>
//   >(method: string, url: string, options: Config<T, R>): Promise<L>;

//   rendererFor(asFormat: string): ResourceRendererInterface;

//   sendHttpResponse(
//     ctx: ContextInterface,
//     aoData: ?any,
//     resource: ResourceInterface,
//     opts: RouterRouteT
//   ): Promise<void>;

//   defineRoutes(): void;

//   sender(
//     resourceName: string,
//     aoMessage: {|context: ContextInterface, reverse: string|},
//     params: RouterRouteT
//   ): void;

//   createNativeRoute(opts: RouterRouteT): void;
// }
