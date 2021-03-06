<template>
  <div class="home">
    <div class="home-inner">
      <h2 class="page-header">
        Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore at dolore magna aliqua
      </h2>
      <div class="tile-wrapper">
        <div class="large_tile_group">
          <router-link :to="{name: 'Lorem1'}" class="c_tile large_tile">
            <div class="tileHeader">Lorem Ipsum 1</div>
            <div class="tileBody">
              Lorem Ipsum
            </div>
            <div class="tileFooter">
              <img :src="addSvg" />
            </div>
          </router-link>
        </div>
        <div class="middle_tile_group">
          <router-link :to="{name:'Address'}" class="c_tile middle_tile">
            <div class="tileHeader">Lorem Ipsum 2</div>
            <div class="tileBody">
              Lorem Ipsum
            </div>
            <div class="tileFooter">
              <img :src="checkMark" />
            </div>
          </router-link>
          <div class="c_tile middle_tile">
            <div class="tileHeader">Lorem Ipsum 3</div>
            <div class="tileBody">
              Lorem Ipsum
            </div>
            <div class="tileFooter">
              <img :src="arrowRight" />
            </div>
          </div>
        </div>
        <div class="small_tile_group">
          <div class="c_tile small_tile">
            <div class="tileHeader">Lorem Ipsum 4</div>
            <div class="tileBody">
              Lorem Ipsum
            </div>
            <div class="tileFooter">
              <img :src="launch" />
            </div>
          </div>
          <div class="c_tile small_tile">
            <div class="tileHeader">Lorem Ipsum 5</div>
            <div class="tileBody">
              Lorem Ipsum
            </div>
            <div class="tileFooter">
              <img :src="information" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import AddSvg from '../assets/svg/add.svg'
import ArrowRight from '../assets/svg/arrow-right.svg'
import CheckMark from '../assets/svg/checkmark.svg'
import Information from '../assets/svg/information.svg'
import Launch from '../assets/svg/launch.svg'

export default {
  name: 'Home',
  data () {
    return {
      addSvg: AddSvg,
      arrowRight: ArrowRight,
      checkMark: CheckMark,
      information: Information,
      launch: Launch
    }
  }
}
</script>

<style lang="scss">
  .home{
    width: 100%;
    height: 100%;
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    overflow: auto;
    background: #262626;
    .home-inner{
      width: 70%;
      height: auto;
      margin: 0 auto;
      margin-bottom: 98px;
      .page-header{
        color: white;
        text-align: initial;
        max-width: 485px;
        font-size: 25px;
        word-break: break-word;
        margin-bottom: 30px;
        margin-top: 30px;
      }
      .tile-wrapper{
        display: flex;
        height: 401px;
        .large_tile_group{
          width: 50%;
          margin-right: 4px;
        }
        .middle_tile_group{
          width: 30%;
          margin-right: 4px;
        }
        .small_tile_group{
          width: 20%;
        }
        .c_tile{
          padding: 20px;
          background: black;
          width: 100%;
          height: 50%;
          margin-bottom: 4px;
          text-decoration: none;
          display: flex;
          flex-flow: column;
          &.large_tile{
            height: calc(100% + 4px);
            width: 100%;
            margin-bottom: 0;
          }
          .tileHeader{
            color: white;
            margin-bottom: 10px;
            font-size: 15px;
          }
          .tileBody{
            color: #e2e2e2;
            font-size: 13px;
            margin-top: 25px;
            flex: 1;
          }
          .tileFooter{
            img{
              display: block;
              margin-left: auto;
            }
          }
        }
      }
      @media only screen and (max-width: 1170px) {
        .tile-wrapper{
          .large_tile_group, .middle_tile_group, .small_tile_group {
            width: 100%;
          }
        }
      }
      @media only screen and (max-width: 1000px) {
        .tile-wrapper{
          display: flex;
          height: auto;
          flex-wrap: wrap;
          .large_tile_group, .middle_tile_group, .small_tile_group {
            width: 100%;
          }
          .large_tile_group{
            margin-bottom: 8px;
          }
          .middle_tile_group{
            margin-bottom: 8px;
          }
          .small_tile_group{
            margin-right: 4px;
          }
        }
      }
    }
  }
</style>
