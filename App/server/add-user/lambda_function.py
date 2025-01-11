import boto3
import json
import uuid

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')

# Specify the Users table
table_name = "Users"
users_table = dynamodb.Table(table_name)

def add_user(user_data):
    try:
        # Generate a unique uid
        user_data["uid"] = str(uuid.uuid4())

        # Validate required fields
        required_fields = ["name", "username", "email", "password", "type"]
        missing_fields = [field for field in required_fields if user_data.get(field) is None or user_data[field] == ""]
        if missing_fields:
            return {
                "statusCode": 400,
                "message": f"Missing required fields: {', '.join(missing_fields)}"
            }

        # Add the user to the DynamoDB table
        users_table.put_item(Item=user_data)

        # Return success response
        return {
            "statusCode": 201,
            "message": f"User added successfully. User ID: {user_data['uid']}"
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
        # Treat the event itself as the input JSON object
        user_data = event

        # Check if the input data is valid
        if not isinstance(user_data, dict):
            return {
                "statusCode": 400,
                "message": "Invalid input format. Expected JSON object."
            }

        # Call the add_user function
        response = add_user(user_data)
        
        return response
    except Exception as e:
        # Handle unexpected errors
        return {
            "statusCode": 500,
            "message": f"Unexpected error occurred: {str(e)}"
        }