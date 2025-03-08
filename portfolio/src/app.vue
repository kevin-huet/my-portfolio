<template>
  <v-app>
    <app-bar @change-page-event="changePage" />

    <v-main style="background-color: #001220">
      <FadeInOut :duration="250" mode="out-in">
        <component
            :isAuthenticated="authStore.isAuthenticated"
            @previous-page="changePage"
            @next-page="changePage"
            :is="dynamicComponent"
        ></component>
      </FadeInOut>
    </v-main>

    <Footer @changePage="changePage" />

    <v-dialog v-model="loginModal" max-width="500">
      <v-card>
        <v-card-title class="headline">Connexion</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="login">
            <v-text-field
                v-model="username"
                label="Nom d'utilisateur"
                outlined
                required
            ></v-text-field>
            <v-text-field
                v-model="password"
                label="Mot de passe"
                type="password"
                outlined
                required
            ></v-text-field>
            <v-btn type="submit" color="primary">Se connecter</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import Footer from "@/components/ui/footer.vue";
import Contact from "@/components/section/contact.vue";
import Timeline from "@/components/section/timeline.vue";
import Skills from "@/components/section/skills.vue";
import About from "@/components/section/about.vue";
import Home from "@/components/section/home.vue";
import { FadeInOut } from "vue3-transitions";
import AppBar from "@/components/ui/app-bar.vue";
import {useAuthStore} from "@/stores/auth";
import Projects from "@/components/section/projects.vue";
export default {
  name: "App",
  components: {
    AppBar,
    FadeInOut,
    Footer,
    Contact,
    Timeline,
    Skills,
    About,
    Home,
    Projects,
  },
  setup() {
    // states
    const dynamicComponent = ref("home");
    const loginModal = ref(false);
    const username = ref("");
    const password = ref("");
    const authStore = useAuthStore();

    // methods
    const changePage = (value: any) => {
      dynamicComponent.value = value;
      window.scrollTo(0, 0);
    };

    const login = () => {
      console.log("Tentative de connexion avec :", username.value, password.value);
      authStore.login(username.value, password.value).then(() => {
        loginModal.value = false;
      }).catch(() => {});
    };

    const handleKeyDown = (event: any) => {
      if (event.ctrlKey && event.shiftKey && event.key === "L") {
        loginModal.value = true;
      }
    };

    // Lifecycle hooks
    onMounted(async () => {
      await authStore.checkAuth();
      console.log(authStore.isAuthenticated);
      window.addEventListener("keydown", handleKeyDown);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("keydown", handleKeyDown);
    });

    return {
      dynamicComponent,
      loginModal,
      username,
      password,
      changePage,
      login,
      authStore,
    };
  },
};
</script>

<style lang="css">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: #001220 !important;
  height: 100% !important;
}

@font-face {
  font-family: "Bang";
  src: local("Bang"), url("/assets/fonts/FreshLychee.otf");
}

.space-item {
  margin-right: 1em;
}

.home-section {
  background-image: url("/assets/svg/svgBackground.svg");
  background-size: cover;
}

.stripe-section {
  background-image: url("/assets/svg/svgBackground2.svg");
  background-size: cover;
}
</style>