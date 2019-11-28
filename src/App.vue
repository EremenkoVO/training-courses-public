<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in articles">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex
              xs6
              class="text-xs-center"
            >
              <a
                href="#!"
                class="body-2 black--text"
              >EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.nameArticle }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
            :to="'/article/' + item.id"
          >
            <v-list-item-action>
              <v-icon>mdi-file</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.nameArticle }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-toolbar-title>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span>Страницы истории на уроках матемактики</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="isUserLoggedIn">
        <v-btn icon v-for="profile in profiles" :key="profile.id" :to="profile.url">
          <v-icon>{{profile.icon}}</v-icon>
        </v-btn>
        <v-btn icon @click="onLogout()">
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </div>
      <div v-if="!isUserLoggedIn">
        <v-btn icon v-for="i in login" :key="i.id" :to="i.url">
          <v-icon>{{i.icon}}</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>

    <template v-if="error">
        <v-snackbar
          :timeout="5000"
          :multi-line="true"
          @input="closeError"
          color="error"
          :value="true"
          >
            {{ error }}
          <v-btn
            color="dark"
            text
            @click.native="closeError"
          >
            Закрыть
          </v-btn>
        </v-snackbar>
      </template>

      <template v-if="success">
        <v-snackbar
          :timeout="5000"
          :multi-line="true"
          @input="closeSuccess"
          color="primary"
          :value="true"
          >
            {{ success }}
          <v-btn
            color="dark"
            text
            @click.native="closeSuccess"
          >
            Закрыть
          </v-btn>
        </v-snackbar>
      </template>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  created() {
    this.$store.dispatch('fetchArticles');
  }, 
  data: () => ({
    drawer: null,
    items: [
      {icon: 'mdi-home', text: 'Главная страница', url: '/'},
      {icon: 'mdi-file', text: 'Натуральные числа', url: '/test'},
      {icon: 'mdi-file', text: 'Обыкновенные дроби', url: ''},
      {icon: 'mdi-file', text: 'Десятичные дроби', url: ''},
      {icon: 'mdi-file', text: 'Отношения', url: ''},
      {icon: 'mdi-file', text: 'Пропорции', url: ''},
      {icon: 'mdi-file', text: 'Проценты', url: ''},
      {icon: 'mdi-file', text: 'Уравнения', url: ''},
      {icon: 'mdi-file', text: 'Периметр', url: ''},
      {icon: 'mdi-file', text: 'Площади фигуры', url: ''},
      {icon: 'mdi-file', text: 'Объёмы', url: ''},
      {icon: 'mdi-file', text: 'Задачи на движения', url: ''},
      {icon: 'mdi-file', text: 'Тесты', url: ''}
    ],
    login: [
      {icon: 'mdi-account', id: '1', url: '/login'},
      {icon: 'mdi-lock', id: '2', url: '/registration'}
    ]
  }),
  computed: {
      error () {
        return this.$store.getters.error;
      },
      success () {
        return this.$store.getters.success;
      },
      isUserLoggedIn () {
        return this.$store.getters.user.id != null;
      },
      user () {
        return this.$store.getters.user.id;
      },
      articles () {
        return this.$store.getters.articles
      },
      profiles () { 
        return [
          {icon: 'mdi-forum', id: '5', url: '/forum', text: 'Форум'},
          {icon: 'mdi-account-badge-horizontal-outline', id: '3', url: '/profile/' + this.user},
          {icon: 'mdi-wrench', id: '4', url: '/acticles'}
        ]
      }
  },
  methods: {
      goBack () {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
      },
      onLogout () {
        this.$store.dispatch('logoutUser');
      },
      closeError () {
        this.$store.dispatch('clearError');
      },
      closeSuccess () {
        this.$store.dispatch('clearSuccess');
      }
  }
};
</script>
