// 以 ant-design 为框架基础的操作封装

// 基础元素选择器，获取显示状态下的元素对象
const baseSelect = (base, selector) => {
    if (selector) {
        return cy.get(selector);
    } else {
        return cy.get(base);
    }
}

/**
 * 点击 Modal 框底部的按钮
 * @param {Number} index 按钮顺序下标，从 0 开始
 * @param {String} selector 容器选择器，可选，如果存在则选定特定容器内的 modal 底部 footer 的按钮
 */
export const clickModalBtn = (index, selector) => {
    
}