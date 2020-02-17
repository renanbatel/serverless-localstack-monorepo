const { ENV_STAGE } = process.env;

export function addStageSuffix(value: string): string {
  return `${value}-${ENV_STAGE}`;
}
