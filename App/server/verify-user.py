import boto3
import json

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')

# Specify the Users table
table_name = "Users"
users_table = dynamodb.Table(table_name)

def verify_user(user_info):
    try:
        # Validate required fields
        required_fields = ["email", "password", "type"]
        missing_fields = [field for field in required_fields if user_info.get(field) is None or user_info[field] == ""]
        if missing_fields:
            return {
                "statusCode": 400,
                "message": f"Missing required fields: {', '.join(missing_fields)}"
            }
        
        # Query DynamoDB table to check if user exists
        response = users_table.get_item(Key={'email': user_info['email'], 'type': user_info['type']})
        
        # Check if user is found
        if 'Item' not in response:
            return {
                "statusCode": 404,
                "message": "User not found"
            }
        
        # Validate password (this can be expanded to match your password validation method)
        db_user = response['Item']
        if (db_user['password'] != user_info['password']) and (db_user['type'] != user_info['type']):
            return {
                "statusCode": 401,
                "message": "Invalid password"
            }
        
        # If user exists and password is valid, return user details
        return {
            "statusCode": 200,
            "message": "User verified",
            "uid": db_user.get('uid'),
            "username": db_user.get('username'),
            "email": db_user.get('email'),
            "type": db_user.get('type')
        }
    except Exception as e:
        # Handle exceptions
        return {
            "statusCode": 500,
            "message": f"Internal server error: {str(e)}"
        }

# Lambda handler function
def lambda_handler(event, context):
    try:
        # Treat the event itself as the input
        user_info = event

        # Check if the input data is valid
        if not isinstance(user_info, dict):
            return {
                "statusCode": 400,
                "message": "Invalid input format. Expected JSON object."
            }

        # Call the verify_user function
        response = verify_user(user_info)

        return response
    except Exception as e:
        # Handle unexpected errors
        return {
            "statusCode": 500,
            "message": f"Unexpected error occurred: {str(e)}"
        }