<template>
  <div class="chart">
    <div class="chart-inner">
      <div class="top">
        <div class="left">
          <div class="chart-title">
            Meter Chart - with statuses
          </div>
          <div class="chart-description">
            Chart Description Here
          </div>
          <div class="chart-content">
            <ccv-meter-chart :data="meter1Data" :options="meter1Options" />
            <ccv-meter-chart :data="meter2Data" :options="meter2Options" />
            <ccv-meter-chart :data="meter3Data" :options="meter3Options" />
            <ccv-meter-chart :data="meter4Data" :options="meter4Options" />
            <ccv-meter-chart :data="meter5Data" :options="meter5Options" />
          </div>
        </div>
        <div class="right">
          <div class="right-top">
            <div class="chart-title">
              Gauge semicircular -- danger status
            </div>
            <div class="chart-description">
              Chart Description Here
            </div>
            <ccv-gauge-chart :data="gaugeData" :options="gaugeOptions" />
          </div>
          <div class="right-bottom">
            <div class="chart-title">
              Donut
            </div>
            <div class="chart-description">
              Chart Description Here
            </div>
            <ccv-donut-chart :data="donutData" :options="donutOptions" />
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="chart-title">
          Stacked area (time series)
        </div>
        <div class="chart-description">
          Chart Description Here
        </div>
        <ccv-stacked-area-chart :data="stackedData" :options="stackedOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import '@carbon/charts/styles.css'
import chartsVue from '@carbon/charts-vue'
// import "../ibm-plex-font.css";
Vue.use(chartsVue)

export default {
  name: 'Chart',
  components: {},
  data() {
    return {
      meter1Data: [
        {
          group: 'Dataset 1',
          value: 80
        }
      ],
      meter2Data: [
        {
          group: 'Dataset 2',
          value: 70
        }
      ],
      meter3Data: [
        {
          group: 'Dataset 3',
          value: 60
        }
      ],
      meter4Data: [
        {
          group: 'Dataset 4',
          value: 50
        }
      ],
      meter5Data: [
        {
          group: 'Dataset 5',
          value: 40
        }
      ],
      meter1Options: {
        title: '',
        meter: {},
        color: {
          scale: {
            'Dataset 1': '#D3FB67'
          }
        },
        height: '80px'
      },
      meter2Options: {
        title: '',
        meter: {},
        color: {
          scale: {
            'Dataset 2': '#ffffff'
          }
        },
        height: '80px'
      },
      meter3Options: {
        title: '',
        meter: {},
        color: {
          scale: {
            'Dataset 3': '#C6C6C6'
          }
        },
        height: '80px'
      },
      meter4Options: {
        title: '',
        meter: {},
        color: {
          scale: {
            'Dataset 4': '#4D4D4D'
          }
        },
        height: '80px'
      },
      meter5Options: {
        title: '',
        meter: {},
        color: {
          scale: {
            'Dataset 5': '#161616'
          }
        },
        height: '80px'
      },
      gaugeData: [
        {
          group: 'value',
          value: 42
        },
        {
          group: 'delta',
          value: -13.37
        }
      ],
      gaugeOptions: {
        title: '',
        resizable: true,
        height: '250px',
        width: '100%',
        gauge: {
          type: 'semi',
          status: 'danger'
        },
        color: {
          scale: {
            value: '#D3FB67'
          }
        }
      },
      donutData: [
        {
          group: 'Dataset 1',
          value: 10000
        },
        {
          group: 'Dataset 2',
          value: 20000
        },
        {
          group: 'Dataset 3',
          value: 25000
        },
        {
          group: 'Dataset 4',
          value: 65000
        },
        {
          group: 'Dataset 5',
          value: 75000
        }
      ],
      donutOptions: {
        title: '',
        resizable: true,
        legend: {
          alignment: 'center'
        },
        donut: {
          center: {
            label: 'Browsers'
          },
          alignment: 'center'
        },
        height: '400px',
        color: {
          scale: {
            'Dataset 1': '#ffffff',
            'Dataset 2': '#C6C6C6',
            'Dataset 3': '#4D4D4D',
            'Dataset 4': '#161616',
            'Dataset 5': '#D3FB67'
          }
        }
      },
      stackedData: [
        {
          group: 'Dataset 1',
          date: '2018-12-31T22:00:00.000Z',
          value: 10000
        },
        {
          group: 'Dataset 1',
          date: '2019-01-04T22:00:00.000Z',
          value: 65000
        },
        {
          group: 'Dataset 1',
          date: '2019-01-07T22:00:00.000Z',
          value: 10000
        },
        {
          group: 'Dataset 1',
          date: '2019-01-12T22:00:00.000Z',
          value: 49213
        },
        {
          group: 'Dataset 1',
          date: '2019-01-16T22:00:00.000Z',
          value: 51213
        },
        {
          group: 'Dataset 2',
          date: '2018-12-31T22:00:00.000Z',
          value: 20000
        },
        {
          group: 'Dataset 2',
          date: '2019-01-04T22:00:00.000Z',
          value: 25000
        },
        {
          group: 'Dataset 2',
          date: '2019-01-07T22:00:00.000Z',
          value: 60000
        },
        {
          group: 'Dataset 2',
          date: '2019-01-12T22:00:00.000Z',
          value: 30213
        },
        {
          group: 'Dataset 2',
          date: '2019-01-16T22:00:00.000Z',
          value: 55213
        },
        {
          group: 'Dataset 3',
          date: '2018-12-31T22:00:00.000Z',
          value: 30000
        },
        {
          group: 'Dataset 3',
          date: '2019-01-04T22:00:00.000Z',
          value: 20000
        },
        {
          group: 'Dataset 3',
          date: '2019-01-07T22:00:00.000Z',
          value: 40000
        },
        {
          group: 'Dataset 3',
          date: '2019-01-12T22:00:00.000Z',
          value: 60213
        },
        {
          group: 'Dataset 3',
          date: '2019-01-16T22:00:00.000Z',
          value: 25213
        },
        {
          group: 'Dataset 4',
          date: '2018-12-31T22:00:00.000Z',
          value: 33000
        },
        {
          group: 'Dataset 4',
          date: '2019-01-04T22:00:00.000Z',
          value: 25000
        },
        {
          group: 'Dataset 4',
          date: '2019-01-07T22:00:00.000Z',
          value: 45000
        },
        {
          group: 'Dataset 4',
          date: '2019-01-12T22:00:00.000Z',
          value: 65213
        },
        {
          group: 'Dataset 4',
          date: '2019-01-16T22:00:00.000Z',
          value: 30213
        },
        {
          group: 'Dataset 5',
          date: '2018-12-31T22:00:00.000Z',
          value: 38000
        },
        {
          group: 'Dataset 5',
          date: '2019-01-04T22:00:00.000Z',
          value: 30000
        },
        {
          group: 'Dataset 5',
          date: '2019-01-07T22:00:00.000Z',
          value: 50000
        },
        {
          group: 'Dataset 5',
          date: '2019-01-12T22:00:00.000Z',
          value: 70213
        },
        {
          group: 'Dataset 5',
          date: '2019-01-16T22:00:00.000Z',
          value: 35213
        }
      ],
      stackedOptions: {
        title: '',
        axes: {
          left: {
            stacked: true,
            scaleType: 'linear',
            mapsTo: 'value'
          },
          bottom: {
            scaleType: 'time',
            mapsTo: 'date'
          }
        },
        curve: 'curveMonotoneX',
        height: '400px',
        color: {
          scale: {
            'Dataset 1': '#161616',
            'Dataset 2': '#4D4D4D',
            'Dataset 3': '#C6C6C6',
            'Dataset 4': '#ffffff',
            'Dataset 5': '#D3FB67'
          }
        }
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.chart {
  width: 100%;
  padding: 100px 0;
  overflow: auto;
  background: #161616;
  display: flex;
  align-items: center;
  justify-content: center;
  .chart-inner {
    width: 80%;
    display: flex;
    flex-direction: column;
    color: white;
    max-width: 1000px;
    @media only screen and (max-width: 576px) {
      width: 95%;
      .top {
        flex-direction: column;
        .left {
          margin-bottom: 10px;
        }
        .right {
          margin-left: 0 !important;
        }
      }
    }
    .chart-title,
    .chart-description {
      color: #f4f4f4;
    }
    .chart-title {
      font-size: 20px;
    }
    .chart-description {
      margin: 10px 0;
    }
    .chart-content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: space-around;
    }
    .top {
      display: flex;
      margin-bottom: 10px;
      .left,
      .right {
        flex-grow: 1;
      }
      .left {
        padding: 20px;
        background: #262626;
        display: flex;
        flex-direction: column;
      }
      .right {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        .right-top {
          padding: 20px;
          margin-bottom: 10px;
          background: #262626;
        }
        .right-bottom {
          padding: 20px;
          background: #262626;
        }
      }
    }
    .bottom {
      background: #262626;
      padding: 20px;
    }
    .bx--chart-holder {
      background: #262626;
      color: #f4f4f4;
      .bx--cc--meter rect.container {
        fill: #393939;
      }
      .bx--cc--gauge path.arc-background {
        fill: #393939;
      }
      .bx--cc--meter-title text.meter-title,
      .bx--cc--meter-title text.percent-value {
        fill: white;
      }
      .bx--cc--grid rect.chart-grid-backdrop {
        fill: #262626 !important;
      }
      .bx--cc--grid g.x.grid g.tick line,
      .bx--cc--grid g.y.grid g.tick line {
        stroke: #565656;
      }
    }
  }
}
</style>
