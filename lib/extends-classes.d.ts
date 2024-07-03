import MethodMissing from "method-missing";
type UnionToIntersection<input> = (input extends any ? (value: input)=>void : never) extends ((value: infer infered)=>void) ? infered : never
declare function classes<args>(...args:args):{new(...opts:any[]): UnionToIntersection<(typeof MethodMissing | args[number])["prototype"]>} //output<args>
export = classes;
