export interface UiNode {
  attributes: {};
  type: string;
  group: string;
  meta: {};
  messages: [];
}

export interface IResponse {
  config: {};
  data: {
    id: string;
    ui: {
      method: string;
      action: string;
      nodes: UiNode[];
    };
  };
  headers: {};
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}
