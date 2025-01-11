import boto3
from boto3.dynamodb.conditions import Attr

dynamodb = boto3.resource('dynamodb')

user_table = dynamodb.Table('Users')
reports_table = dynamodb.Table('Reports')

def update_status(uid, reportId, status):
    try:
        # check required fields
        required_fields = ['uid', 'reportId', 'status']
        missing_fields = [field for field in required_fields if not locals()[field]]
        if missing_fields:
            return {
                "statusCode": 400,
                "message": f"Missing required fields: {', '.join(missing_fields)}"
            }

        # Validate the status
        if status not in ['in progress', 'completed']:
            return {
                "statusCode": 400,
                "message": "Invalid status. Must be 'in progress' or 'completed'."
            }

        # Check if the user exists and its type
        user_response = user_table.scan(FilterExpression=Attr('uid').eq(uid))
        user = user_response.get('Items', [])
        if not user:
            return {
                "statusCode": 404,
                "message": "User not found"
            }
        elif user[0]['type'] != 'govt':
            return {
                "statusCode": 403,
                "message": "User is not authorized for this acition."
            }
        
        # Check if the report exists
        report = reports_table.get_item(Key={'reportId': reportId}).get('Item')
        if not report:
            return {
                "statusCode": 404,
                "message": "Report not found"
            } 
        
        # Update the report status
        reports_table.update_item(
            Key={'reportId': reportId},
            UpdateExpression="SET #status = :status",
            ExpressionAttributeNames={
                '#status': 'status'
            },
            ExpressionAttributeValues={
                ':status': status
            }
        )

        return {
            "statusCode": 200,
            "message": "Report status updated successfully"
        }
       
    except Exception as e:
        return {
            "statusCode": 500,
            "message": f"Unexpected error occurred: {str(e)}"
        }

def lambda_handler(event, context):

    try:
        uid = event.get('uid')
        reportId = event.get('reportId')
        status = event.get('status')

        response = update_status(uid, reportId, status)

        return response
    except Exception as e:
        return {
            "statusCode": 500,
            "message": f"Unexpected error occurred: {str(e)}"
        }