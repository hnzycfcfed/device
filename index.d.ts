interface OS {
    Android: boolean;
    Version: number | string;
    iOS: boolean;
    iPhone: boolean;
    iPad: boolean;
    WP: boolean;
    macOS: boolean;
    Win: boolean;
    Tablet: boolean;
    Phone: boolean;
}

interface Browser {
    Webkit: boolean;
    Version: number | string;
    Chrome: boolean;
    Firefox: boolean;
    IE: boolean;
    Wechat: boolean;
    Alipay: boolean;
    UC: boolean;
    Safari: boolean;
    Webview: boolean;
}

interface Extra {
    network: string;
}

declare const device: {
    os: OS;
    browser: Browser;
    extra: Extra;
}

export default device;