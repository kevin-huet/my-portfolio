<template>
  <div>
    <div class="home-section" style="padding-top: 20vh; padding-bottom: 30vh" id="home">
      <HomeSection/>
    </div>
    <div class="stripe-section" style="padding-top: 10vh; padding-bottom: 10vh" id="about">
      <About/>
    </div>
    <div class="home-section" style="padding-top: 10vh; padding-bottom: 10vh" id="skills">
      <Skills></Skills>
    </div>
    <div class="stripe-section" style="padding-top: 10vh; padding-bottom: 20vh" id="timeline">
      <Timeline></Timeline>
    </div>
    <div class="home-section" style="padding-top: 10vh; padding-bottom: 30vh" id="contact">
      <Contact></Contact>
    </div>
  </div>
</template>

<script>
import HomeSection from '@/components/HomeSection'
import Skills from '@/components/Skills'
import Timeline from '@/components/Timeline'
import Contact from '@/components/Contact'
import About from '@/components/About'

export default {
  name: 'Home',
  components: { Contact, Timeline, Skills, About, HomeSection }
}
</script>

<style scoped>
.home-section {
  background-image: url('../assets/svg/svgBackground.svg');
  background-size: cover
}
.stripe-section {
  background-image: url('../assets/svg/svgBackground2.svg');
  background-size: cover
}
</style>
