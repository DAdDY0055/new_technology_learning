package main

import (
	"context"
	"log"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handleRequest(ctx context.Context, event events.APIGatewayCustomAuthorizerRequest) (events.APIGatewayCustomAuthorizerResponse, error) {
	log.Println("Client token: " + event.AuthorizationToken)
	log.Println("Method ARN: " + event.MethodArn) // Amazon Resource Names

	token := event.AuthorizationToken
	principalID := "user|a1b2c3d4" // TODO: これは？本来受け取るもの？

	tmp := strings.Split(event.MethodArn, ":")
	apiGatewayArnTmp := strings.Split(tmp[5], "/")
	log.Println("tmp: ", tmp)
	log.Println("apiGatewayArnTmp: ", apiGatewayArnTmp)
	awsAccountID := tmp[4]

	resp := NewAuthorizerResponse(principalID, awsAccountID)
	resp.Region = tmp[3]
	resp.APIID = apiGatewayArnTmp[0]
	resp.Stage = apiGatewayArnTmp[1]

	switch token {
	case "admin":
		resp.AllowAllMethods()
	case "user":
		resp.AllowMethod(Get, "/user/*")
	default:
		resp.DenyAllMethods()
	}


	return resp.APIGatewayCustomAuthorizerResponse, nil
}

func main() {
	lambda.Start(handleRequest)
}

type HttpVerb int

const (
	Get HttpVerb = iota
	Post
	Put
	Delete
	Patch
	Head
	Options
	All
)

func (hv HttpVerb) String() string {
	switch hv {
	case Get:
		return "GET"
	case Post:
		return "POST"
	case Put:
		return "PUT"
	case Delete:
		return "DELETE"
	case Patch:
		return "PATCH"
	case Head:
		return "HEAD"
	case Options:
		return "OPTIONS"
	case All:
		return "*"
	}
	return ""
}

type Effect int

const (
	Allow Effect = iota
	Deny
)

func (e Effect) String() string {
	switch e {
	case Allow:
		return "Allow"
	case Deny:
		return "Deny"
	}
	return ""
}

type AuthorizerResponse struct {
	events.APIGatewayCustomAuthorizerResponse

	// The region where the API is deployed. By default this is set to '*'
	Region string

	// The AWS account id the policy will be generated for. This is used to create the method ARNs.
	AccountID string

	// The API Gateway API id. By default this is set to '*'
	APIID string

	// The name of the stage used in the policy. By default this is set to '*'
	Stage string
}

func NewAuthorizerResponse(principalID string, AccountID string) *AuthorizerResponse {
	return &AuthorizerResponse{
		APIGatewayCustomAuthorizerResponse: events.APIGatewayCustomAuthorizerResponse{
			PrincipalID: principalID,
			PolicyDocument: events.APIGatewayCustomAuthorizerPolicy{
				Version: "2012-10-17", // バージョンはこれでないとInvalid versionになる
			},
		},
		Region:    "*",
		AccountID: AccountID,
		APIID:     "*",
		Stage:     "*",
	}
}

func (r *AuthorizerResponse) addMethod(effect Effect, verb HttpVerb, resource string) {
	resourceArn := "arn:aws:execute-api:" +
		r.Region + ":" +
		r.AccountID + ":" +
		r.APIID + "/" +
		r.Stage + "/" +
		verb.String() + "/" +
		strings.TrimLeft(resource, "/")

	s := events.IAMPolicyStatement{
		Effect:   effect.String(),
		Action:   []string{"execute-api:Invoke"},
		Resource: []string{resourceArn},
	}

	r.PolicyDocument.Statement = append(r.PolicyDocument.Statement, s)
}

func checkAuthority(token string) string {
	switch token {
	case "allow":
		return "Allow"
	case "deny":
		return "Deny"
	}
	return ""
}

func (r *AuthorizerResponse) AllowAllMethods() {
	r.addMethod(Allow, All, "*")
}

func (r *AuthorizerResponse) DenyAllMethods() {
	r.addMethod(Deny, All, "*")
}

func (r *AuthorizerResponse) AllowMethod(verb HttpVerb, resource string) {
	r.addMethod(Allow, verb, resource)
}

// func (r *AuthorizerResponse) DenyMethod(verb HttpVerb, resource string) {
// 	r.addMethod(Deny, verb, resource)
// }