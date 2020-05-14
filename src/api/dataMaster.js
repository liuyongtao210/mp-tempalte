// 数据达人
import request from "@/util/request";

export default {
    chinaData1() {
        return request({
            url: `/dev/overView/getAllNewDiagnosisTrend`,
            method: "get"
        });
    }
}
