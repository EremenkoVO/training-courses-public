<template>
	<v-container>
		<v-card>
			<v-container>
				<span v-if="isAdmin">Администратор</span>
				<span v-else>Пользователь</span>
				<v-text-field v-model="nameUser" label="Имя"></v-text-field>
				<v-text-field v-model="secondName" label="Фамилия"></v-text-field>
				<v-btn color="primary" @click="updateProfile">Сохранить</v-btn>
			</v-container>
		</v-card>
	</v-container>
</template>

<script>
export default {
	props: ["id"],
	data() {
		return {
			nameUser: "",
			secondName: "",
		};
	},
	computed: {
		loading() {
			return this.$store.getters.loading;
		},
		profile() {
			return this.$store.getters.profileById(this.id);
		},
		user() {
			return this.$store.getters.user.id;
		},
		isAdmin() {
			return this.profile?.admin === 1 ?? false;
		},
	},
	methods: {
		updateProfile() {
			this.$store.dispatch("updateProfile", {
				id: this.id,
				nameUser: this.nameUser,
				secondName: this.secondName,
			});
		},
		getProfile() {
			if (this.nameUser && this.secondName) {
				this.nameUser = this.profile.nameUser;
				this.secondName = this.profile.secondName;
			}
		},
	},
	mounted() {
		this.getProfile();
	},
	created() {
		this.$store.dispatch("fetchProfile");
	},
};
</script>

<style>
</style>