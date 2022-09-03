<template>
   <div
    :class="'navbar-box box mb-1 ' +(focus===index?'focus':'')"
    v-if="component.type === 'header'"
    @click="focusComponent(index)"
  >
    <div :class="'navbar header-box '+(focus===index?'focus':'')">
      <!-- desktop nav -->
      <!-- header-1 -->
      <div class="header-1 w-boxed" v-if="component?.data?.layout === 'header-1'">
        <div class="desktop-nav">
          <header>
            <a href="javascript:void(0)" name="logo" class="logo">
              <template v-if="component.data.logoType === 'image'">
                <img
                  v-if="(theme === 'light') && component?.data?.logoUrlLight"
                  :src="component?.data?.logoUrlLight"
                  alt="website logo"
                  class="site-logo "
                />
                <img
                  v-else-if="(theme === 'dark') &&component?.data?.logoUrlDark"
                  :src="component?.data?.logoUrlDark"
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
              <h1 class="t-2" v-if="component.data.logoType === 'text'">
                {{ component.data.logoText }}
              </h1>
            </a>
            <nav>
              <ul>
                <template v-for="(menu, index) in component.data.menus" :key="index">
                  <li>
                    <a :href="'#' + menu.link" class="t-1">{{ menu.text }}</a>
                  </li>
                </template>
              </ul>
            </nav>
            <div class="button-holder">
              <button class="site-btn t-1 shape">
                {{ component.data.buttonText || "Button" }}
              </button>
            </div>
          </header>
        </div>
      </div>
      <!-- header-2 -->
      <div class="header-2 w-boxed" v-if="component?.data?.layout === 'header-2'">
        <div class="desktop-nav">
          <header>
            <nav>
              <a href="javascript:void(0)" name="logo" class="logo">
                <template v-if="component.data.logoType === 'image'">
                  <img
                    v-if="theme === 'light' && component?.data?.logoUrlLight"
                    :src="component?.data?.logoUrlLight"
                    alt="website logo"
                    class="site-logo "
                  />
                  <img
                    v-else-if="theme === 'dark' &&component?.data?.logoUrlDark"
                    :src="component?.data?.logoUrlDark"
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
                <h1 class="t-2" v-if="component.data.logoType === 'text'">
                  {{ component.data.logoText }}
                </h1>
              </a>

              <ul>
                <template v-for="(menu, index) in component.data.menus" :key="index">
                  <li>
                    <a :href="'#' + menu.link" class="t-1">{{ menu.text }}</a>
                  </li>
                </template>
              </ul>
            </nav>

            <div class="button-holder">
              <button class="site-btn t-1 shape">
                {{ component.data.buttonText || "Button" }}
              </button>
            </div>
          </header>
        </div>
      </div>
      <!-- header-3 -->
      <div class="header-3 w-boxed" v-if="component?.data?.layout === 'header-3'">
        <div class="desktop-nav">
          <header>
            <a href="javascript:void(0)" name="logo" class="logo">
              <template v-if="component.data.logoType === 'image'">
                <img
                  v-if="theme === 'light' && component?.data?.logoUrlLight"
                  :src="component?.data?.logoUrlLight"
                  alt="website logo"
                  class="site-logo "
                />
                <img
                  v-else-if="theme === 'dark' &&component?.data?.logoUrlDark"
                  :src="component?.data?.logoUrlDark"
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
              <h1 class="t-2" v-if="component.data.logoType === 'text'">
                {{ component.data.logoText }}
              </h1>
            </a>

            <nav>
              <ul>
                <template v-for="(menu, index) in component.data.menus" :key="index">
                  <li>
                    <a :href="'#' + menu.link" class="t-1">{{ menu.text }}</a>
                  </li>
                </template>
              </ul>
              <div class="button-holder">
                <button class="site-btn t-1 shape">
                  {{ component.data.buttonText || "Button" }}
                </button>
              </div>
            </nav>
          </header>
        </div>
      </div>
      <!-- header-4 -->
      <div class="header-4 w-boxed" v-if="component?.data?.layout === 'header-4'">
        <div class="desktop-nav">
          <header>
            <a href="javascript:void(0)" name="logo" class="logo">
              <template v-if="component.data.logoType === 'image'">
                <img
                  v-if="theme === 'light' && component?.data?.logoUrlLight"
                  :src="component?.data?.logoUrlLight"
                  alt="website logo"
                  class="site-logo "
                />
                <img
                  v-else-if="theme === 'dark' &&component?.data?.logoUrlDark"
                  :src="component?.data?.logoUrlDark"
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
              <h1 class="t-2" v-if="component.data.logoType === 'text'">
                {{ component.data.logoText }}
              </h1>
            </a>
            <div class="button-holder">
              <button class="site-btn t-1 shape">
                {{ component.data.buttonText || "Button" }}
              </button>
            </div>
          </header>
          <nav>
            <ul>
              <template v-for="(menu, index) in component.data.menus" :key="index">
                <li>
                  <a :href="'#' + menu.link" class="t-1">{{ menu.text }}</a>
                </li>
              </template>
            </ul>
          </nav>
        </div>
      </div>
      <!-- announcement bar  -->
      <div class="announcement-bar-block" v-if="component?.data?.showAnnouncementText">
        <div class="announcement-bar"></div>
        <p>{{component?.data?.announcementText}}</p>
      </div>
      
      <!-- mobile nav -->
      <div class="mobile-nav">
        <header>
          <a href="javascript:void(0)" name="logo" class="logo t-3">
            <template v-if="component.data.logoType === 'image'">
                <img
                  v-if="(theme === 'light') && component?.data?.logoUrlLight"
                  :src="component?.data?.logoUrlLight"
                  alt="website logo"
                  class="site-logo "
                />
                <img
                  v-else-if="(theme === 'dark') &&component?.data?.logoUrlDark"
                  :src="component?.data?.logoUrlDark"
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
              <h1 class="t-2" v-if="component.data.logoType === 'text'">
                {{ component.data.logoText }}
              </h1>
          </a>
          <div class="menu-icon">
            <p>Menu</p>
            <!-- <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.5 12H3.5M21.5 19H3.5H21.5ZM21.5 5H3.5H21.5Z"
                stroke="var(--foreground)"
                stroke-miterlimit="10"
              />
            </svg> -->
          </div>
        </header>
        <div class="mobile-nav-overlay">
          <div class="header-nav">
            <header>
              <a href="" name="logo" class="logo t-3"> Vera </a>
              <div class="close-icon">
                <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m18 6.344-12 12m0-12 12 12-12-12z"
                    stroke="var(--foreground)"
                    stroke-miterlimit="10"
                  />
                </svg>
              </div>
            </header>
            <nav>
              <ul>
                <template v-for="(menu, index) in component.data.menus" :key="index">
                  <li>
                    <a :href="'#' + menu.link" class="t-1">{{ menu.text }}</a>
                  </li>
                </template>
              </ul>
            </nav>
            <div class="subscribe">
              <form action="">
                <input
                  type="text"
                  class="input-large r-small"
                  placeholder="you@website.com"
                />
                <button class="btn t-1 shape">Create Site</button>
              </form>
            </div>
          </div>
          <div class="footer-nav">
            <div class="footer-nav-icon">
              <div class="share-link">
                <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18.004 8.004L12 2m0 0L5.996 8.004M12 2v14M2 13.008V22h20v-8.992"
                    stroke="var(--foreground)"
                    stroke-miterlimit="10"
                  />
                </svg>
              </div>
            </div>
            <div class="footer-nav-icon">
              <div class="theme-switcher">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 17C14.7611 17 17 14.7611 17 12H16C16 14.2089 14.2089 16 12 16V17ZM17 12C17 9.23886 14.7611 7 12 7V8C14.2089 8 16 9.79114 16 12H17ZM12 7C9.23886 7 7 9.23886 7 12H8C8 9.79114 9.79114 8 12 8V7ZM7 12C7 14.7611 9.23886 17 12 17V16C9.79114 16 8 14.2089 8 12H7ZM11.5 2V4.666H12.5V2H11.5ZM12.5 4.666V2H11.5V4.666H12.5ZM11.5 19.333V22H12.5V19.333H11.5ZM12.5 22V19.333H11.5V22H12.5ZM22 11.5H19.333V12.5H22V11.5ZM19.333 12.5H22V11.5H19.333V12.5ZM4.667 11.5H2V12.5H4.667V11.5ZM2 12.5H4.667V11.5H2V12.5ZM4.58035 5.28646L6.44635 7.15346L7.15365 6.44654L5.28765 4.57954L4.58035 5.28646ZM7.15365 6.44654L5.28765 4.57954L4.58035 5.28646L6.44635 7.15346L7.15365 6.44654ZM16.8464 17.5526L18.7134 19.4196L19.4206 18.7124L17.5536 16.8454L16.8464 17.5526ZM19.4206 18.7124L17.5536 16.8454L16.8464 17.5526L18.7134 19.4196L19.4206 18.7124ZM18.7134 4.57945L16.8464 6.44645L17.5536 7.15355L19.4206 5.28655L18.7134 4.57945ZM17.5536 7.15355L19.4206 5.28655L18.7134 4.57945L16.8464 6.44645L17.5536 7.15355ZM6.44635 16.8455L4.58035 18.7125L5.28765 19.4195L7.15365 17.5525L6.44635 16.8455ZM5.28765 19.4195L7.15365 17.5525L6.44635 16.8455L4.58035 18.7125L5.28765 19.4195Z"
                    fill="var(--foreground)"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
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
};
</script>
