<template>
  <div
		:class="'card-box box ' + (focus === index ? 'focus' : '')"
		v-if="component.type === 'cards'" @click="focusComponent(index)"
	>
		<div
			:class="
				component.data.layout + ' ' + component.data.textAlign + ' w-boxed'
			"
		>
			<div class="card-header" v-if="component.data.title">
				<h2 class="t-4">{{ component.data.title }}</h2>
			</div>
      		<div :class="'card-container '+((component.data.display=='carousel')?'carousel':`col-${component.data.columns}`)">
				<template v-for="(card, index) in component.data.cards" :key="index">
					<div class="card min-shape" @click="openCard(index)">
						<a href="javascript:void(0)" name="card-link">
							<div class="card-text">
								<h3 class="t-2">{{ card.title }}</h3>
								<div :class="'description mt-2 '+(component.data.shortenDescription?'shorten-lines':'')" v-if="component.data.showDescription && component.data.layout !== 'card-1'">
									<p class="t-1">
										{{ card.text }}
									</p>
								</div>
							</div>
							<div
								class="card-image min-shape"
								:style="'height: ' + component.data.imageHeight + 'px'"
								v-if="component.data.showImage"
							>
								<img
									
									:src="card.mediaUrl"
									alt="card image"
									v-if="card.mediaType == 'image' && card.mediaUrl"
									:style="'height: ' + card.imageHeight + 'px'"
								/>
								<div
									class="default-image"
									v-else
									:style="'height: ' + card.imageHeight + 'px'"
								>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										data-v-29a39510=""
									>
										<path
											d="M2 2V22H22V2H2ZM17 5.3C17.9 5.3 18.7 6 18.7 7C18.7 7.9 18 8.7 17 8.7C16.1 8.7 15.3 8 15.3 7C15.3 6.1 16.1 5.3 17 5.3ZM5 16.2L9.9 9.2L14.1 14.8L16.2 12.7L19 16.2H5Z"
											fill="var(--background)"
											data-v-29a39510=""
										></path>
									</svg>
								</div>
							</div>
							<div class="card-text"  v-if="component.data.layout == 'card-1'">
								<div :class="'description '+(component.data.shortenDescription?'shorten-lines':'')" v-if="component.data.showDescription">
									<p class="t-1 mt-2" >
										{{ card.text }}
									</p>
								</div>
							</div>
						</a>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default {
  props: {
    focusComponent: Function,
    component: Object,
    theme: String,
    index: Number,
  },
  computed: {
    container_class(){
      let mode = ''
      if(this.component.data.display=='carousel'){
        mode='carousel'
      }else if(this.component.data.display=='grid'){
        mode= 'col-'+this.component.data.columns
      }
      return(mode)
    }
  },
};
</script>
