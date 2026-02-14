// /src/shared/featureFlags.ts

export const FEATURE_FLAGS = {
// Nuevas features en desarrollo
NEW_PRODUCT_VARIANTS: process.env.VITE_FF_PRODUCT_VARIANTS === 'true',
ADVANCED_SEARCH: process.env.VITE_FF_ADVANCED_SEARCH === 'true',
REAL_TIME_INVENTORY: process.env.VITE_FF_REALTIME_INVENTORY === 'true',

// Features en beta
BULK_IMPORT: process.env.VITE_FF_BULK_IMPORT === 'true',
} as const;

// Helper para verificar flags
export function isFeatureEnabled(flag: keyof typeof FEATURE_FLAGS): boolean {
return FEATURE_FLAGS[flag];
}
