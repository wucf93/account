import {
    defineConfig,
    minimal2023Preset as preset,
} from '@vite-pwa/assets-generator/config'

console.log(preset)

export default defineConfig({
    transparent: {
        sizes: [64, 72, 96, 128, 144, 152, 192, 384, 512],
    },
    headLinkOptions: {
        preset: '2023',
    },
    preset: {
        ...preset,
        transparent: {
            ...preset.transparent,
            sizes: [64, 72, 96, 128, 144, 152, 192, 384, 512],
        }
    },
    images: ['public/favicon.svg'],
})
