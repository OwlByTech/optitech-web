export type CommonServiceRes<T> = {
  data?: T;
  messages?: string[];
  errors?: [string[]];
};
