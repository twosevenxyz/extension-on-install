<template>
  <div id="app" >
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand" style="font-size: 2.1rem;">
        <a class="navbar-item" href="https://twoseven.xyz" target="_blank">
          twoseven
        </a>
      </div>
    </nav>
    <div class="container">
      <section class="section">
        <h3 class="is-3 title has-text-centered">You're almost there!</h3>
        <vue-plyr>
          <video :src="videoURL" :data-poster="posterURL"/>
        </vue-plyr>
        <div class="has-text-centered" style="font-size: 0.9em">Using the TwoSeven extension</div>

        <div style="margin-top: 1em">
          <p>
            <span class="has-text-weight-bold step">Step 1</span>
            Navigate to the video you want to watch together
          </p>
          <p>
            <span class="has-text-weight-bold step">Step 2</span>
            Click on the TwoSeven extension to load the video into a room
          </p>
          <p>
            <span class="has-text-weight-bold step">Step 3</span>
            Share room link with friends and watch together
          </p>
        </div>
      </section>

      <section class="section pt-0">
        <div>
          <h3 class="is-3 title has-text-centered">Setup</h3>
          <p>
            To load the same video for all participants, the TwoSeven extension requires access to
            <ul style="list-style: disc outside; margin-left: 3em; margin-top: 0.4em">
              <li>The link to the page containing the video</li>
              <li>Your cookies on websites such as Netflix, Hulu, Amazon Prime, Disney+, etc</li>
            </ul>
          </p>
          <p>
            <span class="has-text-weight-bold">Note</span>: We only use data that is necessary to load and sync videos.
            You can read more about our <a href="https://twoseven.xyz/help/privacy-policy">privacy policy</a> and <a href="https://twoseven.xyz/help/tac">terms of use</a>.
          </p>
          <div class="columns is-multiline has-text-centered">
            <div class="column">
              <div>
                <button :disabled="accepted || accepted === false" class="is-large is-success button" @click="accepted = true">Accept both permissions</button>
              </div>
              <div style="position: relative;">
                <transition name="fade">
                  <div v-if="accepted === undefined">
                    You'll be all set
                  </div>
                </transition>
                <transition name="fade">
                  <div v-if="accepted">
                    <span class="has-text-success">
                      You're all set
                    </span>
                  </div>
                </transition>
              </div>
            </div>
            <div class="column" v-if="false">
              <button class="is-large is-warning button">Accept page-link permission only</button>
              <div>
                Websites that need cookies will not work. We'll request access to cookies when needed.
              </div>
            </div>
            <div class="column">
              <div>
                <button class="is-large is-danger button" :disabled="accepted" @click="uninstall">Remove Extension</button>
              </div>
              <transition name="fade">
                <div v-if="!accepted">
                  We're sorry to see you go
                </div>
              </transition>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VuePlyr from 'vue-plyr'
import URI from 'urijs'

Vue.use(VuePlyr, {
  plyr: {}
})

export default {
  name: 'on-install',
  data () {
    return {
      src: '',
      accepted: undefined
    }
  },
  computed: {
    videoURL () {
      return this.assetPrefixed('static/intro.mp4')
    },
    posterURL () {
      return this.assetPrefixed('static/poster.png')
    }
  },
  methods: {
    uninstall () {
      window.chrome.management.uninstallSelf({
        showConfirmDialog: true
      }).then(() => {
        window.close()
      })
    },
    assetPrefixed (path) {
      const { ASSET_PREFIX = '' } = window
      return `${ASSET_PREFIX}/${path}`
    }
  },
  mounted () {
    const uri = new URI(window.location.href)
    const search = uri.search(true)
    const { install = true, version = '2.2.36' } = search
    // const blogURI = new URI('https://blog.twoseven.xyz/extension-updates/')
    const blogURI = new URI('http://localhost:4000/extension-updates/')
    blogURI.addSearch({
      install,
      version
    })
    this.src = blogURI.toString()
    window.app = this
  }
}
</script>

<style lang="scss">
@import '~bulma/css/bulma.min.css';
html, body {
  overflow-x: hidden;
  overflow-y: hidden;
  height: 100vh;
}
</style>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');
@import '~vue-plyr/dist/vue-plyr.css';

.is-primary {
  color: #fff;
}

#app {
  font-family: 'Roboto', sans-serif;
  font-size: 1em;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  color: #4e4e4e;
  overflow-y: auto;
  input {
    font-family: 'Roboto', sans-serif !important;
  }

  .step {
    margin-right: 0.75em;
  }

  iframe {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    border: none;
  }

  ::v-deep .plyr {
    height: auto;
  }
}

.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}
</style>
