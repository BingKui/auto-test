const Tools = require('../../../tools/cypress.js');

import {
    login, clickTopLevelMenu, clickSecondaryMenu, changeTab, clickGroupBtn, clickModalBtn, searchInput, clickTableOperatorBtn, clickPopover,
} from '../../utils/fastfood-web';

describe('菜类管理', () => {
    const now = new Date();
    const data = {
        name: `AT-菜类-${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
    };

    login()

    it('新建菜类', () => {
        clickTopLevelMenu(1);
        clickSecondaryMenu(1);
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