import json
from datetime import datetime
from collections import Counter
import boto3
from boto3.dynamodb.conditions import Attr

# Initialize DynamoDB
dynamodb = boto3.resource('dynamodb')
reports_table = dynamodb.Table('Reports')

def lambda_handler(event, context):
    try:
        # Total reports
        total_reports = reports_table.scan().get('Count', 0)
        
        # Total reports in progress
        total_reports_in_progress = reports_table.scan(
            FilterExpression=Attr('status').eq('in progress')
        ).get('Count', 0)
        
        # Total completed reports
        total_reports_completed = reports_table.scan(
            FilterExpression=Attr('status').eq('completed')
        ).get('Count', 0)
        
        # Total reports reported today
        today = datetime.now().strftime("%Y-%m-%d")
        total_reports_today = reports_table.scan(
            FilterExpression=Attr('timestamp').contains(today)
        ).get('Count', 0)
        
        # State-wise report count for pending or in-progress statuses
        statewise_reports = reports_table.scan(
            FilterExpression=Attr('status').is_in(['pending', 'in progress']),
            ProjectionExpression='#state',
            ExpressionAttributeNames={
                '#state': 'state'  # Alias for reserved keyword
            }
        ).get('Items', [])
        
        state_counts = Counter([item['state'] for item in statewise_reports if 'state' in item])
        
        # State with the highest number of reports
        highest_state, highest_count = max(state_counts.items(), key=lambda x: x[1], default=(None, 0))
        
        # JSON response
        return {
            "statusCode": 200,
            "total_reports": total_reports,
            "total_reports_in_progress": total_reports_in_progress,
            "total_reports_completed": total_reports_completed,
            "total_reports_today": total_reports_today,
            "statewise_report_count": state_counts,
            "highest_reported_state": {
                "state": highest_state,
                "count": highest_count
            }
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "message": f"Unexpected error occurred: {str(e)}"
        }
