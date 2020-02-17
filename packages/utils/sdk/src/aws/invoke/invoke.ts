import { addStageSuffix } from '../../utils';
import { getLambda } from '../repository';
import { InvokeFns } from './types';

export async function invoke(functionName: InvokeFns, payload?: string | object): Promise<unknown> {
  const lambda = getLambda();
  const response = await lambda
    .invoke({
      FunctionName: addStageSuffix(functionName),
      InvocationType: 'RequestResponse',
      LogType: 'None',
      Payload: typeof payload === 'string' ? payload : JSON.stringify(payload),
    })
    .promise();

  return response;
}
