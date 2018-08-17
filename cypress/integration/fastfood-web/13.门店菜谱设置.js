const Tools = require('../../../tools/cypress.js');

import {
    login,
    redirectTo,
    clickGroupBtn,
    afterClear,
    changeTab,
    clickSelectByValue,
    clickModalSelectByValue,
    clickModalMultiInputByValue,
    clickModalBtn,
    clickSelect,
    clickTableOperatorBtn,
    searchInput,
    clickPopover,
} from '../../utils/fastfood-web';

describe('门店菜谱设置', () => {
    const now = new Date();
    const data = {
        cuisineName: `AT测试菜品${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
        menuName: `AT测试菜谱${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
        storeName: `AT测试门店${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
    };

    login()

    redirectTo('门店设置', 0, 0)

    it('新建测试门店', () => {
        clickGroupBtn(0, '.page-search-params-container');
        clickSelect(0, 0, '.breadcrumb-page-container');
        Tools.inputSetValue('#resNumber', '123456');
        Tools.inputSetValue('#name', data.storeName);
        Tools.inputSetValue('#telephone', '400-151-0571');
        Tools.inputSetValue('#place', '杭州');
        Tools.queryElement('#mapSelector').click(150, 150);
        clickGroupBtn(0, '.form-button-container')
    })

    redirectTo('菜品菜类', 1, 1)

    it('新建菜品', () => {
        clickGroupBtn(0, '.ant-tabs-tabpane-active .page-params-container');
        Tools.inputSetValue('#name', data.cuisineName);
        Tools.inputSetValue('#phonetic', 'ATTs');
        clickSelectByValue(0, '小炒', '.breadcrumb-page-form-container');
        Tools.inputSetValue('#price', '10');
        clickGroupBtn(0, '.form-button-container');
    })

    redirectTo('菜谱设置', 1, 0)

    it('新增菜谱', () => {
        clickGroupBtn(0, '.ant-tabs-tabpane-active .page-search-params-container');
        Tools.modalInputSetValue('#name', data.menuName);
        clickModalBtn(1);
    })

    it('菜谱添加菜品', () => {
        clickTableOperatorBtn(data.menuName, 0, 0, '.ant-tabs-tabpane-active');
        clickGroupBtn(0, '.page-params-container');
        Tools.click('.ant-form-item-control .search-input');
        clickModalMultiInputByValue(0, data.cuisineName);
        clickModalBtn(2);
    })

    redirectTo('菜谱设置', 1, 0)

    it('批量设置门店菜谱', () => {
        changeTab(1);
        clickGroupBtn(0, '.ant-tabs-tabpane-active .page-search-params-container');
        clickModalSelectByValue(0, data.menuName);
        clickModalMultiInputByValue(0, data.storeName);
        clickModalBtn(1);
    })

    redirectTo('门店设置', 0, 0)

    it('删除门店', () => {
        searchInput(data.storeName);
        clickTableOperatorBtn(data.storeName, 4)
        clickPopover(1);
    })

    redirectTo('菜谱设置', 1, 0)

    it('删除菜谱', () => {
        searchInput(data.menuName, '.ant-tabs-tabpane-active .page-search-params-container');
        clickTableOperatorBtn(data.menuName, 3);
        clickPopover(1);
    })

    redirectTo('菜品菜类', 1, 1)

    it('删除菜品', () => {
        searchInput(data.cuisineName, '.ant-tabs-tabpane-active .page-params-container');
        clickTableOperatorBtn(data.cuisineName, 1, 1, '.ant-tabs-tabpane-active');
        clickPopover(1);
    })

    afterClear()
})