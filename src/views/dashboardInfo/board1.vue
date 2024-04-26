<template>
    <div class="dashboard-editor-container">
      <el-row>
        <el-col>
            <div>
                <div style="align-content: center;text-align: center; width: 100%; padding-top: 10px;">每月数据增长</div>
            <div id="bord1" ref="bord1">
            </div>
        </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
            <div>
            <div id="bord2" ref="bord2">
            </div>
        </div>
        </el-col>
        <el-col></el-col>
      </el-row>
      <el-row>
        <el-col>
            <div>
            <div id="bord3" ref="bord3">
            </div>
        </div>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>

    import {board1 ,boarByStation , boarByStationAndMonth} from '@/api/board'
  
  
  export default {
    name: 'board1',
    components: {

    },
    data() {
      return {
        dataBoard1:[],
        dataBoard2:[],
        dataBoard3:[]
      }
    },
    methods: {
        initBoard1(){
            board1().then(res =>{
                this.dataBoard1 = res.data
                var amounts = this.dataBoard1.map(obj => obj.amount).reverse()
                var months = this.dataBoard1.map(obj => obj.month).reverse()
                const dom = this.$refs.bord1
                const mychart = this.$echarts.init(dom)
                //绘制图表
                const option = {
                    xAxis: {
                            type: 'category',
                            data: months
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                            data: amounts,
                            type: 'line',
                            smooth: true
                            }
                        ]
                            };
                mychart.setOption(option)
                })
        },
        initBoard2(){
            boarByStation().then(res =>{
                this.dataBoard2 = res.data.map(obj=>({
                    value: obj.amount,
                    name: obj.station_code 
                }))
                this.dataBoard2.sort((a,b)=>b.value - a.value)
                if(this.dataBoard2.length > 10){
                    const top10 = this.dataBoard2.slice(0,10);
                    const remaingAmount = this.dataBoard2.slice(10).reduce((total,item)=> total + item.value,0)
                    const otherObject = {
                        value:remaingAmount,
                        name:'其他'
                    }
                    top10.push(otherObject)
                    this.dataBoard2 = top10
                }
                
                const dom = this.$refs.bord2
                const mychart = this.$echarts.init(dom)
                //绘制图表
                const option = {
                    title: {
                        text: '站点收入分析',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    series: [
                        {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: this.dataBoard2,
                        emphasis: {
                            itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                        }
                    ]
                            };
                mychart.setOption(option)
                })
        },
        initBoard3(){
            console.log('33')
            boarByStationAndMonth().then(res =>{
                console.log(res)
                
                const data=  res.data;
                //提取月份数据
                const months = new Set();
                data.forEach(item =>{
                    months.add(item.month)
                })
                //处理数据
                const constructArray = (data) => {
                const map = new Map();
                data.forEach((item) => {
                    const { month, amount, station_code } = item;
                    if (!map.has(station_code)) {
                    map.set(station_code, []);
                    }
                    map.get(station_code).push({ month, amount });
                });

                const resultArray = [];
                map.forEach((value, key) => {
                    value.sort((a, b) => a.month.localeCompare(b.month)); // 按照月份从小到大排序
                    resultArray.push({ 
                        name: key,
                        data: value.map(item => item.amount),
                        symbolSize: 20,
                        type: 'line',
                        smooth: true,
                        emphasis: {
                            focus: 'series'
                        },
                        endLabel: {
                            show: true,
                            formatter: '{a}',
                            distance: 20
                        },
                        lineStyle: {
                            width: 4
                        },
                     });
                });

                return resultArray;
                };

                const stationArray = constructArray(data);                
                const dom = this.$refs.bord3
                const mychart = this.$echarts.init(dom)
                //绘制图表
                const option = {
                    title: {
                        text: '站点月统计'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    grid: {
                        left: 30,
                        right: 110,
                        bottom: 30,
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                        saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        splitLine: {
                        show: true
                        },
                        axisLabel: {
                        margin: 30,
                        fontSize: 16
                        },
                        boundaryGap: false,
                        data: Array.from(months)
                    },
                    yAxis: {
                        scale: false,
                        type: 'value',
                        alignTicks: true,
                        axisLabel: {
                        margin: 8,
                        fontSize: 12,
                        formatter: '#{value}'
                        },
                        nameLocation: 'start',
                        interval: 1,
                        // minInterval: 100,
                        // maxInterval: 1000000,
                        // splitNumber: 1000000
                    },
                    series: stationArray               
                };
                console.log(stationArray)
                mychart.setOption(option)
                })
        }
    },
    mounted(){
        this.initBoard1();
        this.initBoard2();
        this.initBoard3();
    }
  }
  </script>
  
  <style lang="scss" scoped>
   #bord1 {
    margin-left: 20px;
    height: 400px;
    width: 100%;
   }
   #bord2 {
    margin-left: 20px;
    height: 500px;
    width: 100%;
   }
   #bord3 {
    margin-left: 20px;
    height: 800px;
    width: 100%;
   }
  </style>
  