export function resolveQueueUrl(queueUrl: string): string {
  const { ENV_STAGE } = process.env;

  if (ENV_STAGE === 'local' && queueUrl.startsWith('http://localhost')) {
    const { LOCALSTACK_HOSTNAME } = process.env;

    if (!LOCALSTACK_HOSTNAME) {
      throw new Error('No Localstack hostname found.');
    }

    return queueUrl.replace('localhost', LOCALSTACK_HOSTNAME);
  }

  return queueUrl;
}
