export type CommonServiceRes<T> = {
  data?: T;
  message?: string;
  errors?: [string[]];
};
