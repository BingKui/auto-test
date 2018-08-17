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
    redirectTo,
} from '../../utils/fastfood-web.js';

describe('口味项管理', () => {
    const now = new Date();

    const data = {
        name: `AutoTest-口味项-${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
    };

    login()

    redirectTo('口味', 1, 2)

    it('新增口味项', () => {
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