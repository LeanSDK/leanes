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

import type { ProxyInterface } from './ProxyInterface';
import type { MediatorInterface } from './MediatorInterface';
import type { NotificationInterface } from './NotificationInterface';

export interface FacadeInterface {
  remove(): Promise<void>;

  registerCommand(asNotificationName: string, aCommand: Class<*>): void;

  removeCommand(asNotificationName: string): Promise<void>;

  hasCommand(asNotificationName: string): boolean;

  registerProxy(aoProxy: ProxyInterface): void;

  retrieveProxy(asProxyName: string): ?ProxyInterface;

  removeProxy(asProxyName: string): Promise<?ProxyInterface>;

  hasProxy(asProxyName: string): boolean;

  registerMediator(aoMediator: MediatorInterface): void;

  retrieveMediator(asMediatorName: string): ?MediatorInterface;

  removeMediator(asMediatorName: string): Promise<?MediatorInterface>;

  hasMediator(asMediatorName: string): boolean;

  notifyObservers<T = ?any>(aoNotification: NotificationInterface<T>): Promise<void>;

  sendNotification<T = ?any>(asName: string, aoBody: T, asType: ?string): Promise<void>;
}
