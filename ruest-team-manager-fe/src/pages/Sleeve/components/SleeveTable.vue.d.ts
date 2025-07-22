import type { SleeveResponse } from '@/openapi';
type __VLS_Props = {
    sleeves: SleeveResponse[] | [];
    searchValue: number;
    isAdmin: boolean;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    delete: (value: number) => any;
    search: (value: number) => any;
    redirect: () => any;
    edit: (value: number) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onDelete?: (value: number) => any;
    onSearch?: (value: number) => any;
    onRedirect?: () => any;
    onEdit?: (value: number) => any;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
