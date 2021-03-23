<template>
  <div class="lorem-table-page" :class="{ loading: isLoading }">
    <template v-if="isLoading">
      <div class="lorem-page-loader">
        <cv-inline-loading
          v-if="!progress.loading"
          :ending-text="loading.endingText"
          :error-text="loading.errorText"
          :loading-text="loading.loadingText"
          :loaded-text="loading.loadedText"
          :state="loading.state"
        />
        <cv-inline-loading
          v-if="progress.loading"
          :ending-text="loading.endingText"
          :error-text="loading.errorText"
          :loading-text="loading.loadingText"
          :loaded-text="loading.loadedText"
          :state="loading.state"
          class="progress"
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
        <Notification
          :type="type"
          :header="header"
          :sub-header="subHeader"
          :visible="visible"
          class="notification-container"
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
              <cv-data-table-cell>
                <div @click="selectRow($event, rowIndex)">
                  <cv-checkbox
                    :checked="selects[rowIndex]"
                    :hide-label="true"
                    :value="`value-${rowIndex}`"
                  />
                </div>
              </cv-data-table-cell>
              <cv-data-table-cell>
                <div @click="selectRow($event, rowIndex)">
                  {{ row[0] }}
                </div>
              </cv-data-table-cell>
              <cv-data-table-cell>
                <div @click="selectRow($event, rowIndex)">
                  {{ row[1] }}
                </div>
              </cv-data-table-cell>
              <cv-data-table-cell>
                <div @click="selectRow($event, rowIndex)">
                  {{ row[2] }}
                </div>
              </cv-data-table-cell>
              <cv-data-table-cell>
                <div @click="selectRow($event, rowIndex)">
                  {{ row[3] }}
                </div>
              </cv-data-table-cell>
              <cv-data-table-cell>
                <div @click="selectRow($event, rowIndex)">
                  {{ row[4] }}
                  <div />
                </div>
              </cv-data-table-cell>
              <cv-data-table-cell>
                <div
                  v-if="row[5] === 'Active'"
                  class="active-column"
                  @click="selectRow($event, rowIndex)"
                >
                  <div class="green-circle" />
                  <span>{{ row[5] }}</span>
                </div>
                <div
                  v-else
                  class="active-column"
                  @click="selectRow($event, rowIndex)"
                >
                  <div class="empty-circle" />
                  <span>{{ row[5] }}</span>
                </div>
              </cv-data-table-cell>
            </cv-data-table-row>
          </template>
          <template v-if="dataTable.use_actions && isLogin" slot="actions">
            <div class="active-column">
              <div class="green-circle" />
              Logged in
            </div>
            <div class="regular-button">
              Regular Button
              <b-icon-plus />
            </div>
          </template>
          <template v-if="dataTable.use_batchActions" slot="batch-actions">
            <!-- <cv-button @click="onDeleteRow">
              Delete
              <TrashCan16 class="bx--btn__icon" />
            </cv-button> -->
            <cv-button @click="save()">
              Save
              <RowExpand32 class="bx--btn__icon" />
            </cv-button>
            <cv-button @click="download()">
              Download
              <RowCollapse32 class="bx--btn__icon" />
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
          <template v-if="dataTable.use_actions" slot="actions">
            <div v-if="!isLogin" class="gray-button">
              Grayed Out Button
              <b-icon-plus />
            </div>
            <div v-if="isLogin" class="active-column">
              <div class="green-circle" />
              Logged in
            </div>
            <div v-if="isLogin" class="regular-button">
              Regular Button
              <b-icon-plus />
            </div>
          </template>
        </cv-data-table-skeleton>
      </div>
    </template>
    <cv-modal
      ref="modal"
      :size="modal.size"
      :primary-button-disabled="false"
      :visible="false"
      :auto-hide-off="true"
      @primary-click="submit"
      @secondary-click="close"
    >
      <template slot="title">
        <cv-progress
          :initial-step="progress.initialStep"
          :steps="progress.steps"
          :vertical="false"
        />
      </template>
      <template v-if="progress.initialStep === 0" slot="content">
        <h2>Step One</h2>
        <p>By clicking submit, you will go to the second part</p>
      </template>
      <template v-if="progress.initialStep === 1" slot="content">
        <h2>Choose Number</h2>
        <p>Type in the number below that you want to submit</p>
        <div class="bx--form-item number">
          <cv-text-input
            v-model="modelNumber"
            label="Number"
            step="1"
            :mobile="false"
            @input="onNumberInput()"
          />
          <cv-button kind="primary" size="" :disabled="false" @click="max()">
            Max
          </cv-button>
          <cv-button kind="primary" size="" class="minus" @click="minus()">
            -
          </cv-button>
          <!-- <div class="v-line" /> -->
          <cv-button kind="primary" size="" class="plus" @click="plus()">
            +
          </cv-button>
        </div>
      </template>
      <!-- <template
        v-if="modal.use_contentWithInput"
        slot="content"
      >
        <div class="bx--form-item">
          <cv-dropdown 
            v-model="modelProgram"
            value=""
            label="Select Program"
          >
            <cv-dropdown-item value="10">
              <span>Option with value 10 & 10.0</span>
            </cv-dropdown-item>
            <cv-dropdown-item value="20">
              Option with value 20
            </cv-dropdown-item>
            <cv-dropdown-item value="30">
              Option with value 30
            </cv-dropdown-item>
            <cv-dropdown-item value="40">
              Option with value 40
            </cv-dropdown-item>
            <cv-dropdown-item value="50">
              Option with value 50
            </cv-dropdown-item>
          </cv-dropdown>
        </div>
        <div class="bx--form-item number">
          <cv-number-input
            v-model="modelNumber"
            label="Number"
            step="1"
            :mobile="false"
            @input="onNumberInput()"
          />
          <cv-button
            kind="primary"
            size=""
            :disabled="false"
            @click="max()"
          >
            Max
          </cv-button>
        </div>
      </template> -->
      <template slot="secondary-button">
        Cancel
      </template>
      <template slot="primary-button">
        Submit
      </template>
    </cv-modal>
    <cv-modal
      ref="modalDownload"
      :size="modal.size"
      :primary-button-disabled="false"
      :visible="false"
      :auto-hide-off="true"
      @primary-click="submitDownload"
      @secondary-click="closeDownload"
    >
      <template slot="title">
        <cv-progress
          :initial-step="downloadProgress.initialStep"
          :steps="downloadProgress.steps"
          :vertical="downloadProgress.vertical"
        >
          <cv-progress-step
            label="First Step"
            :complete="downloadProgress.step1"
            @click.native="goToDownloadStep(0)"
          />
          <cv-progress-step
            label="Second Step"
            :complete="downloadProgress.step2"
            @click.native="goToDownloadStep(1)"
          />
        </cv-progress>
      </template>
      <template v-if="downloadProgress.initialStep === 0" slot="content">
        <h2>Choose Number</h2>
        <p>Type in the number below that you want to submit</p>
        <div class="bx--form-item number">
          <cv-text-input
            v-model="modelDownloadNumber"
            label="Number"
            step="1"
            :mobile="false"
          />
          <cv-button
            kind="primary"
            size=""
            :disabled="false"
            @click="downloadMax()"
          >
            Max
          </cv-button>
          <cv-button
            kind="primary"
            size=""
            class="minus"
            @click="downloadMinus()"
          >
            -
          </cv-button>
          <!-- <div class="v-line" /> -->
          <cv-button
            kind="primary"
            size=""
            class="plus"
            @click="downloadPlus()"
          >
            +
          </cv-button>
        </div>
      </template>
      <template v-if="downloadProgress.initialStep === 1" slot="content">
        <h2>Choose Number</h2>
        <p>Type in the number below that you want to submit</p>
        <div class="bx--form-item number">
          <cv-text-input
            v-model="modelDownloadNumber"
            label="Number"
            step="1"
            :mobile="false"
          />
          <cv-button
            kind="primary"
            size=""
            :disabled="false"
            @click="downloadMax()"
          >
            Max
          </cv-button>
          <cv-button
            kind="primary"
            size=""
            class="minus"
            @click="downloadMinus()"
          >
            -
          </cv-button>
          <!-- <div class="v-line" /> -->
          <cv-button
            kind="primary"
            size=""
            class="plus"
            @click="downloadPlus()"
          >
            +
          </cv-button>
        </div>
      </template>
      <template slot="secondary-button">
        Cancel
      </template>
      <template slot="primary-button">
        Submit
      </template>
    </cv-modal>
  </div>
</template>

<script>
// @ is an alias to /src

import sampleData from '../assets/sampleData'
import { mapState } from 'vuex'
import Notification from '@/components/shared/notification'
import RowExpand32 from '@carbon/icons-vue/es/row--expand/32'
import RowCollapse32 from '@carbon/icons-vue/es/row--collapse/32'

export default {
  name: 'LoremTable',
  components: {
    Notification,
    RowExpand32,
    RowCollapse32
  },
  data() {
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
      },
      modal: {
        closeAriaLabel: 'Close',
        size: ''
      },
      modalDownload: {
        visible: false
      },
      modelProgram: '',
      modelNumber: '1',
      modelDownloadNumber: '1',
      type: 'loading',
      header: 'Loading notification',
      subHeader: 'Roius abnta mod tempor',
      visible: false,
      progress: {
        initialStep: 0,
        steps: ['First Step', 'Second Step'],
        loading: false
      },
      downloadProgress: {
        initialStep: 0,
        steps: ['First Step', 'Second Step'],
        step1: false,
        step2: false
      },
      selects: []
    }
  },
  computed: {
    ...mapState(['isLogin']),
    filteredData() {
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
  mounted() {
    setTimeout(() => {
      this.loading.state = 'loaded'
      setTimeout(() => {
        this.isLoading = false
        if (sampleData.length < 1) {
          this.errorInfo.visible = true
        } else {
          this.visible = true
        }
        this.dataTable.data = sampleData
        setTimeout(() => {
          this.type = 'success'
          this.header = 'Success notification'
          setTimeout(() => {
            this.visible = false
          }, 1000)
        }, 1000)
      }, 800)
    }, 3000)
  },
  methods: {
    onSort() {},
    // onDeleteRow () {
    //   if (this.rowSelects.length > 0) {
    //     const filtered = this.dataTable.data.filter((index) => {
    //       return this.rowSelects.indexOf(index.toString()) < 0
    //     })
    //     this.dataTable.data = filtered
    //     this.rowSelects = []
    //   }
    //   if (this.dataTable.data.length < 1) {
    //     this.successInfo.visible = false
    //     this.errorInfo.visible = true
    //   }
    // },
    save() {
      this.$refs.modal.show()
    },
    download() {
      this.$refs.modalDownload.show()
    },
    onBatchAction3() {},
    onOverflowMenuClick() {},
    actionRowSelectChange() {},
    doCloseNotification() {
      this.successInfo.visible = false
      this.errorInfo.visible = false
    },
    onNumberInput() {},
    max() {
      this.modelNumber = '100'
    },
    downloadMax() {
      this.modelDownloadNumber = '100'
    },
    plus() {
      this.modelNumber = `${++this.modelNumber}`
    },
    downloadPlus() {
      this.modelDownloadNumber = `${++this.modelDownloadNumber}`
    },
    minus() {
      this.modelNumber = `${--this.modelNumber}`
    },
    downloadMinus() {
      this.modelDownloadNumber = `${--this.modelDownloadNumber}`
    },
    selectRow(e, v) {
      const i = this.rowSelects.indexOf(`${v}`)
      if (i > -1) {
        this.rowSelects = []
        // this.rowSelects.splice(i, 1)
        for (let i = 0; i < this.dataTable.data.length; i++) {
          this.selects[i] = false
        }
      } else {
        this.rowSelects = []
        this.rowSelects.push(`${v}`)
        for (let i = 0; i < this.dataTable.data.length; i++) {
          this.selects[i] = false
        }
        this.selects[v] = true
      }
      e.preventDefault()
      e.stopPropagation()
    },
    submit() {
      this.isLoading = true
      this.loading.loadingText = 'Submiting...'
      this.loading.state = 'loading'
      this.progress.loading = true
      setTimeout(() => {
        this.isLoading = false
        this.progress.loading = false
        if (this.progress.initialStep === 1) {
          this.$refs.modal.hide()
        } else {
          this.progress.initialStep++
        }
      }, 1000)
    },
    close() {
      this.$refs.modal.hide()
    },
    submitDownload() {
      this.isLoading = true
      this.loading.loadingText = 'Submiting...'
      this.loading.state = 'loading'
      this.progress.loading = true
      setTimeout(() => {
        this.isLoading = false
        this.progress.loading = false
        if (this.downloadProgress.initialStep === 1) {
          this.$refs.modalDownload.hide()
        } else {
          this.downloadProgress.initialStep++
          this.downloadProgress.step1 = true
        }
      }, 1000)
    },
    closeDownload() {
      this.$refs.modalDownload.hide()
    },
    goToDownloadStep(i) {
      if (i === 0) {
        this.downloadProgress.step1 = false
        return
      }
      this.isLoading = true
      this.loading.loadingText = 'Submiting...'
      this.loading.state = 'loading'
      this.progress.loading = true
      setTimeout(() => {
        this.isLoading = false
        this.progress.loading = false
        this.downloadProgress.initialStep = i
        if (i === 0) this.downloadProgress.step1 = false
        else this.downloadProgress.step1 = true
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
.lorem-table-page {
  width: 100%;
  min-height: calc(100% - 81px);
  display: flex;
  align-items: center;
  &.loading {
    display: flex;
    align-items: center;
  }
  .lorem-page-loader {
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 150px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9001;
    background-color: rgba(27, 27, 27, 0.6);
    .bx--inline-loading {
      &.progress {
        flex-direction: column;
        .bx--inline-loading__animation {
          width: 6.5rem;
          height: 6.5rem;
          .bx--loading {
            width: 6.5rem;
            height: 6.5rem;
          }
        }
      }
    }
    .bx--inline-loading__checkmark-container {
      fill: #d3fb67;
    }
    .bx--inline-loading__text {
      color: #c6c6c6;
    }
  }
  .lorem-table-page-inner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .notification-container {
      width: 80%;
    }
    .cv-data-table {
      width: 80% !important;
      max-width: 1000px;
      @media screen and (max-width: 42rem) {
        width: 95% !important;
      }
      thead {
        tr {
          th.bx--table-column-checkbox {
            div {
              visibility: hidden;
            }
          }
        }
      }
      tbody {
        tr:hover {
          cursor: pointer;
        }
      }
    }
    .bx--data-table.bx--skeleton tbody tr {
      pointer-events: none;
    }
    .bx--data-table.bx--skeleton td {
      span {
        background: #353535;
        &::before {
          background: rgb(57, 57, 57);
        }
      }
    }
    .bx--batch-actions,
    .bx--batch-actions--active,
    .bx--action-list button,
    .bx--batch-summary__para span {
      background-color: #d3fb67;
      color: #161616;
    }
    .bx--data-table-container {
      width: auto;
      overflow: auto;
      display: flex;
      flex-flow: column;
      flex-wrap: wrap;

      .bx--data-table-header {
        background: rgb(38 38 38);
        h4 {
          color: rgb(244 244 244);
        }
        p {
          color: rgb(197 197 197);
        }
      }
      .bx--table-toolbar {
        width: auto;
      }
    }
    .bx--table-toolbar {
      background: rgb(38 38 38);
    }
    .bx--data-table th {
      color: rgb(244 244 244);
      background-color: rgb(57 57 57);
    }
    .bx--data-table td,
    .bx--data-table tbody th {
      color: rgb(244 244 244);
      background: rgb(38 38 38);
      border: none;
    }
    .bx--data-table {
      td.bx--table-column-checkbox {
        display: none;
      }
    }
    .bx--checkbox-label::before {
      background-color: white;
      border: none;
    }
    .bx--checkbox-label::after {
      border-bottom: 2px solid black;
      border-left: 2px solid black;
    }
    .bx--checkbox:focus + .bx--checkbox-label::before,
    .bx--checkbox-label__focus::before,
    .bx--checkbox:checked:focus + .bx--checkbox-label::before,
    .bx--checkbox-label[data-contained-checkbox-state='true'].bx--checkbox-label__focus::before,
    .bx--checkbox:indeterminate:focus + .bx--checkbox-label::before,
    .bx--checkbox-label[data-contained-checkbox-state='mixed'].bx--checkbox-label__focus::before {
      box-shadow: 0 0 0 2px #ffffff, 0 0 0 2px #fff;
    }
  }
  .cv-notifiation {
    width: 80%;
    margin-right: unset;
    // position: absolute;
    .bx--toast-notification__details {
      display: flex;
      align-items: center;
      h3,
      p {
        margin: 0;
      }
      h3 {
        margin-right: 10px;
      }
    }
    &.bx--toast-notification--success {
      &.success {
        border-left: 3px solid #d3fb67;
        .bx--toast-notification__icon {
          fill: #d3fb67 !important;
        }
      }
      &.error {
        border-left: 3px solid #ef3e88;
        .bx--toast-notification__icon {
          fill: #ef3e88 !important;
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
    background-color: #d3fb67;
  }
  .empty-circle {
    background-color: #ccc;
  }
}
.bx--modal {
  &.is-visible {
    background-color: rgba(22, 22, 22, 0.8);
    backdrop-filter: blur(2px);
  }
  .bx--modal-container {
    background-color: rgb(38, 38, 38);
    max-width: 500px;
    .bx--modal-header {
      margin-right: 0 !important;
      padding-right: 1rem !important;
      .bx--modal-header__heading {
        padding-top: 20px;
        color: rgb(244, 244, 244);
        .cv-progress {
          .cv-progress-step {
            flex: 1;
            svg {
              fill: #d3fb67;
            }
            .bx--progress-line {
              width: 100%;
            }
            p {
              color: rgb(244, 244, 244);
              box-shadow: none;
            }
            &.bx--progress-step--incomplete {
              svg {
                fill: rgb(244, 244, 244);
              }
              .bx--progress-line {
                background-color: #e0e0e0;
              }
            }
            &.bx--progress-step--complete {
              .bx--progress-line {
                background-color: #d3fb67;
              }
            }
            &.bx--progress-step--current {
              .bx--progress-line {
                background-color: #d3fb67;
              }
            }
          }
        }
      }
      button {
        display: none;
      }
    }
    .bx--modal-content {
      overflow-y: unset;
      @media screen and (min-width: 42rem) {
        padding-right: 1rem;
      }
      color: rgb(244, 244, 244);
      h2 {
        font-size: 20px;
        margin: 10px 0;
      }
      p {
        font-size: 16px;
      }
      &:focus {
        outline: none;
      }
      .bx--form-item {
        position: relative;
        &.number {
          display: flex;
          justify-content: space-between;
          flex-direction: row;
          align-items: flex-end;
          .cv-text-input {
            input:focus {
              outline: solid 2px white !important;
            }
          }
          .cv-button {
            position: absolute;
            right: 55px;
            top: 45px;
            background-color: #393939 !important;
            color: #d3fb67 !important;
            min-height: 2rem;
            padding: 10px !important;
            border-width: 0 !important;
            box-shadow: unset !important;
            &:focus {
              border-width: 0 !important;
              box-shadow: unset !important;
            }
            &:hover {
              background-color: #333030 !important;
            }
            &.minus,
            &.plus {
              color: white !important;
            }
            &.minus {
              right: 28px;
            }
            &.plus {
              right: 0px;
            }
          }
        }
        .v-line {
          width: 1px;
          height: 15px;
          background: #8d8d8d;
          position: absolute;
          right: 30px;
          bottom: 10px;
        }
        margin-top: 20px;
        label,
        .bx--label {
          color: rgb(198, 198, 198);
        }
        input {
          background-color: rgb(57, 57, 57);
          color: rgb(244, 244, 244);
        }
        .bx--dropdown,
        ul {
          background-color: rgb(38, 38, 38);
          color: rgb(244, 244, 244);
        }
        ul {
          &:focus {
            outline-color: white;
          }
          li {
            width: 100%;
            display: block;
            a {
              color: rgb(198, 198, 198);
              border-top: 1px solid rgb(57, 57, 57);
            }
            &:hover {
              background-color: rgb(53, 53, 53);
              a {
                color: rgb(244, 244, 244);
                border-bottom-color: rgb(53, 53, 53);
              }
            }
            &.bx--dropdown--selected {
              background-color: rgb(53, 53, 53);
            }
          }
        }
        .bx--dropdown {
          button:focus {
            outline: none;
          }
          button {
            .bx--list-box__menu-icon {
              svg {
                fill: rgb(244, 244, 244);
              }
            }
            span {
              color: rgb(244, 244, 244);
            }
          }
        }
        .bx--dropdown--open {
          outline-color: white;
        }
        .bx--number__controls {
          button {
            &:focus {
              outline: none;
            }
          }
        }
      }
    }
    .bx--modal-footer {
      button {
        border: solid 1px transparent !important;
        box-shadow: unset !important;
      }
    }
  }
}
</style>
