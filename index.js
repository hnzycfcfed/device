/* eslint-disable indent */
const index = (function (ua, platform) {
    let os = {
        Android: false,
        Version: 0,
        iOS: false,
        iPhone: false,
        iPad: false,
        WP: false,
        macOS: false,
        Win: false,
        Tablet: false,
        Phone: false
    }, browser = {
        Webkit: false,
        Version: 0,
        Chrome: false,
        Firefox: false,
        IE: false,
        Wechat: false,
        Alipay: false,
        UC: false,
        Safari: false,
        Webview: false
    }, extra = {
        network: 'unknown'
    },
        Webkit = ua.match(/Web[kK]it[/]{0,1}([\d.]+)/),
        Android = ua.match(/(Android);?[\s/]+([\d.]+)?/),
        macOS = !!ua.match(/\(Macintosh; Intel /),
        iPad = ua.match(/(iPad).*OS\s([\d_]+)/),
        iPod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
        iPhone = !iPad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        Win = /Win\d{2}|Windows/.test(platform),
        WP = ua.match(/Windows Phone ([\d.]+)/),
        Chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
        Firefox = ua.match(/Firefox\/([\d.]+)/),
        IE = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^?]+).*rv:([0-9.].)/),
        Wechat = ua.match(/MicroMessenger\/([\d.]+)/),
        Alipay = ua.match(/AlipayClient\/([\d.]+)/),
        UC = ua.match(/UCBrowser\/([\d.]+)/),
        Webview = !Chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
        Safari = Webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);

    if (!!Webkit) browser.Version = Webkit[1];

    if (Android) os.Android = true, os.Version = Android[2];
    if (iPhone && !iPod) os.iOS = os.iPhone = true, os.Version = iPhone[2].replace(/_/g, '.');
    if (iPad) os.iOS = os.iPad = true, os.Version = iPad[2].replace(/_/g, '.');
    if (iPod) os.iOS = os.iPod = true, os.Version = iPod[3] ? iPod[3].replace(/_/g, '.') : null;
    if (WP) os.WP = true, os.Version = WP[1];
    if (Chrome) browser.Chrome = true, browser.Version = Chrome[1];
    if (Firefox) browser.Firefox = true, browser.Version = Firefox[1];
    if (IE) browser.IE = true, browser.Version = IE[1];
    if (Wechat) browser.Wechat = true, browser.Version = Wechat[1];
    if (Alipay) browser.Alipay = true, browser.Version = Alipay[1];
    if (UC) browser.UC = true, browser.Version = UC[1];
    if (macOS) os.macOS = true;
    if (Win) os.Win = true;
    if (Safari && (macOS || os.iOS || Win)) {
        browser.Safari = true;
        if (!os.iOS) browser.Version = Safari[1];
    }
    if (Webview) browser.Webview = true;

    os.Android = !os.iOS && !os.WP && !os.Win && !os.macOS;
    os.Tablet = !!(iPad || Android && !ua.match(/Mobile/) || Firefox && ua.match(/Tablet/) || IE && !ua.match(/Phone/) && ua.match(/Touch/));
    os.Phone = !!(!os.Tablet && !os.iPod && (Android || iPhone || Chrome && ua.match(/Android/) || Chrome && ua.match(/CriOS\/([\d.]+)/) || Firefox && ua.match(/Mobile/) || IE && ua.match(/Touch/)));
    if (browser.Wechat && ua.indexOf('NetType') > -1) {
        const NetType = ua.match(/(NetType\/=?)(\S*)(?=\s+)/);
        extra.network = NetType ? NetType[2] : 'unknown';
    }
    if (browser.Alipay && ua.indexOf('nt:') > -1) {
        const NetType = ua.match(/(nt:=?)(\S*)(?=,)/);

        extra.network = NetType ? NetType[2] : 'unknown';
    }
    extra.network = extra.network.toLowerCase();
    return {
        os: os,
        browser: browser,
        extra: extra
    };
})(navigator.userAgent, navigator.platform);

export default index;
