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

// console.log('>>>>QQQQ 12-12+1');
import type { ApplicationInterface } from '../../interfaces/ApplicationInterface';
// console.log('>>>>QQQQ 12-12+2');
import type {
  LegacyResponseInterface, AxiosResponse, Config
} from '../../types/RequestT';

export default (Module) => {
  // console.log('>>>>QQQQ 12-12+3');
  const {
    LIGHTWEIGHT,
    APPLICATION_MEDIATOR, //APPLICATION_SWITCH,
    CONFIGURATION,
    Pipes, Facade,
    ConfigurableMixin,
    initialize, partOf, meta, property, method, nameBy, mixin,
    Utils: { uuid }
  } = Module.NS;
  const { PipeAwareModule } = Pipes.NS;
  // console.log('>>>>QQQQ 12-12+4');

  @initialize
  @partOf(Module)
  @mixin(ConfigurableMixin)
  class Application extends PipeAwareModule implements ApplicationInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static LOGGER_PROXY: string = 'LoggerProxy';
    @property static CONNECT_MODULE_TO_LOGGER: string = 'connectModuleToLogger';
    @property static CONNECT_SHELL_TO_LOGGER: string = 'connectShellToLogger';
    @property static CONNECT_MODULE_TO_SHELL: string = 'connectModuleToShell';

    @property isLightweight: boolean = false;
    @property name: string = null;

    // @property static get NAME(): string {
    //   return this.Module.name;
    // }

    @method start(): void {
      // console.log(';MMMMMMMM:::::', this.facade, this);
      this.facade.startup(this);
    }

    @method async finish(): void {
      await this.facade.remove();
    }

    @method async migrate(opts?: {until: ?string}): Promise<void> {
      const appMediator = this.facade.getMediator(APPLICATION_MEDIATOR);
      return await appMediator.migrate(opts);
    }

    @method async rollback(opts?: {steps: ?number, until: ?string}): Promise<void> {
      const appMediator = this.facade.getMediator(APPLICATION_MEDIATOR);
      return await appMediator.rollback(opts);
    }

    @method async run<
      T = any, R = any
    >(scriptName: string, data: T): Promise<R> {
      const appMediator = this.facade.getMediator(APPLICATION_MEDIATOR);
      return await appMediator.run(scriptName, data);
    }

    @method async execute<
      T = any, R = Promise<{|result: T, resource: ResourceInterface|}>
    >(resourceName: string, {
      context: ContextInterface,
      reverse: string
    }, action: string): Promise<R> {
      const appMediator = this.facade.getMediator(APPLICATION_MEDIATOR);
      return await appMediator.execute(
        resourceName, {context, reverse}, action
      );
    }

    @method async perform<
      T = any, R = T, L = LegacyResponseInterface<AxiosResponse<T, R>>
    >(methodName: string, url: string, options: Config<T, R>): Promise<?L> {
      const appMediator = this.facade.getMediator(APPLICATION_MEDIATOR);
      return await appMediator.perform<T, R, L>(methodName, url, options);
      // const appSwitch = this.facade.getMediator(APPLICATION_SWITCH);
      // if (appSwitch != null) {
      //   return await appSwitch.perform<T, R, L>(methodName, url, options);
      // }
    }

    // @method init(symbol: ?(Symbol | object)) {
    //   const { ApplicationFacade } = this.constructor.Module.NS;
    //   const isLightweight = symbol === LIGHTWEIGHT;
    //   const NAME = this.constructor.NAME || this.constructor.name;
    //   if (isLightweight) {
    //     super.init(ApplicationFacade.getInstance(`${NAME}|>${uuid.v4()}`));
    //   } else {
    //     const facade = ApplicationFacade.getInstance(NAME);
    //     console.log('>>MNMN<N<N facade', facade);
    //     super.init(facade);
    //     // super.init(ApplicationFacade.getInstance(NAME));
    //   }
    //   this.isLightweight = isLightweight;
    // }

    constructor(name: string, ApplicationFacade: Class<Facade>, symbol: ?Symbol) {
      // console.log('>>>>QQQQ 12-12+5');
      const isLightweight = symbol === LIGHTWEIGHT;
      if (isLightweight) {
        // console.log('>>>>QQQQ 12-12+6');
        const appName = `${name}|>${uuid.v4()}`
        super(ApplicationFacade.getInstance(appName));
        this.name = appName;
        // console.log('>>>>QQQQ 12-12+7');
      } else {
        // console.log('>>>>QQQQ 12-12+8');
        super(ApplicationFacade.getInstance(name));
        this.name = name;
        // console.log('>>>>QQQQ 12-12+9');
      }
      this.isLightweight = isLightweight;
      // console.log('>>>>QQQQ 12-12+10');
    }
  }
}
