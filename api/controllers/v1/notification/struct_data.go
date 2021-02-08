package notification

type AlertCryptoNotificationRequest struct {
	Type       string  `json:"type" binding:"required"`
	Pair       string  `json:"pair"`
	Indicator  string  `json:"indicator"`
	ClosePrice float64 `json:"close_price"`
	CloseTime  string
	URL        string
}

type Notification struct {
	Title         string
	Body          string
	ClickAction   string
	ExtraPayloads map[string]interface{}
	Ids           []string
}
