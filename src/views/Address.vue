<template>
  <div class="address-page">
    <div class="address-page-inner">
      <div class="cvInputWrap">
        <div class="cvInputBox">
          <div class="cvInputLabel">
            Enter Address
          </div>
          <cv-search
            v-model="searchAddress"
            :label="cvInputLabel"
            :class="{
              'has_erro-cv-input': !isSearchValid && searchAddress !== ''
            }"
            @input="onInput"
          />
          <div class="cvInputSubLabel">
            <template v-if="searchAddress !== ''">
              <template v-if="isSearchValid">
                <span>Success Text here</span>
              </template>
              <template v-else>
                <span>Error Text here</span>
              </template>
            </template>
            <template v-else-if="searchAddress === ''">
              <span>Text here</span>
            </template>
          </div>
        </div>
        <a
          v-if="isSearchValid && searchAddress !== ''"
          href="#"
          class="goAddress"
        >
          Success Continue
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import lists from '@/assets/list'

export default {
  name: 'Address',
  data() {
    return {
      cvInputLabel: 'Enter Address',
      searchAddress: '',
      isSearchValid: false
    }
  },
  methods: {
    onInput() {
      if (this.searchAddress !== '') {
        if (lists.indexOf(this.searchAddress) > -1) {
          this.isSearchValid = true
        } else {
          this.isSearchValid = false
        }
      } else {
        this.isSearchValid = true
      }
    }
  }
}
</script>

<style lang="scss">
.address-page {
  width: 100%;
  min-height: calc(100% - 81px);
  display: flex;
  align-items: center;
  justify-content: center;
  .address-page-inner {
    .cvInputWrap {
      display: flex;
      align-items: center;
      .cvInputLabel {
        color: #bababa;
        margin-bottom: 8px;
      }
      .bx--search {
        .bx--search-input {
          color: white;
          background: #262626;
          &:focus {
            outline: 2px solid transparent;
          }
        }
        svg {
          fill: rgb(114 114 114);
        }
        .bx--search-close {
          border: none;
          &::before {
            background: transparent;
          }
          &:hover {
            background: transparent;
          }
          svg:hover {
            fill: black;
          }
        }
        .bx--search-input:focus ~ .bx--search-close:hover {
          outline: 2px solid transparent;
          outline-offset: -2px;
        }
      }
      .has_erro-cv-input {
        .bx--search {
          border: solid 1px rgb(232 90 92);
          input {
            outline: none;
            border: none;
          }
        }
      }
      .cvInputSubLabel {
        color: #bababa;
        margin-top: 8px;
      }
      .has_erro-cv-input + .cvInputSubLabel {
        color: rgb(232 90 92);
      }
      .goAddress {
        margin-left: 13px;
        text-decoration: none;
        padding: 0 20px;
        height: 49px;
        background: rgb(211 251 103);
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
      }
    }
  }
}
</style>
