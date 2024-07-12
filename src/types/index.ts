import type { ComponentPublicInstance, UnwrapRef } from 'vue';

export type Nullable<T> = T | null;
export type Nillable<T> = T | null | undefined;
export type Optional<T> = T | undefined;
export type UnwrappedInstance<T> = Nullable<
    ComponentPublicInstance<UnwrapRef<T>>
>;
export type Enumerable<T> = T | T[];

export type ClassValue =
    | Enumerable<string>
    | Enumerable<Record<string, boolean>
>;

export type DeepIndexSignature<O extends object> = {
    [P in keyof O]: O[P] extends object ? DeepIndexSignature<O[P]> : O[P];
};
