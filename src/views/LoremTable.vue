<template>
  <div
    class="lorem-table-page"
    :class="{'loading': isLoading}"
  >
    <template v-if="isLoading">
      <div class="lorem-page-loader">
        <cv-inline-loading
          :ending-text="loading.endingText"
          :error-text="loading.errorText"
          :loading-text="loading.loadingText"
          :loaded-text="loading.loadedText"
          :state="loading.state"
        />
      </div>
    </template>
    <template v-else>
      <div class="lorem-table-page-inner">
        <cv-toast-notification
          v-if="errorInfo.visible"
          kind="info"
          class="error"
          :title="'Error Notification'"
          :sub-title="'Roius abnta mod tempor'"
          :close-aria-label="errorInfo.closeAriaLabel"
          :low-contrast="false"
          @close="doCloseNotification"
        />
        <cv-toast-notification
          v-if="successInfo.visible"
          kind="success"
          class="success"
          :title="'Success Notification'"
          :sub-title="'Roius abnta mod tempor'"
          :close-aria-label="successInfo.closeAriaLabel"
          :low-contrast="false"
          @close="doCloseNotification"
        />
        <cv-data-table
          v-if="dataTable.data.length > 0"
          ref="table"
          v-model="rowSelects"
          :row-size="dataTable.rowSize"
          :auto-width="dataTable.autoWidth"
          :sortable="dataTable.sortable"
          :title="dataTable.title"
          :action-bar-aria-label="dataTable.actionBarAriaLabel"
          :batch-cancel-label="dataTable.batchCancelLabel"
          :zebra="dataTable.zebra"
          :columns="dataTable.columns"
          :pagination="false"
          :overflow-menu="dataTable.overflowMenu"
          :helper-text="dataTable.helperText"
          :data="filteredData"
          @row-select-change="actionRowSelectChange"
          @sort="onSort"
          @overflow-menu-click="onOverflowMenuClick"
        >
          <template slot="data">
            <cv-data-table-row
              v-for="(row, rowIndex) in filteredData"
              :key="`${rowIndex}`"
              :value="`${rowIndex}`"
            >
              <cv-data-table-cell>{{ row[0] }}</cv-data-table-cell>
              <cv-data-table-cell>{{ row[1] }}</cv-data-table-cell>
              <cv-data-table-cell>{{ row[2] }}</cv-data-table-cell>
              <cv-data-table-cell>{{ row[3] }}</cv-data-table-cell>
              <cv-data-table-cell>{{ row[4] }}</cv-data-table-cell>
              <cv-data-table-cell>
                <div
                  v-if="row[5] === 'Active'"
                  class="active-column"
                >
                  <div class="green-circle" />
                  <span>{{ row[5] }}</span>
                </div>
                <div
                  v-else
                  class="active-column"
                >
                  <div class="empty-circle" />
                  <span>{{ row[5] }}</span>
                </div>
              </cv-data-table-cell>
            </cv-data-table-row>
          </template>
          <template
            v-if="dataTable.use_actions && isLogin"
            slot="actions"
          >
            <div
              class="active-column"
            >
              <div class="green-circle" />
              Logged in
            </div>
            <div
              class="regular-button"
            >
              Regular Button
              <b-icon-plus />
            </div>
          </template>
          <template
            v-if="dataTable.use_batchActions"
            slot="batch-actions"
          >
            <cv-button @click="onDeleteRow">
              Delete
              <TrashCan16 class="bx--btn__icon" />
            </cv-button>
            <cv-button @click="onBatchAction2">
              Save
              <Save16 class="bx--btn__icon" />
            </cv-button>
            <cv-button @click="onBatchAction3">
              Download
              <Download16 class="bx--btn__icon" />
            </cv-button>
          </template>
        </cv-data-table>
        <cv-data-table-skeleton
          v-if="dataTable.data.length < 1"
          :columns="dataTable.columns"
          :rows="skeletonRows"
          :title="dataTable.title"
          :helper-text="dataTable.helperText"
        >
          <template
            v-if="dataTable.use_actions"
            slot="actions"
          >
            <div
              v-if="!isLogin"
              class="gray-button"
            >
              Grayed Out Button
              <b-icon-plus />
            </div>
            <div
              v-if="isLogin"
              class="active-column"
            >
              <div class="green-circle" />
              Logged in
            </div>
            <div
              v-if="isLogin"
              class="regular-button"
            >
              Regular Button
              <b-icon-plus />
            </div>
          </template>
        </cv-data-table-skeleton>
      </div>
    </template>
  </div>
</template>

<script>
// @ is an alias to /src

import sampleData from '../assets/sampleData'
import { mapState } from 'vuex'

export default {
  name: 'LoremTable',
  data () {
    return {
      isLoading: true,
      loading: {
        endingText: 'Ending...',
        errorText: 'Error.',
        loadingText: 'Loading...',
        loadedText: 'Complete.',
        state: 'loading'
      },
      dataTable: {
        rowSize: '',
        autoWidth: false,
        sortable: false,
        title: 'Table title',
        actionBarAriaLabel: 'Custom action bar aria label',
        batchCancelLabel: 'Cancel',
        zebra: false,
        overFlowMenu: ['Start', 'Stop', 'Delete 3', { label: 'Overflow menu' }],
        columns: [
          'Name',
          'Protocol',
          'Port',
          'Rule',
          'Attached Groups',
          'Status'
        ],
        data: [],
        use_actions: true,
        use_batchActions: true,
        helperText: 'Data has been requested fetched',
        skeletonRows: 1
      },
      skeletonRows: 0,
      rowSelects: [],
      errorInfo: {
        visible: false,
        closeAriaLabel: 'Custom close aria label'
      },
      successInfo: {
        visible: false,
        closeAriaLabel: 'Custom close aria label'
      }
    }
  },
  computed: {
    ...mapState([
      'isLogin'
    ]),
    filteredData () {
      let filteredData
      if (this.filterValue) {
        const regex = new RegExp(this.filterValue, 'i')
        filteredData = this.internalData.filter(item => {
          return item.join('|').search(regex) >= 0
        })
      } else {
        filteredData = this.dataTable.data
      }
      return filteredData
    }
  },
  mounted () {
    const that = this
    setTimeout(() => {
      this.loading.state = 'loaded'
      setTimeout(() => {
        that.isLoading = false
        if (sampleData.length < 1) {
          that.errorInfo.visible = true
        } else {
          that.successInfo.visible = true
        }
        that.dataTable.data = sampleData
        setTimeout(() => {
          that.successInfo.visible = false
        }, 1000)
      }, 800)
    }, 3000)
  },
  methods: {
    onSort () {
    },
    onDeleteRow () {
      if (this.rowSelects.length > 0) {
        const that = this
        var filtered = this.dataTable.data.filter((item, index) => {
          return that.rowSelects.indexOf(index.toString()) < 0
        })
        this.dataTable.data = filtered
        this.rowSelects = []
      }
      if (this.dataTable.data.length < 1) {
        this.successInfo.visible = false
        this.errorInfo.visible = true
      }
    },
    onBatchAction2 () {
    },
    onBatchAction3 () {
    },
    onOverflowMenuClick () {},
    actionRowSelectChange () {},
    doCloseNotification () {
      this.successInfo.visible = false
      this.errorInfo.visible = false
    }
  }
}
</script>

<style lang="scss">
  .lorem-table-page{
    width: 100%;
    min-height: calc(100% - 81px);
    display: flex;
    align-items: center;
    &.loading {
      display: flex;
      align-items: center;
    }
    .lorem-page-loader{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .bx--inline-loading {
        justify-content: center;
        .bx--inline-loading__animation {
          width: 2.5rem;
          height: 2.5rem;
          .bx--loading {
            width: 2.5rem;
            height: 2.5rem;
            .bx--loading__svg {
              stroke: #D3FB67;
              .bx--loading__background {
                stroke: rgb(57, 57, 57);
                stroke-dashoffset: -22;
              }
              .bx--loading__stroke {
                stroke: unset;
                stroke-dashoffset: 160;
                stroke-width: 8;
              }
            }
          }
        }
      }
      .bx--inline-loading__checkmark-container {
        fill: #D3FB67;
      }
      .bx--inline-loading__text {
        color: #c6c6c6;
      }
    }
    .lorem-table-page-inner{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .cv-data-table{
        width: 80% !important;
        // margin-top: 70px;
      }
      .bx--data-table.bx--skeleton tbody tr {
        pointer-events: none;
      }
      .bx--data-table.bx--skeleton td {
        span {
          background: #353535;
          &::before {
            background: rgb(57, 57, 57)
          }
        }
      }
      .bx--batch-actions, .bx--batch-actions--active, .bx--action-list button, .bx--batch-summary__para span{
        background-color: #D3FB67;
        color: #161616;
      }
      .bx--data-table-container{
        width: auto;
        overflow: auto;
        display: flex;
        flex-flow: column;
        flex-wrap: wrap;

        .bx--data-table-header{
          background: rgb(38 38 38);
          h4{
            color: rgb(244 244 244);
          }
          p{
            color: rgb(197 197 197);
          }
        }
        .bx--table-toolbar{
          width: auto;
        }
      }
      .bx--table-toolbar{
        background: rgb(38 38 38);
      }
      .bx--data-table th {
        color: rgb(244 244 244);
        background-color: rgb(57 57 57);
      }
      .bx--data-table td, .bx--data-table tbody th {
        color: rgb(244 244 244);
        background: rgb(38 38 38);
        border: none;
      }
      .bx--checkbox-label::before {
        background-color: white;
        border: none;
      }
      .bx--checkbox-label::after {
        border-bottom: 2px solid black;
        border-left: 2px solid black;
      }
      .bx--checkbox:focus + .bx--checkbox-label::before, .bx--checkbox-label__focus::before, .bx--checkbox:checked:focus + .bx--checkbox-label::before, .bx--checkbox-label[data-contained-checkbox-state='true'].bx--checkbox-label__focus::before, .bx--checkbox:indeterminate:focus + .bx--checkbox-label::before, .bx--checkbox-label[data-contained-checkbox-state='mixed'].bx--checkbox-label__focus::before {
        box-shadow: 0 0 0 2px #ffffff, 0 0 0 2px #fff;
      }
    }
    .cv-notifiation{
      width: 80%;
      margin-right: unset;
      // position: absolute;
      .bx--toast-notification__details {
        display: flex;
        align-items: center;
        h3, p {
          margin: 0;
        }
        h3 {
          margin-right: 10px;
        }
      }
      &.bx--toast-notification--success {
        &.success {
          border-left: 3px solid #D3FB67;
          .bx--toast-notification__icon {
            fill: #D3FB67 !important;
          }
        }
        &.error {
          border-left: 3px solid #EF3E88;
          .bx--toast-notification__icon {
            fill: #EF3E88 !important;
          }
        }
      }
    }
  }
  .active-column {
    display: flex;
    align-items: center;
    color: #f4f4f4;
    padding-right: 8px;
    div {
      width: 8px;
      height: 8px;
      border-radius: 4px;
      margin-right: 8px;
    }
    .green-circle {
      background-color: #D3FB67;
    }
    .empty-circle {
      background-color: #ccc;
    }
  }
</style>
