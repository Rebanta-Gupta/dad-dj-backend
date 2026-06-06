import app from "./src/app.js";
import { config } from "./src/config/env.js";

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Dad DJ backend running on port ${PORT}`);
});