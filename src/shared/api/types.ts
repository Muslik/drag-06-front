export type Request = {
  path: string;
  method: 'post' | 'get' | 'delete' | 'put' | 'patch';
  body?: Record<string, unknown> | null;
  query?: Record<string, string>;
  headers?: Record<string, string>;
};

export type Answer = {
  ok: boolean;
  body: unknown;
  status: number;
  headers: Record<string, string>;
};
