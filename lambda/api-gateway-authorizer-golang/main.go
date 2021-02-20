// Copyright 2015-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License").
// You may not use this file except in compliance with the License.
// A copy of the License is located at
//
//     http://aws.amazon.com/apache2.0/
//
// or in the "license" file accompanying this file. This file is distributed
// on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
// express or implied. See the License for the specific language governing
// permissions and limitations under the License.

package main

import (
	"context"
	"log"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handleRequest(ctx context.Context, event events.APIGatewayCustomAuthorizerRequest) (events.APIGatewayCustomAuthorizerResponse, error) {
	// 絶対に必要な際以外はトークンを表示させない
	// log.Println("Client token: " + event.AuthorizationToken)
	log.Println("Method ARN: " + event.MethodArn) // TODO: Method ARNとは？=>Amazon Resource Namesではなく、API Gateway Amazon リソースネーム？

	// 着信トークンを検証し、トークンに関連付けられたプリンシパルユーザー識別子を生成する

	//  this could be accomplished in a number of ways: (以下のような方法で実装可能)
	// 1. Call out to OAuth provider (OAuthプロバイダーを呼び出す)
	// 2. Decode a JWT token inline (JWTトークンをインラインでデコードする)
	// 3. Lookup in a self-managed DB (自信で実装したDBでの検索)
	principalID := "user|a1b2c3d4" // TODO: これは？本来受け取るもの？

	// you can send a 401 Unauthorized response to the client by failing like so:
	// (クライアントに401 未認証 を返す際は以下のように実装します)
	// return events.APIGatewayCustomAuthorizerResponse{}, errors.New("Unauthorized")

	// if the token is valid, a policy must be generated which will allow or deny access to the client
  // (もしトークンが認証された場合、クライアントへのアクセスを許可または拒否するポリシーを生成する必要があります)

	// if access is denied, the client will recieve a 403 Access Denied response
	// (もしアクセスが拒否された場合、クライアントは403レスポンスを受け取ります)
	// if access is allowed, API Gateway will proceed with the backend integration configured on the method that was called
	// (もしアクセスが許可された場合、API Gatewayはバックエンドへのメソッド呼び出しを継続する)

	// this function must generate a policy that is associated with the recognized principal user identifier.
	// (この関数は、認識されたプリンシパルユーザー識別子に関連付けられたポリシーを生成する必要があります。)
	// depending on your use case, you might store policies in a DB, or generate them on the fly
	// (ユースケースに応じて、ポリシーをDBに保存することも、オンザフライで生成することもできます。)

	// keep in mind, the policy is cached for 5 minutes by default (TTL is configurable in the authorizer)
	// and will apply to subsequent calls to any method/resource in the RestApi
	// made with the same token
	// (ポリシーはデフォルトで5分間キャッシュされ（TTLは承認者で構成可能）、同じトークンで行われたRestApi内のメソッド/リソースへの後続の呼び出しに適用されることに注意してください)

	//the example policy below denies access to all resources in the RestApi
	tmp := strings.Split(event.MethodArn, ":")
	apiGatewayArnTmp := strings.Split(tmp[5], "/")
	awsAccountID := tmp[4]

	resp := NewAuthorizerResponse(principalID, awsAccountID)
	resp.Region = tmp[3]
	resp.APIID = apiGatewayArnTmp[0]
	resp.Stage = apiGatewayArnTmp[1]
	resp.DenyAllMethods()
	// resp.AllowMethod(Get, "/pets/*")

	// new! -- add additional key-value pairs associated with the authenticated principal
	// (認証されたプリンシパルに関連付けられたキーと値のペアを追加します)
	// these are made available by APIGW like so: $context.authorizer.<key>
	// (これらは次のようにAPIGWによって利用可能になります：$ context.authorizer。<key>)
	// additional context is cached
	// (追加のコンテキストがキャッシュされます)

	resp.Context = map[string]interface{}{
		"stringKey":  "stringval",
		"numberKey":  123,
		"booleanKey": true,
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
				Version: "2021-02-23",
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

func (r *AuthorizerResponse) AllowAllMethods() {
	r.addMethod(Allow, All, "*")
}

func (r *AuthorizerResponse) DenyAllMethods() {
	r.addMethod(Deny, All, "*")
}

func (r *AuthorizerResponse) AllowMethod(verb HttpVerb, resource string) {
	r.addMethod(Allow, verb, resource)
}

func (r *AuthorizerResponse) DenyMethod(verb HttpVerb, resource string) {
	r.addMethod(Deny, verb, resource)
}