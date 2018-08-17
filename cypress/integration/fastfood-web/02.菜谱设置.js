const Tools = require('../../../tools/cypress.js');
import {
  login,
  clickModalBtn,
  clickTopLevelMenu,
  clickGroupBtn,
  clickTableOperatorBtn,
  clickMultiList,
  selectRandowMultiList,
  clickSecondaryMenu,
  clickPopover,
  afterClear,
  redirectTo,
} from '../../utils/fastfood-web.js';

describe('添加菜谱测试', () => {
  const now = new Date();
  const data = {
    name: `AutoTest-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`
  };

  login()

  redirectTo('菜谱设置', 1, 0)
  
  it('添加菜谱', () => {
    clickGroupBtn(0, '.page-search-params-container');
    Tools.inputSetValue('#name', data.name);
    clickModalBtn(1);
  });

  it('菜谱管理设置', () => {
    clickTableOperatorBtn(data.name, 0)
  });

  it('单个添加菜品-立即上架', () => {
    clickGroupBtn(0, '.page-params-container');
    Tools.click('.ant-form-item-control .search-input');
    clickMultiList(0);
    clickModalBtn(2);
  });

  it('批量添加菜品-立即上架', () => {
    clickGroupBtn(1, '.page-params-container')
    selectRandowMultiList(2, '.bulk-add-menu-product-modal');
    clickModalBtn(2)
  });

  it('返回菜谱管理', () => {
    clickSecondaryMenu(0);
  });

  it('删除自动测试菜谱', () => {
    clickTableOperatorBtn(data.name, 3);
    clickPopover(1);
  });

  afterClear();
})