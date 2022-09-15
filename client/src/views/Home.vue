<template>
  <div style="background-color: #001220">
    <transition name="slide-fade" mode="out-in">
    <component @previous-page="previousPage" @next-page="nextPage" :is="dynamicComponent(this.target)"></component>
    </transition>
  </div>
</template>

<script>
import HomeSection from '@/components/HomeSection'
import Skills from '@/components/Skills'
import Timeline from '@/components/Timeline'
import Contact from '@/components/Contact'
import About from '@/components/About'
import { pageName } from '@/utils/data'

export default {
  name: 'Home',
  components: { Contact, Timeline, Skills, About, HomeSection },
  props: {
    target: String
  },
  data () {
    return {
      dynamicComponent (target) {
        switch (target) {
          case pageName.ABOUT: return About
          case pageName.CONTACT: return Contact
          case pageName.SKILLS: return Skills
          case pageName.TIMELINE: return Timeline
          default: return HomeSection
        }
      }
    }
  },
  methods: {
    nextPage (actualPage) {
      console.time(actualPage)
      switch (actualPage) {
        case pageName.ABOUT:
          this.$emit('change-page', pageName.SKILLS)
          break
        case pageName.SKILLS:
          this.$emit('change-page', pageName.TIMELINE)
          break
        case pageName.CONTACT:
          this.$emit('change-page', pageName.HOME)
          break
        case pageName.TIMELINE:
          this.$emit('change-page', pageName.CONTACT)
          break
        default:
          this.$emit('change-page', pageName.ABOUT)
          break
      }
    },
    previousPage (actualPage) {
      console.time(actualPage)
      switch (actualPage) {
        case pageName.ABOUT:
          this.$emit('change-page', pageName.HOME)
          break
        case pageName.SKILLS:
          this.$emit('change-page', pageName.ABOUT)
          break
        case pageName.CONTACT:
          this.$emit('change-page', pageName.TIMELINE)
          break
        case pageName.TIMELINE:
          this.$emit('change-page', pageName.SKILLS)
          break
        default:
          this.$emit('change-page', pageName.CONTACT)
          break
      }
    },
    onLeave () {
      return 0
    },
    onEnter () {
      return 0
    }
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  animation: animate 1.2s ease;
}

.home-section {
  background-image: url('../assets/svg/svgBackground.svg');
  background-size: cover
}
.stripe-section {
  background-image: url('../assets/svg/svgBackground2.svg');
  background-size: cover
}

/*****************************************************************
~ Mobile media-queries (max-width: 767px)
******************************************************************/
@media only screen and (max-width: 767px) {
  .page__description h1 {
    margin-top: 100px;
  }
}
@-moz-keyframes animate {
  10% {
    transform: scale(1, 0.002);
  }
  35% {
    transform: scale(0.2, 0.002);
    opacity: 1;
  }
  50% {
    transform: scale(0.2, 0.002);
    opacity: 0;
  }
  85% {
    transform: scale(1, 0.002);
    opacity: 1;
  }
  100% {
    transform: scale(1, 1);
  }
}
@-webkit-keyframes animate {
  10% {
    transform: scale(1, 0.002);
  }
  35% {
    transform: scale(0.2, 0.002);
    opacity: 1;
  }
  50% {
    transform: scale(0.2, 0.002);
    opacity: 0;
  }
  85% {
    transform: scale(1, 0.002);
    opacity: 1;
  }
  100% {
    transform: scale(1, 1);
  }
}
@-o-keyframes animate {
  10% {
    transform: scale(1, 0.002);
  }
  35% {
    transform: scale(0.2, 0.002);
    opacity: 1;
  }
  50% {
    transform: scale(0.2, 0.002);
    opacity: 0;
  }
  85% {
    transform: scale(1, 0.002);
    opacity: 1;
  }
  100% {
    transform: scale(1, 1);
  }
}
@keyframes animate {
  10% {
    transform: scale(1, 0.002);
  }
  35% {
    transform: scale(0.2, 0.002);
    opacity: 1;
  }
  50% {
    transform: scale(0.2, 0.002);
    opacity: 0;
  }
  85% {
    transform: scale(1, 0.002);
    opacity: 1;
  }
  100% {
    transform: scale(1, 1);
  }
}
</style>
