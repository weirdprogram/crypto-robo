package models

import (
	"time"

	"github.com/gin-gonic/gin"
)

const (
	DATE_FORMAT = "2006-01-02 15:04:05"
)

type ResponseModel struct {
	Statuscode int
	Message    string
	Data       interface{}
	ListError  []ErrorModel
	Endpoint   string
	Method     string
}

func (r ResponseModel) NewResponse() gin.H {
	t := time.Now()
	content := gin.H{
		"timestamp":  t.Format(DATE_FORMAT),
		"statuscode": r.Statuscode,
		"message":    r.Message,
		"data":       r.Data,
		"errors":     r.ListError,
		"endpoint":   r.Endpoint,
		"method":     r.Method,
	}

	return content
}
