const Tools = require('../../../tools/cypress.js');

import {
    login,
    clickTopLevelMenu,
    changeTab,
    clickGroupBtn,
    clickCheckbox,
    clickSecondaryMenu,
    clickRadioButton,
    clickGroupMultiList,
    selectGroupRandowMultiList,
    clickSwitch,
    clickModalBtn,
    clickTableOperatorBtn,
    clickPopover,
    afterClear,
    redirectTo,
} from '../../utils/fastfood-web.js';

describe('支付相关测试', () => {
    const now = new Date();
    const data = {
        payName: `AutoTest-自定义支付-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`,
        rate: '95',
        discountName: `AutoTest-整单折扣-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`,
        discountTwoName: `AutoTest-单品折扣-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`,
        threshold: '20',
        subtract: '15',
        reason: `AutoTest-退款原因-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`
    };

    login()

    redirectTo('支付方式', 3, 0)

    it('新建自定义支付方式', () => {
        changeTab(1, '.payment-settings');
        clickGroupBtn(0, '.ant-tabs-tabpane-active .page-search-params-container');
        Tools.inputSetValue('#name', data.payName);
        clickCheckbox(0, '.breadcrumb-page-form-container');
        clickCheckbox(1, '.breadcrumb-page-form-container');
        clickGroupBtn(0, '.form-button-container');
    });

    redirectTo('营销设置', 3, 1)

    it('新建整单折扣', () => {
        clickGroupBtn(0, '.ant-tabs-tabpane-active .page-search-params-container');
        Tools.inputSetValue('#name', data.discountName);
        clickRadioButton(0, 1, '.breadcrumb-page-form-container');
        Tools.inputSetValue('#threshold', data.threshold);
        Tools.inputSetValue('#subtract', data.subtract);
        clickGroupMultiList(0, 1, '.menu-and-menu-product-form');
        selectGroupRandowMultiList(2, 1);
        clickGroupBtn(0, '.form-button-container');
    })

    it('新建单品折扣', () => {
        changeTab(1, '.payment-settings');
        clickGroupBtn(0, '.ant-tabs-tabpane-active .page-search-params-container');
        Tools.inputSetValue('#name', data.discountTwoName);
        Tools.inputSetValue('#rate', data.rate);
        clickGroupMultiList(0, 1, '.menu-and-menu-product-form');
        selectGroupRandowMultiList(2, 1);
        clickGroupBtn(0, '.form-button-container');
    })

    redirectTo('退款原因', 3, 2)

    it('新建退款原因', () => {
        clickGroupBtn(0, '.page-search-params-container');
        Tools.inputSetValue('#name', data.reason);
        clickSwitch(0, '.ant-modal-body');
        clickModalBtn(1);
    });

    it('删除退款原因', () => {
        clickTableOperatorBtn(data.reason, 1, 0);
        clickPopover(1);
    })

    redirectTo('营销设置', 3, 1)

    it('删除整单折扣', () => {
        clickTableOperatorBtn(data.discountName, 2, 0, '.ant-tabs-tabpane-active');
        clickPopover(1);
    })
    it('删除单品折扣', () => {
        changeTab(1);
        clickTableOperatorBtn(data.discountTwoName, 2, 0, '.ant-tabs-tabpane-active');
        clickPopover(1);
    })

    redirectTo('支付方式', 3, 0)

    it('删除自定义支付方式', () => {
        changeTab(1);
        clickTableOperatorBtn(data.payName, 1, 0, '.ant-tabs-tabpane-active');
        clickPopover(1);
    })
    afterClear();
})