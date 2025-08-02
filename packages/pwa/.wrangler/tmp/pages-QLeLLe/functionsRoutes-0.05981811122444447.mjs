import { onRequest as __api___catchall___ts_onRequest } from "/Users/wucf/projects/account/packages/pwa/functions/api/[[catchall]].ts"

export const routes = [
    {
      routePath: "/api/:catchall*",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api___catchall___ts_onRequest],
    },
  ]