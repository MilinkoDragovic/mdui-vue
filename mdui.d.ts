import { DefineComponent, Plugin } from 'vue';


declare const Mdui: Exclude<Plugin['install'], undefined>;
export default Mdui;

export const MduiSample: DefineComponent<{}, {}, any>;
