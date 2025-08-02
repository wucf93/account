export function onRequest(context) {
  return context.env.ACCOUNT_SERVICE.fetch(context.request)
}
