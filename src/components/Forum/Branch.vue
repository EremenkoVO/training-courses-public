<template>
	<v-container>
		<v-btn bottom color="pink" dark fab fixed right @click="dialog = !dialog">
			<v-icon>mdi-plus</v-icon>
		</v-btn>

		<v-dialog v-model="dialog" width="800px">
			<v-card>
				<v-card-title> Отправить сообщиение </v-card-title>
				<v-container grid-list-sm>
					<v-layout row wrap>
						<v-flex xs12>
							<v-text-field
								v-model="message"
								prepend-icon="mdi-message"
								placeholder="Сообщение"
							></v-text-field>
						</v-flex>
					</v-layout>
				</v-container>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn text color="primary" @click="dialog = false">Отмена</v-btn>
					<v-btn text @click="createMessage()">Отправить</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<span v-if="isBranchMessages">
			<h1 class="title-forum-branch">{{ forumBranch.nameBranch }}</h1>
			<v-card id="message" class="mx-auto" v-for="b in messages" :key="b.id">
				<v-card-title>
					<v-avatar class="avatar" color="indigo" size="28"
						><v-icon dark>mdi-account-circle</v-icon></v-avatar
					>
					{{ nameUser(b.ownerId) }}
				</v-card-title>
				<v-card-subtitle>{{ b.dateCreate }}</v-card-subtitle>
				<v-card-text id="textMessage">{{ b.message }}</v-card-text>
			</v-card>
		</span>
		<div class="title-forum-branch" v-else-if="forumBranch">
			<h1>{{ forumBranch.nameBranch }}</h1>
			<span>Сообщений нет</span>
		</div>
	</v-container>
</template>

<script>
import dayjs from "dayjs";
dayjs.locale("ru");

export default {
	props: ["id"],
	data() {
		return {
			dialog: false,
			message: null,
			messages: [],
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
		forumBranch() {
			const id = this.id;
			return this.$store.getters.forumBranchId(id);
		},
		allBranchMessages() {
			return this.$store.getters.branch;
		},
		isBranchMessages() {
			return this.allBranchMessages.length > 0 && this.forumBranch;
		},
	},
	methods: {
		createMessage() {
			const message = {
				message: this.message,
				dateCreate: dayjs().format("DD/MM/YYYY"),
				idForumBranch: this.id,
			};

			this.$store.dispatch("createMessage", message);
			this.branchMessages();
			this.dialog = false;
		},

		nameUser(ownerId) {
			var profile = this.profile;
			var length = profile.length;

			for (var i = 0; i < length; i++) {
				if (profile[i].ownerId === ownerId) {
					return profile[i].nameUser + " " + profile[i].secondName;
				}
			}
		},

		branchMessages() {
			const id = this.id;
			var allBranchMessages = this.allBranchMessages;
			var length = allBranchMessages.length;

			this.messages = [];

			for (var i = 0; i < length; i++) {
				if (allBranchMessages[i].idForumBranch === id) {
					this.messages.push(allBranchMessages[i]);
				}
			}
		},
	},
	mounted() {
		this.branchMessages();
	},
	created() {
		this.$store.dispatch("fetchProfile");
		this.$store.dispatch("fetchForumBranch");
		this.$store.dispatch("fetchBranch");
	},
};
</script>

<style scoped>
.title-forum-branch {
	text-align: center;
}

.avatar {
	margin-right: 10px;
}

#message {
	margin: 5px;
}

#textMessage {
	color: black;
}
</style>