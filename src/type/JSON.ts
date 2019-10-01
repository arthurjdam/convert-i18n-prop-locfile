export interface JSONArray extends Array<JSONPrimitive> {}
export interface JSONDictionary {
  [key: string]: JSONPrimitive;
}
export type JSONPrimitive =
  | number
  | string
  | boolean
  | JSONArray
  | JSONDictionary;
