import MethodMissing from "method-missing";
declare function classes<args>(...args:args):typeof MethodMissing & {prototype:args[number]["prototype"]}
export = classes;