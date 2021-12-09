const aws = require("aws-sdk");
const dynamoDb = new aws.DynamoDB();

const userTableName = process.env.UserTable;
exports.handler = async(event) => {
 
  if(!event?.request?.userAttributes?.sub){
    console.warn("User Not Registered");
    return;
  }
  const currentDateTime = new Date();
  const timestamp = currentDateTime.getTime(); 
  // Create a User Item on Register

  const userItem = {
    __typename:{S: "User"},
    _lastChangedAt: {N: timestamp.toString()},
    _version:{N: "1"},
    createdAt: {S: currentDateTime.toISOString()},
    updatedAt: {S: currentDateTime.toISOString()},
    id: {S: event.request.userAttributes.sub},
    name: {S: event.request.userAttributes.email},
  };

  // Save new user to DynamoDB

  const params = {
    Item:userItem,
    TableName:userTableName
  }
  
  try {
    await dynamoDb.putItem(params).promise()
    console.log("Created");
  } 
  catch (error) {
    console.error(error);
  }
};
