const Tools = require('../../../tools/cypress.js');

import {
    login,
    afterClear,
    clickTableOperatorBtn,
    clickSelectByValue,
    clickModalBtn,
    clickGroupBtn,
    clickPopover,
    searchInput,
    clickTableOperatorText,
    clickModalSelect,
    redirectTo,
} from '../../utils/fastfood-web';

describe('菜品消耗设置', () => {
    const now = new Date();
    const data = {
        name: `AT消耗${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
        shortName: `atxh${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
        price: `10`,
    };

    login()

    redirectTo('菜品菜类', 1, 1)

    it('添加菜品', () => {
        clickGroupBtn(0, '.ant-tabs-tabpane-active .page-params-container');
        Tools.inputSetValue('#name', data.name);
        Tools.inputSetValue('#phonetic', data.shortName);
        clickSelectByValue(0, '小炒', '.breadcrumb-page-form-container');
        Tools.inputSetValue('#price', data.price);
        clickGroupBtn(0, '.form-button-container');
    })
    
    redirectTo('菜品配置', 6, 0)

    it('修改配置', () => {
        Tools.inputSetValue('.consume-config-table-search-container .ant-input', data.name);
        clickGroupBtn(0, '.consume-config-table-search-container');
        clickTableOperatorText(data.name, 0);
        clickGroupBtn(0, '.consume-detail');
        clickModalSelect(0, 0);
        clickModalBtn(1);
    })

    redirectTo('菜品菜类', 1, 1)

    it('删除测试菜品', () => {
        searchInput(data.name, '.ant-tabs-tabpane-active .page-params-container');
        clickTableOperatorBtn(data.name, 1, 1, '.ant-tabs-tabpane-active');
        clickPopover(1);
    })

    afterClear()
})