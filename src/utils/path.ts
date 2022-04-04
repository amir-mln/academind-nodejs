import { dirname } from "path";

export default dirname(require.main!.filename).replace(/[\\\/]src$/, ""); // Maximilian uses 'process.mainModule.filename' which is deprecated
