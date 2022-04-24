export type FuncParams<T extends (args: any) => any> = T extends (
  args: infer P
) => any
  ? P
  : never;
