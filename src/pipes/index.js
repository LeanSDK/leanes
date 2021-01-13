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

import Pipe from './Pipe';
import PipeMessage from './PipeMessage';
import PipeListener from './PipeListener';
import FilterControlMessage from './FilterControlMessage';
import LogMessage from './LogMessage';
import LogFilterMessage from './LogFilterMessage';
import Filter from './Filter';
import Junction from './Junction';
import JunctionMediator from './JunctionMediator';
import PipeAwareModule from './PipeAwareModule';
import LineControlMessage from './LineControlMessage';
import Line from './Line';
import TeeMerge from './TeeMerge';
import TeeSplit from './TeeSplit';

export type { PipeAwareInterface } from './interfaces/PipeAwareInterface';
export type { PipeFittingInterface } from './interfaces/PipeFittingInterface';
export type { PipeMessageInterface } from './interfaces/PipeMessageInterface';

const { initialize, meta, nameBy, freeze, resolver, constant } = PureMVC.NS;

@TeeSplit
@TeeMerge
@Line
@LineControlMessage
@PipeAwareModule
@JunctionMediator
@Junction
@Filter
@LogFilterMessage
@LogMessage
@FilterControlMessage
@PipeListener
@PipeMessage
@Pipe

@initialize
@resolver(require, name => require(name))
class Pipes extends PureMVC {
  @nameBy static  __filename = 'Pipes';
  @meta static object = {};

  @constant ROOT = __dirname;
}

export default freeze(Pipes);
