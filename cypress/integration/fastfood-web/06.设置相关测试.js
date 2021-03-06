const Tools = require('../../../tools/cypress.js');
import {
    login,
    clickTopLevelMenu,
    clickGroupBtn,
    clickModalBtn,
    clickTableOperatorBtn,
    clickPopover,
    afterClear,
    redirectTo,
} from '../../utils/fastfood-web.js';

describe('设置相关测试', () => {
    const now = new Date();

    const data = {
        name: `AT厨打方案${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
        changeName: `AT厨打方案${now.getHours()}${now.getMinutes()}${now.getSeconds()}修改`,
    };

    login()

    redirectTo('打印管理', 8, 0);

    it('新建厨打方案', () => {
        clickGroupBtn(0, '.page-search-params-container');
        Tools.inputSetValue('#name', data.name);
        clickModalBtn(1);
    })

    it('修改厨打方案名称', () => {
        clickTableOperatorBtn(data.name, 0);
        Tools.inputSetValue('#name', data.changeName);
        clickModalBtn(1);
    })
    
    it('删除厨打方案', () => {
        clickTableOperatorBtn(data.changeName, 1);
        clickPopover(1);
    });

    afterClear();
})