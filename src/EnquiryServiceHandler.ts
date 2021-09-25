import { APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda"
import {EnquiryService} from "./EnquiryService";

exports.main = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(`consuming ${JSON.stringify(event)}`)

    if(event.httpMethod === 'POST' && event.body){

    } else{
        return {
            statusCode: 400,
            body: `Invalid request (method: ${event.httpMethod}, has body: ${!!event.body})`
        }
    }

    try {
        const reqBody = JSON.parse(event.body)
        const respEntity = new EnquiryService().processEnquiry(reqBody)
        return {
            statusCode: 200,
            body: JSON.stringify(respEntity)
        }
    } catch (e) {
        return {
            statusCode: 500,
            body: `Failed to process enquiry: ${e.message}`
        }
    }
}