import { Duration } from "aws-cdk-lib";
import { Runtime, Tracing } from "aws-cdk-lib/aws-lambda";


export const defaultFunctionProps: DefaultFunctionProps = {
    runtime: Runtime.NODEJS_20_X,
    timeout: Duration.seconds(60),
    memorySize: 256,
    tracing: Tracing.ACTIVE
};

export interface DefaultFunctionProps {
    runtime: Runtime;
    timeout: Duration;
    memorySize: number;
    tracing: Tracing;
}