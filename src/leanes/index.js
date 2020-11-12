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

import PureMVC from '../puremvc';
import Pipes from '../pipes';
import joi from 'joi-browser';
import moment from 'moment';

import genRandomAlphaNumbersTF from './utils/genRandomAlphaNumbers';
import hashPasswordTF from './utils/hashPassword';
import jwtDecodeTF from './utils/jwtDecode';
import jwtEncodeTF from './utils/jwtEncode';
import makeHashTF from './utils/makeHash';
import makeSignatureTF from './utils/makeSignature';
import requestTF from './utils/request';
import verifyPasswordTF from './utils/verifyPassword';

import ApplicationMediatorMixinTF from './mixins/ApplicationMediatorMixin';
import LoggingJunctionMixinTF from './mixins/LoggingJunctionMixin';

import ApplicationTF from './facade/Application';
import LogMessageCommandTF from './command/LogMessageCommand';
import ScriptTF from './command/Script';

export * from '../puremvc';
export * from '../pipes';
export type { JoiT } from './types/JoiT';
export type { MomentT } from './types/MomentT';
export type {
  RequestT, LegacyResponseInterface, AxiosResponse, AxiosTransformer,
  AxiosBasicCredentials, AxiosProxyConfig, RequestArgumentsT,
  Config, LegacyRequestInterface,
  Cancel, Canceler, CancelTokenStatic, CancelToken, CancelTokenSource,
  AxiosInterceptorManager
} from './types/RequestT';
export type { StreamT } from './types/StreamT';

export type { ApplicationInterface } from './interfaces/ApplicationInterface';
export type { ScriptInterface } from './interfaces/ScriptInterface';

const {
  initialize, meta, nameBy, constant, resolver, util, freeze,
} = PureMVC.NS;

@initialize
@resolver(require, name => require(name))
class LeanES extends PureMVC {
  @nameBy static  __filename = 'LeanES';
  @meta static object = {};

  @constant ROOT = __dirname;

  @constant STARTUP = 'STARTUP';
  @constant SCRIPT_RESULT = 'SCRIPT_RESULT';
  @constant STARTUP_COMPLETE = 'STARTUP_COMPLETE';
  @constant LIGHTWEIGHT = Symbol.for('LIGHTWEIGHT');
  @constant SHELL = 'SHELL';
  @constant LOG_MSG = 'LOG_MSG';

  @util joi = joi;
  @util moment = moment;

  @constant Pipes = Pipes;
}

genRandomAlphaNumbersTF(LeanES);
hashPasswordTF(LeanES);
jwtDecodeTF(LeanES);
jwtEncodeTF(LeanES);
makeHashTF(LeanES);
makeSignatureTF(LeanES);
requestTF(LeanES);
verifyPasswordTF(LeanES);

ApplicationTF(LeanES);
ScriptTF(LeanES);
LogMessageCommandTF(LeanES);
ApplicationMediatorMixinTF(LeanES);
LoggingJunctionMixinTF(LeanES);

export default freeze(LeanES);
