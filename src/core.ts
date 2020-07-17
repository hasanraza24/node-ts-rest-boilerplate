export function Controller (prefix: string) {
  return function (target: any) {
    Reflect.defineMetadata('prefix', prefix, target)
    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target)
    }
  }
}

interface IAuth {
  isAuthenticated: boolean;
  authorizedRole: string
}

export function Get(path: string, auth: IAuth) {
  return function (target: any, propertyKey: string) {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor)
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as Array<IRoute>
    routes.push({
      requestMethod: 'get',
      path: path,
      methodName: propertyKey,
      authorizedRole: auth.authorizedRole,
      isAuthenticated: auth.isAuthenticated
    })
  }
}

export function Post(path: string, validSchema: any, auth: IAuth) {
  return function (target: any, propertyKey: string) {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor)
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as Array<IRoute>
    routes.push({
      requestMethod: 'post',
      path: path,
      methodName: propertyKey,
      validSchema: validSchema,
      isAuthenticated: auth.isAuthenticated,
      authorizedRole: auth.authorizedRole
    })
  }
}

export interface IRoute extends IAuth{ 
  requestMethod: string;
  path: string;
  methodName: string;
  validSchema?: any
}