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
	"github.com/k0kubun/pp"
)

// generatePolicy IAM policyを生成する
func generatePolicy(principalId, effect string, resources []string) events.APIGatewayCustomAuthorizerResponse {
	authResponse := events.APIGatewayCustomAuthorizerResponse{PrincipalID: principalId}

	if effect != "" && len(resources) > 0 {
		authResponse.PolicyDocument = events.APIGatewayCustomAuthorizerPolicy{
			Version: "2012-10-17",
			Statement: []events.IAMPolicyStatement{
				{
					Action:   []string{"execute-api:Invoke"},
					Effect:   effect,
					Resource: resources, // ここでアクセスOKなURLを絞れる
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

	// メールアドレスを取得 TODO: ここでclameを元にポリシーを作る
	// ユーザーID
	// 権限 0:admin, 1:リーダー, 2:作業者
	// var userID
	// userID = token.Claims["id"]
	userID := token.UID
	clames := token.Claims
	email := token.Claims["email"] // こんな感じにしたい
	// policy := token.Claims["policy"] // こんな感じにしたい
	pp.Println("token.Claims", clames)
	pp.Println("token.Claims", token.Claims)
	// event.MethodArnに何が入っている？
	pp.Println("event", event.MethodArn)
	pp.Println("event", event.MethodArn)

	pp.Println("event", event.Type)

	apiArn := "arn:aws:execute-api:ap-northeast-1:052393924256:x7ow8vkh09/dev"

	switch email {
	case "admin@example.com":
		return generatePolicy("admin", "Allow", []string{apiArn + "/GET/*"}), nil
	case "leader@example.com":
		// return generatePolicy("leader", "Allow", []string{apiArn + "/GET/leaders", apiArn + "/GET/leaders/*", apiArn + "/GET/users/*"}), nil
		return generatePolicy("leader", "Allow", []string{apiArn + "/GET/leaders*", apiArn + "/GET/users*"}), nil
	case "user@example.com":
		return generatePolicy("user", "Allow", []string{apiArn + "/GET/users/" + userID}), nil
	case "deny@example.com":
		return generatePolicy("deny", "Deny", []string{}), nil
	case "unauthorized":
		return events.APIGatewayCustomAuthorizerResponse{}, errors.New("Unauthorized") // Return a 401 Unauthorized response
	default:
		return events.APIGatewayCustomAuthorizerResponse{}, errors.New("Error: Invalid token")
	}

	// TODO: こうしたい
	// switch policy {
	// case 1:
	// 	return generatePolicy("admin", "Allow", []string{apiArn + "/GET/*"}), nil
	// case 2:
	// 	return generatePolicy("leader", "Allow", []string{apiArn + "/GET/leader"}), nil
	// case 3:
	// 	return generatePolicy("user", "Allow", []string{apiArn + "/GET/user" + userID}), nil
	// case 4:
	// 	return generatePolicy("deny", "Deny", []string{}), nil
	// case "unauthorized":
	// 	return events.APIGatewayCustomAuthorizerResponse{}, errors.New("Unauthorized") // Return a 401 Unauthorized response
	// default:
	// 	return events.APIGatewayCustomAuthorizerResponse{}, errors.New("Error: Invalid token")
	// }
}

func main() {
	lambda.Start(handleRequest)
}
