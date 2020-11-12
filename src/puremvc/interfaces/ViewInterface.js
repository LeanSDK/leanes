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

import type { ObserverInterface } from './ObserverInterface';
import type { ControllerInterface } from './ControllerInterface';
import type { MediatorInterface } from './MediatorInterface';
import type { NotificationInterface } from './NotificationInterface';

export interface ViewInterface {
  registerObserver(asNotificationName: string, aoObserver: ObserverInterface): void;

  removeObserver(asNotificationName: string, aoNotifyContext: ControllerInterface | MediatorInterface): void;

  notifyObservers(aoNotification: NotificationInterface): ?Promise<void>;

  registerMediator(aoMediator: MediatorInterface): void;

  retrieveMediator(asMediatorName: string): ?MediatorInterface;

  removeMediator(asMediatorName: string): Promise<?MediatorInterface>;

  hasMediator(asMediatorName: string): boolean;
}
