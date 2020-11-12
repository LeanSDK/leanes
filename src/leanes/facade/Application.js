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

import type { ApplicationInterface } from '../interfaces/ApplicationInterface';
import type {
  LegacyResponseInterface, AxiosResponse, Config
} from '../types/RequestT';

export default (Module) => {
  const {
    LIGHTWEIGHT, APPLICATION_MEDIATOR,
    Pipes, Facade,
    initialize, partOf, meta, property, method, nameBy, mixin,
    Utils: { uuid }
  } = Module.NS;
  const { PipeAwareModule } = Pipes.NS;

  @initialize
  @partOf(Module)
  class Application extends PipeAwareModule implements ApplicationInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static LOGGER_PROXY: string = 'LoggerProxy';
    @property static CONNECT_MODULE_TO_LOGGER: string = 'connectModuleToLogger';
    @property static CONNECT_SHELL_TO_LOGGER: string = 'connectShellToLogger';
    @property static CONNECT_MODULE_TO_SHELL: string = 'connectModuleToShell';

    @property isLightweight: boolean = false;
    @property name: string = null;

    @method start(): void {
      this.facade.startup(this);
    }

    @method async finish(): Promise<void> {
      await this.facade.remove();
    }

    @method async run<
      T = any, R = any
    >(scriptName: string, data: T): Promise<R> {
      const appMediator = this.facade.getMediator(APPLICATION_MEDIATOR);
      return await appMediator.run(scriptName, data);
    }

    constructor(name: string, ApplicationFacade: Class<Facade>, symbol: ?Symbol) {
      const isLightweight = symbol === LIGHTWEIGHT;
      if (isLightweight) {
        const appName = `${name}|>${uuid.v4()}`
        super(ApplicationFacade.getInstance(appName));
        this.name = appName;
      } else {
        super(ApplicationFacade.getInstance(name));
        this.name = name;
      }
      this.isLightweight = isLightweight;
    }
  }
}
