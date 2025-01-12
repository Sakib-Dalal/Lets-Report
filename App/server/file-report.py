import json
import boto3
from decimal import Decimal
import time
import random
import string
from datetime import datetime

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
    reportId = f"{user_prefix}-{timestamp}-{random_suffix}"
    return reportId

def file_report(report_data):
    try:
        # Generate report ID
        report_data['reportId'] = generate_report_id(report_data.get('uid'))

        # Required fields
        required_fields = ["uid", "title", "description", "images", "latitude", "longitude", "address", "city", "state", "country"]
        missing_fields = [field for field in required_fields if not report_data.get(field)]
        if missing_fields:
            return {
                "statusCode": 400,
                "message": f"Missing required fields: {', '.join(missing_fields)}"
            }

        report_data['latitude'] = str(report_data['latitude'])
        report_data['longitude'] = str(report_data['longitude'])

        # Add metadata
        report_data['timestamp'] = datetime.utcnow().isoformat()
        report_data['status'] = "pending"  # Default status
        report_data['upvotes'] = 0  # Default upvotes

        # Store the report
        reports_table.put_item(Item=report_data)

        return {
            "statusCode": 200,
            "message": f"Report filed successfully. Report ID: {report_data['reportId']}"
        }

    except ValueError as e:
        return {
            "statusCode": 400,
            "message": str(e)
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "message": f"Internal server error: {str(e)}"
        }

def lambda_handler(event, context):
    try:
        # Parse the event JSON as the input data
        report_data = event

        # Check input format
        if not isinstance(report_data, dict):
            return {
                "statusCode": 400,
                "message": "Invalid input format. Expected JSON object."
            }

        # File the report
        response = file_report(report_data)
        
        return response
    except Exception as e:
        return {
            "statusCode": 500,
            "message": f"Unexpected error occurred: {str(e)}"
        }