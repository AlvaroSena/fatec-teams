/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import type { HttpResponse } from "./HttpResponse";

export interface Controller<T = any> {
  handle(request: T): Promise<HttpResponse>;
}
