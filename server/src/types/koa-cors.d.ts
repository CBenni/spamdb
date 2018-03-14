declare module "koa-cors" {
  import {Context} from 'koa';
  const value: (context: Context, next: ()=>Promise<any>)=>any;
  export default value;
}
