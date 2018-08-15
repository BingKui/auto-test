const Tools = require('../../../tools/cypress.js');

import {
    login,
    clickGroupBtn,
    clickTopLevelMenu,
    clickSecondaryMenu,
    clickSelectByValue,
    clickMultiInput,
    searchInput,
    clickTableOperatorBtn,
    clickCheckbox,
    clickPopover,
    afterClear,
} from '../../utils/fastfood-web';

describe('菜品管理', () => {
    const now = new Date();
    const data = {
        name: `AT-菜品-${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
        shortName: `atcp${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
        price: `10`,
        packageName: `AT-套餐-${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
        packageShortName: `attc${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
        packagePrice: '15',
    };

    login();

    it('新建单品', () => {
        clickTopLevelMenu(1);
        clickSecondaryMenu(1);
        clickGroupBtn(0, '.ant-tabs-tabpane-active .page-params-container');
        Tools.inputSetValue('#name', data.name);
        Tools.inputSetValue('#phonetic', data.shortName);
        clickSelectByValue(0, '小炒', '.breadcrumb-page-form-container');
        Tools.inputSetValue('#price', data.price);
        clickGroupBtn(0, '.form-button-container');
    })
    
    it('新建套餐', () => {
        clickSecondaryMenu(1);
        clickGroupBtn(1, '.ant-tabs-tabpane-active .page-params-container');
        Tools.inputSetValue('#name', data.packageName);
        Tools.inputSetValue('#phonetic', data.packageShortName);
        clickSelectByValue(0, '小炒', '.breadcrumb-page-form-container');
        Tools.inputSetValue('#price', data.packagePrice);
        clickMultiInput(0, 2);
        clickGroupBtn(0, '.product-sub-prods-form');
        clickGroupBtn(0, '.form-button-container')
    })
    it('修改单品', () => {
        clickSecondaryMenu(1);
        searchInput(data.name, '.ant-tabs-tabpane-active .page-params-container');
        clickTableOperatorBtn(data.name, 2, 1, '.ant-tabs-tabpane-active');
        clickCheckbox(0);
        clickGroupBtn(0, '.form-button-container');
    })
    it('修改套餐', () => {
        clickSecondaryMenu(1);
        searchInput(data.packageName, '.ant-tabs-tabpane-active .page-params-container');
        clickTableOperatorBtn(data.packageName, 2, 1, '.ant-tabs-tabpane-active');
        clickMultiInput(0, 1);
        clickGroupBtn(0, '.product-sub-prods-form');
        clickGroupBtn(0, '.form-button-container')
    })
    it('删除套餐', () => {
        clickSecondaryMenu(1);
        searchInput(data.packageName, '.ant-tabs-tabpane-active .page-params-container');
        clickTableOperatorBtn(data.packageName, 1, 1, '.ant-tabs-tabpane-active');
        clickPopover(1);
    })
    it('删除菜品', () => {
        clickSecondaryMenu(1);
        searchInput(data.name, '.ant-tabs-tabpane-active .page-params-container');
        clickTableOperatorBtn(data.name, 1, 1, '.ant-tabs-tabpane-active');
        clickPopover(1);
    })

    afterClear()
});