import { endianness } from 'os';

const Tools = require('../../tools/cypress.js');

export const beforeSetting = () => {
    return beforeEach(function () {
        Cypress.Cookies.preserveOnce('session', 'aliyungf_tc', 'amap_ver', 'guid', 'key', 'sg')
    });
}

export const afterClear = () => {
    return it('清楚浏览器数据，还原环境', () => {
        const loginoutBtn = Tools.queryAllElement('.main-header-operations').last();
        if (loginoutBtn) {
            loginoutBtn.click();
        }
        cy.clearCookies();
    });
}

/**
 * 
 * @param {String} menuName 菜单名称
 * @param {Number} topIndex 顶级菜单下标，从 0 开始
 * @param {Number} secondIndex 次级菜单下标，从 0 开始
 */
export const redirectTo = (menuName, topIndex, secondIndex) => {
    return it(`跳转到${menuName}菜单`, () => {
        clickTopLevelMenu(topIndex);
        clickSecondaryMenu(secondIndex, () => clickTopLevelMenu(topIndex));
    });
}

/**
 * 登录公共模块
 */
export const login = () => {
    return it('登录!', () => {
        cy.clearCookies();
        Tools.url('/auth/login');
        Tools.inputSetValue(['#mobile'], '测试门店');
        Tools.inputSetValue(['#user'], 'admin');
        Tools.inputSetValue(['#password'], '000000');
        // Tools.queryElement('#password').type(`000000{enter}`);
        Tools.click(['.form', '.btn-orange']);
        // Tools.sleep(2000);
    });
}

/**
 * 表格公共点击按钮操作方法
 * @param {String} name 第一列的名字
 * @param {Number} index 需要点击的按钮下标，从 0 开始
 * @param {Number} valIndex 需要匹配的值的列下标，默认：第一列，下标 0
 * @param {String} selector 顶层容器的class选择器，class属性或者id名，默认值：‘.main-content-container’
 */
export const clickTableOperatorBtn = (name, index, valIndex = 0, selector = '.main-content-container') => {
    // 点击前等待1s数据重新刷新列表
    // 等待3s页面加载
    cy.wait(2000);
    cy.get(selector).first().find('.ant-table-tbody .ant-table-row').then((els) => {
        for (let i = 0; i < els.length; i++) {
            const item = els[i];
            const itemName = cy.$$(item).find('td').eq(valIndex).text();
            if (itemName === name) {
                Tools.queryByIndex(`${selector} .ant-table-tbody .ant-table-row`, i).find('.row-modify-button').eq(index).click();
                break;
            }
        }
    });
}

/**
 * 表格公共点击按钮操作方法
 * @param {String} name 第一列的名字
 * @param {Number} index 需要点击的按钮下标，从 0 开始
 * @param {Number} valIndex 需要匹配的值的列下标，默认：第一列，下标 0
 * @param {String} selector 顶层容器的class选择器，class属性或者id名，默认值：‘.main-content-container’
 */
export const clickTableOperatorText = (name, index, valIndex = 0, selector = '.main-content-container') => {
    // 点击前等待1s数据重新刷新列表
    // 等待3s页面加载
    cy.wait(2000);
    cy.get(selector).first().find('.ant-table-tbody .ant-table-row').then((els) => {
        for (let i = 0; i < els.length; i++) {
            const item = els[i];
            const itemName = cy.$$(item).find('td').eq(valIndex).text();
            if (itemName === name) {
                const operateTd = Tools.queryByIndex(`${selector} .ant-table-tbody .ant-table-row`, i).find('td');
                operateTd.then(els => {
                    const len = els.length - 1;
                    operateTd.eq(len).find('a').eq(index).click();
                });
                break;
            }
        }
    });
}

/**
 * 点击表格的展开按钮
 * @param {String} value 需要点击的行数据
 * @param {String} selector 顶层容器的class选择器，class属性或者id名，默认值：‘.main-content-container’
 */
export const clickTableExpand = (value, selector = '.main-content-container') => {
    Tools.queryElement(selector).find('.ant-table-tbody .ant-table-row').then((els) => {
        for (let i = 0; i < els.length; i++) {
            let item = cy.$$(els[i]).find('td').first();
            if (item.text() === value) {
                item.find('.ant-table-row-expand-icon').first().click();
                break;
            }
        }
    });
}

/**
 * 容器内下拉框选择器公共选择方法
 * @param {Number} index 容器中需要点击的下拉框顺序下标，从 0 开始
 * @param {Number} valIndex 需要选择的项的下边，从 0 开始
 * @param {String} selector 顶层容器的class选择器，class属性或者id名，默认值：‘’
 */
export const clickModalSelect = (index, valIndex, selector = '') => {
    cy.wait(600);
    Tools.queryAllElement(`${selector}.ant-modal-wrap`).then((els) => {
        for (let i = 0; i < els.length; i++) {
            const item = els[i];
            const hide = item.style.display === 'none';
            if (!hide) {
                Tools.queryByIndex(`${selector}.ant-modal-wrap`, i).find('.ant-select-selection').eq(index).click();
                Tools.queryByIndex('.ant-select-dropdown .ant-select-dropdown-menu-item', valIndex).click();
                Tools.queryElement('body').click(0, 0);
                break;
            }
        }
    });
}

/**
 * 通过值来选择 modal 中的下拉框
 * @param {Number} index 容器中下拉选择的顺序下标，从 0 开始
 * @param {String} val 需要选中的值
 * @param {String} selector 顶层容器的class选择器，class属性或者id名，默认值：‘.main-content-container’
 */
export const clickModalSelectByValue = (index, val, selector = '') => {
    cy.wait(600);
    Tools.queryAllElement(`${selector}.ant-modal-wrap`).then((els) => {
        for (let i = 0; i < els.length; i++) {
            const item = els[i];
            const hide = item.style.display === 'none';
            if (!hide) {
                Tools.queryByIndex(`${selector}.ant-modal-wrap`, i).find('.ant-select-selection').eq(index).click();
                Tools.queryAllElement('.ant-select-dropdown').not('.ant-select-dropdown-hidden').find('.ant-select-dropdown-menu-item').then((els) => {
                    for (let i = 0; i < els.length; i++) {
                        const item = els[i].innerHTML;
                        if (item === val) {
                            cy.$$(els[i]).click();
                            break;
                        }
                    }
                });
                break;
            }
        }
    });
}

/**
 * 容器内下拉框选择器公共选择方法
 * @param {Number} index 容器中需要点击的下拉框顺序下标，从 0 开始
 * @param {Number} valIndex 需要选择的项的下边，从 0 开始
 * @param {String} selector 顶层容器的class选择器，class属性或者id名，默认值：‘.main-content-container’
 */
export const clickSelect = (index, valIndex, selector = '.main-content-container') => {
    cy.wait(600);
    Tools.queryElement(selector).find('.ant-select-selection').eq(index).click();
    Tools.queryByIndex('.ant-select-dropdown .ant-select-dropdown-menu-item', valIndex).click();
    Tools.queryElement('body').click(0, 0);
}

/**
 * 
 * @param {Number} index 容器中下拉选择的顺序下标，从 0 开始
 * @param {String} val 需要选中的值
 * @param {String} selector 顶层容器的class选择器，class属性或者id名，默认值：‘.main-content-container’
 */
export const clickSelectByValue = (index, val, selector = '.main-content-container') => {
    cy.wait(600);
    Tools.queryElement(selector).find('.ant-select-selection.ant-select-selection--single').eq(index).click();
    Tools.queryAllElement('.ant-select-dropdown').not('.ant-select-dropdown-hidden').find('.ant-select-dropdown-menu-item').then((els) => {
        for (let i = 0; i < els.length; i++) {
            const item = els[i].innerHTML;
            if (item === val) {
                cy.$$(els[i]).click();
                break;
            }
        }
    });
}

/**
 * 点击顶级菜单方法
 * @param {Number} index 顶级菜单下标，从 0 开始
 */
export const clickTopLevelMenu = (index) => {
    // 等待2s页面加载
    cy.wait(300);
    const flag = Tools.queryElement('.main-content-container .main-nav-box');
    if (flag) {
        Tools.queryByIndex('.main-content-container .main-nav-box .ant-menu-item', index).click();
    } else {
        clickTopLevelMenu(index);
    }
}

/**
 * 点击次级菜单方法
 * @param {Number} index 次级菜单下标，从 0 开始
 */
export const clickSecondaryMenu = (index, action) => {
    // 等待2s页面加载
    cy.wait(300);
    const flag = Tools.queryElement('.main-content-container .content-container .nav-box');
    if (flag) {
        Tools.queryByIndex('.main-content-container .content-container .nav-box .ant-menu-item', index).click();
    } else {
        action();
        clickSecondaryMenu(index, () => action());
    }
}

/**
 * 切换tab方法
 * @param {Number} index 需要切换到的下标，从 0 开始
 * @param {String} selector tab 顶层容器，保证唯一性，class属性或者id名，默认值：‘.main-content’
 */
export const changeTab = (index, selector = '.main-content') => {
    // 等待2s页面加载
    cy.wait(1000);
    Tools.queryElement(selector).find('.ant-tabs-nav .ant-tabs-tab').eq(index).click();
}

/**
 * 切换tab方法，通过value
 * @param {String} value 需要切换到的下标，从 0 开始
 * @param {String} selector tab 顶层容器，保证唯一性，class属性或者id名，默认值：‘.main-content’
 */
export const changeTabByValue = (value, selector = '.main-content') => {
    // 等待2s页面加载
    cy.wait(1000);
    Tools.queryElement(selector).find('.ant-tabs-nav .ant-tabs-tab').then((els) => {
        for (let i = 0; i < els.length; i++) {
            const item = els[i];
            const val = item.innerHTML;
            if (val === value) {
                cy.$$(item).click();
                break;
            }
        }
    });
}

/**
 * popover 按钮点击事件
 * @param {Number} index 点击的按钮下标
 * @param {String} selector 顶级自定义容器名，保证唯一性，class属性或者id名，默认值：‘.ant-popover’
 */
export const clickPopover = (index, selector = '.ant-popover') => {
    // 等待2s页面加载
    cy.wait(600);
    Tools.queryAllElement(selector).not('.ant-popover-hidden').first().find('.ant-popover-buttons .ant-btn').eq(index).click();
}

/**
 * 切换门店
 * @param {Number} index 门店列表存在的下标，从 0 开始
 */
export const changeStore = (index) => {
    // 等待2s页面加载
    cy.wait(600);
    Tools.click('.main-header-container .main-header-current-store-info');
    Tools.queryByIndex('.store-selection-dropdown-list-container .ant-dropdown-menu-item', 1).click();
    Tools.queryByIndex('#switch$Menu .ant-dropdown-menu-item-group-list .ant-dropdown-menu-item', index).click();
    Tools.sleep();
}

// 选择时间方法
/**
 * 选择时间，格式 ‘YYYY-MM-DD’
 * @param {Number} index 时间选项框下标，从 0 开始
 * @param {String} value 时间字符串
 * @param {String} selector 容器 class 或者 id 选择器，默认值：‘.main-content-container’
 */
export const selectDate = (index, value, selector = '.main-content-container') => {
    Tools.queryElement(selector).find('.ant-calendar-picker-input').eq(index).click();
    Tools.queryElement('.ant-calendar-picker-container .ant-calendar-input').type(value);
    Tools.queryElement('.ant-calendar-footer .ant-calendar-ok-btn').click();
}

/**
 * 选择时间，格式 ‘YYYY-MM-DD HH:mm’
 * @param {Number} index 时间选项框下标，从 0 开始
 * @param {String} value 时间字符串
 * @param {String} selector 容器 class 或者 id 选择器，默认值：‘.main-content-container’
 */
export const selectDateTime = (index, value, selector = '.main-content-container') => {
    // 等待1s页面加载
    cy.wait(600);
    Tools.queryElement(selector).find('.ant-calendar-picker-input').eq(index).click();
    Tools.queryElement('.ant-calendar-picker-container .ant-calendar-input').type(value);
    Tools.queryElement('.ant-calendar-footer .ant-calendar-ok-btn').click();
}

/**
 * 同时选择开始结束时间
 * @param {Number} index 日期范围选项框下标，从 0 开始
 * @param {String} start 开始时间字符串
 * @param {String} end 结束时间字符串
 * @param {String} selector 容器 class 或者 id 选择器，默认值：‘.main-content-container’
 */
export const selectStartAndEndDate = (index, start, end, selector = '.main-content-container') => {
    // 等待1s页面加载
    cy.wait(600);
    Tools.queryElement(selector).find('.ant-calendar-picker-input').eq(index).click();
    // 根据时间选择相应的时间
    selectDateByValue(start, '.ant-calendar-picker-container .ant-calendar-range-part.ant-calendar-range-left');
    selectDateByValue(end, '.ant-calendar-picker-container .ant-calendar-range-part.ant-calendar-range-right');
    Tools.queryElement('.ant-calendar-picker-container').find('.ant-calendar-footer-btn .ant-calendar-ok-btn').click();
}

/**
 * 选择时间，格式 ‘HH:mm’
 * @param {Number} index 时间选项框下标，从 0 开始
 * @param {String} value 时间字符串
 * @param {String} selector selector 容器 class 或者 id 选择器，默认值：‘.main-content-container’
 */
export const selectTime = (index, value, selector = '.main-content-container') => {
    // 等待1s页面加载
    cy.wait(600);
    Tools.queryElement(selector).find('.ant-time-picker-input').eq(index).click();
    Tools.queryElement('.ant-time-picker-panel-input').type(value);
    Tools.queryElement('body').click();
}

/**
 * 搜索框输入值，并回车搜索
 * @param {String} value 搜索的值
 * @param {String} selector 元素的选择器，class 或者 id，默认值：’.page-search-params-container‘
 */
export const searchInput = (value, selector = '.page-search-params-container') => {
    // 等待1s页面加载
    cy.wait(600);
    Tools.queryElement(`${selector} .ant-input-search`).clear().type(`${value}{enter}`);
}

/**
 * 点击开关
 * @param {Number} index 开关元素的下标，从 0 开始
 * @param {String} selector 容器的 class 或者 id 选择器，默认值：‘.main-content-container’
 */
export const clickSwitch = (index, selector = '.main-content-container') => {
    // 等待 300ms 页面加载
    cy.wait(600);
    Tools.queryElement(selector).find('.ant-switch').eq(index).click();
}

/**
 * 点击 radio 的选项
 * @param {Number} index 容器中存在的 radio 下标，从 0 开始
 * @param {Number} valIndex 需要选择的 radio 项的下标，从 0 开始
 * @param {String} selector 容器的 class 或者 id，默认值：‘.main-content-container’
 */
export const clickRadio = (index, valIndex, selector = '.main-content-container') => {
    // 等待 300ms 页面加载
    cy.wait(600);
    Tools.queryElement(selector).find('.ant-radio-group').eq(index).find('.ant-radio-wrapper').eq(valIndex).click();
}

/**
 * 点击 button 类 radio 的选项
 * @param {Number} index 容器中存在的 radio 下标，从 0 开始
 * @param {Number} valIndex 需要选择的 radio 项的下标，从 0 开始
 * @param {String} selector 容器的 class 或者 id，默认值：‘.main-content-container’
 */
export const clickRadioButton = (index, valIndex, selector = '.main-content-container') => {
    // 等待 300ms 页面加载
    cy.wait(600);
    Tools.queryElement(selector).find('.ant-radio-group').eq(index).find('.ant-radio-button-wrapper').eq(valIndex).click();
}

/**
 * 点击 checkbox 的选项
 * @param {Number} index 容器中存在的 CheckBox 下标，从 0 开始
 * @param {String} selector 容器的 class 或者 id，默认值：‘.main-content-container’
 */
export const clickCheckbox = (index, selector = '.main-content-container') => {
    // 等待 300ms 页面加载
    cy.wait(600);
    Tools.queryElement(selector).find('.ant-checkbox-wrapper').eq(index).click();
}

/**
 * 修改 modal 中 radio 的选中值
 * @param {Number} index 需要选择的 modal 中的 radio 的下标，从 0 开始
 * @param {String} selector modal 容器的 class 或者 id，默认值：‘.ant-modal-wrap’
 */
export const clickModalRadio = (index, valIndex, selector = '.ant-modal-wrap') => {
    // 等待 300ms 页面加载
    cy.wait(600);
    const cls = `${selector} .ant-modal-body`;
    clickRadio(index, valIndex, cls);
}

/**
 * 模态框按钮点击方法
 * @param {Number} index 点击的按钮的下标， 从 0 开始
 * @param {String} selector 容器的 class 或者 id，默认值：‘.ant-modal-wrap’
 */
export const clickModalBtn = (index, selector = '.ant-modal-wrap') => {
    // 等待 300ms 页面加载
    cy.wait(600);
    Tools.queryAllElement(selector).then((els) => {
        const len = els.length;
        if (len > 1) {
            for (let i = 0; i < len; i++) {
                const flag = els[i].style.display === 'none';
                if (!flag) {
                    cy.$$(els[i]).find(' .ant-modal-footer .ant-btn').eq(index).click();
                    break;
                }
            }
        } else {
            Tools.queryElement(selector).find('.ant-modal-footer .ant-btn').eq(index).click({
                force: true
            });
        }
    });
}

/**
 * 表格选择特定行
 * @param {Number} index 
 * @param {String} selector 表格所在容器 class 或者 id，默认值：‘.table-container’
 */
export const selectTableRow = (index, selector = '.table-container') => {
    // 等待 300ms 页面加载
    cy.wait(600);
    Tools.queryElement(selector).find('.ant-table-tbody .ant-checkbox-wrapper').eq(index).click();
}

/**
 * 表格项全选操作
 * @param {String} selector 表格所在容器 class 或者 id，默认值：‘.table-container’
 */
export const selectTableAllRow = (selector = '.table-container') => {
    // 等待 300ms 页面加载
    cy.wait(600);
    Tools.queryElement(selector).find('.ant-table-thead .ant-checkbox-wrapper').first().click();
}

/**
 * 批量操作下拉按钮组，下拉选择批量操作
 * @param {Number} batchIndex 批量操作按钮所在的下标，从 0 开始
 * @param {Number} valIndex 操作项所在的下拉坐标，从 0 开始
 * @param {String} selector 容器 class 或者 id，默认值：‘.page-params-container’
 */
export const batchOperateBtn = (batchIndex, valIndex, selector = '.page-params-container') => {
    // 等待 300ms 页面加载
    cy.wait(600);
    clickGroupBtn(batchIndex, selector);
    cy.wait(600);
    clickDropdownBtn(valIndex);
}

/**
 * 按钮组点击事件
 * @param {Number} index 要点击的按钮组下标，从 0 开始
 * @param {String} selector 容器 class 或者 id，默认值：‘.page-params-container’
 */
export const clickGroupBtn = (index, selector = '.page-params-container') => {
    // 等待 300ms 页面加载
    cy.wait(600);
    Tools.queryElement(selector).find('.ant-btn').eq(index).click();
}

/**
 * 下拉操作按钮点击事件
 * @param {Number} index 下拉的菜单下标，从 0 开始
 */
export const clickDropdownBtn = (index) => {
    // 等待 300ms 页面加载
    cy.wait(600);
    Tools.queryElement('.ant-dropdown.ant-dropdown-placement-bottomLeft .ant-dropdown-menu').find('.ant-dropdown-menu-item').eq(index).click();
}

/**
 * 选择页面中需要点击的下拉 multi，页面中不存在显示的 multi 选择
 * @param {Number} index 索引下标， 从 0 开始
 * @param {Number} valIndex 选取值下标，从 0 开始
 * @param {String} selector 容器 class 或者 id，默认值：‘.main-content-container’
 */
export const clickMultiInput = (index, valIndex=0, selector = '.main-content-container') => {
    cy.wait(600);
    Tools.queryElement(`${selector} .multi-select.touch-in-area`).eq(index).click();
    Tools.queryElement('.multi-select-list-container.touch-in-area').last().find('.multi-select-list').eq(valIndex).click();
    Tools.queryElement('body').click(0, 0);
}

/**
 * 选择页面中需要点击的下拉 multi，页面中不存在显示的 multi 选择
 * @param {Number} index 索引下标， 从 0 开始
 * @param {String} value 需要选中的值
 * @param {String} selector 容器 class 或者 id，默认值：‘.main-content-container’
 */
export const clickMultiInputByValue = (index, value, selector = '.main-content-container') => {
    cy.wait(600);
    Tools.queryElement(`${selector} .multi-select.touch-in-area`).eq(index).click();
    Tools.queryElement('.multi-select-list-container.touch-in-area').then((els) => {
        for (let i = 0; i < els.length; i++) {
            const item = els[i];
            const hide = item.style.display === 'none';
            if (!hide) {
                cy.$$(item).find('.multi-select-list').then((elements) => {
                    for (let j = 0; j < elements.length; j++) {
                        const item = elements[j].innerHTML;
                        if (item === val) {
                            cy.$$(elements[j]).click();
                            break;
                        }
                    }
                });
                break;
            }
        }
    });
    // Tools.queryElement('.multi-select-list-container.touch-in-area').last().find('.multi-select-list').eq(valIndex).click();
}

/**
 * 选择一个输入下拉框的选项
 * @param {Number} index 输入框下拉选择的下标，从 0 开始
 * @param {String} selector 容器选择器，class 或者 id，默认值：‘.multi-select-list-container’
 */
export const clickMultiList = (index, selector = '.multi-select-list-container') => {
    cy.wait(600);
    Tools.queryElement(selector).find('.multi-select-list-ul .multi-select-list').eq(index).click();
}

/**
 * 选择 modal 中 输入下拉框的值
 * @param {Number} index 输入框下拉选择的下标，从 0 开始
 * @param {String} val 值
 * @param {String} selector 容器选择器，class 或者 id，默认值：‘.multi-select-list-container’
 */
export const clickModalMultiInputByValue = (index, val, selector = '') => {
    cy.wait(600);
    Tools.queryAllElement(`${selector}.ant-modal-wrap`).then((els) => {
        for (let i = 0; i < els.length; i++) {
            const item = els[i];
            const hide = item.style.display === 'none';
            if (!hide) {
                Tools.queryByIndex(`${selector}.ant-modal-wrap`, i).find('.multi-select.touch-in-area').eq(index).click();
                const areaData = Tools.queryElement('.multi-select-list-container.touch-in-area');
                areaData.then((els) => {
                    for (let i = 0; i < els.length; i++) {
                        const item = els[i];
                        const hide = item.style.display === 'none';
                        if (!hide) {
                            areaData.eq(i).find('.multi-select-list').then((elements) => {
                                for (let j = 0; j < elements.length; j++) {
                                    const value = elements[j].innerHTML;
                                    if (value === val) {
                                        cy.$$(elements[j]).click();
                                        Tools.queryElement('body').click(0, 0);
                                        break;
                                    }
                                }
                            });
                            break;
                        }
                    }
                });
                break;
            }
        }
    });
}

/**
 * 从一组下拉框中选择一个输入下拉框的选项
 * @param {Number} index 下拉框存在的下标， 从 0 开始
 * @param {Number} valIndex 输入框下拉选择的下标，从 0 开始
 * @param {String} selector 容器选择器，class 或者 id，默认值：‘.multi-select-list-container’
 */
export const clickGroupMultiList = (index, valIndex, selector = '.multi-select-list-container') => {
    cy.wait(600);
    Tools.queryAllElement(selector).eq(index).find('.multi-select-list').eq(valIndex).click();
}

/**
 * 随机选择 n 项
 * @param {Number} num 选择个数
 * @param {String} selector 容器选择器，class 或者 id，默认值：‘.multi-select-list-container’
 */
export const selectRandowMultiList = (num, selector = '.multi-select-list-container') => {
    cy.wait(300)
    Tools.queryElement(selector).find('.multi-select-list').then((els) => {
        const arr = Tools.randomArr(0, els.length - 1, num ? num : Math.ceil(els.length / 5));
        for (let i = 0; i < arr.length; i++) {
            const index = arr[i];
            clickMultiList(index, selector);
        }
    });
}

/**
 * 随机选择 n 项
 * @param {Number} num 选择个数
 * @param {Number} index 选择组中的下标，从 0 开始
 * @param {String} selector 容器选择器，class 或者 id，默认值：‘.main-content-container’
 */
export const selectGroupRandowMultiList = (num, index = 0, selector = '.multi-select-list-container') => {
    cy.wait(300)
    Tools.queryAllElement(selector).eq(index).find('.multi-select-list').then((els) => {
        const arr = Tools.randomArr(0, els.length - 1, num ? num : Math.ceil(els.length / 5));
        for (let i = 0; i < arr.length; i++) {
            const valIndex = arr[i];
            clickGroupMultiList(index, valIndex, selector);
        }
    });
}

/**
 * 根据日期选择日历中的日期
 * @param {String} dateString 日期字符串
 * @param {String} selector 默认容器选择
 */
const selectDateByValue = (dateString, selector = '.ant-calendar-range-part') => {
    const datePanel = Tools.queryElement(selector);
    const dateArr = dateString.split(' ')[0].split('-');
    // const yearSelectBtn = datePanel.find('.ant-calendar-year-select').first();
    // const monthSelectBtn = datePanel.find('.ant-calendar-header .ant-calendar-month-select').first();
    // 判断年份是否相同
    // if (yearSelectBtn.innerHTML !== dateArr[0]) {
        // 选择年份
    // }
    // 判断是否是当前月份
    // if (monthSelectBtn.innerHTML !== dateArr[1]) {
        // 选择相应月份
    // }
    // 选择日期
    datePanel.find('.ant-calendar-date').then((els) => {
        let flag = false;
        for (let i = 0; i < els.length; i++) {
            const item = parseInt(els[i].innerHTML);
            const val = item > 10 ? `${item}` : `0${item}`;
            if (val === '01') {
                flag = true;
            }
            if (flag && val === dateArr[2]) {
                cy.$$(els[i]).click();
                break;
            }
        }
    });
};