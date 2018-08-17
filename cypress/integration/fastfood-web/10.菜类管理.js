const Tools = require('../../../tools/cypress.js');

import {
    login,
    changeTab,
    clickGroupBtn,
    clickModalBtn,
    searchInput,
    clickTableOperatorBtn,
    clickPopover,
    redirectTo,
} from '../../utils/fastfood-web';

describe('菜类管理', () => {
    const now = new Date();
    const data = {
        name: `AT-菜类-${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
    };

    login()

    redirectTo('菜品菜类', 1, 1);

    it('新建菜类', () => {
        changeTab(1);
        clickGroupBtn(0, '.ant-tabs-tabpane-active .page-params-container');
        Tools.inputSetValue('#name', data.name);
        clickModalBtn(1);
    })

    it('删除菜类', () => {
        searchInput(data.name, '.ant-tabs-tabpane-active .page-params-container');
        clickTableOperatorBtn(data.name, 1, 0, '.ant-tabs-tabpane-active');
        clickPopover(1);
    })
})