import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        // Improve build performance and output
        rollupOptions: {
            output: {
                // Manual chunks for better caching
                manualChunks: {
                    // Vendor chunks
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'animation': ['framer-motion', 'gsap', '@gsap/react'],
                    '3d-vendor': ['three', '@react-three/fiber', '@react-three/drei', '@splinetool/react-spline', '@splinetool/runtime'],
                    'ui-vendor': ['lucide-react', '@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge'],
                },
            },
        },
        // Optimize chunk size
        chunkSizeWarningLimit: 1000,
        // CSS code splitting
        cssCodeSplit: true,
        // Source maps for production debugging (optional, remove if not needed)
        sourcemap: false,
    },
    // Optimize dependencies
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
            'react-router-dom',
            'framer-motion',
            'gsap',
            'three',
        ],
    },
})
