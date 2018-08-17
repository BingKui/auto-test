const Tools = require('../../../tools/cypress.js');
import {
  login,
  clickModalBtn,
  clickTopLevelMenu,
  clickGroupBtn,
  clickTableOperatorBtn,
  selectRandowMultiList,
  clickSecondaryMenu,
  clickPopover,
  clickSelectByValue,
  searchInput,
  afterClear,
  redirectTo,
} from '../../utils/fastfood-web.js';

describe('门店相关操作', () => {
    const now = new Date();
    const data = {
        regionName: `AT杭州${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
        areaName: `AT余杭${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
        resNumber: `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
        name: `AT-门店名称-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`,
        telephone: '4001510571',
        place: '浙江省杭州市',
        phone: '18099900909'
    };

    login()

    redirectTo('区域设置', 0, 1)

    it('创建大区', () => {
        clickGroupBtn(0);
        Tools.inputSetValue('.ant-modal-wrap .ant-select-search__field', data.regionName);
        clickModalBtn(1);
    });
    it('新增区域', () => {
        clickTableOperatorBtn(data.regionName, 0);
        Tools.queryByIndex('.ant-modal-wrap .ant-input', 1).type(data.areaName);
        clickModalBtn(1);
    });
    // it('修改区域', () => {})

    redirectTo('门店设置', 0, 0)

    it('新增门店', () => {
        clickGroupBtn(0, '.page-search-params-container');
        clickSelectByValue(0, `${data.regionName}-${data.areaName}`, '.breadcrumb-page-container');
        Tools.inputSetValue('#resNumber', data.resNumber);
        Tools.inputSetValue('#name', data.name);
        Tools.inputSetValue('#telephone', data.telephone);
        Tools.inputSetValue('#place', data.place);
        Tools.queryElement('#mapSelector').click(150, 150);
        clickGroupBtn(0, '.form-button-container')
    })
    // it('绑定联系人电话', () => {
    //     clickTableOperatorBtn(data.name, 1);
    //     Tools.inputSetValue('#phone', data.phone);
    //     clickModalBtn(1);
    // })
    it('分配管理员工', () => {
        searchInput(data.name);
        clickTableOperatorBtn(data.name, 2);
        selectRandowMultiList(3);
        clickModalBtn(1);
    })

    it('停用', () => {
        clickTableOperatorBtn(data.name, 3);
        clickPopover(1);
    })

    it('删除门店', () => {
        clickTableOperatorBtn(data.name, 4)
        clickPopover(1);
    })

    redirectTo('区域设置', 0, 1)

    it('删除区域', () => {
        Tools.queryAllElement('.ant-table-tbody .ant-table-row').then((els) => {
            for (let i = 0; i < els.length; i++) {
                let item = cy.$$(els[i]).find('td').first();
                if (item.text() === data.regionName) {
                    item.find('.ant-table-row-expand-icon').first().click();
                    break;
                }
            }
        });
        clickTableOperatorBtn(data.areaName, 1, 1);
        clickPopover(1);
    })

    it('删除大区', () => {
        clickTableOperatorBtn(data.regionName, 2)
        clickPopover(1);
    })

    afterClear();
})