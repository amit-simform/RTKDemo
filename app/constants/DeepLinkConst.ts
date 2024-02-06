export const domain: string = 'rtkdemo.page.link';

export const bundleId: string = 'com.simform.rtkdemo';

export const deepLinkPrefixes = ['rtkdemo://', `${domain}//`, `https://${domain}`];

export const deepLinkQueryParamsMatch: RegExp = /\?(.+)/;
export const routeReplace: RegExp = /.*?:\/\//g;
export const paramReplace: RegExp = /\/([^\\/]+)\/?$/;

export enum DeepLink {
  // rtkdemo://magic_link&lang=en&tenantId=austin-electrical-qqm76
  MagicLink = 'magic_link',
  // rtkdemo://forgot_password&lang=en&tenantId=austin-electrical-qqm76
  ForgotPassword = 'forgot_password',
  // rtkdemo://?toastMessage=<message content>
  ToastMessage = 'toastMessage'
}

export default DeepLink;
