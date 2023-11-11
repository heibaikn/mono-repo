// export const pickInfoFromRoute = (route: any) => {
//   let data = {} as any;
//   data.project_id = route.params.project_id;
//   data.app_id = route.params.app_id;
//   data.view_id = route.params.view_id;
//   data.environment_id = (route.params.environment_id === 'development') ? '' : route.params.environment_id;
//   return data;
// }

export const obtainNotificationStyle = (msg: string, type = 'success') => {
  return {
    title: '温馨提示',
    message: msg,
    position: 'bottom-left',
    type
  }
}
