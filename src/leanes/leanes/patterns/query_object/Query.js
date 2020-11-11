//leanes-queryable-addon



// // This file is part of LeanES.
// //
// // LeanES is free software: you can redistribute it and/or modify
// // it under the terms of the GNU Lesser General Public License as published by
// // the Free Software Foundation, either version 3 of the License, or
// // (at your option) any later version.
// //
// // LeanES is distributed in the hope that it will be useful,
// // but WITHOUT ANY WARRANTY; without even the implied warranty of
// // MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// // GNU Lesser General Public License for more details.
// //
// // You should have received a copy of the GNU Lesser General Public License
// // along with LeanES.  If not, see <https://www.gnu.org/licenses/>.

// import type { QueryInterface } from '../../interfaces/QueryInterface';

// const hasProp = {}.hasOwnProperty;

// export default (Module) => {
//   const {
//     CoreObject,
//     assert,
//     initialize, partOf, meta, property, method, nameBy,
//     Utils: { _ }
//   } = Module.NS;


//   @initialize
//   @partOf(Module)
//   class Query extends CoreObject implements QueryInterface {
//     @nameBy static  __filename = __filename;
//     @meta static object = {};

//     // TODO: это надо переделать на нормальную проверку типа в $filter - т.е. сделать спец flow тип
//     // static operatorsMap: object = {
//     //   $and: Array,
//     //   $or: Array,
//     //   $not: Object,
//     //   $nor: Array, // not or # !(a||b) === !a && !b
//     //
//     //   // без вложенных условий и операторов - value конечное значение для сравнения
//     //   $eq: AnyT, // ==
//     //   $ne: AnyT, // !=
//     //   $lt: AnyT, // <
//     //   $lte: AnyT, // <=
//     //   $gt: AnyT, // >
//     //   $gte: AnyT, // >=
//     //   $in: Array, // check value present in array
//     //   $nin: Array, // ... not present in array
//     //
//     //   // field has array of values
//     //   $all: Array, // contains some values
//     //   $elemMatch: Object, // conditions for complex item
//     //   $size: Number, // condition for array length
//     //   $exists: Boolean, // condition for check present some value in field
//     //   $type: String, // check value type
//     //   $mod: Array, // [divisor, remainder] for example [4,0] делится ли на 4
//     //   $regex: UnionG(RegExp, String), // value must be string. ckeck it by RegExp.
//     //   $td: Boolean, // this day (today)
//     //   $ld: Boolean, // last day (yesterday)
//     //   $tw: Boolean, // this week
//     //   $lw: Boolean, // last week
//     //   $tm: Boolean, // this month
//     //   $lm: Boolean, // last month
//     //   $ty: Boolean, // this year
//     //   $ly: Boolean // last year
//     // }

//     @property $forIn: ?object = null;

//     @property $join: ?object = null;

//     @property $let: ?object = null;

//     @property $filter: ?object = null;

//     @property $collect: ?object = null;

//     @property $into: ?(string | object) = null;

//     @property $having: ?object = null;

//     @property $sort: ?Array = null;

//     @property $limit: ?number = null;

//     @property $offset: ?number = null;

//     @property $avg: ?string = null; // '@doc.price'

//     @property $sum: ?string = null; // '@doc.price'

//     @property $min: ?string = null; // '@doc.price'

//     @property $max: ?string = null; // '@doc.price'

//     @property $count: ?boolean = null; // yes or not present

//     @property $distinct: ?boolean = null; // yes or not present

//     @property $remove: ?(string | object) = null;

//     @property $patch: ?object = null;

//     @property $return: ?(string | object) = null;

//     @method forIn(aoDefinitions: object): QueryInterface {
//       for (const k in aoDefinitions) {
//         if (!hasProp.call(aoDefinitions, k)) continue;
//         const v = aoDefinitions[k];
//         this.$forIn[k] = v;
//       }
//       return this;
//     }

//     @method join(aoDefinitions: object): QueryInterface {
//       this.$join = aoDefinitions;
//       return this;
//     }

//     @method filter(aoDefinitions: object): QueryInterface {
//       this.$filter = aoDefinitions;
//       return this;
//     }

//     @method 'let'(aoDefinitions: object): QueryInterface {
//       if (this.$let == null) {
//         this.$let = {};
//       }
//       for (const k in aoDefinitions) {
//         if (!hasProp.call(aoDefinitions, k)) continue;
//         const v = aoDefinitions[k];
//         this.$let[k] = v;
//       }
//       return this;
//     }

//     @method collect(aoDefinition: object): QueryInterface {
//       this.$collect = aoDefinition;
//       return this;
//     }

//     @method into(aoDefinition: string | object): QueryInterface {
//       this.$into = aoDefinition;
//       return this;
//     }

//     @method having(aoDefinition: object): QueryInterface {
//       this.$having = aoDefinition;
//       return this;
//     }

//     @method sort(aoDefinition: object): QueryInterface {
//       if (this.$sort == null) {
//         this.$sort = [];
//       }
//       this.$sort.push(aoDefinition);
//       return this;
//     }

//     @method limit(anValue: number): QueryInterface {
//       this.$limit = anValue;
//       return this;
//     }

//     @method offset(anValue: number): QueryInterface {
//       this.$offset = anValue;
//       return this;
//     }

//     @method distinct(): QueryInterface {
//       this.$distinct = true;
//       return this;
//     }

//     @method remove(expr: ?(string | object) = 'all'): QueryInterface {
//       this.$remove = expr;
//       return this;
//     }

//     @method patch(aoDefinition: object): QueryInterface {
//       this.$patch = aoDefinition;
//       return this;
//     }

//     @method 'return'(aoDefinition: string | object): QueryInterface {
//       this.$return = aoDefinition;
//       return this;
//     }

//     @method count(): QueryInterface {
//       this.$count = true;
//       return this;
//     }

//     @method avg(asDefinition: string): QueryInterface {
//       this.$avg = asDefinition;
//       return this;
//     }

//     @method min(asDefinition: string): QueryInterface {
//       this.$min = asDefinition;
//       return this;
//     }

//     @method max(asDefinition: string): QueryInterface {
//       this.$max = asDefinition;
//       return this;
//     }

//     @method sum(asDefinition: string): QueryInterface {
//       this.$sum = asDefinition;
//       return this;
//     }

//     @method static async restoreObject(acModule: Class<Module>, replica: object): QueryInterface {
//       if ((replica != null ? replica.class : void 0) === this.name && (replica != null ? replica.type : void 0) === 'instance') {
//         return this.new(replica.query);
//       } else {
//         return await super.restoreObject(acModule, replica);
//       }
//     }

//     @method static async replicateObject(instance: QueryInterface): object {
//       const replica = await super.replicateObject(instance);
//       replica.query = instance.toJSON();
//       return replica;
//     }

//     @method toJSON(): object {
//       const res = {};
//       for (const k of [
//         '$forIn', '$join', '$let', '$filter', '$collect', '$into', '$having', '$sort', '$limit', '$offset', '$avg', '$sum', '$min', '$max', '$count', '$distinct', '$remove', '$patch', '$return'
//       ]) {
//         if (this[k] != null) {
//           res[k] = this[k];
//         }
//       }
//       return res;
//     }

//     constructor(aoQuery: ?object) {
//       super(... arguments);
//       this.$forIn = {};
//       if (aoQuery != null) {
//         for (const key in aoQuery) {
//           if (!hasProp.call(aoQuery, key)) continue;
//           const value = aoQuery[key];
//           this[key] = value;
//         }
//       }
//     }
//   }
// }
