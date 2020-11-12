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

export default (Module) => {
  const {
    PipeMessage,
    initialize, partOf, meta, property, method, nameBy
  } = Module.NS;

  @initialize
  @partOf(Module)
  class FilterControlMessage extends PipeMessage {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static get BASE(): string {
      return `${PipeMessage.BASE}filter-control/`;
    }

    @property static get SET_PARAMS(): string {
      return `${this.BASE}setparams`;
    }

    @property static get SET_FILTER(): string {
      return `${this.BASE}setfilter`;
    }

    @property static get BYPASS(): string {
      return `${this.BASE}bypass`;
    }

    @property static get FILTER(): string {
      return `${this.BASE}filter`;
    }

    @property _name: string = null;

    @property _filter: ?Function = null;

    @property _params: ?object = null;

    @method setName(asName: string) {
      this._name = asName;
    }

    @method getName(): string {
      return this._name;
    }

    @method setFilter(amFilter: Function) {
      this._filter = amFilter;
    }

    @method getFilter(): Function {
      return this._filter;
    }

    @method setParams(aoParams: object) {
      this._params = aoParams;
    }

    @method getParams(): object {
      return this._params;
    }

    constructor(asType: string, asName: string, amFilter: ?Function = null, aoParams: ?object = null) {
      super(asType);
      this.setName(asName);
      if (amFilter != null) {
        this.setFilter(amFilter);
      }
      if (aoParams != null) {
        this.setParams(aoParams);
      }
    }
  }
}
