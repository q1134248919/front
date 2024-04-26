import request from "@/utils/request";

// 登录方法
export function board1() {
  return request({
    url: "/board/board1",
    method: "get",
  });
}

//站点分析
export function boarByStation() {
  return request({
    url: "/board/board2",
    method: "get",
  });
}

//站点分析
export function boarByStationAndMonth() {
  return request({
    url: "/board/board3",
    method: "get",
  });
}

//站点分析
export function boarByAreaDatah() {
  return request({
    url: "/board/areaData",
    method: "get",
  });
}
//站点分析
export function boarByYearData(params) {
  return request({
    url: "/board/yearData",
    method: "get",
    params,
  });
}
//站点分析
export function boarByAgeData(params) {
  return request({
    url: "/board/ageData",
    method: "get",
    params,
  });
}
//站点分析
export function boarByOccupation() {
  return request({
    url: "/board/occupation",
    method: "get",
  });
}

//站点分析
export function boarByPrediction() {
  return request({
    url: "/board/prediction",
    method: "get",
  });
}
