interface EmojiInterface {
    url: string,
    alt: string,
    name: string
}

export function getEmojisApi(): ResponseInterface<Array<EmojiInterface>> {
    const emojii = ref(["亲", "亲亲", "伤心", "伤心死了", "努力", "口罩", "吃惊", "呆", "呆萌", "哇哇哇", "哈", "哈哈", "唉", "啊", "喜欢", "嗯", "嘻", "嘿", "嘿嘿", "困", "奇怪", "尴尬", "巨伤心", "巨口", "巨呆", "巨惊讶", "巨汗", "巨难受", "开心", "很难受", "思考", "惊呆了", "惊喜", "惊讶", "愤怒", "搞怪", "欣慰", "求求了", "汗", "流汗", "生气", "看", "睡觉", "调皮", "难受", "难受死了", "顽皮", "高兴"])
    let prefix = "/src/static/emoji/";
    return fakeData(emojii.value.map(e => {
        return {
            url: prefix + e + ".gif",
            alt: e,
            name: e
        }
    }))
}


function fakeData<T>(data: T, msg: string = ""): ResponseInterface<T> {
    return {
        data,
        msg,
        code: 1
    }
}

interface ResponseInterface<T> {
    code: number,
    msg: string,
    data: T
}