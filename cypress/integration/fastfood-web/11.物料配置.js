const Tools = require('../../../tools/cypress.js');
import {
    login,
    afterClear,
    clickTopLevelMenu,
    clickSecondaryMenu,
    clickGroupBtn,
    clickModalBtn,
    changeTabByValue,
    clickTableOperatorText,
    clickSelectByValue,
    clickTableExpand,
    clickPopover,
    redirectTo,
} from '../../utils/fastfood-web';

describe('物料配置', () => {
    const now = new Date();
    const data = {
        name: `AutoTest${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
        changeName: `AutoTestChange${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
        sonName: `AutoTest-子类${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
        materialName: `AT-物料${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
        materialCountUnit: '斤',
        materialBuyUnit: '斤',
        materialRecipeUnit: '斤',
    };

    login()

    redirectTo('物料配置', 6, 4)

    it('新增大类', () => {
        clickGroupBtn(0, '.material-super-type-tabs .ant-tabs-bar');
        Tools.modalInputSetValue('#name', data.name);
        clickModalBtn(1);
        changeTabByValue(data.name);
    })

    it('新增子类', () => {
        clickGroupBtn(0, '.ant-tabs-tabpane-active .material-super-type-btn-bar');
        Tools.modalInputSetValue('#name', data.sonName);
        clickModalBtn(1);
    })
    it('新增物料', () => {
        clickTableOperatorText(data.sonName, 0);
        Tools.modalInputSetValue('#name', data.materialName);
        clickSelectByValue(0, data.materialCountUnit, '.material-detail-modal');
        clickSelectByValue(1, data.materialBuyUnit, '.material-detail-modal');
        Tools.modalInputSetValue('#psRatio', '1');
        clickSelectByValue(2, data.materialRecipeUnit, '.material-detail-modal');
        Tools.modalInputSetValue('#scRatio', '1');
        clickModalBtn(1);
    })
    it('修改大类', () => {
        clickGroupBtn(1, '.ant-tabs-tabpane-active .material-super-type-btn-bar');
        Tools.modalInputSetValue('#name', data.changeName);
        clickModalBtn(1);
    })
    it('删除物料', () => {
        changeTabByValue(data.changeName);
        clickTableExpand(data.sonName, '.ant-tabs-tabpane-active');
        clickTableOperatorText(data.materialName, 1, 0, '.ant-tabs-tabpane-active');
        clickPopover(1);
    })
    it('删除子类', () => {
        clickTableOperatorText(data.sonName, 2);
        clickPopover(1);
    })
    it('删除大类', () => {
        Tools.queryElement('.ant-tabs-tabpane-active .material-super-type-panel .pull-right').click();
        clickPopover(1);
    })

    afterClear()
})