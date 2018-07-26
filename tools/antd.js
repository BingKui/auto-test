/**
 * 以 ant-design 为框架基础的操作封装
 */

baseScope = '.ant-layout-content';

/**
 * 基础元素选择器
 * @param {String} base 基础选择器，class 或者 id，用来选择页面中存在的所有元素
 * @param {String} scope 范围选择器，顶级容器的 class 或者 id， 用来区分不同容器中的元素
 */
const baseSelect = (base, scope) => {
    if (scope) {
        return cy.get(`${scope} ${base}`);
    } else {
        return cy.get(base);
    }
}

// 获取显示状态的元素
/**
 * 获取显示状态的元素
 * @param {String} base 基础选择器，class 或者 id，用来选择页面中存在的所有元素
 * @param {String} hide 隐藏选择器，隐藏状态下才存在的选择器，一般为 含有 hidden 的 class
 * @param {String} scope 范围选择器，顶级容器的 class 或者 id， 用来区分不同容器中的元素，默认值：baseScope
 */
const queryShowElement = (base, hide, scope = baseScope) => {
    return baseSelect(base, scope).not(hide);
}

/**
 * 获取单一的元素，存在多个，返回第一个
 * @param {String} selector 选择器，class 或者 id
 * @param {String} scope 范围选择器，顶级容器的 class 或者 id， 用来区分不同容器中的元素，默认值：baseScope
 */
const queryElement = (selector, scope = baseScope) => {
    return baseSelect(selector, scope).first();
}

/**
 * 获取所有元素
 * @param {String} selector 选择器，class 或者 id
 * @param {String} scope 范围选择器，顶级容器的 class 或者 id， 用来区分不同容器中的元素，默认值：baseScope
 */
const queryAllElement = (selector, scope = baseScope) => {
    return baseSelect(selector, scope);
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
            const item = els[i].innerHTML;
            if (item === value) {
                const el = cy.$$(els[i]);
                callback && callback(el);
                break;s
            }
        }
    });
}

/**
 * 点击给定范围内的固定下标按钮
 * @param {Number} index 需要点击的按钮，位于范围内的下标，从 0 开始
 * @param {String} scope 范围选择器，class 或者 id，用来定位按钮的具体位置
 */
export const clickButton = (index, scope) => {
    queryAllElement('.ant-btn', scope).eq(index).click();
}

/**
 * 点击给定范围内的固定下标面包屑项
 * @param {Number} index 需要点击的面包屑的范围下标，从 0 开始
 * @param {String} scope 范围选择器，class 或者 id，用来定位面包屑的具体位置
 */
export const clickBreadCrumb = (index, scope) => {
    queryElement('.ant-breadcrumb', scope).find('.ant-breadcrumb-link').eq(index).click();
}

/**
 * 
 * @param {String} name 需要点击的面包屑的名字
 * @param {String} scope 范围选择器，class 或者 id，用来定位面包屑的具体位置
 */
export const clickBreadCrumbByName = (name, scope) => {
    queryElementByValue('.ant-breadcrumb', '.ant-breadcrumb-link', name, (el) => {
        el.click();
    }, scope);
}

/**
 * 点击下拉菜单选项值
 * @param {Number} index 范围内下拉菜单的下标，从 0 开始
 * @param {Number} valIndex 选项值所在的下拉中的下标，从 0 开始
 * @param {String} scope 范围选择器，class 或者 id，用来定位下拉菜单的具体位置
 */
export const clickDropdown = (index, valIndex, scope) => {
    queryElement('.ant-dropdown-trigger', scope).eq(index).click();
    queryShowElement('.ant-dropdown', '.ant-dropdown-hidden', 'body').find('.ant-dropdown-menu-item').eq(valIndex).click();
}
/**
 * 
 * @param {Number} index 范围内下拉菜单的下标，从 0 开始
 * @param {String} name 选项值
 * @param {String} scope 范围选择器，class 或者 id，用来定位下拉菜单的具体位置
 */
export const clickDropdownByName = (index, name, scope) => {}

export const clickMenu = () => {}

/**
 * 
 * @param {Number} index 范围内存在的分页组件的下标，从 0 开始
 * @param {Number} num 需要点击的分页数
 * @param {String} scope 范围选择器，class 或者 id，用来定位分页的具体位置
 */
export const clickPagination = (index, num, scope) => {}


export const clickCheckbox = () => {}

export const setDatePickerValue = () => {}

export const setDateTimeValue

/**
 * 点击 Modal 框底部的按钮
 * @param {Number} index 按钮顺序下标，从 0 开始
 * @param {String} selector 容器选择器，可选，如果存在则选定特定容器内的 modal 底部 footer 的按钮
 */
export const clickModalBtn = (index, selector) => {
    
}