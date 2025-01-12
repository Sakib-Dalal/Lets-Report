import json
import boto3

# Initialize a DynamoDB client
dynamodb = boto3.client('dynamodb')

# Specify the table name
table_name = "Reports"

def upvote_report(uid, report_id):
    try:
        # Check if the report exists
        response = dynamodb.get_item(
            TableName=table_name,
            Key={
                'reportId': {'S': report_id}
            }
        )

        if 'Item' not in response:
            return {
                "statusCode": 404,
                "message": "Report not found."
            }

        # Fetch the current upvotes count and the upvotedBy list
        current_upvotes = int(response['Item'].get('upvotes', {'N': '0'})['N'])
        upvoted_by = response['Item'].get('upvotedBy', {'L': []})['L']

        # Check if the user has already upvoted
        if any(item['S'] == uid for item in upvoted_by):
            return {
                "statusCode": 400,
                "message": "User has already upvoted this report."
            }

        # Increment the upvotes count and append the user to the upvotedBy list
        new_upvotes = current_upvotes + 1
        upvoted_by.append({'S': uid})

        # Update the upvotes count and upvotedBy list in the DynamoDB table
        dynamodb.update_item(
            TableName=table_name,
            Key={
                'reportId': {'S': report_id}
            },
            UpdateExpression='SET upvotes = :upvotes, upvotedBy = :upvotedBy',
            ExpressionAttributeValues={
                ':upvotes': {'N': str(new_upvotes)},
                ':upvotedBy': {'L': upvoted_by}
            }
        )

        return {
            "statusCode": 200,
            "message": "Report upvoted successfully."
        }

    except Exception as e:
        # Handle exceptions
        return {
            "statusCode": 500,
            "message": f"Internal server error: {str(e)}"
        }

def lambda_handler(event, context):
    try:
        uid = event.get('uid')
        report_id = event.get('reportId')
        
        # Check if uid and reportId are provided
        if not uid or not report_id:
            return {
                "statusCode": 400,
                "message": "Both uid and reportId must be provided."
            }

        response = upvote_report(uid, report_id)

        return response
    except Exception as e:
        # Handle unexpected errors
        return {
            "statusCode": 500,
            "message": f"Unexpected error occurred: {str(e)}"
        }
