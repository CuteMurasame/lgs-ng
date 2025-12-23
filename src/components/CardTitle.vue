<script setup lang="ts">
import { computed, type Component, type CSSProperties } from 'vue';
import { NIcon, NCard, NH1, NText } from 'naive-ui';
import { uiThemeKey, type UiThemeVars } from '@/styles/theme/themeKeys.ts';
import { inject } from 'vue';

const themeVars: UiThemeVars = inject(uiThemeKey)!;

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	icon: {
		type: Object as () => Component,
		default: null,
	},
	backgroundColor: {
		type: String,
		default: null,
	},
	iconColor: {
		type: String,
		default: null,
	}
})

const effectiveIconColor = computed(() => {
	return props.iconColor || themeVars.value.primaryColor;
});
</script>

<template>
	<div class="macos-card-title">
		<div class="title-content">
			<div v-if="icon" class="title-icon-wrapper">
				<n-icon :component="icon" :color="effectiveIconColor" size="28" />
			</div>
			<div class="title-text">
				<h1 class="main-title">{{ title }}</h1>
				<p v-if="$slots.default" class="subtitle">
					<slot />
				</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
.macos-card-title {
	background: rgba(255, 255, 255, 0.72);
	backdrop-filter: blur(20px) saturate(180%);
	-webkit-backdrop-filter: blur(20px) saturate(180%);
	border: 1px solid rgba(255, 255, 255, 0.5);
	border-radius: 16px;
	padding: 24px 32px;
	box-shadow:
		0 0 0 1px rgba(0, 0, 0, 0.03),
		0 2px 4px rgba(0, 0, 0, 0.02),
		0 8px 24px rgba(0, 0, 0, 0.06);
}

.title-content {
	display: flex;
	align-items: center;
	gap: 16px;
}

.title-icon-wrapper {
	width: 52px;
	height: 52px;
	border-radius: 14px;
	background: linear-gradient(135deg, rgba(0, 122, 255, 0.15) 0%, rgba(90, 200, 250, 0.1) 100%);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.title-text {
	flex: 1;
}

.main-title {
	margin: 0;
	font-size: 28px;
	font-weight: 700;
	color: #1d1d1f;
	letter-spacing: -0.02em;
	line-height: 1.2;
}

.subtitle {
	margin: 6px 0 0;
	font-size: 14px;
	color: #86868b;
	font-weight: 400;
	letter-spacing: 0.01em;
}
</style>