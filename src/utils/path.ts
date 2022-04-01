import { dirname } from "path";

// @ts-ignore
export default dirname(require.main.filename); // Maximilian uses 'process.mainModule.filename' which is deprecated
