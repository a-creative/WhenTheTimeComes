<script lang="ts" setup>
	import PageT from '@/components/PageContainer.vue';
	import FormO from '@/components/Form.vue';
	import { FieldDef, FieldType, ActionDef, ActionType, ActionStyle } from '@/modules/@acreative/vue-form';

	import { ref, onMounted, onUpdated } from 'vue';
	import { useI18n } from 'vue-i18n';
	import { memberStore } from '@/stores/memberStore';
	import { useRouter } from 'vue-router';
	const mStore = memberStore();
	const router = useRouter();

	const getMemberId = () => {
		let memberId: number | null = null;
		if (router.currentRoute.value.params.id) {
			memberId = router.currentRoute.value.params.id as unknown as number;
		}
		return memberId;
	};

	const { t } = useI18n({ inheritLocale: true });

	enum ELoading {
		idle,
		loading,
		loaded,
		failed,
	}

	const loading = ref<ELoading>(ELoading.idle);

	const formInput = ref<MemberUpdatePostItem>({
		username: "'",
	});

	const submitMember = () => {
		loading.value = ELoading.loading;

		let memberId = getMemberId();

		if (memberId) {
			formInput.value.id = memberId;
		}

		mStore.saveMemberToPost(formInput.value, () => {
			updateList();
			formInput.value = {};
			router.push('/members/create-temporary');
		});
	};

	const title = ref<string>('');
	const submitLabel = ref<string>('');

	const formFields: FieldDef[] = [
		{
			id: 'username',
			type: FieldType.text,
			label: t('form.field.username.label'),
			placeHolder: t('form.field.username.placeholder'),
			required: true,
		},
		{
			id: 'name',
			type: FieldType.text,
			label: t('form.field.name.label'),
			placeHolder: t('form.field.name.placeholder'),
		},
		{
			id: 'pronouns',
			type: FieldType.text,
			label: t('form.field.pronouns.label'),
			placeHolder: t('form.field.pronouns.placeholder'),
		},
	];

	const formActions: ActionDef[] = [
		{
			id: 'submitMember',
			type: ActionType.submit,
			get label() {
				return submitLabel.value;
			},
			style: ActionStyle.primary,
			get loading() {
				return loading.value;
			},
		},
		{
			id: 'editMemberUpdate',
			type: ActionType.button,
			label: t('form.action.editMemberUpdate.label'),
			style: ActionStyle.default,
			get loading() {
				return loading.value;
			},
			linkTo: '/members/edit-update-post',
		},
	];

	const memberUpdatePostItems = ref<MemberUpdatePostItem[]>([]);

	const updateList = () => {
		mStore.getPostItems((items: IMemberUpdatePostItem[]) => {
			memberUpdatePostItems.value = items;
		});
	};

	const onMountedOrUpdated = () => {
		let memberId = getMemberId();

		if (memberId) {
			title.value = t('title.Edit');
			submitLabel.value = t('form.action.memberSubmit.update.label');
		} else {
			title.value = t('title.Create');
			submitLabel.value = t('form.action.memberSubmit.insert.label');

			formInput.value = {};
		}

		if (memberId) {
			mStore.getMemberFromPost(memberId, (member: MemberUpdatePostItem) => {
				formInput.value = member;
			});
		}

		updateList();
	};

	onUpdated(() => {
		onMountedOrUpdated();
	});

	onMounted(() => {
		onMountedOrUpdated();
	});
</script>
<template>
	<PageT :title="title" :subTitle="t('subTitle')">
		<div class="row">
			<div class="col-md-3">
				<FormO :fields="formFields" :actions="formActions" :data="formInput" :onSubmit="submitMember" :loading="loading ?? ELoading.idle" />
			</div>
			<div class="col-md-9">
				<h3>{{ t('Current members') }}</h3>
				<p v-if="memberUpdatePostItems.length == 0">
					{{ t('No members') }}
				</p>
				<div v-if="memberUpdatePostItems.length > 0" id="members">
					<div class="row fw-bold">
						<div class="col">{{ t('form.field.username.label') }}</div>
						<div class="col">{{ t('form.field.name.label') }}</div>
						<div class="col">{{ t('form.field.pronouns.label') }}</div>
					</div>
					<div class="row member" v-for="item in memberUpdatePostItems" :key="item.id">
						<div class="col username">
							<router-link :to="'/members/edit-temporary/' + item.id">{{ item.username }}</router-link>
						</div>
						<div class="col name">{{ item.name }}</div>
						<div class="col pronouns">{{ item.pronouns }}</div>
					</div>
				</div>
			</div>
		</div>
	</PageT>
</template>
<i18n lang="json">
{
	"da": {
		"Current members": "Aktuelle medlemmer",
		"No members": "Ingen medlemmer endnu.",
		"title": {
			"Edit": "Rediger medlem",
			"Create": "Opret medlem"
		},
		"subTitle": "Medlemmet oprettes midlertidigt til brug ved udsendelse af en medlemsopdatering til resten af medlemmerne.",
		"form": {
			"field": {
				"username": {
					"label": "Brugernavn",
					"placeholder": "Medlemmets brugernavn fra Facebook."
				},
				"name": {
					"label": "Navn",
					"placeholder": "Hvis det ikke angives, bruges brugernavnet i stedet."
				},
				"pronouns": {
					"label": "Pronominer",
					"placeholder": "De/dem, hun/hende, han/ham m.fl."
				}
			},
			"action": {
				"memberSubmit": {
					"insert": {
						"label": "Opret"
					},
					"update": {
						"label": "Gem"
					}
				},
				"editMemberUpdate": {
					"label": "Rediger indlæg"
				}
			}
		}
	},
	"en": {}
}
</i18n>
