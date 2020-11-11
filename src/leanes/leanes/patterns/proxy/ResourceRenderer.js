// leanes-restful-addon (Renderer)


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

// import type { ResourceRendererInterface } from '../../interfaces/ResourceRendererInterface';
// import type { ContextInterface } from '../../interfaces/ContextInterface';
// import type { ResourceInterface } from '../../interfaces/ResourceInterface';
// import type { RouterRouteT } from '../../types/RouterRouteT';
// import type { ResourceRendererListResultT } from '../../types/ResourceRendererListResultT';
// import type { ResourceRendererItemResultT } from '../../types/ResourceRendererItemResultT';

// export default (Module) => {
//   const {
//     APPLICATION_MEDIATOR,
//     Proxy,
//     assert,
//     initialize, partOf, meta, method, nameBy,
//     Utils: { _ }
//   } = Module.NS;


//   @initialize
//   @partOf(Module)
//   class ResourceRenderer extends Proxy implements ResourceRendererInterface {
//     @nameBy static  __filename = __filename;
//     @meta static object = {};

//     @method async render<
//       T = any, R = ?(ResourceRendererListResultT| ResourceRendererItemResultT | any)
//     >(
//       ctx: ContextInterface,
//       aoData: T,
//       resource: ResourceInterface,
//       opts: ?RouterRouteT = {}
//     ): Promise<R> {
//       const {
//         path,
//         resource: resourceName,
//         action,
//         template: templatePath
//       } = opts;
//       if ((path != null) && (resourceName != null) && (action != null)) {
//         const appMediator = this.facade.retrieveMediator(APPLICATION_MEDIATOR);
//         const service = appMediator.getViewComponent();
//         const { Templates } = service.Module.NS;
//         return await Promise.resolve().then(() =>
//           (Templates[templatePath])
//             .call(resource, resourceName, action, aoData) || aoData
//         );
//       } else {
//         return aoData;
//       }
//     }
//   }
// }
