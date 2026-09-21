export default {
  extends: ["stylelint-config-standard"],
  rules: {
    "declaration-no-important": true,
    "block-no-empty": true,
    "selector-max-id": 0,
    "selector-class-pattern":
      "^[a-z][a-z0-9-]*(?:__[a-z0-9-]+)?(?:--[a-z0-9-]+)?$",
  },
};
