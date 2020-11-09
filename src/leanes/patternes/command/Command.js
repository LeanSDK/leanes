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

import type { CommandInterface } from '../interfaces/CommandInterface';
import type { NotificationInterface } from '../interfaces/NotificationInterface';
import { injectable } from 'inversify';

export default (Module) => {

  const {
    Notifier, CoreObject,
    assert,
    initialize, partOf, meta, property, method, nameBy
  } = Module.NS;

  @initialize
  @injectable()
  @partOf(Module)
  class Command extends Notifier implements CommandInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property _subCommands: Array<Class<CoreObject>> = null;

    @method execute(aoNotification: NotificationInterface): void {
      const vlSubCommands = [... this._subCommands];
      for (const vCommand of vlSubCommands) {
        if (!this.facade.container.isBound(vCommand.name)) {
          this.facade.container.bind(vCommand.name).to(vCommand);
        }
        const voCommand: CommandInterface = this.facade.container.get(vCommand.name);
        // const voCommand = vCommand.new();
        voCommand.initializeNotifier(this._multitonKey);
        voCommand.execute(aoNotification);
      }
    }

    @method initializeSubCommands(): void { return; }

    @method addSubCommand(aClass: Class<CoreObject>): void {
      this._subCommands.push(aClass);
      return;
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }

    constructor() {
      super(... arguments);
      this._subCommands = [];
      this.initializeSubCommands();
    }
  }
}
