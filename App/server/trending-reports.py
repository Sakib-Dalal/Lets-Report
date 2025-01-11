import boto3
import json
from boto3.dynamodb.conditions import Attr
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
reports_table = dynamodb.Table('Reports')

def convert_decimal(obj):
    """Recursively convert Decimal types to float or int."""
    if isinstance(obj, Decimal):
        if obj % 1 == 0:
            return int(obj)  # Convert to int if it has no fractional part
        else:
            return float(obj)  # Otherwise, convert to float
    elif isinstance(obj, list):
        return [convert_decimal(i) for i in obj]
    elif isinstance(obj, dict):
        return {k: convert_decimal(v) for k, v in obj.items()}
    else:
        return obj

def fetch_data(uid=None, city=None, state=None, country=None):
    # Build the filter expressions dynamically
    filter_expression = None
    
    if city:
        filter_expression = Attr('city').eq(city)
    if state:
        filter_expression = filter_expression & Attr('state').eq(state) if filter_expression else Attr('state').eq(state)
    if country:
        filter_expression = filter_expression & Attr('country').eq(country) if filter_expression else Attr('country').eq(country)
    
    # Scan the table with filters if provided
    if filter_expression:
        reports_data = reports_table.scan(FilterExpression=filter_expression)
    else:
        reports_data = reports_table.scan()  # Fetch all records if no filter provided

    items = reports_data.get('Items', [])

    # Check `upvotedBy` for each item and add the `upvoted` field if `uid` is provided
    for item in items:
        if uid and 'upvotedBy' in item and isinstance(item['upvotedBy'], list):
            item['upvoted'] = uid in item['upvotedBy']
        else:
            item['upvoted'] = False

    # Convert all Decimal objects to float/int for proper serialization
    items = [convert_decimal(item) for item in items]

    # Sort items by the upvoted count (descending order)
    items.sort(key=lambda x: len(x.get('upvotedBy', [])), reverse=True)

    return items

def lambda_handler(event, context):
    try:
        # Parse the event as input
        uid = event.get('uid')
        city = event.get('city')
        state = event.get('state')
        country = event.get('country')


        # Fetch data based on the provided parameters
        response_data = fetch_data(uid, city, state, country)

        return {
            'statusCode': 200,
            'reports': response_data
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'error': str(e)
        }
