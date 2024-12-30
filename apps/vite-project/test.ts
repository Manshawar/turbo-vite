interface a {
  b: string
}
interface a {
  c: string
}
type typeA = a;
() => { }
function fn<T>(a: T, b: number): number {

  return 1
};
fn<string>("1", 1);
const hello:
  (txt: string) => void
  = function (txt) {
    console.log('hello ' + txt);
  };
function reverse(str: string): string;
function reverse(arr: any[]): any[];
function reverse(
  stringOrArray: string | any[]
): string | any[] {
  if (typeof stringOrArray === 'string')
    return stringOrArray.split('').reverse().join('');
  else
    return stringOrArray.slice().reverse();
}

reverse(true as unknown as string)
reverse(true as any)