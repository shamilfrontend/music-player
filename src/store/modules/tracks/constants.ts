import { nanoid } from 'nanoid';

import type { Track } from './types';

export const tracks: Track[] = [
	{
		id: nanoid(),
		imageUrl: '/albums/mezhdu_nami_vojjna.jpeg',
		name: 'Между нами война',
		author: 'Султан Лагучев',
		favorite: true,
		trackUrl: '/tracks/sultan_laguchev_mezhdu_nami_vojjna.mp3'
	},
	{
		id: nanoid(),
		imageUrl: '/albums/clean_bandit_demi_lovato_solo.jpg',
		name: 'Solo',
		author: 'Clean Bandit feat Demi Lovato',
		favorite: true,
		trackUrl: '/tracks/clean_bandit_demi_lovato_solo.mp3'
	},
	{
		id: nanoid(),
		imageUrl: '/albums/timur_temirov_nebo_nad_zemljojj.jpg',
		name: 'Небо над землёй',
		author: 'Тимур Темиров',
		favorite: false,
		trackUrl: '/tracks/timur_temirov_nebo_nad_zemljojj.mp3'
	},
	{
		id: nanoid(),
		imageUrl: '/albums/led_zepelin_the_emigrant_song.jpg',
		name: 'The Emigrant Song',
		author: 'led Zepelin',
		favorite: false,
		trackUrl: '/tracks/led_zepelin_the_emigrant_song.mp3'
	},
	{
		id: nanoid(),
		imageUrl: '/albums/kansas_carry_on_wayward_son.jpg',
		name: 'Carry on Wayward Son',
		author: 'Kansas',
		favorite: true,
		trackUrl: '/tracks/kansas_carry_on_wayward_son.mp3'
	},
	{
		id: nanoid(),
		imageUrl: '/albums/kleinod_another_ight.jpg',
		name: 'Another Fight',
		author: 'KLEINOD',
		favorite: false,
		trackUrl: '/tracks/kleinod_another_ight.mp3'
	},
	{
		id: nanoid(),
		imageUrl: '/albums/enrique_iglesias_lil_wayne_push.jpg',
		name: 'Push',
		author: 'Enrique Iglesias feat Lil Wayne',
		favorite: false,
		trackUrl: '/tracks/enrique_iglesias_lil_wayne_push.mp3'
	},
	{
		id: nanoid(),
		imageUrl: '/albums/the_runaways_cherry_bomb.jpg',
		name: 'Cherry Bomb',
		author: 'The Runaways',
		favorite: false,
		trackUrl: '/tracks/the_runaways_cherry_bomb.mp3'
	},
	{
		id: nanoid(),
		imageUrl: '/albums/k_maro_femme_like_u.jpg',
		name: 'Femme Like U',
		author: 'K-Maro',
		favorite: false,
		trackUrl: '/tracks/k-maro-femme-like-u.mp3'
	},
	{
		id: nanoid(),
		imageUrl: '/albums/lil_wayne_ty_dolla_ign_xxxtentacion_scared_of_the_dark.jpg',
		name: 'Scared of the Dark',
		author: 'Lil Wayne, Ty Dolla $ign, Xxxtentacion',
		favorite: false,
		trackUrl: '/tracks/lil_wayne_ty_dolla_ign_xxxtentacion_scared_of_the_dark.mp3'
	},
	{
		id: nanoid(),
		imageUrl: '/albums/default.jpeg',
		name: 'Мой Океан Это Ты, Куда Приводят Мечты',
		author: 'LOne feat. Фидель',
		favorite: true,
		trackUrl: '/tracks/LOne_feat_idel_-_Mojj_Okean_JEto_Ty_Kuda_Privodyat_Mechty_61206354.mp3'
	},
	{
		id: nanoid(),
		imageUrl: '/albums/gorkijj_vkus.jpeg',
		name: 'Горький вкус',
		author: 'Султан Лагучев',
		favorite: true,
		trackUrl: '/tracks/sultan_Laguchev_-_gorkijj_vkus.mp3'
	}
];
