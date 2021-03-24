<template>
	<v-container>
		<v-card>
			<v-container>
				<v-text-field v-model="nameUser" label="Имя"></v-text-field>
				<v-text-field v-model="secondName" label="Фамилия"></v-text-field>
				<v-btn color="primary" @click="createProfile">Сохранить</v-btn>
			</v-container>
		</v-card>
	</v-container>
</template>

<script>
export default {
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
		user() {
			return this.$store.getters.user.id;
		},
	},
	methods: {
		createProfile() {
			const profile = {
				nameUser: this.nameUser,
				secondName: this.secondName,
				ownerId: this.user,
			};
			this.$store.dispatch("setProfile", profile);
			this.$router.push("/");
		},
	},
};
</script>

<style>
</style>