import MethodMissing from "method-missing";
type functionType = typeof Function;
type NonConstructorKeys<value> = ({[key in keyof value]: value[key] extends new () => any ? never : key })[keyof value];
type NonConstructor<value> = Pick<value, NonConstructorKeys<value>>;
type getncFromArgs<args> = NonConstructor<(typeof MethodMissing & args[number])["prototype"]>;
interface output<args> extends NonConstructor<functionType>{
    new(...opts:any[]): getncFromArgs<args>, 
    "prototype":getncFromArgs<args>
    "constructor":(...opts:any) => getncFromArgs<args>
}
declare function classes<args>(...args:args):output<args>
export = classes;
