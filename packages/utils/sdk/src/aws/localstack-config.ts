import aws from 'aws-sdk';

export function loadLocalstackConfig(): void {
  const { LOCALSTACK_HOSTNAME } = process.env;

  if (!LOCALSTACK_HOSTNAME) {
    throw new Error('No Localstack hostname found.');
  }

  const ports = {
    dynamodb: 4569,
  }
  const config = Object.keys(ports).reduce((carry, service) => {
    return {
      ...carry,
      [service]: {
        endpoint: `http://${LOCALSTACK_HOSTNAME}:${ports[service]}`
      }
    }
  }, {});
  
  aws.config.update(config);
}
