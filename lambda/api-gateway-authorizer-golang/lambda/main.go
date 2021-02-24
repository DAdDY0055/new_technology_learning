package main

import (
	"context"
	"errors"
	"log"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/auth"
	"google.golang.org/api/option"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

// generatePolicy IAM policyを生成する
func generatePolicy(principalId, effect, resource string) events.APIGatewayCustomAuthorizerResponse {
	authResponse := events.APIGatewayCustomAuthorizerResponse{PrincipalID: principalId}

	if effect != "" && resource != "" {
		authResponse.PolicyDocument = events.APIGatewayCustomAuthorizerPolicy{
			Version: "2012-10-17",
			Statement: []events.IAMPolicyStatement{
				{
					Action:   []string{"execute-api:Invoke"},
					Effect:   effect,
					Resource: []string{resource},
				},
			},
		}
	}

	return authResponse
}

// verifyFirebaseJwtToken JwtTokenを検証
func verifyFirebaseJwtToken(idToken string) (*auth.Token, error) {
	ctx := context.Background()
	opt := option.WithCredentialsFile("./config/jwt-lambda-auth-firebase-adminsdk-3sa6r-c2e0d97f93.json") // コンソールからダウンロードしたjsonファイルのパスを指定
	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		return nil, err
	}

	client, err := app.Auth(ctx)
	if err != nil {
		return nil, err
	}

	token, err := client.VerifyIDToken(ctx, idToken)
	if err != nil {
		return nil, err
	}

	return token, err
}

func handleRequest(ctx context.Context, event events.APIGatewayCustomAuthorizerRequest) (events.APIGatewayCustomAuthorizerResponse, error) {
	// JWTトークンを検証する
	jwt := event.AuthorizationToken
  token, err := verifyFirebaseJwtToken(jwt)
	if err != nil {
		log.Fatalln("error decode jwt token: ", err)
	}

	// メールアドレスを取得
	email := token.Claims["email"]
	switch email {
	case "admin@example.com":
		return generatePolicy("admin", "Allow", event.MethodArn), nil
	case "user@example.com":
		return generatePolicy("user", "Allow", event.MethodArn), nil
	case "deny@example.com":
		return generatePolicy("deny", "Deny", event.MethodArn), nil
	case "unauthorized":
		return events.APIGatewayCustomAuthorizerResponse{}, errors.New("Unauthorized") // Return a 401 Unauthorized response
	default:
		return events.APIGatewayCustomAuthorizerResponse{}, errors.New("Error: Invalid token")
	}
}

func main() {
	lambda.Start(handleRequest)
}