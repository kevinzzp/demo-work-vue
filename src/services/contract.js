import req from '../common/utils/request'

//查询合同详情
export function getOneXxContractDetail(body) {
    return req.post({
        url: '/api/contract/getOneXxContractDetail',
        body
    }).then(function (data) {
        return data
    })
}
// 查询合同列表
export function getXxContractList(body) {
    return req.post({
        url: '/api/contract/getXxContractList',
        body
    }).then(function (data) {
        return data
    })
}

// 新增合同
export function saveOneXxContract(body) {
    return req.post({
        url: '/api/contract/saveOneXxContract',
        body
    }).then(function (data) {
        return data
    })
}
//修改合同
export function updateOneXxContract(body) {
    return req.post({
        url: '/api/contract/updateOneXxContract',
        body
    }).then(function (data) {
        return data
    })
}
//查询审批部门列表

export function getUserDepartment(body) {
    return req.post({
        url: '/api/ddOauth/getUserDepartment',
        body
    }).then(function (data) {
        return data
    })
}

//提交审批
export function pushContractApproval(body) {
    return req.post({
        url: '/approval/pushContractApproval',
        body
    }).then(function (data) {
        return data
    })
}

//公司查询
export function getCompanyList(body) {
    return req.post({
        url: '/company/getCompanyList',
        body
    }).then(function (data) {
        return data
    })
}


//公司详情
// export function getCompanyList(body) {
//     return req.post({
//         url: '/company/getCompanyList',
//         body
//     }).then(function (data) {
//         return data
//     })
// }
