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

const modulo = (a, b) => (+a % (b = +b) + b) % b;

const uuid = {
  v4: () =>
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // we use `Math.random` for cross platform compatibility between NodeJS and ArangoDB
      // when we will be use uuid.v4() for setting value in some attribute
      // then it attribute must has unique constraint index,
      // and logic for setting must check existing record with its value
      const sixteenNumber = Number.parseInt(Math.random() * Math.pow(10, 16));
      const r = modulo(sixteenNumber, 16);
      const v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    })
};

export default uuid;
