import randomString from "randomstring"

export const addNo = (text: any) => {
    let res = ''
    if (text[text.length - 1] === ')') {
        let textList = text.split('(');
        let no = textList[textList.length - 1];
        if (no[no.length - 1] == ')') {
            no = no.substring(0, no.length - 1)
            no = Number(no)
            if (!Number.isNaN(no)) {
                let res = [...textList]
                res.pop()
                res.push(`${++no})`)
                return (res.join('('))
            }
        }
    }
    res = text + '(1)'
    console.log(res)
    return res
}

export const getSearchName = (name: string) => {
    if (/\((\d+)\)$/.test(name)) {
        let arr = name.split('(')
        arr.pop()
        return (arr.join('('));
    } else {
        return name;
    }
}

export const getCount = (regex: RegExp, text: string) => {
    let count = Number((regex.exec(text)?.[1]));
    console.log(count)
    if (count == null) { count = 0 }
    console.log(count)
    return count
}

export const getRandomName = () => {
    let name = '';
    name += randomString.generate({ length: 1, charset: 'qwertyupasdfghjkzxcvbnm', capitalization: 'lowercase', readable: true });
    name += randomString.generate({ length: 1, charset: 'qwertyupasdfghjkzxcvbnm', capitalization: 'lowercase', readable: true });
    name += randomString.generate({ length: 1, charset: 'qwertyupasdfghjkzxcvbnm', capitalization: 'lowercase', readable: true });
    name += randomString.generate({ length: 1, charset: 'numeric', capitalization: 'lowercase', readable: true });
    name += randomString.generate({ length: 1, charset: 'numeric', capitalization: 'lowercase', readable: true });
    name += randomString.generate({ length: 1, charset: 'numeric', capitalization: 'lowercase', readable: true });
    return name
}


export const getBaseName = (name: string) => {
    let nameArr = name.split(' · ');
    let baseName = nameArr.shift()
    if (nameArr.length == 0) {
        return name;
    }
    for (let x = 0; x < nameArr.length; x++) {
        const Copy = nameArr[x];
        if (Copy !== 'Copy') {
            return name;
        }
    }
    return baseName;
    // todo: allow for "Copy · rand · Copy"
}

export const getCopyCount = (name)=>{
    let nameArr = name.split(' · ');
    let baseName = nameArr.shift()
    return(nameArr.length);
} 