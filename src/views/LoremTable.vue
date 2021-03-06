<template>
  <div class="lorem-table-page">
    <Header />
    <template v-if="isLoading">
      <div class="lorem-page-loader">
        <cv-inline-loading
          :ending-text="loading.endingText"
          :error-text="loading.errorText"
          :loading-text="loading.loadingText"
          :loaded-text="loading.loadedText"
          :state="loading.state"></cv-inline-loading>
      </div>
    </template>
    <template v-else>
      <cv-toast-notification v-if="errorInfo.visible"
         kind="error"
         :title="'Error Notification'"
         :sub-title="'Roius abnta mod tempor adsfiso incidfid idunt'"
         :caption="errorInfo.timestamp"
         @close="doCloseNotification"
         :close-aria-label="errorInfo.closeAriaLabel"
         :low-contrast="false"></cv-toast-notification>
      <cv-toast-notification v-if="successInfo.visible"
         kind="success"
         :title="'Success Notification'"
         :sub-title="'Roius abnta mod tempor adsfiso incidfid idunt'"
         :caption="successInfo.timestamp"
         @close="doCloseNotification"
         :close-aria-label="successInfo.closeAriaLabel"
         :low-contrast="false"></cv-toast-notification>
      <div class="lorem-table-page-inner">
        <cv-data-table
          :row-size="dataTable.rowSize"
          :auto-width="dataTable.autoWidth"
          :sortable="dataTable.sortable"
          :title="dataTable.title"
          :action-bar-aria-label="dataTable.actionBarAriaLabel"
          :batch-cancel-label="dataTable.batchCancelLabel"
          :zebra="dataTable.zebra"
          :columns="dataTable.columns"
          :pagination="false"
          v-model="rowSelects"
          @row-select-change="actionRowSelectChange"
          @sort="onSort"
          :overflow-menu="dataTable.overflowMenu"
          :helper-text="dataTable.helperText"
          :data="filteredData" @overflow-menu-click="onOverflowMenuClick"  ref="table">
          <template v-if="dataTable.use_batchActions" slot="batch-actions">
            <cv-button @click="onBatchAction1">
              Delete
              <TrashCan16 class="bx--btn__icon"/>
            </cv-button>
            <cv-button @click="onBatchAction2">
              Save
              <Save16 class="bx--btn__icon"/>
            </cv-button>
            <cv-button @click="onBatchAction3">
              Download
              <Download16 class="bx--btn__icon"/>
            </cv-button>
          </template></cv-data-table>
      </div>
    </template>
  </div>
</template>

<script>
// @ is an alias to /src

import Header from '../components/layout/AddressHeader'
import sampleData from '../assets/sampleData'

export default {
  name: 'LoremTable',
  components: { Header },
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
        use_batchActions: true,
        helperText: 'Data has been requested fetched'
      },
      rowSelects: [],
      errorInfo: {
        visible: false,
        timestamp: 'Time stamp <a href=\\"#\\">[00:00:00]</a>',
        closeAriaLabel: 'Custom close aria label'
      },
      successInfo: {
        visible: false,
        timestamp: 'Time stamp <a href=\\"#\\">[00:00:00]</a>',
        closeAriaLabel: 'Custom close aria label'
      }
    }
  },
  mounted () {
    const that = this
    setTimeout(function () {
      that.isLoading = false
      if (sampleData.length < 1) {
        that.errorInfo.visible = true
      } else {
        that.successInfo.visible = true
      }
      that.dataTable.data = sampleData

      setTimeout(function () {
        that.errorInfo.visible = false
        that.successInfo.visible = false
      }, 1500)
    }, 5000)
  },
  computed: {
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
  methods: {
    onSort () {
    },
    onBatchAction1 () {
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
    height: 100%;
    margin-bottom: 70px;
    .lorem-page-loader{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .bx--inline-loading {
        justify-content: center;
      }
    }
    .lorem-table-page-inner{
      width: 100%;
      height: 100%;
      .cv-data-table{
        width: 80% !important;
        margin: 150px auto;
      }
      .bx--batch-actions{
        /*display: none;*/
      }
      .bx--batch-actions--active{
        /*display: block;*/
      }
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
        background: rgb(38 38 38);
      }
      .bx--data-table th {
        color: rgb(244 244 244);
        background-color: rgb(57 57 57);
      }
      .bx--data-table td, .bx--data-table tbody th {
        color: rgb(244 244 244);
        background: rgb(38 38 38);
        /*border-top: 1px solid #f4f4f4;*/
        /*border-bottom: 1px solid #e0e0e0;*/
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
      position: absolute;
      z-index: 1000;
      top: 63px;
      right: 0;
    }
  }
</style>
