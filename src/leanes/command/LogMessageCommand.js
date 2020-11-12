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

import type { NotificationInterface } from '../../puremvc';

export default (Module) => {
  const {
    Command,
    Application,
    initialize, partOf, meta, method, nameBy
  } = Module.NS;
  const { LOGGER_PROXY } = Application;

  @initialize
  @partOf(Module)
  class LogMessageCommand extends Command {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @method execute(aoNotification: NotificationInterface): void {
      const proxy = this.facade.getProxy(LOGGER_PROXY);
      proxy.addLogEntry(aoNotification.getBody());
      return;
    }
  }
}
