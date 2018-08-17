const Tools = require('../../../tools/cypress.js');
const dayjs = require('dayjs');
import {
    login,
    clickGroupBtn,
    clickSelect,
    changeTab,
    clickCheckbox,
    clickSelectByValue,
    searchInput,
    clickTableOperatorBtn,
    clickPopover,
    clickSecondaryMenu,
    selectGroupRandowMultiList,
    clickGroupMultiList,
    selectStartAndEndDate,
    clickRadioButton,
    afterClear,
    redirectTo,
} from '../../utils/fastfood-web.js';

describe('会员相关测试', () => {
    const now = new Date();

    const data = {
        type: `AutoTest-会员卡类型-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`,
        foregift: '50',
        length: '20',
        total: '1',
        prefix: `AT${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
        discountName: `AutoTest-会员折扣-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`,
        rate: '90',
        threshold: '30',
        subtract: '10',
        rechargeName: `AT-充值方案-${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
    };

    login()

    redirectTo('会员卡', 4, 0)

    it('新建会员卡类型', () => {
        changeTab(1);
        clickGroupBtn(0, '.ant-tabs-tabpane-active .page-search-params-container');
        Tools.inputSetValue('#name', data.type);
        Tools.inputSetValue('#foregift', data.foregift);
        clickCheckbox(0, '.breadcrumb-page-form-container');
        clickGroupBtn(0, '.form-button-container')
    })

    it('批量新增会员卡', () => {
        changeTab(0);
        clickGroupBtn(0, '.ant-tabs-tabpane-active .page-params-container');
        clickSelectByValue(0, data.type, '.payment-settings');
        Tools.inputSetValue('#prefix', data.prefix);
        Tools.inputSetValue('#length', data.length);
        Tools.inputSetValue('#total', data.total);
        clickGroupBtn(0, '.form-button-container');
    })
    it('删除测试数据', () => {
        changeTab(1);
        searchInput(data.type);
        clickTableOperatorBtn(data.type, 1);
        clickPopover(1);
    })

    redirectTo('折扣设置', 4, 1)

    it('新建会员折扣', () => {
        clickGroupBtn(0, '.page-search-params-container');
        Tools.inputSetValue('#name', data.discountName);
        clickRadioButton(0, 1);
        Tools.inputSetValue('#threshold', data.threshold);
        Tools.inputSetValue('#subtract', data.subtract);
        clickSelect(0, 0);
        clickCheckbox(0);
        clickGroupMultiList(0, 0);
        selectGroupRandowMultiList(2, 1);
        clickGroupBtn(0, '.form-button-container');
    })

    redirectTo('折扣设置', 4, 1)
    
    it('删除会员折扣数据', () => {
        searchInput(data.discountName);
        clickTableOperatorBtn(data.discountName, 2)
        clickPopover(1);
    })

    redirectTo('充值方案', 4, 2)

    it('新建充值方案', () => {
        const start = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const end = dayjs().add(10, 'day').format('YYYY-MM-DD HH:mm:ss');
        clickGroupBtn(0, '.page-search-params-container');
        Tools.inputSetValue('#name', data.rechargeName);
        Tools.inputSetValue('#base', '100');
        Tools.inputSetValue('#bonus', '15');
        selectStartAndEndDate(0, start, end);
        clickGroupBtn(0, '.form-button-container');
    })  
    it('删除充值方案', () => {
        searchInput(data.rechargeName);
        clickTableOperatorBtn(data.rechargeName, 1);
        clickPopover(1);
    })

    afterClear();
})