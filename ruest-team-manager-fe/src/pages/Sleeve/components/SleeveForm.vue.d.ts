import { type SaveSleeveRequest, type SleeveResponse } from '@/openapi';
type __VLS_Props = {
    initialData?: SleeveResponse | null;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    submit: (payload: SaveSleeveRequest) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onSubmit?: (payload: SaveSleeveRequest) => any;
}>, {
    initialData: SleeveResponse | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
