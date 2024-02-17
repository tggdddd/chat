/**
 * svg转base64
 * @param svg
 */
export function svgToUrl(svg: string) {
    let data = encodeURIComponent(svg);
    return "data:image/svg+xml;base64," + data;
}

/**
 * 根据当前时间生成随机ID
 * @param size
 * @return 0-Z
 */
export function randomUID(size = 32) {
    let str = Date.now().toString(36);
    while (str.length < size) {
        // @ts-ignore
        str = Number.parseInt(Math.random().toString().substring(2)).toString(36) + str;
    }
    let res = "";
    for (let i = str.length - 1; i >= 0 && size > 0; i--, size--) {
        res += str.charAt(i);
    }
    return res;
}

/**
 * 判断是否非空
 * @param str
 */
export function isNotEmpty(str: any) {
    if (str == null) {
        return false
    }
    if (typeof str === "string") {
        return str.length > 0
    }
    if (Array.isArray(str)) {
        return str.length > 0
    }
    return true
}

/**
 * 判断是否为空
 * @param str
 */
export function isEmpty(str: any) {
    return !isNotEmpty(str)
}