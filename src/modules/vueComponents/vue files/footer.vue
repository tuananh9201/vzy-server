<template>
  <!-- footer 1 -->
  <div
    :class="component?.data?.layout+' box '+(focus===index?'focus':'')"
    v-if="component.type === 'footer'"
    @click="focusComponent(index)"
  >
    <div
      :class="'footer-card w-boxed'">
      <div class="footer-logo mb-4">
        <div class="site-logo" v-if="component?.data.showSiteLogo && (component?.data?.layout!=='footer-4')">
          <!-- <a href="" name="site logo">
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 25 25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m16.921 0.73462-4.8 9.6v-6h-4.176l1.776-3.6h-9.6l12 24 12-24h-7.2z"
                clip-rule="evenodd"
                fill="var(--foreground)"
                fill-rule="evenodd"
              />
            </svg>
          </a> -->
          <a href="javascript:void(0)" name="logo" class="logo">
              <template v-if="headerData?.data.logoType === 'image'">
                <img
                  v-if="(theme === 'light') && headerData?.data?.logoUrlLight"
                  :src="headerData?.data?.logoUrlLight"
                  alt="website logo"
                  class="site-logo"
                />
                <img
                  v-else-if="(theme === 'dark') &&headerData?.data?.logoUrlDark"
                  :src="headerData?.data?.logoUrlDark"
                  alt="website logo"
                  class="site-logo"
                />
                <div class="default-image" v-else>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 2V22H22V2H2ZM17 5.3C17.9 5.3 18.7 6 18.7 7C18.7 7.9 18 8.7 17 8.7C16.1 8.7 15.3 8 15.3 7C15.3 6.1 16.1 5.3 17 5.3ZM5 16.2L9.9 9.2L14.1 14.8L16.2 12.7L19 16.2H5Z"
                      fill="var(--c-mix-1)"
                    ></path>
                  </svg>
                </div>
              </template>
              <h1 class="t-2" v-if="headerData?.data.logoType === 'text'">
                {{ headerData?.data.logoText }}
              </h1>
            </a>
        </div>
        <div class="social-media-link"  v-if="component?.data.showSocialIcons && (component?.data?.layout!=='footer-3')" >
          <ul>
            <li v-for="(social,index) in component.data.socials" :key="index">
              <a class="r-full" >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    :d="social.icon"
                    fill="var(--c-mix-2)"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-text" v-if="component?.data.showTextAfterLogo">
        <p class="t-1">
          {{component?.data.textAfterLogo}}
        </p>
      </div>
      <div class="footer-nav mt-4 mb-4" v-if="component?.data.showMenu">
        <ul>
          <li v-for="(item,index) in headerData?.data.menus" :key="index">
            <!-- <a :href="item.link" class="t-0">{{item.text}}</a> -->
            <a href="javascript:void(0)" class="t-0">{{item.text}}</a>
          </li>
        </ul>
      </div>
      <div class="footer-bottom">
        <div class="footer-bottom-left">
          <p class="t-0">&copy; 2022 Vzy inc.</p>
        </div>
        <div class="social-media-link"  v-if="component?.data.showSocialIcons && (component?.data?.layout==='footer-3')" >
          <ul>
            <li v-for="(social,index) in component.data.socials" :key="index">
              <a class="r-full" >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    :d="social.icon"
                    fill="var(--c-mix-2)"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <div class="site-logo" v-if="component?.data.showSiteLogo && (component?.data?.layout==='footer-4')">
          <a href="javascript:void(0)" name="logo" class="logo">
              <template v-if="headerData?.data.logoType === 'image'">
                <img
                  v-if="(theme === 'light') && headerData?.data?.logoUrlLight"
                  :src="headerData?.data?.logoUrlLight"
                  alt="website logo"
                  class="site-logo "
                />
                <img
                  v-else-if="(theme === 'dark') &&headerData?.data?.logoUrlDark"
                  :src="headerData?.data?.logoUrlDark"
                  alt="website logo"
                  class="site-logo "
                />
                <div class="default-image" v-else>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 2V22H22V2H2ZM17 5.3C17.9 5.3 18.7 6 18.7 7C18.7 7.9 18 8.7 17 8.7C16.1 8.7 15.3 8 15.3 7C15.3 6.1 16.1 5.3 17 5.3ZM5 16.2L9.9 9.2L14.1 14.8L16.2 12.7L19 16.2H5Z"
                      fill="var(--c-mix-1)"
                    ></path>
                  </svg>
                </div>
              </template>
              <h1 class="t-2" v-if="headerData?.data.logoType === 'text'">
                {{ headerData?.data.logoText }}
              </h1>
            </a>
        </div>
        <div class="footer-bottom-right">
          <a href="" class="t-0">Terms & privacy</a>
        </div>
      </div>
    </div>
    <!-- <div class="footer-options" v-if="component?.data.showMadeWithVzy">
      <svg
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 25 25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m16.921 0.73462-4.8 9.6v-6h-4.176l1.776-3.6h-9.6l12 24 12-24h-7.2z"
          clip-rule="evenodd"
          fill="var(--foreground)"
          fill-rule="evenodd"
        />
      </svg>
    </div> -->
  </div>
</template>

<script lang="ts">
export default {
  props: {
    focusComponent: Function,
    component: Object,
    theme: String,
    index: Number,
    headerData: Object
  }
};
</script>