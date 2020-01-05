declare var window: any;
declare type SvcBaseUrls = {
  authSvc: string,
  taskSvc: string
}

export class DynamicEnvironment {
  get svcBaseUrls(): SvcBaseUrls {
    return window.config.svcBaseUrls;
  }
}
