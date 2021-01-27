import time as t
import requests
from bs4 import BeautifulSoup
from datetime import date, datetime, time
import finnhub

startDayTrade = datetime.combine(date.today(), time(9, 30, 0, 0))
endDayTrade = datetime.combine(date.today(), time(18, 0, 0, 0))
dayStart = datetime.combine(date.today(), time(0, 0, 0, 0))
dayEnd = datetime.combine(date.today(), time(23, 59, 59, 0))

# Uses Finnhubs Module for API KEY
finnhub_client = finnhub.Client(api_key="YOUR API KEY")
# tickers variable is a list of all the company tickers that are on the S&P 500.
tickers = finnhub_client.indices_const(symbol="^GSPC")['constituents']
# stocksymbol variable is a list of all companies that are on US exchanges and their company information.
stocksymbol = finnhub_client.stock_symbols('US')

# sp500 is a filtered list of only S&P 500 companies and their company information. This is necessary because the tickers variable is only the ticker symbol of S&P 500 companies. The stocksymbol variable has a more detailed list of companies but doesnt specify if its an S&P 500 company or not.

sp500 = [c for c in stocksymbol for ticker in tickers if ticker == c['symbol']]

# While the sp500 variable is now a detailed list of S&P 500 companies, the dictionary for each company contains details that do not serve a purpose for this script specifically. The filtered function is returns a new dictionary of the companies 'discription' and 'symbol' keys.
def filtered(company):
    return {
        'description': company['description'],
        'symbol': company['symbol']
    }
# The new_sp500 is a mapped list of S&P 500 companies with just their descriptions and ticker symbols. 
new_sp500 = list(map(filtered, sp500))

# This is the main function of this script. The purpose of the function is to scrape the yahoo finance website to retrieve the price of a particular stock, the change since opening, and the current time. The getPrice() function takes two arguments, ticker and name.
def getPrice(ticker, name):
    # Beautiful Soup makes a request to the yahoo finance website and retrieves the HTML for that specific company. A formatted string is used for the URL because the HTML path    for each company is the same, just the ticker is different.
    res = requests.get(f'https://finance.yahoo.com/quote/{ticker}/')
    soup = BeautifulSoup(res.text, 'html.parser')
    # values are the list of divs that contain the price, change, and time.
    values = soup.find_all(
        'div', {'class': 'My(6px) Pos(r) smartphone_Mt(6px)'})[0].find_all('span')
    price = ''
    change = ''
    time = ''
    # Because the indexes of the price, change, time is in a specific order, you can loop through them to set their respective variables above.
    for i in range(len(values)):
        if i == 0:
            price = values[i].text
        elif i == 1:
            change = values[i].text
        else:
            time = (values[i].text).replace(
                'As of ', '').replace('. Market open.', '')
    # This is the string that is returned/displayed on the terminal at the end.
    return print(f'The price of {name} is ${price} as of{time}. It is a ${change} change since the opening price.')

# A while loop is used for two reasons, 1) is so that I can get the latest, up to date stock price without delay and 2) is so that the script wont stop running when the market closes so that when the market opens, the script wont need to be run again.
while True:
    if datetime.now() >= startDayTrade and datetime.now() <= endDayTrade:
        #every companies dictionary in the new_sp500 list gets looped through and specific keys get passed into the getPrice() function. Once the list gets looped through, it           will loop through the new_sp500 list again so long as the market is opened.
        for company in new_sp500:
            getPrice(company['symbol'], company['description'])
        continue
    elif datetime.now() > dayStart and datetime.now() < startDayTrade:
        # At the beginning of the day the following statement will be displayed in the terminal telling you when the market will open and suspends the execution of the loop            until the start of the market day.
        print(f'Sorry, market will open at {time(9, 30, 0, 0)}.')
        t.sleep((startDayTrade - datetime.now()).total_seconds())
        continue
    elif datetime.now() > endDayTrade and datetime.now() < dayEnd:
        # At the end of the market day the following statement will be displayed in the terminal about of when the market will be open again. The execution of the loop will be            suspended till the end of the current day. If the script is running as the day ends and new day starts, the print statement in the above elif will be displayed. 
        print(
            f'Sorry, market will open at {time(9, 30, 0, 0)} tomorrow morning.')
        t.sleep((dayEnd - datetime.now()).total_seconds())
        continue
