{
"openapi": "3.0.4",
"info": {
"title": "AQ IAM API Project",
"version": "v1"
},
"paths": {
"/api/academicyear/{tenantId}": {
"get": {
"tags": [
"AcademicYear"
],
"parameters": [
{
"name": "tenantId",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
},
{
"name": "CodeOrName",
"in": "query",
"schema": {
"type": "string"
}
},
{
"name": "State",
"in": "query",
"schema": {
"$ref": "#/components/schemas/AcademicYearState"
}
},
{
"name": "PageNumber",
"in": "query",
"schema": {
"type": "integer",
"format": "int32"
}
},
{
"name": "PageSize",
"in": "query",
"schema": {
"type": "integer",
"format": "int32"
}
}
],
"responses": {
"200": {
"description": "OK"
}
}
},
"post": {
"tags": [
"AcademicYear"
],
"parameters": [
{
"name": "tenantId",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
}
],
"requestBody": {
"content": {
"application/json": {
"schema": {
"$ref": "#/components/schemas/CreateAcademicYearRequest"
}
},
"text/json": {
"schema": {
"$ref": "#/components/schemas/CreateAcademicYearRequest"
}
},
"application/*+json": {
"schema": {
"$ref": "#/components/schemas/CreateAcademicYearRequest"
}
}
}
},
"responses": {
"200": {
"description": "OK"
}
}
}
},
"/api/academicyear/{tenantId}/{id}": {
"put": {
"tags": [
"AcademicYear"
],
"parameters": [
{
"name": "tenantId",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
},
{
"name": "id",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
}
],
"requestBody": {
"content": {
"application/json": {
"schema": {
"$ref": "#/components/schemas/UpdateAcademicYearRequest"
}
},
"text/json": {
"schema": {
"$ref": "#/components/schemas/UpdateAcademicYearRequest"
}
},
"application/*+json": {
"schema": {
"$ref": "#/components/schemas/UpdateAcademicYearRequest"
}
}
}
},
"responses": {
"200": {
"description": "OK"
}
}
},
"delete": {
"tags": [
"AcademicYear"
],
"parameters": [
{
"name": "tenantId",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
},
{
"name": "id",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
}
],
"responses": {
"200": {
"description": "OK"
}
}
},
"get": {
"tags": [
"AcademicYear"
],
"parameters": [
{
"name": "tenantId",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
},
{
"name": "id",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
},
{
"name": "include",
"in": "query",
"schema": {
"type": "string"
}
}
],
"responses": {
"200": {
"description": "OK"
}
}
}
},
"/api/academicyear/{tenantId}/{id}/activate": {
"post": {
"tags": [
"AcademicYear"
],
"parameters": [
{
"name": "tenantId",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
},
{
"name": "id",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
}
],
"responses": {
"200": {
"description": "OK"
}
}
}
},
"/api/academicyear/{tenantId}/exists": {
"get": {
"tags": [
"AcademicYear"
],
"parameters": [
{
"name": "tenantId",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
},
{
"name": "state",
"in": "query",
"schema": {
"$ref": "#/components/schemas/AcademicYearState"
}
}
],
"responses": {
"200": {
"description": "OK"
}
}
}
},
"/api/academicyear/{tenantId}/{id}/criterias": {
"get": {
"tags": [
"AcademicYear"
],
"parameters": [
{
"name": "tenantId",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
},
{
"name": "id",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
}
],
"responses": {
"200": {
"description": "OK"
}
}
}
},
"/api/activity/{tenantId}": {
"post": {
"tags": [
"Activity"
],
"parameters": [
{
"name": "tenantId",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
}
],
"requestBody": {
"content": {
"application/json": {
"schema": {
"$ref": "#/components/schemas/CreateActivityRequest"
}
},
"text/json": {
"schema": {
"$ref": "#/components/schemas/CreateActivityRequest"
}
},
"application/*+json": {
"schema": {
"$ref": "#/components/schemas/CreateActivityRequest"
}
}
}
},
"responses": {
"200": {
"description": "OK"
}
}
},
"get": {
"tags": [
"Activity"
],
"parameters": [
{
"name": "tenantId",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
},
{
"name": "CodeOrName",
"in": "query",
"schema": {
"type": "string"
}
},
{
"name": "Type",
"in": "query",
"schema": {
"$ref": "#/components/schemas/ActivityType"
}
},
{
"name": "State",
"in": "query",
"schema": {
"$ref": "#/components/schemas/ActivityState"
}
},
{
"name": "PageNumber",
"in": "query",
"schema": {
"type": "integer",
"format": "int32"
}
},
{
"name": "PageSize",
"in": "query",
"schema": {
"type": "integer",
"format": "int32"
}
}
],
"responses": {
"200": {
"description": "OK"
}
}
}
},
"/api/activity/{tenantId}/{id}": {
"put": {
"tags": [
"Activity"
],
"parameters": [
{
"name": "tenantId",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
},
{
"name": "id",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
}
],
"requestBody": {
"content": {
"application/json": {
"schema": {
"$ref": "#/components/schemas/UpdateActivityRequest"
}
},
"text/json": {
"schema": {
"$ref": "#/components/schemas/UpdateActivityRequest"
}
},
"application/*+json": {
"schema": {
"$ref": "#/components/schemas/UpdateActivityRequest"
}
}
}
},
"responses": {
"200": {
"description": "OK"
}
}
},
"delete": {
"tags": [
"Activity"
],
"parameters": [
{
"name": "tenantId",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
},
{
"name": "id",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
}
],
"responses": {
"200": {
"description": "OK"
}
}
},
"get": {
"tags": [
"Activity"
],
"parameters": [
{
"name": "tenantId",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
},
{
"name": "id",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
}
],
"responses": {
"200": {
"description": "OK"
}
}
}
},
"/api/activity/{tenantId}/{id}/register": {
"post": {
"tags": [
"Activity"
],
"parameters": [
{
"name": "tenantId",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
},
{
"name": "id",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
}
],
"requestBody": {
"content": {
"application/json": {
"schema": {
"$ref": "#/components/schemas/RegisterActivityRequest"
}
},
"text/json": {
"schema": {
"$ref": "#/components/schemas/RegisterActivityRequest"
}
},
"application/*+json": {
"schema": {
"$ref": "#/components/schemas/RegisterActivityRequest"
}
}
}
},
"responses": {
"200": {
"description": "OK"
}
}
}
},
"/api/activity/{tenantId}/{id}/import-activity-participations": {
"post": {
"tags": [
"Activity"
],
"parameters": [
{
"name": "tenantId",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
},
{
"name": "id",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
}
],
"requestBody": {
"content": {
"application/json": {
"schema": {
"$ref": "#/components/schemas/ImportActivityParticipationRequest"
}
},
"text/json": {
"schema": {
"$ref": "#/components/schemas/ImportActivityParticipationRequest"
}
},
"application/*+json": {
"schema": {
"$ref": "#/components/schemas/ImportActivityParticipationRequest"
}
}
}
},
"responses": {
"200": {
"description": "OK"
}
}
}
},
"/api/activity/{tenantId}/{id}/change-state": {
"put": {
"tags": [
"Activity"
],
"parameters": [
{
"name": "tenantId",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
},
{
"name": "id",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
}
],
"requestBody": {
"content": {
"application/json": {
"schema": {
"$ref": "#/components/schemas/ChangeActivityStateRequest"
}
},
"text/json": {
"schema": {
"$ref": "#/components/schemas/ChangeActivityStateRequest"
}
},
"application/*+json": {
"schema": {
"$ref": "#/components/schemas/ChangeActivityStateRequest"
}
}
}
},
"responses": {
"200": {
"description": "OK"
}
}
}
},
"/api/scoreframeworkversion/{tenantId}": {
"get": {
"tags": [
"ScoreFrameworkVersion"
],
"parameters": [
{
"name": "tenantId",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
},
{
"name": "CodeOrName",
"in": "query",
"schema": {
"type": "string"
}
},
{
"name": "State",
"in": "query",
"schema": {
"$ref": "#/components/schemas/ScoreFrameworkVersionState"
}
},
{
"name": "Include",
"in": "query",
"schema": {
"type": "string"
}
},
{
"name": "PageNumber",
"in": "query",
"schema": {
"type": "integer",
"format": "int32"
}
},
{
"name": "PageSize",
"in": "query",
"schema": {
"type": "integer",
"format": "int32"
}
}
],
"responses": {
"200": {
"description": "OK"
}
}
},
"post": {
"tags": [
"ScoreFrameworkVersion"
],
"parameters": [
{
"name": "tenantId",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
}
],
"requestBody": {
"content": {
"application/json": {
"schema": {
"$ref": "#/components/schemas/CreateScoreFrameworkVersionRequest"
}
},
"text/json": {
"schema": {
"$ref": "#/components/schemas/CreateScoreFrameworkVersionRequest"
}
},
"application/*+json": {
"schema": {
"$ref": "#/components/schemas/CreateScoreFrameworkVersionRequest"
}
}
}
},
"responses": {
"200": {
"description": "OK"
}
}
}
},
"/api/scoreframeworkversion/{tenantId}/{id}": {
"put": {
"tags": [
"ScoreFrameworkVersion"
],
"parameters": [
{
"name": "tenantId",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
},
{
"name": "id",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
}
],
"requestBody": {
"content": {
"application/json": {
"schema": {
"$ref": "#/components/schemas/UpdateScoreFrameworkVersionRequest"
}
},
"text/json": {
"schema": {
"$ref": "#/components/schemas/UpdateScoreFrameworkVersionRequest"
}
},
"application/*+json": {
"schema": {
"$ref": "#/components/schemas/UpdateScoreFrameworkVersionRequest"
}
}
}
},
"responses": {
"200": {
"description": "OK"
}
}
},
"delete": {
"tags": [
"ScoreFrameworkVersion"
],
"parameters": [
{
"name": "tenantId",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
},
{
"name": "id",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
}
],
"responses": {
"200": {
"description": "OK"
}
}
},
"get": {
"tags": [
"ScoreFrameworkVersion"
],
"parameters": [
{
"name": "tenantId",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
},
{
"name": "id",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
},
{
"name": "include",
"in": "query",
"schema": {
"type": "string"
}
}
],
"responses": {
"200": {
"description": "OK"
}
}
}
},
"/api/scoreframeworkversion/{tenantId}/{id}/publish": {
"post": {
"tags": [
"ScoreFrameworkVersion"
],
"parameters": [
{
"name": "tenantId",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
},
{
"name": "id",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
}
],
"responses": {
"200": {
"description": "OK"
}
}
}
},
"/api/scoreframeworkversion/{tenantId}/{id}/archive": {
"post": {
"tags": [
"ScoreFrameworkVersion"
],
"parameters": [
{
"name": "tenantId",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
},
{
"name": "id",
"in": "path",
"required": true,
"schema": {
"type": "string",
"format": "uuid"
}
}
],
"responses": {
"200": {
"description": "OK"
}
}
}
}
},
"components": {
"schemas": {
"AcademicYearCreateUpdateSemesterRequest": {
"type": "object",
"properties": {
"id": {
"type": "string",
"format": "uuid"
},
"name": {
"type": "string",
"nullable": true
},
"startDate": {
"type": "string",
"format": "date-time",
"nullable": true
},
"endDate": {
"type": "string",
"format": "date-time",
"nullable": true
},
"selfAssessmentOpen": {
"type": "string",
"format": "date-time",
"nullable": true
},
"selfAssessmentClose": {
"type": "string",
"format": "date-time",
"nullable": true
},
"classApprovalOpen": {
"type": "string",
"format": "date-time",
"nullable": true
},
"facultyApprovalOpen": {
"type": "string",
"format": "date-time",
"nullable": true
},
"universityApprovalOpen": {
"type": "string",
"format": "date-time",
"nullable": true
}
},
"additionalProperties": false
},
"AcademicYearState": {
"enum": [
1,
2,
3,
4
],
"type": "integer",
"format": "int32"
},
"ActivityState": {
"enum": [
1,
2,
3,
4,
5,
6
],
"type": "integer",
"format": "int32"
},
"ActivityType": {
"enum": [
1,
2,
3,
4
],
"type": "integer",
"format": "int32"
},
"ChangeActivityStateRequest": {
"type": "object",
"properties": {
"state": {
"$ref": "#/components/schemas/ActivityState"
}
},
"additionalProperties": false
},
"CreateAcademicYearRequest": {
"type": "object",
"properties": {
"code": {
"type": "string",
"nullable": true
},
"name": {
"type": "string",
"nullable": true
},
"scoreFrameworkVersionId": {
"type": "string",
"format": "uuid"
},
"semesters": {
"type": "array",
"items": {
"$ref": "#/components/schemas/AcademicYearCreateUpdateSemesterRequest"
},
"nullable": true
}
},
"additionalProperties": false
},
"CreateActivityParticipationRequest": {
"type": "object",
"properties": {
"studentCode": {
"type": "string",
"nullable": true
},
"fullName": {
"type": "string",
"nullable": true
},
"classCode": {
"type": "string",
"nullable": true
},
"proposedScore": {
"type": "integer",
"format": "int32"
}
},
"additionalProperties": false
},
"CreateActivityRequest": {
"type": "object",
"properties": {
"code": {
"type": "string",
"nullable": true
},
"name": {
"type": "string",
"nullable": true
},
"description": {
"type": "string",
"nullable": true
},
"type": {
"$ref": "#/components/schemas/ActivityType"
},
"semesterId": {
"type": "string",
"format": "uuid",
"nullable": true
},
"quota": {
"type": "integer",
"format": "int32"
},
"maxScore": {
"type": "integer",
"format": "int32"
},
"organizerUnit": {
"type": "string",
"nullable": true
},
"criteriaId": {
"type": "string",
"format": "uuid",
"nullable": true
}
},
"additionalProperties": false
},
"CreateScoreFrameworkVersionRequest": {
"type": "object",
"properties": {
"code": {
"type": "string",
"nullable": true
},
"name": {
"type": "string",
"nullable": true
},
"state": {
"$ref": "#/components/schemas/ScoreFrameworkVersionState"
},
"criterias": {
"type": "array",
"items": {
"$ref": "#/components/schemas/ScoreFrameworkVersionCreateUpdateCriteriaRequest"
},
"nullable": true
}
},
"additionalProperties": false
},
"ImportActivityParticipationRequest": {
"type": "object",
"properties": {
"participations": {
"type": "array",
"items": {
"$ref": "#/components/schemas/CreateActivityParticipationRequest"
},
"nullable": true
}
},
"additionalProperties": false
},
"RegisterActivityRequest": {
"type": "object",
"properties": {
"activityId": {
"type": "string",
"format": "uuid",
"nullable": true
},
"studentId": {
"type": "string",
"format": "uuid",
"nullable": true
}
},
"additionalProperties": false
},
"ScoreFrameworkVersionCreateUpdateCriteriaRequest": {
"type": "object",
"properties": {
"id": {
"type": "string",
"format": "uuid"
},
"code": {
"type": "string",
"nullable": true
},
"name": {
"type": "string",
"nullable": true
},
"maxScore": {
"type": "integer",
"format": "int32",
"nullable": true
},
"orderIndex": {
"type": "integer",
"format": "int32",
"nullable": true
},
"parentId": {
"type": "string",
"format": "uuid",
"nullable": true
}
},
"additionalProperties": false
},
"ScoreFrameworkVersionState": {
"enum": [
1,
2,
3
],
"type": "integer",
"format": "int32"
},
"UpdateAcademicYearRequest": {
"type": "object",
"properties": {
"name": {
"type": "string",
"nullable": true
},
"scoreFrameworkVersionId": {
"type": "string",
"format": "uuid"
},
"semesters": {
"type": "array",
"items": {
"$ref": "#/components/schemas/AcademicYearCreateUpdateSemesterRequest"
},
"nullable": true
}
},
"additionalProperties": false
},
"UpdateActivityRequest": {
"type": "object",
"properties": {
"name": {
"type": "string",
"nullable": true
},
"maxScore": {
"type": "integer",
"format": "int32"
},
"organizerUnit": {
"type": "string",
"nullable": true
}
},
"additionalProperties": false
},
"UpdateScoreFrameworkVersionRequest": {
"type": "object",
"properties": {
"name": {
"type": "string",
"nullable": true
},
"state": {
"$ref": "#/components/schemas/ScoreFrameworkVersionState"
},
"criterias": {
"type": "array",
"items": {
"$ref": "#/components/schemas/ScoreFrameworkVersionCreateUpdateCriteriaRequest"
},
"nullable": true
}
},
"additionalProperties": false
}
},
"securitySchemes": {
"Bearer": {
"type": "http",
"description": "Enter: Bearer {your JWT token}",
"scheme": "Bearer",
"bearerFormat": "JWT"
}
}
},
"security": [
{
"Bearer": []
}
]
}
