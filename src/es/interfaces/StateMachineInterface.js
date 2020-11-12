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

import type { StateInterface } from './StateInterface';
import type { TransitionInterface } from './TransitionInterface';

export interface StateMachineInterface {
  currentState: ?StateInterface;
  initialState: ?StateInterface;

  states: {[key: string]: StateInterface};

  doBeforeReset(): Promise<?any>;
  doAfterReset(): Promise<?any>;
  doBeforeAllEvents(): Promise<?any>;
  doAfterAllEvents(): Promise<?any>;
  doAfterAllTransitions(): Promise<?any>;
  doErrorOnAllEvents(): Promise<?any>;
  doWithAnchorUpdateState(): Promise<?any>;
  doWithAnchorRestoreState(): Promise<?any>;
  doWithAnchorSave(): Promise<?any>;

  registerState(name: string, config: ?object): StateInterface;
  removeState(name: string): boolean;
  registerEvent(asEvent: string, alDepartures: string | string[], asTarget: string, ahEventConfig: ?object, ahTransitionConfig: ?object): void;
  reset(): Promise<void>;
  send(asEvent: string): Promise<void>;
  transitionTo(nextState: StateInterface, transition: TransitionInterface): Promise<void>;

  beforeAllEvents(asMethod: string): void;
  afterAllTransitions(asMethod: string): void;
  afterAllEvents(asMethod: string): void;
  errorOnAllEvents(asMethod: string): void;
  withAnchorUpdateState(asMethod: string): void;
  withAnchorSave(asMethod: string): void;
  withAnchorRestoreState(asMethod: string): void;
  state(asState: string, ahConfig: ?object): void;
  event(asEvent: string, ahConfig: object | Function, amTransitionInitializer: ?Function): void;
  transition(previousStates: string[], nextState: string, ahConfig: ?object): void;
}
