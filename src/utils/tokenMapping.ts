export const tokenMapping = {
  background: {
    subtle: ["--fds-semantic-background-subtle"],
    default: ["--fds-semantic-background-default"],
  },
  component: {
    normal: [
      "--fds-semantic-surface-action-first-subtle",
      "--fds-semantic-surface-action-first-no_fill",
    ],
    hover: [
      "--fds-semantic-surface-info-subtle-hover",
      "--fds-semantic-surface-action-first-subtle-hover",
      "--fds-semantic-surface-action-first-no_fill-hover",
    ],
    active: ["--fds-semantic-surface-action-first-subtle-active"],
  },
  border: {
    subtle: [
      "--fds-semantic-border-neutral-subtle",
      "--fds-semantic-border-action-first-subtle",
    ],
    default: ["--fds-semantic-border-action-first-subtle-hover"],
    strong: [
      "--fds-semantic-border-neutral-default",
      "--fds-semantic-border-action-first-default",
    ],
  },
  solids: {
    normal: [
      "--fds-radio-border-color",
      "--fds-checkbox-border-color",
      "--fds-semantic-border-input-hover",
      "--fds-semantic-border-action-default",
      "--fds-semantic-surface-success-default",
      "--fds-semantic-surface-action-first-default",
    ],
    hover: [
      "--fds-semantic-surface-success-hover",
      "--fds-semantic-surface-action-first-hover",
    ],
    active: ["--fds-semantic-surface-action-first-active"],
  },
  text: {
    subtle: [
      "--fds-semantic-text-neutral-subtle",
      "--fds-semantic-text-action-hover",
      "--fds-semantic-text-action-first-hover",
    ],
    default: [
      "--fds-semantic-text-action-default",
      "--fds-semantic-text-neutral-default",
      "--fds-semantic-text-action-first-default",
    ],
  },
};
