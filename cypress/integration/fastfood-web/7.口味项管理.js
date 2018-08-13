const Tools = require('../../../tools/cypress.js');

import {
    login,
    clickTopLevelMenu,
    clickSecondaryMenu,
    clickGroupBtn,
    clickModalBtn,
    searchInput,
    clickTableOperatorBtn,
    clickPopover,
    afterClear,
} from '../../utils/fastfood-web.js';

describe('口味项管理', () => {
    const now = new Date();

    const data = {
        name: `AutoTest-口味项-${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
    };

    login()

    it('新增口味项', () => {
        clickTopLevelMenu(1);
        clickSecondaryMenu(2);
        clickGroupBtn(0, '.page-search-params-container');
        Tools.inputSetValue('#name', data.name);
        clickModalBtn(1);
    });
    it('删除口味项', () => {
        searchInput(data.name, '.page-search-params-container');
        clickTableOperatorBtn(data.name, 1);
        clickPopover(1);
    });

    afterClear();
});