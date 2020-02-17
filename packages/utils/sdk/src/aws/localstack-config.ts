import aws from 'aws-sdk';
import { ConfigurationOptions } from 'aws-sdk/lib/config';

export function loadLocalstackConfig(): void {
  const { LOCALSTACK_HOSTNAME, AWS_REGION = 'us-east-1' } = process.env;

  if (!LOCALSTACK_HOSTNAME) {
    throw new Error('No Localstack hostname found.');
  }

  const ports = {
    dynamodb: 4569,
    sqs: 4576,
    lambda: 4574,
  };
  const config: ConfigurationOptions = Object.keys(ports).reduce((carry, service) => {
    return {
      ...carry,
      [service]: {
        endpoint: `http://${LOCALSTACK_HOSTNAME}:${ports[service]}`,
      },
    };
  }, {});

  config.region = AWS_REGION;

  aws.config.update(config);
}
