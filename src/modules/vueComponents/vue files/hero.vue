<template>
  <div
		:class="
			'hero-box box ' +
			component.data.textAlign +
			' ' +
			(focus === index ? 'focus' : '')
		"
		v-if="component.type === 'hero'"
	>
		<!-- hero-1 -->
		<div
			class="hero-layout-1 w-boxed"
			v-if="component?.data?.layout === 'hero-1'"
		>
			<div class="hero">
				<div class="hero-text">
					<h1 class="t-7">{{ component.data.title }}</h1>
					<p class="t-2 mb-4">{{ component.data.subtitle }}</p>
					<div class="button-holder" v-if="component.data.action === 'button'">
						<button class="t-1 shape" v-if="component.data.buttonText">
							{{ component.data.buttonText||'Sign up' }}
						</button>
					</div>
					<form
						class="email"
						action=""
						onsubmit="return false"
						v-if="
							component.data.action === 'form' && !component.data.inputs.name
						"
					>
						<input
							type="text"
							
							class="input-large shape"
							placeholder="Enter your email"
						/>
						<button class="site-btn t-1 shape">
							{{ component.data.buttonText||'Sign up' }}
						</button>
					</form>
					<form
						class="email name"
						action=""
						onsubmit="return false"
						v-if="
							component.data.action === 'form' && component.data.inputs.name
						"
					>
						<input
							type="text"
							
							class="input-large"
							placeholder="Enter your name"
						/>
						<input
							type="text"
							
							class="input-large"
							placeholder="Enter your email"
						/>
						<button class="site-btn t-1 shape mt-2">
							{{ component.data.buttonText||'Sign up' }}
						</button>
					</form>
				</div>
				<div
					class="hero-image min-shape"
					:id="'hero-image_' + index"
					v-if="component?.data?.imageUrl"
					:style="'height: ' + component?.data?.imageHeight + 'px'"
				>
					<!-- <div
						class="fullscreen-init"
						v-if="component.data.playsInFullScreen"
						@click="playInFullScreen(index)"
					></div> -->
					<img :src="component?.data?.imageUrl" alt="hero image" />
					<div class="play-video-icon shape" v-if="component.data.media === 'video'">
						<!-- onclick="revealVideo('https://www.youtube.com/watch?v=MZHLAA3Wg3Y')" -->
						<svg
							width="25"
							height="24"
							viewBox="0 0 25 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M4.10542 2L4.10542 22L20.7754 12L4.10542 2Z"
								fill="var(--accent)"
							></path>
						</svg>
					</div>
					<!-- <iframe
            v-if="component.data.media === 'video'"
            style="width: 100%; height: 100%"
            :src="getEmbed(component?.data?.imageUrl)"
          >
          </iframe> -->
				</div>
				<div
					class="hero-image min-shape default"
					v-else
					:style="'height: ' + component?.data?.imageHeight + 'px'"
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
		</div>

		<!-- hero-2 -->
		<div
			class="hero-layout-2 w-boxed"
			v-if="component?.data?.layout === 'hero-2'"
			@click="focusComponent(index)"
		>
			<div class="hero">
				<div
					class="hero-image min-shape"
					:id="'hero-image_' + index"
					v-if="component?.data?.imageUrl"
					:style="'height: ' + component?.data?.imageHeight + 'px'"
				>
					<!-- <div
						class="fullscreen-init"
						v-if="component.data.playsInFullScreen"
						@click="playInFullScreen(index)"
					></div> -->
					<img :src="component?.data?.imageUrl" alt="hero image" />
					<div
						class="play-video-icon shape"
						v-if="component.data.media === 'video'"
						onclick="revealVideo('https://www.youtube.com/watch?v=MZHLAA3Wg3Y')"
					>
						<svg
							width="25"
							height="24"
							viewBox="0 0 25 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M4.10542 2L4.10542 22L20.7754 12L4.10542 2Z"
								fill="var(--accent)"
							></path>
						</svg>
					</div>
				</div>
				<div
					class="hero-image min-shape default"
					v-else
					:style="'height: ' + component?.data?.imageHeight + 'px'"
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
				<div
					class="hero-text"
					:style="'text-align: ' + component.data.textAlign"
				>
					<h1 class="t-7">{{ component.data.title }}</h1>
					<p class="t-2 mb-4">{{ component.data.subtitle }}</p>

					<div class="button-holder" v-if="component.data.action === 'button'">
						<button class="t-1 shape" v-if="component.data.buttonText">
							{{ component.data.buttonText||'Sign up' }}
						</button>
					</div>
					<form
						class="email"
						action=""
						onsubmit="return false"
						v-if="
							component.data.action === 'form' && !component.data.inputs.name
						"
					>
						<input
							type="text"
							
							class="input-large shape"
							placeholder="Enter your email"
						/>
						<button class="site-btn t-1 shape">
							{{ component.data.buttonText||'Sign up' }}
						</button>
					</form>
					<form
						class="email name"
						action=""
						onsubmit="return false"
						v-if="
							component.data.action === 'form' && component.data.inputs.name
						"
					>
						<input
							type="text"
							
							class="input-large top-border"
							placeholder="Enter your name"
						/>
						<input
							type="text"
							
							class="input-large bottom-border"
							placeholder="Enter your email"
						/>
						<button class="site-btn t-1 shape mt-2">
							{{ component.data.buttonText||'Sign up' }}
						</button>
					</form>
				</div>
			</div>
		</div>

		<!-- hero-3 -->
		<div
			class="hero-layout-3 w-boxed"
			v-if="component?.data?.layout === 'hero-3'"
			@click="focusComponent(index)"
		>
			<div class="hero">
				<div
					class="hero-text"
					:style="'text-align: ' + component.data.textAlign"
				>
					<h1 class="t-7">{{ component.data.title }}</h1>
					<p class="t-2 mb-4">{{ component.data.subtitle }}</p>
					<div class="button-holder" v-if="component.data.action === 'button'">
						<button class="t-1 shape" v-if="component.data.buttonText">
							{{ component.data.buttonText||'Sign up' }}
						</button>
					</div>
					<form
						class="email"
						action=""
						onsubmit="return false"
						v-if="
							component.data.action === 'form' && !component.data.inputs.name
						"
					>
						<input
							type="text"
							
							class="input-large shape t-1"
							placeholder="Enter your email"
						/>
						<button class="site-btn t-1 shape">
							{{ component.data.buttonText||'Sign up' }}
						</button>
					</form>
					<form
						class="email name"
						action=""
						onsubmit="return false"
						v-if="
							component.data.action === 'form' && component.data.inputs.name
						"
					>
						<input
							type="text"
							
							class="input-large"
							placeholder="Enter your name"
						/>
						<input
							type="text"
							
							class="input-large"
							placeholder="Enter your email"
						/>
						<button class="site-btn t-1 shape mt-2">
							{{ component.data.buttonText||'Sign up' }}
						</button>
					</form>
				</div>

				<div
					class="hero-image min-shape"
					:id="'hero-image_' + index"
					v-if="component?.data?.imageUrl"
					:style="'height: ' + component?.data?.imageHeight + 'px'"
				>
					<div
						class="fullscreen-init"
						v-if="component.data.playsInFullScreen"
						@click="playInFullScreen(index)"
					></div>
					<img :src="component?.data?.imageUrl" alt="hero image" />
					<div
						class="play-video-icon shape"
						v-if="component.data.media === 'video'"
						onclick="revealVideo('https://www.youtube.com/watch?v=MZHLAA3Wg3Y')"
					>
						<svg
							width="25"
							height="24"
							viewBox="0 0 25 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M4.10542 2L4.10542 22L20.7754 12L4.10542 2Z"
								fill="var(--accent)"
							></path>
						</svg>
					</div>
				</div>
				<div
					class="hero-image min-shape default"
					v-else
					:style="'height: ' + component?.data?.imageHeight + 'px'"
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
		</div>
		<!-- hero 4 -->
		<div
			class="hero-layout-4 w-boxed"
			v-if="component?.data?.layout === 'hero-4'"
			@click="focusComponent(index)"
		>
			<div class="hero">
				<div
					class="hero-text"
					:style="'text-align: ' + component.data.textAlign"
				>
					<h1 class="t-7">{{ component.data.title }}</h1>
					<p class="t-2 mb-4">{{ component.data.subtitle }}</p>
					<div class="button-holder" v-if="component.data.action === 'button'">
						<button class="t-1 shape" v-if="component.data.buttonText">
							{{ component.data.buttonText||'Sign up'  }}
						</button>
					</div>
					<form
						class="email"
						action=""
						onsubmit="return false"
						v-if="
							component.data.action === 'form' && !component.data.inputs.name
						"
					>
						<input
							type="text"
							
							class="input-large shape"
							placeholder="Enter your email"
						/>
						<button class="btn t-1 shape">
							{{ component.data.buttonText||'Sign up'  }}
						</button>
					</form>
					<form
						class="email name"
						action=""
						onsubmit="return false"
						v-if="
							component.data.action === 'form' && component.data.inputs.name
						"
					>
						<input
							type="text"
							
							class="input-large top-border"
							placeholder="Enter your name"
						/>
						<input
							type="text"
							
							class="input-large bottom-border"
							placeholder="Enter your email"
						/>
						<button class="site-btn t-1 shape mt-2">
							{{ component.data.buttonText||'Sign up' }}
						</button>
					</form>
				</div>

				<div
					class="hero-image min-shape"
					:id="'hero-image_' + index"
					v-if="component?.data?.imageUrl"
					:style="'height: ' + component?.data?.imageHeight + 'px'"
				>
					<div
						class="fullscreen-init"
						v-if="component.data.playsInFullScreen"
						@click="playInFullScreen(index)"
					></div>
					<img :src="component?.data?.imageUrl" alt="hero image" />
					<div
						class="play-video-icon shape"
						v-if="component.data.media === 'video'"
						onclick="revealVideo('https://www.youtube.com/watch?v=MZHLAA3Wg3Y')"
					>
						<svg
							width="25"
							height="24"
							viewBox="0 0 25 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M4.10542 2L4.10542 22L20.7754 12L4.10542 2Z"
								fill="var(--accent)"
							></path>
						</svg>
					</div>
				</div>
				<div
					class="hero-image min-shape default"
					v-else
					:style="'height: ' + component?.data?.imageHeight + 'px'"
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
		</div>

		<!-- <div id="video-overlay" class="lightbox" onclick="hideVideo()" v-if="component.data.media === 'video'">
			<div class="lightbox-container">
				<div class="lightbox-content">
					<div id="video-container">
						<iframe						
							id="video-player"
							width="100%"
							height="100%"
							:src="getEmbed(component.data.videoUrl)+'?autoplay=1&mute=1'"
							allow="autoplay"
							frameborder="0"
							allowfullscreen
						></iframe>
					</div>
				</div>
			</div>
			<span class="close-video-icon" onclick="hideVideo()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4L20 20M20 4L4 20L20 4Z" stroke="var(--c-light)" stroke-linecap="square"></path>
                </svg>
            </span>
		</div> -->
	</div>
</template>

<script lang="ts">
import { isValidUrl, getEmbed, playFullScreen } from "@/functions/random.ts";

export default {
  props: {
    focusComponent: Function,
    component: Object,
    theme: String,
    index: Number,
  },
  methods: {
    isValidUrl,
    getEmbed,
    playInFullScreen(index: number) {
      if (
        this.component?.data?.playsInFullScreen &&
        this.component?.data.media == "video"
      ) {
        playFullScreen("hero-image_" + index);
      }
    },
  },
};
</script>