import {DynamoDB} from 'aws-sdk';

const dynamoDbClient = new DynamoDB.DocumentClient();

export default dynamoDbClient;
