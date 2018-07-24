// 随机生成随机数
const randomNum = (start, end) => {
    const muit = end - start;
    return Math.round(Math.random() * muit + start)
}

// 生成给定长度的特定区间的随机数数组
const randomArr = (start, end, length) => {
    if (length > 5) {
        length = 5;
    }
    let result = [];
    while (result.length < length) {
        const item = randomNum(start, end);
        console.log('随机数：', item);
        if (result.indexOf(item) === -1) {
            result.push(item)
        }
    }
    return result;
}

/**
 * 等待时间，用于等待数据的资源的加载
 * @param {Number} time 
 */
const sleep = (time=1000) => {
    cy.wait(time);
}

/**
 * 查找匹配的元素，存在多个，返回第一个
 * @param {String | Array} param 需要查找的元素的 class 或者 id
 * @return 返回当前查询的元素对象
 */
const queryElement = (param) => {
    if (param instanceof Array) {
        let result = cy.get(param[0]).first();
        for (let i = 1; i < param.length; i++) {
            result = result.find(param[i]).first();
        }
        return result;
    } else if (typeof param === 'string') {
        return cy.get(param).first();
    }
}

/**
 * 查找匹配的元素，返回全部
 * @param {String | Array} param 需要查找的元素的 class 或者 id
 * @return 返回当前查询的元素对象
 */
const queryAllElement = (param) => {
    if (param instanceof Array) {
        let result = cy.get(param[0]).first();
        for (let i = 1; i < param.length - 1; i++) {
            result = result.find(param[i]).first();
        }
        return result.find(param[param.length - 1]);
    } else if (typeof param === 'string') {
        return cy.get(param);
    }
}

const queryByIndex = (str, index) => {
    return cy.get(str).eq(index);
}

const url = (url) => {
    cy.visit(url);
}

const click = (classParam) => {
    const el = queryElement(classParam);
    el.click({force: true});
}

const clickRandom = (classParam, num = 0) => {
    queryAllElement(classParam).then((els) => {
        const arr = randomArr(0, els.length, num ? num : Math.ceil(els.length / 5));
        for (let i = 0; i < arr.length; i++) {
            const index = arr[i];
            queryByIndex(classParam, index).click();
        }
    });
}

const inputSetValue = (classParam, val) => {
    const el = queryElement(classParam);
    el.type(val).should('have.value', val);
}

const inputFocus = (classParam) => {
    const el = queryElement(classParam);
    el.focus();
}

const inputBlur = (classParam) => {
    const el = queryElement(classParam);
    el.blur();
}

module.exports = {
    queryElement,
    queryAllElement,
    queryByIndex,
    url,
    inputFocus,
    inputBlur,
    inputSetValue,
    click,
    clickRandom,
    sleep,
}