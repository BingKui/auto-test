const Tools = require('../../../tools/cypress.js');
import {
  login,
  clickGroupBtn,
  selectRandowMultiList,
  clickSelectByValue,
  clickCheckbox,
  clickTableOperatorBtn,
  clickPopover,
  afterClear,
  redirectTo,
} from '../../utils/fastfood-web.js';


describe('权限', () => {
  const now = new Date();
  const data = {
    groupName: `AutoTest-权限组-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`,
    employeeNmae: `AutoTest-员工-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`,
    employeeLoginName: `employee${now.getHours()}${now.getMinutes()}${now.getSeconds()}`
  };
  login()

  redirectTo('权限组', 2, 1)

  it('新建权限组', () => {
    clickGroupBtn(0, '.page-search-params-container');
    Tools.inputSetValue('#name', data.groupName);
    selectRandowMultiList(3);
    clickGroupBtn(0, '.form-button-container')
  });

  redirectTo('员工权限', 2, 0)

  it('新建员工', () => {
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

  redirectTo('权限组', 2, 1)

  it('删除权限组', () => {
    clickTableOperatorBtn(data.groupName, 1);
    clickPopover(1);
  })

  afterClear();
})