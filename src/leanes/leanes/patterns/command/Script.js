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

import type { NotificationInterface } from '../../../patternes';
import type { ScriptInterface } from '../../interfaces/ScriptInterface';

export default (Module) => {
  const {
    SCRIPT_RESULT,
    // SimpleCommand,
    Command,
    ConfigurableMixin,
    initialize, partOf, meta, method, nameBy, mixin,
    Utils: { _ }
  } = Module.NS;


  @initialize
  @partOf(Module)
  @mixin(ConfigurableMixin)
  class Script extends Command implements ScriptInterface {
  // class Script extends SimpleCommand implements ScriptInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @method async body(data: ?any): Promise<?any> { return; }

    @method async execute(aoNotification: NotificationInterface): void {
      const voBody = aoNotification.getBody();
      const reverse = aoNotification.getType();
      let voResult = null;
      try {
        const result = await this.body(voBody);
        voResult = { result };
      } catch (error) {
        error.message = 'ERROR in Script::execute ' + error.message;
        console.error(error);
        voResult = { error };
      }
      this.send(SCRIPT_RESULT, voResult, reverse);
    }
  }
}
