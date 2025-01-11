import json
import boto3
from decimal import Decimal
import time
import random
import string

# DynamoDB
dynamodb = boto3.resource('dynamodb')

# Specify the reports table
table_name = "Reports"
reports_table = dynamodb.Table(table_name)

def generate_report_id(user_id=None):
    # Get the current timestamp
    timestamp = int(time.time())
    
    # Shorten the user ID for traceability (optional, first 4 characters)
    user_prefix = user_id[:4].upper() if user_id else "GEN"  # Default to "GEN" if no user ID
    
    # Generate a random 4-character alphanumeric string
    random_suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    
    # Combine components into a report ID
    report_id = f"{user_prefix}-{timestamp}-{random_suffix}"
    return report_id

def file_report(report_data):
    try:
       
        # Genrate report id
        report_data['reportId'] = generate_report_id(report_data.get('uid'))

       #validating input
        required_fields = ["uid", "title", "description", "images", "coordinates", "address", "city", "state", "country"]
        missing_fields = [field for field in required_fields if report_data.get(field) is None or report_data[field] == ""]
        if missing_fields:
            return {
                "statusCode": 400,
                "message": f"Missing required fields: {', '.join(missing_fields)}"
            }
        
        # Convert float coordinates to Decimal
        if 'coordinates' in report_data:
            if 'latitude' in report_data['coordinates']:
                report_data['coordinates']['latitude'] = Decimal(str(report_data['coordinates']['latitude']))
            if 'longitude' in report_data['coordinates']:
                report_data['coordinates']['longitude'] = Decimal(str(report_data['coordinates']['longitude']))

        # Default upvotes
        report_data['upvotes'] = 0

        # Add the report to the DynamoDB table
        reports_table.put_item(Item=report_data)

        # Return success response
        return {
            "statusCode": 200,
            "message": f"Report filed successfully. Report ID: {report_data['reportId']}"
        }

    except Exception as e:
        # Handle exceptions
        return {
            "statusCode": 500,
            "message": f"Internal server error: {str(e)}"
        }

def lambda_handler(event, context):
    try:
        # Treat the event itself as the input JSON object
        report_data = event

        # Check if the input data is valid
        if not isinstance(report_data, dict):
            return {
                "statusCode": 400,
                "message": "Invalid input format. Expected JSON object."
            }

        # Call the file_report function
        response = file_report(report_data)
        
        return response
    except Exception as e:
        # Handle unexpected errors
        return {
            "statusCode": 500,
            "message": f"Unexpected error occurred: {str(e)}"
        }
