const Tools = require('../../../tools/cypress.js');

import {
    login,
    clickTopLevelMenu,
    clickSecondaryMenu,
    clickGroupBtn,
    searchInput,
    clickTableOperatorBtn,
    clickPopover,
    clickMultiInput,
    afterClear,
} from '../../utils/fastfood-web.js';

describe('加料区管理', () => {
    const now = new Date();
    const data = {
        name: `AT加料${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
    };
    login()
    it('新建加料区', () => {
        clickTopLevelMenu(1);
        clickSecondaryMenu(3);
        clickGroupBtn(0, '.page-search-params-container');
        Tools.inputSetValue('#name', data.name);
        // clickMultiInput(0, 0);
        clickGroupBtn(0, '.breadcrumb-page-sub-content');
        Tools.queryAllElement('.ant-table-tbody input').eq(0).type('AT');
        Tools.queryAllElement('.ant-table-tbody input').eq(1).type('10');
        Tools.queryAllElement('.ant-table-tbody input').eq(2).type('1234');
        Tools.queryAllElement('.ant-table-tbody .row-modify-button').eq(0).click();
        clickGroupBtn(0, '.form-button-container');
    })

    it('删除加料区', () => {
        searchInput(data.name, '.page-search-params-container');
        clickTableOperatorBtn(data.name, 2);
        clickPopover(1);
    });

    afterClear();
});