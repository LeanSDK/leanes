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
    Pipes,
    initializeMixin, meta, method,
    Utils: { genRandomAlphaNumbers }
  } = Module.NS;
  const {
    FilterControlMessage,
    JunctionMediator,
    PipeAwareModule,
    LogFilterMessage,
    LogMessage
  } = Pipes.NS;
  const {
    SEND_TO_LOG, LEVELS, DEBUG, ERROR, FATAL, INFO, WARN, CHANGE
  } = LogMessage;
  const { SET_PARAMS } = FilterControlMessage;
  const { STDLOG } = PipeAwareModule;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @method listNotificationInterests(...args): string[] {
        const interests = super.listNotificationInterests(...args);
        interests.push(SEND_TO_LOG);
        interests.push(LogFilterMessage.SET_LOG_LEVEL);
        return interests;
      }

      @method async handleNotification(note: NotificationInterface): Promise<void> {
        let level;
        switch (note.getName()) {
          case SEND_TO_LOG:
            switch (note.getType()) {
              case LEVELS[DEBUG]:
                level = DEBUG;
                break;
              case LEVELS[ERROR]:
                level = ERROR;
                break;
              case LEVELS[FATAL]:
                level = FATAL;
                break;
              case LEVELS[INFO]:
                level = INFO;
                break;
              case LEVELS[WARN]:
                level = WARN;
                break;
              default:
                level = DEBUG;
                break;
            }
            const logMessage = LogMessage.new(level, this._multitonKey, note.getBody());
            await this._junction.sendMessage(STDLOG, logMessage);
            break;
          case LogFilterMessage.SET_LOG_LEVEL:
            const logLevel = note.getBody();
            const setLogLevelMessage = LogFilterMessage.new(SET_PARAMS, logLevel);
            await this._junction.sendMessage(STDLOG, setLogLevelMessage);
            const changedLevelMessage = LogMessage.new(CHANGE, this._multitonKey, `Changed Log Level to: ${LogMessage.LEVELS[logLevel]}`);
            await this._junction.sendMessage(STDLOG, changedLevelMessage);
            break;
          default:
            await super.handleNotification(note);
        }
      }
    }
    return Mixin;
  });
}
