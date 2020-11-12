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

import PipeTF from './Pipe';
import PipeMessageTF from './PipeMessage';
import PipeListenerTF from './PipeListener';
import FilterControlMessageTF from './FilterControlMessage';
import LogMessageTF from './LogMessage';
import LogFilterMessageTF from './LogFilterMessage';
import FilterTF from './Filter';
import JunctionTF from './Junction';
import JunctionMediatorTF from './JunctionMediator';
import PipeAwareModuleTF from './PipeAwareModule';
import LineControlMessageTF from './LineControlMessage';
import LineTF from './Line';
import TeeMergeTF from './TeeMerge';
import TeeSplitTF from './TeeSplit';

export type { PipeAwareInterface } from './interfaces/PipeAwareInterface';
export type { PipeFittingInterface } from './interfaces/PipeFittingInterface';
export type { PipeMessageInterface } from './interfaces/PipeMessageInterface';

const { initialize, meta, nameBy, freeze, resolver, constant } = PureMVC.NS;

@initialize
@resolver(require, name => require(name))
class Pipes extends PureMVC {
  @nameBy static  __filename = 'Pipes';
  @meta static object = {};

  @constant ROOT = __dirname;
}

PipeTF(Pipes);
PipeMessageTF(Pipes);
PipeListenerTF(Pipes);
FilterControlMessageTF(Pipes);
LogMessageTF(Pipes);
LogFilterMessageTF(Pipes);
FilterTF(Pipes);
JunctionTF(Pipes);
JunctionMediatorTF(Pipes);
PipeAwareModuleTF(Pipes);
LineControlMessageTF(Pipes);
LineTF(Pipes);
TeeMergeTF(Pipes);
TeeSplitTF(Pipes);

export default freeze(Pipes);
