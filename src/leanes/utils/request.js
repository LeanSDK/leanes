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

import axios from 'axios';
import type {
  LegacyResponseInterface, AxiosResponse, Config
} from '../types/RequestT';

export default (Module) => {
  const {
    Utils: { assign }
  } = Module.NS;

  const convertToAxiosOptions = <
    T = any, R = T, L = LegacyResponseInterface<AxiosResponse<T, R>>
  >(
    asMethod: string, asUrl: string, ahOptions: Config<T, R> = {}
  ): Config<T, R> => {
    ahOptions.headers = ahOptions.headers || {};
    ahOptions.headers['Accept'] = ahOptions.headers['Accept'] || ahOptions.headers['accept'] || '*/*';
    delete ahOptions.headers['accept'];

    const vhOptions = assign({}, ahOptions, {
      method: asMethod,
      url: asUrl
    });

    if (vhOptions.followRedirect) {
      vhOptions.maxRedirects = vhOptions.maxRedirects || 10;
    } else {
      delete vhOptions.maxRedirects;
    }
    delete vhOptions.followRedirect;

    const data = vhOptions.body || vhOptions.form;
    delete vhOptions.body;
    delete vhOptions.form;
    vhOptions.data = vhOptions.data || data;

    vhOptions.timeout = vhOptions.timeout || 2*60*1000; // ms
    vhOptions.maxContentLength = vhOptions.maxContentLength || 2*1024*1024; //byte
    return vhOptions;
  };

  const request = <
    T = any, R = T, L = LegacyResponseInterface<AxiosResponse<T, R>>
  >(
    asMethod: string, asUrl: string, ahOptions: Config<T, R> = {}
  ): Promise<L> => {

    const vhOptions = convertToAxiosOptions(asMethod, asUrl, ahOptions);
    // console.log('/////////////////////</L>', axios.request(vhOptions));

    return axios.request(vhOptions)
      .then(<T = any, R = T>(res: AxiosResponse<T, R>) => {
        return {
          body: res.data,
          headers: res.headers,
          status: res.status,
          message: res.statusText
        }
      })
      .catch((err) => {
        return {
          body: undefined,
          headers: {},
          status: err.code || err.response.status || 500,
          message: err.message
        }
      });
  };

  Reflect.defineProperty(request, 'defaults', {
    value: new Proxy(axios.defaults, {})
  });

  Reflect.defineProperty(request, 'interceptors', {
    value: new Proxy(axios.interceptors, {})
  });

  Reflect.defineProperty(request, 'all', {
    value: new Proxy(axios.all, {})
  });

  Reflect.defineProperty(request, 'spread', {
    value: new Proxy(axios.spread, {})
  });

  Reflect.defineProperty(request, 'CancelToken', {
    value: new Proxy(axios.CancelToken, {})
  });

  Reflect.defineProperty(request, 'create', {
    value: new Proxy(() => {}, {
      apply: (tmp1, tmp2, [defaultOpts]) => {
        return new Proxy(request, {
          apply: (target, thisValue, [asMethod, asUrl, ahOptions = {}]) => {
            return target.call(
              thisValue, asMethod, asUrl, assign({}, defaultOpts, ahOptions)
            );
          },
          get: (target, name, receiver) => {
            switch (false) {
              case !(name === 'get'):
              case !(name === 'delete'):
              case !(name === 'head'):
              case !(name === 'options'):
              case !(name === 'post'):
              case !(name === 'put'):
              case !(name === 'patch'):
                return function (asUrl, ahOptions = {}) {
                  return target[name].call(
                    target, asUrl, assign({}, defaultOpts, ahOptions)
                  );
                }
                break;
              case !(name === 'request'):
                return function (asMethod, asUrl, ahOptions = {}) {
                  return target.call(
                    target, asMethod, asUrl, assign({}, defaultOpts, ahOptions)
                  );
                }
                break;
              default:
                return target[name];
            }
          },
        })
      }
    })
  });

  request.head = <
    T = any, R = T, L = LegacyResponseInterface<AxiosResponse<T, R>>
  >(asUrl: string, ahOptions: Config<T, R> = {}): Promise<L> => {
    return request('HEAD', asUrl, ahOptions);
  };
  request.options = <
    T = any, R = T, L = LegacyResponseInterface<AxiosResponse<T, R>>
  >(asUrl: string, ahOptions: Config<T, R> = {}): Promise<L> => {
    return request('OPTIONS', asUrl, ahOptions);
  };
  request.get = <
    T = any, R = T, L = LegacyResponseInterface<AxiosResponse<T, R>>
  >(asUrl: string, ahOptions: Config<T, R> = {}): Promise<L> => {
    return request('GET', asUrl, ahOptions);
  };
  request.post = <
    T = any, R = T, L = LegacyResponseInterface<AxiosResponse<T, R>>
  >(asUrl: string, ahOptions: Config<T, R> = {}): Promise<L> => {
    return request('POST', asUrl, ahOptions);
  };
  request.put = <
    T = any, R = T, L = LegacyResponseInterface<AxiosResponse<T, R>>
  >(asUrl: string, ahOptions: Config<T, R> = {}): Promise<L> => {
    return request('PUT', asUrl, ahOptions);
  };
  request.patch = <
    T = any, R = T, L = LegacyResponseInterface<AxiosResponse<T, R>>
  >(asUrl: string, ahOptions: Config<T, R> = {}): Promise<L> => {
    return request('PATCH', asUrl, ahOptions);
  };
  request['delete'] = <
    T = any, R = T, L = LegacyResponseInterface<AxiosResponse<T, R>>
  >(asUrl: string, ahOptions: Config<T, R> = {}): Promise<L> => {
    return request('DELETE', asUrl, ahOptions);
  };

  Module.defineUtil(__filename, request);
  Module.defineUtil('convertToAxiosOptions', convertToAxiosOptions);
}
