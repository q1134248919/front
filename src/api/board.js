import request from '@/utils/request'

// 登录方法
export function board1() {
  return request({
    url: '/board/board1',
    method: 'get',
    
  })
}

//站点分析
export function boarByStation() {
    return request({
      url: '/board/board2',
      method: 'get',
      
    })
  }

  

//站点分析
export function boarByStationAndMonth() {
    return request({
      url: '/board/board3',
      method: 'get',
      
    })
  }
