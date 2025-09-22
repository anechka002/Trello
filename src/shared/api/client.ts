import createClient, {type Middleware} from "openapi-fetch";
import type {paths} from "@/shared/api/schema";

export const client = createClient<paths>({ baseUrl: "https://trelly.it-incubator.app/api/1.0/" });

const myMiddleware: Middleware = {
  async onRequest({ request }) {
    // set "foo" header
    request.headers.set('API-KEY', 'e89a9a5a-8ec8-4868-866c-0e822747b9ad');
    return request;
  },
};

client.use(myMiddleware)