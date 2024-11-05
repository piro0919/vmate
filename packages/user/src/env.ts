import { createEnv } from "@t3-oss/env-nextjs";

const env = createEnv({
  client: {},
  // eslint-disable-next-line write-good-comments/write-good-comments
  // you only need to destructure client variables:
  experimental__runtimeEnv: {},
  server: {},
});

export default env;
