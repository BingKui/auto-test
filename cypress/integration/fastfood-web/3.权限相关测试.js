const Tools = require('../../../tools/cypress.js');
import {
  login,
  clickTopLevelMenu,
  clickGroupBtn,
  selectRandowMultiList,
  clickSecondaryMenu,
  clickSelectByValue,
  clickCheckbox,
  clickTableOperatorBtn,
  clickPopover,
  afterClear,
} from '../../utils/fastfood-web';


describe('权限', () => {
  const now = new Date();
  const data = {
    groupName: `AutoTest-权限组-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`,
    employeeNmae: `AutoTest-员工-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`,
    employeeLoginName: `employee${now.getHours()}${now.getMinutes()}${now.getSeconds()}`
  };
  login()

  it('新建权限组', () => {
    clickTopLevelMenu(2);
    clickSecondaryMenu(1);
    clickGroupBtn(0, '.page-search-params-container');
    Tools.inputSetValue('#name', data.groupName);
    selectRandowMultiList(3);
    clickGroupBtn(0, '.form-button-container')
  });

  it('新建员工', () => {
    clickSecondaryMenu(0);
    clickGroupBtn(0);
    Tools.inputSetValue('#name', data.employeeNmae);
    Tools.inputSetValue('#username', data.employeeLoginName);
    clickSelectByValue(1, data.groupName);
    clickCheckbox(0);
    clickCheckbox(1);
    clickGroupBtn(0, '.form-button-container');
  });

  it('删除员工', () => {
    clickTableOperatorBtn(data.employeeLoginName, 1)
    clickPopover(1);
  })

  it('删除权限组', () => {
    clickSecondaryMenu(1);
    clickTableOperatorBtn(data.groupName, 1);
    clickPopover(1);
  })

  afterClear();
})