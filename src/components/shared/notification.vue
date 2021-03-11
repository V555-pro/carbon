<template>
  <div
    class="notification"
    :class="{'visible': visible}"
  >
    <div class="icon">
      <cv-inline-loading
        v-if="type==='loading'"
        loading-text=""
        state="loading"
      />
      <CheckmarkFilled20
        v-if="type==='success'"
        class="checkmark"
      />
    </div>
    <div class="content">
      <div class="header">
        {{ header }}
      </div>
      <div class="sub-header">
        {{ subHeader }}
      </div>
    </div>
    <div class="close">
      <Close20 />
    </div>
  </div>
</template>

<script>
import Close20 from '@carbon/icons-vue/es/close/20'
import CheckmarkFilled20 from '@carbon/icons-vue/es/checkmark--filled/20'
export default {
  name: 'Notification',
  components: {
		Close20,
		CheckmarkFilled20
  },
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		type: {
			type: String,
			default: 'loading',
		},
		header: {
			type: String,
			default: 'Loading notification',
		},
		subHeader: {
			type: String,
			default: 'Roius abnta mod tempor'
		}
	},
  computed: {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.notification {
	visibility: hidden;
	&.visible {
		visibility: visible;
	}
	position: absolute;
	top: 100px;
	right: 50px;
	background-color: rgb(57, 57, 57);
	display: flex;
	align-items: center;
	padding: 0.8rem 0.8rem 0.8rem 5px;
	border-left: 3px solid #D3FB67;
	height: 40px;
	.icon {
		.checkmark {
			margin: 0 10px;
			path {
				&:first-child {
					fill: #D3FB67;
				}
			}
		}
	}
	.content {
		display: flex;
		align-items: center;
		.header {
			color: white;
			font-weight: 600;
			margin-right: 10px;
		}
		.sub-header {
			color: white;
			font-weight: 400;
		}
	}
	.close {
		display: flex;
		align-items: center;
		margin-left: 50px;
		svg {
			fill: white;
		}
	}
}
</style>
