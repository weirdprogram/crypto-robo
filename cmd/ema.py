import pandas as pd
import json
import sys

def crossover_alert(df):
    df = df.reset_index(drop=True)
    
    last_high = df.EMA_high[0]
    last_low = df.EMA_low[0]
    
    current_high = df.EMA_high[1]
    current_low = df.EMA_low[1]

    # Check crossing
    if (last_high > last_low) == (current_high > current_low):
        result = json.dumps({"alert": False})
        print(result)
        sys.stdout.flush()
        return

    if current_high > current_low :
        result = json.dumps({"alert": True, "type": "SELL", "close_price":df.close_price[1], "close_date":df.close_date[1], "close_date_ut":df.close_date_ut[1]})
    else:
        result = json.dumps({"alert": True, "type": "BUY", "close_price":df.close_price[1], "close_date":df.close_date[1], "close_date_ut":df.close_date_ut[1]}})
    
    print(result)
    sys.stdout.flush()
    return


EMA_high = int(sys.argv[1])
EMA_low = int(sys.argv[2])
file_name = sys.argv[3]

data = pd.read_json(file_name)
df = pd.DataFrame(data)
df = df.sort_values(by=['close_date'], ascending=True)

df['EMA_high'] = round(df.close_price.ewm(span=EMA_high, adjust=False).mean(),2)
df['EMA_low']  = round(df.close_price.ewm(span=EMA_low, adjust=False).mean(),2)

crossover_alert(df.tail(2))

