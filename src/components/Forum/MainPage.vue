<template>
	<v-container>
		<h1 style="text-align: center">Форум</h1>

		<v-btn bottom color="pink" dark fab fixed right @click="dialog = !dialog">
			<v-icon>mdi-plus</v-icon>
		</v-btn>
		<v-dialog v-model="dialog" width="800px">
			<v-card>
				<v-card-title> Создание ветки темы </v-card-title>
				<v-container grid-list-sm>
					<v-layout row wrap>
						<v-flex xs12>
							<v-text-field
								v-model="nameBranch"
								prepend-icon="mdi-source-branch"
								placeholder="Навзание ветки"
							></v-text-field>
						</v-flex>
					</v-layout>
				</v-container>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn text @click="dialog = false">Отмена</v-btn>
					<v-btn text @click="createForumBranch()">Сохранить</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-card
			id="forumBranch"
			class="mx-auto"
			v-for="f in forumBranchs"
			:key="f.id"
		>
			<v-card-title>
				<v-avatar class="avatar" color="indigo" size="28"
					><v-icon dark="">mdi-source-branch</v-icon></v-avatar
				>
				{{ f.nameBranch }}
			</v-card-title>

			<v-card-subtitle class="pb-0">{{ f.dateCreate }}</v-card-subtitle>

			<v-card-actions>
				<v-btn color="orange" text :to="'/branch/' + f.id"> Открыть </v-btn>
			</v-card-actions>
		</v-card>
	</v-container>
</template>

<script>
import dayjs from "dayjs";
dayjs.locale("ru");

export default {
	data() {
		return {
			dialog: false,
			nameBranch: null,
			date: null,
		};
	},
	computed: {
		loading() {
			return this.$store.getters.loading;
		},
		user() {
			return this.$store.getters.user.id;
		},
		profile() {
			return this.$store.getters.profiles;
		},
		forumBranchs() {
			return this.$store.getters.forumBranchs;
		},
	},
	methods: {
		createForumBranch() {
			const forumBranch = {
				nameBranch: this.nameBranch,
				dateCreate: dayjs().format("DD/MM/YYYY"),
				ownerId: this.user,
			};

			this.$store.dispatch("createforumBranch", forumBranch);
			this.dialog = false;
		},
	},
	created() {
		this.$store.dispatch("fetchProfile");
		this.$store.dispatch("fetchForumBranch");
	},
};
</script>

<style scoped>
#forumBranch {
	margin-bottom: 5px;
}

.avatar {
	margin-right: 10px;
}
</style>