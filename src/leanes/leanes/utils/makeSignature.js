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

import crypto from 'crypto';

export default (Module) => {
  const {
    Utils: { jsonStringify }
  } = Module.NS

  Module.defineUtil(__filename, (algorithm: string, secret: string, attributes: any): string => {
    const str = jsonStringify(attributes);
    return crypto
      .createHmac(algorithm, secret)
      .update(str)
      .digest('hex')
  });
}
