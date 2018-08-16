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

const inputSetValue = (classParam, val, comparisonVal) => {
    const el = queryElement(classParam);
    el.clear().type(val).should('have.value', comparisonVal ? comparisonVal : val);
}

const modalInputSetValue = (selector, val) => {
    queryAllElement('.ant-modal-wrap').then((els) => {
        for (let i = 0; i < els.length; i++) {
            const item = els[i];
            const hide = item.style.display === 'none';
            if (!hide) {
                queryByIndex('.ant-modal-wrap', i).find(selector).first().clear().type(val).should('have.value', val);
                break;
            }
        }
    });
}

const inputFocus = (classParam) => {
    const el = queryElement(classParam);
    el.focus();
}

const inputBlur = (classParam) => {
    const el = queryElement(classParam);
    el.blur();
}

/**
 * 
 * @param {String} selector 选择器，class 或者 id
 * @param {String} itemSelector 值选项选择器，class 或者 id
 * @param {String} value 需要匹配的值
 * @param {Function} callback 回调函数，参数为获得的符合的元素对象
 * @param {String} scope 范围选择器，顶级容器的 class 或者 id， 用来区分不同容器中的元素，默认值：baseScope
 */
const queryElementByValue = (selector, itemSelector, value, callback, scope = baseScope) => {
    queryElement(selector, scope).find(itemSelector).then((els) => {
        for (let i = 0; i < els.length; i++) {
            const item = cy.$$(els[i]);
            if (item.text() === value) {
                callback && callback(item);
                break;s
            }
        }
    });
}

module.exports = {
    randomArr,
    queryElement,
    queryAllElement,
    queryByIndex,
    queryElementByValue,
    url,
    inputFocus,
    inputBlur,
    inputSetValue,
    click,
    clickRandom,
    sleep,
    modalInputSetValue,
}